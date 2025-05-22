"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Story as StoryType } from "@/types";
import { Scene } from "@/components/scenes/Scene";
import { Layout } from "@/components/Layout";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  HomeIcon,
  ForwardIcon,
  PlayIcon,
  PauseIcon,
} from "@heroicons/react/24/solid";
import {
  HEADS,
  TORSOS,
  SITTING_OUTFITS,
  STANDING_OUTFITS,
  HAIR_COLORS,
  SKIN_TONES,
  CLOTHING_COLORS,
} from "@/components/characters/Human";

// Helper function to get random array item
function getRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

// Generate random appearance for a character
function generateRandomAppearance(
  posture: "sitting" | "standing" = "standing"
) {
  return {
    head: getRandomItem(HEADS),
    torso: getRandomItem(TORSOS),
    outfit: getRandomItem(
      posture === "sitting" ? SITTING_OUTFITS : STANDING_OUTFITS
    ),
    posture,
    style: {
      hairColor: getRandomItem(HAIR_COLORS),
      skinColor: getRandomItem(SKIN_TONES),
      clothingColor: getRandomItem(CLOTHING_COLORS),
      accessoryColor: getRandomItem(CLOTHING_COLORS),
    },
  };
}

interface StoryProps {
  story: StoryType;
  onReturnToMenu: () => void;
}

export function Story({ story, onReturnToMenu }: StoryProps) {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);

  // Reference to Scene component methods
  const sceneRef = useRef<{
    nextStep: () => void;
    previousStep: () => void;
    currentStepIndex: number;
    totalSteps: number;
  }>({
    nextStep: () => {},
    previousStep: () => {},
    currentStepIndex: 0,
    totalSteps: 0,
  });

  // Generate and persist random appearances for characters
  const charactersWithAppearance = useMemo(() => {
    return story.characters.map((character) => ({
      ...character,
      appearance: character.appearance ?? generateRandomAppearance(),
    }));
  }, [story.characters]);

  const currentScene = story.scenes[currentSceneIndex];

  const handleSceneComplete = () => {
    if (autoAdvance && currentSceneIndex < story.scenes.length - 1) {
      setCurrentSceneIndex((prev) => prev + 1);
    }
  };

  const handleNextScene = () => {
    if (currentSceneIndex < story.scenes.length - 1) {
      setCurrentSceneIndex((prev) => prev + 1);
    } else {
      // Reset to beginning if at last scene
      setCurrentSceneIndex(0);
      setIsPaused(true);
    }
  };

  const handlePreviousScene = () => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex((prev) => prev - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      sceneRef.current?.nextStep();
    } else {
      handleNextScene();
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      sceneRef.current?.previousStep();
    } else {
      handlePreviousScene();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "Space") {
      handleNextStep();
    } else if (e.key === "ArrowLeft") {
      handlePreviousStep();
    } else if (e.key === "a" || e.key === "A") {
      setAutoAdvance((prev) => !prev);
    } else if (e.key === "p" || e.key === "P") {
      setIsPaused((prev) => !prev);
    }
  };

  return (
    <Layout>
      <div
        className="relative w-full h-full focus:outline-none"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {/* Return to Menu Button */}
        <motion.button
          className="absolute top-4 left-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-gray-100 shadow-lg z-50"
          onClick={onReturnToMenu}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          aria-label="Return to menu"
        >
          <HomeIcon className="w-6 h-6 text-gray-700" />
        </motion.button>

        {/* Auto-advance toggle */}
        <motion.button
          className={`absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-gray-100 shadow-lg z-50 ${
            autoAdvance ? "bg-blue-100" : ""
          }`}
          onClick={() => setAutoAdvance((prev) => !prev)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          aria-label={
            autoAdvance ? "Disable auto-advance" : "Enable auto-advance"
          }
        >
          <ForwardIcon
            className={`w-6 h-6 ${
              autoAdvance ? "text-blue-600" : "text-gray-700"
            }`}
          />
        </motion.button>

        <AnimatePresence mode="wait">
          {currentScene && (
            <motion.div
              key={currentScene.title}
              className="w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Scene
                ref={sceneRef}
                scene={currentScene}
                characters={charactersWithAppearance}
                onComplete={handleSceneComplete}
                isPaused={isPaused}
                autoAdvance={autoAdvance}
                onStepChange={(currentStep, totalSteps) => {
                  setCurrentStep(currentStep);
                  setTotalSteps(totalSteps);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Story Controls */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
          {/* Previous Scene */}
          <button
            onClick={handlePreviousScene}
            disabled={currentSceneIndex === 0}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous scene"
          >
            <ChevronDoubleLeftIcon className="w-6 h-6 text-gray-700" />
          </button>

          {/* Previous Step */}
          <button
            onClick={handlePreviousStep}
            disabled={currentStep <= 0}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous step"
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
          </button>

          {/* Play/Pause */}
          <button
            onClick={() => setIsPaused((prev) => !prev)}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label={isPaused ? "Play scene" : "Pause scene"}
          >
            {isPaused ? (
              <PlayIcon className="w-6 h-6 text-gray-700" />
            ) : (
              <PauseIcon className="w-6 h-6 text-gray-700" />
            )}
          </button>

          {/* Next Step */}
          <button
            onClick={handleNextStep}
            disabled={currentStep >= totalSteps - 1}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next step"
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-700" />
          </button>

          {/* Next Scene */}
          <button
            onClick={handleNextScene}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Next scene"
          >
            <ChevronDoubleRightIcon className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {story.scenes.map((scene, index) => (
            <div
              key={scene.title}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index === currentSceneIndex
                  ? "bg-blue-500"
                  : index < currentSceneIndex
                  ? "bg-blue-200"
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
