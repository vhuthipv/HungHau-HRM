
import React, { useState } from 'react';
import { 
  Crown, 
  Edit2, 
  Plus, 
  Trash2, 
  Check, 
  X, 
  AlertCircle,
  TrendingUp,
  Clock
} from 'lucide-react';
import { TierConfig } from '../types';

const initialTiers: TierConfig[] = [
  {
    id: '1',
    name: 'Member',
    color: 'from-blue-400 to-blue-600',
    minPoints: 0,
    minSeniorityMonths: 0,
    benefits: [
      'Tích điểm cơ bản 1.0x cho mọi hoạt động',
      'Tham gia các sự kiện nội bộ',
      'Truy cập kho tài liệu chung'
    ]
  },
  {
    id: '2',
    name: 'Silver',
    color: 'from-slate-300 to-slate-500',
    minPoints: 2000,
    minSeniorityMonths: 12,
    benefits: [
      'Tích điểm 1.1x cho mọi hoạt động',
      'Quà sinh nhật trị giá 200.000đ',
      'Ưu tiên xét duyệt nghỉ phép',
      'Voucher mua hàng giảm 5%'
    ]
  },
  {
    id: '3',
    name: 'Gold',
    color: 'from-amber-300 to-amber-500',
    minPoints: 5000,
    minSeniorityMonths: 36,
    benefits: [
      'Tích điểm 1.2x cho mọi hoạt động',
      'Quà sinh nhật trị giá 500.000đ',
      'Khám sức khỏe gói nâng cao',
      'Tham gia CLB Lãnh đạo tiềm năng',
      'Voucher mua hàng giảm 10%'
    ]
  },
  {
    id: '4',
    name: 'Platinum',
    color: 'from-slate-700 to-slate-900',
    minPoints: 10000,
    minSeniorityMonths: 60,
    benefits: [
      'Tích điểm 1.5x cho mọi hoạt động',
      'Quà sinh nhật trị giá 1.000.000đ',
      'Du lịch nước ngoài hàng năm (Team building)',
      'Gói bảo hiểm sức khỏe toàn diện cho gia đình',
      'Đặc quyền tham gia họp chiến lược Quý'
    ]
  }
];

