import React from 'react';
import { GameContext, useGameStateManagement } from './GameContext';

interface GameProviderProps {
  children?: React.ReactNode;
}

export default function GameProvider({ children }: GameProviderProps) {
  const contextValue = useGameStateManagement();
  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
}
