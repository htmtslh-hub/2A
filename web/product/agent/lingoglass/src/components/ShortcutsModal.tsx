import React, { useState, useEffect } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { ShortcutItem, CATEGORY_LABELS, ShortcutCategory } from '../types/shortcuts';
import {
  formatKeyEventToCombo,
  formatShortcutDisplay,
  findShortcutConflict
} from '../utils/shortcutManager';
import {
  X,
  Keyboard,
  RotateCcw,
  Search,
  AlertTriangle
} from 'lucide-react';

export const ShortcutsModal: React.FC = () => {
  const {
    showShortcuts,
    setShowShortcuts,
    shortcuts,
    updateShortcut,
    resetShortcuts
  } = usePlayer();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | ShortcutCategory>('all');
  const [editingActionId, setEditingActionId] = useState<string | null>(null);
  const [conflictWarning, setConflictWarning] = useState<{ actionName: string; key: string } | null>(null);

  // Keydown listener while recording a new shortcut key combination
  useEffect(() => {
    if (!editingActionId) return;

    const handleRecordKey = (e: KeyboardEvent) => {
      e.preventDefault();
      e.stopPropagation();

      // Pressing Escape cancels recording
      if (e.key === 'Escape') {
        setEditingActionId(null);
        setConflictWarning(null);
        return;
      }

      const combo = formatKeyEventToCombo(e);
      if (!combo) return;

      const conflict = findShortcutConflict(shortcuts, editingActionId, combo);
      if (conflict) {
        setConflictWarning({ actionName: conflict.name, key: combo });
        updateShortcut(conflict.id, conflict.currentKeys.filter(k => k.toLowerCase() !== combo.toLowerCase()));
      } else {
        setConflictWarning(null);
      }

      updateShortcut(editingActionId, [combo]);
      setEditingActionId(null);
    };

    window.addEventListener('keydown', handleRecordKey, { capture: true });
    return () => window.removeEventListener('keydown', handleRecordKey, { capture: true });
  }, [editingActionId, shortcuts, updateShortcut]);

  if (!showShortcuts) return null;

  const categories: ShortcutCategory[] = ['playback', 'learning', 'audio', 'system'];

  const filteredShortcuts = shortcuts.filter(item => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.currentKeys.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in select-none"
      onClick={() => {
        setEditingActionId(null);
        setShowShortcuts(false);
      }}
    >
      <div
        className="w-full max-w-2xl bg-[#FAF7F2] rounded-3xl border-2 border-[#1E1E24] shadow-[6px_6px_0px_#1E1E24] p-5 relative flex flex-col max-h-[85vh] text-[#1E1E24]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header with Window Dots */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-[#1E1E24]/10 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 mr-1">
              <span className="w-3 h-3 rounded-full bg-[#F472B6] border-[1.5px] border-[#1E1E24]" />
              <span className="w-3 h-3 rounded-full bg-[#FCD34D] border-[1.5px] border-[#1E1E24]" />
              <span className="w-3 h-3 rounded-full bg-[#86EFAC] border-[1.5px] border-[#1E1E24]" />
            </div>
            <div className="w-7 h-7 rounded-xl bg-[#FCE7F3] border-[1.5px] border-[#1E1E24] flex items-center justify-center text-[#BE185D]">
              <Keyboard className="w-4 h-4" />
            </div>
            <h3 className="text-base font-extrabold text-[#1E1E24]">
              Cài Đặt Phím Tắt
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetShortcuts}
              className="px-3 py-1 rounded-full bg-white hover:bg-[#FAF7F2] text-[#1E1E24] border-[1.5px] border-[#1E1E24] shadow-[1.5px_1.5px_0px_#1E1E24] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              title="Khôi phục toàn bộ phím tắt về mặc định"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Mặc định</span>
            </button>

            <button
              onClick={() => {
                setEditingActionId(null);
                setShowShortcuts(false);
              }}
              className="retro-round-btn !w-7 !h-7"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Toolbar: Category pills & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 mb-3.5">
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white border-[1.5px] border-[#1E1E24] shadow-[1px_1px_0px_#1E1E24] overflow-x-auto max-w-full">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#1E1E24] text-white shadow-[1px_1px_0px_#1E1E24]'
                  : 'text-[#52525B] hover:text-[#1E1E24]'
              }`}
            >
              Tất cả ({shortcuts.length})
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1E1E24] text-white shadow-[1px_1px_0px_#1E1E24]'
                    : 'text-[#52525B] hover:text-[#1E1E24]'
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm phím tắt..."
              className="w-full pl-8 pr-3 py-1 text-xs rounded-full bg-white border-[1.5px] border-[#1E1E24] shadow-[1px_1px_0px_#1E1E24] text-[#1E1E24] placeholder-[#8E8E93] outline-none"
            />
          </div>
        </div>

        {/* Conflict Warning Toast */}
        {conflictWarning && (
          <div className="mb-3 p-2.5 rounded-xl bg-[#FEF3C7] border-[1.5px] border-[#B45309] flex items-center gap-2 text-xs text-[#B45309]">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>
              Phím <b>{conflictWarning.key}</b> đã được chuyển từ "{conflictWarning.actionName}".
            </span>
          </div>
        )}

        {/* Shortcuts List Grid */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-4">
          {categories
            .filter(cat => selectedCategory === 'all' || selectedCategory === cat)
            .map(cat => {
              const catItems = filteredShortcuts.filter(item => item.category === cat);
              if (catItems.length === 0) return null;

              return (
                <div key={cat} className="space-y-2">
                  <h4 className="text-xs font-extrabold text-[#BE185D] uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#BE185D]" />
                    <span>{CATEGORY_LABELS[cat]}</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {catItems.map(item => {
                      const isEditing = editingActionId === item.id;
                      const isModified =
                        JSON.stringify(item.currentKeys) !== JSON.stringify(item.defaultKeys);

                      return (
                        <div
                          key={item.id}
                          className={`px-3 py-2 rounded-xl border-[1.5px] border-[#1E1E24] transition-all flex items-center justify-between gap-2 ${
                            isEditing
                              ? 'bg-[#FCE7F3] border-[#BE185D] shadow-[2px_2px_0px_#1E1E24]'
                              : 'bg-white shadow-[1.5px_1.5px_0px_#1E1E24]'
                          }`}
                        >
                          <div className="min-w-0 flex-1 flex items-center gap-1.5">
                            <span className="text-xs font-bold text-[#1E1E24] truncate">{item.name}</span>
                            {isModified && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#FCE7F3] text-[#BE185D] font-bold border border-[#1E1E24]/30 shrink-0">
                                Đổi
                              </span>
                            )}
                          </div>

                          {/* Shortcut Key Badge / Keycap Button */}
                          <div className="flex items-center gap-1.5 shrink-0">
                            {isEditing ? (
                              <div className="px-2.5 py-0.5 rounded-lg bg-[#BE185D] text-white text-xs font-mono font-bold animate-pulse shadow-sm">
                                Bấm phím...
                              </div>
                            ) : (
                              <div className="flex items-center gap-1">
                                {item.currentKeys.length > 0 ? (
                                  item.currentKeys.map((keyStr, kIdx) => (
                                    <button
                                      key={kIdx}
                                      onClick={() => {
                                        setEditingActionId(item.id);
                                        setConflictWarning(null);
                                      }}
                                      className="px-2.5 py-0.5 rounded-lg bg-[#FAF7F2] hover:bg-[#FCE7F3] border-[1.5px] border-[#1E1E24] shadow-[1.5px_1.5px_0px_#1E1E24] text-[#1E1E24] hover:text-[#BE185D] font-mono font-bold text-xs transition-all cursor-pointer active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
                                      title="Bấm để đổi phím"
                                    >
                                      <span>{formatShortcutDisplay(keyStr)}</span>
                                    </button>
                                  ))
                                ) : (
                                  <button
                                    onClick={() => {
                                      setEditingActionId(item.id);
                                      setConflictWarning(null);
                                    }}
                                    className="px-2 py-0.5 rounded-lg border border-dashed border-[#1E1E24] text-[#71717A] hover:text-[#1E1E24] text-xs font-mono"
                                  >
                                    + Gán
                                  </button>
                                )}

                                {isModified && (
                                  <button
                                    onClick={() => updateShortcut(item.id, item.defaultKeys)}
                                    className="p-1 text-[#71717A] hover:text-[#BE185D] rounded"
                                    title="Đặt lại phím này"
                                  >
                                    <RotateCcw className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t-2 border-[#1E1E24]/10 mt-3 flex items-center justify-between text-[11px] font-bold text-[#71717A]">
          <span>Nhấn phím bất kỳ khi đang ghi để gán phím mới</span>
          <button
            onClick={() => setShowShortcuts(false)}
            className="px-4 py-1.5 rounded-full bg-[#1E1E24] text-white font-bold text-xs shadow-[2px_2px_0px_#1E1E24] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
          >
            Đóng (Esc)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShortcutsModal;
