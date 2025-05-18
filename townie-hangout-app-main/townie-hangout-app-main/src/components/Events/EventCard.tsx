
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { Event } from '@/data/mockData';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface EventCardProps {
  event: Event;
  showActions?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, showActions = false }) => {
  const formattedDate = format(new Date(event.startDate), 'MMM dd, yyyy');

  return (
    <div className="event-card h-full flex flex-col">
      <div className="relative">
        <img 
          src={event.imageUrl} 
          alt={event.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <Badge className="absolute top-3 right-3 bg-pulse-purple">
          {event.category}
        </Badge>
      </div>
      
      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-lg font-bold mb-1 line-clamp-1">{event.title}</h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <Calendar size={16} className="mr-1" />
          <span className="text-sm">{formattedDate}</span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2 text-sm flex-grow">
          {event.description}
        </p>
        
        <div className="mt-auto">
          <Link 
            to={`/events/${event.id}`}
            className="inline-block bg-pulse-purple text-white px-4 py-2 rounded-lg text-center w-full hover:bg-opacity-90 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
