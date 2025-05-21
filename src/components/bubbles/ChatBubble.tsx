"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

interface ChatMessage {
  text: string;
  isNew?: boolean;
  direction: "left" | "right";
}

interface ChatBubbleProps {
  messages: ChatMessage[];
}

export function ChatBubble({ messages }: ChatBubbleProps) {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40%] bg-white rounded-lg shadow-lg p-4"
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
        <div className="relative h-[300px] overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0">
            <div className="flex flex-col space-y-2">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.direction === "left"
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  <div
                    className={`relative max-w-md px-4 py-2 rounded-lg ${
                      message.direction === "left"
                        ? "bg-gray-200 text-gray-800"
                        : "bg-blue-500 text-white"
                    }`}
                    style={{ fontFamily: "var(--font-roboto)" }}
                  >
                    {message.isNew ? (
                      <TypeAnimation
                        sequence={[message.text]}
                        wrapper="span"
                        cursor={message.isNew}
                        repeat={0}
                        speed={70}
                      />
                    ) : (
                      message.text
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chat bubble pointer - centered at bottom */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
        <div className="w-4 h-4 bg-white transform rotate-45 shadow-lg" />
      </div>
    </motion.div>
  );
}
