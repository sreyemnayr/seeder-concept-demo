import React from "react";
import { darken } from "polished";

const ensureHexColor = (color: string) => {
  // If color is already a valid hex color, return it
  if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
    return color;
  }
  // Otherwise, return a default color
  console.warn(`Invalid color format: ${color}. Using default color.`);
  return "#000000";
};

interface BaseBodyPartProps {
  hairColor?: string;
}

interface BottomProps extends BaseBodyPartProps {
  clothingColor?: string;
}

const SkinnyJeans: React.FC<BottomProps> = ({ clothingColor = "#7331FF", hairColor = "#191847" }) => {
  const validClothingColor = ensureHexColor(clothingColor);
  const validHairColor = ensureHexColor(hairColor);


  return (
    <g
      id="Bottom/Standing/Skinny-Jeans"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
    >
      <polygon
        id="Leg"
        fill={validHairColor}
        points="128 9.9475983e-14 164.254962 127.226909 190.706957 221 210 221 181.890974 9.9475983e-14"
      />
      <path
        d="M118.304342,0 C117.465768,65.5742244 114.606247,101.340188 113.725779,107.297892 C112.845311,113.255595 99.5321718,151.156298 73.7863613,221 L93.7726468,221 C126.549033,153.996902 144.845651,116.096199 148.662499,107.297892 C152.479348,98.4995844 164.258515,62.7336205 182,0 L118.304342,0 Z"
        id="Leg"
        fill={validClothingColor}
      />
      <g
        id="Accessories/Shoe/Flat-Pointy"
        transform="translate(72.000000, 199.000000)"
        fill={validHairColor}
      >
        <path
          d="M0,40 L1,19 L22,19 C31.9576033,26 44.9576033,31.6666667 61,36 L61,40 L23,40 L10,38 L10,40 L0,40 Z"
          id="Shoe"
        />
      </g>
      <g
        id="Accessories/Shoe/Flat-Pointy"
        transform="translate(188.000000, 199.000000)"
        fill={validHairColor}
      >
        <path
          d="M0,40 L1,19 L22,19 C31.9576033,26 44.9576033,31.6666667 61,36 L61,40 L23,40 L10,38 L10,40 L0,40 Z"
          id="Shoe"
        />
      </g>
    </g>
  );
};

export default SkinnyJeans;
