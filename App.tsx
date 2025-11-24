
import React, { useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import NewsFeed from './pages/NewsFeed';
import NewsDetail from './pages/NewsDetail';
import MyPoints from './pages/MyPoints';
import Profile from './pages/Profile';
import Documents from './pages/Documents';
import EmployeeList from './pages/EmployeeList';
import EmployeeDetail from './pages/EmployeeDetail';
import AdminTierConfig from './pages/AdminTierConfig';
import AdminPoints from './pages/AdminPoints';
import SurveyList from './pages/SurveyList';
import AdminSurvey from './pages/AdminSurvey';
import SurveyReport from './pages/SurveyReport';
import AdminNews from './pages/AdminNews';
import AdminNotifications from './pages/AdminNotifications';
import AdminCampaign from './pages/AdminCampaign';
import { User, Tier, NewsItem } from './types';
import { Settings } from 'lucide-react';

// Mock User Data
const currentUser: User = {
  id: 'HH001',
  name: 'Nguyễn Văn Hiển',
  avatar: 'https://i.pravatar.cc/150?img=11',
  position: 'Senior Marketing Executive',
  department: 'Ban Truyền Thông',
  tier: Tier.GOLD,
  points: 4500,
  joinDate: '2020-03-15',
  status: 'Active',
  email: 'hien.nguyen@hunghau.vn'
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedEmployee, setSelectedEmployee] = useState<User | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  // Wrap setActiveTab to clear selections when changing tabs
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedEmployee(null);
    setSelectedNews(null);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        if (selectedNews) {
          return <NewsDetail news={selectedNews} onBack={() => setSelectedNews(null)} />;
        }
        return <NewsFeed onSelectNews={(news) => setSelectedNews(news)} />;
      case 'points':
        return <MyPoints user={currentUser} />;
      case 'profile':
        return <Profile user={currentUser} />;
      case 'documents':
        return <Documents />;
      case 'employees':
        if (selectedEmployee) {
          return <EmployeeDetail employee={selectedEmployee} onBack={() => setSelectedEmployee(null)} />;
        }
        return <EmployeeList onSelectEmployee={(emp) => setSelectedEmployee(emp)} />;
      case 'tier-config':
        return <AdminTierConfig />;
      case 'admin-points':
        return <AdminPoints />;
      case 'surveys':
        return <SurveyList />;
      case 'admin-surveys':
        return <AdminSurvey />;
      case 'survey-report':
        return <SurveyReport />;
      case 'admin-news':
        return <AdminNews />;
      case 'admin-campaigns':
        return <AdminCampaign />;
      case 'admin-notifications':
        return <AdminNotifications />;
      case 'admin':
        return (
          <div className="flex flex-col items-center justify-center h-96 text-slate-400 bg-white rounded-2xl border border-slate-100">
            <Settings size={64} className="mb-4 text-slate-300" />
            <h3 className="text-lg font-semibold text-slate-600">Khu vực Quản trị</h3>
            <p className="text-sm">Bạn cần quyền Admin để truy cập khu vực này.</p>
          </div>
        );
      default:
        return <NewsFeed />;
    }
  };

  const getPageTitle = () => {
    if (activeTab === 'dashboard' && selectedNews) return 'Chi tiết tin tức';
    if (activeTab === 'employees' && selectedEmployee) return 'Chi tiết hồ sơ nhân sự';

    switch (activeTab) {
      case 'dashboard': return 'Bảng tin Hùng Hậu';
      case 'points': return 'Điểm thưởng & Quà tặng';
      case 'profile': return 'Hồ sơ nhân sự';
      case 'documents': return 'Kho tài liệu';
      case 'employees': return 'Danh sách nhân sự';
      case 'tier-config': return 'Cấu hình hạng thẻ';
      case 'admin-points': return 'Quản lý chương trình điểm';
      case 'surveys': return 'Khảo sát nội bộ';
      case 'admin-surveys': return 'Quản lý khảo sát';
      case 'survey-report': return 'Báo cáo khảo sát';
      case 'admin-news': return 'Quản lý tin tức';
      case 'admin-campaigns': return 'Chiến dịch truyền thông';
      case 'admin-notifications': return 'Quản lý thông báo';
      case 'admin': return 'Quản trị hệ thống';
      default: return '';
    }
  }

  return (
    <Router>
      <div className="flex min-h-screen bg-[#f8fafc]">
        <Sidebar 
          user={currentUser} 
          activeTab={activeTab} 
          setActiveTab={handleTabChange} 
        />
        
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header user={currentUser} title={getPageTitle()} />
          
          <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
            {renderContent()}
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;