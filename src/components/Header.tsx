import React from 'react';
import { Heart } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-white fill-current" />
            <h1 className="text-2xl font-bold text-white">Thoothu</h1>
          </div>
          <p className="text-pink-100 text-sm hidden sm:block">
            தமிழ்நாட்டின் காதல் தூதர்கள் • Love Messengers of Tamil Nadu
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;