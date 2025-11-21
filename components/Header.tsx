import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ user, title }) => {
  return (
    <header className="bg-white h-16 border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      </div>

      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-64 pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
        </div>

        {/* Notifications */}
        <div className="relative cursor-pointer">
          <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 transition-colors">
            <Bell className="text-slate-600" size={20} />
          </div>
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </div>
        
        {/* Tier Badge - Mobile view mainly, but nice in header */}
        <div className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wide ${
          user.tier === 'Gold' ? 'bg-amber-50 text-amber-600 border-amber-200' :
          user.tier === 'Platinum' ? 'bg-slate-800 text-white border-slate-600' :
          user.tier === 'Silver' ? 'bg-slate-100 text-slate-600 border-slate-300' :
          'bg-blue-50 text-blue-600 border-blue-200'
        }`}>
          {user.tier} Member
        </div>
      </div>
    </header>
  );
};

export default Header;