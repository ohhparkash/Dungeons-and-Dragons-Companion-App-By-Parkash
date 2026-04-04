import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Skull, Swords, Shield, FlaskConical, Sparkles, Flame, Heart, Footprints, ChevronDown, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { playBack, playTabSwitch, playCardFlip } from "@/utils/sound-engine";
import {
  type GameCard,
  type CardCategory,
  type MonsterCard,
  type WeaponCard,
  type ArtifactCard,
  type PotionCard,
  type SpellCard,
  type BoobyTrapCard,
  monsterCards,
  weaponCards,
  artifactCards,
  potionCards,
  spellCards,
  boobyTrapCards,
  categoryLabels,
  categoryEmojis,
  diceColorMap,
} from "@/data/cards-data";

/* ─── Dice badge ────────────────────────────────────────── */
const DiceBadge = ({ color }: { color: string }) => (
  <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${diceColorMap[color] ?? "bg-muted text-muted-foreground"}`}>
    {color}
  </span>
);

/* ─── Stat pill ─────────────────────────────────────────── */
const Stat = ({ icon, value, label }: { icon: React.ReactNode; value: number | string; label: string }) => (
  <div className="flex items-center gap-1 text-xs text-muted-foreground" title={label}>
    {icon}
    <span className="font-semibold text-foreground">{value}</span>
  </div>
);

/* ─── Monster detail ────────────────────────────────────── */
const MonsterDetail = ({ card }: { card: MonsterCard }) => {
  const [open, setOpen] = useState(false);
  return (
    <button onClick={() => setOpen(!open)} className="w-full text-left rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-md ${card.undead ? "bg-accent/20 text-crimson" : "bg-secondary text-primary"}`}>
            {card.undead ? <Skull className="w-5 h-5" /> : <Swords className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="font-heading text-sm font-semibold tracking-wide text-foreground">{card.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              ×{card.count} {card.undead ? "· Undead" : ""}
            </p>
          </div>
        </div>
        {open ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
      </div>
      {open && (
        <div className="mt-3 space-y-3 animate-fade-in">
          <div className="flex gap-4 flex-wrap">
            <Stat icon={<Shield className="w-3.5 h-3.5" />} value={card.ac} label="Armour Class" />
            <Stat icon={<Heart className="w-3.5 h-3.5" />} value={card.hp} label="Hit Points" />
            <Stat icon={<Footprints className="w-3.5 h-3.5" />} value={card.move} label="Movement" />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{card.description}</p>
          {card.specialAbility && (
            <div className="rounded-md bg-secondary/50 p-2.5">
              <p className="text-[11px] font-heading font-semibold text-primary">{card.specialAbility}</p>
              {card.specialAbilityDetail && <p className="text-[11px] text-muted-foreground mt-0.5">{card.specialAbilityDetail}</p>}
            </div>
          )}
          <div className="flex flex-wrap gap-1">
            <span className="text-[10px] text-muted-foreground mr-1">Melee:</span>
            {card.dice.map((d, i) => <DiceBadge key={i} color={d} />)}
          </div>
          {card.rangedDice && (
            <div className="flex flex-wrap gap-1">
              <span className="text-[10px] text-muted-foreground mr-1">Ranged:</span>
              {card.rangedDice.map((d, i) => <DiceBadge key={i} color={d} />)}
            </div>
          )}
        </div>
      )}
    </button>
  );
};

/* ─── Weapon detail ─────────────────────────────────────── */
const WeaponDetail = ({ card }: { card: WeaponCard }) => {
  const [open, setOpen] = useState(false);
  return (
    <button onClick={() => setOpen(!open)} className="w-full text-left rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-red-900/20 text-red-400">
            <Swords className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading text-sm font-semibold tracking-wide text-foreground">{card.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Level {card.level} · {card.type.charAt(0).toUpperCase() + card.type.slice(1)}
              {card.powerAttack ? " · ⚡ Power Attack" : ""}
              {card.protectsFromParalysis ? " · 🛡️ Paralysis Prot." : ""}
            </p>
          </div>
        </div>
        {open ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
      </div>
      {open && (
        <div className="mt-3 space-y-2 animate-fade-in">
          <p className="text-xs text-muted-foreground leading-relaxed">{card.description}</p>
          {card.specialAbility && (
            <div className="rounded-md bg-secondary/50 p-2.5">
              <p className="text-[11px] text-primary font-heading font-semibold">{card.specialAbility}</p>
            </div>
          )}
          <div className="flex flex-wrap gap-1">
            <span className="text-[10px] text-muted-foreground mr-1">Dice:</span>
            {card.dice.map((d, i) => <DiceBadge key={i} color={d} />)}
          </div>
        </div>
      )}
    </button>
  );
};

/* ─── Generic expandable card ───────────────────────────── */
const GenericCard = ({ card, icon, iconClass }: { card: ArtifactCard | PotionCard | SpellCard | BoobyTrapCard; icon: React.ReactNode; iconClass: string }) => {
  const [open, setOpen] = useState(false);
  const level = "level" in card ? (card as any).level : undefined;
  return (
    <button onClick={() => setOpen(!open)} className="w-full text-left rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-md ${iconClass}`}>{icon}</div>
          <div>
            <h3 className="font-heading text-sm font-semibold tracking-wide text-foreground">{card.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {level != null ? `Level ${level}` : ""}
              {card.category === "spell" && (card as SpellCard).restriction ? ` · ${(card as SpellCard).restriction}` : ""}
              {card.category === "spell" && (card as SpellCard).singleUse ? " · Single Use" : ""}
            </p>
          </div>
        </div>
        {open ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
      </div>
      {open && (
        <div className="mt-3 space-y-2 animate-fade-in">
          <p className="text-xs text-muted-foreground leading-relaxed">{card.description}</p>
          <div className="rounded-md bg-secondary/50 p-2.5">
            <p className="text-[11px] text-foreground">{(card as any).effect}</p>
          </div>
          {"discardCondition" in card && (card as ArtifactCard).discardCondition && (
            <p className="text-[10px] text-crimson">{(card as ArtifactCard).discardCondition}</p>
          )}
          {"dice" in card && (card as SpellCard).dice?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              <span className="text-[10px] text-muted-foreground mr-1">Dice:</span>
              {(card as SpellCard).dice.map((d, i) => <DiceBadge key={i} color={d} />)}
            </div>
          )}
        </div>
      )}
    </button>
  );
};

/* ─── Main page ─────────────────────────────────────────── */
const CardCompendium = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<number | null>(null);

  const matchesSearch = (card: GameCard) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return card.name.toLowerCase().includes(q) || ("description" in card && (card as any).description?.toLowerCase().includes(q));
  };

  const matchesLevel = (card: GameCard) => {
    if (levelFilter === null) return true;
    if ("level" in card) return (card as any).level === levelFilter;
    return true; // monsters don't have levels
  };

  const filter = (cards: GameCard[]) => cards.filter(c => matchesSearch(c) && matchesLevel(c));

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border px-3 sm:px-4 py-2.5 sm:py-3">
        <div className="flex items-center gap-2 sm:gap-3 max-w-lg mx-auto">
          <button onClick={() => { playBack(); navigate("/"); }} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base sm:text-lg font-display font-bold tracking-wide text-primary flex-1">Card Compendium</h1>
        </div>
        {/* Search */}
        <div className="relative max-w-lg mx-auto mt-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search cards..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="monster" onValueChange={() => playTabSwitch()} className="flex-1">
        <div className="sticky top-[96px] sm:top-[108px] z-10 bg-background/95 backdrop-blur border-b border-border">
          <ScrollArea className="w-full">
            <TabsList className="flex w-max px-3 sm:px-4 py-1 gap-0.5 sm:gap-1 bg-transparent">
              {(["monster", "weapon", "potion", "spell", "artifact", "boobyTrap"] as CardCategory[]).map(cat => (
                <TabsTrigger key={cat} value={cat} className="text-[11px] sm:text-xs px-2 sm:px-3 py-1.5 whitespace-nowrap data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                  {categoryEmojis[cat]} {categoryLabels[cat]}
                </TabsTrigger>
              ))}
            </TabsList>
          </ScrollArea>
        </div>

        {/* Level filter (for non-monster tabs) */}
        <div className="flex gap-2 px-4 py-2 max-w-lg mx-auto w-full">
          {[null, 1, 2, 3].map(lv => (
            <button
              key={String(lv)}
              onClick={() => setLevelFilter(lv)}
              className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                levelFilter === lv ? "bg-primary/20 border-primary/40 text-primary" : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {lv === null ? "All" : `Lv ${lv}`}
            </button>
          ))}
        </div>

        <div className="px-3 sm:px-4 pb-24 max-w-lg mx-auto w-full">
          {/* Monsters */}
          <TabsContent value="monster" className="space-y-2 mt-2">
            {filter(monsterCards).length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No monsters found.</p>}
            {filter(monsterCards).map(c => <MonsterDetail key={c.id} card={c as MonsterCard} />)}
          </TabsContent>

          {/* Weapons */}
          <TabsContent value="weapon" className="space-y-2 mt-2">
            {filter(weaponCards).length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No weapons found.</p>}
            {filter(weaponCards).map(c => <WeaponDetail key={c.id} card={c as WeaponCard} />)}
          </TabsContent>

          {/* Potions */}
          <TabsContent value="potion" className="space-y-2 mt-2">
            {filter(potionCards).length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No potions found.</p>}
            {filter(potionCards).map(c => (
              <GenericCard key={c.id} card={c as PotionCard} icon={<FlaskConical className="w-5 h-5" />} iconClass="bg-green-900/20 text-green-400" />
            ))}
          </TabsContent>

          {/* Spells */}
          <TabsContent value="spell" className="space-y-2 mt-2">
            {filter(spellCards).length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No spells found.</p>}
            {filter(spellCards).map(c => (
              <GenericCard key={c.id} card={c as SpellCard} icon={<Sparkles className="w-5 h-5" />} iconClass="bg-cyan-900/20 text-cyan-400" />
            ))}
          </TabsContent>

          {/* Artifacts */}
          <TabsContent value="artifact" className="space-y-2 mt-2">
            {filter(artifactCards).length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No artifacts found.</p>}
            {filter(artifactCards).map(c => (
              <GenericCard key={c.id} card={c as ArtifactCard} icon={<Shield className="w-5 h-5" />} iconClass="bg-emerald-900/20 text-emerald-400" />
            ))}
          </TabsContent>

          {/* Booby Traps */}
          <TabsContent value="boobyTrap" className="space-y-2 mt-2">
            {filter(boobyTrapCards).length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No traps found.</p>}
            {filter(boobyTrapCards).map(c => (
              <GenericCard key={c.id} card={c as BoobyTrapCard} icon={<Flame className="w-5 h-5" />} iconClass="bg-amber-900/20 text-amber-400" />
            ))}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default CardCompendium;
