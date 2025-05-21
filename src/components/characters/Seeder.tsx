"use client";

import { motion } from "framer-motion";

interface SeederProps {
  isActive?: boolean;
  position: "left" | "right";
}

export function Seeder({ isActive = false, position }: SeederProps) {
  return (
    <motion.div
      className={`absolute ${
        position === "left" ? "left-[10%]" : "right-[10%]"
      } bottom-0 w-48 h-96`}
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: isActive ? 1 : 0.2,
        y: 0,
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Tree with brain-like canopy */}
      <svg
        viewBox="0 0 100 200"
        className="w-full h-full"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
      >
        {/* Trunk */}
        <line x1="50" y1="180" x2="50" y2="80" />
        {/* Brain-like canopy */}
        <path
          d="M30,80 C30,50 70,50 70,80 C70,110 30,110 30,80"
          fill="currentColor"
          fillOpacity="0.1"
        />
        <path d="M25,60 C25,30 75,30 75,60" fill="none" />
        <path d="M35,40 C35,20 65,20 65,40" fill="none" />
        {/* Roots */}
        <path d="M50,180 L30,200 M50,180 L70,200" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}
