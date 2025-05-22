import React from "react";
import { HumaaanBodyPartProps } from "../types";
import { ensureHexColor } from "../util";
import { darken } from 'polished';

const SweatPants: React.FC<HumaaanBodyPartProps> = ({ skinColor = "#B28B67", primaryColor = "#89C5CC", secondaryColor = "#191847" }) => {
  const validSkinColor = ensureHexColor(skinColor);
  const validPrimaryColor = ensureHexColor(primaryColor);
  const validSecondaryColor = ensureHexColor(secondaryColor);
  const validSkinColorShaded = darken(0.06)(validSkinColor);
  const validPrimaryColorShaded = darken(0.06)(validPrimaryColor);

  return (
    <g
      id="Bottom/Standing/Sweatpants"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
    >
      <polygon
        id="Leg"
        fill={validSkinColorShaded}
        points="128 9.9475983e-14 164.630838 126.226909 181.860154 221 199.153197 221 181.890974 9.9475983e-14"
      />
      <path
        d="M111.537727,0 C114.093705,65.5742244 113.085665,101.340188 112.513606,107.297892 C111.941548,113.255595 108.69393,153.156298 86.5636874,223 L104.549973,223 C133.85784,155.996902 144.088936,116.096199 147.450326,107.297892 C150.811717,98.4995844 160.739403,62.7336205 175.233385,0 L111.537727,0 Z"
        id="Leg"
        fill={validSkinColor}
      />
      <path
        d="M127.213639,1.13686838e-13 C136.741891,43.4350253 153.221683,112.768359 176.653017,208 L201.946059,208 C203.814239,110.253828 195.86709,45.9204947 182.104613,1.13686838e-13 L127.213639,1.13686838e-13 Z"
        id="Pant"
        fill={validPrimaryColorShaded}
      />
      <path
        d="M111.409919,0 C113.913164,65.5742244 107.425844,130.177256 87.3305078,209.020958 L114.316793,209.020958 C143.678541,143.017859 164.723052,78.7336205 179.105577,0 L111.409919,0 Z"
        id="Pant"
        fill={validPrimaryColor}
      />
      <g
        id="Accessories/Shoe/Flat-Simple"
        transform="translate(84.000000, 199.000000)"
        fill={validSecondaryColor}
      >
        <path
          d="M0,37 L0.99242267,21 C6.8029179,22.6994251 14.0806841,22.0327584 22.8257214,19 C32.2287535,25.660617 44.0659431,30.2086712 58.3372903,32.6441626 L58.3372863,32.6441862 C59.4261013,32.829999 60.1581292,33.8632891 59.9723163,34.9521041 C59.9602834,35.0226139 59.9444765,35.0924273 59.9249637,35.1612435 L58.5529375,40 L22.8257214,40 L1.98484534,40 L0,37 Z"
          id="Shoe"
        />
      </g>
      <g
        id="Accessories/Shoe/Flat-Simple"
        transform="translate(178.000000, 199.000000)"
        fill={validSecondaryColor}
      >
        <path
          d="M0,37 L0.99242267,21 C6.8029179,22.6994251 14.0806841,22.0327584 22.8257214,19 C32.2287535,25.660617 44.0659431,30.2086712 58.3372903,32.6441626 L58.3372863,32.6441862 C59.4261013,32.829999 60.1581292,33.8632891 59.9723163,34.9521041 C59.9602834,35.0226139 59.9444765,35.0924273 59.9249637,35.1612435 L58.5529375,40 L22.8257214,40 L1.98484534,40 L0,37 Z"
          id="Shoe"
        />
      </g>
    </g>
  );
};

export default SweatPants;
