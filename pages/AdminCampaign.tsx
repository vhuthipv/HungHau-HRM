
import React, { useState } from 'react';
import { 
  Flag, 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Target, 
  Users, 
  Image as ImageIcon, 
  MessageSquare, 
  Hash, 
  Link as LinkIcon,
  X,
  Save,
  Eye,
  FileText,
  CheckSquare,
  Square
} from 'lucide-react';
import { Campaign, NewsItem } from '../types';

// Mock News Data for Linking
const mockAvailableNews: NewsItem[] = [
  { id: '1', title: 'Lễ phát động Tháng Văn Hóa', category: 'Event', date: '2023-10-01', status: 'Published' } as NewsItem,
  { id: '2', title: 'Thể lệ cuộc thi Ảnh đẹp HHH', category: 'Campaign', date: '2023-10-05', status: 'Published' } as NewsItem,
  { id: '3', title: 'Kết quả tuần 1', category: 'News', date: '2023-10-12', status: 'Published' } as NewsItem,
  { id: '4', title: 'Gương mặt tiêu biểu', category: 'Spotlight', date: '2023-10-15', status: 'Published' } as NewsItem,
];

const initialCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Tháng Văn Hóa Hùng Hậu 2023',
    goal: 'Tăng cường gắn kết nội bộ và lan tỏa giá trị cốt lõi.',
    startDate: '2023-10-01',
    endDate: '2023-10-31',
    status: 'Active',
    targetAudience: 'All',
    hashtag: '#VanHoaHungHau #TuHaoHHH',
    banner: 'https://picsum.photos/800/300?random=1',
    message: 'Hùng Hậu - Ngôi nhà chung của chúng ta',
    linkedNewsCount: 12,
    totalViews: 5400,
    linkedNewsIds: ['1', '2', '3']
  },
  {
    id: '2',
    name: 'Giải chạy Online: Khỏe cùng HHH',
    goal: 'Khuyến khích rèn luyện sức khỏe cho CBNV.',
    startDate: '2023-11-01',
    endDate: '2023-11-30',
    status: 'Upcoming',
    targetAudience: 'All',
    hashtag: '#RunForHealth #HHHMarathon',
    banner: 'https://picsum.photos/800/300?random=2',
    message: 'Mỗi bước chạy - Một niềm vui',
    linkedNewsCount: 2,
    totalViews: 0,
    linkedNewsIds: []
  },
  {
    id: '3',
    name: 'Cuộc thi Sáng kiến Cải tiến Q3',
    goal: 'Tìm kiếm ý tưởng tối ưu hóa quy trình sản xuất.',
    startDate: '2023-07-01',
    endDate: '2023-09-30',
    status: 'Ended',
    targetAudience: 'Department',
    hashtag: '#KaizenHHH #SangKien',
    banner: 'https://picsum.photos/800/300?random=3',
    message: 'Sáng tạo không ngừng - Phát triển bền vững',
    linkedNewsCount: 8,
    totalViews: 3200,
    linkedNewsIds: []
  }
];

