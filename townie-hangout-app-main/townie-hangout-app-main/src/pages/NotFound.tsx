
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Layout/Navbar';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16 flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-pulse-purple mb-2">404</h1>
          <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button className="bg-pulse-purple hover:bg-pulse-purple/90">
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
