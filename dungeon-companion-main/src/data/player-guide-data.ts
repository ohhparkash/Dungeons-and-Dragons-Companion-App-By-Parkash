// Player's Guide data extracted from the 2003 D&D Board Game Player's Guide PDF

export interface Hero {
  name: string;
  fullTitle: string;
  race: string;
  class: string;
  description: string;
  specialActions: string[];
  basicItems: { level1: string[]; level2: string[]; level3: string[] };
  stats: {
    hitPoints: { level1: number; level2: number; level3: number };
    spellPoints?: { level1: number; level2: number; level3: number };
    movement: number;
    armorClass: { level1: number; level2: number; level3: number };
    maxItems: number;
  };
}

export const playerIntro = {
  title: "The Heroes of Rallion",
  description:
    "Four Heroes have banded together to defeat the evil forces at work in the Dungeon. Many challenges lie ahead and the creatures there are vile and dangerous. But the four are among the few who have the skill and bravery to succeed.",
  details:
    "The Heroes are battling to complete the Objective in eleven increasingly-difficult Adventures. They may find Items to help them in chests along the way. For the Heroes to win, they must work together to defeat the Dungeon Master, who is trying to destroy them.",
};

export const heroes: Hero[] = [
  {
    name: "Regdar",
    fullTitle: "Regdar the Fighter",
    race: "Human",
    class: "Fighter",
    description:
      "A mighty Human Fighter, Regdar is strong and powerful in battle. He has no magical abilities but makes up for it with raw physical strength and heavy armour. Regdar is the front-line warrior of the party.",
    specialActions: [],
    basicItems: {
      level1: ["Single-handed Broadsword"],
      level2: ["Double-handed Broadsword"],
      level3: ["Greatsword"],
    },
    stats: {
      hitPoints: { level1: 6, level2: 8, level3: 10 },
      movement: 4,
      armorClass: { level1: 4, level2: 5, level3: 6 },
      maxItems: 4,
    },
  },
  {
    name: "Jozan",
    fullTitle: "Jozan the Cleric",
    race: "Human",
    class: "Cleric",
    description:
      "Using his skills as a Cleric, Jozan has the power to 'turn' undead Monsters, which are indicated by a skull on the left-hand side of the Monster card. He is also a magic user, specialising in healing. Jozan must carry the Greater Restoration Spell at the start of each Adventure.",
    specialActions: ["Turn Undead", "Heal Wounds"],
    basicItems: {
      level1: ["Restoration Spell"],
      level2: ["Greater Restoration", "Mace of Faith"],
      level3: ["Greater Restoration", "Sacred Crossbow"],
    },
    stats: {
      hitPoints: { level1: 5, level2: 7, level3: 9 },
      spellPoints: { level1: 4, level2: 6, level3: 8 },
      movement: 4,
      armorClass: { level1: 3, level2: 4, level3: 5 },
      maxItems: 4,
    },
  },
  {
    name: "Mialee",
    fullTitle: "Mialee the Wizard",
    race: "Elf",
    class: "Wizard",
    description:
      "An Elven Wizard, Mialee knows how to use magic to her advantage. She is capable of the most powerful attacks of all the Heroes. However, she needs magic for her protection too, so use her spells wisely.",
    specialActions: [],
    basicItems: {
      level1: ["Magic Missile", "Shortbow of the Ancients"],
      level2: ["Burning Hands Spell", "Blessed Bow of the Elven Lords"],
      level3: ["Fireball Spell", "Longbow of the Elven Lords"],
    },
    stats: {
      hitPoints: { level1: 4, level2: 6, level3: 8 },
      spellPoints: { level1: 6, level2: 8, level3: 10 },
      movement: 4,
      armorClass: { level1: 2, level2: 3, level3: 4 },
      maxItems: 4,
    },
  },
  {
    name: "Lidda",
    fullTitle: "Lidda the Rogue",
    race: "Halfling",
    class: "Rogue",
    description:
      "Lidda is a Halfling Rogue, short on physical strength, but powerful at using sneak attacks and able to disable traps. A useful ally! When Lidda disables a trap, take an unused Trap token. Gathering 3 tokens gives Lidda 2 extra Hit Points.",
    specialActions: ["Sneak", "Search for Traps", "Disable Traps"],
    basicItems: {
      level1: ["Yondalla's Amulet", "Balanced Throwing Dagger"],
      level2: ["Yondalla's Amulet", "Poisoned Blowpipe"],
      level3: ["Yondalla's Amulet", "Relentless Bolas"],
    },
    stats: {
      hitPoints: { level1: 4, level2: 6, level3: 8 },
      movement: 5,
      armorClass: { level1: 3, level2: 4, level3: 5 },
      maxItems: 4,
    },
  },
];

export const playerRules = {
  choosingRole:
    "The game requires between two and five players. One must play the Dungeon Master, who controls the Adventure boards and the Monsters. Everyone else represents a Hero. If you do not have enough players for each Hero, one person should play more than one Hero. There must always be a Dungeon Master and four Heroes being played.",
  heroCards: {
    hitPoints:
      "Your Hero has a certain amount of stamina, shown by Hit Points. They can be lost in combat and may be regained through Items or Spells. You can never go above your Hero's original number of Hit Points for each level.",
    armorClass:
      "Both Heroes and Monsters have an Armour Class (AC) rating, which helps protect them from damage.",
    spellPoints:
      "Some Heroes are magic users. They have a Spell Point counter. The maximum number of Spell Points is indicated for each level.",
    items:
      "Items you are carrying should be placed beside your Hero card. The maximum number of Items that can be carried is shown. Items on the left-hand side are 'in use'. Extra Items go in your 'knapsack'. Potions count as an Item but can be drunk from your knapsack at any time without using an action.",
  },
  beginningTheQuest:
    "Each Adventure has a level (1, 2 or 3). Set your Hit Point and Spell Point counters to the appropriate level at the start of each Adventure.",
  initiativeCards:
    "The order of play is decided by Initiative cards numbered 1 to 5. Every time a Hero opens a new door, the order changes. The Heroes shuffle and deal cards face down, one to each character including the DM. Turn them over only when the DM has finished laying out the room.",
  actions: {
    description: "Each Hero may take 2 Actions on each turn. You can choose to take 1 or no Actions if you wish.",
    list: [
      { name: "Movement", detail: "Move up to your max spaces horizontally or vertically (not diagonally). Cannot pass through walls, pillars, trees, chests or closed doors. Cannot end on an occupied space. Heroes can pass through other Heroes but not through Monsters." },
      { name: "Opening a Door", detail: "Move next to a door and say 'Open'. Turn the token over and deal Initiative cards. Some doors are locked and require a Skeleton Key." },
      { name: "Opening a Chest", detail: "Move onto the Chest token and use an action to open it. Draw from the Item deck unless it contains a Special Item. Remove the Chest token afterwards." },
      { name: "Combat", detail: "Attack a Monster with a weapon or spell. See Combat rules." },
      { name: "Changing an Item", detail: "Swap one 'in use' Item with one from your Knapsack. You may also trade with a Hero standing next to you." },
    ],
  },
  specialActions: [
    { name: "Casting a Spell", detail: "A magic-using Hero can cast spells. The spell must be 'in use' and you must have enough Spell Points. The cost is shown on the Item card.", heroes: ["Jozan", "Mialee"] },
    { name: "Searching for Traps", detail: "Some Heroes can check a room for Traps by rolling the 'Search' die. Results only apply to the room you are in.", heroes: ["Lidda"] },
    { name: "Disabling Traps", detail: "Stand on the trap and roll the 'Disable Trap' die. If you roll the disable symbol, the trap is disabled.", heroes: ["Lidda"] },
    { name: "Turning Undead", detail: "Attempt to 'turn' Undead Monsters anywhere in the same room by rolling the 'Turn Undead' die. When you roll equal to or greater than the skull number on the Monster's card, that Monster misses its next turn.", heroes: ["Jozan"] },
    { name: "Healing", detail: "Some Heroes can heal other Heroes standing next to them. This is shown on their Hero card.", heroes: ["Jozan"] },
    { name: "Sneak", detail: "During movement, a Hero capable of Sneak can move through a Monster. This does not count as another action. If they attack the same Monster afterwards on the same turn, add 1 to the attack.", heroes: ["Lidda"] },
  ],
  combat: {
    description: "Combat involves attacking a Monster with a weapon or a spell.",
    steps: [
      "Say aloud who you are attacking and with which weapon or spell.",
      "Roll the dice, as shown on the matching card.",
      "Calculate the damage of the attack.",
      "Adjust Hit Points and Spell Points on Character and Monster cards.",
    ],
    attackTypes:
      "Melée attacks are close combat attacks used when standing next to an opponent (not diagonally). Ranged attacks can be used over greater distances or diagonally. Ranged weapons fire single shots in a straight line — the centre of the opponent's square must be in clear sight.",
    damage:
      "Attack strength is shown by the total number of swords you roll. Subtract the target's Armour Class from the total swords rolled to get the damage dealt.",
    powerAttack:
      "Some weapons have a Power Attack — a more powerful but riskier attack. Roll the Power Attack dice and the special die instead of normal attack. If the special symbol is rolled, the weapon is lost.",
    reRoll: "Some Items allow you to roll one of the dice again.",
  },
  deadHeroes:
    "If a Hero dies, put their token on the board where they died and remove their figure. If brought back to life by another Hero, they return to the same space. All Heroes completely recover before the next Adventure. Dead Heroes lose all collected Items but return with basic Items for the appropriate level.",
  continuingPlay: {
    heroesWin: "The Heroes win when at least one Hero completes the Objective as described by the Dungeon Master.",
    dmWins: "The Dungeon Master wins when the Adventure Objective can no longer be completed.",
    afterAdventure: "As soon as the Heroes complete the Objective, that Adventure ends. Items still in Heroes' possession can be distributed before starting the next Adventure. Skeleton keys must be discarded.",
  },
};
