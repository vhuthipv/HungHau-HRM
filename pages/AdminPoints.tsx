
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  List, 
  History, 
  Plus, 
  Filter, 
  Search, 
  Download, 
  Calendar, 
  Users, 
  Edit2,
  X,
  PieChart,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Wallet
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { PointProgram, User, Tier } from '../types';

// --- Mock Data ---

const mockPrograms: PointProgram[] = [
  { id: '1', name: 'Thưởng dự án Quý 4', startDate: '2023-10-01', endDate: '2023-12-31', status: 'Active', targetAudience: 'All', budget: 100000, ruleType: 'Fixed', pointsValue: 500, description: 'Thưởng hoàn thành KPI dự án' },
  { id: '2', name: 'Sinh nhật công ty', startDate: '2023-09-01', endDate: '2023-09-30', status: 'Expired', targetAudience: 'All', budget: 50000, ruleType: 'Fixed', pointsValue: 200, description: 'Quà mừng sinh nhật tập đoàn' },
  { id: '3', name: 'Best Seller Tháng 11', startDate: '2023-11-01', endDate: '2023-11-30', status: 'Scheduled', targetAudience: 'Department', targetValue: 'Kinh Doanh', budget: 20000, ruleType: 'Fixed', pointsValue: 1000, description: 'Dành cho nhân viên Sales xuất sắc' },
];

const mockTransactions = [
  { id: 'TRX001', employee: 'Nguyễn Văn Hiển', dept: 'Ban Truyền Thông', type: 'Earn', amount: 500, date: '2023-10-24', program: 'Thưởng dự án Quý 4' },
  { id: 'TRX002', employee: 'Trần Thị Mai', dept: 'Ban Nhân Sự', type: 'Redeem', amount: -1000, date: '2023-10-22', program: 'Đổi Voucher GotIt' },
  { id: 'TRX003', employee: 'Lê Văn Hùng', dept: 'Khối Kinh Doanh', type: 'Earn', amount: 200, date: '2023-10-20', program: 'Sinh nhật công ty' },
  { id: 'TRX004', employee: 'Phạm Thu Hà', dept: 'Ban Tài Chính', type: 'Redeem', amount: -500, date: '2023-10-18', program: 'Đổi quà HHH' },
  { id: 'TRX005', employee: 'Nguyễn Văn Hiển', dept: 'Ban Truyền Thông', type: 'Earn', amount: 100, date: '2023-10-15', program: 'Check-in Sự kiện' },
  { id: 'TRX006', employee: 'Đỗ Minh Tuấn', dept: 'Ban Công Nghệ', type: 'Earn', amount: 300, date: '2023-10-10', program: 'Bug Bounty' },
];

const topUsers = [
  { name: 'Nguyễn Văn Hiển', dept: 'Ban Truyền Thông', points: 4500 },
  { name: 'Trần Thị Mai', dept: 'Ban Nhân Sự', points: 4200 },
  { name: 'Lê Văn Hùng', dept: 'Khối Kinh Doanh', points: 3800 },
  { name: 'Phạm Thu Hà', dept: 'Ban Tài Chính', points: 2300 },
];