const AdminCampaign: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Upcoming' | 'Ended'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState<'General' | 'Branding' | 'Resources'>('General');
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<Campaign>>({
    name: '',
    goal: '',
    startDate: '',
    endDate: '',
    targetAudience: 'All',
    hashtag: '',
    banner: '',
    message: '',
    linkedNewsIds: []
  });

  const handleCreate = () => {
    setEditingCampaign(null);
    setFormData({
      name: '',
      goal: '',
      startDate: '',
      endDate: '',
      targetAudience: 'All',
      hashtag: '',
      banner: '',
      message: '',
      linkedNewsIds: [],
      status: 'Upcoming'
    });
    setActiveModalTab('General');
    setIsModalOpen(true);
  };

  const handleEdit = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setFormData(campaign);
    setActiveModalTab('General');
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const linkedCount = formData.linkedNewsIds?.length || 0;
    
    if (editingCampaign) {
      setCampaigns(campaigns.map(c => c.id === editingCampaign.id ? { 
        ...c, 
        ...formData, 
        linkedNewsCount: linkedCount 
      } as Campaign : c));
    } else {
      const newCampaign: Campaign = {
        ...(formData as Campaign),
        id: Date.now().toString(),
        status: 'Upcoming', // Default logic could be better
        linkedNewsCount: linkedCount,
        totalViews: 0
      };
      setCampaigns([newCampaign, ...campaigns]);
    }
    setIsModalOpen(false);
  };

  const toggleNewsLink = (newsId: string) => {
    const currentIds = formData.linkedNewsIds || [];
    if (currentIds.includes(newsId)) {
      setFormData({ ...formData, linkedNewsIds: currentIds.filter(id => id !== newsId) });
    } else {
      setFormData({ ...formData, linkedNewsIds: [...currentIds, newsId] });
    }
  };

  const filteredCampaigns = campaigns.filter(c => filterStatus === 'All' || c.status === filterStatus);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
               <Flag className="text-primary" /> Cấu hình Chiến dịch Truyền thông
            </h2>
            <p className="text-sm text-slate-500">Quản lý các chiến dịch, gắn kết thông điệp và tài nguyên truyền thông.</p>
         </div>
         <button 
            onClick={handleCreate}
            className="bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-primary-dark transition-colors flex items-center gap-2 shadow-sm"
         >
            <Plus size={20} /> Tạo chiến dịch
         </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
         {['All', 'Active', 'Upcoming', 'Ended'].map(status => (
            <button
               key={status}
               onClick={() => setFilterStatus(status as any)}
               className={`px-4 py-2 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                  filterStatus === status 
                     ? 'bg-white text-primary shadow-md border-l-4 border-primary' 
                     : 'bg-white/50 text-slate-500 hover:bg-white hover:text-slate-700'
               }`}
            >
               {status === 'All' ? 'Tất cả' : status === 'Active' ? 'Đang chạy' : status === 'Upcoming' ? 'Sắp diễn ra' : 'Đã kết thúc'}
            </button>
         ))}
      </div>

      {/* Campaign Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {filteredCampaigns.map(campaign => (
            <div key={campaign.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
               <div className="h-40 bg-slate-200 relative">
                  {campaign.banner ? (
                     <img src={campaign.banner} alt={campaign.name} className="w-full h-full object-cover" />
                  ) : (
                     <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <ImageIcon size={48} />
                     </div>
                  )}
                  <div className="absolute top-4 right-4">
                     <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm ${
                        campaign.status === 'Active' ? 'bg-green-500 text-white' :
                        campaign.status === 'Upcoming' ? 'bg-blue-500 text-white' :
                        'bg-slate-500 text-white'
                     }`}>
                        {campaign.status === 'Active' ? 'Đang chạy' : campaign.status === 'Upcoming' ? 'Sắp diễn ra' : 'Đã kết thúc'}
                     </span>
                  </div>
               </div>
               
               <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg text-slate-800 mb-2 line-clamp-2">{campaign.name}</h3>
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2 flex-1">{campaign.goal}</p>
                  
                  <div className="space-y-2 mb-4">
                     <div className="flex items-center text-sm text-slate-600 gap-2">
                        <Calendar size={16} className="text-slate-400" />
                        <span>{campaign.startDate} - {campaign.endDate}</span>
                     </div>
                     <div className="flex items-center text-sm text-slate-600 gap-2">
                        <Target size={16} className="text-slate-400" />
                        <span>{campaign.targetAudience === 'All' ? 'Toàn tập đoàn' : campaign.targetAudience}</span>
                     </div>
                     {campaign.hashtag && (
                        <div className="flex items-center text-sm text-blue-600 gap-2 font-medium">
                           <Hash size={16} />
                           <span>{campaign.hashtag}</span>
                        </div>
                     )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
                     <div className="text-center">
                        <p className="text-xs text-slate-400 uppercase font-bold">Bài viết</p>
                        <p className="text-lg font-bold text-slate-700">{campaign.linkedNewsCount}</p>
                     </div>
                     <div className="text-center border-l border-slate-100">
                        <p className="text-xs text-slate-400 uppercase font-bold">Lượt xem</p>
                        <p className="text-lg font-bold text-slate-700">{campaign.totalViews?.toLocaleString()}</p>
                     </div>
                  </div>
                  
                  <button 
                     onClick={() => handleEdit(campaign)}
                     className="w-full mt-4 py-2 bg-slate-50 text-slate-600 font-bold rounded-lg hover:bg-slate-100 transition-colors text-sm"
                  >
                     Cấu hình
                  </button>
               </div>
            </div>
         ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col h-[90vh] animate-scale-in">
               {/* Modal Header */}
               <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
                  <div>
                     <h3 className="text-xl font-bold text-slate-800">
                        {editingCampaign ? 'Cấu hình Chiến dịch' : 'Tạo chiến dịch mới'}
                     </h3>
                     <p className="text-sm text-slate-500">Thiết lập thông tin, hình ảnh và tài nguyên liên quan.</p>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                     <X size={24} />
                  </button>
               </div>

               {/* Modal Tabs */}
               <div className="flex border-b border-slate-100 px-6">
                  <button 
                     onClick={() => setActiveModalTab('General')}
                     className={`px-6 py-4 font-bold text-sm border-b-2 transition-colors flex items-center gap-2 ${activeModalTab === 'General' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                  >
                     <Flag size={16} /> Thông tin chung
                  </button>
                  <button 
                     onClick={() => setActiveModalTab('Branding')}
                     className={`px-6 py-4 font-bold text-sm border-b-2 transition-colors flex items-center gap-2 ${activeModalTab === 'Branding' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                  >
                     <ImageIcon size={16} /> Hình ảnh & Thông điệp
                  </button>
                  <button 
                     onClick={() => setActiveModalTab('Resources')}
                     className={`px-6 py-4 font-bold text-sm border-b-2 transition-colors flex items-center gap-2 ${activeModalTab === 'Resources' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                  >
                     <LinkIcon size={16} /> Gắn tài nguyên
                  </button>
               </div>

               {/* Modal Content */}
               <div className="flex-1 overflow-y-auto p-8">
                  {activeModalTab === 'General' && (
                     <div className="space-y-6 max-w-2xl mx-auto">
                        <div>
                           <label className="block text-sm font-bold text-slate-700 mb-1">Tên chiến dịch <span className="text-red-500">*</span></label>
                           <input 
                              type="text" 
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                              placeholder="VD: Tháng Văn Hóa 2024"
                           />
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-slate-700 mb-1">Mục tiêu chiến dịch</label>
                           <textarea 
                              value={formData.goal}
                              onChange={(e) => setFormData({...formData, goal: e.target.value})}
                              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none h-24 resize-none"
                              placeholder="Mô tả mục tiêu cần đạt được..."
                           />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                           <div>
                              <label className="block text-sm font-bold text-slate-700 mb-1">Ngày bắt đầu</label>
                              <input 
                                 type="date" 
                                 value={formData.startDate}
                                 onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                                 className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                              />
                           </div>
                           <div>
                              <label className="block text-sm font-bold text-slate-700 mb-1">Ngày kết thúc</label>
                              <input 
                                 type="date" 
                                 value={formData.endDate}
                                 onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                                 className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                              />
                           </div>
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-slate-700 mb-1">Đối tượng mục tiêu</label>
                           <select 
                              value={formData.targetAudience}
                              onChange={(e) => setFormData({...formData, targetAudience: e.target.value as any})}
                              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                           >
                              <option value="All">Toàn tập đoàn</option>
                              <option value="Department">Theo Khối/Đơn vị</option>
                              <option value="Group">Theo Nhóm chuyên môn</option>
                           </select>
                        </div>
                     </div>
                  )}

                  {activeModalTab === 'Branding' && (
                     <div className="space-y-6 max-w-2xl mx-auto">
                        <div>
                           <label className="block text-sm font-bold text-slate-700 mb-1">Banner chiến dịch (URL)</label>
                           <input 
                              type="text" 
                              value={formData.banner}
                              onChange={(e) => setFormData({...formData, banner: e.target.value})}
                              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                              placeholder="https://..."
                           />
                           {formData.banner && (
                              <div className="mt-4 rounded-xl overflow-hidden border border-slate-200 h-48 bg-slate-100">
                                 <img src={formData.banner} alt="Preview" className="w-full h-full object-cover" />
                              </div>
                           )}
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-slate-700 mb-1">Thông điệp chính (Key Message)</label>
                           <input 
                              type="text" 
                              value={formData.message}
                              onChange={(e) => setFormData({...formData, message: e.target.value})}
                              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                              placeholder="Nhập slogan hoặc thông điệp chính..."
                           />
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-slate-700 mb-1">Hashtag</label>
                           <div className="flex items-center gap-2">
                              <div className="bg-slate-100 p-3 rounded-l-lg border border-r-0 border-slate-300 text-slate-500">#</div>
                              <input 
                                 type="text" 
                                 value={formData.hashtag ? formData.hashtag.replace(/#/g, '') : ''}
                                 onChange={(e) => setFormData({...formData, hashtag: e.target.value})}
                                 className="w-full p-3 border border-slate-300 rounded-r-lg focus:ring-2 focus:ring-primary/20 outline-none"
                                 placeholder="Hashtag1 #Hashtag2..."
                              />
                           </div>
                        </div>
                     </div>
                  )}

                  {activeModalTab === 'Resources' && (
                     <div className="space-y-6">
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex items-start gap-3 text-sm text-blue-800 mb-6">
                           <FileText size={20} className="flex-shrink-0 mt-0.5" />
                           <div>
                              <p className="font-bold">Gắn kết tài nguyên</p>
                              <p>Chọn các bài viết tin tức, sự kiện đã tạo để hiển thị trong trang chi tiết chiến dịch.</p>
                           </div>
                        </div>

                        <div className="border border-slate-200 rounded-xl overflow-hidden">
                           <div className="bg-slate-50 p-3 border-b border-slate-200 font-bold text-slate-700 text-sm flex justify-between">
                              <span>Bài viết có sẵn</span>
                              <span>{formData.linkedNewsIds?.length} đã chọn</span>
                           </div>
                           <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                              {mockAvailableNews.map(news => (
                                 <div 
                                    key={news.id} 
                                    className={`p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors ${
                                       formData.linkedNewsIds?.includes(news.id) ? 'bg-blue-50/50' : ''
                                    }`}
                                    onClick={() => toggleNewsLink(news.id)}
                                 >
                                    <div className="flex items-start gap-3">
                                       <div className={`mt-1 ${formData.linkedNewsIds?.includes(news.id) ? 'text-primary' : 'text-slate-300'}`}>
                                          {formData.linkedNewsIds?.includes(news.id) ? <CheckSquare size={20} /> : <Square size={20} />}
                                       </div>
                                       <div>
                                          <p className={`font-semibold text-sm ${formData.linkedNewsIds?.includes(news.id) ? 'text-primary' : 'text-slate-700'}`}>
                                             {news.title}
                                          </p>
                                          <p className="text-xs text-slate-500 mt-1">
                                             {news.category} • {news.date}
                                          </p>
                                       </div>
                                    </div>
                                    <span className="text-xs bg-white border border-slate-200 px-2 py-1 rounded">
                                       {news.status}
                                    </span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  )}
               </div>

               {/* Modal Footer */}
               <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-white rounded-b-2xl">
                  <button 
                     onClick={() => setIsModalOpen(false)}
                     className="px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors"
                  >
                     Hủy bỏ
                  </button>
                  <button 
                     onClick={handleSave}
                     className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-colors shadow-md flex items-center gap-2"
                  >
                     <Save size={18} /> {editingCampaign ? 'Lưu thay đổi' : 'Tạo chiến dịch'}
                  </button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default AdminCampaign;