import { ChevronRight, Crown, RotateCcw } from "lucide-react";
import { useGame, HEROES, type HeroId } from "@/context/GameContext";
import { Button } from "@/components/ui/button";
import { playNextTurn, playReset } from "@/utils/sound-engine";

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

const TurnBar = () => {
  const { state, getCurrentPlayer, nextTurn, resetGame } = useGame();

  if (!state.isSetupComplete || state.players.length === 0) return null;

  const current = getCurrentPlayer();
  if (!current) return null;

  const heroNames = current.heroIds.map(h => HEROES.find(hero => hero.id === h)?.name).filter(Boolean);

  const handleNextTurn = () => {
    playNextTurn();
    nextTurn();
  };

  const handleReset = () => {
    playReset();
    resetGame();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-primary/20 shadow-[0_-4px_20px_hsl(225,20%,3%/0.5)] safe-bottom">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          {current.isDM ? (
            <div className="w-9 h-9 rounded-lg bg-accent/20 flex items-center justify-center border border-accent/30 shrink-0">
              <Crown className="w-5 h-5 text-accent" />
            </div>
          ) : current.heroIds[0] ? (
            <img src={HERO_IMAGES[current.heroIds[0]]} alt="" className="w-9 h-9 rounded-lg object-cover border border-primary/30 shrink-0" loading="lazy" width={36} height={36} />
          ) : null}
          <div className="min-w-0">
            <div className="text-sm font-heading font-bold text-foreground truncate">{current.name}'s Turn</div>
            <div className="text-[10px] text-muted-foreground font-body truncate">
              {current.isDM ? "Dungeon Master" : heroNames.join(" & ")}
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1">
          {state.turnOrder.map((pid, i) => {
            const p = state.players.find(pl => pl.id === pid);
            if (!p) return null;
            const isCurrent = i === state.currentTurnIndex;
            return (
              <div key={pid} className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded-full border transition-all ${
                isCurrent ? "border-primary bg-primary/15 text-primary font-bold" : "border-border text-muted-foreground"
              }`}>
                {p.isDM ? <Crown className="w-3 h-3" /> : p.heroIds[0] ? (
                  <img src={HERO_IMAGES[p.heroIds[0]]} alt="" className="w-4 h-4 rounded-full object-cover" width={16} height={16} />
                ) : null}
                <span>{p.isDM ? "DM" : p.name.slice(0, 6)}</span>
              </div>
            );
          })}
        </div>

        <Button size="sm" onClick={handleNextTurn} className="font-heading tracking-wide shrink-0">
          Next <ChevronRight className="w-3 h-3 ml-1" />
        </Button>
        <Button size="icon" variant="ghost" onClick={handleReset} title="Reset game" className="w-8 h-8 text-muted-foreground shrink-0">
          <RotateCcw className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
};

export default TurnBar;
