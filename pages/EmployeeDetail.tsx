
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Edit2, 
  Calendar, 
  Briefcase, 
  Award, 
  FileText, 
  TrendingUp, 
  MapPin, 
  Mail, 
  Phone,
  User as UserIcon,
  CheckCircle
} from 'lucide-react';
import { User, WorkHistory, Activity, Tier } from '../types';

interface EmployeeDetailProps {
  employee: User;
  onBack: () => void;
}

// Mock Data specific to detail view
const mockHistory: WorkHistory[] = [
  { id: '1', date: '2023-01-15', type: 'Promotion', position: 'Senior Marketing Executive', department: 'Ban Truyền Thông', note: 'Thăng chức theo đánh giá năng lực năm 2022' },
  { id: '2', date: '2021-06-01', type: 'Transfer', position: 'Marketing Executive', department: 'Ban Truyền Thông', note: 'Điều chuyển từ Chi nhánh Miền Bắc' },
  { id: '3', date: '2020-03-15', type: 'NewHire', position: 'Junior Marketing', department: 'Chi nhánh Miền Bắc', note: 'Tiếp nhận nhân sự mới' },
];

const mockActivities: Activity[] = [
  { id: '1', date: '2023-10-20', type: 'Honor', name: 'Nhân viên xuất sắc Tháng 9', result: 'Được vinh danh' },
  { id: '2', date: '2023-09-15', type: 'Competition', name: 'Sáng tạo Hùng Hậu 2023', result: 'Giải Nhì', score: '85/100' },
  { id: '3', date: '2023-08-01', type: 'Survey', name: 'Khảo sát môi trường làm việc', result: 'Đã hoàn thành' },
  { id: '4', date: '2023-05-12', type: 'Competition', name: 'Giải chạy Marathon HHH', result: 'Top 100' },
  { id: '5', date: '2023-01-10', type: 'Honor', name: 'Thâm niên 3 năm', result: 'Kỷ niệm chương Bạc' },
];

