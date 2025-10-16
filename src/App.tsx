import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import Filters from "./components/Filters";
import { HeroModal } from "./components/HeroModal";
import { ShuffleDisplay } from "./components/ShuffleDisplay";
import { fetchHeroList } from "./services/api";
import { GlobalStyles } from "./styles/GlobalStyles";
import type { Hero, Role } from "./types/Hero";
import { LaunchButton } from "./components/LaunchButton";
import {
  DescriptionText,
  PageContainer,
  HeaderTitle,
} from "./components/StylesComponents";
import { Loading } from "./components/Loading";

import { Analytics } from "@vercel/analytics/next";

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [shuffleKey, setShuffleKey] = useState(0);

  const {
    data: heroes = [],
    isLoading,
    error,
  } = useQuery<Hero[], Error>({
    queryKey: ["heroes"],
    queryFn: fetchHeroList,
    staleTime: 24 * 60 * 60 * 1000,
  });

  const filteredHeroes = selectedRoles.length
    ? heroes.filter((hero) =>
        hero.roles.some((role) => selectedRoles.includes(role))
      )
    : heroes;

  const handlePickComplete = (hero: Hero) => {
    setSelectedHero(hero);
    setIsModalOpen(true);
    setIsShuffling(false);
  };

  const handleLaunch = () => {
    setIsPaused(true);
    setTimeout(() => {
      setIsPaused(false);
      setIsShuffling(true);
      setShuffleKey((prev) => prev + 1);
    }, 1000);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <PageContainer>
      <Analytics />
      <GlobalStyles />
      <HeaderTitle>MLBB 1v1 Versus</HeaderTitle>
      <DescriptionText>
        Select your roles and click "PICK" to randomly choose a hero for your
        1v1 match.
      </DescriptionText>
      <Filters onFilterChange={setSelectedRoles} />
      <LaunchButton onClick={handleLaunch} />
      {isPaused && (
        <div style={{ color: "#EEE", margin: "1rem", fontSize: "1.2rem" }}>
          Getting ready...
        </div>
      )}
      {isShuffling && (
        <ShuffleDisplay
          key={shuffleKey}
          heroes={filteredHeroes}
          isShuffling={isShuffling}
          onPickComplete={handlePickComplete}
        />
      )}
      <AnimatePresence>
        {isModalOpen && selectedHero && (
          <HeroModal
            hero={selectedHero}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </PageContainer>
  );
}

export default App;
