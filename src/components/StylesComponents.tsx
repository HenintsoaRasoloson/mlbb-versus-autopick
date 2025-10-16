import styled from "styled-components";
import { colors } from "../styles/theme";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 2rem;
`;

export const HeaderTitle = styled.h1`
  color: ${colors.highlight};
  text-shadow: 2px 2px 0 ${colors.primary};
  animation: glitch 1s infinite;
  font-size: 3.5rem;
  margin: 2rem 0 1rem;
  text-align: center;

  @keyframes glitch {
    0% {
      transform: skew(0deg);
    }
    20% {
      transform: skew(2deg);
    }
    40% {
      transform: skew(-1deg);
    }
    60% {
      transform: skew(1deg);
    }
    80% {
      transform: skew(-2deg);
    }
    100% {
      transform: skew(0deg);
    }
  }
`;

export const DescriptionText = styled.p`
  color: ${colors.text};
  font-size: 1rem;
  text-align: center;
  margin-bottom: 2rem;
  max-width: 600px;
  font-style: italic;
`;

export const FiltersContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 2rem 0;
  flex-wrap: wrap;
`;

export const FilterCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: white;
  cursor: pointer;
`;

export const LaunchButton = styled.button`
  background: linear-gradient(135deg, #ffd700, #ffb347);
  color: #1a1a3a;
  border: none;
  padding: 1rem 3rem;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
  margin: 2rem auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.2s;
  display: block;
  animation: pulse 1.5s ease-in-out infinite;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  }

  &:disabled {
    background: #555;
    color: #aaa;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    animation: none;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.02);
    }
    100% {
      transform: scale(1);
    }
  }
`;
