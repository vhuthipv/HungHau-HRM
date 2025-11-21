
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Eye, 
  Calendar, 
  Image as ImageIcon, 
  FileText, 
  X, 
  Save, 
  Clock,
  Upload,
  MoreHorizontal
} from 'lucide-react';
import { NewsItem, NewsStatus } from '../types';

const mockAdminNews: NewsItem[] = [
  {
    id: '1',
    title: 'Khởi động tháng văn hóa Hùng Hậu',
    summary: 'Chào đón tháng 9 với chuỗi hoạt động văn hóa sôi nổi.',
    content: '<p>Nội dung...</p>',
    category: 'Campaign',
    date: '2023-10-24',
    status: 'Published',
    image: 'https://picsum.photos/800/400?random=1',
    likes: 142,
    comments: 34,
    publisher: 'Ban Truyền Thông',
    unit: 'Toàn tập đoàn',
    isFeatured: true,
    scheduledPublishDate: '2023-10-24',
    targetAudience: 'All'
  },
  {
    id: '2',
    title: 'Dự thảo: Quy định làm việc từ xa 2024',
    summary: 'Xin ý kiến đóng góp cho dự thảo quy định mới.',
    content: '<p>Nội dung...</p>',
    category: 'Policy',
    date: '2023-11-01',
    status: 'Draft',
    image: 'https://picsum.photos/800/400?random=2',
    likes: 0,
    comments: 0,
    publisher: 'Ban Nhân Sự',
    unit: 'Toàn tập đoàn',
    isFeatured: false,
    targetAudience: 'All'
  },
  {
    id: '3',
    title: 'Thông báo nghỉ lễ Quốc Khánh',
    summary: 'Lịch nghỉ lễ chính thức.',
    content: '',
    category: 'News',
    date: '2023-09-01',
    status: 'Hidden',
    image: 'https://picsum.photos/800/400?random=3',
    likes: 50,
    comments: 0,
    publisher: 'Hành Chính',
    unit: 'Toàn tập đoàn',
    isFeatured: false,
    scheduledUnpublishDate: '2023-09-05'
  },
  {
    id: '4',
    title: 'Review Sự kiện Gala Dinner',
    summary: 'Bài viết đang chờ duyệt nội dung.',
    content: '',
    category: 'Event',
    date: '2023-10-28',
    status: 'Pending',
    image: 'https://picsum.photos/800/400?random=4',
    likes: 0,
    comments: 0,
    publisher: 'Ban Truyền Thông',
    unit: 'Toàn tập đoàn',
    isFeatured: false,
    scheduledPublishDate: '2023-10-30'
  }
];

