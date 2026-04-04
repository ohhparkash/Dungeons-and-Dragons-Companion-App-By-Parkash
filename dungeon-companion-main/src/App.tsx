import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GameProvider } from "@/context/GameContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import DiceRoller from "./pages/DiceRoller.tsx";
import DungeonMasterGuide from "./pages/DungeonMasterGuide.tsx";
import PlayersGuide from "./pages/PlayersGuide.tsx";
import BoardGuide from "./pages/BoardGuide.tsx";
import ScenarioMaker from "./pages/ScenarioMaker.tsx";
import CardCompendium from "./pages/CardCompendium.tsx";
import TurnBar from "./components/TurnBar.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <GameProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="pb-14">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dm-guide" element={<DungeonMasterGuide />} />
              <Route path="/player-guide" element={<PlayersGuide />} />
              <Route path="/board-guide" element={<BoardGuide />} />
              <Route path="/scenario-maker" element={<ScenarioMaker />} />
              <Route path="/dice-roller" element={<DiceRoller />} />
              <Route path="/card-compendium" element={<CardCompendium />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <TurnBar />
        </BrowserRouter>
      </GameProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;