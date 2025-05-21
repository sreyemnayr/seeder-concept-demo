# Seeder Concept Demo

A visual demonstration of the Seeder experience, presented as an interactive slideshow with animated scenes and characters.

## Features

- 16:9 aspect ratio story optimized for wide screens
- Animated character interactions with chat and thought bubbles
- Keyboard navigation (left/right arrows, space)
- Progress indicator
- Customizable story content via JSON
- Smooth transitions between scenes
- TypeScript support for type safety

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm 9.0.0 or later

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/seeder-concept-demo.git
cd seeder-concept-demo
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Creating Storys

Storys are defined using a JSON structure that includes characters and scenes. Here's an example:

```typescript
const story = {
  characters: [
    {
      name: "John",
      type: "human",
      role: "volunteer",
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
      characters: ["Seeder", "John"],
      interactions: [
        {
          character: "Seeder",
          type: "think",
          text: "Analyzing volunteer profile...",
        },
        {
          character: "Seeder",
          type: "speak",
          text: "Hi John! What motivates you to volunteer?",
        },
      ],
    },
  ],
};
```

### Scene Types

The following scene types are available:

- `interview`: Initial volunteer assessment
- `initiation`: Creating a new volunteer opportunity
- `request`: Matching volunteers with opportunities
- `fulfillment`: Confirming volunteer matches
- `connection`: Volunteer and organizer connection
- `reflection`: Post-volunteering feedback
- `review`: Organizer feedback

### Character Types

Characters can be either:

- `human` (volunteers or organizers)
- `ai` (Seeder)

### Interaction Types

Interactions can be:

- `speak`: Shows as a chat bubble
- `think`: Shows as a thought bubble (terminal-style for AI)

## Development

### Project Structure

```
src/
  ├── app/
  │   └── page.tsx       # Main application page
  ├── components/
  │   ├── Layout.tsx     # 16:9 aspect ratio container
  │   ├── Story.tsx # Main story component
  │   ├── characters/
  │   │   ├── Human.tsx  # Human character component
  │   │   └── Seeder.tsx # AI character component
  │   ├── bubbles/
  │   │   ├── ChatBubble.tsx  # Speech bubble component
  │   │   └── ThoughtBubble.tsx # Thought bubble component
  │   └── scenes/
  │       └── Scene.tsx  # Base scene component
  └── types/
      └── index.ts      # TypeScript type definitions
```

### Technologies Used

- Next.js 14
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- React Type Animation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
