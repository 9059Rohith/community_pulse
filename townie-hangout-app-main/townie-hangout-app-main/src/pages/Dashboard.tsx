
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEventStore } from '@/stores/eventStore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Event } from '@/data/mockData';
import { Plus, CheckCircle, XCircle } from 'lucide-react';
import Navbar from '@/components/Layout/Navbar';

const Dashboard = () => {
  const { user } = useAuth();
  const { events, getUserEvents, approveEvent } = useEventStore();

  if (!user) {
    // Redirect to login or show a message
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
            <p className="mb-4">Please log in to access your dashboard.</p>
            <Link to="/login">
              <Button>Log In</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Get user's events
  const userEvents = getUserEvents(user.id);

  // For admin: get events pending approval
  const pendingEvents = user.role === 'admin' 
    ? events.filter(event => !event.approved)
    : [];

  const EventTable = ({ events, showActions = false }: { events: Event[], showActions?: boolean }) => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
              {showActions && <th className="py-3 px-4">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {events.map(event => (
              <tr key={event.id} className="hover:bg-gray-50">
                <td className="py-3 px-4">
                  <Link to={`/events/${event.id}`} className="text-pulse-purple hover:underline">
                    {event.title}
                  </Link>
                </td>
                <td className="py-3 px-4">{event.category}</td>
                <td className="py-3 px-4">{new Date(event.startDate).toLocaleDateString()}</td>
                <td className="py-3 px-4">
                  {event.approved ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Approved
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  )}
                </td>
                {showActions && (
                  <td className="py-3 px-4 flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-green-600 border-green-600 hover:bg-green-50"
                      onClick={() => approveEvent(event.id, true)}
                    >
                      <CheckCircle size={16} className="mr-1" /> Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-600 hover:bg-red-50"
                      onClick={() => approveEvent(event.id, false)}
                    >
                      <XCircle size={16} className="mr-1" /> Reject
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        
        {events.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No events found</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Manage your events and account
            </p>
          </div>
          
          <Link to="/create-event">
            <Button className="bg-pulse-purple hover:bg-pulse-purple/90">
              <Plus size={18} className="mr-1" /> Add New Event
            </Button>
          </Link>
        </div>
        
        <Tabs defaultValue="my-events" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="my-events">My Events</TabsTrigger>
            {user.role === 'admin' && (
              <TabsTrigger value="pending-approval">
                Pending Approval {pendingEvents.length > 0 && `(${pendingEvents.length})`}
              </TabsTrigger>
            )}
            {user.role === 'admin' && (
              <TabsTrigger value="admin-tools">Admin Tools</TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="my-events" className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">My Events</h2>
            <EventTable events={userEvents} />
          </TabsContent>
          
          {user.role === 'admin' && (
            <TabsContent value="pending-approval" className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Events Pending Approval</h2>
              <EventTable events={pendingEvents} showActions />
            </TabsContent>
          )}
          
          {user.role === 'admin' && (
            <TabsContent value="admin-tools" className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Admin Tools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">User Management</h3>
                  <p className="text-gray-600 mb-4">View and manage user accounts</p>
                  <Button variant="outline">Manage Users</Button>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">Content Moderation</h3>
                  <p className="text-gray-600 mb-4">Monitor and moderate event content</p>
                  <Button variant="outline">Review Content</Button>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">Event Categories</h3>
                  <p className="text-gray-600 mb-4">Manage event categories</p>
                  <Button variant="outline">Manage Categories</Button>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">System Settings</h3>
                  <p className="text-gray-600 mb-4">Configure application settings</p>
                  <Button variant="outline">Settings</Button>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
