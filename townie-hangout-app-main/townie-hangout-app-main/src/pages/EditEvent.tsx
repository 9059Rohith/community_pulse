
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEventStore } from '@/stores/eventStore';
import { eventCategories, EventCategory } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Navbar from '@/components/Layout/Navbar';

const EditEvent = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { getEventById, updateEvent } = useEventStore();
  const navigate = useNavigate();
  
  const event = getEventById(id || '');
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<EventCategory>(eventCategories[0]);
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [registrationRequired, setRegistrationRequired] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
      setCategory(event.category);
      setLocation(event.location);
      setStartDate(event.startDate);
      setEndDate(event.endDate);
      setStartTime(event.startTime);
      setEndTime(event.endTime);
      setOrganizer(event.organizer);
      setImageUrl(event.imageUrl);
      setRegistrationRequired(event.registrationRequired);
    }
  }, [event]);
  
  if (!user) {
    navigate('/login');
    return null;
  }
  
  if (!event) {
    navigate('/dashboard');
    return null;
  }
  
  // Check if user is the creator or an admin
  if (event.createdBy !== user.id && user.role !== 'admin') {
    navigate('/dashboard');
    return null;
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, we would validate the form
      const success = updateEvent(id || '', {
        title,
        description,
        category,
        location,
        startDate,
        endDate,
        startTime,
        endTime,
        organizer,
        imageUrl,
        registrationRequired,
      });
      
      if (success) {
        navigate(`/events/${id}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
          <h1 className="text-3xl font-bold mb-6">Edit Event</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={category}
                    onValueChange={(value) => setCategory(value as EventCategory)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="organizer">Organizer Name</Label>
                <Input
                  id="organizer"
                  value={organizer}
                  onChange={(e) => setOrganizer(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Input
                  id="registration"
                  type="checkbox"
                  checked={registrationRequired}
                  onChange={(e) => setRegistrationRequired(e.target.checked)}
                  className="w-4 h-4"
                />
                <Label htmlFor="registration" className="text-sm cursor-pointer">
                  Registration required to attend
                </Label>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button
                type="submit"
                className="bg-pulse-purple hover:bg-pulse-purple/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating...' : 'Update Event'}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/events/${id}`)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditEvent;
