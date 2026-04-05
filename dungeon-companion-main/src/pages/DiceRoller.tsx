import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Dice5, Info } from "lucide-react";
import { DICE, type DieDefinition, type DieFace } from "@/data/dice-data";
import { useGame } from "@/context/GameContext";
import { getDiceFaceImage } from "@/data/dice-face-images";
import { playDiceRoll, playDiceHit, playDiceMiss, playBack, playTogglePanel } from "@/utils/sound-engine";

const DM_ALLOWED = ["d6"];
const HERO_COMBAT_DICE = ["yellow", "orange", "red", "purple"];
const HERO_SPECIAL_DICE = ["black_star", "black_eye", "black_skull", "black_trap"];

const DiceRoller = () => {
  const navigate = useNavigate();
  const { state, getCurrentPlayer } = useGame();
  const current = getCurrentPlayer();
  const isDM = current?.isDM ?? false;

  const [rollingDieId, setRollingDieId] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<{ die: DieDefinition; face: DieFace } | null>(null);
  const [animFace, setAnimFace] = useState<DieFace | null>(null);
  const [showRules, setShowRules] = useState(false);

  // Clear on turn change
  useEffect(() => {
    setLastResult(null);
    setRollingDieId(null);
  }, [state.turnVersion]);

  const rollDie = useCallback((die: DieDefinition) => {
    if (rollingDieId) return; // already rolling
    setRollingDieId(die.id);
    setLastResult(null);
    playDiceRoll();

    let count = 0;
    const interval = setInterval(() => {
      count++;
      const randomFace = die.faces[Math.floor(Math.random() * die.faces.length)];
      setAnimFace(randomFace);

      if (count >= 10) {
        clearInterval(interval);
        const finalFace = die.faces[Math.floor(Math.random() * die.faces.length)];
        const isMissResult = finalFace.type === "miss" || finalFace.type === "trap_explode";
        setTimeout(() => isMissResult ? playDiceMiss() : playDiceHit(), 100);
        setLastResult({ die, face: finalFace });
        setAnimFace(null);
        setRollingDieId(null);
        // Scroll to top so user sees the result
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 70);
  }, [rollingDieId]);

  // Filter dice based on role
  const availableDice = DICE.filter(die => {
    if (isDM) return DM_ALLOWED.includes(die.id);
    return true;
  });

  const combatDice = availableDice.filter(d => HERO_COMBAT_DICE.includes(d.id));
  const specialDice = availableDice.filter(d => HERO_SPECIAL_DICE.includes(d.id));
  const movementDice = availableDice.filter(d => d.id === "d6");

  const renderDie = (die: DieDefinition) => {
    const isThisRolling = rollingDieId === die.id;
    const isDisabled = rollingDieId !== null && !isThisRolling;

    return (
      <button
        key={die.id}
        onClick={() => rollDie(die)}
        disabled={isDisabled}
        className={`relative rounded-xl border p-4 transition-all duration-200 flex flex-col items-center gap-2 aspect-square justify-center ${
          isThisRolling
            ? "border-primary/60 bg-card shadow-lg scale-105"
            : isDisabled
            ? "border-border/40 bg-card/20 opacity-40 cursor-not-allowed"
            : "border-border bg-card/50 hover:border-primary/40 hover:bg-card hover:shadow-md active:scale-95"
        }`}
      >
        {(() => {
          const displayFace = isThisRolling && animFace ? animFace : die.faces[0];
          const faceImage = getDiceFaceImage(die.id, displayFace.type, displayFace.value);
          if (faceImage) {
            return (
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden ${isThisRolling ? "animate-spin" : ""}`}
                style={{ boxShadow: isThisRolling ? `0 0 16px ${die.color}50` : "none" }}
              >
                <img src={faceImage} alt={die.shortName} className="w-full h-full object-contain drop-shadow-md" />
              </div>
            );
          }
          return (
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center text-2xl font-bold ${isThisRolling ? "animate-spin" : ""}`}
              style={{
                backgroundColor: die.bgColor,
                border: `2px solid ${die.borderColor}`,
                color: die.id === "d6" ? "hsl(220, 15%, 15%)" : "hsl(220, 15%, 10%)",
                boxShadow: isThisRolling ? `0 0 16px ${die.color}50` : "none",
              }}
            >
              {isThisRolling && animFace ? (
                animFace.type === "number" ? animFace.value : animFace.icon
              ) : (
                die.id === "d6" ? "⚅" : die.faces[0].icon
              )}
            </div>
          );
        })()}
        <div className="text-center">
          <div className="text-xs font-heading font-semibold text-foreground">{die.shortName}</div>
          <div className="text-[10px] text-muted-foreground">{die.description?.slice(0, 20) || "Tap to roll"}</div>
        </div>
      </button>
    );
  };

  // Determine result display info
  const resultFace = lastResult?.face;
  const resultDie = lastResult?.die;
  const isHit = resultFace && (
    resultFace.type === "melee" || resultFace.type === "number" ||
    resultFace.type === "star" || resultFace.type === "eye" || resultFace.type === "hand" ||
    resultFace.type === "skull" || resultFace.type === "trap_defuse"
  );
  const isMiss = resultFace && (resultFace.type === "miss" || resultFace.type === "trap_explode");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-3 flex items-center gap-3">
          <button onClick={() => { playBack(); navigate("/"); }} className="p-2 rounded-md hover:bg-secondary transition-colors">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <Dice5 className="w-5 h-5 text-primary" />
          <h1 className="font-heading text-base sm:text-lg font-bold tracking-wider text-primary glow-gold-text">
            Dice Roller
          </h1>
          <button
            onClick={() => { playTogglePanel(); setShowRules(!showRules); }}
            className="ml-auto p-2 rounded-md hover:bg-secondary transition-colors"
            title="Dice rules"
          >
            <Info className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="flex-1 max-w-3xl mx-auto w-full px-3 sm:px-4 py-3 sm:py-4 md:py-6 flex flex-col gap-4 sm:gap-5 pb-24">
        {/* Rules info panel */}
        {showRules && (
          <div className="animate-fade-in p-4 rounded-lg bg-card border border-border text-xs text-muted-foreground space-y-2">
            <h3 className="font-heading text-sm font-semibold text-foreground">Dice Rules</h3>
            <ul className="space-y-1 list-disc list-inside">
              <li><strong>D6</strong> — Movement die. Roll to determine how far you move.</li>
              <li><strong>Combat dice</strong> (Yellow/Orange/Red/Purple) — Roll as shown on your weapon card.</li>
              <li><strong>Black dice</strong> — Special action dice for abilities, searching, undead, and traps.</li>
              {isDM && <li className="text-primary">As DM, you only roll D6 for monster movement.</li>}
            </ul>
          </div>
        )}

        {/* Last result banner */}
        {lastResult && resultFace && resultDie && (
          <div className={`animate-fade-in rounded-xl border p-4 sm:p-5 text-center ${
            isHit
              ? "border-primary/40 bg-primary/5 shadow-lg"
              : isMiss
              ? "border-destructive/30 bg-destructive/5"
              : "border-border bg-card"
          }`}>
            <div className="flex items-center justify-center gap-4">
              {(() => {
                const faceImage = getDiceFaceImage(resultDie.id, resultFace.type, resultFace.value);
                if (faceImage) {
                  return (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 animate-scale-in">
                      <img src={faceImage} alt={resultFace.label} className="w-full h-full object-contain drop-shadow-lg" />
                    </div>
                  );
                }
                return (
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl flex items-center justify-center text-4xl font-bold animate-scale-in"
                    style={{
                      backgroundColor: resultDie.bgColor,
                      border: `3px solid ${resultDie.borderColor}`,
                      color: resultDie.id === "d6" ? "hsl(220, 15%, 15%)" : "hsl(220, 15%, 10%)",
                      boxShadow: `0 0 20px ${resultDie.color}30`,
                    }}
                  >
                    {resultFace.type === "number" ? resultFace.value : resultFace.icon}
                  </div>
                );
              })()}
              <div className="text-left">
                <div className="text-lg sm:text-xl font-heading font-bold text-foreground">
                  {resultFace.label}
                </div>
                <div className="text-sm text-muted-foreground mt-0.5">{resultDie.name}</div>
                {resultFace.type === "number" && (
                  <div className="mt-1 text-xs px-2.5 py-0.5 rounded-full bg-secondary text-foreground inline-block">
                    Movement: {resultFace.value}
                  </div>
                )}
                {resultFace.type === "melee" && (
                  <div className="mt-1 text-xs px-2.5 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30 inline-block">
                    ⚔️ {resultFace.value} {resultFace.value === 1 ? "Sword" : "Swords"}
                  </div>
                )}
                {isMiss && (
                  <div className="mt-1 text-xs px-2.5 py-0.5 rounded-full bg-destructive/15 text-destructive inline-block">
                    Miss!
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Instruction */}
        <p className="text-xs text-muted-foreground text-center font-body">
          Tap any die to roll it
        </p>

        {/* Movement dice */}
        <section className="animate-fade-in">
          <h2 className="font-heading text-sm font-semibold text-primary mb-3 tracking-wide">Movement</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3">
            {movementDice.map(renderDie)}
          </div>
        </section>

        {/* Combat dice */}
        {!isDM && combatDice.length > 0 && (
          <section className="animate-fade-in" style={{ animationDelay: "50ms" }}>
            <h2 className="font-heading text-sm font-semibold text-primary mb-3 tracking-wide">Combat Dice</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3">
              {combatDice.map(renderDie)}
            </div>
          </section>
        )}

        {/* Special dice */}
        {!isDM && specialDice.length > 0 && (
          <section className="animate-fade-in" style={{ animationDelay: "100ms" }}>
            <h2 className="font-heading text-sm font-semibold text-primary mb-3 tracking-wide">Special Dice</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3">
              {specialDice.map(renderDie)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default DiceRoller;
