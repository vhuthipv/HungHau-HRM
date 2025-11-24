
import React, { useState } from 'react';
import { 
  Megaphone, 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Send, 
  X, 
  Users,
  RefreshCcw,
  MoreVertical,
  Trash2
} from 'lucide-react';
import { AppNotification } from '../types';

const initialNotifications: AppNotification[] = [
  {
    id: '1',
    title: 'Thông báo bảo trì hệ thống ERP',
    preview: 'Hệ thống sẽ tạm ngừng hoạt động từ 22:00 ngày 25/10 để nâng cấp.',
    type: 'Urgent',
    targetType: 'All',
    isScheduled: false,
    scheduledTime: '2023-10-24T10:00:00',
    status: 'Sent',
    sentCount: 1250,
    totalTarget: 1250,
    createdAt: '2023-10-24T09:00:00',
    sender: 'Ban Công Nghệ'
  },
  {
    id: '2',
    title: 'Nhắc nhở: Khảo sát Môi trường làm việc',
    preview: 'Vui lòng hoàn thành khảo sát trước ngày 31/10.',
    type: 'General',
    targetType: 'Department',
    targetValue: 'Khối Sản Xuất',
    isScheduled: true,
    scheduledTime: '2023-10-30T09:00:00',
    status: 'Scheduled',
    totalTarget: 450,
    createdAt: '2023-10-25T14:30:00',
    sender: 'Ban Nhân Sự'
  },
  {
    id: '3',
    title: 'Chúc mừng sinh nhật tháng 11',
    preview: 'Gửi lời chúc tốt đẹp nhất đến các thành viên có sinh nhật trong tháng 11.',
    type: 'General',
    targetType: 'Group',
    targetValue: 'Sinh nhật T11',
    isScheduled: false,
    scheduledTime: '',
    status: 'Draft',
    createdAt: '2023-10-26T08:15:00',
    sender: 'Công đoàn'
  },
  {
    id: '4',
    title: 'Cảnh báo: Lỗi kết nối Server A',
    preview: 'Phát hiện sự cố kết nối tại chi nhánh Miền Bắc.',
    type: 'Urgent',
    targetType: 'All',
    isScheduled: false,
    scheduledTime: '2023-10-20T11:00:00',
    status: 'Error',
    sentCount: 500,
    totalTarget: 1200,
    errorLog: 'Timeout exception during batch send.',
    createdAt: '2023-10-20T10:55:00',
    sender: 'System Admin'
  }
];

const AdminNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState<Partial<AppNotification>>({
    title: '',
    preview: '',
    type: 'General',
    targetType: 'All',
    targetValue: '',
    isScheduled: false,
    scheduledTime: '',
    status: 'Draft'
  });

  const filteredNotifications = notifications.filter(n => {
    const matchStatus = filterStatus === 'All' || n.status === filterStatus;
    const matchSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleCreate = () => {
    setFormData({
      title: '',
      preview: '',
      type: 'General',
      targetType: 'All',
      targetValue: '',
      isScheduled: false,
      scheduledTime: new Date().toISOString().slice(0, 16), // Current time for input
      status: 'Draft'
    });
    setIsModalOpen(true);
  };

  const handleSave = (action: 'Draft' | 'Send') => {
    const newNoti: AppNotification = {
      ...(formData as AppNotification),
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      sender: 'Admin', // Mock sender
      status: action === 'Draft' ? 'Draft' : (formData.isScheduled ? 'Scheduled' : 'Sending'),
      sentCount: 0,
      totalTarget: 1000 // Mock total
    };

    // Simulate Sending Process
    if (action === 'Send' && !formData.isScheduled) {
      setTimeout(() => {
        setNotifications(prev => prev.map(n => n.id === newNoti.id ? { ...n, status: 'Sent', sentCount: n.totalTarget } : n));
      }, 3000);
    }

    setNotifications([newNoti, ...notifications]);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa thông báo này?')) {
      setNotifications(notifications.filter(n => n.id !== id));
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Sent': return <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold border border-green-200"><CheckCircle size={12} /> Đã gửi</span>;
      case 'Sending': return <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-bold border border-yellow-200 animate-pulse"><RefreshCcw size={12} className="animate-spin" /> Đang gửi</span>;
      case 'Scheduled': return <span className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-bold border border-blue-200"><Clock size={12} /> Đã lên lịch</span>;
      case 'Draft': return <span className="flex items-center gap-1 bg-slate-100 text-slate-600 px-2 py-1 rounded-full text-xs font-bold border border-slate-200">Nháp</span>;
      case 'Error': return <span className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold border border-red-200"><AlertTriangle size={12} /> Lỗi gửi</span>;
      default: return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'Urgent': return 'text-red-600 bg-red-50 border-red-100';
      case 'Unit': return 'text-green-600 bg-green-50 border-green-100';
      default: return 'text-blue-600 bg-blue-50 border-blue-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Toolbar */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
           <div>
             <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
               <Megaphone className="text-primary" /> Quản lý Thông báo & Push Notification
             </h2>
             <p className="text-sm text-slate-500">Gửi thông báo tức thời hoặc lên lịch gửi đến ứng dụng di động và web.</p>
           </div>
           <button 
             onClick={handleCreate}
             className="bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-primary-dark transition-colors flex items-center gap-2 shadow-sm"
           >
             <Plus size={20} /> Tạo thông báo
           </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t border-slate-100">
           {/* Status Filters */}
           <div className="flex bg-slate-100 p-1 rounded-lg w-full md:w-auto overflow-x-auto">
             {['All', 'Sent', 'Scheduled', 'Draft', 'Error'].map((status) => (
               <button
                 key={status}
                 onClick={() => setFilterStatus(status)}
                 className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                   filterStatus === status ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                 }`}
               >
                 {status === 'All' ? 'Tất cả' : status === 'Sent' ? 'Đã gửi' : status === 'Scheduled' ? 'Chờ gửi' : status === 'Draft' ? 'Nháp' : 'Lỗi'}
               </button>
             ))}
           </div>

           {/* Search */}
           <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Tìm kiếm thông báo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
           </div>
        </div>
      </div>

      {/* Notifications Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
         <div className="overflow-x-auto">
           <table className="w-full text-left text-sm text-slate-600">
             <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-bold text-slate-700">
               <tr>
                 <th className="px-6 py-4">Nội dung thông báo</th>
                 <th className="px-6 py-4">Loại / Đối tượng</th>
                 <th className="px-6 py-4">Trạng thái</th>
                 <th className="px-6 py-4">Lịch gửi</th>
                 <th className="px-6 py-4 text-right">Thao tác</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
               {filteredNotifications.map((noti) => (
                 <tr key={noti.id} className="hover:bg-slate-50 transition-colors">
                   <td className="px-6 py-4 max-w-md">
                     <div className="font-bold text-slate-800 mb-1">{noti.title}</div>
                     <p className="text-xs text-slate-500 line-clamp-2">{noti.preview}</p>
                     {noti.errorLog && (
                       <div className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded border border-red-100 flex items-start gap-1">
                         <AlertTriangle size={12} className="mt-0.5 flex-shrink-0" />
                         <span>{noti.errorLog}</span>
                       </div>
                     )}
                   </td>
                   <td className="px-6 py-4">
                     <div className="flex flex-col gap-2">
                        <span className={`self-start px-2 py-1 rounded text-xs font-bold border ${getTypeColor(noti.type)}`}>
                          {noti.type === 'Urgent' ? 'Khẩn cấp' : noti.type === 'Unit' ? 'Đơn vị' : 'Chung'}
                        </span>
                        <div className="text-xs flex items-center gap-1 text-slate-500">
                          <Users size={12} /> 
                          {noti.targetType === 'All' ? 'Toàn tập đoàn' : 
                           noti.targetType === 'Department' ? `Khối: ${noti.targetValue}` : 
                           `Nhóm: ${noti.targetValue}`}
                        </div>
                     </div>
                   </td>
                   <td className="px-6 py-4">
                      <div className="space-y-1">
                        {getStatusBadge(noti.status)}
                        {noti.status === 'Sent' && (
                          <div className="text-xs text-slate-400">
                            {noti.sentCount}/{noti.totalTarget} thiết bị
                          </div>
                        )}
                      </div>
                   </td>
                   <td className="px-6 py-4">
                      {noti.isScheduled ? (
                        <div className="text-xs">
                          <span className="font-bold text-blue-600 block mb-1">Lên lịch:</span>
                          <span className="text-slate-600">{new Date(noti.scheduledTime).toLocaleString()}</span>
                        </div>
                      ) : (
                        <div className="text-xs text-slate-500">
                          Gửi ngay
                          <span className="block text-slate-400 mt-1">{new Date(noti.createdAt).toLocaleDateString()}</span>
                        </div>
                      )}
                   </td>
                   <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {noti.status === 'Draft' || noti.status === 'Error' ? (
                          <button 
                            onClick={() => handleDelete(noti.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        ) : (
                          <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors">
                            <MoreVertical size={16} />
                          </button>
                        )}
                      </div>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
         {filteredNotifications.length === 0 && (
            <div className="p-12 text-center text-slate-500">
               <Megaphone size={48} className="mx-auto mb-3 opacity-30" />
               <p>Chưa có thông báo nào.</p>
            </div>
         )}
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl animate-scale-in flex flex-col max-h-[90vh]">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                 <h3 className="text-xl font-bold text-slate-800">Tạo thông báo mới</h3>
                 <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                   <X size={24} />
                 </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-6">
                 {/* Content Info */}
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Tiêu đề thông báo <span className="text-red-500">*</span></label>
                    <input 
                       type="text" 
                       value={formData.title}
                       onChange={(e) => setFormData({...formData, title: e.target.value})}
                       className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none mb-4"
                       placeholder="Nhập tiêu đề ngắn gọn..."
                    />
                    <label className="block text-sm font-bold text-slate-700 mb-1">Nội dung (Preview) <span className="text-red-500">*</span></label>
                    <textarea 
                       value={formData.preview}
                       onChange={(e) => setFormData({...formData, preview: e.target.value})}
                       className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none h-20 resize-none"
                       placeholder="Nội dung hiển thị trên popup thông báo..."
                    />
                 </div>

                 {/* Configuration Grid */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Targeting */}
                    <div className="space-y-3">
                       <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-1">
                          Phân loại & Đối tượng
                       </h4>
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Loại thông báo</label>
                          <select 
                             value={formData.type}
                             onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                             className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none text-sm"
                          >
                             <option value="General">Thông báo chung</option>
                             <option value="Urgent">Khẩn cấp / Quan trọng</option>
                             <option value="Unit">Thông báo Đơn vị</option>
                          </select>
                       </div>
                       <div>
                          <label className="block text-xs font-semibold text-slate-500 mb-1">Gửi đến</label>
                          <select 
                             value={formData.targetType}
                             onChange={(e) => setFormData({...formData, targetType: e.target.value as any})}
                             className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none text-sm"
                          >
                             <option value="All">Toàn tập đoàn</option>
                             <option value="Department">Theo Khối/Đơn vị</option>
                             <option value="Group">Theo Nhóm nhân sự</option>
                          </select>
                       </div>
                       {formData.targetType !== 'All' && (
                          <div>
                             <input 
                                type="text" 
                                value={formData.targetValue}
                                onChange={(e) => setFormData({...formData, targetValue: e.target.value})}
                                className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none text-sm"
                                placeholder={formData.targetType === 'Department' ? 'Nhập tên đơn vị...' : 'Nhập tên nhóm...'}
                             />
                          </div>
                       )}
                    </div>

                    {/* Scheduling */}
                    <div className="space-y-3">
                       <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-1">
                          Thời gian gửi
                       </h4>
                       <div className="flex items-center gap-4 py-2">
                          <label className="flex items-center gap-2 cursor-pointer">
                             <input 
                                type="radio" 
                                name="schedule" 
                                checked={!formData.isScheduled}
                                onChange={() => setFormData({...formData, isScheduled: false})}
                                className="accent-primary"
                             />
                             <span className="text-sm text-slate-700">Gửi ngay lập tức</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                             <input 
                                type="radio" 
                                name="schedule" 
                                checked={formData.isScheduled}
                                onChange={() => setFormData({...formData, isScheduled: true})}
                                className="accent-primary"
                             />
                             <span className="text-sm text-slate-700">Lên lịch gửi</span>
                          </label>
                       </div>
                       
                       {formData.isScheduled && (
                          <div className="animate-fade-in bg-blue-50 p-3 rounded-lg border border-blue-100">
                             <label className="block text-xs font-semibold text-blue-700 mb-1">Thời gian mong muốn</label>
                             <input 
                                type="datetime-local"
                                value={formData.scheduledTime}
                                onChange={(e) => setFormData({...formData, scheduledTime: e.target.value})}
                                className="w-full p-2 border border-blue-200 rounded bg-white text-sm focus:outline-none"
                             />
                          </div>
                       )}
                    </div>
                 </div>
              </div>

              <div className="p-6 border-t border-slate-100 flex justify-between bg-slate-50 rounded-b-2xl">
                 <button 
                    onClick={() => handleSave('Draft')}
                    className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-100"
                 >
                    Lưu nháp
                 </button>
                 <div className="flex gap-3">
                    <button 
                       onClick={() => setIsModalOpen(false)}
                       className="px-4 py-2 text-slate-500 font-medium hover:text-slate-700"
                    >
                       Hủy
                    </button>
                    <button 
                       onClick={() => handleSave('Send')}
                       className="px-6 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark shadow-sm flex items-center gap-2"
                    >
                       <Send size={18} /> {formData.isScheduled ? 'Lên lịch' : 'Gửi thông báo'}
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminNotifications;
