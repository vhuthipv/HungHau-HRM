
import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Calendar, 
  ArrowRight, 
  Filter, 
  Search,
  TrendingUp,
  Layers,
  ChevronDown
} from 'lucide-react';
import { NewsItem } from '../types';

interface NewsFeedProps {
  onSelectNews?: (news: NewsItem) => void;
}

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Khởi động tháng văn hóa Hùng Hậu: Tự hào bản sắc',
    summary: 'Chào đón tháng 9 với chuỗi hoạt động văn hóa sôi nổi nhằm gắn kết tinh thần người Hùng Hậu trên toàn hệ thống.',
    content: '<p>Nội dung chi tiết...</p>',
    category: 'Campaign',
    date: '2023-10-24',
    image: 'https://picsum.photos/800/400?random=1',
    likes: 142,
    comments: 34,
    publisher: 'Ban Truyền Thông',
    unit: 'Toàn tập đoàn',
    isFeatured: true,
    campaignName: 'Tháng Văn Hóa 2023',
    attachments: [
       { id: 'a1', name: 'Ke_hoach_thang_van_hoa.pdf', type: 'PDF', size: '2.4 MB', url: '#' },
       { id: 'a2', name: 'Banner_su_kien.png', type: 'IMAGE', size: '5.1 MB', url: '#' }
    ]
  },
  {
    id: '2',
    title: 'Công bố chế độ phúc lợi mới áp dụng từ Quý 4',
    summary: 'Ban lãnh đạo chính thức thông qua chính sách điều chỉnh phúc lợi, tăng cường hỗ trợ sức khỏe và đào tạo cho CBNV.',
    content: '',
    category: 'Policy',
    date: '2023-10-22',
    image: 'https://picsum.photos/800/400?random=2',
    likes: 289,
    comments: 56,
    publisher: 'Ban Nhân Sự',
    unit: 'Toàn tập đoàn',
    isFeatured: true,
    attachments: [
       { id: 'b1', name: 'Quy_dinh_phuc_loi_moi.pdf', type: 'PDF', size: '1.2 MB', url: '#' }
    ]
  },
  {
    id: '3',
    title: 'Spotlight Nhân Sự: Anh Nguyễn Văn A - Ngôi sao sáng tạo tháng 9',
    summary: 'Gặp gỡ người đã mang lại sáng kiến tiết kiệm 20% chi phí vận hành cho khối nhà máy.',
    content: '',
    category: 'Spotlight',
    date: '2023-10-20',
    image: 'https://picsum.photos/800/400?random=3',
    likes: 89,
    comments: 12,
    publisher: 'Ban Truyền Thông',
    unit: 'Khối Sản Xuất',
    isFeatured: false
  },
  {
    id: '4',
    title: 'Thông báo bảo trì hệ thống ERP',
    summary: 'Hệ thống sẽ tạm ngưng hoạt động từ 22:00 đến 02:00 ngày 25/10 để nâng cấp server.',
    content: '',
    category: 'News',
    date: '2023-10-24',
    image: 'https://picsum.photos/800/400?random=4',
    likes: 12,
    comments: 0,
    publisher: 'Ban Công Nghệ',
    unit: 'Toàn tập đoàn',
    isFeatured: false
  },
  {
    id: '5',
    title: 'Giải chạy HHH Marathon: Kết quả chung cuộc',
    summary: 'Chúc mừng các vận động viên đã xuất sắc hoàn thành cự ly 21km.',
    content: '',
    category: 'Event',
    date: '2023-10-18',
    image: 'https://picsum.photos/800/400?random=5',
    likes: 210,
    comments: 45,
    publisher: 'Công đoàn',
    unit: 'Toàn tập đoàn',
    isFeatured: false,
    campaignName: 'Khỏe cùng Hùng Hậu'
  }
];

