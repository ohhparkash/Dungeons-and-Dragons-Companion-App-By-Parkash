import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Skull, Shield, Swords, Heart, Footprints, Zap, ChevronDown, ChevronRight, BookOpen, Map, AlertTriangle, ScrollText } from "lucide-react";
import { monsters, traps, dmRules, adventures, dmIntro, type Monster } from "@/data/dm-guide-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { playBack, playTabSwitch, playCardFlip } from "@/utils/sound-engine";

const MonsterCard = ({ monster }: { monster: Monster }) => {
  const [open, setOpen] = useState(false);

  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left rounded-lg border border-border bg-card p-4 transition-all duration-300 hover:border-gold-dim"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-md ${monster.type === "undead" ? "bg-accent/20 text-crimson" : "bg-secondary text-gold"}`}>
            {monster.type === "undead" ? <Skull className="w-5 h-5" /> : <Swords className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="font-heading text-sm font-semibold tracking-wide text-foreground">{monster.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Level {monster.level} · {monster.type === "undead" ? `Undead (${monster.undeadValue})` : "Standard"}
            </p>
          </div>
        </div>
        {open ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
      </div>

      {open && (
        <div className="mt-4 space-y-3 animate-fade-in">
          <p className="text-sm text-muted-foreground leading-relaxed">{monster.description}</p>

          <div className="grid grid-cols-2 gap-2">
            <StatBadge icon={<Heart className="w-3.5 h-3.5" />} label="HP" value={String(monster.hitPoints)} />
            <StatBadge icon={<Footprints className="w-3.5 h-3.5" />} label="Move" value={String(monster.movement)} />
            <StatBadge icon={<Shield className="w-3.5 h-3.5" />} label="AC" value={String(monster.armorClass)} />
            <StatBadge icon={<Swords className="w-3.5 h-3.5" />} label="Melee" value={monster.meleeAttack.split(" ")[0]} />
          </div>

          {monster.rangedAttack && (
            <div className="text-xs text-muted-foreground">
              <span className="text-gold font-medium">Ranged:</span> {monster.rangedAttack}
            </div>
          )}

          {monster.specialAbility && (
            <div className="p-2.5 rounded-md bg-secondary/50 border border-border">
              <p className="text-xs text-gold font-medium mb-0.5">Special Ability</p>
              <p className="text-xs text-muted-foreground">{monster.specialAbility}</p>
            </div>
          )}
        </div>
      )}
    </button>
  );
};

const StatBadge = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-center gap-2 p-2 rounded-md bg-secondary/50">
    <span className="text-gold">{icon}</span>
    <span className="text-xs text-muted-foreground">{label}</span>
    <span className="text-xs font-semibold text-foreground ml-auto">{value}</span>
  </div>
);

const DungeonMasterGuide = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [monsterFilter, setMonsterFilter] = useState<"all" | "standard" | "undead">("all");

  const filteredMonsters = monsters.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = monsterFilter === "all" || m.type === monsterFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={() => { playBack(); navigate("/"); }} className="p-2 rounded-md hover:bg-secondary transition-colors">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <h1 className="font-heading text-lg font-bold tracking-wider text-gold glow-gold-text">
            Dungeon Master's Guide
          </h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-24">
        {/* DM Intro */}
        <section className="animate-fade-in">
          <div className="p-5 rounded-lg bg-card border border-border">
            <p className="text-sm italic text-muted-foreground leading-relaxed mb-4">{dmIntro.lore}</p>
            <div className="w-12 h-px bg-gold/30 mx-auto mb-4" />
            <h2 className="font-heading text-base font-semibold text-gold mb-2">{dmIntro.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">{dmIntro.description}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{dmIntro.details}</p>
          </div>
        </section>

        {/* Tabs */}
        <Tabs defaultValue="monsters" onValueChange={() => playTabSwitch()} className="animate-fade-in" style={{ animationDelay: "150ms", opacity: 0 }}>
          <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <TabsList className="flex w-max min-w-full bg-secondary gap-0.5">
            <TabsTrigger value="monsters" className="text-[11px] sm:text-xs px-2.5 sm:px-3 whitespace-nowrap data-[state=active]:text-gold">
              <Skull className="w-3.5 h-3.5 mr-1 shrink-0" /> Monsters
            </TabsTrigger>
            <TabsTrigger value="rules" className="text-[11px] sm:text-xs px-2.5 sm:px-3 whitespace-nowrap data-[state=active]:text-gold">
              <BookOpen className="w-3.5 h-3.5 mr-1 shrink-0" /> Rules
            </TabsTrigger>
            <TabsTrigger value="traps" className="text-[11px] sm:text-xs px-2.5 sm:px-3 whitespace-nowrap data-[state=active]:text-gold">
              <AlertTriangle className="w-3.5 h-3.5 mr-1 shrink-0" /> Traps
            </TabsTrigger>
            <TabsTrigger value="adventures" className="text-[11px] sm:text-xs px-2.5 sm:px-3 whitespace-nowrap data-[state=active]:text-gold">
              <Map className="w-3.5 h-3.5 mr-1 shrink-0" /> Quests
            </TabsTrigger>
          </TabsList>
          </div>

          {/* Monsters Tab */}
          <TabsContent value="monsters" className="mt-4 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search monsters..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold-dim transition-colors"
              />
            </div>

            {/* Filter */}
            <div className="flex gap-2">
              {(["all", "standard", "undead"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setMonsterFilter(f)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    monsterFilter === f
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f === "all" ? "All" : f === "undead" ? "☠ Undead" : "⚔ Standard"}
                </button>
              ))}
            </div>

            {/* Monster List */}
            <div className="space-y-2">
              {filteredMonsters.map((m) => (
                <MonsterCard key={m.name} monster={m} />
              ))}
              {filteredMonsters.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">No monsters found.</p>
              )}
            </div>
          </TabsContent>

          {/* Rules Tab */}
          <TabsContent value="rules" className="mt-4 space-y-4">
            <RulesSection title="1. Starting the Game" items={dmRules.startingTheGame} />
            <RulesSection title="2. Setting Up a Room" items={dmRules.settingUpARoom} />

            <div className="p-4 rounded-lg bg-card border border-border space-y-3">
              <h3 className="font-heading text-sm font-semibold text-gold">3. Using Monsters</h3>
              <RuleParagraph label="Placing" text={dmRules.usingMonsters.placing} />
              <RuleParagraph label="Movement & Attack" text={dmRules.usingMonsters.movementAndAttack} />
              <RuleParagraph label="Tapping Cards" text={dmRules.usingMonsters.tapping} />
              <RuleParagraph label="Undead" text={dmRules.usingMonsters.undead} />
            </div>

            <div className="p-4 rounded-lg bg-card border border-border space-y-3">
              <h3 className="font-heading text-sm font-semibold text-gold">4. Doors, Traps & Chests</h3>
              <RuleParagraph label="Opening Doors" text={dmRules.doorsAndTraps.opening} />
              <RuleParagraph label="Locked Doors" text={dmRules.doorsAndTraps.locked} />
              <RuleParagraph label="Traps" text={dmRules.doorsAndTraps.traps} />
              <RuleParagraph label="Disabling Traps" text={dmRules.doorsAndTraps.disabling} />
              <RuleParagraph label="Chests" text={dmRules.doorsAndTraps.chests} />
            </div>

            <RulesSection title="5. Running the Game" items={dmRules.runningTheGame} />

            <div className="p-4 rounded-lg bg-card border border-border">
              <h3 className="font-heading text-sm font-semibold text-gold mb-2">Extra Play Tips</h3>
              <ul className="space-y-1.5">
                {dmRules.extraPlayTips.map((tip, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-gold mt-0.5">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          {/* Traps Tab */}
          <TabsContent value="traps" className="mt-4 space-y-2">
            {traps.map((trap) => (
              <TrapCard key={trap.name} trap={trap} />
            ))}
          </TabsContent>

          {/* Adventures Tab */}
          <TabsContent value="adventures" className="mt-4 space-y-3">
            {adventures.map((adv) => (
              <AdventureCard key={adv.number} adventure={adv} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const RulesSection = ({ title, items }: { title: string; items: string[] }) => (
  <div className="p-4 rounded-lg bg-card border border-border">
    <h3 className="font-heading text-sm font-semibold text-gold mb-3">{title}</h3>
    <ol className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="text-sm text-muted-foreground flex gap-2.5">
          <span className="text-gold font-semibold text-xs mt-0.5 min-w-[1rem]">{i + 1}.</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  </div>
);

const RuleParagraph = ({ label, text }: { label: string; text: string }) => (
  <div>
    <p className="text-xs font-semibold text-gold-dim mb-0.5">{label}</p>
    <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
  </div>
);

const TrapCard = ({ trap }: { trap: (typeof traps)[0] }) => (
  <div className="p-4 rounded-lg bg-card border border-border">
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-md bg-accent/20">
        <AlertTriangle className="w-4 h-4 text-crimson" />
      </div>
      <div className="flex-1">
        <h3 className="font-heading text-sm font-semibold text-foreground">{trap.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{trap.effect}</p>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {trap.adventures.map((a) => (
            <span key={a} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
              {a}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const AdventureCard = ({ adventure }: { adventure: (typeof adventures)[0] }) => {
  const [open, setOpen] = useState(false);

  const levelColor = adventure.level === 1 ? "text-gold" : adventure.level === 2 ? "text-gold-dim" : "text-crimson";

  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left p-4 rounded-lg bg-card border border-border transition-all hover:border-gold-dim"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`font-heading text-lg font-bold ${levelColor}`}>{adventure.number}</span>
          <div>
            <h3 className="font-heading text-sm font-semibold text-foreground">{adventure.title}</h3>
            <p className="text-xs text-muted-foreground">Level {adventure.level}</p>
          </div>
        </div>
        {open ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
      </div>

      {open && (
        <div className="mt-4 space-y-3 animate-fade-in">
          <p className="text-sm text-muted-foreground leading-relaxed">{adventure.story}</p>

          <div className="p-2.5 rounded-md bg-primary/10 border border-primary/20">
            <p className="text-xs font-semibold text-gold mb-0.5">Objective</p>
            <p className="text-sm text-foreground">{adventure.objective}</p>
          </div>

          {adventure.traps.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-crimson mb-1.5">Traps</p>
              <div className="space-y-1">
                {adventure.traps.map((t, i) => (
                  <div key={i} className="text-xs text-muted-foreground flex gap-1.5">
                    <AlertTriangle className="w-3 h-3 text-crimson mt-0.5 shrink-0" />
                    <span><span className="text-foreground">{t.name}:</span> {t.effect}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {adventure.specialItems && (
            <div>
              <p className="text-xs font-semibold text-gold mb-1">Special Items</p>
              <div className="flex flex-wrap gap-1.5">
                {adventure.specialItems.map((item) => (
                  <span key={item} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-gold border border-primary/20">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {adventure.specialRules && (
            <div>
              <p className="text-xs font-semibold text-gold-dim mb-1">Special Rules</p>
              {adventure.specialRules.map((r, i) => (
                <p key={i} className="text-xs text-muted-foreground">• {r}</p>
              ))}
            </div>
          )}

          <div className="pt-2 border-t border-border">
            <p className="text-xs italic text-muted-foreground">{adventure.conclusion}</p>
          </div>
        </div>
      )}
    </button>
  );
};

export default DungeonMasterGuide;
