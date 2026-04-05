import type { PlacedPiece } from "./scenario-maker-data";

export interface PredefinedAdventure {
  id: string;
  level: 1 | 2 | 3;
  number: number; // adventure number 1-11
  name: string;
  description: string;
  objective: string;
  victoryText: string;
  boards: number[]; // board tile numbers used
  traps: { name: string; effect: string; count: number }[];
  specialItems: string[];
  specialRules: string[];
  gridRows: number;
  gridCols: number;
  pieces: PlacedPiece[];
}

let uid = 0;
const p = (pieceId: string, row: number, col: number): PlacedPiece => ({
  pieceId, row, col, uid: `pre_${++uid}`,
});

// ──────────────────────────────────────────────────────────────
// ADVENTURE 1: The Goblin Bandits (Level 1)
// Boards: 1 (left), 3 (right-top), START area right
// ──────────────────────────────────────────────────────────────
const adventure1: PredefinedAdventure = {
  id: "adv1",
  level: 1,
  number: 1,
  name: "The Goblin Bandits",
  description: "Unease and darkness have fallen over the land of Rallion as Monsters ravage the region. Travelling through it, the Heroes have arrived at the village of Holbrook, on the edge of a forest, where Goblin attacks have left the villagers fearing for their lives. The Sheriff of Holbrook has gone in search of them, but has not returned.",
  objective: "Defeat all the Goblins.",
  victoryText: "Congratulations – you have defeated the Goblin bandits. But as the Heroes search their lair they find a disturbing message. It seems the Goblins were just scouts for a larger party. But where is this other group and where is the Sheriff?",
  boards: [1, 3],
  traps: [
    { name: "Pit Trap", effect: "Hero loses 1 Hit Point.", count: 1 },
  ],
  specialItems: [],
  specialRules: [],
  gridRows: 16,
  gridCols: 20,
  pieces: [
    // START area (right side)
    p("start_space", 3, 17),
    // Doors
    p("door_closed", 2, 8), p("door_closed", 7, 5), p("door_closed", 10, 8),
    // Room 1 (board 3, top-right): 3x Goblins + chests
    p("goblin", 2, 10), p("goblin", 3, 11), p("goblin", 2, 12),
    p("chest", 1, 9), p("chest", 1, 13), p("chest", 3, 13),
    // Room 2 (board 1, left): 2x Goblins + chests
    p("goblin", 8, 2), p("goblin", 9, 3),
    p("chest", 10, 1), p("chest", 10, 4),
    // Room 3 (bottom): 1x Ogre
    p("ogre", 12, 10),
    p("chest", 13, 12), p("chest", 13, 9),
    // Trap
    p("trap_armed", 11, 11),
  ],
};

// ──────────────────────────────────────────────────────────────
// ADVENTURE 2: The Trail of Evil (Level 1)
// Boards: 2 (left), 7 (right-top), START right
// ──────────────────────────────────────────────────────────────
const adventure2: PredefinedAdventure = {
  id: "adv2",
  level: 1,
  number: 2,
  name: "The Trail of Evil",
  description: "Following Goblin trails through the forest, the Heroes track down the hideout of Angor, their Bugbear leader. Will they find the Sheriff here?",
  objective: "Find Angor and defeat him.",
  victoryText: "The Heroes have defeated Angor! Yet as he fell he called to his army to \"Find the Orb\" and there is still no sign of the Sheriff. Could this Orb be helping the creatures of darkness?",
  boards: [2, 7],
  traps: [
    { name: "Pit Trap", effect: "Hero loses 1 Hit Point.", count: 1 },
  ],
  specialItems: [],
  specialRules: [],
  gridRows: 16,
  gridCols: 20,
  pieces: [
    // START area (right)
    p("start_space", 3, 17),
    // Doors
    p("door_closed", 3, 9), p("door_closed", 7, 4), p("door_closed", 12, 6),
    // Room 1 (board 7, top): Angor (Bugbear) + monsters
    p("bugbear", 1, 7), // ANGOR
    p("chest", 1, 4), p("chest", 1, 5), p("chest", 2, 7),
    // Room 2: 1x Bugbear
    p("bugbear", 5, 3),
    // Room 3: 1x Gnoll
    p("gnoll", 7, 6),
    // Room 4 (bottom): 4x Goblins
    p("goblin", 12, 2), p("goblin", 12, 4), p("goblin", 13, 3), p("goblin", 14, 2),
    p("chest", 13, 5), p("chest", 14, 5),
    // Trap
    p("trap_armed", 9, 5),
  ],
};

