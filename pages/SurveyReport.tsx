
import React, { useState } from 'react';
import { 
  Download, 
  Filter, 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  FileText,
  ChevronDown,
  Printer
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

// Mock Data for Reports
const mockSurveysList = [
  { id: '1', title: 'Khảo sát Môi trường làm việc Quý 3/2023' },
  { id: '2', title: 'Đánh giá chất lượng đào tạo hội nhập' },
  { id: '3', title: 'Bình chọn tiết mục Văn nghệ HHH' },
];

const participationData = [
  { name: 'Ban Truyền Thông', participated: 45, total: 50 },
  { name: 'Ban Nhân Sự', participated: 28, total: 30 },
  { name: 'Khối Kinh Doanh', participated: 120, total: 150 },
  { name: 'Ban Tài Chính', participated: 35, total: 40 },
  { name: 'Ban Công Nghệ', participated: 40, total: 45 },
  { name: 'Khối Vận Hành', participated: 80, total: 100 },
];

const statusData = [
  { name: 'Hoàn thành', value: 348, color: '#00a651' },
  { name: 'Đang thực hiện', value: 42, color: '#f59e0b' },
  { name: 'Chưa tham gia', value: 25, color: '#ef4444' },
];

const SurveyReport: React.FC = () => {
  const [selectedSurvey, setSelectedSurvey] = useState(mockSurveysList[0].id);
  const [deptFilter, setDeptFilter] = useState('All');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // KPIs Calculation (Mock based on selected survey generally)
  const totalInvited = 415;
  const totalParticipated = 348;
  const totalNotParticipated = 67;
  const completionRate = Math.round((totalParticipated / totalInvited) * 100);

  const handleExportExcel = () => {
    alert("Đang xuất dữ liệu báo cáo ra Excel...");
  };

  const handleExportPDF = () => {
    alert("Đang tạo báo cáo PDF...");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Controls & Filters Toolbar */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
           <div className="flex-1 w-full md:w-auto">
             <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Chọn khảo sát báo cáo</label>
             <div className="relative">
               <select 
                 className="w-full md:w-96 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer"
                 value={selectedSurvey}
                 onChange={(e) => setSelectedSurvey(e.target.value)}
               >
                 {mockSurveysList.map(s => (
                   <option key={s.id} value={s.id}>{s.title}</option>
                 ))}
               </select>
               <ChevronDown className="absolute right-3 top-3 text-slate-500 pointer-events-none" size={16} />
             </div>
           </div>

           <div className="flex gap-3 w-full md:w-auto">
             <button 
               onClick={handleExportExcel}
               className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-green-600 text-green-700 px-4 py-2 rounded-lg font-bold hover:bg-green-50 transition-colors shadow-sm"
             >
               <Download size={18} /> Xuất Excel
             </button>
             <button 
               onClick={handleExportPDF}
               className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-primary-dark transition-colors shadow-sm"
             >
               <Printer size={18} /> Xuất PDF
             </button>
           </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 pt-4 border-t border-slate-100">
           <div className="flex items-center gap-2">
              <Filter size={18} className="text-slate-400" />
              <span className="text-sm font-semibold text-slate-700">Bộ lọc:</span>
           </div>
           
           <select 
             className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none cursor-pointer"
             value={deptFilter}
             onChange={(e) => setDeptFilter(e.target.value)}
           >
             <option value="All">Tất cả Đơn vị</option>
             <option value="Ban Truyền Thông">Ban Truyền Thông</option>
             <option value="Ban Nhân Sự">Ban Nhân Sự</option>
             <option value="Khối Kinh Doanh">Khối Kinh Doanh</option>
           </select>

           <div className="flex items-center gap-2">
             <input type="date" className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" placeholder="Từ ngày" />
             <span className="text-slate-400">-</span>
             <input type="date" className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" placeholder="Đến ngày" />
           </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Invited */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
           <div>
              <p className="text-slate-500 text-xs font-bold uppercase mb-1">Tổng người được mời</p>
              <h3 className="text-3xl font-bold text-slate-800">{totalInvited}</h3>
           </div>
           <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <Users size={24} />
           </div>
        </div>

        {/* Card 2: Participated */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
           <div>
              <p className="text-slate-500 text-xs font-bold uppercase mb-1">Đã tham gia</p>
              <h3 className="text-3xl font-bold text-green-600">{totalParticipated}</h3>
           </div>
           <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
              <CheckCircle size={24} />
           </div>
        </div>

        {/* Card 3: Not Participated */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
           <div>
              <p className="text-slate-500 text-xs font-bold uppercase mb-1">Chưa tham gia</p>
              <h3 className="text-3xl font-bold text-red-500">{totalNotParticipated}</h3>
           </div>
           <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500">
              <XCircle size={24} />
           </div>
        </div>

        {/* Card 4: Completion Rate */}
        <div className="bg-gradient-to-br from-primary to-primary-dark p-6 rounded-2xl shadow-md text-white flex items-center justify-between">
           <div>
              <p className="text-blue-100 text-xs font-bold uppercase mb-1">Tỷ lệ hoàn thành</p>
              <h3 className="text-3xl font-bold">{completionRate}%</h3>
           </div>
           <div className="relative w-16 h-16">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  className="text-blue-400"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  opacity="0.3"
                />
                <path
                  className="text-white"
                  strokeDasharray={`${completionRate}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                />
              </svg>
           </div>
        </div>
      </div>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Left: Bar Chart */}
         <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
               <Users className="text-primary" size={20} /> Thống kê tham gia theo Đơn vị
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={participationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{fontSize: 12}} interval={0} angle={-15} textAnchor="end" height={60} />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    cursor={{ fill: '#f8fafc' }}
                  />
                  <Bar dataKey="participated" name="Đã tham gia" fill="#005eb8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="total" name="Tổng nhân sự" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </div>
         </div>

         {/* Right: Pie Chart */}
         <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
               <FileText className="text-secondary" size={20} /> Trạng thái hoàn thành
            </h3>
            <div className="flex-1 min-h-[250px]">
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie
                     data={statusData}
                     cx="50%"
                     cy="50%"
                     innerRadius={60}
                     outerRadius={80}
                     paddingAngle={5}
                     dataKey="value"
                   >
                     {statusData.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={entry.color} />
                     ))}
                   </Pie>
                   <Tooltip />
                   <Legend verticalAlign="bottom" height={36} />
                 </PieChart>
               </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-3">
               {statusData.map((item) => (
                  <div key={item.name} className="flex justify-between items-center text-sm">
                     <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-slate-600">{item.name}</span>
                     </div>
                     <span className="font-bold text-slate-800">{item.value}</span>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* Detailed Table Preview (Optional but helpful) */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
         <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-slate-700">Chi tiết người chưa tham gia (Top 5)</h3>
            <button className="text-primary text-xs font-bold hover:underline">Xem toàn bộ danh sách</button>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-600">
               <thead className="bg-white text-xs uppercase font-bold text-slate-500 border-b border-slate-100">
                  <tr>
                     <th className="px-6 py-3">Mã NV</th>
                     <th className="px-6 py-3">Họ tên</th>
                     <th className="px-6 py-3">Đơn vị</th>
                     <th className="px-6 py-3">Trạng thái</th>
                     <th className="px-6 py-3 text-right">Nhắc nhở</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {[1, 2, 3, 4, 5].map((i) => (
                     <tr key={i} className="hover:bg-slate-50">
                        <td className="px-6 py-3 font-medium">HH00{i+50}</td>
                        <td className="px-6 py-3">Nhân viên {i}</td>
                        <td className="px-6 py-3">Ban Truyền Thông</td>
                        <td className="px-6 py-3"><span className="text-red-500 font-medium text-xs bg-red-50 px-2 py-1 rounded">Chưa tham gia</span></td>
                        <td className="px-6 py-3 text-right">
                           <button className="text-primary hover:text-primary-dark font-medium text-xs border border-primary px-2 py-1 rounded hover:bg-blue-50 transition-colors">
                              Gửi Email
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default SurveyReport;
