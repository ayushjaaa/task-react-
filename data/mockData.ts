import { Player, Match, Lodging, TravelInfo, Notification, FoodMenu, Teammate, Roommate } from '../types';

export const mockPlayer: Player = {
  name: 'John Athlete',
  email: 'john.athlete@email.com',
  mobile: '+91 9876543210',
  address: '123 Stadium Road, Sports City',
  province: 'Karnataka',
  sport: 'Basketball',
  category: "Men's Senior",
  photoUrl: 'https://i.pravatar.cc/150?u=johnathlete',
};

export const mockMatches: Match[] = [
  { 
    id: 1, 
    sport: 'Basketball', 
    category: "Men's Senior",
    date: 'Today', 
    time: '2:30 PM', 
    venue: 'Court A', 
    address: 'Court A - Main Stadium',
    opponent: 'Team Phoenix', 
    status: 'Upcoming',
    teammates: [
        { initials: 'MR', name: 'Mike Ross' },
        { initials: 'SC', name: 'Sarah Connor' },
        { initials: 'JD', name: 'John Doe' },
        { initials: 'JS', name: 'Jane Smith' },
    ]
  },
  { 
    id: 2, 
    sport: 'Volleyball', 
    category: "Mixed",
    date: 'Tomorrow', 
    time: '10:00 AM', 
    venue: 'Court B', 
    address: 'Court B - Beach Arena',
    opponent: 'Team Thunder', 
    status: 'Upcoming',
    teammates: [
        { initials: 'JD', name: 'John Doe' },
        { initials: 'JS', name: 'Jane Smith' },
    ]
  },
  { 
    id: 3, 
    sport: 'Cricket', 
    category: "Men's Senior",
    date: 'Yesterday', 
    time: '9:00 AM', 
    venue: 'Ground 1', 
    address: 'Main Cricket Ground',
    opponent: 'Team Eagles', 
    status: 'Completed' 
  },
];

export const mockLodging: Lodging = {
    hotelName: 'Grand Sports Resort',
    address: '123 Stadium Road, Sports City',
    mapLink: 'https://maps.google.com',
    roomNumber: 'A-102',
    checkIn: 'March 10, 2025',
    checkOut: 'March 15, 2025',
    roommates: [
        { initials: 'MR', name: 'Mike Ross' },
        { initials: 'JD', name: 'John Doe' },
    ]
};

export const mockTravelInfo: TravelInfo = {
    mode: 'Flight',
    arrivalDateTime: '2025-01-12, 08:00 PM',
    departureDateTime: '2025-01-18, 10:00 AM',
    pickupLocation: 'Kempegowda International Airport (BLR), Gate 5',
    dropLocation: 'Kempegowda International Airport (BLR), Departures',
    emergencyContact: '+91 99887 76655',
};

export const mockNotifications: Notification[] = [
    { id: 1, title: 'Venue Change Alert', message: 'Your upcoming match venue has been changed to Koramangala Indoor Stadium.', timestamp: '2h ago', linkTo: 'sports', read: false },
    { id: 2, title: 'Match Rescheduled', message: 'Your match against Ankit Sharma is now at 10:30 AM.', timestamp: '1d ago', linkTo: 'sports', read: false },
    { id: 3, title: 'Dinner Menu Update', message: 'Tonight\'s dinner includes a special continental menu. Enjoy!', timestamp: '2d ago', linkTo: 'bookings', read: true },
    { id: 4, title: 'Welcome to KhelKhud 2025!', message: 'We are excited to have you. Check your schedule and lodging details.', timestamp: '3d ago', linkTo: 'home', read: true },
];

export const mockFoodMenu: FoodMenu = {
  today: [
    { name: 'Breakfast', time: '7:00 AM - 9:00 AM', status: 'Available Now', items: ['Idli', 'Dosa', 'Coffee', 'Fruits'] },
    { name: 'Lunch', time: '12:30 PM - 2:30 PM', status: 'Upcoming', items: ['Rice', 'Dal', 'Vegetables', 'Curd', 'Chapati'] },
    { name: 'Dinner', time: '7:30 PM - 9:30 PM', status: 'Upcoming', items: ['Biryani', 'Raita', 'Salad', 'Dessert'] },
  ],
  tomorrow: [
    { name: 'Breakfast', time: '7:00 AM - 9:00 AM', status: 'Upcoming', items: ['Poha', 'Jalebi', 'Milk'] },
    { name: 'Lunch', time: '12:30 PM - 2:30 PM', status: 'Upcoming', items: ['Rajma', 'Chawal', 'Salad'] },
    { name: 'Dinner', time: '7:30 PM - 9:30 PM', status: 'Upcoming', items: ['Paneer Tikka', 'Naan', 'Soup'] },
  ]
};