// ──────────────────────────────────────────────────────────────
// ADVENTURE 3: The Haunted Village (Level 1)
// Boards: 1, 9, 5 (three boards horizontally)
// ──────────────────────────────────────────────────────────────
const adventure3: PredefinedAdventure = {
  id: "adv3",
  level: 1,
  number: 3,
  name: "The Haunted Village",
  description: "The Heroes meet an old man, who tells them the tale of the 'Orb of True Seeing', which lets its owner see for miles around. Rumours abound that it is in the village of Yeland's Cross, which has been overrun by Angor's henchmen.",
  objective: "Find the Orb to prevent it falling into the wrong hands.",
  victoryText: "The Heroes got there in the nick of time! Well done! Next to the Orb, they find a half-scribbled ransom note that was never delivered. It seems the Sheriff is close!",
  boards: [1, 9, 5],
  traps: [
    { name: "Pit Trap", effect: "Hero loses 1 Hit Point.", count: 1 },
    { name: "Evil Resurrection Trap", effect: "Last Monster killed reappears anywhere in its starting room.", count: 1 },
  ],
  specialItems: ["Orb of True Seeing"],
  specialRules: [],
  gridRows: 14,
  gridCols: 26,
  pieces: [
    // START area (far right)
    p("start_space", 10, 24),
    // Doors
    p("door_closed", 3, 7), p("door_closed", 8, 4), p("door_closed", 4, 13),
    p("door_closed", 5, 18), p("door_closed", 9, 20),
    // Board 1, Room 1: 3x Gnolls + chests
    p("gnoll", 2, 1), p("gnoll", 2, 3), p("gnoll", 3, 2),
    p("chest", 1, 4), p("chest", 1, 5),
    // Board 1, Room 2: 1x Bugbear, 1x Ogre
    p("bugbear", 9, 2), p("ogre", 10, 3),
    p("chest", 11, 1), p("chest", 11, 4),
    // Board 9, middle: 3x Goblins + trees
    p("goblin", 7, 10), p("goblin", 8, 11), p("goblin", 9, 10),
    p("tree", 5, 10), p("tree", 8, 13),
    // Board 5: 3x Skeletons + chests
    p("skeleton", 2, 17), p("skeleton", 3, 19), p("skeleton", 2, 20),
    p("chest", 1, 18), p("chest", 3, 21), p("chest", 1, 22),
    p("tree", 7, 19),
    // Special item chest (Orb of True Seeing)
    p("chest", 1, 6), // Contains Orb
    // Traps
    p("trap_armed", 6, 3), // Pit Trap
    p("trap_armed", 4, 15), // Evil Resurrection
  ],
};

// ──────────────────────────────────────────────────────────────
// ADVENTURE 4: The Key of Kallictakus (Level 1)
// Boards: 3, 9, 7 — includes LOCKED DOOR and WATCHTOWER
// HEROES RISE TO LEVEL 2 after this!
// ──────────────────────────────────────────────────────────────
const adventure4: PredefinedAdventure = {
  id: "adv4",
  level: 1,
  number: 4,
  name: "The Key of Kallictakus",
  description: "The note the Heroes discovered suggests the Sheriff of Holbrook is still alive and captive in an abandoned watchtower nearby. The tower is quickly found, but it has been magically locked.",
  objective: "Release the Sheriff by finding the Skeleton Key of Kallictakus and opening the watchtower.",
  victoryText: "The Sheriff is grateful for his release. The Heroes have done well, but the Sheriff has a dark tale to tell of a gathering army of Monsters. Can it be true? Congratulations – your Heroes have now gained in experience and have risen to Level 2!",
  boards: [3, 9, 7],
  traps: [
    { name: "Pit Trap", effect: "Hero loses 1 Hit Point.", count: 1 },
    { name: "Fireball Trap", effect: "All living things in the room lose 1 Hit Point. Does not affect undead.", count: 1 },
    { name: "Poison Darts Trap", effect: "Roll dice — Hero loses that many Hit Points.", count: 1 },
  ],
  specialItems: ["Skeleton Key of Kallictakus"],
  specialRules: [
    "When the Skeleton Key chest is opened, monsters appear in the Start Room.",
    "Monsters in room with board 7 must be placed in specific spaces.",
  ],
  gridRows: 16,
  gridCols: 24,
  pieces: [
    // START area (middle-right)
    p("start_space", 6, 18),
    // Locked door to watchtower (top-right)
    p("door_locked", 1, 19),
    p("tower", 1, 22), // WATCHTOWER
    // Doors
    p("door_closed", 5, 7), p("door_closed", 8, 12), p("door_closed", 10, 7),
    p("door_closed", 6, 15),
    // Board 3 top room: chests
    p("chest", 1, 3), p("chest", 1, 5), p("chest", 2, 6),
    // Board 9 middle: trees
    p("tree", 5, 14), p("tree", 8, 20), p("tree", 9, 21),
    // Room monsters
    // Board 7 (bottom-left): 2x Gnolls, 1x Bugbear (specific spaces)
    p("gnoll", 11, 3), p("gnoll", 12, 4),
    p("bugbear", 13, 2),
    // Middle room: 1x Ogre, 1x Goblin
    p("ogre", 9, 9), p("goblin", 8, 10),
    // Another room: 1x Gnoll, 1x Skeleton
    p("gnoll", 6, 4), p("skeleton", 5, 5),
    // Skeleton Key chest (special)
    p("chest", 12, 6), // Contains Skeleton Key
    // Trigger monsters (appear in start room when key found)
    // These are: 2x Goblins, 1x Bugbear, 2x Skeletons
    // Place at bottom for reference
    p("skeleton", 14, 9), p("skeleton", 14, 11),
    p("chest", 10, 13), p("chest", 13, 8),
    // Traps
    p("trap_armed", 7, 8), // Pit Trap
    p("trap_armed", 11, 10), // Fireball Trap
    p("trap_armed", 14, 6), // Poison Darts
  ],
};

