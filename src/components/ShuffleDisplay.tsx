import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";
import type { Hero } from "../types/Hero";

const FrameImage = styled.div`
  width: 130px;
  height: 180px;
  background-image: url("/images/frame.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const ShuffleContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 2rem;
  overflow: hidden;
`;

interface ShuffleDisplayProps {
  heroes: Hero[];
  isShuffling: boolean;
  onPickComplete: (hero: Hero) => void;
}

export const ShuffleDisplay: React.FC<ShuffleDisplayProps> = ({
  heroes,
  isShuffling,
  onPickComplete,
}) => {
  const [frames, setFrames] = useState<number[]>([]);
  const [isPicking, setIsPicking] = useState(false);
  const [pickedHero, setPickedHero] = useState<Hero | null>(null);
  const fixedFrameCount = 6;

  useEffect(() => {
    if (!isShuffling) return;

    const initialFrames = Array.from({ length: fixedFrameCount }, (_, i) => i);
    setFrames(initialFrames);

    const shuffleInterval = setInterval(() => {
      setFrames([...initialFrames].sort(() => Math.random() - 0.5));
    }, 300);

    const shuffleTimeout = setTimeout(() => {
      clearInterval(shuffleInterval);
      const randomHero = heroes[Math.floor(Math.random() * heroes.length)];
      setPickedHero(randomHero);
      setIsPicking(true);

      setTimeout(() => {
        onPickComplete(randomHero);
        setIsPicking(false);
      }, 1500);
    }, 2500);

    return () => {
      clearInterval(shuffleInterval);
      clearTimeout(shuffleTimeout);
    };
  }, [heroes, isShuffling, onPickComplete]);

  if (!isShuffling) return null;

  return (
    <ShuffleContainer>
      <AnimatePresence>
        {!isPicking ? (
          <>
            {frames.map((frameId) => (
              <motion.div
                key={frameId}
                layout
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: 1,
                  scale: 1.5,
                  x: Math.random() * 30 - 15,
                  rotate: Math.random() * 10 - 5,
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{
                  type: "spring",
                  damping: 10,
                  stiffness: 100,
                  duration: 0.5,
                }}
              >
                <FrameImage />
              </motion.div>
            ))}
          </>
        ) : (
          pickedHero && (
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 2.5 }}
              transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
              style={{
                width: "130px",
                height: "180px",
              }}
            >
              <FrameImage />
            </motion.div>
          )
        )}
      </AnimatePresence>
    </ShuffleContainer>
  );
};