const topDepts = [
  { name: 'Kinh Doanh', points: 15000 },
  { name: 'Truyền Thông', points: 12500 },
  { name: 'Công Nghệ', points: 8000 },
  { name: 'Nhân Sự', points: 6000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// --- Component ---

const AdminPoints: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'programs' | 'transactions'>('dashboard');
  const [isProgramModalOpen, setProgramModalOpen] = useState(false);

  // Filter States for Transactions
  const [trxSearch, setTrxSearch] = useState('');
  const [trxDeptFilter, setTrxDeptFilter] = useState('All');
  const [trxTypeFilter, setTrxTypeFilter] = useState('All');

  // --- Dashboard Tab ---
  const renderDashboard = () => (
    <div className="space-y-6 animate-fade-in">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm font-medium mb-1">Tổng điểm phát hành</p>
            <h3 className="text-3xl font-bold text-primary">1,250,000</h3>
            <p className="text-green-500 text-xs font-bold flex items-center mt-2">
              <ArrowUpRight size={14} /> +12% tháng này
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-full text-primary">
            <Wallet size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm font-medium mb-1">Tổng điểm đã sử dụng</p>
            <h3 className="text-3xl font-bold text-accent">840,000</h3>
            <p className="text-slate-400 text-xs mt-2">67.2% tỷ lệ sử dụng</p>
          </div>
          <div className="p-4 bg-amber-50 rounded-full text-accent">
            <PieChart size={24} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm font-medium mb-1">Điểm còn tồn</p>
            <h3 className="text-3xl font-bold text-slate-700">410,000</h3>
            <p className="text-slate-400 text-xs mt-2">Giá trị ước tính: 410tr VNĐ</p>
          </div>
          <div className="p-4 bg-slate-100 rounded-full text-slate-600">
            <History size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Departments Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <TrendingUp className="text-secondary" size={20} /> Top Đơn vị Tích cực
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topDepts} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="points" fill="#00a651" radius={[0, 4, 4, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Users List */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
           <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Users className="text-primary" size={20} /> Top Người dùng năng nổ
          </h3>
          <div className="space-y-4">
            {topUsers.map((user, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors border border-slate-100">
                <div className="flex items-center gap-3">
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs ${idx === 0 ? 'bg-yellow-400' : idx === 1 ? 'bg-slate-400' : idx === 2 ? 'bg-amber-600' : 'bg-slate-200 text-slate-600'}`}>
                     {idx + 1}
                   </div>
                   <div>
                     <p className="text-sm font-bold text-slate-800">{user.name}</p>
                     <p className="text-xs text-slate-500">{user.dept}</p>
                   </div>
                </div>
                <span className="font-bold text-primary">{user.points.toLocaleString()} P</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // --- Programs Tab ---
  const renderPrograms = () => (
    <div className="space-y-6 animate-fade-in">
       <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-700">Danh sách chương trình</h3>
          <button 
            onClick={() => setProgramModalOpen(true)}
            className="bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-primary-dark transition-colors flex items-center gap-2 text-sm shadow-sm"
          >
            <Plus size={16} /> Tạo chương trình
          </button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockPrograms.map((prog) => (
            <div key={prog.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-5 flex flex-col">
               <div className="flex justify-between items-start mb-3">
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                    prog.status === 'Active' ? 'bg-green-100 text-green-700' :
                    prog.status === 'Expired' ? 'bg-slate-100 text-slate-500' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {prog.status === 'Active' ? 'Đang chạy' : prog.status === 'Expired' ? 'Đã kết thúc' : 'Sắp diễn ra'}
                  </span>
                  <button className="text-slate-400 hover:text-primary"><Edit2 size={16} /></button>
               </div>
               <h4 className="font-bold text-slate-800 text-lg mb-1">{prog.name}</h4>
               <p className="text-xs text-slate-500 mb-4 h-8 line-clamp-2">{prog.description}</p>
               
               <div className="space-y-2 mb-4 flex-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Thời gian:</span>
                    <span className="font-medium text-slate-700">{prog.startDate} - {prog.endDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Đối tượng:</span>
                    <span className="font-medium text-slate-700">{prog.targetAudience === 'All' ? 'Toàn công ty' : prog.targetValue}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Giá trị điểm:</span>
                    <span className="font-bold text-accent">+{prog.pointsValue.toLocaleString()} P</span>
                  </div>
               </div>
               
               <div className="pt-3 border-t border-slate-100 text-xs text-slate-400 flex justify-between">
                 <span>Ngân sách: {prog.budget.toLocaleString()}</span>
                 <span>ID: P-{prog.id}</span>
               </div>
            </div>
          ))}
       </div>

       {/* Modal Form (Mock) */}
       {isProgramModalOpen && (
         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl animate-scale-in">
               <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                 <h3 className="font-bold text-xl text-slate-800">Thiết lập chương trình điểm</h3>
                 <button onClick={() => setProgramModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
               </div>
               <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tên chương trình</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg" placeholder="VD: Thưởng Tết 2024" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Ngày bắt đầu</label>
                      <input type="date" className="w-full p-2 border border-slate-300 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Ngày kết thúc</label>
                      <input type="date" className="w-full p-2 border border-slate-300 rounded-lg" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Đối tượng áp dụng</label>
                      <select className="w-full p-2 border border-slate-300 rounded-lg">
                        <option value="All">Toàn bộ nhân sự</option>
                        <option value="Dept">Theo đơn vị</option>
                        <option value="Tier">Theo hạng thẻ</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Luật tính điểm</label>
                      <select className="w-full p-2 border border-slate-300 rounded-lg">
                         <option>Cố định (Fixed Amount)</option>
                         <option>Theo % Giao dịch</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Số điểm thưởng</label>
                    <input type="number" className="w-full p-2 border border-slate-300 rounded-lg" placeholder="VD: 500" />
                  </div>
               </div>
               <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
                  <button onClick={() => setProgramModalOpen(false)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-50 rounded-lg">Hủy</button>
                  <button onClick={() => setProgramModalOpen(false)} className="px-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark">Lưu chương trình</button>
               </div>
            </div>
         </div>
       )}
    </div>
  );

  // --- Transactions Tab ---
  const renderTransactions = () => {
    const filteredTrx = mockTransactions.filter(t => {
      const matchSearch = t.employee.toLowerCase().includes(trxSearch.toLowerCase());
      const matchDept = trxDeptFilter === 'All' || t.dept === trxDeptFilter;
      const matchType = trxTypeFilter === 'All' || t.type === trxTypeFilter;
      return matchSearch && matchDept && matchType;
    });

    return (
      <div className="space-y-4 animate-fade-in">
        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4">
           <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Tìm nhân sự..." 
                value={trxSearch}
                onChange={(e) => setTrxSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
           </div>
           <select 
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
              value={trxDeptFilter}
              onChange={(e) => setTrxDeptFilter(e.target.value)}
           >
              <option value="All">Tất cả Đơn vị</option>
              <option value="Ban Truyền Thông">Ban Truyền Thông</option>
              <option value="Ban Nhân Sự">Ban Nhân Sự</option>
              <option value="Khối Kinh Doanh">Khối Kinh Doanh</option>
           </select>
           <select 
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
              value={trxTypeFilter}
              onChange={(e) => setTrxTypeFilter(e.target.value)}
           >
              <option value="All">Loại giao dịch</option>
              <option value="Earn">Tích điểm (+)</option>
              <option value="Redeem">Sử dụng (-)</option>
           </select>
           <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-600 flex items-center gap-2 text-sm">
             <Download size={16} /> Xuất Excel
           </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
           <div className="overflow-x-auto">
             <table className="w-full text-sm text-left text-slate-600">
               <thead className="bg-slate-50 text-slate-700 font-bold uppercase text-xs">
                 <tr>
                   <th className="px-6 py-3">Mã GD</th>
                   <th className="px-6 py-3">Nhân sự</th>
                   <th className="px-6 py-3">Chương trình/Nội dung</th>
                   <th className="px-6 py-3">Ngày</th>
                   <th className="px-6 py-3 text-right">Số điểm</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                 {filteredTrx.map((trx) => (
                   <tr key={trx.id} className="hover:bg-slate-50">
                     <td className="px-6 py-4 font-medium text-slate-500">{trx.id}</td>
                     <td className="px-6 py-4">
                       <div className="font-bold text-slate-800">{trx.employee}</div>
                       <div className="text-xs text-slate-500">{trx.dept}</div>
                     </td>
                     <td className="px-6 py-4">{trx.program}</td>
                     <td className="px-6 py-4">{trx.date}</td>
                     <td className={`px-6 py-4 text-right font-bold ${trx.type === 'Earn' ? 'text-green-600' : 'text-red-500'}`}>
                       {trx.type === 'Earn' ? '+' : ''}{trx.amount}
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
           <div className="p-4 border-t border-slate-100 text-xs text-slate-500 text-center">
             Hiển thị {filteredTrx.length} kết quả
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tabs Header */}
      <div className="bg-white rounded-2xl p-2 shadow-sm border border-slate-100 inline-flex gap-1">
         <button 
           onClick={() => setActiveTab('dashboard')}
           className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
             activeTab === 'dashboard' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
           }`}
         >
           <LayoutDashboard size={18} /> Dashboard
         </button>
         <button 
           onClick={() => setActiveTab('programs')}
           className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
             activeTab === 'programs' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
           }`}
         >
           <List size={18} /> Chương trình
         </button>
         <button 
           onClick={() => setActiveTab('transactions')}
           className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
             activeTab === 'transactions' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
           }`}
         >
           <History size={18} /> Giao dịch
         </button>
      </div>

      {/* Content Area */}
      <div className="min-h-[500px]">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'programs' && renderPrograms()}
        {activeTab === 'transactions' && renderTransactions()}
      </div>
    </div>
  );
};

export default AdminPoints;