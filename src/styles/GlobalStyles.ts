import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, rgba(10, 10, 40, 0.9), rgba(20, 20, 60, 0.9));
    color: white;
  }

  @keyframes glitch {
    0% { transform: skew(0deg); }
    20% { transform: skew(2deg); }
    40% { transform: skew(-1deg); }
    60% { transform: skew(1deg); }
    80% { transform: skew(-2deg); }
    100% { transform: skew(0deg); }
  }

  @keyframes pulse {
    0% { opacity: 0.8; }
    50% { opacity: 1; }
    100% { opacity: 0.8; }
  }
`;
