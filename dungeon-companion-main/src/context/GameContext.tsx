import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type HeroId = "regdar" | "jozan" | "mialee" | "lidda" | "morkahn" | "orwick";

export interface HeroDefinition {
  id: HeroId;
  name: string;
  title: string;
  icon: string;
  color: string;
  specialActions: string[];
  maxItems: number;
}

export const HEROES: HeroDefinition[] = [
  { id: "regdar", name: "Regdar", title: "Human Fighter", icon: "⚔️", color: "hsl(0, 65%, 45%)", specialActions: [], maxItems: 3 },
  { id: "jozan", name: "Jozan", title: "Human Cleric", icon: "🛡️", color: "hsl(40, 70%, 50%)", specialActions: ["Turn Undead", "Healing"], maxItems: 3 },
  { id: "mialee", name: "Mialee", title: "Elven Wizard", icon: "🔮", color: "hsl(270, 60%, 55%)", specialActions: ["Cast Spell"], maxItems: 2 },
  { id: "lidda", name: "Lidda", title: "Halfling Rogue", icon: "🗡️", color: "hsl(140, 50%, 45%)", specialActions: ["Sneak", "Search Traps", "Disable Traps"], maxItems: 3 },
  { id: "morkahn", name: "Morkahn", title: "Barbarian", icon: "🪓", color: "hsl(200, 50%, 50%)", specialActions: [], maxItems: 3 },
  { id: "orwick", name: "Orwick", title: "Druid", icon: "🌿", color: "hsl(100, 50%, 40%)", specialActions: ["Cast Spell"], maxItems: 2 },
];

export interface Player {
  id: string;
  name: string;
  isDM: boolean;
  heroIds: HeroId[]; // DM has none, a player can control multiple heroes
}

interface GameState {
  players: Player[];
  currentTurnIndex: number; // index into turnOrder
  turnOrder: string[]; // player IDs in initiative order
  adventureLevel: 1 | 2 | 3;
  isSetupComplete: boolean;
  turnVersion: number; // increments each turn change
}

interface GameContextType {
  state: GameState;
  setupGame: (players: Player[]) => void;
  nextTurn: () => void;
  setTurnOrder: (order: string[]) => void;
  getCurrentPlayer: () => Player | null;
  getDM: () => Player | null;
  getHeroPlayer: (heroId: HeroId) => Player | null;
  resetGame: () => void;
  setAdventureLevel: (level: 1 | 2 | 3) => void;
}

const initialState: GameState = {
  players: [],
  currentTurnIndex: 0,
  turnOrder: [],
  adventureLevel: 1,
  isSetupComplete: false,
  turnVersion: 0,
};

const GameContext = createContext<GameContextType | null>(null);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<GameState>(() => {
    const saved = localStorage.getItem("dnd_game_state");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch { /* ignore */ }
    }
    return initialState;
  });

  const persist = (newState: GameState) => {
    setState(newState);
    localStorage.setItem("dnd_game_state", JSON.stringify(newState));
  };

  const setupGame = useCallback((players: Player[]) => {
    // Build initial turn order: DM + all hero players
    const dm = players.find(p => p.isDM);
    const heroPlayers = players.filter(p => !p.isDM);
    const order = [...heroPlayers.map(p => p.id), ...(dm ? [dm.id] : [])];
    
    const newState: GameState = {
      players,
      currentTurnIndex: 0,
      turnOrder: order,
      adventureLevel: 1,
      isSetupComplete: true,
      turnVersion: 0,
    };
    persist(newState);
  }, []);

  const nextTurn = useCallback(() => {
    setState(prev => {
      const next = {
        ...prev,
        currentTurnIndex: (prev.currentTurnIndex + 1) % prev.turnOrder.length,
        turnVersion: (prev.turnVersion || 0) + 1,
      };
      localStorage.setItem("dnd_game_state", JSON.stringify(next));
      return next;
    });
  }, []);

  const setTurnOrder = useCallback((order: string[]) => {
    setState(prev => {
      const next = { ...prev, turnOrder: order, currentTurnIndex: 0 };
      localStorage.setItem("dnd_game_state", JSON.stringify(next));
      return next;
    });
  }, []);

  const getCurrentPlayer = useCallback((): Player | null => {
    if (state.turnOrder.length === 0) return null;
    const id = state.turnOrder[state.currentTurnIndex];
    return state.players.find(p => p.id === id) || null;
  }, [state]);

  const getDM = useCallback((): Player | null => {
    return state.players.find(p => p.isDM) || null;
  }, [state.players]);

  const getHeroPlayer = useCallback((heroId: HeroId): Player | null => {
    return state.players.find(p => p.heroIds.includes(heroId)) || null;
  }, [state.players]);

  const resetGame = useCallback(() => {
    localStorage.removeItem("dnd_game_state");
    setState(initialState);
  }, []);

  const setAdventureLevel = useCallback((level: 1 | 2 | 3) => {
    setState(prev => {
      const next = { ...prev, adventureLevel: level };
      localStorage.setItem("dnd_game_state", JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <GameContext.Provider value={{
      state, setupGame, nextTurn, setTurnOrder,
      getCurrentPlayer, getDM, getHeroPlayer, resetGame, setAdventureLevel,
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
};
