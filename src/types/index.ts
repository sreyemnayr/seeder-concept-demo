import { Character } from "./character";
export type CharacterType = "human" | "ai";
export type CharacterRole = "volunteer" | "organizer" | "agent";

export type InteractionType = "speak" | "think";

export interface Interaction {
  character: string;
  type: InteractionType;
  text: string;
}

export type SceneType =
  | "interview"
  | "initiation"
  | "request"
  | "fulfillment"
  | "connection"
  | "reflection"
  | "review";

export interface Scene {
  title: string;
  type: SceneType;
  characters: string[];
  interactions: Interaction[];
}

export interface Story {
  title: string;
  characters: Character[];
  scenes: Scene[];
}

export interface ChatMessage {
  text: string;
  direction: "left" | "right";
  isNew: boolean;
  type?: "speak" | "think";
  character?: string;
}
