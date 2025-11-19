import React, { createContext, useState, useContext, ReactNode } from 'react';
import { MainView, Player, Match, Lodging, FoodMenu } from '../types';
import { mockPlayer, mockMatches, mockTravelInfo, mockLodging, mockNotifications, mockFoodMenu } from '../data/mockData';

interface AppContextType {
  activeView: MainView;
  setActiveView: (view: MainView) => void;
  selectedMatch: Match | null;
  setSelectedMatch: (match: Match | null) => void;
  playerData: Player;
  travelInfo: typeof mockTravelInfo;
  updateTravelInfo: (newInfo: typeof mockTravelInfo) => void;
  lodgingInfo: Lodging;
  notifications: typeof mockNotifications;
  matches: Match[];
  setMatches: React.Dispatch<React.SetStateAction<Match[]>>;
  foodMenu: FoodMenu;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [activeView, setActiveView] = useState<MainView>('home');
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [playerData] = useState<Player>(mockPlayer);
  const [travelInfo, setTravelInfo] = useState(mockTravelInfo);
  const [lodgingInfo] = useState(mockLodging);
  const [notifications] = useState(mockNotifications);
  const [matches, setMatches] = useState(mockMatches);
  const [foodMenu] = useState(mockFoodMenu);


  const updateTravelInfo = (newInfo: typeof mockTravelInfo) => {
    setTravelInfo(newInfo);
  };

  const value = {
    activeView,
    setActiveView,
    selectedMatch,
    setSelectedMatch,
    playerData,
    travelInfo,
    updateTravelInfo,
    lodgingInfo,
    notifications,
    matches,
    setMatches,
    foodMenu,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
