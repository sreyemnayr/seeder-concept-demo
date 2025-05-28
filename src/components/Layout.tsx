"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useIsLandscape } from "@/hooks/useMediaQuery";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const landscape = useIsLandscape();

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        className={`w-full  max-h-screen bg-white rounded-lg shadow-lg overflow-hidden ${
          landscape
            ? "max-w-[177.78vh] h-[56.25vw] max-h-screen"
            : "max-w-[56.25vh] h-[177.78vh] max-h-screen"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