// ──────────────────────────────────────────────────────────────
// ADVENTURE 5: The Army of Darkness (Level 2)
// Boards: 1, 7, 3, 6, 15, 16 — Large fort layout
// ──────────────────────────────────────────────────────────────
const adventure5: PredefinedAdventure = {
  id: "adv5",
  level: 2,
  number: 5,
  name: "The Army of Darkness",
  description: "While the Sheriff was imprisoned, he overheard that Angor's Monsters were part of an army now gathering in an old fort on the Forest's northern edge. The Sheriff must return to protect Holbrook, but if the Heroes use the element of surprise they can wipe out this army of darkness before it becomes too strong.",
  objective: "Attack the fort immediately and defeat all the Monsters.",
  victoryText: "At last the fort is cleared of Monsters! A fine result. Outside the fort, some movement catches the Heroes' eye. Who could be running off into the forest?",
  boards: [1, 7, 3, 6, 15, 16],
  traps: [
    { name: "Evil Resurrection Trap", effect: "Last Monster killed reappears anywhere in its starting room.", count: 1 },
    { name: "Poison Darts Trap", effect: "Roll dice — Hero loses that many Hit Points.", count: 1 },
  ],
  specialItems: [],
  specialRules: [
    "When the right-side doors open, 1x Gnoll appears in the Start Room.",
  ],
  gridRows: 18,
  gridCols: 24,
  pieces: [
    // START area (top-left)
    p("start_space", 1, 4),
    // Many doors throughout the fort
    p("door_closed", 3, 8), p("door_closed", 3, 15), p("door_closed", 3, 20),
    p("door_closed", 7, 5), p("door_closed", 10, 8), p("door_closed", 10, 15),
    p("door_closed", 14, 5), p("door_closed", 14, 13), p("door_closed", 14, 20),
    // Chests scattered throughout
    p("chest", 1, 7), p("chest", 1, 8), p("chest", 2, 14), p("chest", 2, 15),
    p("chest", 5, 1), p("chest", 5, 2), p("chest", 8, 7), p("chest", 8, 8),
    p("chest", 11, 1), p("chest", 11, 2), p("chest", 15, 7), p("chest", 15, 8),
    p("chest", 5, 14), p("chest", 5, 15), p("chest", 8, 20), p("chest", 8, 21),
    p("chest", 11, 14), p("chest", 11, 15), p("chest", 15, 20), p("chest", 15, 21),
    // Room monsters
    // Top-center: 2x Bugbears
    p("bugbear", 4, 10), p("bugbear", 4, 12),
    // Top-right: 2x Gnolls
    p("gnoll", 4, 17), p("gnoll", 4, 19),
    // Far right: 2x Ogres
    p("ogre", 4, 22), p("ogre", 5, 22),
    // Mid-left: 1x Troll
    p("troll", 8, 3),
    // Mid-center: 1x Wight
    p("wight", 8, 12),
    // Mid-right: 2x Bugbears
    p("bugbear", 8, 18), p("bugbear", 9, 19),
    // Bottom-left: 2x Gnolls
    p("gnoll", 12, 3), p("gnoll", 13, 4),
    // Bottom-center: 2x Skeletons
    p("skeleton", 12, 10), p("skeleton", 12, 12),
    // Bottom-right: 2x Wraiths
    p("wraith", 12, 18), p("wraith", 13, 19),
    // Trigger monsters (bottom far-right)
    p("gnoll", 16, 22), // appears in start room when door opens
    // Traps
    p("trap_armed", 6, 6), // Evil Resurrection
    p("trap_armed", 16, 10), // Poison Darts
  ],
};

