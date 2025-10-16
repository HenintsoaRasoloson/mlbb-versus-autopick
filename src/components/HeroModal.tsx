import { motion } from "framer-motion";
import styled from "styled-components";
import type { Hero } from "../types/Hero";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 20, 50, 0.95),
    rgba(0, 0, 30, 0.95)
  );
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
`;

const HeroCardFrame = styled.div`
  position: relative;
  width: 200px;
  height: 600px;
  background-image: url("/images/frame.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem;
`;

const HeroImageContainer = styled.div`
  width: 80%;
  height: auto;
  border-radius: 50%;
  overflow: hidden;
  margin-top: 3rem;
  border: 2px solid rgba(255, 215, 0, 0.8);
  background: rgba(10, 10, 30, 0.7);
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeroNameContainer = styled.div`
  width: 80%;
  padding: 0.2rem;
  text-align: center;
  margin: 2rem 0;
  background: rgba(0, 0, 20, 0.5);
  border-radius: 4px;
`;

const HeroName = styled.h2`
  font-family: "Rajdhani", sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffd700;
  text-shadow: 0 0 5px rgba(255, 215, 0, 0.7);
  margin: 0;
`;

const ContinueButton = styled.button`
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 30px;
  cursor: pointer;
  margin: 1rem auto;
  margin-top: 5rem;
  transition: all 0.2s;
  background: transparent;
`;

const LightEffect = styled.div`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 120%;
  height: 100px;
  background: radial-gradient(
    ellipse at center,
    rgba(255, 215, 0, 0.3) 0%,
    transparent 70%
  );
  z-index: -1;
`;
const HeroRoles = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0.5rem 0;
`;
const RoleTag = styled.span`
  background: rgba(255, 215, 0, 0.2);
  color: #fff;
  padding: 0.6rem 1rem;
  margin: 0.2rem;
  border-radius: 4px;
  font-size: 0.9rem;
  text-transform: uppercase;
  font-weight: bold;
`;

interface HeroModalProps {
  hero: Hero;
  onClose: () => void;
}

export const HeroModal: React.FC<HeroModalProps> = ({ hero, onClose }) => {
  return (
    <ModalBackground>
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: -50 }}
        transition={{ type: "spring", damping: 10 }}
      >
        <HeroCardFrame>
          <LightEffect />
          <HeroImageContainer>
            <HeroImage
              src={hero.headImage}
              alt={hero.name}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/heroes/default.jpg";
              }}
            />
          </HeroImageContainer>
          <HeroNameContainer>
            <HeroName>{hero.name}</HeroName>
          </HeroNameContainer>
          <HeroRoles>
            {hero.roles.map((role, index) => (
              <RoleTag key={index}>{role}</RoleTag>
            ))}
          </HeroRoles>
        </HeroCardFrame>
        <ContinueButton onClick={onClose}>Tap to re-pick ...</ContinueButton>
      </motion.div>
    </ModalBackground>
  );
};
