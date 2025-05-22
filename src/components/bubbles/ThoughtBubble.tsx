"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

type Speed = Parameters<typeof TypeAnimation>[0]["speed"];

interface ThoughtBubbleProps {
  text: string;
  direction: "left" | "right";
  isTerminal?: boolean;
  speed?: Speed;
  delay?: number;
  onComplete?: () => void;
}

export function ThoughtBubble({
  text,
  direction,
  isTerminal = false,
  speed = 70,
  delay = 1000,
  onComplete = () => {},
}: ThoughtBubbleProps) {
  return (
    <motion.div
      className=""
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Main bubble */}
      <div
        className={`mx-auto bg-white rounded-3xl shadow-lg p-6 ${
          direction === "left" ? "mr-auto" : "ml-auto"
        }`}
      >
        <div
          className={`${
            isTerminal
              ? "bg-black text-green-400 p-4 rounded-lg font-mono"
              : "bg-gray-100 text-gray-800 p-4 rounded-lg"
          }`}
          style={isTerminal ? undefined : { fontFamily: "var(--font-roboto)" }}
        >
          {isTerminal && (
            <div className="flex items-center mb-2 border-b border-green-400/30 pb-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-xs ml-4 text-green-400/70">
                seeder@localhost:~
              </div>
            </div>
          )}

          <TypeAnimation
            sequence={[text, delay, onComplete]}
            wrapper="div"
            cursor={true}
            repeat={0}
            speed={speed}
          />
        </div>
      </div>

      {/* Thought bubbles trail */}
    </motion.div>
  );
}