const AdminTierConfig: React.FC = () => {
  const [tiers, setTiers] = useState<TierConfig[]>(initialTiers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTier, setEditingTier] = useState<TierConfig | null>(null);
  
  // Form State
  const [formData, setFormData] = useState<Partial<TierConfig>>({
    name: '',
    minPoints: 0,
    minSeniorityMonths: 0,
    benefits: ['']
  });

  const handleEdit = (tier: TierConfig) => {
    setEditingTier(tier);
    setFormData({
      ...tier
    });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingTier(null);
    setFormData({
      name: 'New Tier',
      color: 'from-emerald-400 to-emerald-600',
      minPoints: 0,
      minSeniorityMonths: 0,
      benefits: ['Quyền lợi mới']
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTier(null);
  };

  const handleSave = () => {
    if (editingTier) {
      // Update existing
      setTiers(tiers.map(t => t.id === editingTier.id ? { ...t, ...formData } as TierConfig : t));
    } else {
      // Add new
      const newTier: TierConfig = {
        id: Date.now().toString(),
        color: 'from-purple-400 to-purple-600', // Default color for new tiers
        ...formData as TierConfig
      };
      setTiers([...tiers, newTier]);
    }
    handleCloseModal();
  };

  const handleBenefitChange = (index: number, value: string) => {
    const newBenefits = [...(formData.benefits || [])];
    newBenefits[index] = value;
    setFormData({ ...formData, benefits: newBenefits });
  };

  const addBenefitLine = () => {
    setFormData({ ...formData, benefits: [...(formData.benefits || []), ''] });
  };

  const removeBenefitLine = (index: number) => {
    const newBenefits = [...(formData.benefits || [])];
    newBenefits.splice(index, 1);
    setFormData({ ...formData, benefits: newBenefits });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
           <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
             <Crown className="text-amber-500" /> Cấu hình Hạng thẻ & Quyền lợi
           </h2>
           <p className="text-slate-500 text-sm mt-1">Thiết lập tiêu chuẩn thăng hạng và các chính sách đãi ngộ cho Người Hùng Hậu.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-primary-dark transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus size={20} /> Thêm hạng thẻ
        </button>
      </div>

      {/* Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tiers.map((tier) => (
          <div key={tier.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full transition-transform hover:-translate-y-1 hover:shadow-md">
            {/* Card Header */}
            <div className={`bg-gradient-to-r ${tier.color} p-4 text-white relative overflow-hidden`}>
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
              <div className="flex justify-between items-center relative z-10">
                <h3 className="text-xl font-bold">{tier.name}</h3>
                <Crown size={24} className="opacity-80" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 relative z-10">
                 <div className="bg-black/10 rounded-lg p-2 backdrop-blur-sm">
                    <p className="text-[10px] uppercase opacity-80 font-medium">Điểm tích lũy</p>
                    <p className="font-bold text-lg">≥ {tier.minPoints.toLocaleString()}</p>
                 </div>
                 <div className="bg-black/10 rounded-lg p-2 backdrop-blur-sm">
                    <p className="text-[10px] uppercase opacity-80 font-medium">Thâm niên</p>
                    <p className="font-bold text-lg">≥ {tier.minSeniorityMonths} <span className="text-xs font-normal">tháng</span></p>
                 </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-5 flex-1 flex flex-col">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Quyền lợi thành viên</h4>
              <ul className="space-y-3 flex-1">
                {tier.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                    <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              {/* Actions */}
              <div className="pt-5 mt-4 border-t border-slate-100 flex gap-2">
                <button 
                  onClick={() => handleEdit(tier)}
                  className="flex-1 py-2 bg-slate-50 text-slate-700 font-semibold rounded-lg hover:bg-slate-100 transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <Edit2 size={16} /> Cấu hình
                </button>
                {tier.id !== '1' && (
                  <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3 text-sm text-blue-800">
         <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
         <div>
           <p className="font-bold mb-1">Lưu ý về hệ thống tự động xét hạng</p>
           <p>Hệ thống sẽ tự động quét dữ liệu vào ngày 1 hàng tháng để xét nâng hạng/hạ hạng dựa trên điều kiện Điểm tích lũy và Thâm niên. Nhân viên sẽ nhận được thông báo khi hạng thẻ thay đổi.</p>
         </div>
      </div>

      {/* Modal Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-scale-in">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                 <h3 className="text-xl font-bold text-slate-800">
                   {editingTier ? `Chỉnh sửa hạng ${editingTier.name}` : 'Thêm hạng thẻ mới'}
                 </h3>
                 <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600">
                   <X size={24} />
                 </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1 space-y-6">
                 {/* General Info */}
                 <div>
                   <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                     <Crown size={16} /> Thông tin chung
                   </h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Tên hạng thẻ</label>
                        <input 
                          type="text" 
                          value={formData.name} 
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" 
                          placeholder="VD: Diamond"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Màu sắc (Gradient)</label>
                        <select 
                           className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                           onChange={(e) => setFormData({...formData, color: e.target.value})}
                           defaultValue={editingTier?.color || 'from-blue-400 to-blue-600'}
                        >
                           <option value="from-blue-400 to-blue-600">Blue (Thành viên)</option>
                           <option value="from-slate-300 to-slate-500">Silver (Bạc)</option>
                           <option value="from-amber-300 to-amber-500">Gold (Vàng)</option>
                           <option value="from-slate-700 to-slate-900">Platinum (Bạch kim)</option>
                           <option value="from-emerald-400 to-emerald-600">Emerald (Lục bảo)</option>
                           <option value="from-red-500 to-red-700">Ruby (Hồng ngọc)</option>
                        </select>
                      </div>
                   </div>
                 </div>

                 {/* Conditions */}
                 <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                   <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                     <TrendingUp size={16} /> Điều kiện nâng hạng
                   </h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Điểm tích lũy tối thiểu</label>
                        <div className="relative">
                          <input 
                            type="number" 
                            value={formData.minPoints}
                            onChange={(e) => setFormData({...formData, minPoints: parseInt(e.target.value)})} 
                            className="w-full pl-3 pr-12 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" 
                          />
                          <span className="absolute right-3 top-2 text-slate-400 text-sm">Point</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Thâm niên tối thiểu</label>
                        <div className="relative">
                          <input 
                            type="number" 
                            value={formData.minSeniorityMonths}
                            onChange={(e) => setFormData({...formData, minSeniorityMonths: parseInt(e.target.value)})} 
                            className="w-full pl-3 pr-12 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20" 
                          />
                          <span className="absolute right-3 top-2 text-slate-400 text-sm">Tháng</span>
                        </div>
                      </div>
                   </div>
                 </div>

                 {/* Benefits */}
                 <div>
                   <div className="flex justify-between items-center mb-3">
                     <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                       <Check size={16} /> Quyền lợi & Ưu đãi
                     </h4>
                     <button 
                        onClick={addBenefitLine}
                        className="text-primary text-xs font-bold flex items-center gap-1 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                     >
                        <Plus size={14} /> Thêm dòng
                     </button>
                   </div>
                   <div className="space-y-2">
                     {formData.benefits?.map((benefit, idx) => (
                       <div key={idx} className="flex gap-2">
                          <input 
                            type="text"
                            value={benefit}
                            onChange={(e) => handleBenefitChange(idx, e.target.value)}
                            className="flex-1 p-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="Nhập quyền lợi..."
                          />
                          <button 
                            onClick={() => removeBenefitLine(idx)}
                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            <X size={18} />
                          </button>
                       </div>
                     ))}
                   </div>
                 </div>
              </div>

              <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
                 <button 
                   onClick={handleCloseModal}
                   className="px-6 py-2 bg-white border border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition-colors"
                 >
                   Hủy
                 </button>
                 <button 
                   onClick={handleSave}
                   className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-md"
                 >
                   Lưu cấu hình
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminTierConfig;