// ──────────────────────────────────────────────────────────────
// ADVENTURE 6: The Pursuit (Level 2)
// Boards: 9, 4 — Two towers of Malbuck
// ──────────────────────────────────────────────────────────────
const adventure6: PredefinedAdventure = {
  id: "adv6",
  level: 2,
  number: 6,
  name: "The Pursuit",
  description: "Deciding to give chase to whatever ran from the fort, the Heroes follow a path through the forest, arriving at the two towers of Malbuck. This site is the final resting place of Thangrin the Bold, who defeated an entire demon army wearing the legendary Cloak of Boccob. Perhaps the cloak is still here!",
  objective: "Find the Cloak of Boccob.",
  victoryText: "The Heroes have battled bravely to find the Cloak of Boccob at Thangrin's shrine. However, the warrior's magic sword has been stolen! Whoever yields it has much power…",
  boards: [9, 4],
  traps: [
    { name: "Snarling Roots Trap", effect: "Hero misses next turn.", count: 1 },
    { name: "Evil Resurrection Trap", effect: "Last Monster killed reappears anywhere in its starting room.", count: 1 },
    { name: "Strangling Creepers Trap", effect: "Roll dice — Hero loses that many Hit Points.", count: 1 },
  ],
  specialItems: ["Cloak of Boccob", "Skeleton Key"],
  specialRules: [
    "Locked door requires Skeleton Key.",
    "Treat grassed area as one room.",
  ],
  gridRows: 16,
  gridCols: 22,
  pieces: [
    // START area (right)
    p("start_space", 8, 19),
    // Locked door
    p("door_locked", 1, 13),
    // Regular doors
    p("door_closed", 4, 7), p("door_closed", 8, 3), p("door_closed", 6, 13),
    // Trees throughout forest area
    p("tree", 5, 10), p("tree", 8, 12), p("tree", 10, 8),
    // Board 9 left: chests
    p("chest", 1, 4), p("chest", 1, 5), p("chest", 2, 3),
    p("chest", 3, 8), p("chest", 4, 9),
    // Board 4 right: chests
    p("chest", 4, 15), p("chest", 4, 17), p("chest", 4, 19),
    p("chest", 6, 16), p("chest", 7, 18),
    // Monsters
    // Left tower: 1x Troll, chests
    p("troll", 9, 3),
    // 2x Gnolls
    p("gnoll", 6, 5), p("gnoll", 7, 4),
    // 1x Ogre
    p("ogre", 3, 2),
    // Right tower: 1x Wight
    p("wight", 3, 16),
    // 6x Skeletons spread around
    p("skeleton", 5, 14), p("skeleton", 5, 16), p("skeleton", 6, 15),
    p("skeleton", 8, 15), p("skeleton", 9, 16), p("skeleton", 9, 14),
    // 2x Bugbears (grassed area)
    p("bugbear", 12, 5), p("bugbear", 12, 8),
    // Special item chests
    p("chest", 2, 15), // Cloak of Boccob
    p("chest", 8, 2), // Skeleton Key
    // Traps
    p("trap_armed", 10, 6), // Snarling Roots
    p("trap_armed", 7, 2), // Evil Resurrection
    p("trap_armed", 11, 10), // Strangling Creepers
  ],
};

