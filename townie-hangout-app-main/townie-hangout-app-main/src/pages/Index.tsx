
import React, { useState } from 'react';
import { useEventStore } from '@/stores/eventStore';
import EventGrid from '@/components/Events/EventGrid';
import CategoryFilter from '@/components/Events/CategoryFilter';
import { EventCategory } from '@/data/mockData';
import Navbar from '@/components/Layout/Navbar';

const Index = () => {
  const { events } = useEventStore();
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | null>(null);
  
  // Filter approved events
  const approvedEvents = events.filter(event => event.approved);
  
  // Apply category filter if selected
  const filteredEvents = selectedCategory 
    ? approvedEvents.filter(event => event.category === selectedCategory)
    : approvedEvents;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 shrink-0">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </aside>
          
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Community Events</h1>
              <p className="text-gray-600">
                Discover local events happening around you
              </p>
            </div>
            
            <EventGrid events={filteredEvents} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
