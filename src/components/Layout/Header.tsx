import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Shield, Users, Zap, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/find-roommate', label: 'Find Roommate', icon: Users },
    { path: '/safety', label: 'Safety', icon: Shield },
    { path: '/admin', label: 'Admin', icon: Users },
    { path: '/quick-connect', label: 'Quick Connect', icon: Zap },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Zyra AI
              </span>
              <div className="text-xs text-gray-500">Powered by OmniDim.io</div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-pink-50 text-pink-600'
                      : 'text-gray-600 hover:text-pink-600 hover:bg-pink-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/quick-connect"
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-200"
              >
                Emergency Quick Connect
              </Link>
            </motion.div>
            
            <Link
              to="/login"
              className="flex items-center space-x-1 text-gray-600 hover:text-pink-600 transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span className="text-sm font-medium">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;