// ──────────────────────────────────────────────────────────────
// ADVENTURE 7: Lair of the Troll (Level 2)
// Boards: 1, 4, 6, 7 — Temple of Gallamet
// ──────────────────────────────────────────────────────────────
const adventure7: PredefinedAdventure = {
  id: "adv7",
  level: 2,
  number: 7,
  name: "Lair of the Troll",
  description: "Thangrin the Bold's armour and sword, the Disobedient Servant of Kord, held a special bond. The magic power of the sword draws the armour to it and the Heroes are led to the ancient temple of Gallamet on the edge of the forest. The temple has been taken over by Skurduk, a Warrior Troll.",
  objective: "Find the Disobedient Servant of Kord and use it to defeat Skurduk.",
  victoryText: "A magnificent effort! The Heroes have recovered Thangrin's treasure, and find themselves outside the temple of Gallamet itself. From the depths of the temple the stench of the undead fills the air!",
  boards: [1, 4, 6, 7],
  traps: [
    { name: "Strangling Creepers Trap", effect: "Roll dice — Hero loses that many Hit Points.", count: 1 },
    { name: "Snarling Roots Trap", effect: "Hero misses next turn.", count: 2 },
    { name: "Evil Resurrection Trap", effect: "Last Monster killed reappears anywhere in its starting room.", count: 4 },
  ],
  specialItems: ["Disobedient Servant of Kord (Thangrin's Sword)"],
  specialRules: [
    "Skurduk (Warrior Troll) — only the Disobedient Servant of Kord can harm him.",
    "Both doors in the start area open at the same time.",
    "Monsters in bottom-right room must be placed in specific spaces.",
  ],
  gridRows: 18,
  gridCols: 24,
  pieces: [
    // START area (bottom-right)
    p("start_space", 11, 18),
    // Doors
    p("door_closed", 3, 7), p("door_closed", 5, 14), p("door_closed", 9, 7),
    p("door_closed", 9, 14), p("door_closed", 13, 7), p("door_closed", 13, 18),
    p("door_closed", 13, 20), // Both open at same time
    // Special item chest
    p("chest", 1, 5), // Disobedient Servant of Kord
    // Trees
    p("tree", 2, 8), p("tree", 6, 11), p("tree", 10, 4),
    // Pillars
    p("pillar", 4, 3), p("pillar", 4, 5),
    // Chests
    p("chest", 1, 10), p("chest", 1, 12), p("chest", 4, 14),
    p("chest", 7, 1), p("chest", 7, 5), p("chest", 10, 10),
    p("chest", 10, 14), p("chest", 14, 3), p("chest", 14, 5),
    // SKURDUK (boss Troll) — board 4 specific space
    p("troll", 9, 2), // SKURDUK
    // Monsters
    // Board 1 top: 1x Bugbear, 2x Gnolls, 1x Ogre
    p("bugbear", 3, 3), p("gnoll", 3, 5), p("gnoll", 2, 4),
    p("ogre", 5, 2),
    // Board 4 middle: 4x Goblins
    p("goblin", 6, 13), p("goblin", 6, 15), p("goblin", 7, 14), p("goblin", 8, 13),
    // Board 7: 2x Skeletons
    p("skeleton", 5, 9), p("skeleton", 6, 8),
    // Board 6: 2x Wights, 1x Wraith
    p("wight", 10, 17), p("wight", 11, 16),
    p("wraith", 12, 18),
    // Bottom-right (specific spaces): 2x Carrion Crawlers, 2x Gnolls, 4x Goblins
    p("carrion_crawler", 14, 17), p("carrion_crawler", 14, 20),
    p("gnoll", 15, 18), p("gnoll", 15, 20),
    p("goblin", 16, 17), p("goblin", 16, 19), p("goblin", 16, 21), p("goblin", 17, 20),
    // Traps
    p("trap_armed", 4, 10), // Strangling Creepers
    p("trap_armed", 8, 5), // Snarling Roots
    p("trap_armed", 12, 3), // Snarling Roots
    p("trap_armed", 2, 14), p("trap_armed", 7, 9), p("trap_armed", 11, 14), p("trap_armed", 15, 5), // Evil Resurrection
  ],
};

// ──────────────────────────────────────────────────────────────
// ADVENTURE 8: Temple of Terror (Level 2)
// Boards: 5, 2, 9, 3 — HEROES RISE TO LEVEL 3
// ──────────────────────────────────────────────────────────────
const adventure8: PredefinedAdventure = {
  id: "adv8",
  level: 2,
  number: 8,
  name: "Temple of Terror",
  description: "The rotting stink indicates a strong undead presence within the once-holy temple of Gallamet. As the Heroes enter the temple, they discover many Monsters, undead or otherwise, ready to destroy all the villages around the forest.",
  objective: "The Heroes must defeat all the Monsters in this foul place.",
  victoryText: "With great skill, the Heroes destroy the last of the Monsters. A splendid victory. Yet as the last Monster dies, a portal appears in the room and a terrible undead being laughs, \"You fools will never stop me from rising again. Come to the Keep of Shadows and you shall see! Ha, ha, ha!\". Congratulations – your Heroes have now risen to Level 3!",
  boards: [5, 2, 9, 3],
  traps: [
    { name: "Web Trap", effect: "Hero misses next turn.", count: 3 },
    { name: "Poison Darts Trap", effect: "Roll dice — Hero loses that many Hit Points.", count: 1 },
    { name: "Evil Resurrection Trap", effect: "Last Monster killed reappears anywhere in its starting room.", count: 1 },
  ],
  specialItems: [],
  specialRules: [
    "All doors open at the same time.",
    "When the right-side door opens, monsters appear in the Start Room.",
  ],
  gridRows: 18,
  gridCols: 24,
  pieces: [
    // START (middle-right)
    p("start_space", 10, 20),
    // Doors (all open at same time)
    p("door_closed", 2, 8), p("door_closed", 5, 14), p("door_closed", 8, 8),
    p("door_closed", 8, 18), p("door_closed", 12, 8), p("door_closed", 12, 14),
    // Chests
    p("chest", 1, 1), p("chest", 1, 3), p("chest", 1, 5), p("chest", 1, 7),
    p("chest", 4, 10), p("chest", 4, 12), p("chest", 7, 1), p("chest", 7, 3),
    p("chest", 10, 10), p("chest", 10, 12), p("chest", 13, 1), p("chest", 13, 3),
    // Trees
    p("tree", 6, 11), p("tree", 13, 11),
    // Monsters
    // Top room: 1x Troll, 1x Ogre
    p("troll", 3, 3), p("ogre", 3, 5),
    // Top-right: 1x Wraith, 1x Carrion Crawler
    p("wraith", 3, 16), p("carrion_crawler", 4, 18),
    // Mid-left: 3x Skeletons
    p("skeleton", 6, 2), p("skeleton", 6, 4), p("skeleton", 7, 3),
    // Mid-right: 1x Wight, 2x Gnolls
    p("wight", 6, 16), p("gnoll", 7, 17), p("gnoll", 7, 19),
    // Bottom: 3x Goblins, 1x Bugbear
    p("goblin", 10, 3), p("goblin", 10, 5), p("goblin", 11, 4),
    p("bugbear", 10, 7),
    // 3x Wraiths (bottom-center)
    p("wraith", 14, 10), p("wraith", 14, 12),
    // Bottom-right: 1x Wight, 1x Ooze (start room trigger)
    p("wight", 14, 17),
    p("ooze", 11, 20),
    // Start room trigger monsters
    p("skeleton", 11, 22), p("gnoll", 12, 22),
    // Traps
    p("trap_armed", 5, 6), p("trap_armed", 9, 4), p("trap_armed", 15, 6), // Web Traps
    p("trap_armed", 9, 12), // Poison Darts
    p("trap_armed", 15, 12), // Evil Resurrection
  ],
};

