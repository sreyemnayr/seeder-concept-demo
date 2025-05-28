"use client";

import { useIsLandscape } from "@/hooks/useMediaQuery";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { ChatMessage } from "@/types";

type Speed = Parameters<typeof TypeAnimation>[0]["speed"];

interface ChatBubbleProps {
  messages: ChatMessage[];
  speed?: Speed;
  delay?: number;
  onComplete?: () => void;
}

export function ChatBubble({
  messages,
  speed = 70,
  delay = 1000,
  onComplete = () => {},
}: ChatBubbleProps) {
  const landscape = useIsLandscape();
  return (
    <motion.div
      className={`absolute left-1/2 transform -translate-x-1/2  bg-white rounded-lg shadow-lg p-4 ${
        landscape
          ? "w-1/2 -translate-y-1/2 top-1/2"
          : "w-full top-0 -translate-y-3/4"
      }`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Mobile phone frame */}
      <div className="border-4 border-gray-800 rounded-3xl p-2 bg-gray-100">
        {/* Message app header */}
        <div className="bg-gray-200 rounded-t-xl p-2 mb-2">
          <div className="w-20 h-2 bg-gray-400 rounded" />
        </div>

        {/* Message content */}
        <div
          className={`relative overflow-hidden w-full ${
            landscape ? " h-[38vw] max-h-[70vh]" : "w-full h-[50vh]"
          }`}
        >
          <div className="absolute bottom-0 left-0 right-0">
            <div className="flex flex-col space-y-2">
              {messages.map((message, index) => {
                const newSpeaker =
                  index === 0 ||
                  message.character !== messages[index - 1].character;
                return (
                  <div
                    key={index}
                    className={`flex ${
                      message.direction === "left"
                        ? "justify-start"
                        : "justify-end"
                    }`}
                  >
                    <div
                      className={`flex flex-col ${
                        message.direction === "left"
                          ? "items-start"
                          : "items-end"
                      }`}
                    >
                      {newSpeaker && (
                        <div className="text-xs text-gray-300 mb-1 mx-1">
                          {message.character ?? "Name"}
                        </div>
                      )}
                      <div
                        className={`relative max-w-md px-4 py-2 rounded-lg ${
                          message.direction === "left"
                            ? "bg-gray-200 text-gray-800"
                            : "bg-blue-500 text-white"
                        } ${landscape ? "text-2xl" : ""}`}
                        style={{ fontFamily: "var(--font-roboto)" }}
                      >
                        {message.isNew ? (
                          <TypeAnimation
                            sequence={[message.text, delay, onComplete]}
                            wrapper="span"
                            cursor={message.isNew}
                            repeat={0}
                            speed={speed}
                          />
                        ) : (
                          message.text
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Chat bubble pointer - centered at bottom */}
      <div
        className={`absolute bottom-0 ${
          messages?.[messages.length - 1]?.direction === "left"
            ? "left-1/8"
            : "right-1/8"
        } transform translate-y-1/2`}
      >
        <div className="w-4 h-4 bg-white transform rotate-45 shadow-lg" />
      </div>
    </motion.div>
  );
}
