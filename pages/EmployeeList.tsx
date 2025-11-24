
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit2, 
  UserPlus, 
  Download,
  ChevronDown,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { User, Tier } from '../types';

interface EmployeeListProps {
  onSelectEmployee?: (employee: User) => void;
}

// Export mock data so App can reuse if needed, or keeping it local to simulate API
export const mockEmployees: User[] = [
  { id: 'HH001', name: 'Nguyễn Văn Hiển', avatar: 'https://i.pravatar.cc/150?img=11', position: 'Senior Marketing Exec', department: 'Ban Truyền Thông', tier: Tier.GOLD, points: 4500, joinDate: '2020-03-15', status: 'Active', email: 'hien.nguyen@hunghau.vn' },
  { id: 'HH002', name: 'Trần Thị Mai', avatar: 'https://i.pravatar.cc/150?img=5', position: 'HR Manager', department: 'Ban Nhân Sự', tier: Tier.PLATINUM, points: 8200, joinDate: '2018-06-01', status: 'Active', email: 'mai.tran@hunghau.vn' },
  { id: 'HH003', name: 'Lê Văn Hùng', avatar: 'https://i.pravatar.cc/150?img=3', position: 'Sales Director', department: 'Khối Kinh Doanh', tier: Tier.GOLD, points: 5100, joinDate: '2019-11-20', status: 'Active', email: 'hung.le@hunghau.vn' },
  { id: 'HH004', name: 'Phạm Thu Hà', avatar: 'https://i.pravatar.cc/150?img=9', position: 'Accountant', department: 'Ban Tài Chính', tier: Tier.SILVER, points: 2300, joinDate: '2022-01-10', status: 'On Leave', email: 'ha.pham@hunghau.vn' },
  { id: 'HH005', name: 'Đỗ Minh Tuấn', avatar: 'https://i.pravatar.cc/150?img=12', position: 'Developer', department: 'Ban Công Nghệ', tier: Tier.MEMBER, points: 800, joinDate: '2023-08-15', status: 'Active', email: 'tuan.do@hunghau.vn' },
  { id: 'HH006', name: 'Nguyễn Ngọc Lan', avatar: 'https://i.pravatar.cc/150?img=44', position: 'Content Creator', department: 'Ban Truyền Thông', tier: Tier.SILVER, points: 1500, joinDate: '2022-05-20', status: 'Active', email: 'lan.nguyen@hunghau.vn' },
  { id: 'HH007', name: 'Hoàng Văn Nam', avatar: 'https://i.pravatar.cc/150?img=53', position: 'Logistics Officer', department: 'Khối Vận Hành', tier: Tier.GOLD, points: 4100, joinDate: '2020-09-05', status: 'Terminated', email: 'nam.hoang@hunghau.vn' },
  { id: 'HH008', name: 'Vũ Thị Thanh', avatar: 'https://i.pravatar.cc/150?img=24', position: 'Receptionist', department: 'Hành Chính', tier: Tier.MEMBER, points: 600, joinDate: '2023-02-01', status: 'Active', email: 'thanh.vu@hunghau.vn' },
];

