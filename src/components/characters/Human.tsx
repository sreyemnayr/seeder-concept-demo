"use client";

import { motion } from "framer-motion";
import { HumanCharacterProps } from "@/types/character";
import { HeadProps } from "@/types/head";
import { useMemo } from "react";
import dynamic from "next/dynamic";

const DEFAULT_WIDTH = 380;
const DEFAULT_SITTING_HEIGHT = 400;
const DEFAULT_STANDING_HEIGHT = 480;
const SITTING_HEIGHT_ADJUSTMENT = 24;
const STANDING_HEIGHT_ADJUSTMENT = 31;

// Available options for random selection
export const HEADS = [
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

export const TORSOS = [
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

export const SITTING_OUTFITS = [
  "BaggyPants",
  "SkinnyJeans",
  "SweatPants",
  "Wheelchair",
];

export const STANDING_OUTFITS = [
  "BaggyPants",
  "Jogging",
  "Shorts",
  "SkinnyJeans",
  "SkinnyJeansWalk",
  "Skirt",
  "Sprint",
  "SweatPants",
];

export const SKIN_TONES = [
  // Row 1 (Light to Dark)
  "#FFF4E0", // 255,244,224
  "#FFDED7", // 255,222,199
  "#FFD9B2", // 255,217,178
  "#FFCC99", // 255,204,153
  "#BC8260", // 188,130,96
  "#AB7457", // 171,116,87
  "#9C6A4F", // 156,106,79
  "#8B5E46", // 139,94,70

  // Row 2
  "#F4E0AF", // 244,224,175
  "#FFD9BC", // 255,217,188
  "#E7C3AB", // 231,195,171
  "#D7B78F", // 215,183,143
  "#805740", // 128,87,64
  "#9E755C", // 158,117,92
  "#916B55", // 145,107,85
  "#886550", // 136,101,80

  // Row 3
  "#EAB892", // 234,184,146
  "#DFAE8B", // 223,174,139
  "#DCAC89", // 220,172,137
  "#C69B7B", // 198,155,123
  "#7F5740", // 127,87,64
  "#7F4034", // 127,64,52
  "#7F4747", // 127,71,71
  "#863B08", // 134,59,8

  // Row 4 (Dark to Darkest)
  "#C29679", // 194,150,121
  "#CC8E69", // 204,142,105
  "#C38D74", // 195,141,116
  "#BC8D6E", // 188,141,110
  "#674634", // 103,70,52
  "#55372A", // 85,55,42
  "#482F23", // 72,47,35
  "#3D281E", // 61,40,30
];

export const HAIR_COLORS = [
  "#090806", // black
  "#2C222B", // dark brown
  "#71635A", // medium brown
  "#B7A69E", // light brown
  "#D4B97C", // blonde
  "#DCDCDC", // grey
];

export const CLOTHING_COLORS = [
  "#2D3748", // slate
  "#4A5568", // grey
  "#2B6CB0", // blue
  "#2F855A", // green
  "#9B2C2C", // red
  "#744210", // brown
];

interface BodyPartProps {
  skinColor?: string;
  hairColor?: string;
  clothingColor?: string;
  accessoryColor?: string;
}

// Helper function to get random array item
function getRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

// Generate random style
const generateRandomStyle = () => ({
  hairColor: getRandomItem(HAIR_COLORS),
  skinColor: getRandomItem(SKIN_TONES),
  clothingColor: getRandomItem(CLOTHING_COLORS),
  accessoryColor: getRandomItem(CLOTHING_COLORS),
});

// Dynamic imports for body parts
const importHead = (type: string) =>
  dynamic<HeadProps>(() => import(`./body-parts/head/${type}.tsx`), {
    loading: () => <g />,
  });

const importTorso = (type: string) =>
  dynamic<BodyPartProps>(() => import(`./body-parts/torso/${type}.tsx`), {
    loading: () => <g />,
  });

const importBottom = (type: string, posture: "sitting" | "standing") =>
  dynamic<BodyPartProps>(() => import(`./body-parts/${posture}/${type}.tsx`), {
    loading: () => <g />,
  });

export function Human({
  isActive = false,
  position,
  style,
  head,
  posture,
  outfit,
  torso,
  flip = false,
  name,
  role,
}: HumanCharacterProps) {
  // Generate random values for undefined props
  posture = posture ?? "standing";
  const randomStyle = useMemo(() => generateRandomStyle(), []);
  const randomHead = useMemo(() => getRandomItem(HEADS), []);
  const randomTorso = useMemo(() => getRandomItem(TORSOS), []);
  const randomOutfit = useMemo(
    () =>
      getRandomItem(posture === "sitting" ? SITTING_OUTFITS : STANDING_OUTFITS),
    [posture]
  );

  const mergedStyle = useMemo(
    () => ({
      ...randomStyle,
      ...style,
    }),
    [randomStyle, style]
  );

  const Head = useMemo(
    () => importHead(head ?? randomHead),
    [head, randomHead]
  );
  const Torso = useMemo(
    () => importTorso(torso ?? randomTorso),
    [torso, randomTorso]
  );
  const Bottom = useMemo(
    () => importBottom(outfit ?? randomOutfit, posture),
    [outfit, randomOutfit, posture]
  );

  return (
    <motion.div
      className={`absolute ${
        position === "left" ? "left-16" : "right-16"
      } bottom-32 flex flex-col items-center transition-all duration-300`}
      style={{
        opacity: isActive ? 1 : 0.1,
        transform: `scale(${
          flip ? -1 * (isActive ? 1.5 : 1) : 1 * (isActive ? 1.5 : 1)
        }, ${isActive ? 1.5 : 1})`,
      }}
    >
      {/* SVG Container */}
      <div
        style={{
          width: DEFAULT_WIDTH,
          height:
            posture === "sitting"
              ? DEFAULT_SITTING_HEIGHT + SITTING_HEIGHT_ADJUSTMENT
              : DEFAULT_STANDING_HEIGHT + STANDING_HEIGHT_ADJUSTMENT,
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${DEFAULT_WIDTH} ${
            posture === "sitting"
              ? DEFAULT_SITTING_HEIGHT
              : DEFAULT_STANDING_HEIGHT
          }`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="humaaans" fillRule="evenodd" strokeWidth="1">
            <g
              id="character"
              transform={`translate(0, ${
                posture === "sitting"
                  ? SITTING_HEIGHT_ADJUSTMENT
                  : STANDING_HEIGHT_ADJUSTMENT
              })`}
            >
              <g id="HEAD" transform="translate(82, 0)">
                <Head
                  skinColor={mergedStyle.skinColor}
                  hairColor={mergedStyle.hairColor}
                  accessoryColor={mergedStyle.accessoryColor}
                />
              </g>

              <g id="BOTTOM" transform="translate(0, 187)">
                <Bottom
                  clothingColor={mergedStyle.clothingColor}
                  hairColor={mergedStyle.hairColor}
                  skinColor={mergedStyle.skinColor}
                />
              </g>
              <g id="TORSO" transform="translate(22, 82)">
                <Torso
                  clothingColor={mergedStyle.clothingColor}
                  skinColor={mergedStyle.skinColor}
                  accessoryColor={mergedStyle.accessoryColor}
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
      {/* Character Label */}
      <div
        className="mb-4 px-3 py-1.5 text-[3em]"
        style={{ transform: `scale(${flip ? -1 : 1}, 1)` }} // Unflip the text
      >
        <div className="text-center">
          <div className="font-medium text-gray-900">{name}</div>
          {role && (
            <div className="text-[0.6em] text-gray-400 first-letter:uppercase -mt-4">
              {role}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