const AdminNews: React.FC = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>(mockAdminNews);
  const [filterStatus, setFilterStatus] = useState<'All' | NewsStatus>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);

  // Mock Form Data
  const [formData, setFormData] = useState<Partial<NewsItem>>({
    title: '',
    summary: '',
    content: '',
    category: 'News',
    status: 'Draft',
    image: '',
    isFeatured: false,
    targetAudience: 'All',
    scheduledPublishDate: '',
    scheduledUnpublishDate: ''
  });

  const filteredNews = newsList.filter(item => {
    const matchStatus = filterStatus === 'All' || item.status === filterStatus;
    const matchSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleCreate = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      summary: '',
      content: '',
      category: 'News',
      status: 'Draft',
      image: '',
      isFeatured: false,
      targetAudience: 'All',
      scheduledPublishDate: new Date().toISOString().split('T')[0],
      scheduledUnpublishDate: ''
    });
    setIsModalOpen(true);
  };

  const handleEdit = (item: NewsItem) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa tin tức này?')) {
      setNewsList(newsList.filter(i => i.id !== id));
    }
  };

  const handleSave = () => {
    if (editingItem) {
      setNewsList(newsList.map(i => i.id === editingItem.id ? { ...i, ...formData } as NewsItem : i));
    } else {
      const newItem: NewsItem = {
        ...(formData as NewsItem),
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        comments: 0,
        publisher: 'Admin',
        unit: 'Ban Truyền Thông'
      };
      setNewsList([newItem, ...newsList]);
    }
    setIsModalOpen(false);
  };

  const getStatusBadge = (status: string | undefined) => {
    switch (status) {
      case 'Published': return <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold border border-green-200">Xuất bản</span>;
      case 'Draft': return <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full text-xs font-bold border border-slate-200">Nháp</span>;
      case 'Pending': return <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-bold border border-blue-200">Chờ duyệt</span>;
      case 'Hidden': return <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs font-bold border border-gray-300">Đã ẩn</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Toolbar */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
           <div>
             <h2 className="text-xl font-bold text-slate-800">Quản lý Tin tức & Truyền thông</h2>
             <p className="text-sm text-slate-500">Soạn thảo, phê duyệt và phát hành tin tức nội bộ.</p>
           </div>
           <button 
             onClick={handleCreate}
             className="bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-primary-dark transition-colors flex items-center gap-2 shadow-sm"
           >
             <Plus size={20} /> Tạo tin mới
           </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-100">
           {/* Status Filters */}
           <div className="flex bg-slate-100 p-1 rounded-lg w-full md:w-auto overflow-x-auto">
             {['All', 'Draft', 'Pending', 'Published', 'Hidden'].map((status) => (
               <button
                 key={status}
                 onClick={() => setFilterStatus(status as any)}
                 className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                   filterStatus === status ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                 }`}
               >
                 {status === 'All' ? 'Tất cả' : status === 'Draft' ? 'Nháp' : status === 'Pending' ? 'Chờ duyệt' : status === 'Published' ? 'Đã đăng' : 'Đã ẩn'}
               </button>
             ))}
           </div>

           {/* Search */}
           <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Tìm kiếm bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
           </div>
        </div>
      </div>

      {/* News Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
         <div className="overflow-x-auto">
           <table className="w-full text-left text-sm text-slate-600">
             <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-bold text-slate-700">
               <tr>
                 <th className="px-6 py-4">Bài viết</th>
                 <th className="px-6 py-4">Danh mục</th>
                 <th className="px-6 py-4">Trạng thái</th>
                 <th className="px-6 py-4">Lịch đăng</th>
                 <th className="px-6 py-4 text-right">Thao tác</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
               {filteredNews.map((item) => (
                 <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                   <td className="px-6 py-4 max-w-md">
                     <div className="flex items-start gap-3">
                        <img src={item.image} alt="" className="w-12 h-12 rounded-lg object-cover border border-slate-200" />
                        <div>
                           <div className="font-bold text-slate-800 line-clamp-1">{item.title}</div>
                           <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                              <span>{item.publisher}</span>
                              <span>•</span>
                              <span>{item.unit}</span>
                           </div>
                        </div>
                     </div>
                   </td>
                   <td className="px-6 py-4">
                      <span className="bg-slate-100 px-2 py-1 rounded text-xs font-medium border border-slate-200">
                        {item.category}
                      </span>
                   </td>
                   <td className="px-6 py-4">
                      {getStatusBadge(item.status)}
                   </td>
                   <td className="px-6 py-4 text-xs">
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-700">
                           {item.scheduledPublishDate || item.date}
                        </span>
                        {item.scheduledUnpublishDate && (
                           <span className="text-red-400">Gỡ: {item.scheduledUnpublishDate}</span>
                        )}
                      </div>
                   </td>
                   <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                         <button 
                           onClick={() => handleEdit(item)}
                           className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-primary hover:border-primary transition-colors"
                           title="Chỉnh sửa"
                         >
                            <Edit2 size={16} />
                         </button>
                         <button 
                           onClick={() => handleDelete(item.id)}
                           className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-red-500 hover:border-red-500 transition-colors"
                           title="Xóa"
                         >
                            <Trash2 size={16} />
                         </button>
                      </div>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
         {filteredNews.length === 0 && (
            <div className="p-12 text-center text-slate-500">
               <FileText size={48} className="mx-auto mb-3 opacity-30" />
               <p>Không tìm thấy bài viết nào.</p>
            </div>
         )}
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-scale-in">
               <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-slate-800">
                     {editingItem ? 'Chỉnh sửa bài viết' : 'Tạo tin tức mới'}
                  </h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                     <X size={24} />
                  </button>
               </div>

               <div className="p-6 overflow-y-auto space-y-6">
                  {/* Main Content Section */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="md:col-span-2 space-y-4">
                        <div>
                           <label className="block text-sm font-bold text-slate-700 mb-1">Tiêu đề bài viết <span className="text-red-500">*</span></label>
                           <input 
                             type="text" 
                             value={formData.title}
                             onChange={(e) => setFormData({...formData, title: e.target.value})}
                             className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                             placeholder="Nhập tiêu đề..."
                           />
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-slate-700 mb-1">Tóm tắt ngắn</label>
                           <textarea 
                             value={formData.summary}
                             onChange={(e) => setFormData({...formData, summary: e.target.value})}
                             className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none h-20 resize-none"
                             placeholder="Mô tả ngắn gọn nội dung..."
                           />
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-slate-700 mb-1">Nội dung chi tiết</label>
                           <div className="border border-slate-300 rounded-lg h-64 bg-slate-50 flex items-center justify-center text-slate-400">
                              <p className="text-sm">Trình soạn thảo văn bản (Rich Text Editor)</p>
                              {/* Placeholder for Rich Text Editor */}
                           </div>
                        </div>
                     </div>

                     {/* Sidebar Settings */}
                     <div className="space-y-4">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                           <label className="block text-sm font-bold text-slate-700">Trạng thái</label>
                           <select 
                              value={formData.status}
                              onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                              className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none"
                           >
                              <option value="Draft">Nháp (Draft)</option>
                              <option value="Pending">Chờ duyệt</option>
                              <option value="Published">Xuất bản</option>
                              <option value="Hidden">Ẩn tin</option>
                           </select>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                           <label className="block text-sm font-bold text-slate-700">Phân loại</label>
                           <select 
                              value={formData.category}
                              onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                              className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none"
                           >
                              <option value="News">Tin tức</option>
                              <option value="Policy">Chính sách</option>
                              <option value="Event">Sự kiện</option>
                              <option value="Spotlight">Gương mặt</option>
                              <option value="Campaign">Chiến dịch</option>
                           </select>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                           <label className="block text-sm font-bold text-slate-700">Đối tượng hiển thị</label>
                           <select 
                              value={formData.targetAudience}
                              onChange={(e) => setFormData({...formData, targetAudience: e.target.value as any})}
                              className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none"
                           >
                              <option value="All">Toàn tập đoàn</option>
                              <option value="Department">Theo Khối/Đơn vị</option>
                              <option value="Group">Theo Nhóm</option>
                           </select>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                           <label className="block text-sm font-bold text-slate-700">Lịch xuất bản</label>
                           <div className="space-y-2">
                              <div>
                                 <span className="text-xs text-slate-500">Ngày đăng:</span>
                                 <input 
                                    type="date" 
                                    value={formData.scheduledPublishDate}
                                    onChange={(e) => setFormData({...formData, scheduledPublishDate: e.target.value})}
                                    className="w-full p-2 border border-slate-300 rounded-lg text-sm" 
                                 />
                              </div>
                              <div>
                                 <span className="text-xs text-slate-500">Tự động gỡ (Optional):</span>
                                 <input 
                                    type="date" 
                                    value={formData.scheduledUnpublishDate}
                                    onChange={(e) => setFormData({...formData, scheduledUnpublishDate: e.target.value})}
                                    className="w-full p-2 border border-slate-300 rounded-lg text-sm" 
                                 />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Media & Attachments */}
                  <div className="border-t border-slate-100 pt-4">
                     <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <ImageIcon size={18} /> Hình ảnh & Đính kèm
                     </h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                           <label className="block text-sm font-medium text-slate-600 mb-1">Ảnh bìa (URL)</label>
                           <div className="flex gap-2">
                              <input 
                                 type="text" 
                                 value={formData.image}
                                 onChange={(e) => setFormData({...formData, image: e.target.value})}
                                 className="flex-1 p-2 border border-slate-300 rounded-lg focus:outline-none"
                                 placeholder="https://..."
                              />
                              <button className="p-2 bg-slate-100 rounded-lg border border-slate-300 hover:bg-slate-200">
                                 <Upload size={18} />
                              </button>
                           </div>
                           {formData.image && (
                              <img src={formData.image} alt="Preview" className="mt-2 h-32 w-full object-cover rounded-lg border border-slate-200" />
                           )}
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-slate-600 mb-1">Tài liệu đính kèm</label>
                           <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 cursor-pointer transition-colors h-32">
                              <Upload size={24} className="mb-2" />
                              <span className="text-xs">Kéo thả file hoặc click để upload</span>
                              <span className="text-[10px] mt-1">(PDF, DOCX, JPG - Max 10MB)</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50 rounded-b-2xl">
                  <button 
                     onClick={() => setIsModalOpen(false)}
                     className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-100"
                  >
                     Hủy bỏ
                  </button>
                  <button 
                     onClick={handleSave}
                     className="px-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark shadow-sm flex items-center gap-2"
                  >
                     <Save size={18} /> {editingItem ? 'Cập nhật bài viết' : 'Lưu bài viết'}
                  </button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default AdminNews;
