// Dungeon Master Guide data extracted from the 2003 D&D Board Game DM Guide PDF

export interface Monster {
  name: string;
  type: "standard" | "undead";
  undeadValue?: number;
  hitPoints: number;
  movement: number;
  meleeAttack: string;
  rangedAttack?: string;
  armorClass: number;
  specialAbility?: string;
  description: string;
  level: number;
}

export interface Trap {
  name: string;
  effect: string;
  adventures: string[];
}

export interface Adventure {
  number: number;
  level: number;
  title: string;
  story: string;
  objective: string;
  conclusion: string;
  traps: { name: string; effect: string; count?: number }[];
  specialItems?: string[];
  specialRules?: string[];
}

export const dmIntro = {
  title: "Playing the Dungeon Master",
  description:
    "You have chosen to be the Dungeon Master (DM). You play the unseen hand that guides the creatures of evil in each Adventure. You take control of all the Monsters, traps and doors in the Dungeon. Your aim is to prevent the Heroes from completing the Objective for each Adventure.",
  details:
    "Each Adventure plan details the layout of the Dungeon for that particular Adventure and shows the Monsters you will need to take into the Dungeon with you. Only the DM can look at the Adventure layout and the Monsters involved.",
  lore: "Fear is rising throughout the land of Rallion, as dark forces wreak destruction wherever they roam. Rumours abound that a once-defeated Lich Lord has returned to mastermind the terror. Four Heroes – Regdar, Jozan, Lidda and Mialee – have banded together to find the source of this evil and destroy it for all eternity.",
};

export const monsters: Monster[] = [
  {
    name: "Goblin",
    type: "standard",
    hitPoints: 1,
    movement: 4,
    meleeAttack: "Yellow die (melee face)",
    armorClass: 2,
    description:
      "Small, cunning creatures that attack in numbers. Goblins are scouts and bandits lurking on the fringes of the forest. They are weak individually but dangerous in groups.",
    level: 1,
  },
  {
    name: "Skeleton",
    type: "undead",
    undeadValue: 2,
    hitPoints: 1,
    movement: 4,
    meleeAttack: "Yellow die (melee face)",
    armorClass: 3,
    description:
      "Animated bones of the dead, Skeletons are mindless undead warriors. They wield rusted swords and can be turned by a Cleric's holy power.",
    level: 1,
  },
  {
    name: "Bugbear",
    type: "standard",
    hitPoints: 2,
    movement: 4,
    meleeAttack: "Orange die (melee face)",
    armorClass: 3,
    description:
      "Large, brutish goblinoids and leaders of Goblin warbands. Bugbears are stronger and more cunning than their smaller cousins, commanding fear and respect.",
    level: 1,
  },
  {
    name: "Gnoll",
    type: "standard",
    hitPoints: 2,
    movement: 4,
    meleeAttack: "Orange die (melee face)",
    armorClass: 3,
    description:
      "Hyena-headed humanoids that revel in destruction. Gnolls are savage warriors that serve as muscle in the dark armies of Rallion.",
    level: 1,
  },
  {
    name: "Ooze",
    type: "standard",
    hitPoints: 2,
    movement: 2,
    meleeAttack: "Orange die (melee face)",
    armorClass: 2,
    specialAbility: "Immune to ranged attacks.",
    description:
      "A formless, acidic mass that dissolves anything it touches. Oozes are slow but relentless, and they cannot be harmed by ranged weapons.",
    level: 1,
  },
  {
    name: "Troll",
    type: "standard",
    hitPoints: 3,
    movement: 4,
    meleeAttack: "Red die (melee face)",
    armorClass: 4,
    specialAbility: "Regenerates 1 Hit Point at the start of the DM's turn (up to max).",
    description:
      "Towering, green-skinned brutes with the terrifying ability to regenerate wounds. Trolls are fearsome combatants that keep coming back for more.",
    level: 2,
  },
  {
    name: "Wight",
    type: "undead",
    undeadValue: 4,
    hitPoints: 2,
    movement: 4,
    meleeAttack: "Orange die (melee face)",
    armorClass: 4,
    specialAbility: "On a hit, Hero must also roll the Undead die.",
    description:
      "A malevolent undead creature driven by hatred of the living. Wights drain the life force of those they touch, making them doubly dangerous.",
    level: 2,
  },
  {
    name: "Wraith",
    type: "undead",
    undeadValue: 5,
    hitPoints: 3,
    movement: 6,
    meleeAttack: "Red die (melee face)",
    armorClass: 5,
    specialAbility: "Can move through walls. Immune to non-magical weapons.",
    description:
      "Shadowy, incorporeal spirits of immense power. Wraiths glide through walls and can only be harmed by magical weapons, making them terrifying foes.",
    level: 2,
  },
  {
    name: "Carrion Crawler",
    type: "standard",
    hitPoints: 3,
    movement: 4,
    meleeAttack: "Red die (melee face)",
    armorClass: 4,
    specialAbility: "On a hit, Hero misses their next turn (paralysis).",
    description:
      "A giant, centipede-like creature that feeds on the dead. Its paralysing tentacles can immobilise even the strongest Hero.",
    level: 2,
  },
  {
    name: "Ogre",
    type: "standard",
    hitPoints: 4,
    movement: 3,
    meleeAttack: "Red die (melee face)",
    armorClass: 4,
    description:
      "Massive, dim-witted giants that rely on brute strength. An Ogre can crush a Hero with a single blow of its enormous club.",
    level: 2,
  },
  {
    name: "Lich (Necratim)",
    type: "undead",
    undeadValue: 6,
    hitPoints: 5,
    movement: 4,
    meleeAttack: "Red die + Purple die",
    rangedAttack: "Purple die (ranged, 4 spaces)",
    armorClass: 6,
    specialAbility:
      "Can attack at range using the Purple die. Immune to non-magical weapons. Only harmed by the 4 special Items found in Adventure 10.",
    description:
      "Lord Necratim, the ultimate evil. This ancient undead sorcerer is the mastermind behind the terror in Rallion. He can only be destroyed with the four legendary magical Items.",
    level: 3,
  },
];

