
import React from 'react';
import { 
  LayoutDashboard, 
  User, 
  Award, 
  FileText, 
  FolderOpen, 
  Settings, 
  LogOut,
  Bell,
  Users,
  Crown,
  Wallet,
  ClipboardList,
  PieChart,
  Newspaper,
  Megaphone,
  Flag
} from 'lucide-react';
import { User as UserType } from '../types';

interface SidebarProps {
  user: UserType;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Bảng tin Hùng Hậu', icon: LayoutDashboard },
    { id: 'profile', label: 'Hồ sơ của tôi', icon: User },
    { id: 'employees', label: 'Danh sách nhân sự', icon: Users },
    { id: 'points', label: 'Điểm & Đổi quà', icon: Award },
    { id: 'admin-points', label: 'Quản trị điểm', icon: Wallet },
    { id: 'surveys', label: 'Khảo sát', icon: FileText },
    { id: 'admin-surveys', label: 'Quản lý khảo sát', icon: ClipboardList },
    { id: 'survey-report', label: 'Báo cáo khảo sát', icon: PieChart },
    { id: 'admin-news', label: 'Quản lý tin tức', icon: Newspaper },
    { id: 'admin-campaigns', label: 'Chiến dịch truyền thông', icon: Flag },
    { id: 'admin-notifications', label: 'Quản lý thông báo', icon: Megaphone },
    { id: 'documents', label: 'Kho tài liệu', icon: FolderOpen },
    { id: 'tier-config', label: 'Cấu hình hạng thẻ', icon: Crown },
    { id: 'admin', label: 'Quản trị hệ thống', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white h-screen flex flex-col shadow-lg border-r border-slate-200 sticky top-0">
      {/* Logo Area */}
      <div className="p-6 flex items-center justify-center border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md">
            HH
          </div>
          <div>
            <h1 className="font-bold text-slate-800 text-lg leading-tight">NGÔI NHÀ</h1>
            <p className="text-primary font-bold text-sm uppercase tracking-wider">HÙNG HẬU</p>
          </div>
        </div>
      </div>

      {/* User Mini Profile */}
      <div className="p-4 mx-2 mt-4 mb-2 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
        <div className="overflow-hidden">
          <p className="text-sm font-semibold text-slate-700 truncate">{user.name}</p>
          <p className="text-xs text-slate-500 truncate">{user.position}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === item.id
                ? 'bg-blue-50 text-primary border-l-4 border-primary shadow-sm'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-slate-100 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors">
          <LogOut size={20} />
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Sidebar;