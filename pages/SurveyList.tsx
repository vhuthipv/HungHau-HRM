
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  PlayCircle, 
  AlertCircle, 
  Calendar,
  ChevronDown,
  FileText,
  PieChart,
  ArrowRight
} from 'lucide-react';
import { Survey } from '../types';

// Mock Data
const mockSurveys: Survey[] = [
  {
    id: '1',
    title: 'Khảo sát Môi trường làm việc Quý 3/2023',
    description: 'Đánh giá mức độ hài lòng về môi trường, cơ sở vật chất và văn hóa làm việc tại Hùng Hậu.',
    category: 'Satisfaction',
    startDate: '2023-10-01',
    endDate: '2023-10-31',
    status: 'Open',
    userStatus: 'NotStarted',
    participants: 450,
    durationMinutes: 10,
    questionCount: 25,
    pointsReward: 100
  },
  {
    id: '2',
    title: 'Đánh giá chất lượng đào tạo hội nhập',
    description: 'Dành cho nhân sự mới gia nhập trong tháng 9. Vui lòng hoàn thành để được ghi nhận.',
    category: 'Training',
    startDate: '2023-10-05',
    endDate: '2023-10-25',
    status: 'Open',
    userStatus: 'InProgress',
    participants: 24,
    durationMinutes: 15,
    questionCount: 10
  },
  {
    id: '3',
    title: 'Bình chọn tiết mục Văn nghệ HHH',
    description: 'Bình chọn cho tiết mục bạn yêu thích nhất trong đêm gala kỷ niệm thành lập.',
    category: 'Event',
    startDate: '2023-09-15',
    endDate: '2023-09-20',
    status: 'Closed',
    userStatus: 'Completed',
    participants: 1200,
    durationMinutes: 2,
    questionCount: 1,
    pointsReward: 50
  },
  {
    id: '4',
    title: 'Khảo sát nhu cầu khám sức khỏe định kỳ 2024',
    description: 'Thu thập ý kiến về danh mục khám và địa điểm mong muốn.',
    category: 'General',
    startDate: '2023-08-01',
    endDate: '2023-08-15',
    status: 'Closed',
    userStatus: 'NotStarted', // Expired and not done
    participants: 890,
    durationMinutes: 5,
    questionCount: 8
  },
  {
    id: '5',
    title: 'Đăng ký tham gia giải chạy Marathon',
    description: 'Form đăng ký tham gia và chọn size áo cho giải chạy sắp tới.',
    category: 'Event',
    startDate: '2023-10-20',
    endDate: '2023-11-05',
    status: 'Open',
    userStatus: 'Completed',
    participants: 340,
    durationMinutes: 3,
    questionCount: 5,
    pointsReward: 200
  }
];

