
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useEventStore } from '@/stores/eventStore';
import EventGrid from '@/components/Events/EventGrid';
import CategoryFilter from '@/components/Events/CategoryFilter';
import { EventCategory } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Search as SearchIcon } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';

const Search = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';
  const { searchEvents } = useEventStore();
  
  const [searchQuery, setSearchQuery] = useState(query);
  const [searchResults, setSearchResults] = useState(searchEvents(query));
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | null>(null);
  
  useEffect(() => {
    // Get the initial search results
    setSearchResults(searchEvents(query));
    setSearchQuery(query);
  }, [query, searchEvents]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const results = searchEvents(searchQuery);
    setSearchResults(results);
  };
  
  // Filter by category if selected
  const filteredResults = selectedCategory 
    ? searchResults.filter(event => event.category === selectedCategory)
    : searchResults;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            {query ? `Search Results for "${query}"` : 'Search Events'}
          </h1>
          
          <form onSubmit={handleSearchSubmit} className="relative max-w-lg">
            <Input
              type="search"
              placeholder="Search for events..."
              className="pl-10 pr-4 py-2"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <SearchIcon
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </form>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 shrink-0">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </aside>
          
          <div className="flex-1">
            <div className="mb-4">
              <p className="text-gray-600">
                {filteredResults.length} results found
              </p>
            </div>
            
            <EventGrid events={filteredResults} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;
