// Dice data for the 2003 D&D Board Game
// 1 D6, 2 Yellow, 2 Orange, 1 Red, 1 Purple, 4 Black (each unique)

export type DieFaceType =
  | "number"      // D6 movement
  | "melee"       // sword(s) - combat hit
  | "miss"        // blank/miss
  | "star"        // special ability
  | "eye"         // search/vision
  | "hand"        // ghostly hand
  | "skull"       // turn undead
  | "trap_defuse" // trap disarm
  | "trap_explode"// trap explode (miss)

export interface DieFace {
  type: DieFaceType;
  label: string;
  icon: string;
  value?: number;
}

export interface DieDefinition {
  id: string;
  name: string;
  shortName: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  faces: DieFace[];
  maxSelectable: number;
}

// D6 - Standard movement die
const d6Faces: DieFace[] = [
  { type: "number", label: "1", icon: "1", value: 1 },
  { type: "number", label: "2", icon: "2", value: 2 },
  { type: "number", label: "3", icon: "3", value: 3 },
  { type: "number", label: "4", icon: "4", value: 4 },
  { type: "number", label: "5", icon: "5", value: 5 },
  { type: "number", label: "6", icon: "6", value: 6 },
];

// Yellow Combat Die (Level 1) - 1,1,1,miss,miss,miss
const yellowFaces: DieFace[] = [
  { type: "melee", label: "1 Sword", icon: "⚔️", value: 1 },
  { type: "melee", label: "1 Sword", icon: "⚔️", value: 1 },
  { type: "melee", label: "1 Sword", icon: "⚔️", value: 1 },
  { type: "miss", label: "Miss", icon: "✕" },
  { type: "miss", label: "Miss", icon: "✕" },
  { type: "miss", label: "Miss", icon: "✕" },
];

// Orange Combat Die (Level 2) - 1,1,1,1,2,2
const orangeFaces: DieFace[] = [
  { type: "melee", label: "1 Sword", icon: "⚔️", value: 1 },
  { type: "melee", label: "1 Sword", icon: "⚔️", value: 1 },
  { type: "melee", label: "1 Sword", icon: "⚔️", value: 1 },
  { type: "melee", label: "1 Sword", icon: "⚔️", value: 1 },
  { type: "melee", label: "2 Swords", icon: "⚔️⚔️", value: 2 },
  { type: "melee", label: "2 Swords", icon: "⚔️⚔️", value: 2 },
];

// Purple Combat Die - 2,2,2,2,3,3
const purpleFaces: DieFace[] = [
  { type: "melee", label: "2 Swords", icon: "⚔️⚔️", value: 2 },
  { type: "melee", label: "2 Swords", icon: "⚔️⚔️", value: 2 },
  { type: "melee", label: "2 Swords", icon: "⚔️⚔️", value: 2 },
  { type: "melee", label: "2 Swords", icon: "⚔️⚔️", value: 2 },
  { type: "melee", label: "3 Swords", icon: "⚔️⚔️⚔️", value: 3 },
  { type: "melee", label: "3 Swords", icon: "⚔️⚔️⚔️", value: 3 },
];

// Red Combat Die - 1, 2, 2, 2, 3, Miss
const redFaces: DieFace[] = [
  { type: "melee", label: "1 Sword", icon: "⚔️", value: 1 },
  { type: "melee", label: "2 Swords", icon: "⚔️⚔️", value: 2 },
  { type: "melee", label: "2 Swords", icon: "⚔️⚔️", value: 2 },
  { type: "melee", label: "2 Swords", icon: "⚔️⚔️", value: 2 },
  { type: "melee", label: "3 Swords", icon: "⚔️⚔️⚔️", value: 3 },
  { type: "miss", label: "Miss", icon: "✕" },
];

// Black Die 1 - Star Die: 1 star, 1 star, 1 star, miss, miss, miss
const blackStarFaces: DieFace[] = [
  { type: "star", label: "1 Star", icon: "⭐", value: 1 },
  { type: "star", label: "1 Star", icon: "⭐", value: 1 },
  { type: "star", label: "1 Star", icon: "⭐", value: 1 },
  { type: "miss", label: "Miss", icon: "✕" },
  { type: "miss", label: "Miss", icon: "✕" },
  { type: "miss", label: "Miss", icon: "✕" },
];

// Black Die 2 - Eye Die: 1 eye, 1 eye, 2 eyes, 1 hand, miss, miss
const blackEyeFaces: DieFace[] = [
  { type: "eye", label: "1 Eye", icon: "👁️", value: 1 },
  { type: "eye", label: "1 Eye", icon: "👁️", value: 1 },
  { type: "eye", label: "2 Eyes", icon: "👁️👁️", value: 2 },
  { type: "hand", label: "1 Hand", icon: "🖐️", value: 1 },
  { type: "miss", label: "Miss", icon: "✕" },
  { type: "miss", label: "Miss", icon: "✕" },
];

