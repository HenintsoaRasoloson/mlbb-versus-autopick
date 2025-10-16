import { motion } from "framer-motion";
import styled from "styled-components";
import { colors } from "../styles/theme";

const StyledButton = styled(motion.button)`
  background: linear-gradient(to right, ${colors.primary}, ${colors.secondary});
  color: ${colors.text};
  padding: 12px 24px;
  border: none;
  border-radius: 50%;
  width: 300px;
  height: 300px;
  font-size: 4rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 0 0 2px ${colors.highlight};
  }
`;

interface ButtonProps {
  onClick: () => void;
}

export const LaunchButton: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <StyledButton
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        boxShadow: [
          "0 0 0 0 rgba(93, 63, 211, 0.7)",
          "0 0 0 8px rgba(93, 63, 211, 0)",
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      onClick={onClick}
    >
      PICK
    </StyledButton>
  );
};
