import React from "react";
import { HumaaanBodyPartProps } from "../types";
import { ensureHexColor } from "../util";


const Short: React.FC<HumaaanBodyPartProps> = ({ skinColor = "#B28B67", primaryColor = "#191847" }) => {
  const validSkinColor = ensureHexColor(skinColor);
  const validPrimaryColor = ensureHexColor(primaryColor);


  return (
    <g
      id="Head/Front/Short-1"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
    >
      <g id="Head" transform="translate(54.000000, 31.000000)" fill={validSkinColor}>
        <path d="M8.26227388,34.4901268 C3.65436435,29.0813759 0.535634794,22.4528771 1.05677633,15.0254539 C2.55833022,-6.37502057 32.3485306,-1.66718886 38.1433414,9.13393292 C43.9381521,19.9350547 43.249578,47.3329958 35.7603014,49.2634576 C32.7735882,50.033323 26.4110012,48.1474609 19.935372,44.244306 L24,73 L0,73 L8.26227388,34.4901268 Z" />
      </g>
      <path
        d="M81.5586899,41.7004095 C78.3018196,43.5222215 75.9840093,46.9359598 73.1939275,51.4137701 C72.5143905,51.14668 71.7743247,51 71,51 C67.6862915,51 65,53.6862915 65,57 C65,58.6822183 65.6922919,60.2027431 66.807515,61.292214 C65.4191964,63.2518162 63.8632894,65.2988831 62.0803863,67.4111902 C55.4270381,63.419452 50.4784394,51.7854049 56.8311103,40.554248 C62.2968954,18.0574265 93.2683534,32.0209586 99.2270045,28.2267775 C100.529452,36.3904854 96.3284471,42.9730591 81.5586899,41.7004095 Z"
        id="Hair"
        fill={validPrimaryColor}
      />
    </g>
  );
};

export default Short;