// Black Die 3 - Skull Die: 1 skull, 2 skull, 3 skull, miss, miss, miss
const blackSkullFaces: DieFace[] = [
  { type: "skull", label: "1 Skull", icon: "💀", value: 1 },
  { type: "skull", label: "2 Skulls", icon: "💀💀", value: 2 },
  { type: "skull", label: "3 Skulls", icon: "💀💀💀", value: 3 },
  { type: "miss", label: "Miss", icon: "✕" },
  { type: "miss", label: "Miss", icon: "✕" },
  { type: "miss", label: "Miss", icon: "✕" },
];

// Black Die 4 - Trap Die: 5x defuse, 1x explode
const blackTrapFaces: DieFace[] = [
  { type: "trap_defuse", label: "Defuse", icon: "⚙️", value: 1 },
  { type: "trap_defuse", label: "Defuse", icon: "⚙️", value: 1 },
  { type: "trap_defuse", label: "Defuse", icon: "⚙️", value: 1 },
  { type: "trap_defuse", label: "Defuse", icon: "⚙️", value: 1 },
  { type: "trap_defuse", label: "Defuse", icon: "⚙️", value: 1 },
  { type: "trap_explode", label: "Explode!", icon: "💥" },
];

export const DICE: DieDefinition[] = [
  {
    id: "d6",
    name: "Standard Die (D6)",
    shortName: "D6",
    color: "hsl(0, 0%, 90%)",
    bgColor: "hsl(0, 0%, 85%)",
    borderColor: "hsl(0, 0%, 70%)",
    description: "Standard six-sided die for movement",
    faces: d6Faces,
    maxSelectable: 1,
  },
  {
    id: "yellow",
    name: "Yellow Combat Die",
    shortName: "Yellow",
    color: "hsl(45, 90%, 55%)",
    bgColor: "hsl(45, 85%, 50%)",
    borderColor: "hsl(45, 80%, 40%)",
    description: "Level 1 — 3× hit (1 sword), 3× miss",
    faces: yellowFaces,
    maxSelectable: 2,
  },
  {
    id: "orange",
    name: "Orange Combat Die",
    shortName: "Orange",
    color: "hsl(25, 90%, 55%)",
    bgColor: "hsl(25, 85%, 50%)",
    borderColor: "hsl(25, 80%, 40%)",
    description: "Level 2 — 4× (1 sword), 2× (2 swords). No misses!",
    faces: orangeFaces,
    maxSelectable: 2,
  },
  {
    id: "purple",
    name: "Purple Combat Die",
    shortName: "Purple",
    color: "hsl(280, 60%, 55%)",
    bgColor: "hsl(280, 55%, 45%)",
    borderColor: "hsl(280, 50%, 35%)",
    description: "4× (2 swords), 2× (3 swords). No misses!",
    faces: purpleFaces,
    maxSelectable: 1,
  },
  {
    id: "red",
    name: "Red Combat Die",
    shortName: "Red",
    color: "hsl(0, 75%, 50%)",
    bgColor: "hsl(0, 70%, 45%)",
    borderColor: "hsl(0, 65%, 35%)",
    description: "1× (1), 3× (2), 1× (3 swords), 1× miss",
    faces: redFaces,
    maxSelectable: 1,
  },
  {
    id: "black_star",
    name: "Black Star Die",
    shortName: "★ Star",
    color: "hsl(220, 10%, 40%)",
    bgColor: "hsl(220, 15%, 18%)",
    borderColor: "hsl(220, 10%, 30%)",
    description: "Special ability — 3× star, 3× miss",
    faces: blackStarFaces,
    maxSelectable: 1,
  },
  {
    id: "black_eye",
    name: "Black Eye Die",
    shortName: "👁 Search",
    color: "hsl(220, 10%, 40%)",
    bgColor: "hsl(220, 15%, 18%)",
    borderColor: "hsl(220, 10%, 30%)",
    description: "Search — 2× (1 eye), 1× (2 eyes), 1× hand, 2× miss",
    faces: blackEyeFaces,
    maxSelectable: 1,
  },
  {
    id: "black_skull",
    name: "Black Skull Die",
    shortName: "💀 Undead",
    color: "hsl(220, 10%, 40%)",
    bgColor: "hsl(220, 15%, 18%)",
    borderColor: "hsl(220, 10%, 30%)",
    description: "Turn Undead — 1/2/3 skulls or miss",
    faces: blackSkullFaces,
    maxSelectable: 1,
  },
  {
    id: "black_trap",
    name: "Black Trap Die",
    shortName: "⚙ Trap",
    color: "hsl(220, 10%, 40%)",
    bgColor: "hsl(220, 15%, 18%)",
    borderColor: "hsl(220, 10%, 30%)",
    description: "Disable Trap — 5× defuse, 1× explode!",
    faces: blackTrapFaces,
    maxSelectable: 1,
  },
];