import { Story } from "@/types";

export const debugStory: Story = {
  title: "Debug Story",
  characters: [
    {
      name: "Seeder",
      type: "ai",
      role: "agent",
    },
    {
      name: "Alex",
      type: "human",
      role: "volunteer",
    },
    {
      name: "Sara",
      type: "human",
      role: "organizer",
    },
  ],
  scenes: [
    {
      title: "Scene One",
      type: "interview",
      characters: ["Seeder", "Alex"],
      interactions: [
        {
          character: "Seeder",
          type: "speak",
          text: "Interaction 0 - Speaking",
        },
        {
          character: "Alex",
          type: "speak",
          text: "Interaction 1 - Speaking",
        },
        {
          character: "Alex",
          type: "speak",
          text: "Interaction 2 - Speaking",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Interaction 3 - Thinking",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "Interaction 4 - Speaking",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Interaction 5 - Thinking",
        },
        {
          character: "Alex",
          type: "speak",
          text: "Interaction 6 - Speaking",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Interaction 7 - Thinking",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "Interaction 8 - Speaking",
        },
        {
          character: "Alex",
          type: "speak",
          text: "Interaction 9 - Speaking",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Interaction 10 - Thinking",
        },
      ],
    },
    {
      title: "Scene Two",
      type: "interview",
      characters: ["Sara", "Seeder"],
      interactions: [
        {
          character: "Seeder",
          type: "speak",
          text: "Interaction 0 - Speaking",
        },
        {
          character: "Sara",
          type: "speak",
          text: "Interaction 1 - Speaking",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Interaction 2 - Thinking",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "Interaction 3 - Speaking",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Interaction 4 - Thinking",
        },
        {
          character: "Sara",
          type: "speak",
          text: "Interaction 5 - Speaking",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Interaction 6 - Thinking",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "Interaction 7 - Speaking",
        },
        {
          character: "Sara",
          type: "speak",
          text: "Interaction 8 - Speaking",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Interaction 9 - Thinking",
        },
      ],
    },
  ],
};
