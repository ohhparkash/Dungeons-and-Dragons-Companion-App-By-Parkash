export type PieceCategory = 'heroes' | 'monsters' | 'terrain' | 'tokens' | 'doors' | 'traps';

export interface PieceDef {
  id: string;
  name: string;
  category: PieceCategory;
  icon: string; // emoji
  color: string; // tailwind-compatible hsl token
  maxCount?: number; // max allowed on board
}

export const PIECE_DEFINITIONS: PieceDef[] = [
  // Heroes
  { id: 'regdar', name: 'Regdar', category: 'heroes', icon: '⚔️', color: 'hsl(0, 65%, 45%)', maxCount: 1 },
  { id: 'jozan', name: 'Jozan', category: 'heroes', icon: '🛡️', color: 'hsl(40, 70%, 50%)', maxCount: 1 },
  { id: 'mialee', name: 'Mialee', category: 'heroes', icon: '🔮', color: 'hsl(270, 60%, 55%)', maxCount: 1 },
  { id: 'lidda', name: 'Lidda', category: 'heroes', icon: '🗡️', color: 'hsl(140, 50%, 45%)', maxCount: 1 },
  { id: 'morkahn', name: 'Morkahn', category: 'heroes', icon: '🪓', color: 'hsl(200, 50%, 50%)', maxCount: 1 },
  { id: 'orwick', name: 'Orwick', category: 'heroes', icon: '🌿', color: 'hsl(100, 50%, 40%)', maxCount: 1 },

  // Monsters - Base
  { id: 'goblin', name: 'Goblin', category: 'monsters', icon: '👺', color: 'hsl(100, 40%, 35%)', maxCount: 6 },
  { id: 'skeleton', name: 'Skeleton', category: 'monsters', icon: '💀', color: 'hsl(0, 0%, 75%)', maxCount: 6 },
  { id: 'gnoll', name: 'Gnoll', category: 'monsters', icon: '🐺', color: 'hsl(30, 50%, 40%)', maxCount: 5 },
  { id: 'bugbear', name: 'Bugbear', category: 'monsters', icon: '🐻', color: 'hsl(25, 55%, 35%)', maxCount: 4 },
  { id: 'ogre', name: 'Ogre', category: 'monsters', icon: '👹', color: 'hsl(15, 60%, 40%)', maxCount: 4 },
  { id: 'troll', name: 'Troll', category: 'monsters', icon: '🧌', color: 'hsl(120, 30%, 35%)', maxCount: 3 },
  { id: 'wraith', name: 'Wraith', category: 'monsters', icon: '👻', color: 'hsl(260, 40%, 50%)', maxCount: 3 },
  { id: 'wight', name: 'Wight', category: 'monsters', icon: '🦴', color: 'hsl(220, 20%, 50%)', maxCount: 2 },
  { id: 'carrion_crawler', name: 'Carrion Crawler', category: 'monsters', icon: '🐛', color: 'hsl(80, 40%, 35%)', maxCount: 2 },
  { id: 'ooze', name: 'Ooze', category: 'monsters', icon: '🟢', color: 'hsl(90, 60%, 40%)', maxCount: 3 },
  { id: 'lich', name: 'Lich', category: 'monsters', icon: '☠️', color: 'hsl(280, 50%, 40%)', maxCount: 1 },

  // Monsters - Forbidden Forest
  { id: 'owlbear', name: 'Owlbear', category: 'monsters', icon: '🦉', color: 'hsl(30, 40%, 45%)', maxCount: 2 },
  { id: 'razor_boar', name: 'Razor Boar', category: 'monsters', icon: '🐗', color: 'hsl(10, 50%, 35%)', maxCount: 3 },
  { id: 'shambling_mound', name: 'Shambling Mound', category: 'monsters', icon: '🌳', color: 'hsl(100, 40%, 30%)', maxCount: 2 },
  { id: 'yuan_ti', name: 'Yuan-Ti', category: 'monsters', icon: '🐍', color: 'hsl(50, 60%, 40%)', maxCount: 3 },

  // Monsters - Eternal Winter
  { id: 'winter_wolf', name: 'Winter Wolf', category: 'monsters', icon: '🐺', color: 'hsl(200, 30%, 70%)', maxCount: 3 },
  { id: 'frost_salamander', name: 'Frost Salamander', category: 'monsters', icon: '🦎', color: 'hsl(190, 50%, 55%)', maxCount: 2 },
  { id: 'white_dragon', name: 'White Dragon', category: 'monsters', icon: '🐉', color: 'hsl(200, 20%, 85%)', maxCount: 1 },

  // Terrain
  { id: 'pillar', name: 'Pillar', category: 'terrain', icon: '🏛️', color: 'hsl(220, 10%, 50%)', maxCount: 6 },
  { id: 'tree', name: 'Tree', category: 'terrain', icon: '🌲', color: 'hsl(120, 50%, 30%)', maxCount: 3 },
  { id: 'bush', name: 'Bush', category: 'terrain', icon: '🌿', color: 'hsl(110, 45%, 35%)', maxCount: 4 },
  { id: 'tower', name: 'Tower', category: 'terrain', icon: '🏰', color: 'hsl(220, 15%, 45%)', maxCount: 1 },
  { id: 'snow', name: 'Snow', category: 'terrain', icon: '❄️', color: 'hsl(200, 30%, 80%)' },
  { id: 'wall', name: 'Wall', category: 'terrain', icon: '🧱', color: 'hsl(20, 30%, 30%)' },

  // Tokens
  { id: 'chest', name: 'Chest', category: 'tokens', icon: '📦', color: 'hsl(40, 60%, 45%)', maxCount: 19 },
  { id: 'skeleton_key', name: 'Skeleton Key', category: 'tokens', icon: '🗝️', color: 'hsl(40, 70%, 50%)', maxCount: 1 },
  { id: 'start_space', name: 'Start Space', category: 'tokens', icon: '⭐', color: 'hsl(50, 80%, 55%)', maxCount: 4 },
  { id: 'passageway', name: 'Passageway', category: 'tokens', icon: '🕳️', color: 'hsl(220, 15%, 40%)', maxCount: 2 },
  { id: 'dead_hero', name: 'Dead Hero', category: 'tokens', icon: '☠️', color: 'hsl(0, 50%, 35%)', maxCount: 4 },

  // Doors
  { id: 'door_closed', name: 'Closed Door', category: 'doors', icon: '🚪', color: 'hsl(25, 50%, 35%)', maxCount: 18 },
  { id: 'door_open', name: 'Open Door', category: 'doors', icon: '🚪', color: 'hsl(100, 40%, 40%)', maxCount: 18 },
  { id: 'door_locked', name: 'Locked Door', category: 'doors', icon: '🔒', color: 'hsl(0, 50%, 40%)', maxCount: 18 },
  { id: 'double_door', name: 'Double Door', category: 'doors', icon: '🚪', color: 'hsl(40, 50%, 40%)', maxCount: 4 },

  // Traps
  { id: 'trap_armed', name: 'Armed Trap', category: 'traps', icon: '⚠️', color: 'hsl(0, 70%, 50%)', maxCount: 22 },
  { id: 'trap_disarmed', name: 'Disarmed Trap', category: 'traps', icon: '✅', color: 'hsl(120, 50%, 40%)', maxCount: 22 },
];

export const CATEGORIES: { id: PieceCategory; label: string; icon: string }[] = [
  { id: 'heroes', label: 'Heroes', icon: '⚔️' },
  { id: 'monsters', label: 'Monsters', icon: '👹' },
  { id: 'terrain', label: 'Terrain', icon: '🏛️' },
  { id: 'tokens', label: 'Tokens', icon: '📦' },
  { id: 'doors', label: 'Doors', icon: '🚪' },
  { id: 'traps', label: 'Traps', icon: '⚠️' },
];

export interface PlacedPiece {
  pieceId: string;
  row: number;
  col: number;
  uid: string; // unique instance id
}

export interface Scenario {
  name: string;
  gridRows: number;
  gridCols: number;
  pieces: PlacedPiece[];
  createdAt: string;
}
