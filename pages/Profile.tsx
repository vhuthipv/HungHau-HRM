import React from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Award, Clock, Edit } from 'lucide-react';
import { User as UserType } from '../types';

interface ProfileProps {
  user: UserType;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Cover */}
      <div className="relative h-48 bg-gradient-to-r from-primary to-blue-800 rounded-t-2xl overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-white/30 transition-colors">
            <Edit size={16} /> Cập nhật ảnh bìa
         </button>
      </div>

      <div className="bg-white rounded-b-2xl shadow-sm border border-slate-100 border-t-0 px-8 pb-8 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-end -mt-12 gap-6 mb-6">
           <div className="relative">
             <img src={user.avatar} alt={user.name} className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover" />
             <button className="absolute bottom-0 right-0 bg-slate-100 p-2 rounded-full border border-white shadow-sm hover:bg-slate-200 text-slate-600">
               <Edit size={14} />
             </button>
           </div>
           <div className="flex-1 pb-2">
             <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">{user.name}</h1>
                  <p className="text-slate-500 font-medium">{user.position} • {user.department}</p>
                </div>
                <div className="hidden md:block">
                   <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium shadow-sm hover:bg-primary-dark transition-colors">
                     Chỉnh sửa hồ sơ
                   </button>
                </div>
             </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Personal Info */}
          <div className="lg:col-span-2 space-y-8">
             <section>
               <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">Thông tin cá nhân</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  <div className="flex items-start gap-3">
                    <Mail className="text-slate-400 mt-0.5" size={18} />
                    <div>
                      <p className="text-xs text-slate-500 uppercase">Email</p>
                      <p className="text-slate-800 font-medium">hien.nguyen@hunghau.vn</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-slate-400 mt-0.5" size={18} />
                    <div>
                      <p className="text-xs text-slate-500 uppercase">Số điện thoại</p>
                      <p className="text-slate-800 font-medium">0909 123 456</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <User className="text-slate-400 mt-0.5" size={18} />
                    <div>
                      <p className="text-xs text-slate-500 uppercase">Giới tính</p>
                      <p className="text-slate-800 font-medium">Nam</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="text-slate-400 mt-0.5" size={18} />
                    <div>
                      <p className="text-xs text-slate-500 uppercase">Văn phòng</p>
                      <p className="text-slate-800 font-medium">HHH Building, TP.HCM</p>
                    </div>
                  </div>
               </div>
             </section>

             <section>
               <h3 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100">Thông tin công việc</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  <div className="flex items-start gap-3">
                    <Briefcase className="text-slate-400 mt-0.5" size={18} />
                    <div>
                      <p className="text-xs text-slate-500 uppercase">Mã nhân viên</p>
                      <p className="text-slate-800 font-medium">HH00123</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="text-slate-400 mt-0.5" size={18} />
                    <div>
                      <p className="text-xs text-slate-500 uppercase">Ngày gia nhập</p>
                      <p className="text-slate-800 font-medium">{user.joinDate}</p>
                    </div>
                  </div>
               </div>
             </section>
          </div>

          {/* Right Column: Tier Card */}
          <div className="lg:col-span-1">
             <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden h-56 flex flex-col justify-between">
                {/* Abstract Pattern */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl -mr-10 -mt-10"></div>
                
                <div className="flex justify-between items-start z-10">
                   <div>
                     <p className="text-slate-300 text-xs font-medium tracking-widest uppercase">Thành viên Hùng Hậu</p>
                     <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-200 to-amber-500 text-transparent bg-clip-text mt-1">{user.tier}</h3>
                   </div>
                   <Award className="text-amber-400" size={32} />
                </div>

                <div className="z-10">
                  <div className="flex justify-between text-xs text-slate-300 mb-2">
                    <span>HH00123</span>
                    <span>Exp: 12/2025</span>
                  </div>
                   <p className="text-sm text-slate-400">Điểm tích lũy: <span className="text-white font-bold">{user.points}</span></p>
                </div>
             </div>
             
             <div className="mt-6 bg-amber-50 border border-amber-100 rounded-xl p-4">
                <h4 className="font-bold text-amber-800 text-sm mb-2">Quyền lợi hạng {user.tier}</h4>
                <ul className="text-xs text-amber-700 space-y-2 list-disc pl-4">
                   <li>Tích điểm 1.2x cho mọi giao dịch</li>
                   <li>Ưu tiên xét duyệt thi đua quý</li>
                   <li>Quà sinh nhật đặc biệt trị giá 500k</li>
                </ul>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;