import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, Download, Upload, RotateCcw, ZoomIn, ZoomOut, Grid3X3, Eraser, ChevronUp, ChevronDown, BookOpen, X, Scroll, Shield, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { playBack, playTap, playSelect } from "@/utils/sound-engine";
import {
  PIECE_DEFINITIONS,
  CATEGORIES,
  type PieceDef,
  type PieceCategory,
  type PlacedPiece,
  type Scenario,
} from "@/data/scenario-maker-data";
import { PREDEFINED_ADVENTURES, type PredefinedAdventure } from "@/data/predefined-scenarios";

const DEFAULT_ROWS = 16;
const DEFAULT_COLS = 20;
const MIN_CELL = 20;
const MAX_CELL = 64;

let uidCounter = 0;
const genUid = () => `p_${Date.now()}_${++uidCounter}`;

const ScenarioMaker = () => {
  const navigate = useNavigate();

  const [gridRows, setGridRows] = useState(DEFAULT_ROWS);
  const [gridCols, setGridCols] = useState(DEFAULT_COLS);
  const [pieces, setPieces] = useState<PlacedPiece[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<PieceDef | null>(null);
  const [activeCategory, setActiveCategory] = useState<PieceCategory>("heroes");
  const [cellSize, setCellSize] = useState(36);
  const [scenarioName, setScenarioName] = useState("Untitled Scenario");
  const [isErasing, setIsErasing] = useState(false);
  const [hoveredCell, setHoveredCell] = useState<{ r: number; c: number } | null>(null);
  const [dragPieceUid, setDragPieceUid] = useState<string | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [history, setHistory] = useState<PlacedPiece[][]>([[]]);
  const [historyIdx, setHistoryIdx] = useState(0);
  const [mobilePaletteOpen, setMobilePaletteOpen] = useState(true);
  const [showAdventures, setShowAdventures] = useState(false);
  const [selectedAdventure, setSelectedAdventure] = useState<PredefinedAdventure | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadAdventure = useCallback((adv: PredefinedAdventure) => {
    playSelect();
    setScenarioName(`Adventure ${adv.number}: ${adv.name}`);
    setGridRows(adv.gridRows);
    setGridCols(adv.gridCols);
    // Generate unique UIDs for loaded pieces
    const loadedPieces = adv.pieces.map((piece, i) => ({
      ...piece,
      uid: `adv_${adv.id}_${i}_${Date.now()}`,
    }));
    setPieces(loadedPieces);
    setHistory([loadedPieces]);
    setHistoryIdx(0);
    setSelectedAdventure(adv);
    setShowAdventures(false);
  }, []);

  const pushHistory = useCallback(
    (next: PlacedPiece[]) => {
      setHistory((prev) => {
        const trimmed = prev.slice(0, historyIdx + 1);
        return [...trimmed, next];
      });
      setHistoryIdx((i) => i + 1);
    },
    [historyIdx]
  );

  const undo = useCallback(() => {
    if (historyIdx > 0) {
      setHistoryIdx((i) => i - 1);
      setPieces(history[historyIdx - 1]);
    }
  }, [history, historyIdx]);

  const getPieceDef = (id: string) => PIECE_DEFINITIONS.find((p) => p.id === id);
  const countOnBoard = (pieceId: string) => pieces.filter((p) => p.pieceId === pieceId).length;

  const handleCellClick = useCallback(
    (row: number, col: number) => {
      const existing = pieces.find((p) => p.row === row && p.col === col);
      if (isErasing) {
        if (existing) {
          const next = pieces.filter((p) => p.uid !== existing.uid);
          setPieces(next);
          pushHistory(next);
        }
        return;
      }
      if (!selectedPiece) return;
      if (existing) return;
      if (selectedPiece.maxCount && countOnBoard(selectedPiece.id) >= selectedPiece.maxCount) return;
      const next = [...pieces, { pieceId: selectedPiece.id, row, col, uid: genUid() }];
      setPieces(next);
      pushHistory(next);
    },
    [pieces, selectedPiece, isErasing, pushHistory]
  );

  const handleCellRightClick = useCallback(
    (e: React.MouseEvent, row: number, col: number) => {
      e.preventDefault();
      const existing = pieces.find((p) => p.row === row && p.col === col);
      if (existing) {
        const next = pieces.filter((p) => p.uid !== existing.uid);
        setPieces(next);
        pushHistory(next);
      }
    },
    [pieces, pushHistory]
  );

  const handleDragStart = (uid: string) => setDragPieceUid(uid);

  const handleDrop = useCallback(
    (row: number, col: number) => {
      if (!dragPieceUid) return;
      const occupied = pieces.find((p) => p.row === row && p.col === col);
      if (occupied && occupied.uid !== dragPieceUid) return;
      const next = pieces.map((p) => (p.uid === dragPieceUid ? { ...p, row, col } : p));
      setPieces(next);
      pushHistory(next);
      setDragPieceUid(null);
    },
    [dragPieceUid, pieces, pushHistory]
  );

  const clearBoard = () => { setPieces([]); pushHistory([]); };

  const saveScenario = () => {
    const scenario: Scenario = { name: scenarioName, gridRows, gridCols, pieces, createdAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(scenario, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${scenarioName.replace(/\s+/g, "_")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadScenario = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target?.result as string) as Scenario;
        setScenarioName(data.name);
        setGridRows(data.gridRows);
        setGridCols(data.gridCols);
        setPieces(data.pieces);
        setHistory([data.pieces]);
        setHistoryIdx(0);
      } catch { /* invalid file */ }
    };
    reader.readAsText(file);
  };

  const filteredPieces = PIECE_DEFINITIONS.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setSelectedPiece(null); setIsErasing(false); }
      if ((e.metaKey || e.ctrlKey) && e.key === "z") { e.preventDefault(); undo(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo]);

  // Palette content (shared between desktop sidebar and mobile bottom panel)
  const PaletteContent = () => (
    <>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-border">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => { setActiveCategory(cat.id); setIsErasing(false); }}
            className={`px-2 py-1 rounded text-xs font-medium transition-all ${
              activeCategory === cat.id && !isErasing
                ? "bg-primary/20 text-gold border border-gold/30"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            <span className="mr-1">{cat.icon}</span>
            <span className="hidden sm:inline">{cat.label}</span>
          </button>
        ))}
        <button
          onClick={() => { setIsErasing(!isErasing); setSelectedPiece(null); }}
          className={`px-2 py-1 rounded text-xs font-medium transition-all ${
            isErasing
              ? "bg-destructive/20 text-destructive border border-destructive/30"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          }`}
        >
          <Eraser className="w-3 h-3 inline mr-1" />
          <span className="hidden sm:inline">Erase</span>
        </button>
      </div>

      {/* Pieces */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1 md:space-y-1">
        {/* Mobile: horizontal scroll grid, Desktop: vertical list */}
        <div className="flex md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible pb-1 md:pb-0">
          {filteredPieces.map((piece) => {
            const onBoard = countOnBoard(piece.id);
            const atMax = piece.maxCount ? onBoard >= piece.maxCount : false;
            const isSelected = selectedPiece?.id === piece.id && !isErasing;
            return (
              <button
                key={piece.id}
                onClick={() => {
                  if (atMax) return;
                  setIsErasing(false);
                  setSelectedPiece(isSelected ? null : piece);
                }}
                disabled={atMax}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-all group shrink-0 md:w-full ${
                  isSelected
                    ? "bg-primary/15 border border-gold/40 text-foreground shadow-sm shadow-primary/10"
                    : atMax
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                <span
                  className="w-7 h-7 md:w-8 md:h-8 rounded flex items-center justify-center text-base md:text-lg shrink-0 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${piece.color}20` }}
                >
                  {piece.icon}
                </span>
                <div className="min-w-0">
                  <div className="truncate font-medium text-xs">{piece.name}</div>
                  {piece.maxCount && (
                    <div className="text-[10px] text-muted-foreground">{onBoard}/{piece.maxCount}</div>
                  )}
                </div>
                {isSelected && <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Status bar */}
      {selectedPiece && (
        <div className="border-t border-border p-2 md:p-3 bg-secondary/30">
          <div className="flex items-center gap-2">
            <span className="text-lg">{selectedPiece.icon}</span>
            <div>
              <div className="text-xs md:text-sm font-heading text-gold">{selectedPiece.name}</div>
              <div className="text-[10px] text-muted-foreground">Tap grid to place</div>
            </div>
          </div>
        </div>
      )}
      {isErasing && (
        <div className="border-t border-border p-2 md:p-3 bg-destructive/10">
          <div className="flex items-center gap-2">
            <Eraser className="w-4 h-4 text-destructive" />
            <div>
              <div className="text-xs md:text-sm font-heading text-destructive">Eraser Active</div>
              <div className="text-[10px] text-muted-foreground">Tap pieces to remove</div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  // The grid board
  const BoardGrid = () => (
    <div
      className="relative border border-border rounded-lg overflow-hidden shadow-lg"
      style={{ boxShadow: "0 0 40px hsl(var(--gold) / 0.05)" }}
    >
      <div
        className="relative"
        style={{ width: gridCols * cellSize, height: gridRows * cellSize, background: "hsl(220, 15%, 10%)" }}
      >
        {showGrid && (
          <svg className="absolute inset-0 pointer-events-none" width={gridCols * cellSize} height={gridRows * cellSize}>
            {Array.from({ length: gridCols + 1 }).map((_, i) => (
              <line key={`v${i}`} x1={i * cellSize} y1={0} x2={i * cellSize} y2={gridRows * cellSize} stroke="hsl(220, 12%, 18%)" strokeWidth={i % 4 === 0 ? 1.5 : 0.5} />
            ))}
            {Array.from({ length: gridRows + 1 }).map((_, i) => (
              <line key={`h${i}`} x1={0} y1={i * cellSize} x2={gridCols * cellSize} y2={i * cellSize} stroke="hsl(220, 12%, 18%)" strokeWidth={i % 4 === 0 ? 1.5 : 0.5} />
            ))}
          </svg>
        )}

        {Array.from({ length: gridRows }).map((_, r) =>
          Array.from({ length: gridCols }).map((_, c) => {
            const isHovered = hoveredCell?.r === r && hoveredCell?.c === c;
            const placed = pieces.find((p) => p.row === r && p.col === c);
            return (
              <div
                key={`${r}-${c}`}
                className="absolute transition-colors duration-75"
                style={{
                  left: c * cellSize, top: r * cellSize, width: cellSize, height: cellSize,
                  cursor: isErasing ? (placed ? "pointer" : "default") : selectedPiece ? (placed ? "not-allowed" : "crosshair") : placed ? "grab" : "default",
                  backgroundColor: isHovered
                    ? isErasing && placed ? "hsl(0, 70%, 50%, 0.15)" : selectedPiece && !placed ? "hsl(var(--gold) / 0.1)" : "transparent"
                    : "transparent",
                }}
                onClick={() => handleCellClick(r, c)}
                onContextMenu={(e) => handleCellRightClick(e, r, c)}
                onMouseEnter={() => setHoveredCell({ r, c })}
                onMouseLeave={() => setHoveredCell(null)}
                onDragOver={(e) => { e.preventDefault(); setHoveredCell({ r, c }); }}
                onDrop={() => handleDrop(r, c)}
              />
            );
          })
        )}

        {pieces.map((p) => {
          const def = getPieceDef(p.pieceId);
          if (!def) return null;
          return (
            <div key={p.uid} className="absolute flex items-center justify-center pointer-events-none animate-scale-in"
              style={{ left: p.col * cellSize + 2, top: p.row * cellSize + 2, width: cellSize - 4, height: cellSize - 4 }}>
              <div draggable onDragStart={() => handleDragStart(p.uid)}
                className="w-full h-full rounded-md flex items-center justify-center pointer-events-auto transition-transform hover:scale-110 hover:z-10 relative group"
                style={{ backgroundColor: `${def.color}30`, border: `1.5px solid ${def.color}60`, boxShadow: `0 0 8px ${def.color}20`, fontSize: cellSize * 0.45 }}
                title={def.name}>
                {def.icon}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-card border border-border rounded px-2 py-0.5 text-[9px] text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-md">
                  {def.name}
                </div>
              </div>
            </div>
          );
        })}

        {hoveredCell && selectedPiece && !pieces.find((p) => p.row === hoveredCell.r && p.col === hoveredCell.c) && (
          <div className="absolute flex items-center justify-center pointer-events-none opacity-40"
            style={{ left: hoveredCell.c * cellSize + 2, top: hoveredCell.r * cellSize + 2, width: cellSize - 4, height: cellSize - 4, fontSize: cellSize * 0.45 }}>
            <div className="w-full h-full rounded-md flex items-center justify-center border-2 border-dashed"
              style={{ borderColor: selectedPiece.color, backgroundColor: `${selectedPiece.color}15` }}>
              {selectedPiece.icon}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-3 md:px-4 py-2 md:py-3 flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 shrink-0">
        <Button variant="ghost" size="icon" onClick={() => { playBack(); navigate("/"); }} className="text-gold shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1 flex items-center gap-2 min-w-0">
          <input
            value={scenarioName}
            onChange={(e) => setScenarioName(e.target.value)}
            className="bg-transparent text-foreground font-heading text-sm md:text-lg border-b border-transparent hover:border-border focus:border-gold focus:outline-none px-1 py-0.5 w-full max-w-[180px] sm:max-w-[240px] md:max-w-[220px]"
          />
          <span className="text-muted-foreground text-xs hidden sm:inline">
            {gridCols}×{gridRows} • {pieces.length} pieces
          </span>
        </div>
        <div className="order-3 w-full pt-1 flex items-center justify-end gap-0.5 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:order-none md:w-auto md:pt-0 md:overflow-visible md:justify-start md:gap-1">
          <Button variant="ghost" size="icon" onClick={undo} title="Undo" className="text-muted-foreground hover:text-foreground h-8 w-8 md:h-9 md:w-9">
            <RotateCcw className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setShowGrid(!showGrid)} title="Toggle grid" className="text-muted-foreground hover:text-foreground h-8 w-8 md:h-9 md:w-9">
            <Grid3X3 className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setCellSize((s) => Math.min(s + 4, MAX_CELL))} title="Zoom in" className="text-muted-foreground hover:text-foreground h-8 w-8 md:h-9 md:w-9">
            <ZoomIn className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setCellSize((s) => Math.max(s - 4, MIN_CELL))} title="Zoom out" className="text-muted-foreground hover:text-foreground h-8 w-8 md:h-9 md:w-9">
            <ZoomOut className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </Button>
          <div className="w-px h-5 bg-border mx-0.5 hidden md:block" />
          <Button variant="ghost" size="icon" onClick={() => { playTap(); setShowAdventures(!showAdventures); }} title="Predefined Adventures" className="text-primary hover:text-primary h-8 w-8 md:h-9 md:w-9">
            <BookOpen className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={saveScenario} title="Save" className="text-primary hover:text-primary h-8 w-8 md:h-9 md:w-9">
            <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()} title="Load" className="text-primary hover:text-primary h-8 w-8 md:h-9 md:w-9">
            <Upload className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </Button>
          <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={loadScenario} />
          <Button variant="ghost" size="icon" onClick={clearBoard} title="Clear" className="text-destructive hover:text-destructive h-8 w-8 md:h-9 md:w-9">
            <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </Button>
        </div>
      </header>

      {/* Adventure Browser Panel */}
      {showAdventures && (
        <div className="border-b border-border bg-card/80 backdrop-blur-sm animate-fade-in">
          <div className="px-3 md:px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-heading text-sm font-bold text-primary tracking-wide flex items-center gap-2">
                <Scroll className="w-4 h-4" />
                Predefined Adventures
              </h2>
              <button onClick={() => setShowAdventures(false)} className="p-1 rounded hover:bg-secondary">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Level tabs */}
            <div className="flex gap-4 mb-3">
              {[1, 2, 3].map(level => (
                <div key={level} className="flex-1">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Shield className="w-3 h-3 text-primary" />
                    <span className="text-[10px] font-heading font-semibold text-primary tracking-wider uppercase">Level {level}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Adventures horizontal scroll per level */}
            <div className="space-y-3">
              {[1, 2, 3].map(level => {
                const adventures = PREDEFINED_ADVENTURES.filter(a => a.level === level);
                return (
                  <div key={level}>
                    <div className="text-[10px] font-heading text-muted-foreground tracking-wider uppercase mb-1.5">
                      Level {level} Adventures
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1">
                      {adventures.map(adv => (
                        <button
                          key={adv.id}
                          onClick={() => loadAdventure(adv)}
                          className={`shrink-0 w-48 sm:w-56 p-3 rounded-lg border text-left transition-all hover:border-primary/40 hover:bg-primary/5 active:scale-[0.98] ${
                            selectedAdventure?.id === adv.id
                              ? "border-primary/50 bg-primary/10"
                              : "border-border bg-secondary/30"
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <span className="text-lg mt-0.5">
                              {adv.level === 1 ? "⚔️" : adv.level === 2 ? "🛡️" : "👑"}
                            </span>
                            <div className="min-w-0">
                              <div className="text-xs font-heading font-semibold text-foreground truncate">
                                {adv.number}. {adv.name}
                              </div>
                              <div className="text-[10px] text-muted-foreground mt-0.5 line-clamp-2 leading-tight">
                                {adv.objective}
                              </div>
                              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                                  {adv.pieces.length} pieces
                                </span>
                                {adv.traps.length > 0 && (
                                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-destructive/10 text-destructive">
                                    {adv.traps.reduce((s, t) => s + t.count, 0)} traps
                                  </span>
                                )}
                                {adv.specialItems.length > 0 && (
                                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                                    {adv.specialItems.length} special
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Adventure details */}
            {selectedAdventure && (
              <div className="mt-3 p-3 rounded-lg border border-primary/20 bg-primary/5 animate-fade-in">
                <div className="text-xs font-heading font-bold text-primary mb-1">
                  Adventure {selectedAdventure.number}: {selectedAdventure.name}
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed mb-2">
                  {selectedAdventure.description.slice(0, 200)}…
                </p>
                <div className="text-[10px] text-foreground mb-1">
                  <strong>Objective:</strong> {selectedAdventure.objective}
                </div>
                {selectedAdventure.traps.length > 0 && (
                  <div className="mt-1.5">
                    <div className="text-[9px] font-semibold text-destructive mb-0.5">Traps:</div>
                    {selectedAdventure.traps.map((t, i) => (
                      <div key={i} className="text-[9px] text-muted-foreground">
                        ⚠️ {t.count}x {t.name} — {t.effect}
                      </div>
                    ))}
                  </div>
                )}
                {selectedAdventure.specialItems.length > 0 && (
                  <div className="mt-1.5">
                    <div className="text-[9px] font-semibold text-primary mb-0.5">Special Items:</div>
                    {selectedAdventure.specialItems.map((item, i) => (
                      <div key={i} className="text-[9px] text-muted-foreground">🏆 {item}</div>
                    ))}
                  </div>
                )}
                {selectedAdventure.specialRules.length > 0 && (
                  <div className="mt-1.5">
                    <div className="text-[9px] font-semibold text-accent mb-0.5">Special Rules:</div>
                    {selectedAdventure.specialRules.map((rule, i) => (
                      <div key={i} className="text-[9px] text-muted-foreground">📜 {rule}</div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="hidden md:flex flex-1 overflow-hidden">
        <aside className="w-56 lg:w-64 border-r border-border flex flex-col shrink-0 bg-card/50">
          <PaletteContent />
        </aside>
        <main className="flex-1 overflow-auto p-4 flex items-start justify-center">
          <BoardGrid />
        </main>
      </div>

      {/* MOBILE: board top + palette bottom */}
      <div className="flex md:hidden flex-col flex-1 overflow-hidden">
        <main className="flex-1 overflow-auto p-2 flex items-start justify-center">
          <BoardGrid />
        </main>

        {/* Collapsible palette */}
        <div className="border-t border-border bg-card/50 shrink-0">
          <button
            onClick={() => setMobilePaletteOpen(!mobilePaletteOpen)}
            className="w-full flex items-center justify-center gap-2 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {mobilePaletteOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            <span>Pieces{selectedPiece ? `: ${selectedPiece.name}` : isErasing ? " (Eraser)" : ""}</span>
          </button>
          {mobilePaletteOpen && (
            <div className="flex flex-col max-h-[35vh] overflow-hidden">
              <PaletteContent />
            </div>
          )}
        </div>
      </div>

      {/* Bottom bar - Grid controls (desktop only) */}
      <footer className="hidden md:flex border-t border-border px-4 py-2 items-center gap-4 text-xs text-muted-foreground shrink-0 bg-card/30">
        <div className="flex items-center gap-2">
          <span>Rows:</span>
          <input type="number" min={4} max={30} value={gridRows}
            onChange={(e) => setGridRows(Math.max(4, Math.min(30, +e.target.value)))}
            className="w-12 bg-secondary rounded px-1.5 py-0.5 text-foreground text-center border border-border focus:border-gold focus:outline-none" />
        </div>
        <div className="flex items-center gap-2">
          <span>Cols:</span>
          <input type="number" min={4} max={30} value={gridCols}
            onChange={(e) => setGridCols(Math.max(4, Math.min(30, +e.target.value)))}
            className="w-12 bg-secondary rounded px-1.5 py-0.5 text-foreground text-center border border-border focus:border-gold focus:outline-none" />
        </div>
        <div className="w-px h-4 bg-border" />
        <span>{selectedPiece ? `Placing: ${selectedPiece.name}` : isErasing ? "Eraser mode" : "Select a piece to begin"}</span>
        <div className="flex-1" />
        <span>Right-click to remove • Drag to move • Esc to deselect • Ctrl+Z undo</span>
      </footer>
    </div>
  );
};

export default ScenarioMaker;