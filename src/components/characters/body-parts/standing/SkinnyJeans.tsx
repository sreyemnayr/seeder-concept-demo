import React from "react";
import { HumaaanBodyPartProps } from "../types";
import { ensureHexColor } from "../util";
import { darken } from 'polished';

const SkinnyJeans: React.FC<HumaaanBodyPartProps> = ({ primaryColor = "#2F3676" }) => {
  const validPrimaryColor = ensureHexColor(primaryColor);
  const validPrimaryColorShaded = darken(0.06)(validPrimaryColor);

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
        fill={validPrimaryColorShaded}
        points="128 9.9475983e-14 164.254962 127.226909 190.706957 221 210 221 181.890974 9.9475983e-14"
      />
      <path
        d="M118.304342,0 C117.465768,65.5742244 114.606247,101.340188 113.725779,107.297892 C112.845311,113.255595 99.5321718,151.156298 73.7863613,221 L93.7726468,221 C126.549033,153.996902 144.845651,116.096199 148.662499,107.297892 C152.479348,98.4995844 164.258515,62.7336205 182,0 L118.304342,0 Z"
        id="Leg"
        fill={validPrimaryColor}
      />
      <g
        id="Accessories/Shoe/Flat-Pointy"
        transform="translate(72.000000, 199.000000)"
        fill={validPrimaryColorShaded}
      >
        <path
          d="M0,40 L1,19 L22,19 C31.9576033,26 44.9576033,31.6666667 61,36 L61,40 L23,40 L10,38 L10,40 L0,40 Z"
          id="Shoe"
        />
      </g>
      <g
        id="Accessories/Shoe/Flat-Pointy"
        transform="translate(188.000000, 199.000000)"
        fill={validPrimaryColorShaded}
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