// ──────────────────────────────────────────────────────────────
// ADVENTURE 9: Assault on Castle Borash (Level 3)
// Boards: 5, 7, 9, 4
// ──────────────────────────────────────────────────────────────
const adventure9: PredefinedAdventure = {
  id: "adv9",
  level: 3,
  number: 9,
  name: "Assault on Castle Borash",
  description: "The Heroes remember the Sheriff of Holbrook warning that the Keep of Shadows, in Castle Borash, is the home of the evil lich, Lord Necratim. For many moons Necratim has been weak, but now he is feasting on the destruction his Monsters are causing in the forest. The Heroes must find Necratim and defeat him before his power grows too strong.",
  objective: "Defeat the 3 Wraiths to open the inner gate to the castle.",
  victoryText: "The Heroes stand victorious as the Wraiths fall, and the gate to the inner castle opens. Stepping inside, the gate slams shut behind the Heroes. Now the only way out lies ahead!",
  boards: [5, 7, 9, 4],
  traps: [
    { name: "Curse of Heavy Burden", effect: "The movement of each Hero is reduced to 1 space per action until the Initiative changes or another Trap is sprung.", count: 1 },
    { name: "Curse of Vulnerability", effect: "Each Hero's Armour Class is reduced by 1 point until the Initiative changes or another Trap is sprung.", count: 1 },
    { name: "Curse of the Hoards", effect: "All Monsters add 1 to their attack until the Initiative changes or another Trap is sprung.", count: 1 },
  ],
  specialItems: [],
  specialRules: [
    "Monsters in the bottom-right room must be placed in specific spaces.",
    "Treat grassed area as one room.",
  ],
  gridRows: 18,
  gridCols: 24,
  pieces: [
    // START (bottom-left)
    p("start_space", 14, 2),
    // Doors
    p("door_closed", 3, 8), p("door_closed", 3, 15), p("door_closed", 6, 4),
    p("door_closed", 8, 15), p("door_closed", 10, 8), p("door_closed", 13, 15),
    // Trees
    p("tree", 14, 8), p("tree", 15, 6),
    // Chests
    p("chest", 1, 1), p("chest", 1, 3), p("chest", 4, 6), p("chest", 4, 8),
    p("chest", 7, 1), p("chest", 7, 3), p("chest", 10, 6), p("chest", 10, 8),
    p("chest", 4, 14), p("chest", 4, 16), p("chest", 7, 20), p("chest", 7, 22),
    // Monsters — 3 guardian Wraiths (top area)
    p("wraith", 2, 3), p("wraith", 2, 5), p("wraith", 3, 4),
    // 1x Troll
    p("troll", 5, 2),
    // 2x Bugbears
    p("bugbear", 5, 11), p("bugbear", 5, 13),
    // 2x Ogres
    p("ogre", 8, 3), p("ogre", 8, 5),
    // 2x Ooze (previously was carrion_crawler)
    p("ooze", 9, 11),
    // 1x Wight, 2x Gnolls
    p("wight", 5, 18),
    p("gnoll", 5, 20), p("gnoll", 6, 19),
    // 1x Carrion Crawler
    p("carrion_crawler", 8, 18),
    // 2x Skeletons
    p("skeleton", 9, 20), p("skeleton", 10, 19),
    // 4x Goblins (bottom-right, specific spaces)
    p("goblin", 14, 18), p("goblin", 14, 20), p("goblin", 15, 19), p("goblin", 16, 18),
    // Traps (curses)
    p("trap_armed", 4, 10), // Curse of Heavy Burden
    p("trap_armed", 7, 15), // Curse of Vulnerability
    p("trap_armed", 11, 10), // Curse of the Hoards
  ],
};

