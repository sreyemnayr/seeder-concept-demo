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
import { Scene as SceneType, ChatMessage } from "@/types";
import { Character } from "@/types/character";
import { Human } from "@/components/characters/Human";
import { ChatBubble } from "@/components/bubbles/ChatBubble";
import { ThoughtBubble } from "@/components/bubbles/ThoughtBubble";

import { totalDuration } from "@/util/animation";
import { useIsLandscape } from "@/hooks/useMediaQuery";

type Speed = Parameters<typeof totalDuration>[1];

const CHAT_SPEED: Speed = 80;
const THOUGHT_SPEED: Speed = 90;
const THOUGHT_DELAY: number = 1000;
const CHAT_DELAY: number = 1500;

interface SceneProps {
  scene: SceneType;
  characters: Character[];
  onComplete?: () => void;
  isPaused?: boolean;
  autoAdvance?: boolean;
  onStepChange?: (currentStep: number, totalSteps: number) => void;
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
    const [activeCharacter, setActiveCharacter] = useState<Character | null>(
      null
    );
    const landscape = useIsLandscape();

    // Add ref to track current step to handle stale callbacks
    const currentStepRef = useRef(currentInteractionIndex);
    currentStepRef.current = currentInteractionIndex;

    const animationTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    const currentInteraction = scene.interactions[currentInteractionIndex];
    const totalSteps = scene.interactions.length;

    const getCharacterPosition = useCallback(
      (characterName: string): "left" | "right" => {
        const index = scene.characters.indexOf(characterName);
        return index === 0 ? "left" : "right";
      },
      [scene.characters]
    );

    // Initialize step info
    useEffect(() => {
      onStepChange?.(currentInteractionIndex, totalSteps);
    }, []);

    // Notify parent of step changes
    useEffect(() => {
      onStepChange?.(currentInteractionIndex, totalSteps);
      setActiveCharacter(
        characters.find((c) => c.name === currentInteraction?.character) || null
      );
    }, [
      currentInteractionIndex,
      totalSteps,
      currentInteraction?.character,
      characters,
      onStepChange,
    ]);

    const updateCurrentIndex = (newIndex: number) => {
      // Clear any ongoing animations
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      setCurrentInteractionIndex(newIndex);
      setStepComplete(false);
      setIsTransitioning(false);
    };

    const nextStep = useCallback(
      (cur: number = currentInteractionIndex) => {
        // Prevent stale callbacks from triggering next step
        if (cur !== currentStepRef.current) {
          return;
        }

        if (currentInteractionIndex < totalSteps - 1) {
          updateCurrentIndex(currentInteractionIndex + 1);
        } else {
          onComplete?.();
        }
      },
      [currentInteractionIndex, totalSteps, onComplete]
    );

    const previousStep = useCallback(() => {
      if (currentInteractionIndex > 0) {
        updateCurrentIndex(currentInteractionIndex - 1);
      }
    }, [currentInteractionIndex]);

    // Expose navigation methods and step info
    useImperativeHandle(
      ref,
      () => ({
        nextStep,
        previousStep,
        currentStepIndex: currentInteractionIndex,
        totalSteps,
      }),
      [currentInteractionIndex, totalSteps, nextStep, previousStep]
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

      // Reset chat history for the current step
      setChatHistory(
        scene.interactions
          .slice(0, currentInteractionIndex + 1)
          .map((interaction, idx) => ({
            text: interaction.text,
            direction: getCharacterPosition(interaction.character),
            isNew: idx === currentInteractionIndex,
            type: interaction.type,
            character: interaction.character,
          }))
          .filter((interaction) => interaction.type === "speak")
      );
    }, [
      currentInteraction,
      isTransitioning,
      scene.interactions,
      currentInteractionIndex,
      getCharacterPosition,
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

    return (
      <div className="relative w-full h-full">
        {/* Characters */}
        {scene.characters.map((characterName) => {
          const character = characters.find((c) => c.name === characterName);
          if (!character) return null;
          return getCharacterComponent(character);
        })}

        {/* Interaction bubbles */}
        <div
          className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 w-full flex flex-col items-center ${
            landscape ? "top-1/2 -translate-y-1/2" : "top-0 -translate-y-1/2"
          }`}
        >
          {/* Chat Bubble */}
          <AnimatePresence mode="wait">
            <motion.div
              initial={
                currentInteraction.type === "think"
                  ? { opacity: 0, scale: 0.9, y: 0 }
                  : { opacity: 0, scale: 0.9, y: 0 }
              }
              animate={{
                opacity: currentInteraction.type === "think" ? 0.5 : 1,
                scale: currentInteraction.type === "think" ? 1 : 1,
              }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              <ChatBubble
                messages={chatHistory}
                speed={CHAT_SPEED}
                delay={CHAT_DELAY}
                onComplete={() => {
                  // Only update state if we're still on the same step
                  if (currentStepRef.current === currentInteractionIndex) {
                    setIsTransitioning(false);
                    setStepComplete(true);
                    if (
                      autoAdvance &&
                      currentInteractionIndex < totalSteps - 1
                    ) {
                      nextStep(currentInteractionIndex);
                    } else if (
                      autoAdvance &&
                      currentInteractionIndex === totalSteps - 1
                    ) {
                      onComplete?.();
                    }
                  }
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Thought Bubble */}
          <AnimatePresence mode="wait">
            {currentInteraction.type === "think" && (
              <motion.div
                key={`thought-${currentInteractionIndex}`}
                initial={{
                  opacity: 0,
                  y: "10%",
                  x:
                    getCharacterPosition(currentInteraction.character) ===
                    "left"
                      ? "-50%"
                      : "50%",
                }}
                animate={{
                  opacity: 1,
                  y: landscape ? "-100%" : "100%",
                  x:
                    getCharacterPosition(currentInteraction.character) ===
                    "left"
                      ? landscape
                        ? "-15%"
                        : "0%"
                      : landscape
                      ? "15%"
                      : "0%",
                  transition: { ease: ["easeOut", "easeOut"], duration: 0.2 },
                }}
                exit={{
                  opacity: 0,
                  y: "10%",
                  x:
                    getCharacterPosition(currentInteraction.character) ===
                    "left"
                      ? "-50%"
                      : "50%",
                  scale: 0.2,
                  transition: { ease: ["easeOut", "easeIn"], duration: 0.2 },
                }}
                className={`absolute transform  mt-16 ${
                  landscape
                    ? "w-1/2 -translate-x-1/2 left-1/2 top-0"
                    : "w-full bottom-0"
                }`}
              >
                <ThoughtBubble
                  key={`${currentInteraction.character}-${currentInteractionIndex}`}
                  text={currentInteraction.text}
                  direction={getCharacterPosition(currentInteraction.character)}
                  isTerminal={activeCharacter?.type === "ai"}
                  speed={THOUGHT_SPEED}
                  delay={THOUGHT_DELAY}
                  onComplete={() => {
                    // Only update state if we're still on the same step
                    if (currentStepRef.current === currentInteractionIndex) {
                      setIsTransitioning(false);
                      setStepComplete(true);
                      if (autoAdvance) {
                        nextStep(currentInteractionIndex);
                      }
                    }
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }
);

Scene.displayName = "Scene";