const EmployeeDetail: React.FC<EmployeeDetailProps> = ({ employee, onBack }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'history' | 'activities'>('info');
  const [isEditing, setIsEditing] = useState(false);

  // Form State (Mock)
  const [formData, setFormData] = useState({
    phone: '0909 123 456',
    dob: '1995-08-20',
    address: '123 Nguyễn Văn Linh, Q.7, TP.HCM',
    manager: 'Trần Thị Mai',
    contractType: 'Hợp đồng không xác định thời hạn'
  });

  const handleSave = () => {
    setIsEditing(false);
    // Mock save logic
    alert("Đã cập nhật thông tin nhân sự thành công!");
  };

  const renderInfoTab = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
      {/* Personal Info */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
         <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <UserIcon className="text-primary" size={20} /> Thông tin cá nhân
            </h3>
         </div>
         <div className="space-y-5">
            <div className="grid grid-cols-3 gap-4 items-center">
               <label className="text-sm font-medium text-slate-500">Họ và tên</label>
               <div className="col-span-2 font-semibold text-slate-800">{employee.name}</div>
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
               <label className="text-sm font-medium text-slate-500">Ngày sinh</label>
               {isEditing ? (
                 <input type="date" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} className="col-span-2 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" />
               ) : (
                 <div className="col-span-2 text-slate-800">{formData.dob}</div>
               )}
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
               <label className="text-sm font-medium text-slate-500">Giới tính</label>
               <div className="col-span-2 text-slate-800">Nam</div>
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
               <label className="text-sm font-medium text-slate-500">Điện thoại</label>
               {isEditing ? (
                 <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="col-span-2 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" />
               ) : (
                 <div className="col-span-2 text-slate-800">{formData.phone}</div>
               )}
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
               <label className="text-sm font-medium text-slate-500">Email</label>
               <div className="col-span-2 text-slate-800">{employee.email}</div>
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
               <label className="text-sm font-medium text-slate-500">Địa chỉ</label>
               {isEditing ? (
                 <input type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="col-span-2 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" />
               ) : (
                 <div className="col-span-2 text-slate-800">{formData.address}</div>
               )}
            </div>
         </div>
      </div>

      {/* Work Info */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
         <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Briefcase className="text-secondary" size={20} /> Thông tin công việc
            </h3>
         </div>
         <div className="space-y-5">
            <div className="grid grid-cols-3 gap-4 items-center">
               <label className="text-sm font-medium text-slate-500">Mã nhân viên</label>
               <div className="col-span-2 font-bold text-slate-800">{employee.id}</div>
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
               <label className="text-sm font-medium text-slate-500">Đơn vị</label>
               <div className="col-span-2 text-slate-800">{employee.department}</div>
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
               <label className="text-sm font-medium text-slate-500">Chức danh</label>
               <div className="col-span-2 text-slate-800">{employee.position}</div>
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
               <label className="text-sm font-medium text-slate-500">Quản lý trực tiếp</label>
               {isEditing ? (
                 <input type="text" value={formData.manager} onChange={e => setFormData({...formData, manager: e.target.value})} className="col-span-2 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" />
               ) : (
                 <div className="col-span-2 text-slate-800 hover:text-primary cursor-pointer">{formData.manager}</div>
               )}
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
               <label className="text-sm font-medium text-slate-500">Loại hợp đồng</label>
               {isEditing ? (
                 <select value={formData.contractType} onChange={e => setFormData({...formData, contractType: e.target.value})} className="col-span-2 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none">
                   <option>Hợp đồng xác định thời hạn</option>
                   <option>Hợp đồng không xác định thời hạn</option>
                   <option>Thử việc</option>
                 </select>
               ) : (
                 <div className="col-span-2 text-slate-800">{formData.contractType}</div>
               )}
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
               <label className="text-sm font-medium text-slate-500">Ngày vào làm</label>
               <div className="col-span-2 text-slate-800">{employee.joinDate}</div>
            </div>
            <div className="grid grid-cols-3 gap-4 items-center">
               <label className="text-sm font-medium text-slate-500">Trạng thái</label>
               <div className="col-span-2">
                 <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                    employee.status === 'Active' ? 'bg-green-100 text-green-700' : 
                    employee.status === 'On Leave' ? 'bg-amber-100 text-amber-700' : 
                    'bg-red-100 text-red-700'
                 }`}>
                   {employee.status === 'Active' ? 'Đang làm việc' : employee.status === 'On Leave' ? 'Tạm nghỉ' : 'Đã nghỉ việc'}
                 </span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );

  const renderHistoryTab = () => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 max-w-3xl mx-auto animate-fade-in">
      <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
        <TrendingUp className="text-primary" size={20} /> Lộ trình phát triển
      </h3>
      <div className="relative pl-8 border-l-2 border-slate-100 space-y-8">
        {mockHistory.map((item, index) => (
          <div key={item.id} className="relative">
            {/* Dot */}
            <div className={`absolute -left-[41px] top-0 w-6 h-6 rounded-full border-4 border-white shadow-sm ${
              index === 0 ? 'bg-primary' : 'bg-slate-300'
            }`}></div>
            
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 hover:border-primary/30 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                 <h4 className="font-bold text-slate-800 text-lg">{item.position}</h4>
                 <span className="text-sm font-medium text-primary bg-blue-50 px-2 py-1 rounded">{item.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                 <Briefcase size={14} /> {item.department}
                 <span className="mx-1">•</span>
                 <span className={`font-semibold ${
                   item.type === 'Promotion' ? 'text-green-600' : 
                   item.type === 'Transfer' ? 'text-amber-600' : 'text-slate-600'
                 }`}>
                   {item.type === 'Promotion' ? 'Thăng chức' : item.type === 'Transfer' ? 'Điều chuyển' : 'Tiếp nhận'}
                 </span>
              </div>
              {item.note && (
                <p className="text-sm text-slate-500 italic mt-2 bg-white p-2 rounded border border-slate-100">
                  "{item.note}"
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderActivitiesTab = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
         <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-4 text-white shadow-md">
            <div className="flex justify-between items-start">
               <div>
                 <p className="text-amber-100 text-xs font-bold uppercase">Vinh danh</p>
                 <h3 className="text-2xl font-bold mt-1">05</h3>
               </div>
               <div className="bg-white/20 p-2 rounded-lg">
                 <Award size={20} />
               </div>
            </div>
         </div>
         <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white shadow-md">
            <div className="flex justify-between items-start">
               <div>
                 <p className="text-green-100 text-xs font-bold uppercase">Thi đua</p>
                 <h3 className="text-2xl font-bold mt-1">12</h3>
               </div>
               <div className="bg-white/20 p-2 rounded-lg">
                 <TrendingUp size={20} />
               </div>
            </div>
         </div>
         <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-md">
            <div className="flex justify-between items-start">
               <div>
                 <p className="text-blue-100 text-xs font-bold uppercase">Khảo sát</p>
                 <h3 className="text-2xl font-bold mt-1">100%</h3>
               </div>
               <div className="bg-white/20 p-2 rounded-lg">
                 <FileText size={20} />
               </div>
            </div>
            <p className="text-xs text-blue-100 mt-2">Tỷ lệ hoàn thành</p>
         </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
         <div className="p-4 border-b border-slate-100 bg-slate-50">
            <h3 className="font-bold text-slate-700">Danh sách hoạt động gần đây</h3>
         </div>
         <div className="divide-y divide-slate-100">
            {mockActivities.map((activity) => (
               <div key={activity.id} className="p-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                     <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border-4 border-white shadow-sm ${
                        activity.type === 'Honor' ? 'bg-amber-100 text-amber-600' :
                        activity.type === 'Competition' ? 'bg-green-100 text-green-600' :
                        'bg-blue-100 text-blue-600'
                     }`}>
                        {activity.type === 'Honor' ? <Award size={20} /> :
                         activity.type === 'Competition' ? <TrendingUp size={20} /> :
                         <FileText size={20} />}
                     </div>
                     <div>
                        <h4 className="font-bold text-slate-800 text-sm">{activity.name}</h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                           <span>{activity.date}</span>
                           <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                           <span className="uppercase tracking-wide">{
                              activity.type === 'Honor' ? 'Vinh danh' : 
                              activity.type === 'Competition' ? 'Thi đua' : 'Khảo sát'
                           }</span>
                        </div>
                     </div>
                  </div>
                  <div className="flex flex-col items-end min-w-[120px]">
                     <span className={`font-bold text-sm ${
                        activity.type === 'Honor' ? 'text-amber-600' :
                        activity.type === 'Competition' ? 'text-green-600' : 'text-blue-600'
                     }`}>
                        {activity.result}
                     </span>
                     {activity.score && (
                        <span className="text-xs text-slate-400 font-medium">Điểm: {activity.score}</span>
                     )}
                  </div>
               </div>
            ))}
         </div>
         <div className="p-4 border-t border-slate-100 text-center">
            <button className="text-primary text-sm font-semibold hover:text-primary-dark transition-colors">
               Xem tất cả hoạt động
            </button>
         </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
         <button 
           onClick={onBack}
           className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium"
         >
            <ArrowLeft size={20} /> Quay lại danh sách
         </button>
         
         <div className="flex gap-2">
            {isEditing ? (
               <>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50"
                  >
                     Hủy bỏ
                  </button>
                  <button 
                    onClick={handleSave}
                    className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark flex items-center gap-2 shadow-sm"
                  >
                     <Save size={18} /> Lưu thay đổi
                  </button>
               </>
            ) : (
               <button 
                 onClick={() => { setActiveTab('info'); setIsEditing(true); }}
                 className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 flex items-center gap-2 shadow-sm"
               >
                  <Edit2 size={18} /> Chỉnh sửa hồ sơ
               </button>
            )}
         </div>
      </div>

      {/* Employee Header Card */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-10 -mt-10"></div>
         <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            <img 
              src={employee.avatar} 
              alt={employee.name} 
              className="w-24 h-24 rounded-full border-4 border-slate-700 shadow-lg object-cover"
            />
            <div className="text-center md:text-left flex-1">
               <h1 className="text-2xl font-bold mb-1">{employee.name}</h1>
               <p className="text-slate-300 flex items-center justify-center md:justify-start gap-2 mb-3">
                  <Briefcase size={16} /> {employee.position}
                  <span className="text-slate-500">|</span>
                  <span>{employee.department}</span>
               </p>
               <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase ${
                      employee.tier === Tier.GOLD ? 'bg-amber-500/20 border-amber-500 text-amber-400' :
                      employee.tier === Tier.PLATINUM ? 'bg-slate-500/20 border-slate-400 text-slate-200' :
                      'bg-blue-500/20 border-blue-400 text-blue-300'
                  }`}>
                    {employee.tier} Member
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold border border-slate-600 bg-slate-800 text-slate-300">
                    {employee.points.toLocaleString()} Points
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold border border-slate-600 bg-slate-800 text-slate-300">
                    {employee.status === 'Active' ? 'Active' : 'Inactive'}
                  </span>
               </div>
            </div>
            <div className="hidden md:block text-right">
               <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Ngày gia nhập</p>
               <p className="font-bold text-lg">{employee.joinDate}</p>
               <p className="text-xs text-slate-400 mt-2">Thâm niên: 3.5 năm</p>
            </div>
         </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 bg-white sticky top-0 z-10 shadow-sm rounded-t-lg px-2">
         <button 
            onClick={() => setActiveTab('info')}
            className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
               activeTab === 'info' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
         >
            <UserIcon size={18} /> Thông tin hồ sơ
         </button>
         <button 
            onClick={() => setActiveTab('history')}
            className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
               activeTab === 'history' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
         >
            <Calendar size={18} /> Lịch sử công tác
         </button>
         <button 
            onClick={() => setActiveTab('activities')}
            className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors flex items-center gap-2 ${
               activeTab === 'activities' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
         >
            <Award size={18} /> Hoạt động nội bộ
         </button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
         {activeTab === 'info' && renderInfoTab()}
         {activeTab === 'history' && renderHistoryTab()}
         {activeTab === 'activities' && renderActivitiesTab()}
      </div>
    </div>
  );
};

export default EmployeeDetail;