export const traps: Trap[] = [
  {
    name: "Pit Trap",
    effect: "Hero loses 1 Hit Point.",
    adventures: ["Adventure 1", "Adventure 2", "Adventure 3", "Adventure 4"],
  },
  {
    name: "Fireball Trap",
    effect: "All living things in the room lose 1 Hit Point. Does not affect undead.",
    adventures: ["Adventure 4"],
  },
  {
    name: "Poison Darts Trap",
    effect: "Roll the combat die — Hero loses that many Hit Points.",
    adventures: ["Adventure 4", "Adventure 5", "Adventure 8"],
  },
  {
    name: "Evil Resurrection Trap",
    effect: "The last Monster killed reappears anywhere in its starting room.",
    adventures: ["Adventure 3", "Adventure 5", "Adventure 7", "Adventure 8", "Adventure 11"],
  },
  {
    name: "Strangling Creepers Trap",
    effect: "Roll the combat die — Hero loses that many Hit Points.",
    adventures: ["Adventure 6", "Adventure 7"],
  },
  {
    name: "Snarling Roots Trap",
    effect: "Hero misses next turn.",
    adventures: ["Adventure 6", "Adventure 7"],
  },
  {
    name: "Web Trap",
    effect: "Hero misses next turn.",
    adventures: ["Adventure 8"],
  },
  {
    name: "Curse of Heavy Burden",
    effect: "The movement of each Hero is reduced to 1 space per action until Initiative changes or another Trap is sprung.",
    adventures: ["Adventure 9"],
  },
  {
    name: "Curse of Vulnerability",
    effect: "Each Hero's Armour Class is reduced by 1 point until Initiative changes or another Trap is sprung.",
    adventures: ["Adventure 9"],
  },
  {
    name: "Curse of the Hoards",
    effect: "All Monsters add 1 to their attack until Initiative changes or another Trap is sprung.",
    adventures: ["Adventure 9"],
  },
  {
    name: "Skeletal Arrows",
    effect: "Roll the combat die — Hero loses that many Hit Points.",
    adventures: ["Adventure 10", "Adventure 11"],
  },
  {
    name: "Flagstone Slide",
    effect: "The floor drops away. Hero reappears anywhere in the grassed area.",
    adventures: ["Adventure 10"],
  },
  {
    name: "Ghostly Hands",
    effect: "A chilling grip forces the Hero to miss a turn.",
    adventures: ["Adventure 10", "Adventure 11"],
  },
];

