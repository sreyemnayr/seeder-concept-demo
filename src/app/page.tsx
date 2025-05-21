"use client";

import { useState } from "react";
import { Story } from "@/components/Story";
import { StoryMenu } from "@/components/StoryMenu";
import { stories } from "@/data/stories";
import { Story as StoryType } from "@/types";

export default function Home() {
  const [selectedStory, setSelectedStory] = useState<StoryType | null>(null);

  const handleSelectStory = (story: StoryType) => {
    setSelectedStory(story);
  };

  const handleReturnToMenu = () => {
    setSelectedStory(null);
  };

  if (selectedStory) {
    return <Story story={selectedStory} onReturnToMenu={handleReturnToMenu} />;
  }

  return <StoryMenu stories={stories} onSelectStory={handleSelectStory} />;
}
