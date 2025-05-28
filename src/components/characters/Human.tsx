"use client";

import { motion } from "framer-motion";
import { HumanCharacterProps } from "@/types/character";
import { HumaaanBodyPartProps } from "./body-parts/types";
import { useMemo } from "react";
import { useIsLandscape } from "@/hooks/useMediaQuery";
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
  "#3B2F2F", // Dark Brown
  "#7B3F00", // Chestnut
  "#6B5E5E", // Medium Ash Brown
  "#F9D78C", // Golden Blonde
  "#F3F3F3", // Platinum Blonde
  "#0A0A0A", // Jet Black
  "#2C2C2C", // Soft Black
  "#8B3A3A", // Auburn
  "#580F41", // Burgundy
  "#D6A77A", // Rose Gold
  "#C0C0C0", // Silver Gray
  "#B497BD", // Lilac
  "#1B264F", // Deep Blue
  "#B55239", // Copper
  "#6B8E23", // Olive Green
];

export const CLOTHING_COLORS = [
  "#3A1730", // deep plum
  "#0A1533", // navy night
  "#062314", // forest green
  "#242C11", // olive moss
  "#49230E", // dark rust
  "#8D2E16", // brick red
  "#8F3B1A", // burnt sienna
  "#652930", // wine
  "#8F5B54", // rosewood
  "#92778A", // muted mauve
  "#E0DAA4", // wheat
  "#F1EFDD", // cream
  "#160835", // indigo
  "#696969", // gray
  "#960018", // crimson
  "#744210", // brown
];

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
  seatColor: getRandomItem(CLOTHING_COLORS),
});

// Dynamic imports for body parts
const importHead = (type: string) =>
  dynamic<HumaaanBodyPartProps>(() => import(`./body-parts/head/${type}.tsx`), {
    loading: () => <g />,
  });

const importTorso = (type: string) =>
  dynamic<HumaaanBodyPartProps>(
    () => import(`./body-parts/torso/${type}.tsx`),
    {
      loading: () => <g />,
    }
  );

const importBottom = (type: string, posture: "sitting" | "standing") =>
  dynamic<HumaaanBodyPartProps>(
    () => import(`./body-parts/${posture}/${type}.tsx`),
    {
      loading: () => <g />,
    }
  );

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
  const landscape = useIsLandscape();
  // Generate random values for undefined props
  posture = useMemo(
    () => posture ?? getRandomItem(["standing", "sitting"]),
    [posture]
  );
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
        position === "left" ? "left-0" : "right-0"
      } bottom-0 w-1/3 h-full transition-all duration-300`}
      style={{
        opacity: isActive ? 1 : 0.1,
        transform: `scale(${
          flip ? -1 * (isActive ? 1 : 0.8) : 1 * (isActive ? 1 : 0.8)
        }, ${isActive ? 1 : 0.9})`,
      }}
    >
      {/* SVG Container */}
      <div
        className={`absolute ${
          position === "left" ? "left-6" : "right-6"
        } h-[80vh] ${
          landscape
            ? "top-1/2 -translate-y-1/2"
            : position === "left"
            ? "top-0 translate-y-1/2"
            : "top-0 translate-y-1/2"
          //: "bottom-0 -translate-y-1/2"
        } `}
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
                  key={`head-${head}-${posture}`}
                  skinColor={mergedStyle.skinColor}
                  primaryColor={mergedStyle.hairColor}
                  secondaryColor={mergedStyle.accessoryColor}
                />
              </g>

              <g id="BOTTOM" transform="translate(0, 187)">
                <Bottom
                  key={`bottom-${outfit}-${posture}`}
                  primaryColor={mergedStyle.accessoryColor}
                  secondaryColor={mergedStyle.clothingColor}
                  skinColor={mergedStyle.skinColor}
                  tertiaryColor={mergedStyle.seatColor}
                />
              </g>
              <g id="TORSO" transform="translate(22, 82)">
                <Torso
                  key={`torso-${torso}-${posture}`}
                  primaryColor={mergedStyle.clothingColor}
                  secondaryColor={mergedStyle.accessoryColor}
                  skinColor={mergedStyle.skinColor}
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
      {/* Character Label */}
      <div
        className={`absolute left-1/8 bottom-0 flex flex-row items-center text-[1.5rem]  `}
        style={{
          transform: `scale(${
            flip ? -1 * (isActive ? 1 : 0.8) : 1 * (isActive ? 1 : 0.8)
          }, ${isActive ? 1 : 0.8})`,
        }}
      >
        <div className="font-medium text-gray-900">{name}</div>
        {role && (
          <div className="text-[0.8rem] text-gray-400 mt-2 ml-1">({role})</div>
        )}
      </div>
    </motion.div>
  );
}