export const dmRules = {
  startingTheGame: [
    "Place the Dungeon gameboards on the table as shown in the Adventure layout. Do not put anything on them yet.",
    "Put a closed door token in the starting room where shown. Tell the Heroes this is the starting room and let their figures be placed there.",
    "Separate the cards into three piles – Item cards, Special Item cards and Monster cards. Keep the Monster cards and Special Item cards beside you.",
    "Announce the level of this Adventure (1, 2 or 3). Take all Item cards for any level higher than this and remove them from the deck.",
    "Read out the Adventure and Objective.",
    "Check the Heroes have taken their Basic Item cards for this Adventure.",
  ],
  settingUpARoom: [
    "Position closed door tokens (if any) in the new room where shown.",
    "Place any chests, trees and pillars on the appropriate spaces.",
    "Place any Monsters in the room (see Placing Monsters).",
    "Lay out the matching Monster cards in front of you, with the correct number of Hit Point tokens beside each.",
    "Secretly look to see where any traps are in the room, but do not tell the Heroes.",
  ],
  usingMonsters: {
    placing: "The Adventure layout shows how many Monsters and of what type must be placed in each room. You may put most Monsters anywhere in a room, except for a space in front of a door.",
    movementAndAttack:
      "On your turn, you can do up to two things with every Monster currently on the board: Movement (up to max allowance, horizontal/vertical only) and Attack. You must finish one Monster before beginning another's. You can choose not to move or attack, or take a double move instead.",
    tapping:
      "Once a Monster has been used, turn its card horizontally ('tapping'). At the end of your go, turn each card back. If defeated, remove the figure and card from play.",
    undead:
      "Some Monsters are 'Undead', shown by a skull on their card. The number next to the skull shows their 'undead value'. An undead Monster can be stunned for one round by a Hero with powers to 'turn' undead creatures.",
  },
  runningTheGame: [
    "Play the Adventures through in order.",
    "Ensure you read out the Objective at the start of each new Adventure.",
    "Keep watching for traps.",
    "As Dungeon Master it is your Dungeon and you must control it.",
    "Be aware of what is happening at all times, but most of all enjoy yourself!",
  ],
  extraPlayTips: [
    "Don't put more features into an Adventure than there are in the game.",
    "Try to keep the Heroes guessing – don't make Adventures too obvious.",
    "Give the Heroes a good challenge with a chance of winning to keep the game interesting.",
  ],
  doorsAndTraps: {
    opening: "Heroes open the door to a new room by moving next to it and saying 'Open'. Set up only the new room — the Dungeon develops room by room.",
    locked: "Some doors are locked. The Heroes must find the correct key (usually a Special Item) to unlock them.",
    traps: "When a Hero stands on a trap, shout 'Trap!'. The Hero must stop on that space. Read out the trap description. The Hero's turn ends. Monsters can pass through trap spaces without setting them off.",
    disabling: "A Hero with the ability to disable traps can attempt it. If unsuccessful, do not show the Hero any traps that may be in the room.",
    chests: "Heroes can open chests, where they may find useful items or booby traps. The Hero must draw a card from the Item card pile.",
  },
};

