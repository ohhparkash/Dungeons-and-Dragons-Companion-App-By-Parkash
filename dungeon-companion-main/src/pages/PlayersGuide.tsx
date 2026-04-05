import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Heart, Footprints, Sparkles, Swords, ChevronDown, ChevronRight, BookOpen, Zap, Users, Star, Package } from "lucide-react";
import { heroes, playerRules, playerIntro, type Hero } from "@/data/player-guide-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { playBack, playTabSwitch, playCardFlip } from "@/utils/sound-engine";

const heroAccents: Record<string, string> = {
  Regdar: "text-crimson",
  Jozan: "text-gold",
  Mialee: "text-purple-400",
  Lidda: "text-emerald-400",
};

const heroBgAccents: Record<string, string> = {
  Regdar: "bg-accent/20",
  Jozan: "bg-primary/15",
  Mialee: "bg-purple-500/15",
  Lidda: "bg-emerald-500/15",
};

const HeroCard = ({ hero }: { hero: Hero }) => {
  const [open, setOpen] = useState(false);
  const accent = heroAccents[hero.name] || "text-gold";
  const bgAccent = heroBgAccents[hero.name] || "bg-secondary";

  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left rounded-lg border border-border bg-card p-4 transition-all duration-300 hover:border-gold-dim"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-md ${bgAccent} ${accent}`}>
            <Swords className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading text-sm font-semibold tracking-wide text-foreground">{hero.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {hero.race} {hero.class}
            </p>
          </div>
        </div>
        {open ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
      </div>

      {open && (
        <div className="mt-4 space-y-4 animate-fade-in">
          <p className="text-sm text-muted-foreground leading-relaxed">{hero.description}</p>

          {/* Stats per level */}
          <div>
            <p className="text-xs font-semibold text-gold mb-2">Stats by Level</p>
            <div className="grid grid-cols-3 gap-2 text-center">
              {([1, 2, 3] as const).map((lvl) => (
                <div key={lvl} className="p-2.5 rounded-md bg-secondary/50 border border-border">
                  <p className="text-[10px] text-muted-foreground mb-1.5">Level {lvl}</p>
                  <div className="space-y-1">
                    <StatRow icon={<Heart className="w-3 h-3" />} label="HP" value={hero.stats.hitPoints[`level${lvl}`]} />
                    <StatRow icon={<Shield className="w-3 h-3" />} label="AC" value={hero.stats.armorClass[`level${lvl}`]} />
                    {hero.stats.spellPoints && (
                      <StatRow icon={<Sparkles className="w-3 h-3" />} label="SP" value={hero.stats.spellPoints[`level${lvl}`]} />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-2">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Footprints className="w-3 h-3 text-gold" /> Move: {hero.stats.movement}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Package className="w-3 h-3 text-gold" /> Items: {hero.stats.maxItems}
              </div>
            </div>
          </div>

          {/* Special Actions */}
          {hero.specialActions.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-gold mb-1.5">Special Actions</p>
              <div className="flex flex-wrap gap-1.5">
                {hero.specialActions.map((a) => (
                  <span key={a} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-gold border border-primary/20">
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Basic Items */}
          <div>
            <p className="text-xs font-semibold text-gold mb-2">Basic Items by Level</p>
            <div className="space-y-1.5">
              {([1, 2, 3] as const).map((lvl) => (
                <div key={lvl} className="flex items-start gap-2 text-xs">
                  <span className="text-gold font-semibold min-w-[2rem]">Lv{lvl}</span>
                  <span className="text-muted-foreground">
                    {hero.basicItems[`level${lvl}`].join(", ")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </button>
  );
};

const StatRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) => (
  <div className="flex items-center justify-between gap-1 text-[10px]">
    <span className="flex items-center gap-1 text-muted-foreground">
      <span className="text-gold">{icon}</span>{label}
    </span>
    <span className="font-semibold text-foreground">{value}</span>
  </div>
);

const PlayersGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => { playBack(); navigate("/"); }} className="p-2 rounded-md hover:bg-secondary transition-colors">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <h1 className="font-heading text-lg font-bold tracking-wider text-gold glow-gold-text">
            Player's Guide
          </h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-24">
        {/* Intro */}
        <section className="animate-fade-in">
          <div className="p-5 rounded-lg bg-card border border-border">
            <h2 className="font-heading text-base font-semibold text-gold mb-2">{playerIntro.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">{playerIntro.description}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{playerIntro.details}</p>
          </div>
        </section>

        {/* Tabs */}
        <Tabs defaultValue="heroes" onValueChange={() => playTabSwitch()} className="animate-fade-in" style={{ animationDelay: "150ms", opacity: 0 }}>
          <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <TabsList className="flex w-max min-w-full bg-secondary">
            <TabsTrigger value="heroes" className="text-[11px] sm:text-xs data-[state=active]:text-gold">
              <Users className="w-3.5 h-3.5 mr-1 shrink-0" /> Heroes
            </TabsTrigger>
            <TabsTrigger value="rules" className="text-[11px] sm:text-xs data-[state=active]:text-gold">
              <BookOpen className="w-3.5 h-3.5 mr-1 shrink-0" /> Rules
            </TabsTrigger>
            <TabsTrigger value="combat" className="text-[11px] sm:text-xs data-[state=active]:text-gold">
              <Swords className="w-3.5 h-3.5 mr-1 shrink-0" /> Combat
            </TabsTrigger>
          </TabsList>
          </div>

          {/* Heroes Tab */}
          <TabsContent value="heroes" className="mt-4 space-y-2">
            {heroes.map((h) => (
              <HeroCard key={h.name} hero={h} />
            ))}
          </TabsContent>

          {/* Rules Tab */}
          <TabsContent value="rules" className="mt-4 space-y-4">
            <RuleBlock title="1. Choosing Your Role" text={playerRules.choosingRole} />

            <div className="p-4 rounded-lg bg-card border border-border space-y-3">
              <h3 className="font-heading text-sm font-semibold text-gold">2. Hero Cards</h3>
              <RuleParagraph label="Hit Points" text={playerRules.heroCards.hitPoints} />
              <RuleParagraph label="Armour Class" text={playerRules.heroCards.armorClass} />
              <RuleParagraph label="Spell Points" text={playerRules.heroCards.spellPoints} />
              <RuleParagraph label="Items" text={playerRules.heroCards.items} />
            </div>

            <RuleBlock title="3. Beginning the Quest" text={playerRules.beginningTheQuest} />
            <RuleBlock title="4. Initiative Cards" text={playerRules.initiativeCards} />

            <div className="p-4 rounded-lg bg-card border border-border space-y-3">
              <h3 className="font-heading text-sm font-semibold text-gold">5. Actions</h3>
              <p className="text-sm text-muted-foreground">{playerRules.actions.description}</p>
              {playerRules.actions.list.map((a) => (
                <RuleParagraph key={a.name} label={a.name} text={a.detail} />
              ))}
            </div>

            <div className="p-4 rounded-lg bg-card border border-border space-y-3">
              <h3 className="font-heading text-sm font-semibold text-gold">Special Actions</h3>
              {playerRules.specialActions.map((sa) => (
                <div key={sa.name}>
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-xs font-semibold text-gold-dim">{sa.name}</p>
                    <div className="flex gap-1">
                      {sa.heroes.map((h) => (
                        <span key={h} className="text-[9px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">{h}</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{sa.detail}</p>
                </div>
              ))}
            </div>

            <RuleBlock title="Dead Heroes" text={playerRules.deadHeroes} />

            <div className="p-4 rounded-lg bg-card border border-border space-y-3">
              <h3 className="font-heading text-sm font-semibold text-gold">8. Continuing Play</h3>
              <RuleParagraph label="Heroes Win" text={playerRules.continuingPlay.heroesWin} />
              <RuleParagraph label="DM Wins" text={playerRules.continuingPlay.dmWins} />
              <RuleParagraph label="After an Adventure" text={playerRules.continuingPlay.afterAdventure} />
            </div>
          </TabsContent>

          {/* Combat Tab */}
          <TabsContent value="combat" className="mt-4 space-y-4">
            <div className="p-4 rounded-lg bg-card border border-border">
              <h3 className="font-heading text-sm font-semibold text-gold mb-3">How to Attack</h3>
              <ol className="space-y-2">
                {playerRules.combat.steps.map((step, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2.5">
                    <span className="text-gold font-semibold text-xs mt-0.5 min-w-[1rem]">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <RuleBlock title="Attack Types" text={playerRules.combat.attackTypes} />
            <RuleBlock title="Calculating Damage" text={playerRules.combat.damage} />
            <RuleBlock title="Power Attack" text={playerRules.combat.powerAttack} />
            <RuleBlock title="Re-Roll" text={playerRules.combat.reRoll} />

            {/* Combat Example */}
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <h3 className="font-heading text-sm font-semibold text-gold mb-2">Combat Example</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Lidda is fighting a Goblin and attacks with her Balanced Throwing Dagger. She rolls 2 swords. The Goblin's Armour Class is 1, so it takes <span className="text-foreground font-semibold">2 − 1 = 1</span> Hit Point of damage.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const RuleBlock = ({ title, text }: { title: string; text: string }) => (
  <div className="p-4 rounded-lg bg-card border border-border">
    <h3 className="font-heading text-sm font-semibold text-gold mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
  </div>
);

const RuleParagraph = ({ label, text }: { label: string; text: string }) => (
  <div>
    <p className="text-xs font-semibold text-gold-dim mb-0.5">{label}</p>
    <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
  </div>
);

export default PlayersGuide;