const NewsFeed: React.FC<NewsFeedProps> = ({ onSelectNews }) => {
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterUnit, setFilterUnit] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

  // Filtering Logic
  const filteredNews = mockNews.filter(item => {
    const matchCat = filterCategory === 'All' || item.category === filterCategory;
    const matchUnit = filterUnit === 'All' || item.unit === filterUnit;
    return matchCat && matchUnit;
  }).sort((a, b) => {
    if (sortBy === 'Featured') {
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    }
    if (sortBy === 'Campaign') {
      return (b.campaignName ? 1 : 0) - (a.campaignName ? 1 : 0);
    }
    // Default Newest
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const featuredItem = mockNews.find(n => n.isFeatured);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Top Controls Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-0 z-30">
         <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <button 
              onClick={() => setFilterCategory('All')}
              className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${filterCategory === 'All' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Tất cả
            </button>
            <button 
              onClick={() => setFilterCategory('News')}
              className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${filterCategory === 'News' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Tin tức
            </button>
            <button 
              onClick={() => setFilterCategory('Policy')}
              className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${filterCategory === 'Policy' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Chính sách
            </button>
            <button 
              onClick={() => setFilterCategory('Campaign')}
              className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${filterCategory === 'Campaign' ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Chiến dịch
            </button>
         </div>

         <div className="flex gap-3 w-full md:w-auto">
            <div className="relative">
               <select 
                 className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-2 pl-4 pr-10 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                 value={filterUnit}
                 onChange={(e) => setFilterUnit(e.target.value)}
               >
                 <option value="All">Mọi đơn vị</option>
                 <option value="Toàn tập đoàn">Toàn tập đoàn</option>
                 <option value="Khối Sản Xuất">Khối Sản Xuất</option>
               </select>
               <ChevronDown size={16} className="absolute right-3 top-2.5 text-slate-400 pointer-events-none" />
            </div>

            <div className="relative">
               <select 
                 className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 py-2 pl-4 pr-10 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                 value={sortBy}
                 onChange={(e) => setSortBy(e.target.value)}
               >
                 <option value="Newest">Mới nhất</option>
                 <option value="Featured">Nổi bật</option>
                 <option value="Campaign">Theo chiến dịch</option>
               </select>
               <Filter size={16} className="absolute right-3 top-2.5 text-slate-400 pointer-events-none" />
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feed Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Feed List */}
          {filteredNews.map((news) => (
            <div key={news.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow group">
              {/* Header */}
              <div className="p-5 pb-3 flex items-start justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xs">
                       HH
                    </div>
                    <div>
                       <h4 className="font-bold text-slate-800 text-sm">{news.publisher}</h4>
                       <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span>{news.date}</span>
                          <span>•</span>
                          <span>{news.unit}</span>
                       </div>
                    </div>
                 </div>
                 {news.isFeatured && (
                    <span className="bg-amber-100 text-amber-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
                       Nổi bật
                    </span>
                 )}
              </div>

              {/* Content */}
              <div 
                className="cursor-pointer"
                onClick={() => onSelectNews && onSelectNews(news)}
              >
                <div className="px-5 pb-3">
                   {news.campaignName && (
                      <div className="text-xs font-bold text-primary uppercase mb-1 flex items-center gap-1">
                         <Layers size={12} /> Chiến dịch: {news.campaignName}
                      </div>
                   )}
                   <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-primary transition-colors">
                      {news.title}
                   </h3>
                   <p className="text-slate-600 text-sm line-clamp-2 mb-3">{news.summary}</p>
                </div>

                {/* Image */}
                <div className="w-full h-64 overflow-hidden">
                   <img src={news.image} alt={news.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              </div>

              {/* Footer Actions */}
              <div className="px-5 py-3 border-t border-slate-50 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-slate-500 text-sm font-medium hover:text-red-500 transition-colors">
                       <Heart size={18} /> {news.likes}
                    </button>
                    <button className="flex items-center gap-1 text-slate-500 text-sm font-medium hover:text-primary transition-colors">
                       <MessageCircle size={18} /> {news.comments}
                    </button>
                 </div>
                 <button 
                    onClick={() => onSelectNews && onSelectNews(news)}
                    className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                 >
                    Xem chi tiết <ArrowRight size={16} />
                 </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar Widgets */}
        <div className="space-y-6 hidden lg:block">
           {/* Search Widget */}
           <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <div className="relative">
                 <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                 <input type="text" placeholder="Tìm kiếm tin tức..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
           </div>

           {/* Events Widget */}
           <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
              <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Calendar className="text-primary" size={18} />
                Sự kiện sắp tới
              </h4>
              <div className="space-y-4">
                {[1, 2].map((i) => (
                   <div key={i} className="flex gap-3 items-start pb-3 border-b border-slate-100 last:border-0 last:pb-0 group cursor-pointer">
                      <div className="w-12 h-12 bg-blue-50 rounded-lg flex flex-col items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                        <span className="text-xs font-semibold uppercase">T11</span>
                        <span className="text-lg font-bold">{i+10}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800 group-hover:text-primary transition-colors">Họp mặt định kỳ toàn công ty Quý 4</p>
                        <p className="text-xs text-slate-500 mt-1">09:00 AM - Hội trường A</p>
                      </div>
                   </div>
                ))}
              </div>
           </div>
           
           {/* Campaigns Widget */}
           <div className="bg-gradient-to-br from-secondary to-green-700 rounded-2xl p-5 shadow-lg text-white">
              <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                 <TrendingUp size={20} /> Chiến dịch nổi bật
              </h4>
              <div className="space-y-3 mt-4">
                 <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm cursor-pointer hover:bg-white/20 transition-colors">
                    <p className="font-bold text-sm">#NguoiHungHauKhoe</p>
                    <p className="text-xs text-green-100 mt-1">Giải chạy online - Còn 5 ngày</p>
                 </div>
                 <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm cursor-pointer hover:bg-white/20 transition-colors">
                    <p className="font-bold text-sm">#SangKienCaiTien</p>
                    <p className="text-xs text-green-100 mt-1">Cuộc thi ý tưởng - Đang nhận bài</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
