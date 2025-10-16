import styled from "styled-components";

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    135deg,
    rgba(10, 10, 40, 0.9),
    rgba(20, 20, 60, 0.9)
  );
  color: white;
  box-sizing: border-box;
`;

const LoadingTitle = styled.h1`
  color: #ffd700;
  text-shadow: 2px 2px 0 #000;
  animation: glitch 1s infinite;
  font-size: 3rem;
  margin-bottom: 2rem;

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

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 215, 0, 0.3);
  border-radius: 50%;
  border-top-color: #ffd700;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: 2rem;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
  color: #eee;
  animation: pulse 1.5s ease-in-out infinite;

  @keyframes pulse {
    0% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }
`;

export const Loading = () => {
  return (
    <LoadingContainer>
      <LoadingTitle>MLBB 1v1 Tournament</LoadingTitle>
      <LoadingSpinner />
      <LoadingText>Chargement en cours ...</LoadingText>
    </LoadingContainer>
  );
};
