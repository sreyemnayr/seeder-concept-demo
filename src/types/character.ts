export type CharacterType = "human" | "ai";
export type CharacterRole = "volunteer" | "organizer" | "agent";

export interface CharacterStyle {
  hairColor?: string;
  skinColor?: string;
  clothingColor?: string;
  accessoryColor?: string;
}

export interface CharacterAppearance {
  head?: string;
  torso?: string;
  outfit?: string;
  posture?: "sitting" | "standing";
  style?: CharacterStyle;
}

export interface Character {
  type: CharacterType;
  role: CharacterRole;
  name: string;
  appearance?: CharacterAppearance;
  isActive?: boolean;
  position?: "left" | "right";
}

/*

const HEADS = [
  "Afro",
  "Airy",
  "Caesar",
  "Chongo",
  "Curly",
  "Hijab",
  "Hijab2",
  "Long",
  "NoHair",
  "Pony",
  "Rad",
  "Short",
  "Short2",
  "ShortBeard",
  "Top",
  "Turban",
  "Turban2",
  "Wavy",
];
const TORSOS = [
  "Hoodie",
  "Jacket",
  "Jacket2",
  "LabCoat",
  "LongSleeve",
  "PointingForward",
  "PointingUp",
  "Pregnant",
  "TrenchCoat",
  "TurtleNeck",
];
const SITTING_OUTFITS = [
  "BaggyPants",
  "SkinnyJeans",
  "SweatPants",
  "Wheelchair",
];
const STANDING_OUTFITS = [
  "BaggyPants",
  "Jogging",
  "Shorts",
  "SkinnyJeans",
  "SkinnyJeansWalk",
  "Skirt",
  "Sprint",
  "SweatPants",
];
*/

export interface HumanCharacterProps {
  isActive?: boolean;
  position?: "left" | "right";
  style?: {
    skinColor?: string;
    hairColor?: string;
    clothingColor?: string;
    accessoryColor?: string;
  };
  head?: string;
  posture?: "sitting" | "standing";
  outfit?: string;
  torso?: string;
  flip?: boolean;
  name?: string;
  role?: string;
}

export interface AICharacterProps extends Character {
  type: "ai";
  variant?: "tree" | "abstract" | "geometric";
  complexity?: "simple" | "detailed";
  animation?: "pulse" | "glow" | "wave";
}
