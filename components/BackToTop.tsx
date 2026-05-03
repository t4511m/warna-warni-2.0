"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="fixed bottom-5 left-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink text-paper shadow-card-hover md:bottom-8 md:left-8"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden
          >
            <path
              d="M7 11V3M3 7l4-4 4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
