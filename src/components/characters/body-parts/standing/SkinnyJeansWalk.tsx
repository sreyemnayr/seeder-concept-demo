import React from "react";
import { HumaaanBodyPartProps } from "../types";
import { ensureHexColor } from "../util";
import { darken } from 'polished';

const SkinnyJeansWalk: React.FC<HumaaanBodyPartProps> = ({ primaryColor = "#2B44FF", secondaryColor = "#191847" }) => {
  const validPrimaryColor = ensureHexColor(primaryColor);
  const validSecondaryColor = ensureHexColor(secondaryColor);
  const validPrimaryColorShaded = darken(0.06)(validPrimaryColor);

  return (
    <g
      id="Bottom/Standing/Skinny-Jeans-Walk"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
    >
      <polygon
        id="Leg"
        fill={validPrimaryColorShaded}
        points="128 0 176.081639 127.226909 209.783329 221 229 221 182.673688 9.81437154e-14"
      />
      <path
        d="M116.116628,0 C115.593979,43.6541888 115.971833,102.427468 114.754071,105.148648 C113.942229,106.962768 88.6908725,127.632305 39,167.157257 L48.9049803,184 C107.899481,145.955797 138.9048,124.399339 141.920937,119.330628 C146.445143,111.72756 169.1744,41.763137 181,0 L116.116628,0 Z"
        id="Leg"
        fill={validPrimaryColor}
      />
      <g
        id="Accessories/Shoe/Flat-Pointy"
        transform="translate(56.500000, 189.000000) rotate(50.000000) translate(-56.500000, -189.000000) translate(26.000000, 169.000000)"
        fill={validSecondaryColor}
      >
        <path
          d="M0,40 L1,19 L22,19 C31.9576033,26 44.9576033,31.6666667 61,36 L61,40 L23,40 L10,38 L10,40 L0,40 Z"
          id="Shoe"
        />
      </g>
      <g
        id="Accessories/Shoe/Flat-Pointy"
        transform="translate(208.000000, 199.000000)"
        fill={validSecondaryColor}
      >
        <path
          d="M0,40 L1,19 L22,19 C31.9576033,26 44.9576033,31.6666667 61,36 L61,40 L23,40 L10,38 L10,40 L0,40 Z"
          id="Shoe"
        />
      </g>
    </g>
  );
};

export default SkinnyJeansWalk;
