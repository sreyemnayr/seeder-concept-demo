import { Story as StoryType } from "@/types";
import { motion } from "framer-motion";
import { Layout } from "./Layout";

interface StoryMenuProps {
  stories: StoryType[];
  onSelectStory: (story: StoryType) => void;
}

export function StoryMenu({ stories, onSelectStory }: StoryMenuProps) {
  return (
    <Layout>
      <div className="w-full h-full flex flex-col items-center justify-center p-8">
        <motion.h1
          className="text-4xl font-bold mb-12 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Seeder Stories
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          {stories.map((story) => (
            <motion.div
              key={story.title}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => onSelectStory(story)}
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                  {story.title}
                </h2>
                <div className="space-y-2">
                  <p className="text-gray-600">{story.scenes.length} scenes</p>
                  <p className="text-gray-600">
                    {story.characters.filter((c) => c.type === "human").length}{" "}
                    characters
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
