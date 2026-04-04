// Board Guide data extracted from the 2003 D&D Board Game reference PDF

export const boardIntro = {
  title: "The Dungeon Board",
  description:
    "The Dungeon is revealed room by room as Heroes open doors. The Dungeon Master sets up each room according to the Adventure layout — placing doors, chests, terrain, monsters, and traps. Understanding how each board element works is critical for both Heroes and the DM.",
};

export interface BoardElement {
  name: string;
  category: "doors" | "terrain" | "chests" | "traps" | "combat" | "movement";
  icon: string;
  description: string;
  rules: string[];
}

export const boardElements: BoardElement[] = [
  // Doors
  {
    name: "Closed Door",
    category: "doors",
    icon: "🚪",
    description: "Doors separate rooms in the Dungeon. They must be opened to reveal new areas.",
    rules: [
      "Heroes open a door by moving next to it and saying 'Open'.",
      "Turn the door token over to show it is open.",
      "Initiative changes immediately when a door is opened.",
      "The DM lays out the new room after a door is opened.",
      "Monsters and Heroes cannot pass through closed doors.",
    ],
  },
  {
    name: "Locked Door",
    category: "doors",
    icon: "🔒",
    description: "Some doors are magically locked and require a special key to open.",
    rules: [
      "The DM tells the Hero when they try to open a locked door.",
      "A Skeleton Key is needed to unlock locked doors.",
      "Unlocking a door immediately opens it.",
      "Keys do not count as an Item and are carried by the group, not an individual.",
      "Skeleton keys must be discarded at the end of an Adventure.",
    ],
  },
  {
    name: "Double Doors",
    category: "doors",
    icon: "🚪🚪",
    description: "Wider doorways found in some expansions.",
    rules: [
      "A Hero only needs to stand by one of the door spaces to open the whole door.",
      "Both door spaces open simultaneously.",
    ],
  },
  // Terrain
  {
    name: "Pillars",
    category: "terrain",
    icon: "🏛️",
    description: "Stone columns that block movement and line of sight.",
    rules: [
      "Characters cannot move through pillars.",
      "Pillars block ranged weapon line of sight.",
      "Placed on specific spaces shown in the Adventure layout.",
      "Cannot be destroyed or moved.",
    ],
  },
  {
    name: "Trees",
    category: "terrain",
    icon: "🌲",
    description: "Dense foliage found in forest areas that obstructs movement and shots.",
    rules: [
      "Characters cannot move through trees.",
      "Trees block ranged weapon line of sight.",
      "Placed on specific spaces shown in the Adventure layout.",
      "Cannot be destroyed or moved.",
    ],
  },
  {
    name: "Walls",
    category: "terrain",
    icon: "🧱",
    description: "The boundaries of rooms and corridors in the Dungeon.",
    rules: [
      "Characters cannot move through walls.",
      "Walls block all ranged attacks and line of sight.",
      "The edges of the board tiles are walls unless there is a door.",
    ],
  },
  {
    name: "Snow Terrain",
    category: "terrain",
    icon: "❄️",
    description: "Frozen ground from the Eternal Winter expansion that slows movement.",
    rules: [
      "All Heroes (except the Barbarian) have their movement reduced by 1 for each turn they begin on snow.",
      "Only spaces fully covered in snow or ice count as snow spaces.",
      "Monsters are not affected by snow.",
    ],
  },
  {
    name: "Passageways",
    category: "terrain",
    icon: "🕳️",
    description: "Secret tunnels that connect distant parts of the board.",
    rules: [
      "Moving from one end of a passageway to the other counts as one space.",
      "Neither a Hero nor a Monster may block access to a passageway or end their turn on a passageway space.",
      "If a passageway leads to an unexplored area, the DM lays out the new area when a Hero appears through it.",
      "Initiative remains unchanged when using passageways.",
    ],
  },
  {
    name: "Towers",
    category: "terrain",
    icon: "🏰",
    description: "Multi-level structures from expansions that add vertical gameplay.",
    rules: [
      "Figures may move up onto the tower top or down to ground level.",
      "The tower top is considered an outdoor space.",
      "The tower is an obstacle at ground level — line of sight rules apply.",
      "A figure attacked from below while on a tower adds 1 to their AC.",
      "To climb, you must be standing on a square next to the tower.",
      "When a tower is revealed, the DM reveals all chests and monsters on top of it.",
    ],
  },
  // Chests
  {
    name: "Treasure Chest",
    category: "chests",
    icon: "📦",
    description: "Containers that may hold useful Items or dangerous booby traps.",
    rules: [
      "Move onto the Chest token and use an Action to open it.",
      "You cannot move onto a chest if you don't have an Action left to open it.",
      "Draw the top card from the Item deck to reveal its contents.",
      "The DM tells you if it contains a Special Item instead.",
      "Remove the Chest token from the Dungeon after opening.",
      "If you set off a booby trap, follow the card instructions — your turn ends immediately.",
      "Chests cannot be opened by Monsters.",
    ],
  },
  {
    name: "Special Chest",
    category: "chests",
    icon: "✨",
    description: "Chests that contain Special Items critical to the Adventure's Objective.",
    rules: [
      "The DM gives the Hero the Special Item described in the Adventure layout.",
      "Special Items are kept separate from the regular Item deck.",
      "Some Special Chests trigger additional events (e.g., Monsters appearing).",
    ],
  },
  // Traps
  {
    name: "Trap Spaces",
    category: "traps",
    icon: "⚠️",
    description: "Hidden dangers on the board that activate when a Hero steps on them.",
    rules: [
      "When a Hero stands on a trap, the DM shouts 'Trap!'",
      "The Hero must stop on that space — their turn ends.",
      "The DM reads out the trap type and its effect.",
      "Monsters can pass through trap spaces without setting them off.",
      "Monsters CAN be affected by the consequences of a Hero springing a trap (e.g., fireballs).",
      "Traps are not visible to Heroes until triggered or found by searching.",
    ],
  },
  {
    name: "Searching for Traps",
    category: "traps",
    icon: "🔍",
    description: "Heroes with the ability can check a room for hidden traps.",
    rules: [
      "Roll the 'Search' die to look for traps (Lidda only).",
      "Results only apply to the room you are currently in.",
      "An unsuccessful search does not reveal any trap locations.",
      "Discovering a trap does not make it safe — it must still be disabled.",
    ],
  },
  {
    name: "Disabling Traps",
    category: "traps",
    icon: "🛠️",
    description: "Making a trap safe so anyone can walk over it.",
    rules: [
      "A Hero with the ability must stand on the trap to attempt disabling it (Lidda only).",
      "Roll the 'Disable Trap' die — on a disable symbol, the trap is disabled.",
      "When Lidda disables a trap, take an unused Trap token.",
      "Gathering 3 Trap tokens gives Lidda 2 extra Hit Points.",
    ],
  },
  // Movement
  {
    name: "Hero Movement",
    category: "movement",
    icon: "👣",
    description: "How Heroes move around the Dungeon board.",
    rules: [
      "Move up to your max movement allowance (shown on Hero card).",
      "Movement is horizontal or vertical only — never diagonal.",
      "Cannot pass through walls, pillars, trees, chests, or closed doors.",
      "Cannot end your turn on the same space as another Hero or Monster.",
      "Heroes CAN pass through other Heroes but NOT through Monsters.",
      "Movement counts as 1 Action.",
    ],
  },
  {
    name: "Monster Movement",
    category: "movement",
    icon: "👹",
    description: "How the DM moves Monsters on the board.",
    rules: [
      "Monsters move up to their max movement allowance (shown on Monster card).",
      "Movement is horizontal or vertical only — never diagonal.",
      "Monsters may move through other Monsters but NOT through Heroes.",
      "Cannot pass through pillars, trees, chests, walls, or closed doors.",
      "Cannot end on the same space as another Monster or Hero.",
      "Monsters can pass through trap spaces without setting them off.",
    ],
  },
  // Combat
  {
    name: "Melee Combat",
    category: "combat",
    icon: "⚔️",
    description: "Close-range attacks used when standing adjacent to an opponent.",
    rules: [
      "Can only be used when standing next to an opponent (not diagonally).",
      "Roll the attack dice shown on the weapon card.",
      "Damage = total swords rolled − target's Armour Class.",
      "Adjust Hit Points on the target's card.",
      "You may only attack Monsters — not other Heroes.",
    ],
  },
  {
    name: "Ranged Combat",
    category: "combat",
    icon: "🏹",
    description: "Long-distance attacks that can reach opponents across the room.",
    rules: [
      "Can be used over greater distances or diagonally.",
      "Ranged weapons fire single shots in a straight line.",
      "The centre of the opponent's square must be in clear sight from the Hero's square.",
      "Pillars, trees, and walls block ranged weapons.",
      "A Hero does not block another Hero's shot.",
      "A Monster does not block another Monster's shot.",
    ],
  },
  {
    name: "Line of Sight",
    category: "combat",
    icon: "👁️",
    description: "Determining whether a ranged attack can reach its target.",
    rules: [
      "Draw an imaginary line from the centre of your square to the centre of the target's square.",
      "If the line passes through a wall, pillar, or tree, the shot is blocked.",
      "Heroes do not block other Heroes' shots.",
      "Monsters do not block other Monsters' shots.",
      "Diagonal attacks follow the same line of sight rules.",
    ],
  },
];

