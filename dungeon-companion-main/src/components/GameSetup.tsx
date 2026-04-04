import { useState } from "react";
import { Crown, ChevronRight, ChevronLeft, Swords } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HEROES, type HeroId, type Player, useGame } from "@/context/GameContext";
import { playTap, playSelect, playDeselect, playStepForward, playStepBack, playGameStart } from "@/utils/sound-engine";

import heroRegdar from "@/assets/hero-regdar.png";
import heroJozan from "@/assets/hero-jozan.png";
import heroMialee from "@/assets/hero-mialee.png";
import heroLidda from "@/assets/hero-lidda.png";
import heroMorkahn from "@/assets/hero-morkahn.png";
import heroOrwick from "@/assets/hero-orwick.png";
import splashBg from "@/assets/splash-bg.jpg";

const HERO_IMAGES: Record<HeroId, string> = {
  regdar: heroRegdar, jozan: heroJozan, mialee: heroMialee,
  lidda: heroLidda, morkahn: heroMorkahn, orwick: heroOrwick,
};

type Step = "count" | "names" | "dm" | "heroes" | "confirm";

const GameSetup = () => {
  const { setupGame } = useGame();
  const [step, setStep] = useState<Step>("count");
  const [playerCount, setPlayerCount] = useState(2);
  const [names, setNames] = useState<string[]>(["", ""]);
  const [dmIndex, setDmIndex] = useState<number | null>(null);
  const [heroAssignments, setHeroAssignments] = useState<Record<number, HeroId[]>>({});

  const baseHeroes: HeroId[] = ["regdar", "jozan", "mialee", "lidda"];

  const handleCountChange = (count: number) => {
    playTap();
    setPlayerCount(count);
    setNames(prev => {
      const next = [...prev];
      while (next.length < count) next.push("");
      return next.slice(0, count);
    });
    setDmIndex(null);
    setHeroAssignments({});
  };

  const handleNameChange = (idx: number, name: string) => {
    setNames(prev => {
      const next = [...prev];
      next[idx] = name;
      return next;
    });
  };

  const goForward = (next: Step) => {
    playStepForward();
    setStep(next);
  };

  const goBack = (prev: Step) => {
    playStepBack();
    setStep(prev);
  };

  const autoAssignHeroes = (dmIdx: number) => {
    const heroPlayers = Array.from({ length: playerCount }, (_, i) => i).filter(i => i !== dmIdx);
    const assignments: Record<number, HeroId[]> = {};
    heroPlayers.forEach(i => { assignments[i] = []; });
    baseHeroes.forEach((heroId, idx) => {
      const playerIdx = heroPlayers[idx % heroPlayers.length];
      assignments[playerIdx].push(heroId);
    });
    setHeroAssignments(assignments);
  };

  const toggleHero = (playerIdx: number, heroId: HeroId) => {
    setHeroAssignments(prev => {
      const wasAssigned = prev[playerIdx]?.includes(heroId);
      if (wasAssigned) playDeselect(); else playSelect();
      const next = { ...prev };
      Object.keys(next).forEach(k => {
        const ki = parseInt(k);
        next[ki] = next[ki].filter(h => h !== heroId);
      });
      if (!wasAssigned) {
        next[playerIdx] = [...(next[playerIdx] || []), heroId];
      }
      return next;
    });
  };

  const allHeroesAssigned = baseHeroes.every(h =>
    Object.values(heroAssignments).some(arr => arr.includes(h))
  );

  const handleConfirm = () => {
    if (dmIndex === null) return;
    playGameStart();
    const players: Player[] = names.map((name, i) => ({
      id: `player_${i}`,
      name: name.trim() || `Player ${i + 1}`,
      isDM: i === dmIndex,
      heroIds: i === dmIndex ? [] : (heroAssignments[i] || []),
    }));
    setupGame(players);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-15">
        <img src={splashBg} alt="" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/50" />
      </div>

      <div className="w-full max-w-lg relative z-10">
        <div className="flex items-center gap-1.5 mb-8 px-2">
          {(["count", "names", "dm", "heroes", "confirm"] as Step[]).map((s, i) => (
            <div key={s} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
              (["count", "names", "dm", "heroes", "confirm"] as Step[]).indexOf(step) >= i
                ? "bg-primary" : "bg-secondary"
            }`} />
          ))}
        </div>

        {step === "count" && (
          <div className="animate-fade-in text-center space-y-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-primary tracking-wide glow-gold-text">
                How Many Adventurers?
              </h2>
              <p className="text-sm text-muted-foreground mt-3 font-body">Choose 2–5 players. One will be the Dungeon Master.</p>
            </div>
            <div className="flex justify-center gap-3">
              {[2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  onClick={() => handleCountChange(n)}
                  className={`w-16 h-16 rounded-xl text-2xl font-display font-bold border-2 transition-all duration-300 ${
                    playerCount === n
                      ? "border-primary bg-primary/10 text-primary shadow-lg glow-gold"
                      : "border-border bg-card text-muted-foreground hover:border-primary/50"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            <Button onClick={() => goForward("names")} className="w-full h-12 font-heading tracking-wider text-base">
              Continue <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {step === "names" && (
          <div className="animate-fade-in space-y-6">
            <div className="text-center">
              <h2 className="font-display text-xl font-bold text-primary tracking-wide glow-gold-text">
                Name Your Party
              </h2>
              <p className="text-sm text-muted-foreground mt-2 font-body">Enter each player's name</p>
            </div>
            <div className="space-y-3">
              {names.map((name, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-sm font-heading font-bold text-primary/60">
                    {i + 1}
                  </span>
                  <Input
                    value={name}
                    onChange={e => handleNameChange(i, e.target.value)}
                    placeholder={`Player ${i + 1}`}
                    className="flex-1 h-11 bg-card border-border font-body text-base"
                    maxLength={20}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => goBack("count")} className="flex-1 h-11 font-heading">
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </Button>
              <Button onClick={() => goForward("dm")} className="flex-1 h-11 font-heading tracking-wider">
                Continue <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === "dm" && (
          <div className="animate-fade-in space-y-6">
            <div className="text-center">
              <Crown className="w-10 h-10 text-primary mx-auto mb-3" />
              <h2 className="font-display text-xl font-bold text-primary tracking-wide glow-gold-text">
                Choose the Dungeon Master
              </h2>
              <p className="text-sm text-muted-foreground mt-2 font-body">
                The DM controls the dungeon, monsters, and adventure
              </p>
            </div>
            <div className="space-y-2">
              {names.map((name, i) => (
                <button
                  key={i}
                  onClick={() => { playSelect(); setDmIndex(i); autoAssignHeroes(i); }}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    dmIndex === i
                      ? "border-primary bg-primary/10 glow-gold"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  <Crown className={`w-5 h-5 ${dmIndex === i ? "text-primary" : "text-muted-foreground"}`} />
                  <span className={`font-heading text-sm font-semibold ${dmIndex === i ? "text-primary" : "text-foreground"}`}>
                    {name.trim() || `Player ${i + 1}`}
                  </span>
                  {dmIndex === i && <span className="ml-auto text-xs text-primary font-heading">Dungeon Master</span>}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => goBack("names")} className="flex-1 h-11 font-heading">
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </Button>
              <Button onClick={() => goForward("heroes")} disabled={dmIndex === null} className="flex-1 h-11 font-heading tracking-wider">
                Continue <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === "heroes" && (
          <div className="animate-fade-in space-y-6">
            <div className="text-center">
              <h2 className="font-display text-xl font-bold text-primary tracking-wide glow-gold-text">
                Choose Your Heroes
              </h2>
              <p className="text-sm text-muted-foreground mt-2 font-body">
                All 4 heroes must be assigned. Tap a name to reassign.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {baseHeroes.map(heroId => {
                const hero = HEROES.find(h => h.id === heroId)!;
                const assignedTo = Object.entries(heroAssignments).find(([_, arr]) => arr.includes(heroId));
                const assignedPlayerIdx = assignedTo ? parseInt(assignedTo[0]) : null;
                return (
                  <div key={heroId} className="card-fantasy rounded-xl p-3 space-y-2">
                    <div className="flex items-center gap-2.5">
                      <img src={HERO_IMAGES[heroId]} alt={hero.name} className="w-12 h-12 rounded-lg object-cover border border-primary/20" loading="lazy" width={48} height={48} />
                      <div>
                        <div className="text-sm font-heading font-bold text-foreground">{hero.name}</div>
                        <div className="text-[10px] text-muted-foreground font-body">{hero.title}</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {names.map((name, i) => {
                        if (i === dmIndex) return null;
                        const isAssigned = assignedPlayerIdx === i;
                        return (
                          <button
                            key={i}
                            onClick={() => toggleHero(i, heroId)}
                            className={`text-[11px] px-2.5 py-1 rounded-full border transition-all font-heading ${
                              isAssigned
                                ? "border-primary bg-primary/15 text-primary font-semibold"
                                : "border-border text-muted-foreground hover:border-primary/40"
                            }`}
                          >
                            {name.trim() || `P${i + 1}`}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => goBack("dm")} className="flex-1 h-11 font-heading">
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </Button>
              <Button onClick={() => goForward("confirm")} disabled={!allHeroesAssigned} className="flex-1 h-11 font-heading tracking-wider">
                Continue <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === "confirm" && (
          <div className="animate-fade-in space-y-6">
            <div className="text-center">
              <Swords className="w-10 h-10 text-primary mx-auto mb-3" />
              <h2 className="font-display text-xl font-bold text-primary tracking-wide glow-gold-text">
                Ready to Begin?
              </h2>
            </div>
            <div className="space-y-2">
              {names.map((name, i) => {
                const isDM = i === dmIndex;
                const heroes = heroAssignments[i] || [];
                return (
                  <div key={i} className="card-fantasy p-4 rounded-xl flex items-center gap-3">
                    {isDM ? (
                      <Crown className="w-8 h-8 text-primary shrink-0" />
                    ) : heroes[0] ? (
                      <img src={HERO_IMAGES[heroes[0]]} alt="" className="w-10 h-10 rounded-lg object-cover border border-primary/20 shrink-0" loading="lazy" width={40} height={40} />
                    ) : null}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-heading font-semibold text-foreground">{name.trim() || `Player ${i + 1}`}</div>
                      <div className="text-xs text-muted-foreground font-body">
                        {isDM ? "Dungeon Master" : heroes.map(h => HEROES.find(hero => hero.id === h)?.name).join(" & ")}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => goBack("heroes")} className="flex-1 h-11 font-heading">
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </Button>
              <Button onClick={handleConfirm} className="flex-1 h-12 font-heading tracking-wider text-base">
                Begin Adventure
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameSetup;
