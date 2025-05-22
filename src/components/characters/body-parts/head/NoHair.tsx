import React from "react";
import { HumaaanBodyPartProps } from "../types";
import { ensureHexColor } from "../util";


const NoHair: React.FC<HumaaanBodyPartProps> = ({ skinColor = "#B28B67" }) => {
  const validSkinColor = ensureHexColor(skinColor);


  return (
    <g
      id="Head/Front/No-Hair"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
    >
      <g id="Head" transform="translate(54.000000, 31.000000)" fill={validSkinColor}>
        <path d="M8.26227388,34.4901268 C3.65436435,29.0813759 0.535634794,22.4528771 1.05677633,15.0254539 C2.55833022,-6.37502057 32.3485306,-1.66718886 38.1433414,9.13393292 C43.9381521,19.9350547 43.249578,47.3329958 35.7603014,49.2634576 C32.7735882,50.033323 26.4110012,48.1474609 19.935372,44.244306 L24,73 L0,73 L8.26227388,34.4901268 Z" />
      </g>
    </g>
  );
};

export default NoHair;
