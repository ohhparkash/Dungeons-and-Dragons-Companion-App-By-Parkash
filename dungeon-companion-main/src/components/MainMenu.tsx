import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { useGame, HEROES, type HeroId } from "@/context/GameContext";
import { playNavigate, playTap } from "@/utils/sound-engine";
import iconDm from "@/assets/icon-dm.png";
import iconPlayers from "@/assets/icon-players.png";
import iconBoard from "@/assets/icon-board.png";
import iconScenario from "@/assets/icon-scenario.png";
import iconDice from "@/assets/icon-dice.png";
import iconCards from "@/assets/icon-cards.png";
import heroRegdar from "@/assets/hero-regdar.png";
import heroJozan from "@/assets/hero-jozan.png";
import heroMialee from "@/assets/hero-mialee.png";
import heroLidda from "@/assets/hero-lidda.png";
import heroMorkahn from "@/assets/hero-morkahn.png";
import heroOrwick from "@/assets/hero-orwick.png";

const MainMenu = () => {
  const navigate = useNavigate();
  const { state, getCurrentPlayer } = useGame();
  const current = getCurrentPlayer();
  const isDM = current?.isDM ?? false;

  const menuItems = [
    { title: "Dungeon Master Guide", description: "Monsters, items, and DM rules", image: iconDm, path: "/dm-guide", dmOnly: true },
    { title: "Player's Guide", description: "Heroes, stats, and abilities", image: iconPlayers, path: "/player-guide", dmOnly: false },
    { title: "Board Guide", description: "Traps, terrain, and interactions", image: iconBoard, path: "/board-guide", dmOnly: false },
    { title: "Scenario Maker", description: "Design custom dungeon levels", image: iconScenario, path: "/scenario-maker", dmOnly: true },
    { title: "Dice Roller", description: "Roll the custom D&D dice", image: iconDice, path: "/dice-roller", dmOnly: false },
    { title: "Card Compendium", description: "Browse all game cards & stats", image: iconCards, path: "/card-compendium", dmOnly: false },
  ];

  const heroImgMap: Record<string, string> = {
    regdar: heroRegdar, jozan: heroJozan, mialee: heroMialee,
    lidda: heroLidda, morkahn: heroMorkahn, orwick: heroOrwick,
  };

  const handleNav = (path: string, locked: boolean) => {
    if (locked) return;
    playNavigate();
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-3 sm:px-4 py-6 sm:py-8 md:py-16 pb-24 safe-bottom">
      <div className="text-center mb-6 animate-fade-in">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-display font-bold tracking-wider text-primary glow-gold-text">
          D&D Companion
        </h1>
        <div className="mx-auto mt-3 w-40 h-px ornament-divider" />
        <p className="mt-3 text-xs tracking-[0.25em] uppercase text-muted-foreground font-heading">
          The Fantasy Adventure Board Game · 2003
        </p>
      </div>

      {current && (
        <div className="mb-6 px-4 py-2.5 rounded-xl card-fantasy flex items-center gap-3 animate-fade-in">
          {!isDM && current.heroIds[0] && (
            <img src={heroImgMap[current.heroIds[0]]} alt="" className="w-8 h-8 rounded-full object-cover border border-primary/30" loading="lazy" width={32} height={32} />
          )}
          <div>
            <span className="text-sm font-heading font-bold text-primary">{current.name}</span>
            <span className="text-xs text-muted-foreground ml-2">
              {isDM ? "" : `(${current.heroIds.map(h => HEROES.find(hero => hero.id === h)?.name).join(", ")})`}
            </span>
          </div>
          {isDM && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/20 text-accent border border-accent/30 font-heading font-semibold">
              Dungeon Master
            </span>
          )}
        </div>
      )}

      <div className="w-full max-w-md space-y-3">
        {menuItems.map((item, i) => {
          const locked = item.dmOnly ? !isDM : (isDM && item.path === "/player-guide");
          return (
            <button
              key={item.path}
              onClick={() => handleNav(item.path, locked)}
              disabled={locked}
              className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 text-left animate-fade-in ${
                locked
                  ? "card-fantasy opacity-40 cursor-not-allowed"
                  : "card-fantasy hover:border-primary/30 hover:glow-gold group"
              }`}
              style={{ animationDelay: `${i * 100 + 200}ms`, opacity: 0 }}
            >
              <div className={`w-12 h-12 rounded-lg overflow-hidden bg-secondary flex items-center justify-center shrink-0 ${locked ? "grayscale" : ""}`}>
                {locked ? (
                  <Lock className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
                ) : (
                  <img src={item.image} alt="" className="w-full h-full object-cover" loading="lazy" width={48} height={48} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className={`font-heading text-sm font-semibold tracking-wide transition-colors ${
                  locked ? "text-muted-foreground" : "text-foreground group-hover:text-primary"
                }`}>
                  {item.title}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5 font-body">
                  {locked ? (isDM ? "Players only" : "DM only") : item.description}
                </p>
              </div>
              {!locked && (
                <svg className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      <p className="mt-12 text-xs text-muted-foreground/40 font-body animate-fade-in-slow" style={{ animationDelay: "1s", opacity: 0 }}>
        {"Based on the 2003 Parker / Hasbro edition\n"}
      </p>
      <p className="mt-2 text-sm font-display font-bold tracking-wider text-primary glow-gold-text animate-fade-in-slow" style={{ animationDelay: "1.2s", opacity: 0 }}>
        Built by Parkash
      </p>
    </div>
  );
};

export default MainMenu;