const SurveyList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'All' | 'Open' | 'Completed' | 'Expired'>('Open');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<'newest' | 'ending_soon'>('newest');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Filter Logic
  const filteredSurveys = mockSurveys.filter(survey => {
    // 1. Tab Filter
    let matchTab = true;
    if (activeTab === 'Open') matchTab = survey.status === 'Open' && survey.userStatus !== 'Completed';
    if (activeTab === 'Completed') matchTab = survey.userStatus === 'Completed';
    if (activeTab === 'Expired') matchTab = survey.status === 'Closed' && survey.userStatus !== 'Completed';
    
    // 2. Search
    const matchSearch = survey.title.toLowerCase().includes(searchTerm.toLowerCase());

    // 3. Category
    const matchCategory = categoryFilter === 'All' || survey.category === categoryFilter;

    return matchTab && matchSearch && matchCategory;
  }).sort((a, b) => {
    // 4. Sort
    if (sortOption === 'ending_soon') {
      return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
    }
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime(); // Newest default
  });

  const getCategoryLabel = (cat: string) => {
    switch(cat) {
      case 'Satisfaction': return 'Sự hài lòng';
      case 'Training': return 'Đào tạo';
      case 'Event': return 'Sự kiện';
      case 'General': return 'Chung';
      default: return cat;
    }
  };

  const getCategoryColor = (cat: string) => {
    switch(cat) {
      case 'Satisfaction': return 'bg-blue-100 text-blue-700';
      case 'Training': return 'bg-purple-100 text-purple-700';
      case 'Event': return 'bg-amber-100 text-amber-700';
      case 'General': return 'bg-slate-100 text-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusBadge = (survey: Survey) => {
    if (survey.userStatus === 'Completed') {
      return <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200"><CheckCircle size={12} /> Đã hoàn thành</span>;
    }
    if (survey.status === 'Closed') {
      return <span className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-full border border-slate-200"><Calendar size={12} /> Đã hết hạn</span>;
    }
    if (survey.userStatus === 'InProgress') {
      return <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full border border-amber-200"><PlayCircle size={12} /> Đang thực hiện</span>;
    }
    return <span className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full border border-blue-200"><AlertCircle size={12} /> Chưa làm</span>;
  };

  return (
    <div className="space-y-6">
      {/* Summary Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 text-white shadow-md flex items-center justify-between">
          <div>
             <p className="text-blue-100 text-xs font-bold uppercase mb-1">Khảo sát đang mở</p>
             <h3 className="text-2xl font-bold">3</h3>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
             <Clock className="text-white" />
          </div>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div>
             <p className="text-slate-500 text-xs font-bold uppercase mb-1">Cần hoàn thành</p>
             <h3 className="text-2xl font-bold text-slate-800">1</h3>
          </div>
          <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-500">
             <AlertCircle />
          </div>
        </div>
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div>
             <p className="text-slate-500 text-xs font-bold uppercase mb-1">Đã hoàn thành</p>
             <h3 className="text-2xl font-bold text-green-600">85%</h3>
          </div>
          <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-500">
             <PieChart />
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between gap-4">
        {/* Tabs */}
        <div className="flex p-1 bg-slate-100 rounded-xl self-start">
           {['All', 'Open', 'Completed', 'Expired'].map((tab) => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab as any)}
               className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                 activeTab === tab 
                   ? 'bg-white text-primary shadow-sm' 
                   : 'text-slate-500 hover:text-slate-700'
               }`}
             >
               {tab === 'All' ? 'Tất cả' : tab === 'Open' ? 'Đang mở' : tab === 'Completed' ? 'Đã làm' : 'Hết hạn'}
             </button>
           ))}
        </div>

        {/* Filters */}
        <div className="flex gap-3 flex-1 md:flex-none">
           <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Tìm khảo sát..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
           </div>
           <div className="relative">
             <select 
               className="pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none appearance-none cursor-pointer"
               value={sortOption}
               onChange={(e) => setSortOption(e.target.value as any)}
             >
               <option value="newest">Mới nhất</option>
               <option value="ending_soon">Sắp hết hạn</option>
             </select>
             <ChevronDown className="absolute right-3 top-2.5 text-slate-400 pointer-events-none" size={14} />
           </div>
           <div className="relative hidden sm:block">
             <select 
               className="pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none appearance-none cursor-pointer"
               value={categoryFilter}
               onChange={(e) => setCategoryFilter(e.target.value)}
             >
               <option value="All">Tất cả chủ đề</option>
               <option value="Satisfaction">Sự hài lòng</option>
               <option value="Training">Đào tạo</option>
               <option value="Event">Sự kiện</option>
             </select>
             <ChevronDown className="absolute right-3 top-2.5 text-slate-400 pointer-events-none" size={14} />
           </div>
        </div>
      </div>

      {/* Survey List */}
      <div className="grid grid-cols-1 gap-4">
         {filteredSurveys.map((survey) => (
           <div key={survey.id} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6">
              {/* Icon/Image placeholder */}
              <div className={`w-full md:w-48 h-32 rounded-lg flex flex-col items-center justify-center text-center p-4 flex-shrink-0 ${getCategoryColor(survey.category)} bg-opacity-10`}>
                 <FileText size={32} className="mb-2 opacity-80" />
                 <span className="text-xs font-bold uppercase tracking-wide">{getCategoryLabel(survey.category)}</span>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                 <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                       {getStatusBadge(survey)}
                       <span className="text-xs text-slate-500 flex items-center gap-1">
                         <Calendar size={12} /> Hạn: {survey.endDate}
                       </span>
                       {survey.pointsReward && (
                         <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-100">
                           +{survey.pointsReward} Points
                         </span>
                       )}
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-1 hover:text-primary cursor-pointer">{survey.title}</h3>
                    <p className="text-sm text-slate-600 line-clamp-2">{survey.description}</p>
                 </div>

                 <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                       <span>{survey.questionCount} câu hỏi</span>
                       <span>~{survey.durationMinutes} phút</span>
                       <span>{survey.participants} người đã tham gia</span>
                    </div>
                    
                    {survey.userStatus === 'Completed' ? (
                      <button className="text-slate-500 text-sm font-semibold hover:text-slate-800">
                        Xem lại kết quả
                      </button>
                    ) : survey.status === 'Closed' ? (
                      <span className="text-slate-400 text-sm font-medium cursor-not-allowed">Đã đóng</span>
                    ) : (
                      <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary-dark transition-colors flex items-center gap-1 shadow-sm">
                        {survey.userStatus === 'InProgress' ? 'Tiếp tục' : 'Thực hiện'} <ArrowRight size={16} />
                      </button>
                    )}
                 </div>
              </div>
           </div>
         ))}

         {filteredSurveys.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-100">
               <FileText size={48} className="mx-auto text-slate-300 mb-3" />
               <p className="text-slate-500 font-medium">Không tìm thấy khảo sát nào phù hợp.</p>
            </div>
         )}
      </div>
    </div>
  );
};

export default SurveyList;
