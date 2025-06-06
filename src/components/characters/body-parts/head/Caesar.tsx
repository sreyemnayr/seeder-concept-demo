import React from "react";
import { HumaaanBodyPartProps } from "../types";
import { ensureHexColor } from "../util";


const Caesar: React.FC<HumaaanBodyPartProps> = ({ skinColor = "#B28B67", primaryColor = "#191847" }) => {
  const validSkinColor = ensureHexColor(skinColor);
  const validPrimaryColor = ensureHexColor(primaryColor);


  return (
    <g
      id="Head/Front/Caesar"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
    >
      <g id="Head" transform="translate(54.000000, 31.000000)" fill={validSkinColor}>
        <path d="M8.26227388,34.4901268 C3.65436435,29.0813759 0.535634794,22.4528771 1.05677633,15.0254539 C2.55833022,-6.37502057 32.3485306,-1.66718886 38.1433414,9.13393292 C43.9381521,19.9350547 43.249578,47.3329958 35.7603014,49.2634576 C32.7735882,50.033323 26.4110012,48.1474609 19.935372,44.244306 L24,73 L0,73 L8.26227388,34.4901268 Z" />
      </g>
      <path
        d="M69.729818,53.8670262 C68.9449555,53.3276287 68.0072604,53 67,53 C64.2385763,53 62,55.4624339 62,58 C62,60.6398741 63.246606,62.6810346 65.026826,63.5469713 C64.0760216,65.4058954 63.1199761,66.7549721 62,67 C57.6781395,66.5628085 52,55.8205201 52,47 C52,37.3455086 59.6819829,29 74,29 C86.8690713,29 91.7485692,34.3062174 92,39 C86.4853531,40.5156046 76.8492499,41.0992165 63,41 L63,42 L75,43 L77,49 C73.8180725,48.7624609 71.5442799,50.9449742 69.729818,53.8670262 Z"
        id="Combined-Shape"
        fill={validPrimaryColor}
      />
    </g>
  );
};

export default Caesar;
