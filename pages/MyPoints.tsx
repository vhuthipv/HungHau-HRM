import React, { useState } from 'react';
import { 
  Trophy, 
  Gift, 
  History, 
  TrendingUp, 
  ChevronRight, 
  CreditCard,
  ShoppingBag
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { User, Reward } from '../types';

interface MyPointsProps {
  user: User;
}

const pointsHistory = [
  { name: 'T1', points: 1200 },
  { name: 'T2', points: 1900 },
  { name: 'T3', points: 1500 },
  { name: 'T4', points: 2200 },
  { name: 'T5', points: 2800 },
  { name: 'T6', points: 3500 },
];

const rewards: Reward[] = [
  { id: '1', name: 'Voucher GotIt 100K', description: 'Áp dụng cho toàn bộ hệ thống GotIt', pointsCost: 1000, category: 'Voucher', image: 'https://picsum.photos/200/200?random=10' },
  { id: '2', name: 'Combo HHH Healthy', description: 'Bộ sản phẩm thực phẩm sạch', pointsCost: 2500, category: 'Product', image: 'https://picsum.photos/200/200?random=11' },
  { id: '3', name: 'Ngày nghỉ phép thưởng', description: 'Thêm 1 ngày nghỉ phép vào quỹ', pointsCost: 5000, category: 'Service', image: 'https://picsum.photos/200/200?random=12' },
  { id: '4', name: 'Ly giữ nhiệt Hùng Hậu', description: 'Ly giữ nhiệt 900ml logo công ty', pointsCost: 800, category: 'Product', image: 'https://picsum.photos/200/200?random=13' },
];

const MyPoints: React.FC<MyPointsProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'redeem' | 'history'>('redeem');

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Point Card - Gold Theme */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start">
               <div>
                 <p className="text-amber-100 text-sm font-medium mb-1">Tổng điểm tích lũy</p>
                 <h2 className="text-4xl font-bold">{user.points.toLocaleString()}</h2>
               </div>
               <div className="bg-white/20 p-2 rounded-lg">
                 <Trophy size={24} className="text-white" />
               </div>
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-xs text-amber-100 mb-1">
                <span>Hạng hiện tại: {user.tier}</span>
                <span>Tiến độ lên hạng Platinum</span>
              </div>
              <div className="w-full bg-black/20 rounded-full h-2">
                <div className="bg-white rounded-full h-2" style={{ width: '75%' }}></div>
              </div>
              <p className="text-xs mt-2 text-amber-100">Cần thêm 1,200 điểm để thăng hạng</p>
            </div>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start">
             <div>
                <p className="text-slate-500 text-sm font-medium">Điểm khả dụng</p>
                <h3 className="text-2xl font-bold text-slate-800">3,250</h3>
             </div>
             <div className="bg-green-50 p-2 rounded-lg">
               <ShoppingBag className="text-green-600" size={20} />
             </div>
          </div>
          <button className="mt-4 text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
            Xem quy chế điểm <ChevronRight size={16} />
          </button>
        </div>

        {/* Graph Mini */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
           <div className="flex justify-between items-center mb-4">
             <h4 className="font-bold text-slate-700 text-sm">Xu hướng tích điểm</h4>
             <TrendingUp size={16} className="text-green-500" />
           </div>
           <div className="h-24">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={pointsHistory}>
                 <Line type="monotone" dataKey="points" stroke="#00a651" strokeWidth={2} dot={false} />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 min-h-[500px]">
        <div className="flex border-b border-slate-100">
          <button 
            onClick={() => setActiveTab('redeem')}
            className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors ${activeTab === 'redeem' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <Gift size={18} /> Đổi Quà
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-4 text-sm font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors ${activeTab === 'history' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <History size={18} /> Lịch Sử Giao Dịch
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'redeem' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {rewards.map((reward) => (
                <div key={reward.id} className="group border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 bg-white">
                  <div className="relative h-40 overflow-hidden">
                    <img src={reward.image} alt={reward.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <span className="absolute top-2 right-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-lg backdrop-blur-sm">
                      {reward.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-slate-800 mb-1 truncate">{reward.name}</h4>
                    <p className="text-xs text-slate-500 mb-3 h-8 line-clamp-2">{reward.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-accent font-bold text-lg">{reward.pointsCost.toLocaleString()} P</span>
                      <button className="bg-primary text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-primary-dark transition-colors">
                        Đổi ngay
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-slate-600">
                <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                  <tr>
                    <th className="px-6 py-3">Ngày</th>
                    <th className="px-6 py-3">Giao dịch</th>
                    <th className="px-6 py-3">Loại</th>
                    <th className="px-6 py-3 text-right">Số điểm</th>
                    <th className="px-6 py-3">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-6 py-4">24/10/2023</td>
                    <td className="px-6 py-4 font-medium text-slate-900">Thưởng dự án Tháng 10</td>
                    <td className="px-6 py-4">Tích điểm</td>
                    <td className="px-6 py-4 text-right text-green-600 font-bold">+500</td>
                    <td className="px-6 py-4"><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Thành công</span></td>
                  </tr>
                  <tr className="bg-white border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-6 py-4">20/10/2023</td>
                    <td className="px-6 py-4 font-medium text-slate-900">Đổi Voucher GotIt</td>
                    <td className="px-6 py-4">Sử dụng</td>
                    <td className="px-6 py-4 text-right text-red-500 font-bold">-1,000</td>
                    <td className="px-6 py-4"><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Thành công</span></td>
                  </tr>
                  <tr className="bg-white border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-6 py-4">15/10/2023</td>
                    <td className="px-6 py-4 font-medium text-slate-900">Sinh nhật nhân viên</td>
                    <td className="px-6 py-4">Quà tặng</td>
                    <td className="px-6 py-4 text-right text-green-600 font-bold">+200</td>
                    <td className="px-6 py-4"><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Thành công</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPoints;