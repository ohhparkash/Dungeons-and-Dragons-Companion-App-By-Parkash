// AI-generated dice face images matching the 2003 D&D Board Game dice

// Combat dice faces
import yellow_1sword from "@/assets/dice-faces/yellow_1sword.png";
import yellow_miss from "@/assets/dice-faces/yellow_miss.png";
import orange_1sword from "@/assets/dice-faces/orange_1sword.png";
import orange_2swords from "@/assets/dice-faces/orange_2swords.png";
import purple_2swords from "@/assets/dice-faces/purple_2swords.png";
import purple_3swords from "@/assets/dice-faces/purple_3swords.png";
import red_1sword from "@/assets/dice-faces/red_1sword.png";
import red_2swords from "@/assets/dice-faces/red_2swords.png";
import red_3swords from "@/assets/dice-faces/red_3swords.png";
import red_miss from "@/assets/dice-faces/red_miss.png";

// Special dice faces
import black_star_hit from "@/assets/dice-faces/black_star_hit.png";
import black_miss from "@/assets/dice-faces/black_miss.png";
import black_eye_hit from "@/assets/dice-faces/black_eye_hit.png";
import black_hand from "@/assets/dice-faces/black_hand.png";
import black_skull_hit from "@/assets/dice-faces/black_skull_hit.png";
import black_trap_defuse from "@/assets/dice-faces/black_trap_defuse.png";
import black_trap_explode from "@/assets/dice-faces/black_trap_explode.png";

// Mapping: dieId -> "type_value" or "type" -> image
export const DICE_FACE_IMAGES: Record<string, Record<string, string>> = {
  yellow: {
    melee_1: yellow_1sword,
    miss: yellow_miss,
  },
  orange: {
    melee_1: orange_1sword,
    melee_2: orange_2swords,
  },
  purple: {
    melee_2: purple_2swords,
    melee_3: purple_3swords,
  },
  red: {
    melee_1: red_1sword,
    melee_2: red_2swords,
    melee_3: red_3swords,
    miss: red_miss,
  },
  black_star: {
    star_1: black_star_hit,
    miss: black_miss,
  },
  black_eye: {
    eye_1: black_eye_hit,
    eye_2: black_eye_hit,
    hand_1: black_hand,
    miss: black_miss,
  },
  black_skull: {
    skull_1: black_skull_hit,
    skull_2: black_skull_hit,
    skull_3: black_skull_hit,
    miss: black_miss,
  },
  black_trap: {
    trap_defuse_1: black_trap_defuse,
    trap_explode: black_trap_explode,
  },
};

/** Get the image for a specific die face */
export function getDiceFaceImage(dieId: string, faceType: string, value?: number): string | null {
  const dieImages = DICE_FACE_IMAGES[dieId];
  if (!dieImages) return null;

  if (value !== undefined) {
    const key = `${faceType}_${value}`;
    if (dieImages[key]) return dieImages[key];
  }
  if (dieImages[faceType]) return dieImages[faceType];

  return null;
}