// ──────────────────────────────────────────────────────────────
// ADVENTURE 10: Spiral of Doom (Level 3)
// Boards: 7, 1, 9, 3
// ──────────────────────────────────────────────────────────────
const adventure10: PredefinedAdventure = {
  id: "adv10",
  level: 3,
  number: 10,
  name: "Spiral of Doom",
  description: "The Heroes find themselves in a small room, deep in the heart of the castle. They stumble across a journal from an unfortunate Hero long lost in the Keep. It mentions four, lost magical Items that together could defeat Necratim.",
  objective: "Find and keep the four magical Items. If the Heroes fail their Objective but are still alive, restart the level with the Items they currently possess.",
  victoryText: "The Heroes have become legends by winning this battle. As they find the fourth magical item, the doorway to Necratim's inner lair opens in front of them. A stone stairway leads down into deeper darkness…",
  boards: [7, 1, 9, 3],
  traps: [
    { name: "Skeletal Arrows", effect: "Roll dice — Hero loses that many Hit Points.", count: 1 },
    { name: "Flagstone Slide", effect: "The floor drops away. Hero reappears anywhere in the grassed area.", count: 1 },
    { name: "Ghostly Hands", effect: "A chilling grip forces Hero to miss a turn.", count: 1 },
  ],
  specialItems: ["Entropic Shield", "Dragon's Fury", "Harbinger of Pain", "Flame Strike Spell"],
  specialRules: [
    "Opens all remaining doors as trigger door is opened.",
    "When trigger door opens, monsters appear in Start Room.",
    "Entropic Shield: absorbs energy from Monsters.",
    "Dragon's Fury: Powerful bow.",
    "Harbinger of Pain: Powerful sword.",
    "Flame Strike: Spear-shaped points of fire.",
  ],
  gridRows: 18,
  gridCols: 24,
  pieces: [
    // START (bottom-center)
    p("start_space", 12, 14),
    // Doors
    p("door_closed", 2, 7), p("door_closed", 5, 14), p("door_closed", 8, 7),
    p("door_closed", 8, 18), p("door_closed", 12, 7), p("door_closed", 14, 14),
    // Special item chests
    p("chest", 1, 4), // Entropic Shield
    p("chest", 1, 14), // Harbinger of Pain
    p("chest", 4, 22), // Flame Strike
    // Trees
    p("tree", 14, 4), p("tree", 15, 6), p("tree", 16, 3),
    // Chests
    p("chest", 1, 1), p("chest", 1, 3), p("chest", 4, 8), p("chest", 4, 10),
    p("chest", 7, 1), p("chest", 7, 3), p("chest", 10, 8), p("chest", 10, 10),
    p("chest", 7, 16), p("chest", 7, 18),
    // Monsters
    // Top: 2x Wraiths
    p("wraith", 2, 2), p("wraith", 2, 4),
    // 2x Wights
    p("wight", 3, 10), p("wight", 3, 12),
    // 2x Bugbears
    p("bugbear", 5, 3), p("bugbear", 6, 4),
    // 1x Troll
    p("troll", 6, 11),
    // 2x Gnolls
    p("gnoll", 5, 16), p("gnoll", 5, 18),
    // 1x Ogre
    p("ogre", 8, 3),
    // 2x Skeletons
    p("skeleton", 9, 10), p("skeleton", 9, 12),
    // Bottom: 1x Lich approach — carrion crawlers
    p("carrion_crawler", 13, 3), p("carrion_crawler", 13, 5),
    // Right trigger monsters (appear in start room)
    p("goblin", 8, 22), p("goblin", 9, 22), p("goblin", 10, 22),
    p("goblin", 11, 22), p("goblin", 12, 22), p("goblin", 13, 22),
    p("ogre", 10, 20), p("gnoll", 11, 20),
    // Bottom left
    p("skeleton", 15, 8), p("skeleton", 16, 7),
    p("goblin", 14, 10),
    // Traps
    p("trap_armed", 4, 6), // Skeletal Arrows
    p("trap_armed", 11, 4), // Flagstone Slide
    p("trap_armed", 7, 14), // Ghostly Hands
  ],
};

