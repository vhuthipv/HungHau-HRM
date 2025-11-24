
import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Copy, 
  Trash2, 
  Calendar, 
  Users, 
  FileText, 
  X,
  CheckCircle,
  Clock,
  Archive
} from 'lucide-react';
import { Survey } from '../types';

// Mock Admin Surveys
const initialSurveys: Survey[] = [
  {
    id: '1',
    title: 'Khảo sát Môi trường làm việc Quý 3/2023',
    description: 'Đánh giá mức độ hài lòng về môi trường, cơ sở vật chất.',
    category: 'Satisfaction',
    startDate: '2023-10-01',
    endDate: '2023-10-31',
    status: 'Open',
    participants: 450,
    durationMinutes: 10,
    questionCount: 25,
    targetType: 'All',
    createdAt: '2023-09-25'
  },
  {
    id: '2',
    title: 'Đánh giá chất lượng đào tạo hội nhập',
    description: 'Dành cho nhân sự mới gia nhập trong tháng 9.',
    category: 'Training',
    startDate: '2023-10-05',
    endDate: '2023-10-25',
    status: 'Open',
    participants: 24,
    durationMinutes: 15,
    questionCount: 10,
    targetType: 'Group',
    targetValue: 'New Hires',
    createdAt: '2023-10-01'
  },
  {
    id: '3',
    title: 'Dự thảo: Kế hoạch Year End Party 2023',
    description: 'Khảo sát ý kiến về địa điểm và chủ đề.',
    category: 'Event',
    startDate: '2023-11-15',
    endDate: '2023-11-30',
    status: 'Draft',
    participants: 0,
    durationMinutes: 5,
    questionCount: 5,
    targetType: 'All',
    createdAt: '2023-10-24'
  },
  {
    id: '4',
    title: 'Khảo sát sức khỏe định kỳ 2022',
    description: 'Lưu trữ kết quả khảo sát năm ngoái.',
    category: 'General',
    startDate: '2022-08-01',
    endDate: '2022-08-15',
    status: 'Archived',
    participants: 890,
    durationMinutes: 5,
    questionCount: 8,
    targetType: 'All',
    createdAt: '2022-07-20'
  }
];

