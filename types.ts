import { ReactNode } from "react";

export type View = 'login' | 'otp' | 'registration' | 'main';

// Updated navigation views
export type MainView = 'home' | 'sports' | 'members' | 'bookings' | 'profile';

export type MatchStatus = 'Completed' | 'Upcoming';

export interface Teammate {
  initials: string;
  name: string;
}

export interface Match {
  id: number;
  sport: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  opponent: string;
  status: MatchStatus;
  teammates?: Teammate[];
}

export interface Player {
    name: string;
    email: string;
    mobile: string;
    address: string;
    province: string;
    sport: string;
    category: string;
    photoUrl: string;
}

export interface Roommate {
    initials: string;
    name: string;
}

export interface Lodging {
    hotelName: string;
    address: string;
    mapLink: string;
    roomNumber: string;
    checkIn: string;
    checkOut: string;
    roommates: Roommate[];
}

export interface TravelInfo {
    mode: 'Bus' | 'Train' | 'Flight';
    arrivalDateTime: string;
    departureDateTime: string;
    pickupLocation: string;
    dropLocation: string;
    emergencyContact: string;
}

export interface Notification {
    id: number;
    title: string;
    message: string;
    timestamp: string;
    linkTo: MainView;
    read: boolean;
}

export interface MenuItem {
  name: string;
  time: string;
  status: 'Available Now' | 'Upcoming';
  items: string[];
}

export interface FoodMenu {
    today: MenuItem[];
    tomorrow: MenuItem[];
}