export const adventures: Adventure[] = [
  {
    number: 1,
    level: 1,
    title: "The Goblin Bandits",
    story: "Unease and darkness have fallen over the land of Rallion as Monsters ravage the region. Travelling through it, the Heroes have arrived at the village of Holbrook, on the edge of a forest, where Goblin attacks have left the villagers fearing for their lives. The Sheriff of Holbrook has gone in search of them, but has not returned.",
    objective: "Defeat all the Goblins.",
    conclusion: "You have defeated the Goblin bandits. But as the Heroes search their lair they find a disturbing message. It seems the Goblins were just scouts for a larger party.",
    traps: [{ name: "Pit Trap", effect: "Hero loses 1 Hit Point." }],
  },
  {
    number: 2,
    level: 1,
    title: "The Trail of Evil",
    story: "Following Goblin trails through the forest, the Heroes track down the hideout of Angor, their Bugbear leader. Will they find the Sheriff here?",
    objective: "Find Angor and defeat him.",
    conclusion: "The Heroes have defeated Angor! Yet as he fell he called to his army to 'Find the Orb' and there is still no sign of the Sheriff.",
    traps: [{ name: "Pit Trap", effect: "Hero loses 1 Hit Point." }],
  },
  {
    number: 3,
    level: 1,
    title: "The Haunted Village",
    story: "The Heroes meet an old man, who tells them the tale of the 'Orb of True Seeing', which lets its owner see for miles around. Rumours abound that it is in the village of Yeland's Cross, which has been overrun by Angor's henchmen.",
    objective: "Find the Orb to prevent it falling into the wrong hands.",
    conclusion: "The Heroes got there in the nick of time! Next to the Orb, they find a half-scribbled ransom note that was never delivered. The Sheriff is close!",
    traps: [
      { name: "Pit Trap", effect: "Hero loses 1 Hit Point." },
      { name: "Evil Resurrection Trap", effect: "Last Monster killed reappears anywhere in its starting room." },
    ],
    specialItems: ["Orb of True Seeing"],
  },
  {
    number: 4,
    level: 1,
    title: "The Key of Kallictakus",
    story: "The note the Heroes discovered suggests the Sheriff of Holbrook is still alive and captive in an abandoned watchtower nearby. The tower is quickly found, but it has been magically locked.",
    objective: "Release the Sheriff by finding the Skeleton Key of Kallictakus and opening the watchtower.",
    conclusion: "The Sheriff is grateful for his release. The Heroes have done well, but the Sheriff has a dark tale to tell of a gathering army of Monsters.",
    traps: [
      { name: "Pit Trap", effect: "Hero loses 1 Hit Point." },
      { name: "Fireball Trap", effect: "All living things in the room lose 1 Hit Point. Does not affect undead." },
      { name: "Poison Darts Trap", effect: "Roll — Hero loses that many Hit Points." },
    ],
    specialItems: ["Skeleton Key of Kallictakus"],
    specialRules: ["Heroes rise to Level 2 after completing this Adventure."],
  },
  {
    number: 5,
    level: 2,
    title: "The Army of Darkness",
    story: "While the Sheriff was imprisoned, he overheard that Angor's Monsters were part of an army now gathering in an old fort on the forest's northern edge. If the Heroes use the element of surprise they can wipe out this army before it becomes too strong.",
    objective: "Attack the fort immediately and defeat all the Monsters.",
    conclusion: "At last the fort is cleared of Monsters! Outside the fort, some movement catches the Heroes' eye. Who could be running off into the forest?",
    traps: [
      { name: "Evil Resurrection Trap", effect: "Last Monster killed reappears anywhere in its starting room." },
      { name: "Poison Darts Trap", effect: "Roll — Hero loses that many Hit Points." },
    ],
  },
  {
    number: 6,
    level: 2,
    title: "The Pursuit",
    story: "Deciding to give chase to whatever ran from the fort, the Heroes follow a path through the forest, arriving at the two towers of Malbuck. This site is the final resting place of Thangrin the Bold, who defeated an entire demon army wearing the legendary Cloak of Boccob.",
    objective: "Find the Cloak of Boccob.",
    conclusion: "The Heroes have battled bravely to find the Cloak of Boccob at Thangrin's shrine. However, the warrior's magic sword has been stolen!",
    traps: [
      { name: "Evil Resurrection Trap", effect: "Last Monster killed reappears anywhere in its starting room." },
      { name: "Strangling Creepers Trap", effect: "Roll — Hero loses that many Hit Points." },
      { name: "Snarling Roots Trap", effect: "Hero misses next turn." },
    ],
    specialItems: ["Cloak of Boccob", "Skeleton Key"],
  },
  {
    number: 7,
    level: 2,
    title: "Lair of the Troll",
    story: "Thangrin the Bold's armour and sword, the Disobedient Servant of Kord, held a special bond. The magic power of the sword draws the armour to it and the Heroes are led to the ancient temple of Gallamet. The temple has been taken over by Skurduk, a Warrior Troll.",
    objective: "Find the Disobedient Servant of Kord and use it to defeat Skurduk.",
    conclusion: "A magnificent effort! The Heroes have recovered Thangrin's treasure. From the depths of the temple the stench of the undead fills the air!",
    traps: [
      { name: "Strangling Creepers Trap", effect: "Roll — Hero loses that many Hit Points." },
      { name: "Snarling Roots Trap", effect: "Hero misses next turn." },
      { name: "Evil Resurrection Trap", effect: "Last Monster killed reappears anywhere in its starting room." },
    ],
    specialItems: ["Disobedient Servant of Kord (Thangrin's Sword)"],
    specialRules: ["Skurduk can only be harmed by the Disobedient Servant of Kord.", "Both doors open at the same time."],
  },
  {
    number: 8,
    level: 2,
    title: "Temple of Terror",
    story: "The rotting stink indicates a strong undead presence within the once-holy temple of Gallamet. The Heroes discover many Monsters, undead or otherwise, ready to destroy all the villages around the forest.",
    objective: "The Heroes must defeat all the Monsters in this foul place.",
    conclusion: "With great skill, the Heroes destroy the last of the Monsters. Yet as the last Monster dies, a portal appears and a terrible undead being laughs, 'You fools will never stop me from rising again!'",
    traps: [
      { name: "Web Trap", effect: "Hero misses next turn." },
      { name: "Poison Darts Trap", effect: "Roll — Hero loses that many Hit Points." },
      { name: "Evil Resurrection Trap", effect: "Last Monster killed reappears anywhere in its starting room." },
    ],
    specialRules: ["Heroes rise to Level 3 after completing this Adventure."],
  },
  {
    number: 9,
    level: 3,
    title: "Assault on Castle Borash",
    story: "The Heroes remember the Sheriff warning that the Keep of Shadows, in Castle Borash, is the home of the evil Lich, Lord Necratim. For many moons Necratim has been weak, but now he is feasting on the destruction his Monsters are causing. The Heroes must find Necratim and defeat him before his power grows too strong.",
    objective: "Defeat the 3 Wraiths to open the inner gate to the castle.",
    conclusion: "The Heroes stand victorious as the Wraiths fall, and the gate to the inner castle opens. Stepping inside, the gate slams shut behind them. Now the only way out lies ahead!",
    traps: [
      { name: "Curse of Heavy Burden", effect: "Movement of each Hero reduced to 1 space per action until Initiative changes." },
      { name: "Curse of Vulnerability", effect: "Each Hero's Armour Class reduced by 1 until Initiative changes." },
      { name: "Curse of the Hoards", effect: "All Monsters add 1 to their attack until Initiative changes." },
    ],
  },
  {
    number: 10,
    level: 3,
    title: "Spiral of Doom",
    story: "The Heroes find themselves in a small room, deep in the heart of the castle. They stumble across a journal from an unfortunate Hero long lost in the Keep. It mentions four lost magical Items that together could defeat Necratim.",
    objective: "Find and keep the four magical Items. If the Heroes fail but are still alive, restart the level with Items they currently possess.",
    conclusion: "The Heroes have become legends by winning this battle. As they find the fourth magical item, the doorway to Necratim's inner lair opens. A stone stairway leads down into deeper darkness…",
    traps: [
      { name: "Skeletal Arrows", effect: "Roll — Hero loses that many Hit Points." },
      { name: "Flagstone Slide", effect: "The floor drops away. Hero reappears anywhere in the grassed area." },
      { name: "Ghostly Hands", effect: "A chilling grip forces Hero to miss a turn." },
    ],
    specialItems: ["Entropic Shield", "Harbinger of Pain", "Dragon's Fury", "Flame Strike Spell"],
  },
  {
    number: 11,
    level: 3,
    title: "Necratim Ascendant",
    story: "The final confrontation with Lord Necratim, the Lich who has terrorised the land of Rallion. The Heroes must use the four legendary Items to destroy him once and for all.",
    objective: "Defeat the Lich Lord, Necratim.",
    conclusion: "As he is defeated, the other Monsters wither away. Congratulations! You have outfought Necratim and the people of Rallion thank you. Peace reigns again. Yet even as he falls, Necratim mutters a final curse. A portal opens behind him and he is sucked through! The portal slams shut, leaving a deathly silence…",
    traps: [
      { name: "Ghostly Hands", effect: "A chilling grip forces Hero to miss a turn." },
      { name: "Skeletal Arrows", effect: "Roll — Hero loses that many Hit Points." },
      { name: "Evil Resurrection Trap", effect: "Last Monster killed reappears anywhere in its starting room." },
    ],
    specialRules: ["Opening one door opens all other doors at the same time.", "Once all surviving Heroes are through a door, it locks behind them."],
  },
];
