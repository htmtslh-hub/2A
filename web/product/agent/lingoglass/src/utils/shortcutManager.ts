import { ShortcutItem } from '../types/shortcuts';

/**
 * Format a keyboard event into a normalized shortcut string
 * Returns null if the event is a modifier key by itself (Shift, Ctrl, Alt, Meta)
 */
export function formatKeyEventToCombo(e: KeyboardEvent): string | null {
  const key = e.key;

  // Skip isolated modifier keys
  if (['Control', 'Shift', 'Alt', 'Meta', 'CapsLock'].includes(key)) {
    return null;
  }

  const parts: string[] = [];

  if (e.ctrlKey || e.metaKey) {
    parts.push('Ctrl');
  }
  if (e.altKey) {
    parts.push('Alt');
  }

  // Determine main key name
  let keyName = key;

  if (e.code === 'Space' || key === ' ') {
    keyName = 'Space';
  } else if (key.startsWith('Arrow')) {
    keyName = key; // ArrowUp, ArrowDown, ArrowLeft, ArrowRight
  } else if (/^F\d+$/i.test(key)) {
    keyName = key.toUpperCase();
  } else if (key === 'Escape') {
    keyName = 'Escape';
  } else if (key === 'Enter') {
    keyName = 'Enter';
  } else if (key === 'Tab') {
    keyName = 'Tab';
  } else if (key === 'Backspace') {
    keyName = 'Backspace';
  } else if (key === 'Delete') {
    keyName = 'Delete';
  } else if (key.length === 1) {
    // Single character
    keyName = key.toLowerCase();
    // Only add Shift modifier explicitly if it's not a shifted punctuation like ? or +
    if (e.shiftKey && /^[a-z0-9]$/i.test(key)) {
      parts.push('Shift');
    }
  } else {
    if (e.shiftKey) {
      parts.push('Shift');
    }
  }

  parts.push(keyName);
  return parts.join('+');
}

/**
 * Normalize a shortcut string for comparison
 */
export function normalizeCombo(combo: string): string {
  const parts = combo.split('+').map(p => p.trim());
  const hasCtrl = parts.some(p => /^ctrl$/i.test(p) || /^control$/i.test(p));
  const hasAlt = parts.some(p => /^alt$/i.test(p));
  const hasShift = parts.some(p => /^shift$/i.test(p));

  const mainPart = parts.find(p => !/^(ctrl|control|alt|shift|meta)$/i.test(p)) || '';

  const normalizedParts: string[] = [];
  if (hasCtrl) normalizedParts.push('Ctrl');
  if (hasAlt) normalizedParts.push('Alt');
  if (hasShift) normalizedParts.push('Shift');

  let cleanMain = mainPart;
  if (/^space$/i.test(mainPart) || mainPart === ' ') cleanMain = 'Space';
  else if (/^esc(ape)?$/i.test(mainPart)) cleanMain = 'Escape';
  else if (/^arrowup$/i.test(mainPart)) cleanMain = 'ArrowUp';
  else if (/^arrowdown$/i.test(mainPart)) cleanMain = 'ArrowDown';
  else if (/^arrowleft$/i.test(mainPart)) cleanMain = 'ArrowLeft';
  else if (/^arrowright$/i.test(mainPart)) cleanMain = 'ArrowRight';
  else if (/^f\d+$/i.test(mainPart)) cleanMain = mainPart.toUpperCase();
  else if (mainPart.length === 1) cleanMain = mainPart.toLowerCase();

  normalizedParts.push(cleanMain);
  return normalizedParts.join('+');
}

/**
 * Check if the keyboard event matches any of the registered shortcut keys
 */
export function isShortcutTriggered(e: KeyboardEvent, shortcutKeys: string[]): boolean {
  if (!shortcutKeys || shortcutKeys.length === 0) return false;

  const eventCombo = formatKeyEventToCombo(e);
  if (!eventCombo) return false;

  const normalizedEvent = normalizeCombo(eventCombo);

  return shortcutKeys.some(target => {
    const normalizedTarget = normalizeCombo(target);
    return normalizedEvent.toLowerCase() === normalizedTarget.toLowerCase();
  });
}

/**
 * Format a shortcut string for display in UI (e.g. `Ctrl + Shift + P`, `Space`, `↑`, `Esc`)
 */
export function formatShortcutDisplay(keyStr: string): string {
  if (!keyStr) return '';

  return keyStr
    .split('+')
    .map(part => {
      const p = part.trim();
      switch (p.toLowerCase()) {
        case 'arrowup':
          return '↑';
        case 'arrowdown':
          return '↓';
        case 'arrowleft':
          return '←';
        case 'arrowright':
          return '→';
        case 'escape':
          return 'Esc';
        case 'space':
          return 'Space';
        case 'control':
        case 'ctrl':
          return 'Ctrl';
        case 'shift':
          return 'Shift';
        case 'alt':
          return 'Alt';
        default:
          return p.toUpperCase();
      }
    })
    .join(' + ');
}

/**
 * Check if a proposed key combination conflicts with another action
 */
export function findShortcutConflict(
  shortcuts: ShortcutItem[],
  actionId: string,
  newKey: string
): ShortcutItem | null {
  const normalizedNew = normalizeCombo(newKey).toLowerCase();

  return (
    shortcuts.find(item => {
      if (item.id === actionId) return false;
      return item.currentKeys.some(k => normalizeCombo(k).toLowerCase() === normalizedNew);
    }) || null
  );
}
