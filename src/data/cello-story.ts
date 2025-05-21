import { Story } from "@/types";

export const celloStory: Story = {
  title: "The Cellist's Journey",
  characters: [
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
    {
      name: "Seeder",
      type: "ai",
      role: "agent",
    },
  ],
  scenes: [
    {
      title: "Initial Interview",
      type: "interview",
      characters: ["Alex", "Seeder"],
      interactions: [
        {
          character: "Alex",
          type: "speak",
          text: "Sign me up Seeder! My cause is animal welfare.",
        },
        {
          character: "Seeder",
          type: "think",
          text: "New volunteer for animal welfare...\nInitiating quality assessment process...\nPreparing standard onboarding questions...",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "Thank you for joining Seeder for animal welfare. We'd love to ask you a few questions to get to know you better — your gifts, your values, your hopes — so we can connect you to service opportunities that truly fit. You can type or speak your responses. Ready to begin?",
        },
        {
          character: "Alex",
          type: "speak",
          text: "Sure.",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Volunteer shows brief responses...\nAssessing Communication Style...\nProceeding with open-ended question to encourage elaboration...",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "What are you good at — in work, in life, or just for fun? Don't hold back — all gifts matter here.",
        },
        {
          character: "Alex",
          type: "speak",
          text: "I work as an accountant, but my passion is music. I used to play in bands. My instrument is the cello.",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Multiple capabilities detected!\nProfessional: Accounting (Certainty: 95%)\nArtistic: Musical Performance - Cello (Certainty: 90%)\nAssessing Meticulousness quality based on accounting background...\nSetting Meticulousness score to 4...\nProbing for direct service interest...",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "Wonderful, both your profession and your passion bring skill sets that could help the animal welfare community. Are you also interested in direct volunteering opportunities at local shelters and rescues?",
        },
        {
          character: "Alex",
          type: "speak",
          text: "I don't have time due to my work schedule. Weekends are for family, but I could fit in some pro-bono accounting in the evenings for an org.",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Availability constraints noted...\nWeekdays: Evenings only\nWeekends: Unavailable (family commitment)\nAssessing Commitment Threshold: Score 2 - prefers short-term projects\nUpdating biography with schedule constraints...",
        },
      ],
    },
    {
      title: "Organization Request",
      type: "initiation",
      characters: ["Sara", "Seeder"],
      interactions: [
        {
          character: "Sara",
          type: "speak",
          text: "We need musical entertainment for our upcoming fundraiser. Can you help find someone.",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Analyzing request requirements...\nSkill needed: Musical performance\nEvent type: Fundraiser\nNeed to clarify: Event format, timing, duration...",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "Sure. First a few clarifying questions. Are you looking for a band? Do they need to be well-known to draw a crowd?",
        },
        {
          character: "Sara",
          type: "speak",
          text: "No, it's really more like background music for the seated dinner.",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Event format clarified: Background music, seated dinner\nSolo performer would be suitable\nNeed to confirm: Date and time...",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "Got it. When and at what time is the event?",
        },
        {
          character: "Sara",
          type: "speak",
          text: "It's a thursday evening on september 19th",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Event details confirmed:\nDate: September 19th (Thursday)\nTime: Evening\nFormat: Seated dinner\nSearching volunteer database for musical performers...",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "Great. Looking for your perfect volunteer now.",
        },
      ],
    },
    {
      title: "Volunteer Match",
      type: "request",
      characters: ["Seeder", "Alex"],
      interactions: [
        {
          character: "Seeder",
          type: "think",
          text: "Match analysis:\nMusical capability: Cello ✓\nAvailability: Thursday evening ✓\nExperience level: Former band member ✓\nMatch confidence: 85%\nProceeding with outreach...",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "Alex, there is an opportunity that matches your interests and availability. Of all the people in your Seeder community, you seem best suited to answer the call. Would you be available to play your cello for a seated dinner fundraiser on September 19th?",
        },
        {
          character: "Alex",
          type: "speak",
          text: "Wow really. I'd love to get my cello out for this.",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Positive response received!\nEnthusiasm level: High\nUpdating match status: Accepted\nProceeding to connection phase...",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "Great. I'll connect you to the org and the two of you can take it from there.",
        },
      ],
    },
    {
      title: "Match Confirmation",
      type: "fulfillment",
      characters: ["Seeder", "Sara"],
      interactions: [
        {
          character: "Seeder",
          type: "speak",
          text: "We've found a cellist who used to play music professionally. Their name is Alex and they're expecting a call from you at 504-504-5040.",
        },
        {
          character: "Sara",
          type: "speak",
          text: "Great!",
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
          text: "How was your experience performing at the fundraiser Alex?",
        },
        {
          character: "Alex",
          type: "speak",
          text: "It was really delightful. I got to get out my cello and help the animal welfare cause. It was a win-win for me. I also got to speak to the founder who needs help with bookkeeping so I might have a new pro-bono client.",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Analyzing reflection...\nExperience rating: Positive\nNew opportunity identified: Bookkeeping\nUpdating volunteer profile:\n- Musical performance completed\n- Accounting skills reconfirmed\n- Networking capability noted",
        },
      ],
    },
    {
      title: "Organization Review",
      type: "review",
      characters: ["Seeder", "Sara"],
      interactions: [
        {
          character: "Seeder",
          type: "speak",
          text: "How did Alex do at the fundraiser?",
        },
        {
          character: "Sara",
          type: "speak",
          text: "He was very nice, and his cello playing was ok. Not sure we would work with him again as a musician, but he did offer his accounting services so we are going to take him up on that this month and see if it goes better.",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Processing review feedback...\nMusical performance: Below expectations\nAccounting opportunity: Pending\nUpdating volunteer profile:\n- Reducing confidence in musical performance capability (70%)\n- Scheduling follow-up for accounting engagement",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "Understood. I've made a note that he won't be your first choice in the future for musical performances. We will check back at the end of the month to see how you experience with him offering his accounting skills goes.",
        },
      ],
    },
  ],
};
