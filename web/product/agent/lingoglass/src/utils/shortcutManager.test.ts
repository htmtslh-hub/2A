import {
  formatKeyEventToCombo,
  normalizeCombo,
  isShortcutTriggered,
  formatShortcutDisplay,
  findShortcutConflict
} from './shortcutManager';
import { DEFAULT_SHORTCUTS, ShortcutItem } from '../types/shortcuts';

function runTests() {
  console.log('🧪 Starting Shortcut Manager Tests...\n');

  // Test 1: Single modifier should return null
  const modEvent = { key: 'Control', code: 'ControlLeft', ctrlKey: true, shiftKey: false, altKey: false, metaKey: false } as KeyboardEvent;
  if (formatKeyEventToCombo(modEvent) === null) {
    console.log('  ✅ PASS: Isolated modifier key returns null');
  } else {
    console.error('  ❌ FAIL: Isolated modifier key did not return null');
    process.exit(1);
  }

  // Test 2: Space key
  const spaceEvent = { key: ' ', code: 'Space', ctrlKey: false, shiftKey: false, altKey: false, metaKey: false } as KeyboardEvent;
  const spaceCombo = formatKeyEventToCombo(spaceEvent);
  if (spaceCombo === 'Space') {
    console.log('  ✅ PASS: Space key formatted correctly:', spaceCombo);
  } else {
    console.error('  ❌ FAIL: Space key formatting:', spaceCombo);
    process.exit(1);
  }

  // Test 3: Combination key (Shift + J)
  const shiftJEvent = { key: 'J', code: 'KeyJ', ctrlKey: false, shiftKey: true, altKey: false, metaKey: false } as KeyboardEvent;
  const shiftJCombo = formatKeyEventToCombo(shiftJEvent);
  if (shiftJCombo === 'Shift+j') {
    console.log('  ✅ PASS: Shift+J combo formatted correctly:', shiftJCombo);
  } else {
    console.error('  ❌ FAIL: Shift+J combo formatting:', shiftJCombo);
    process.exit(1);
  }

  // Test 4: Shortcut Trigger Matching
  const arrowUpEvent = { key: 'ArrowUp', code: 'ArrowUp', ctrlKey: false, shiftKey: false, altKey: false, metaKey: false } as KeyboardEvent;
  if (isShortcutTriggered(arrowUpEvent, ['ArrowUp'])) {
    console.log('  ✅ PASS: isShortcutTriggered matches ArrowUp');
  } else {
    console.error('  ❌ FAIL: isShortcutTriggered failed to match ArrowUp');
    process.exit(1);
  }

  // Test 5: Format display
  const display = formatShortcutDisplay('Shift+ArrowLeft');
  if (display === 'Shift + ←') {
    console.log('  ✅ PASS: formatShortcutDisplay converted to "Shift + ←":', display);
  } else {
    console.error('  ❌ FAIL: formatShortcutDisplay output:', display);
    process.exit(1);
  }

  // Test 6: Conflict detection
  const conflict = findShortcutConflict(DEFAULT_SHORTCUTS, 'playPause', 'r');
  if (conflict && conflict.id === 'repeatCue') {
    console.log('  ✅ PASS: Detected conflict correctly with repeatCue');
  } else {
    console.error('  ❌ FAIL: Failed to detect conflict:', conflict);
    process.exit(1);
  }

  // Test 7: toggleSubtitles shortcut trigger with 'c'
  const cEvent = { key: 'c', code: 'KeyC', ctrlKey: false, shiftKey: false, altKey: false, metaKey: false } as KeyboardEvent;
  const toggleSub = DEFAULT_SHORTCUTS.find(s => s.id === 'toggleSubtitles');
  if (toggleSub && isShortcutTriggered(cEvent, toggleSub.defaultKeys)) {
    console.log('  ✅ PASS: isShortcutTriggered matches toggleSubtitles key "c"');
  } else {
    console.error('  ❌ FAIL: isShortcutTriggered failed for toggleSubtitles with "c"');
    process.exit(1);
  }

  console.log('\n🎉 ALL SHORTCUT MANAGER TESTS PASSED (7/7)!');
}

runTests();