// ──────────────────────────────────────────────────────────────
// ADVENTURE 11: Necratim Ascendant (Level 3)
// Boards: 6, 10, 8, 3, 2 — Final adventure!
// ──────────────────────────────────────────────────────────────
const adventure11: PredefinedAdventure = {
  id: "adv11",
  level: 3,
  number: 11,
  name: "Necratim Ascendant",
  description: "The Heroes have reached the chambers where the lich Lord Necratim dwells. It is a dark, dank place, and nothing is to be trusted. The Heroes must battle their way through the gloom, to reach Necratim and destroy him for good. If successful, the land of Rallion will be saved.",
  objective: "Defeat the Lich Lord, Necratim.",
  victoryText: "As he is defeated, the other Monsters wither away. Congratulations! You have outfought Necratim and the people of Rallion thank you. Peace reigns again. Yet even as he falls, Necratim mutters a final curse. Before the Heroes can react, a portal opens behind him and he is sucked through! The portal slams shut, leaving a deathly silence to fall over the castle…",
  boards: [6, 10, 8, 3, 2],
  traps: [
    { name: "Ghostly Hands", effect: "A chilling grip forces Hero to miss a turn.", count: 1 },
    { name: "Skeletal Arrows", effect: "Roll dice — Hero loses that many Hit Points.", count: 2 },
    { name: "Evil Resurrection Trap", effect: "Last Monster killed reappears anywhere in its starting room.", count: 1 },
  ],
  specialItems: [],
  specialRules: [
    "Opening one door opens all other doors in the room at the same time.",
    "Once all surviving Heroes are through the final door, it locks behind them.",
    "NECRATIM is the Lich — the final boss.",
    "All three right-side doors open at the same time.",
  ],
  gridRows: 18,
  gridCols: 24,
  pieces: [
    // START (bottom-left)
    p("start_space", 14, 2),
    // Doors
    p("door_closed", 4, 6), p("door_closed", 4, 12), p("door_closed", 7, 4),
    p("door_closed", 9, 12), p("door_closed", 9, 18),
    p("door_closed", 12, 6), p("door_closed", 12, 18), p("door_closed", 15, 12),
    // Locked door (final passage)
    p("door_locked", 12, 22),
    // Chests
    p("chest", 1, 1), p("chest", 1, 3), p("chest", 1, 9), p("chest", 1, 11),
    p("chest", 5, 8), p("chest", 5, 10), p("chest", 8, 1), p("chest", 8, 3),
    p("chest", 8, 9), p("chest", 8, 11),
    p("chest", 5, 16), p("chest", 5, 18),
    p("chest", 11, 8), p("chest", 11, 10),
    p("chest", 15, 8), p("chest", 15, 10),
    // Trees
    p("tree", 14, 8),
    // NECRATIM — The Lich (far right)
    p("lich", 13, 21),
    // Monsters
    // Top-left: 2x Wraiths, 2x Gnolls
    p("wraith", 2, 2), p("wraith", 2, 4),
    p("gnoll", 3, 2), p("gnoll", 3, 4),
    // Top-right: 1x Troll
    p("troll", 2, 10),
    // Mid-left: 1x Ogre, 1x Bugbear
    p("ogre", 5, 3), p("bugbear", 6, 2),
    // Mid: 3x Skeletons
    p("skeleton", 6, 9), p("skeleton", 6, 11), p("skeleton", 7, 10),
    // Right wing: 1x Wight, 2x Carrion Crawlers
    p("wight", 6, 17),
    p("carrion_crawler", 7, 16), p("carrion_crawler", 7, 18),
    // Mid-right: 2x Gnolls, 1x Bugbear
    p("gnoll", 10, 16), p("gnoll", 10, 18),
    p("bugbear", 10, 20),
    // Bottom corridor: 1x Troll, 4x Goblins
    p("troll", 13, 4),
    p("goblin", 15, 3), p("goblin", 15, 5), p("goblin", 16, 4), p("goblin", 16, 6),
    // Bottom monsters near Necratim: 1x Wraith, 1x Wight
    p("wraith", 14, 18),
    p("wight", 15, 20),
    // 2x Ogres, 1x Ooze
    p("ogre", 14, 15), p("ooze", 16, 18),
    // Traps
    p("trap_armed", 3, 8), // Ghostly Hands
    p("trap_armed", 7, 6), // Skeletal Arrows
    p("trap_armed", 10, 12), // Skeletal Arrows
    p("trap_armed", 13, 8), // Evil Resurrection
  ],
};

export const PREDEFINED_ADVENTURES: PredefinedAdventure[] = [
  adventure1, adventure2, adventure3, adventure4,
  adventure5, adventure6, adventure7, adventure8,
  adventure9, adventure10, adventure11,
];
