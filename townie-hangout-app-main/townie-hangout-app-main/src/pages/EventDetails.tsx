
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEventStore } from '@/stores/eventStore';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, Clock, MapPin, User, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Layout/Navbar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { sendEventInterestEmail, scheduleEventReminder } from '@/utils/notifications';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getEventById, deleteEvent } = useEventStore();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const event = getEventById(id || '');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [additionalAttendees, setAdditionalAttendees] = useState(0);
  const [isAttending, setIsAttending] = useState(false);
  const [open, setOpen] = useState(false);
  
  if (!event) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Event not found</h2>
            <p className="mb-4">The event you're looking for doesn't exist or has been removed.</p>
            <Link to="/">
              <Button>Return to home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  const handleDeleteEvent = () => {
    if (confirm("Are you sure you want to delete this event?")) {
      deleteEvent(event.id);
      navigate('/dashboard');
    }
  };
  
  const handleAttend = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all required fields are filled
    if (!name.trim() || !email.trim() || !phone.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Send confirmation email and schedule reminder
    sendEventInterestEmail(email, name, event);
    scheduleEventReminder(email, name, event);
    
    // Close dialog and show success toast
    setOpen(false);
    setIsAttending(true);
    toast.success(`You've registered for ${event.title}!`, {
      description: `We'll send a reminder to ${email} before the event starts.`,
      duration: 5000,
    });
  };
  
  const formatDateTime = (date: string, time: string) => {
    return format(new Date(`${date}T${time}`), 'MMM dd, yyyy h:mm a');
  };
  
  const isOwner = user?.id === event.createdBy;
  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          {/* Banner Image */}
          <div className="relative rounded-xl overflow-hidden h-64 md:h-80 mb-6">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            {(isOwner || isAdmin) && (
              <div className="absolute top-4 right-4 flex gap-2">
                {isOwner && (
                  <Link to={`/edit-event/${event.id}`}>
                    <Button size="sm" className="bg-white text-pulse-purple hover:bg-gray-100">
                      <Edit size={16} className="mr-1" /> Edit
                    </Button>
                  </Link>
                )}
                {(isOwner || isAdmin) && (
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={handleDeleteEvent}
                  >
                    <Trash2 size={16} className="mr-1" /> Delete
                  </Button>
                )}
              </div>
            )}
          </div>
          
          <div className="bg-card rounded-xl shadow-md p-6 mb-6 text-card-foreground">
            {!event.approved && (
              <Alert className="bg-yellow-900/20 border-yellow-600 mb-6">
                <AlertTitle className="text-yellow-400">Pending Approval</AlertTitle>
                <AlertDescription className="text-yellow-300">
                  This event is pending approval and is only visible to you.
                </AlertDescription>
              </Alert>
            )}
            
            <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
            
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center">
                <Calendar size={18} className="text-pulse-purple mr-2" />
                <span>
                  {formatDateTime(event.startDate, event.startTime)}
                </span>
              </div>
              
              <div className="flex items-center">
                <Clock size={18} className="text-pulse-purple mr-2" />
                <span>
                  to {formatDateTime(event.endDate, event.endTime)}
                </span>
              </div>
              
              <div className="flex items-center">
                <MapPin size={18} className="text-pulse-purple mr-2" />
                <span>{event.location}</span>
              </div>
              
              <div className="flex items-center">
                <User size={18} className="text-pulse-purple mr-2" />
                <span>{event.organizer}</span>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-8 whitespace-pre-line">
              {event.description}
            </p>
            
            {!isOwner ? (
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-pulse-purple hover:bg-pulse-purple/90 w-full md:w-auto">
                    I'm Interested
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-background border-muted">
                  <DialogHeader>
                    <DialogTitle>Register for {event.title}</DialogTitle>
                    <DialogDescription>
                      Fill out this form to register for the event. You'll receive a confirmation email and a reminder before it starts.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAttend} className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="name" className="text-foreground">Your Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="bg-card border-input"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-foreground">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-card border-input"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="bg-card border-input"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="attendees" className="text-foreground">Additional People Coming With You</Label>
                      <Input
                        id="attendees"
                        type="number"
                        min={0}
                        value={additionalAttendees}
                        onChange={(e) => setAdditionalAttendees(parseInt(e.target.value) || 0)}
                        className="bg-card border-input"
                      />
                    </div>
                    
                    <Button type="submit" className="bg-pulse-purple hover:bg-pulse-purple/90 w-full">
                      Register
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            ) : (
              <Alert className="bg-pulse-purple/20 border-pulse-purple">
                <AlertTitle>You created this event</AlertTitle>
                <AlertDescription>
                  As the event creator, you're already registered.
                </AlertDescription>
              </Alert>
            )}
            
            {isAttending && !isOwner && (
              <Alert className="mt-4 bg-green-900/20 border-green-600">
                <AlertTitle className="text-green-400">You're registered!</AlertTitle>
                <AlertDescription className="text-green-300">
                  You've successfully registered for this event. A confirmation has been sent to your email.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetails;