const EmployeeList: React.FC<EmployeeListProps> = ({ onSelectEmployee }) => {
  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [tierFilter, setTierFilter] = useState('All');
  const [seniorityFilter, setSeniorityFilter] = useState('All');

  // Helper to calculate seniority in years
  const getSeniorityYears = (joinDate: string) => {
    const start = new Date(joinDate);
    const now = new Date();
    const diff = now.getTime() - start.getTime();
    return diff / (1000 * 60 * 60 * 24 * 365.25);
  };

  // Filter Logic
  const filteredEmployees = mockEmployees.filter(emp => {
    // Search Text
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      emp.name.toLowerCase().includes(searchLower) || 
      emp.id.toLowerCase().includes(searchLower) ||
      emp.email.toLowerCase().includes(searchLower);

    // Dropdowns
    const matchesDept = deptFilter === 'All' || emp.department === deptFilter;
    const matchesStatus = statusFilter === 'All' || emp.status === statusFilter;
    const matchesTier = tierFilter === 'All' || emp.tier === tierFilter;

    // Seniority
    let matchesSeniority = true;
    const years = getSeniorityYears(emp.joinDate);
    if (seniorityFilter === '<1') matchesSeniority = years < 1;
    else if (seniorityFilter === '1-3') matchesSeniority = years >= 1 && years < 3;
    else if (seniorityFilter === '3-5') matchesSeniority = years >= 3 && years < 5;
    else if (seniorityFilter === '>5') matchesSeniority = years >= 5;

    return matchesSearch && matchesDept && matchesStatus && matchesTier && matchesSeniority;
  });

  // Unique Departments for Filter
  const departments = Array.from(new Set(mockEmployees.map(e => e.department)));

  return (
    <div className="space-y-6">
      {/* Toolbar Area */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
        
        {/* Top Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
           <h2 className="text-lg font-bold text-slate-800 hidden md:block">Bộ lọc tìm kiếm</h2>
           <div className="flex gap-3 w-full md:w-auto">
             <button className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 transition-colors shadow-sm">
               <Download size={18} />
               <span className="hidden sm:inline">Xuất Excel</span>
             </button>
             <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-primary-dark transition-colors shadow-sm">
               <UserPlus size={18} />
               <span>Thêm mới</span>
             </button>
           </div>
        </div>

        {/* Filter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
           {/* Search */}
           <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Tìm theo tên, mã NV..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
           </div>

           {/* Department */}
           <div className="relative">
              <select 
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none appearance-none cursor-pointer"
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
              >
                <option value="All">Tất cả Đơn vị</option>
                {departments.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-2.5 text-slate-400 pointer-events-none" size={16} />
           </div>

           {/* Tier */}
           <div className="relative">
              <select 
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none appearance-none cursor-pointer"
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
              >
                <option value="All">Tất cả Hạng thẻ</option>
                <option value={Tier.MEMBER}>Member</option>
                <option value={Tier.SILVER}>Silver</option>
                <option value={Tier.GOLD}>Gold</option>
                <option value={Tier.PLATINUM}>Platinum</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 text-slate-400 pointer-events-none" size={16} />
           </div>

           {/* More Filters Row (Status & Seniority mixed to save space or separate) */}
           <div className="relative">
             <select
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none appearance-none cursor-pointer"
                value={seniorityFilter}
                onChange={(e) => setSeniorityFilter(e.target.value)}
             >
               <option value="All">Thâm niên</option>
               <option value="<1">&lt; 1 năm</option>
               <option value="1-3">1 - 3 năm</option>
               <option value="3-5">3 - 5 năm</option>
               <option value=">5">&gt; 5 năm</option>
             </select>
             <ChevronDown className="absolute right-3 top-2.5 text-slate-400 pointer-events-none" size={16} />
           </div>
        </div>

        {/* Secondary Status Filter Row if needed, or inline */}
        <div className="flex items-center gap-4 pt-2 border-t border-slate-50 overflow-x-auto">
           <span className="text-xs font-semibold text-slate-500 uppercase whitespace-nowrap">Trạng thái:</span>
           <div className="flex gap-2">
              {['All', 'Active', 'On Leave', 'Terminated'].map(status => (
                <button 
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                    statusFilter === status 
                      ? 'bg-blue-100 text-primary border border-blue-200' 
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {status === 'All' ? 'Tất cả' : status === 'Active' ? 'Đang làm việc' : status === 'On Leave' ? 'Tạm nghỉ' : 'Đã nghỉ việc'}
                </button>
              ))}
           </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
         <div className="overflow-x-auto">
           <table className="w-full text-left text-sm text-slate-600">
             <thead className="bg-slate-50 border-b border-slate-200">
               <tr>
                 <th className="px-6 py-4 font-semibold text-slate-700">Nhân sự</th>
                 <th className="px-6 py-4 font-semibold text-slate-700">Đơn vị / Vị trí</th>
                 <th className="px-6 py-4 font-semibold text-slate-700">Trạng thái</th>
                 <th className="px-6 py-4 font-semibold text-slate-700">Hạng thẻ</th>
                 <th className="px-6 py-4 font-semibold text-slate-700">Ngày gia nhập</th>
                 <th className="px-6 py-4 text-right font-semibold text-slate-700">Thao tác</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
               {filteredEmployees.map((emp) => (
                 <tr 
                   key={emp.id} 
                   className="hover:bg-slate-50 transition-colors group cursor-pointer"
                   onClick={() => onSelectEmployee && onSelectEmployee(emp)}
                 >
                   <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={emp.avatar} alt="" className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                        <div>
                          <div className="font-bold text-slate-800 group-hover:text-primary transition-colors">{emp.name}</div>
                          <div className="text-xs text-slate-500">{emp.id} • {emp.email}</div>
                        </div>
                      </div>
                   </td>
                   <td className="px-6 py-4">
                      <div className="font-medium text-slate-700">{emp.department}</div>
                      <div className="text-xs text-slate-500">{emp.position}</div>
                   </td>
                   <td className="px-6 py-4">
                      {emp.status === 'Active' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                          <CheckCircle size={12} /> Đang làm việc
                        </span>
                      )}
                      {emp.status === 'On Leave' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200">
                          <Clock size={12} /> Tạm nghỉ
                        </span>
                      )}
                      {emp.status === 'Terminated' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                          <XCircle size={12} /> Đã nghỉ việc
                        </span>
                      )}
                   </td>
                   <td className="px-6 py-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold border ${
                         emp.tier === Tier.PLATINUM ? 'bg-slate-800 text-white border-slate-600' :
                         emp.tier === Tier.GOLD ? 'bg-amber-100 text-amber-700 border-amber-200' :
                         emp.tier === Tier.SILVER ? 'bg-slate-100 text-slate-600 border-slate-300' :
                         'bg-blue-50 text-blue-600 border-blue-200'
                      }`}>
                        {emp.tier}
                      </span>
                   </td>
                   <td className="px-6 py-4">
                      <div className="text-slate-700 font-medium">{emp.joinDate}</div>
                      <div className="text-xs text-slate-500">{getSeniorityYears(emp.joinDate).toFixed(1)} năm</div>
                   </td>
                   <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={(e) => { e.stopPropagation(); onSelectEmployee && onSelectEmployee(emp); }}
                          className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-primary hover:border-primary transition-colors" 
                          title="Xem chi tiết"
                        >
                           <Eye size={16} />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); onSelectEmployee && onSelectEmployee(emp); }}
                          className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-accent hover:border-accent transition-colors" 
                          title="Chỉnh sửa"
                        >
                           <Edit2 size={16} />
                        </button>
                        <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-500 hover:text-slate-800 hover:border-slate-800 transition-colors">
                           <MoreHorizontal size={16} />
                        </button>
                      </div>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
         
         {/* Pagination - Visual only */}
         <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span>Hiển thị {filteredEmployees.length} / {mockEmployees.length} kết quả</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-white border border-slate-300 rounded hover:bg-slate-100 disabled:opacity-50">Trước</button>
              <button className="px-3 py-1 bg-primary text-white rounded hover:bg-primary-dark">1</button>
              <button className="px-3 py-1 bg-white border border-slate-300 rounded hover:bg-slate-100">2</button>
              <button className="px-3 py-1 bg-white border border-slate-300 rounded hover:bg-slate-100">3</button>
              <button className="px-3 py-1 bg-white border border-slate-300 rounded hover:bg-slate-100 disabled:opacity-50">Sau</button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default EmployeeList;
