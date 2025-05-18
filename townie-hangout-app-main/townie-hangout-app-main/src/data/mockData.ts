
export interface Event {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  location: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  organizer: string;
  imageUrl: string;
  registrationRequired: boolean;
  approved: boolean;
  createdBy: string;
}

export type EventCategory = 
  | 'Garage Sale'
  | 'Sports Match'
  | 'Community Class'
  | 'Volunteer Opportunity'
  | 'Exhibition'
  | 'Festival';

export const eventCategories: EventCategory[] = [
  'Garage Sale',
  'Sports Match',
  'Community Class',
  'Volunteer Opportunity',
  'Exhibition',
  'Festival'
];

export const events: Event[] = [
  {
    id: '1',
    title: 'Community Garage Sale',
    description: 'Join us for our annual community garage sale! Find treasures, vintage items, and great deals from multiple households in one location.',
    category: 'Garage Sale',
    location: '123 Main Street, Neighborhood Park',
    startDate: '2025-05-25',
    endDate: '2025-05-25',
    startTime: '09:00',
    endTime: '16:00',
    organizer: 'Neighborhood Association',
    imageUrl: 'https://images.unsplash.com/photo-1563464716591-0e2bdcdae4f7?q=80&w=1000&auto=format&fit=crop',
    registrationRequired: false,
    approved: true,
    createdBy: '2'
  },
  {
    id: '2',
    title: 'Local Cricket Tournament',
    description: 'Annual cricket tournament between neighborhood teams. Come play or cheer for your favorite team!',
    category: 'Sports Match',
    location: 'Community Sports Field',
    startDate: '2025-06-05',
    endDate: '2025-06-07',
    startTime: '14:00',
    endTime: '19:00',
    organizer: 'Sports Club',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1000&auto=format&fit=crop',
    registrationRequired: true,
    approved: true,
    createdBy: '1'
  },
  {
    id: '3',
    title: 'Weekend Yoga in the Park',
    description: 'Free yoga session for all skill levels. Bring your own mat and water bottle!',
    category: 'Community Class',
    location: 'Central Park, East Lawn',
    startDate: '2025-05-22',
    endDate: '2025-05-22',
    startTime: '08:00',
    endTime: '09:30',
    organizer: 'Wellness Community',
    imageUrl: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?q=80&w=1000&auto=format&fit=crop',
    registrationRequired: false,
    approved: true,
    createdBy: '2'
  },
  {
    id: '4',
    title: 'Beach Cleanup Drive',
    description: 'Help us clean our local beach! Equipment will be provided. Participants will receive a free t-shirt.',
    category: 'Volunteer Opportunity',
    location: 'Sunset Beach',
    startDate: '2025-06-12',
    endDate: '2025-06-12',
    startTime: '07:00',
    endTime: '11:00',
    organizer: 'Environmental Protection Group',
    imageUrl: 'https://images.unsplash.com/photo-1618477461853-cf6ed5c91c15?q=80&w=1000&auto=format&fit=crop',
    registrationRequired: true,
    approved: true,
    createdBy: '1'
  },
  {
    id: '5',
    title: 'Local Art Exhibition',
    description: 'Showcasing artwork from local artists. Free entry, refreshments provided.',
    category: 'Exhibition',
    location: 'Community Art Center',
    startDate: '2025-06-15',
    endDate: '2025-06-20',
    startTime: '10:00',
    endTime: '18:00',
    organizer: 'Arts Council',
    imageUrl: 'https://images.unsplash.com/photo-1594932858784-8606f48f02a3?q=80&w=1000&auto=format&fit=crop',
    registrationRequired: false,
    approved: true,
    createdBy: '2'
  },
  {
    id: '6',
    title: 'Summer Music Festival',
    description: 'Annual music festival featuring local bands and food vendors.',
    category: 'Festival',
    location: 'Riverside Park',
    startDate: '2025-07-04',
    endDate: '2025-07-06',
    startTime: '12:00',
    endTime: '22:00',
    organizer: 'Music Society',
    imageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1000&auto=format&fit=crop',
    registrationRequired: true,
    approved: false,
    createdBy: '2'
  }
];

export interface Attendee {
  id: string;
  eventId: string;
  name: string;
  email: string;
  phone: string;
  additionalAttendees: number;
}

export const attendees: Attendee[] = [
  {
    id: '1',
    eventId: '3',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '555-1234',
    additionalAttendees: 1
  },
  {
    id: '2',
    eventId: '2',
    name: 'Michael Brown',
    email: 'michael@example.com',
    phone: '555-5678',
    additionalAttendees: 3
  }
];
