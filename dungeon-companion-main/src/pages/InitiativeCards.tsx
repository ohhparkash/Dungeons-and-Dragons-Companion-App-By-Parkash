import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Crown } from "lucide-react";
import { useGame, HEROES, type HeroId } from "@/context/GameContext";
import { playBack } from "@/utils/sound-engine";

import cardBack from "@/assets/card-back.jpg";
import cardFrontBg from "@/assets/card-front-bg.jpg";
import heroRegdar from "@/assets/hero-regdar.png";
import heroJozan from "@/assets/hero-jozan.png";
import heroMialee from "@/assets/hero-mialee.png";
import heroLidda from "@/assets/hero-lidda.png";
import heroMorkahn from "@/assets/hero-morkahn.png";
import heroOrwick from "@/assets/hero-orwick.png";

const HERO_IMAGES: Record<HeroId, string> = {
  regdar: heroRegdar, jozan: heroJozan, mialee: heroMialee,
  lidda: heroLidda, morkahn: heroMorkahn, orwick: heroOrwick,
};

// ─── Sounds ──────────────────────────────────────────────────

let audioCtx: AudioContext | null = null;
function ctx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function playShuffleLoop() {
  try {
    const c = ctx();
    const now = c.currentTime;
    for (let i = 0; i < 16; i++) {
      const delay = i * 0.07 + Math.random() * 0.02;
      const len = c.sampleRate * 0.025;
      const buf = c.createBuffer(1, len, c.sampleRate);
      const d = buf.getChannelData(0);
      for (let j = 0; j < len; j++) {
        d[j] = (Math.random() * 2 - 1) * Math.exp(-j / (len * 0.12)) * 0.35;
      }
      const src = c.createBufferSource();
      src.buffer = buf;
      const bp = c.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 1600 + Math.random() * 800;
      bp.Q.value = 1;
      const g = c.createGain();
      g.gain.setValueAtTime(0.07, now + delay);
      g.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.04);
      src.connect(bp).connect(g).connect(c.destination);
      src.start(now + delay);
    }
    navigator.vibrate?.([8, 15, 8, 15, 8, 15, 8]);
  } catch {}
}

function playCardFlipSound() {
  try {
    const c = ctx();
    const t = c.currentTime;
    const len = c.sampleRate * 0.05;
    const buf = c.createBuffer(1, len, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (len * 0.15)) * 0.3;
    }
    const src = c.createBufferSource();
    src.buffer = buf;
    const lp = c.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 2400;
    const g = c.createGain();
    g.gain.setValueAtTime(0.05, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    src.connect(lp).connect(g).connect(c.destination);
    src.start(t);
    // Chime
    const osc = c.createOscillator();
    osc.type = "sine";
    osc.frequency.value = 880;
    const og = c.createGain();
    og.gain.setValueAtTime(0.03, t + 0.02);
    og.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);
    osc.connect(og).connect(c.destination);
    osc.start(t + 0.02);
    osc.stop(t + 0.2);
    navigator.vibrate?.(8);
  } catch {}
}

function playRevealFanfare() {
  try {
    const c = ctx();
    const t = c.currentTime;
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      const osc = c.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;
      const g = c.createGain();
      g.gain.setValueAtTime(0, t + i * 0.1);
      g.gain.linearRampToValueAtTime(0.04 - i * 0.006, t + i * 0.1 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.1 + 0.4);
      osc.connect(g).connect(c.destination);
      osc.start(t + i * 0.1);
      osc.stop(t + i * 0.1 + 0.5);
    });
    navigator.vibrate?.(15);
  } catch {}
}

// ─── Types ───────────────────────────────────────────────────

type Phase = "pile" | "shuffling" | "revealing" | "done";

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Roman numerals for initiative numbers ───────────────────
const ROMAN = ["I", "II", "III", "IV", "V"];

