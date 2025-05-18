
import React from 'react';
import EventCard from './EventCard';
import { Event } from '@/data/mockData';

interface EventGridProps {
  events: Event[];
  showActions?: boolean;
}

const EventGrid: React.FC<EventGridProps> = ({ events, showActions = false }) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-muted-foreground">No events found</h3>
        <p className="text-muted-foreground opacity-75 mt-2">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} showActions={showActions} />
      ))}
    </div>
  );
};

export default EventGrid;