export const setupRules = {
  title: "Setting Up a Room",
  steps: [
    "Check the Adventure layout in the DM's Guide.",
    "Position closed door tokens (if any) in the new room where shown.",
    "Place any chests, trees, and pillars on the appropriate spaces.",
    "Place any Monster figures in the room.",
    "Lay out the matching Monster cards with the correct number of Hit Point tokens.",
    "Secretly note where any traps are — do not tell the Heroes.",
    "You may place most Monsters anywhere in a room, except in front of a door.",
    "Some Monsters have specific spaces where they must be placed.",
  ],
};

export const gameFlow = {
  title: "Running the Game",
  rules: [
    "Play Adventures through in order as a campaign.",
    "The DM wins if the Objective can no longer be completed.",
    "Heroes win when at least one Hero completes the Objective.",
    "When an Adventure ends, no further chests can be opened.",
    "Remaining Monsters cease to play any part after the Objective is met.",
    "Items in Heroes' possession can be distributed before the next Adventure.",
    "Skeleton keys must be discarded between Adventures.",
    "The DM reads the conclusion, leading to the next Adventure.",
  ],
};

export const categories = [
  { key: "doors", label: "Doors", icon: "🚪" },
  { key: "terrain", label: "Terrain", icon: "🌲" },
  { key: "chests", label: "Chests", icon: "📦" },
  { key: "traps", label: "Traps", icon: "⚠️" },
  { key: "movement", label: "Movement", icon: "👣" },
  { key: "combat", label: "Combat", icon: "⚔️" },
] as const;
