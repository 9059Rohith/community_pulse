
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Event, EventCategory, events as mockEvents } from '../data/mockData';
import { toast } from 'sonner';

interface EventStoreContextType {
  events: Event[];
  getEventById: (id: string) => Event | undefined;
  getUserEvents: (userId: string) => Event[];
  createEvent: (event: Omit<Event, 'id' | 'approved'>) => string;
  updateEvent: (id: string, event: Partial<Event>) => boolean;
  deleteEvent: (id: string) => boolean;
  approveEvent: (id: string, approved: boolean) => boolean;
  getEventsByCategory: (category: EventCategory) => Event[];
  searchEvents: (query: string) => Event[];
}

const EventStoreContext = createContext<EventStoreContextType>({
  events: [],
  getEventById: () => undefined,
  getUserEvents: () => [],
  createEvent: () => '',
  updateEvent: () => false,
  deleteEvent: () => false,
  approveEvent: () => false,
  getEventsByCategory: () => [],
  searchEvents: () => [],
});

export const EventStoreProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>(mockEvents);

  // Get a specific event by ID
  const getEventById = (id: string) => {
    return events.find(event => event.id === id);
  };

  // Get all events created by a specific user
  const getUserEvents = (userId: string) => {
    return events.filter(event => event.createdBy === userId);
  };

  // Create a new event
  const createEvent = (eventData: Omit<Event, 'id' | 'approved'>) => {
    const newId = String(events.length + 1);
    
    const newEvent: Event = {
      ...eventData,
      id: newId,
      approved: false, // New events require approval
    };
    
    setEvents([...events, newEvent]);
    toast.success('Event created successfully! Waiting for approval.');
    
    return newId;
  };

  // Update an existing event
  const updateEvent = (id: string, updatedData: Partial<Event>) => {
    const eventIndex = events.findIndex(event => event.id === id);
    
    if (eventIndex === -1) {
      toast.error('Event not found');
      return false;
    }
    
    const updatedEvents = [...events];
    updatedEvents[eventIndex] = {
      ...updatedEvents[eventIndex],
      ...updatedData,
      approved: false, // Updated events need to be re-approved
    };
    
    setEvents(updatedEvents);
    toast.success('Event updated successfully! Waiting for re-approval.');
    
    return true;
  };

  // Delete an event
  const deleteEvent = (id: string) => {
    const eventIndex = events.findIndex(event => event.id === id);
    
    if (eventIndex === -1) {
      toast.error('Event not found');
      return false;
    }
    
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents);
    toast.success('Event deleted successfully!');
    
    return true;
  };

  // Approve or reject an event (admin function)
  const approveEvent = (id: string, approved: boolean) => {
    const eventIndex = events.findIndex(event => event.id === id);
    
    if (eventIndex === -1) {
      toast.error('Event not found');
      return false;
    }
    
    const updatedEvents = [...events];
    updatedEvents[eventIndex] = {
      ...updatedEvents[eventIndex],
      approved,
    };
    
    setEvents(updatedEvents);
    toast.success(`Event ${approved ? 'approved' : 'rejected'} successfully!`);
    
    return true;
  };

  // Get events by category
  const getEventsByCategory = (category: EventCategory) => {
    return events.filter(event => event.category === category && event.approved);
  };

  // Search events
  const searchEvents = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    
    return events.filter(event => 
      (event.title.toLowerCase().includes(lowerCaseQuery) || 
      event.description.toLowerCase().includes(lowerCaseQuery)) &&
      event.approved
    );
  };

  return (
    <EventStoreContext.Provider 
      value={{
        events,
        getEventById,
        getUserEvents,
        createEvent,
        updateEvent,
        deleteEvent,
        approveEvent,
        getEventsByCategory,
        searchEvents
      }}
    >
      {children}
    </EventStoreContext.Provider>
  );
};

export const useEventStore = () => useContext(EventStoreContext);
