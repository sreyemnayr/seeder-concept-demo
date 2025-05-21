import { TypeAnimation } from "react-type-animation";

type Speed = Parameters<typeof TypeAnimation>[0]["speed"];
type Sequence = Parameters<typeof TypeAnimation>[0]["sequence"];
type SequenceElement = Parameters<typeof TypeAnimation>[0]["sequence"][number];

export const totalDuration = (sequence: Sequence, speed: Speed) => {
  const validSpeed = (speed ?? 70) as number;
  return sequence.reduce((acc: number, item: SequenceElement) => {
    if (typeof item === "string") {
      return acc + item.length * (1000 / validSpeed);
    } else if (typeof item === "number") {
      return acc + item;
    } else {
      return acc;
    }
  }, 1000);
};
