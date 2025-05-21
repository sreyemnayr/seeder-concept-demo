"use client";

import {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scene as SceneType } from "@/types";
import { Character } from "@/types/character";
import { Human } from "@/components/characters/Human";
import { ChatBubble } from "@/components/bubbles/ChatBubble";
import { ThoughtBubble } from "@/components/bubbles/ThoughtBubble";

interface SceneProps {
  scene: SceneType;
  characters: Character[];
  onComplete?: () => void;
  isPaused?: boolean;
  autoAdvance?: boolean;
  onStepChange?: (currentStep: number, totalSteps: number) => void;
}

interface ChatMessage {
  text: string;
  direction: "left" | "right";
  isNew: boolean;
}

export const Scene = forwardRef<
  {
    nextStep: () => void;
    previousStep: () => void;
    currentStepIndex: number;
    totalSteps: number;
  },
  SceneProps
>(
  (
    {
      scene,
      characters,
      onComplete,
      isPaused = false,
      autoAdvance = false,
      onStepChange,
    },
    ref
  ) => {
    const [currentInteractionIndex, setCurrentInteractionIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [stepComplete, setStepComplete] = useState(false);
    const animationTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    const currentInteraction = scene.interactions[currentInteractionIndex];
    const totalSteps = scene.interactions.length;

    // Initialize step info
    useEffect(() => {
      onStepChange?.(currentInteractionIndex, totalSteps);
    }, []);

    // Notify parent of step changes
    useEffect(() => {
      onStepChange?.(currentInteractionIndex, totalSteps);
    }, [currentInteractionIndex, totalSteps, onStepChange]);

    const updateCurrentIndex = (newIndex: number) => {
      setCurrentInteractionIndex(newIndex);
      setStepComplete(false);
      setIsTransitioning(false);
    };

    // Expose navigation methods and step info
    useImperativeHandle(
      ref,
      () => ({
        nextStep: () => {
          if (currentInteractionIndex < totalSteps - 1) {
            if (animationTimeoutRef.current) {
              clearTimeout(animationTimeoutRef.current);
            }
            updateCurrentIndex(currentInteractionIndex + 1);
          }
        },
        previousStep: () => {
          if (currentInteractionIndex > 0) {
            if (animationTimeoutRef.current) {
              clearTimeout(animationTimeoutRef.current);
            }
            updateCurrentIndex(currentInteractionIndex - 1);
          }
        },
        currentStepIndex: currentInteractionIndex,
        totalSteps,
      }),
      [currentInteractionIndex, totalSteps]
    );

    // Reset states when scene changes
    useEffect(() => {
      setChatHistory([]);
      setStepComplete(false);
      setIsTransitioning(false);
      updateCurrentIndex(0);
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    }, [scene.title]);

    const startStepAnimation = useCallback(() => {
      if (!currentInteraction || isTransitioning) return;

      // Clear any existing timeout
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }

      setIsTransitioning(true);

      // Add current interaction to chat history if it's a speak type
      if (currentInteraction.type === "speak") {
        const direction = getCharacterPosition(currentInteraction.character);
        setChatHistory((prev) => [
          ...prev.map((msg) => ({ ...msg, isNew: false })),
          {
            text: currentInteraction.text,
            direction,
            isNew: true,
          },
        ]);
      } else {
        setChatHistory((prev) => [
          ...prev.map((msg) => ({ ...msg, isNew: false })),
        ]);
      }

      const stepDuration = 2500 + currentInteraction.text.length * 50;

      animationTimeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
        setStepComplete(true);

        // Only advance if explicitly set to auto-advance
        if (autoAdvance && currentInteractionIndex < totalSteps - 1) {
          updateCurrentIndex(currentInteractionIndex + 1);
        } else if (autoAdvance && currentInteractionIndex === totalSteps - 1) {
          onComplete?.();
        }
      }, stepDuration);
    }, [
      currentInteraction,
      isTransitioning,
      autoAdvance,
      currentInteractionIndex,
      totalSteps,
      onComplete,
    ]);

    // Handle play/pause state changes
    useEffect(() => {
      if (
        !isPaused &&
        currentInteraction &&
        !isTransitioning &&
        !stepComplete
      ) {
        startStepAnimation();
      }
    }, [
      isPaused,
      currentInteraction,
      isTransitioning,
      stepComplete,
      startStepAnimation,
    ]);

    const getCharacterPosition = (characterName: string): "left" | "right" => {
      const index = scene.characters.indexOf(characterName);
      return index === 0 ? "left" : "right";
    };

    const getCharacterFlip = (characterName: string): boolean => {
      const index = scene.characters.indexOf(characterName);
      return index === 0 ? false : true;
    };

    const isCharacterActive = (characterName: string): boolean => {
      if (currentInteractionIndex >= scene.interactions.length) return false;
      return currentInteraction?.character === characterName;
    };

    const getCharacterComponent = (character: Character) => {
      const { appearance } = character;

      return character.type === "human" ? (
        <Human
          key={character.name}
          name={character.name}
          role={character.role}
          isActive={isCharacterActive(character.name)}
          position={getCharacterPosition(character.name)}
          flip={getCharacterFlip(character.name)}
          head={appearance?.head}
          torso={appearance?.torso}
          outfit={appearance?.outfit}
          posture={appearance?.posture}
          style={appearance?.style}
        />
      ) : (
        <Human
          key={character.name}
          name={character.name}
          role={character.role}
          head={"Afro"}
          outfit={"Shorts"}
          torso={"TrenchCoat"}
          posture={"standing"}
          style={{
            skinColor: "#097969",
            hairColor: "#5F8575",
            clothingColor: "#aaeb6a",
            accessoryColor: "#FF9B21",
          }}
          isActive={isCharacterActive(character.name)}
          position={getCharacterPosition(character.name)}
          flip={getCharacterFlip(character.name)}
        />
      );
    };

    const getBubbleComponents = () => {
      if (!currentInteraction) return null;

      const character = characters.find(
        (c) => c.name === currentInteraction.character
      );
      const isThinking = currentInteraction.type === "think";

      return (
        <div className="absolute left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center">
          {/* Chat Bubble */}
          <AnimatePresence mode="wait">
            {chatHistory.length > 0 && (
              <motion.div
                key={`chat-${currentInteractionIndex}`}
                initial={
                  isThinking
                    ? { opacity: 0, scale: 0.9, y: 0 }
                    : { opacity: 0, scale: 0.9, y: 0 }
                }
                animate={{
                  opacity: isThinking ? 0.5 : 1,
                  scale: isThinking ? 0.5 : 1,
                  y: isThinking ? -40 : 0,
                }}
                exit={
                  isThinking
                    ? { opacity: 0, scale: 0.1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <ChatBubble messages={chatHistory} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Thought Bubble */}
          <AnimatePresence mode="wait">
            {isThinking && (
              <motion.div
                key={`thought-${currentInteractionIndex}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 100 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.3 }}
                className="w-full mt-16"
              >
                <ThoughtBubble
                  key={`${currentInteraction.character}-${currentInteractionIndex}`}
                  text={currentInteraction.text}
                  direction={getCharacterPosition(currentInteraction.character)}
                  isTerminal={character?.type === "ai"}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    };

    return (
      <div className="relative w-full h-full">
        {/* Scene title */}
        <motion.h2
          className="absolute top-8 left-1/2 transform -translate-x-1/2 text-[4em] font-bold text-gray-800"
          style={{ fontFamily: "var(--font-libre)" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {scene.title}
        </motion.h2>

        {/* Characters */}
        {scene.characters.map((characterName) => {
          const character = characters.find((c) => c.name === characterName);
          if (!character) return null;
          return getCharacterComponent(character);
        })}

        {/* Interaction bubbles */}
        {getBubbleComponents()}

        {/* Step progress indicators */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-1.5">
          {scene.interactions.map((_, index) => (
            <div
              key={`step-${index}`}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                index === currentInteractionIndex
                  ? "bg-blue-500"
                  : index < currentInteractionIndex
                  ? "bg-blue-200"
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    );
  }
);

Scene.displayName = "Scene";
