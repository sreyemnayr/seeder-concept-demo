import { Story } from "@/types";

export const sampleStory: Story = {
  title: "Sample Story",
  characters: [
    {
      name: "Alex",
      type: "human",
      role: "volunteer",
    },
    {
      name: "Ashley",
      type: "human",
      role: "volunteer",
    },
    {
      name: "Sam",
      type: "human",
      role: "organizer",
    },
    {
      name: "Seeder",
      type: "ai",
      role: "agent",
    },
  ],
  scenes: [
    {
      title: "Onboarding Alex",
      type: "interview",
      characters: ["Alex", "Seeder"],
      interactions: [
        {
          character: "Alex",
          type: "speak",
          text: "Sign me up for Seeder!",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Analyzing volunteer profile...\nAssessing key qualities for community engagement...",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "Hi Alex! I'd love to learn more about your interests in community service. What motivates you to volunteer?",
        },
        {
          character: "Alex",
          type: "speak",
          text: "I believe in giving back to the community. I have experience in teaching and enjoy working with children.",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Educational background detected\nStrong affinity for youth programs\nProcessing compatibility...",
        },
      ],
    },
    {
      title: "Onboarding Ashley",
      type: "interview",
      characters: ["Ashley", "Seeder"],
      interactions: [
        {
          character: "Ashley",
          type: "speak",
          text: "Sign me up for Seeder!",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Analyzing volunteer profile...\nAssessing key qualities for community engagement...",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "Hi Alex! I'd love to learn more about your interests in community service. What motivates you to volunteer?",
        },
        {
          character: "Ashley",
          type: "speak",
          text: "I believe in giving back to the community. I have experience in teaching and enjoy working with children.",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Educational background detected\nStrong affinity for youth programs\nProcessing compatibility...",
        },
      ],
    },
    {
      title: "Org Makes an Ask",
      type: "initiation",
      characters: ["Sam", "Seeder"],
      interactions: [
        {
          character: "Sam",
          type: "speak",
          text: "We need volunteers for our after-school reading program. Can you help find someone?",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Analyzing requirements...\nEducational background needed\nAfter-school availability required",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "I'll help you find the perfect volunteer. How many hours per week would you need?",
        },
      ],
    },
    {
      title: "Volunteer Search",
      type: "request",
      characters: ["Seeder", "Ashley"],
      interactions: [
        {
          character: "Seeder",
          type: "think",
          text: "Match found: 95% compatibility\nEducational experience: ✓\nAvailability: ✓",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "Alex, I found an opportunity that matches your interests! Would you be interested in helping with an after-school reading program?",
        },
        {
          character: "Ashley",
          type: "speak",
          text: "I need to check with my partner. They will be home this evening.",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Scheduling a check-in at 6pm. For now, we'll keep looking for another volunteer.",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "I'll check back at 6pm.",
        },
      ],
    },
    {
      title: "Volunteer Search 2",
      type: "request",
      characters: ["Seeder", "Alex"],
      interactions: [
        {
          character: "Seeder",
          type: "think",
          text: "Match found: 95% compatibility\nEducational experience: ✓\nAvailability: ✓",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "Alex, I found an opportunity that matches your interests! Would you be interested in helping with an after-school reading program?",
        },
        {
          character: "Alex",
          type: "speak",
          text: "That sounds perfect! Yes, I'd love to help.",
        },
      ],
    },
    {
      title: "Match Confirmation",
      type: "fulfillment",
      characters: ["Seeder", "Sam"],
      interactions: [
        {
          character: "Seeder",
          type: "speak",
          text: "Great news! I've found an experienced teacher who's interested in helping with the reading program.",
        },
        {
          character: "Sam",
          type: "speak",
          text: "That's wonderful! When can they start?",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "I'll connect you both right away to discuss the details.",
        },
      ],
    },
    {
      title: "Making Connections",
      type: "connection",
      characters: ["Sam", "Alex"],
      interactions: [
        {
          character: "Sam",
          type: "speak",
          text: "Hi Alex! I'm excited to have you join our reading program.",
        },
        {
          character: "Alex",
          type: "speak",
          text: "Thanks Sam! I'm looking forward to helping the kids improve their reading skills.",
        },
      ],
    },
    {
      title: "Volunteer Reflection",
      type: "reflection",
      characters: ["Seeder", "Alex"],
      interactions: [
        {
          character: "Seeder",
          type: "speak",
          text: "How was your experience with the reading program, Alex?",
        },
        {
          character: "Alex",
          type: "speak",
          text: "It was amazing! The kids made great progress, and I'd love to continue volunteering.",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Updating volunteer profile...\nSkills verified: Teaching, Mentoring\nReliability score: 100%",
        },
      ],
    },
    {
      title: "Organizer Review",
      type: "review",
      characters: ["Seeder", "Sam"],
      interactions: [
        {
          character: "Seeder",
          type: "speak",
          text: "Sam, how did Alex do with the reading program?",
        },
        {
          character: "Sam",
          type: "speak",
          text: "Alex was fantastic! The kids loved him, and he was always reliable and prepared.",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Positive review received\nUpdating volunteer rating...\nAdding to preferred volunteers list",
        },
      ],
    },
  ],
};
