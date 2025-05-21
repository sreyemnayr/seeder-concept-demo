import { Story } from "@/types";

export const fosterStory: Story = {
  title: "The Foster Connection",
  characters: [
    {
      name: "Ashley",
      type: "human",
      role: "volunteer",
    },
    {
      name: "Sam",
      type: "human",
      role: "volunteer",
    },
    {
      name: "Frankie",
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
      title: "Ashley's Interview",
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
          text: "New volunteer...\nInitiating quality assessment process...\nStarting with service experience to gauge Environmental Threshold and Emotional-Labor Threshold...",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "Great. Tell me about the last time you were of service in your community. What motivated you and how did it feel?",
        },
        {
          character: "Ashley",
          type: "speak",
          text: "I spent a day at a local animal shelter cleaning crates and walking dogs. I love animals and wanted to help, but to be honest being in the shelter was just too heartbreaking for me. I need to find another way help. I will say I enjoyed meeting the other volunteers though. It felt like I was part of a new community.",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Analyzing response...\nEmotional-Labor Threshold: Score 2 - sensitive to distressing environments\nSocial-Interaction Preference: Score 4 - enjoys volunteer community\nEnvironmental Threshold: Score 3 - comfortable with animals\nValues-Alignment: Score 4 - strong animal welfare focus\nExploring alternative service options...",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "That's understandable. Have you considered fostering in your home? Fosters need a fenced yard and ideally are gone no more than 5 hours a day. If that's not you, you could also just help hold a leash at an adoption event.",
        },
        {
          character: "Ashley",
          type: "speak",
          text: "I do have a fenced yard and I work from home. I could do either of those.",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Resources detected!\nHome environment: Fenced yard ✓\nAvailability: Work from home ✓\nFlexibility Threshold: Score 3 - open to multiple options\nGathering additional preferences for better matching...",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "Great. Do you have any preferences or restrictions on the kind of dogs you can foster?",
        },
        {
          character: "Ashley",
          type: "speak",
          text: "I prefer smaller dogs. I am also open to older dogs. But they do have to be cat friendly - I have some strays I take care of who I don't want to run off.",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Preferences noted:\n- Size: Small dogs preferred\n- Age: Senior-friendly\n- Required: Cat-friendly\nCapability detected: Current caregiver to stray cats\nUpdating biography with fostering parameters...",
        },
      ],
    },
    {
      title: "Sam's Interview",
      type: "interview",
      characters: ["Sam", "Seeder"],
      interactions: [
        {
          character: "Sam",
          type: "speak",
          text: "Sign me up for Seeder",
        },
        {
          character: "Seeder",
          type: "think",
          text: "New volunteer...\nInitiating quality assessment process...\nStarting with availability assessment...",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "Great. Let's get some logistics out of the way. When are you most available and how often do you want to be called into service?",
        },
        {
          character: "Sam",
          type: "speak",
          text: "I am retired and flexible. I'd like to be called into service at least weekly.",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Availability assessment:\nSchedule: Highly flexible\nCommitment Threshold: Score 5 - seeks regular engagement\nProbing for motivation and values...",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "Wonderful to hear. Why do you want to serve? Are there values, beliefs, or inspirations that guide your choices in life?",
        },
        {
          character: "Sam",
          type: "speak",
          text: "I was a career lawyer who made lots of money, but burned a lot of relationships. I am lonely now and my dog is my only real friend. I see the error of my ways. I want to do meaningful work and be in community.",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Background analysis:\nProfessional: Legal career\nMotivation: Personal growth, community connection\nEmotional-Labor Threshold: Score 4 - shows deep self-reflection\nCapability detected: Dog ownership/care\nExploring social preferences...",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "We are all on a journey. If you are feeling lonely, are there types of people you feel especially drawn to connect with?",
        },
        {
          character: "Sam",
          type: "speak",
          text: "I'd love to be around younger people. I am old with a lot of life experience. Maybe I could help them not make the mistakes I did and they could cheer me up a bit.",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Preferences updated:\n- Intergenerational engagement desired\n- Mentorship potential noted\nSocial-Interaction Preference: Score 4 - seeks meaningful connections\nValues-Alignment: Score 3 - focused on personal growth and community",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "Thanks for sharing all of that. You now have a Seeder profile — living, flexible, and centered on who you are. We'll be in touch when we think you are the right person to answer a call for service.",
        },
      ],
    },
    {
      title: "Organization Request",
      type: "initiation",
      characters: ["Frankie", "Seeder"],
      interactions: [
        {
          character: "Frankie",
          type: "speak",
          text: "We need an urgent 2 week temp foster for a mid size mutt.",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Urgent request analysis:\nType: Temporary foster (2 weeks)\nDog size: Medium\nUrgency level: High\nGathering additional details for matching...",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "Got it. Does the dog have any special needs or circumstances we should know about?",
        },
        {
          character: "Frankie",
          type: "speak",
          text: "Dog and Cat friendly, working on not jumping up on people.",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Requirements updated:\n- Dog-friendly ✓\n- Cat-friendly ✓\nBehavioral note: Jumping behavior\nSearching for suitable foster matches...",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "Looking for your volunteer now.",
        },
      ],
    },
    {
      title: "First Match Attempt",
      type: "request",
      characters: ["Seeder", "Ashley"],
      interactions: [
        {
          character: "Seeder",
          type: "think",
          text: "Match analysis for Ashley:\nCat-friendly requirement: ✓\nYard requirement: ✓\nAvailability: ✓\nSize preference mismatch: ⚠️\nUrgency factor: Critical\nProceeding with outreach...",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "Hi Ashley, we have an urgent need for a temp foster. The dog is cat friendly, but does tend to jump up on people. Ready to try fostering?",
        },
        {
          character: "Ashley",
          type: "speak",
          text: "I'd love to help, but I have a guest staying with me next week. Can I check and see if they would be ok with this?",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Temporary constraint identified\nConsultation needed\nUrgency requires parallel search\nSetting follow-up timer...",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "Sure. This is urgent so we will keep looking. When should we check back with you?",
        },
        {
          character: "Ashley",
          type: "speak",
          text: "Give me half an hour.",
        },
      ],
    },
    {
      title: "Second Match Attempt",
      type: "request",
      characters: ["Seeder", "Sam"],
      interactions: [
        {
          character: "Seeder",
          type: "think",
          text: "Match analysis for Sam:\nAvailability: ✓\nDog experience: ✓\nUrgency alignment: ✓\nProceeding with outreach...",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "Sam, you said you have lots of flexibility with your schedule. We have an urgent temp foster needed. It's a midsize mutt who is dog friendly, but does tend to jump on people.",
        },
        {
          character: "Sam",
          type: "speak",
          text: "I'd love to, but I just threw out my back. I don't think I can handle a dog that jumps on me a lot right now.",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Temporary physical limitation noted\nUpdating availability status\nSetting follow-up timeline...",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "Understood, we'll make a note that your availability is limited for the next month or two. Does that sound good?",
        },
        {
          character: "Sam",
          type: "speak",
          text: "Sounds good, hope you find someone!",
        },
      ],
    },
    {
      title: "Final Match",
      type: "request",
      characters: ["Seeder", "Ashley"],
      interactions: [
        {
          character: "Seeder",
          type: "think",
          text: "Follow-up check with Ashley\nTime elapsed: 30 minutes\nUrgency level: Critical\nProceeding with status check...",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "Ashley, did you hear back from your friend?",
        },
        {
          character: "Ashley",
          type: "speak",
          text: "Yes, she's down for a foster dog during her stay.",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Match confirmed!\nTemporary constraint resolved\nProceeding to organization connection\nNoting first-time foster status...",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "Great. Connecting you to the org. They will take you through their standard vetting process for first time fosters",
        },
      ],
    },
    {
      title: "Volunteer Reflection",
      type: "reflection",
      characters: ["Seeder", "Ashley"],
      interactions: [
        {
          character: "Seeder",
          type: "think",
          text: "Initiating first-time foster reflection\nAssessing experience for future matching\nChecking comfort level with challenges...",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "Ashley - how was your first fostering experience?",
        },
        {
          character: "Ashley",
          type: "speak",
          text: "I loved it. He was a challenging little guy, but I really enjoyed it all the same. I'd definitely foster more in the future.",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Experience assessment:\nOverall: Very positive\nChallenge handling: Successful\nFuture interest: Confirmed\nUpdating volunteer profile:\n- Adding: Successful foster experience\n- Increasing: Confidence in handling challenges\n- Noting: Ready for future placements",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "Glad to hear it!",
        },
      ],
    },
    {
      title: "Organization Review",
      type: "review",
      characters: ["Seeder", "Frankie"],
      interactions: [
        {
          character: "Seeder",
          type: "speak",
          text: "Org - how did Ashley do with her first temp foster?",
        },
        {
          character: "Frankie",
          type: "speak",
          text: "Ashley was great. She bought dog toys and for his stay even though it was only a short one. We'd love to see her as a regular fostering candidate.",
        },
        {
          character: "Seeder",
          type: "think",
          text: "Org feedback analysis:\nPerformance: Excellent\nExtra effort noted: Purchased supplies\nLong-term potential: High\nUpdating volunteer profile:\n- Adding: Above and beyond effort\n- Status: Approved for regular fostering\n- Priority: High for future matches",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "That's great! I've updated her biography to indicate that it was a good match!",
        },
      ],
    },
  ],
};
