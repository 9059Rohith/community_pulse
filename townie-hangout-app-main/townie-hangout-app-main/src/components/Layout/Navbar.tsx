
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Plus, Search, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-b shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo and Site Name */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full pulse-gradient flex items-center justify-center">
            <span className="text-white font-bold">CP</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-pulse-purple to-pulse-blue bg-clip-text text-transparent">
            Community Pulse
          </span>
        </Link>
        
        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="search"
              placeholder="Search events..."
              className="w-64 pl-10 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </form>
          
          <Link to="/" className="text-gray-600 hover:text-pulse-purple flex items-center gap-1">
            <Home size={18} />
            <span>Home</span>
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link
                to="/create-event"
                className="bg-pulse-purple text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-opacity-90 transition"
              >
                <Plus size={18} />
                <span>Add Event</span>
              </Link>

              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="text-gray-700 font-medium">
                  {user?.name}
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600"
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Log in</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-pulse-purple hover:bg-pulse-purple/90">Sign up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white mt-4 py-4 px-4 shadow-lg animate-fade-in">
          <form onSubmit={handleSearch} className="relative mb-4">
            <Input
              type="search"
              placeholder="Search events..."
              className="w-full pl-10 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </form>
          
          <div className="flex flex-col gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/create-event"
                  className="flex items-center gap-2 py-2 px-4 bg-pulse-purple text-white rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Plus size={20} />
                  <span>Add Event</span>
                </Link>
                <button
                  className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 rounded-lg mt-2"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut size={20} />
                  <span>Log out</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                <Link
                  to="/login"
                  className="py-2 px-4 border border-gray-300 text-center rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="py-2 px-4 bg-pulse-purple text-white text-center rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
