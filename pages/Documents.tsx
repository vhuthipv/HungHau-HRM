import React, { useState } from 'react';
import { FolderOpen, FileText, Search, Download, Filter, Eye } from 'lucide-react';
import { Document } from '../types';

const mockDocs: Document[] = [
  { id: '1', name: 'Quy trình tuyển dụng 2024', type: 'PDF', size: '2.4 MB', uploadDate: '2023-10-01', category: 'Quy trình' },
  { id: '2', name: 'Biểu mẫu xin nghỉ phép', type: 'DOCX', size: '156 KB', uploadDate: '2023-09-15', category: 'Biểu mẫu' },
  { id: '3', name: 'Sổ tay văn hóa Hùng Hậu', type: 'PDF', size: '5.1 MB', uploadDate: '2023-08-20', category: 'Đào tạo' },
  { id: '4', name: 'Báo cáo tài chính Q3/2023', type: 'XLSX', size: '1.2 MB', uploadDate: '2023-10-15', category: 'Biểu mẫu' },
  { id: '5', name: 'Quy định an toàn lao động', type: 'PDF', size: '3.5 MB', uploadDate: '2023-05-10', category: 'Quy trình' },
];

const Documents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const filteredDocs = mockDocs.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || doc.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 h-[calc(100vh-140px)] flex flex-col">
      {/* Toolbar */}
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <FolderOpen className="text-primary" /> Kho Tài Liệu
        </h2>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
           <div className="relative flex-1 md:w-64">
             <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
             <input 
                type="text" 
                placeholder="Tìm tên tài liệu..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
             />
           </div>
           
           <select 
             className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none"
             value={filterCategory}
             onChange={(e) => setFilterCategory(e.target.value)}
           >
             <option value="All">Tất cả danh mục</option>
             <option value="Quy trình">Quy trình</option>
             <option value="Biểu mẫu">Biểu mẫu</option>
             <option value="Đào tạo">Đào tạo</option>
           </select>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredDocs.map((doc) => (
            <div key={doc.id} className="group bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-primary/50 hover:bg-blue-50/30 transition-all relative">
               <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs ${
                    doc.type === 'PDF' ? 'bg-red-100 text-red-600' : 
                    doc.type === 'DOCX' ? 'bg-blue-100 text-blue-600' : 
                    'bg-green-100 text-green-600'
                  }`}>
                    {doc.type}
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <button className="p-1.5 bg-white rounded-md text-slate-500 hover:text-primary shadow-sm">
                      <Eye size={16} />
                    </button>
                    <button className="p-1.5 bg-white rounded-md text-slate-500 hover:text-primary shadow-sm">
                      <Download size={16} />
                    </button>
                  </div>
               </div>
               
               <h3 className="font-medium text-slate-800 text-sm mb-1 line-clamp-2 h-10">{doc.name}</h3>
               
               <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
                 <span>{doc.size}</span>
                 <span>{doc.uploadDate}</span>
               </div>
               
               <span className="absolute bottom-4 right-4 text-[10px] font-semibold uppercase tracking-wider text-slate-400 bg-slate-200 px-1.5 py-0.5 rounded">
                 {doc.category}
               </span>
            </div>
          ))}
        </div>
        
        {filteredDocs.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <FolderOpen size={48} className="mb-2 opacity-50" />
            <p>Không tìm thấy tài liệu nào.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;