const InitiativeCards = () => {
  const navigate = useNavigate();
  const { state, setTurnOrder } = useGame();
  const [phase, setPhase] = useState<Phase>("pile");
  const [shuffledOrder, setShuffledOrder] = useState<string[]>([]);
  const [revealedCount, setRevealedCount] = useState(0);
  const [pileWobble, setPileWobble] = useState(false);
  const [shufflePositions, setShufflePositions] = useState<{ x: number; y: number; rot: number }[]>([]);
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  const players = state.players;
  // Only hero players participate in initiative shuffle — DM is always last
  const heroPlayers = players.filter(p => !p.isDM);
  const dm = players.find(p => p.isDM);
  const playerIds = heroPlayers.map(p => p.id);
  const cardCount = playerIds.length;

  const clearTimeouts = () => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  };

  useEffect(() => () => clearTimeouts(), []);

  const getPlayer = (id: string) => players.find(p => p.id === id);

  // Tap the pile to start shuffling
  const handlePileTap = useCallback(() => {
    if (phase !== "pile" && phase !== "done") return;
    clearTimeouts();
    setPhase("shuffling");
    setRevealedCount(0);
    playShuffleLoop();

    // Animate scatter/shuffle for ~1.5s
    let count = 0;
    const interval = setInterval(() => {
      count++;
      const positions = playerIds.map(() => ({
        x: (Math.random() - 0.5) * 120,
        y: (Math.random() - 0.5) * 40,
        rot: (Math.random() - 0.5) * 40,
      }));
      setShufflePositions(positions);

      if (count >= 18) {
        clearInterval(interval);
        // Collect back to stack
        setShufflePositions(playerIds.map(() => ({ x: 0, y: 0, rot: 0 })));

        const newOrder = shuffleArray(playerIds);
        setShuffledOrder(newOrder);

        const t1 = setTimeout(() => {
          setPhase("revealing");
          playRevealFanfare();

          // Reveal one by one
          newOrder.forEach((_, i) => {
            const t = setTimeout(() => {
              playCardFlipSound();
              setRevealedCount(i + 1);
              if (i === newOrder.length - 1) {
                const tDone = setTimeout(() => {
                  setPhase("done");
                  // Append DM at the end of turn order
                  const finalOrder = dm ? [...newOrder, dm.id] : newOrder;
                  setTurnOrder(finalOrder);
                }, 1000);
                timeoutRefs.current.push(tDone);
              }
            }, i * 700);
            timeoutRefs.current.push(t);
          });
        }, 500);
        timeoutRefs.current.push(t1);
      }
    }, 80);

    timeoutRefs.current.push(interval as unknown as ReturnType<typeof setTimeout>);
  }, [phase, playerIds, setTurnOrder]);

  // Wobble effect on hover/focus for pile
  const handlePileHover = () => {
    if (phase === "pile" || phase === "done") setPileWobble(true);
  };
  const handlePileLeave = () => setPileWobble(false);

  const displayOrder = shuffledOrder.length > 0 ? shuffledOrder : playerIds;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-3 flex items-center gap-3">
          <button onClick={() => { playBack(); navigate("/"); }} className="p-2 rounded-md hover:bg-secondary transition-colors">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <h1 className="font-heading text-base sm:text-lg font-bold tracking-wider text-primary glow-gold-text">
            Initiative Cards
          </h1>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-24">
        {/* Pile phase — stacked cards, tap to shuffle */}
        {phase === "pile" && (
          <div className="flex flex-col items-center gap-6 animate-fade-in">
            <p className="text-sm text-muted-foreground font-body text-center">
              Tap the card pile to shuffle initiative
            </p>
            <button
              onClick={handlePileTap}
              onMouseEnter={handlePileHover}
              onMouseLeave={handlePileLeave}
              className="relative cursor-pointer active:scale-95 transition-transform duration-150"
              style={{ width: 140, height: 196 }}
            >
              {/* Stacked cards (back face) */}
              {Array.from({ length: Math.min(cardCount, 5) }).map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-xl overflow-hidden shadow-lg"
                  style={{
                    transform: `translate(${i * 3}px, ${-i * 3}px) rotate(${pileWobble ? (i - 2) * 3 : (i - 2) * 1.5}deg)`,
                    transition: "transform 0.3s ease-out",
                    zIndex: i,
                  }}
                >
                  <img src={cardBack} alt="" className="w-full h-full object-cover" width={140} height={196} />
                </div>
              ))}
            </button>
            <div className="text-xs text-muted-foreground font-heading tracking-wide">
              {cardCount} cards
            </div>
          </div>
        )}

        {/* Shuffling phase */}
        {phase === "shuffling" && (
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-primary font-heading tracking-wide animate-pulse">
              Shuffling...
            </p>
            <div className="relative" style={{ width: 300, height: 220 }}>
              {playerIds.map((_, i) => {
                const pos = shufflePositions[i] || { x: 0, y: 0, rot: 0 };
                return (
                  <div
                    key={i}
                    className="absolute rounded-xl overflow-hidden shadow-lg"
                    style={{
                      width: 120, height: 168,
                      left: "50%", top: "50%",
                      marginLeft: -60, marginTop: -84,
                      transform: `translate(${pos.x}px, ${pos.y}px) rotate(${pos.rot}deg)`,
                      transition: "transform 0.08s ease-out",
                      zIndex: i,
                    }}
                  >
                    <img src={cardBack} alt="" className="w-full h-full object-cover" width={120} height={168} />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Revealing & Done phases — cards spread out, flip one by one */}
        {(phase === "revealing" || phase === "done") && (
          <div className="flex flex-col items-center gap-6 w-full">
            {phase === "done" && (
              <p className="text-xs text-muted-foreground font-body text-center animate-fade-in">
                Tap the pile again to reshuffle
              </p>
            )}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {displayOrder.map((pid, i) => {
                const isRevealed = i < revealedCount;
                const player = getPlayer(pid);
                if (!player) return null;

                return (
                  <div
                    key={pid}
                    className="animate-fade-in"
                    style={{
                      width: 110, height: 154,
                      perspective: 800,
                      animationDelay: `${i * 100}ms`,
                    }}
                  >
                    <div
                      style={{
                        width: "100%", height: "100%",
                        transformStyle: "preserve-3d",
                        transition: "transform 0.6s ease-out",
                        transform: isRevealed ? "rotateY(180deg)" : "rotateY(0deg)",
                      }}
                    >
                      {/* Back */}
                      <div className="absolute inset-0 rounded-xl overflow-hidden shadow-lg" style={{ backfaceVisibility: "hidden" }}>
                        <img src={cardBack} alt="" className="w-full h-full object-cover" width={110} height={154} />
                      </div>
                      {/* Front */}
                      <div className="absolute inset-0 rounded-xl overflow-hidden shadow-lg" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                        <img src={cardFrontBg} alt="" className="w-full h-full object-cover absolute inset-0" width={110} height={154} />
                        <div className="absolute inset-0 flex flex-col items-center justify-between py-3">
                          {/* Turn number */}
                          <div
                            className="font-display text-4xl font-bold leading-none"
                            style={{
                              color: "hsl(15, 70%, 45%)",
                              textShadow: "0 0 15px hsl(15, 80%, 40% / 0.6), 0 2px 4px hsl(0, 0%, 0% / 0.8)",
                            }}
                          >
                            {ROMAN[i] || i + 1}
                          </div>

                          {/* Hero image or DM */}
                          <div className="flex flex-col items-center gap-1">
                            {player.isDM ? (
                              <div className="w-10 h-10 rounded-full flex items-center justify-center"
                                style={{
                                  background: "linear-gradient(135deg, hsl(38, 70%, 40%), hsl(38, 60%, 25%))",
                                  border: "2px solid hsl(38, 75%, 50% / 0.5)",
                                  boxShadow: "0 0 12px hsl(38, 80%, 50% / 0.3)",
                                }}
                              >
                                <Crown className="w-5 h-5" style={{ color: "hsl(38, 30%, 90%)" }} />
                              </div>
                            ) : player.heroIds[0] ? (
                              <img
                                src={HERO_IMAGES[player.heroIds[0]]}
                                alt=""
                                className="w-10 h-10 rounded-full object-cover"
                                style={{
                                  border: "2px solid hsl(38, 75%, 50% / 0.5)",
                                  boxShadow: "0 0 12px hsl(38, 80%, 50% / 0.3)",
                                }}
                                width={40} height={40}
                              />
                            ) : null}
                          </div>

                          {/* Player name */}
                          <div className="text-center px-2">
                            <div className="font-heading text-[10px] font-bold tracking-wider truncate"
                              style={{ color: "hsl(38, 30%, 85%)", textShadow: "0 1px 3px hsl(0, 0%, 0% / 0.9)" }}
                            >
                              {player.name}
                            </div>
                            <div className="text-[8px] truncate"
                              style={{ color: "hsl(38, 20%, 50%)" }}
                            >
                              {player.isDM ? "DM" : player.heroIds.map(h => HEROES.find(hero => hero.id === h)?.name).join(" & ")}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Turn order summary */}
            {phase === "done" && (
              <div className="flex flex-col items-center gap-3 animate-fade-in">
                <div className="text-xs text-primary font-heading font-semibold tracking-wide text-center">
                  ⚔️ {displayOrder.map((pid, i) => {
                    const p = getPlayer(pid);
                    return p ? `${ROMAN[i] || i + 1}. ${p.name}` : "";
                  }).join(" → ")}
                </div>
                <button
                  onClick={handlePileTap}
                  className="mt-2 relative cursor-pointer active:scale-95 transition-transform"
                  style={{ width: 80, height: 112 }}
                >
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute inset-0 rounded-lg overflow-hidden shadow-md"
                      style={{
                        transform: `translate(${i * 2}px, ${-i * 2}px) rotate(${(i - 1) * 2}deg)`,
                        zIndex: i,
                      }}
                    >
                      <img src={cardBack} alt="" className="w-full h-full object-cover" width={80} height={112} />
                    </div>
                  ))}
                </button>
                <p className="text-[10px] text-muted-foreground font-body">Tap to reshuffle</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InitiativeCards;
