import React, { createContext, useState, useContext, ReactNode } from 'react';
import { MainView, Player, Match, Lodging, FoodMenu, View } from '../types';
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
  registrationData: any;
  setRegistrationData: React.Dispatch<React.SetStateAction<any>>;
  setRootView: (view: View) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
  setRootView: (view: View) => void;
}

export const AppProvider = ({ children, setRootView }: AppProviderProps) => {
  const [activeView, setActiveView] = useState<MainView>('home');

  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [playerData] = useState<Player>(mockPlayer);
  const [travelInfo, setTravelInfo] = useState(mockTravelInfo);
  const [lodgingInfo] = useState(mockLodging);
  const [notifications] = useState(mockNotifications);
  const [matches, setMatches] = useState(mockMatches);
  const [foodMenu] = useState(mockFoodMenu);

  // New state: registrationData
  const [registrationData, setRegistrationData] = useState<any>(() => {
    const saved = localStorage.getItem("formdata");
    return saved ? JSON.parse(saved) : null;
  });

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
    registrationData,
    setRegistrationData,
    setRootView
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