const AdminSurvey: React.FC = () => {
  const [surveys, setSurveys] = useState<Survey[]>(initialSurveys);
  const [filterStatus, setFilterStatus] = useState<'All' | 'Draft' | 'Open' | 'Closed' | 'Archived'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSurvey, setEditingSurvey] = useState<Survey | null>(null);

  // Mock Form State
  const [formData, setFormData] = useState<Partial<Survey>>({
    title: '',
    description: '',
    category: 'General',
    startDate: '',
    endDate: '',
    targetType: 'All',
    targetValue: '',
    status: 'Draft'
  });

  // Handlers
  const filteredSurveys = surveys.filter(s => {
    const matchStatus = filterStatus === 'All' || s.status === filterStatus;
    const matchSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleDuplicate = (survey: Survey) => {
    const newSurvey: Survey = {
      ...survey,
      id: Date.now().toString(),
      title: `${survey.title} (Sao chép)`,
      status: 'Draft',
      participants: 0,
      startDate: '',
      endDate: '',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setSurveys([newSurvey, ...surveys]);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa khảo sát này?')) {
      setSurveys(surveys.filter(s => s.id !== id));
    }
  };

  const handleEdit = (survey: Survey) => {
    setEditingSurvey(survey);
    setFormData(survey);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingSurvey(null);
    setFormData({
      title: '',
      description: '',
      category: 'General',
      startDate: '',
      endDate: '',
      targetType: 'All',
      status: 'Draft',
      questionCount: 0,
      durationMinutes: 0,
      participants: 0
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingSurvey) {
      setSurveys(surveys.map(s => s.id === editingSurvey.id ? { ...s, ...formData } as Survey : s));
    } else {
      const newSurvey: Survey = {
        ...(formData as Survey),
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0]
      };
      setSurveys([newSurvey, ...surveys]);
    }
    setIsModalOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-green-100 text-green-700 border-green-200';
      case 'Draft': return 'bg-slate-100 text-slate-600 border-slate-200';
      case 'Closed': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Archived': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Open': return <CheckCircle size={14} />;
      case 'Draft': return <Edit2 size={14} />;
      case 'Closed': return <Clock size={14} />;
      case 'Archived': return <Archive size={14} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header & Toolbar */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
           <div>
             <h2 className="text-xl font-bold text-slate-800">Quản lý Khảo sát</h2>
             <p className="text-sm text-slate-500">Tạo, phân phối và quản lý các chương trình khảo sát nội bộ.</p>
           </div>
           <button 
             onClick={handleCreate}
             className="bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-primary-dark transition-colors flex items-center gap-2 shadow-sm"
           >
             <Plus size={20} /> Tạo khảo sát mới
           </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-100">
           {/* Status Tabs */}
           <div className="flex bg-slate-100 p-1 rounded-lg w-full md:w-auto overflow-x-auto">
             {['All', 'Draft', 'Open', 'Closed', 'Archived'].map(status => (
               <button
                 key={status}
                 onClick={() => setFilterStatus(status as any)}
                 className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                   filterStatus === status ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                 }`}
               >
                 {status === 'All' ? 'Tất cả' : status === 'Draft' ? 'Nháp' : status === 'Open' ? 'Đang mở' : status === 'Closed' ? 'Đã đóng' : 'Lưu trữ'}
               </button>
             ))}
           </div>

           {/* Search */}
           <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Tìm kiếm khảo sát..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
           </div>
        </div>
      </div>

      {/* Surveys Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
         <div className="overflow-x-auto">
           <table className="w-full text-left text-sm text-slate-600">
             <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-bold text-slate-700">
               <tr>
                 <th className="px-6 py-4">Tên khảo sát</th>
                 <th className="px-6 py-4">Trạng thái</th>
                 <th className="px-6 py-4">Thời gian</th>
                 <th className="px-6 py-4">Đối tượng</th>
                 <th className="px-6 py-4 text-center">Tham gia</th>
                 <th className="px-6 py-4 text-right">Thao tác</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
               {filteredSurveys.map((survey) => (
                 <tr key={survey.id} className="hover:bg-slate-50 transition-colors group">
                   <td className="px-6 py-4">
                     <div className="font-bold text-slate-800 mb-1 group-hover:text-primary transition-colors">{survey.title}</div>
                     <div className="text-xs text-slate-500 flex items-center gap-2">
                       <span className="bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">{survey.category}</span>
                       <span>Tạo: {survey.createdAt}</span>
                     </div>
                   </td>
                   <td className="px-6 py-4">
                     <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(survey.status)}`}>
                       {getStatusIcon(survey.status)}
                       {survey.status === 'Draft' ? 'Nháp' : 
                        survey.status === 'Open' ? 'Đang mở' : 
                        survey.status === 'Closed' ? 'Đã đóng' : 'Lưu trữ'}
                     </span>
                   </td>
                   <td className="px-6 py-4">
                     {survey.status === 'Draft' ? (
                       <span className="text-slate-400 italic">Chưa thiết lập</span>
                     ) : (
                       <div className="flex flex-col text-xs font-medium">
                         <span className="text-green-600">BĐ: {survey.startDate}</span>
                         <span className="text-red-500">KT: {survey.endDate}</span>
                       </div>
                     )}
                   </td>
                   <td className="px-6 py-4">
                     <div className="flex items-center gap-2">
                       <Users size={16} className="text-slate-400" />
                       <span className="font-medium">
                         {survey.targetType === 'All' ? 'Toàn tập đoàn' : 
                          survey.targetType === 'Department' ? `Khối: ${survey.targetValue}` : 
                          `Nhóm: ${survey.targetValue}`}
                       </span>
                     </div>
                   </td>
                   <td className="px-6 py-4 text-center">
                     {survey.status === 'Draft' ? '-' : (
                       <span className="font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded-lg">{survey.participants}</span>
                     )}
                   </td>
                   <td className="px-6 py-4 text-right">
                     <div className="flex items-center justify-end gap-2">
                       <button 
                         onClick={() => handleEdit(survey)}
                         className="p-2 text-slate-500 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors" 
                         title="Chỉnh sửa"
                       >
                         <Edit2 size={18} />
                       </button>
                       <button 
                         onClick={() => handleDuplicate(survey)}
                         className="p-2 text-slate-500 hover:text-secondary hover:bg-green-50 rounded-lg transition-colors" 
                         title="Nhân bản"
                       >
                         <Copy size={18} />
                       </button>
                       <button 
                         onClick={() => handleDelete(survey.id)}
                         className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                         title="Xóa"
                       >
                         <Trash2 size={18} />
                       </button>
                     </div>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
         {filteredSurveys.length === 0 && (
           <div className="p-12 text-center text-slate-500">
             <FileText size={48} className="mx-auto mb-3 opacity-30" />
             <p>Không tìm thấy khảo sát nào.</p>
           </div>
         )}
      </div>

      {/* Config Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl animate-scale-in flex flex-col max-h-[90vh]">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                 <h3 className="text-xl font-bold text-slate-800">
                   {editingSurvey ? 'Chỉnh sửa Khảo sát' : 'Tạo Khảo sát mới'}
                 </h3>
                 <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                   <X size={24} />
                 </button>
              </div>
              
              <div className="p-6 overflow-y-auto space-y-6">
                 {/* Section 1: Basic Info */}
                 <div className="space-y-4">
                   <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                     <FileText size={16} /> Thông tin cơ bản
                   </h4>
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Tiêu đề khảo sát <span className="text-red-500">*</span></label>
                     <input 
                       type="text" 
                       value={formData.title} 
                       onChange={(e) => setFormData({...formData, title: e.target.value})}
                       className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                       placeholder="VD: Khảo sát ý kiến nhân viên..."
                     />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Chủ đề</label>
                        <select 
                          value={formData.category} 
                          onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                          className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                        >
                          <option value="General">Chung</option>
                          <option value="Satisfaction">Sự hài lòng</option>
                          <option value="Training">Đào tạo</option>
                          <option value="Event">Sự kiện</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Trạng thái</label>
                        <select 
                          value={formData.status} 
                          onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                          className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                        >
                          <option value="Draft">Nháp (Draft)</option>
                          <option value="Open">Đang mở (Open)</option>
                          <option value="Closed">Đã đóng (Closed)</option>
                          <option value="Archived">Lưu trữ (Archived)</option>
                        </select>
                      </div>
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Mô tả / Mục đích</label>
                     <textarea 
                       value={formData.description} 
                       onChange={(e) => setFormData({...formData, description: e.target.value})}
                       className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none h-24 resize-none"
                       placeholder="Mô tả mục đích khảo sát..."
                     ></textarea>
                   </div>
                 </div>

                 {/* Section 2: Configuration */}
                 <div className="space-y-4">
                   <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2 mt-4">
                     <Users size={16} /> Cấu hình phân phối & Thời gian
                   </h4>
                   
                   <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                         <label className="block text-sm font-medium text-slate-700 mb-1">Đối tượng nhận</label>
                         <select 
                            value={formData.targetType} 
                            onChange={(e) => setFormData({...formData, targetType: e.target.value as any})}
                            className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                         >
                            <option value="All">Toàn tập đoàn</option>
                            <option value="Department">Theo Khối/Đơn vị</option>
                            <option value="Group">Theo Nhóm nhân sự</option>
                         </select>
                      </div>
                      {formData.targetType !== 'All' && (
                        <div>
                           <label className="block text-sm font-medium text-slate-700 mb-1">Chọn chi tiết</label>
                           <input 
                             type="text" 
                             value={formData.targetValue} 
                             onChange={(e) => setFormData({...formData, targetValue: e.target.value})}
                             className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                             placeholder={formData.targetType === 'Department' ? 'VD: Khối Kinh Doanh' : 'VD: New Hires'}
                           />
                        </div>
                      )}
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Thời gian bắt đầu</label>
                        <input 
                          type="date" 
                          value={formData.startDate} 
                          onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                          className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Thời gian kết thúc</label>
                        <input 
                          type="date" 
                          value={formData.endDate} 
                          onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                          className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                      </div>
                   </div>
                 </div>
              </div>

              <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
                 <button 
                   onClick={() => setIsModalOpen(false)}
                   className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50"
                 >
                   Hủy bỏ
                 </button>
                 <button 
                   onClick={handleSave}
                   className="px-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark shadow-sm"
                 >
                   {editingSurvey ? 'Lưu thay đổi' : 'Tạo khảo sát'}
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminSurvey;
