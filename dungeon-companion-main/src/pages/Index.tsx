import { useState, useCallback } from "react";
import { useGame } from "@/context/GameContext";
import SplashScreen from "@/components/SplashScreen";
import MainMenu from "@/components/MainMenu";
import GameSetup from "@/components/GameSetup";

const Index = () => {
  const { state } = useGame();
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  // Show setup if game hasn't been configured yet
  if (!state.isSetupComplete) {
    return <GameSetup />;
  }

  return <MainMenu />;
};

export default Index;