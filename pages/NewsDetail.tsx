
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Building2, 
  Download, 
  Heart, 
  MessageCircle, 
  Share2, 
  FileText,
  Send
} from 'lucide-react';
import { NewsItem } from '../types';

interface NewsDetailProps {
  news: NewsItem;
  onBack: () => void;
}

const NewsDetail: React.FC<NewsDetailProps> = ({ news, onBack }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(news.likes);
  const [comment, setComment] = useState('');
  
  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-10">
      {/* Navigation */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-primary font-medium mb-6 transition-colors"
      >
        <ArrowLeft size={20} /> Quay lại bảng tin
      </button>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Cover Image */}
        <div className="h-64 md:h-96 w-full relative">
           <img 
            src={news.image} 
            alt={news.title} 
            className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
              <div className="flex gap-2 mb-3">
                 <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                    news.category === 'Policy' ? 'bg-purple-600 text-white' : 
                    news.category === 'Event' ? 'bg-amber-500 text-white' :
                    'bg-primary text-white'
                 }`}>
                    {news.category}
                 </span>
                 {news.campaignName && (
                   <span className="px-3 py-1 rounded text-xs font-bold uppercase tracking-wider bg-green-600 text-white">
                      {news.campaignName}
                   </span>
                 )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight shadow-sm">
                {news.title}
              </h1>
           </div>
        </div>

        <div className="p-8">
           {/* Meta Info */}
           <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 mb-8 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-2">
                 <Calendar size={18} className="text-primary" />
                 <span>{news.date}</span>
              </div>
              <div className="flex items-center gap-2">
                 <User size={18} className="text-primary" />
                 <span>Đăng bởi: <span className="font-semibold text-slate-700">{news.publisher}</span></span>
              </div>
              <div className="flex items-center gap-2">
                 <Building2 size={18} className="text-primary" />
                 <span>Đơn vị: <span className="font-semibold text-slate-700">{news.unit}</span></span>
              </div>
           </div>

           {/* Content Body */}
           <div className="prose prose-slate max-w-none mb-8 text-slate-800 leading-relaxed">
              <p className="font-semibold text-lg mb-4">{news.summary}</p>
              <div dangerouslySetInnerHTML={{ __html: news.content || `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><h4>Nội dung chi tiết</h4><p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>` }} />
           </div>

           {/* Attachments */}
           {news.attachments && news.attachments.length > 0 && (
             <div className="bg-slate-50 rounded-xl p-5 mb-8 border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <FileText size={20} /> Tài liệu đính kèm
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {news.attachments.map((file) => (
                    <div key={file.id} className="bg-white p-3 rounded-lg border border-slate-200 flex items-center justify-between hover:border-primary/50 hover:shadow-sm transition-all">
                       <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded flex items-center justify-center font-bold text-xs ${
                             file.type === 'PDF' ? 'bg-red-100 text-red-600' : 
                             file.type === 'DOCX' ? 'bg-blue-100 text-blue-600' : 
                             'bg-green-100 text-green-600'
                          }`}>
                             {file.type}
                          </div>
                          <div>
                             <p className="text-sm font-medium text-slate-700 truncate max-w-[180px]">{file.name}</p>
                             <p className="text-xs text-slate-400">{file.size}</p>
                          </div>
                       </div>
                       <button className="p-2 text-slate-400 hover:text-primary">
                          <Download size={20} />
                       </button>
                    </div>
                  ))}
                </div>
             </div>
           )}

           {/* Social Actions */}
           <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <div className="flex items-center gap-4">
                 <button 
                   onClick={handleLike}
                   className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all ${
                     liked ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                   }`}
                 >
                    <Heart size={20} fill={liked ? "currentColor" : "none"} /> {likeCount} <span className="hidden sm:inline">Thích</span>
                 </button>
                 <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 text-slate-600 font-bold hover:bg-slate-100 transition-all">
                    <MessageCircle size={20} /> {news.comments} <span className="hidden sm:inline">Bình luận</span>
                 </button>
              </div>
              <button className="flex items-center gap-2 text-slate-500 hover:text-primary font-medium">
                 <Share2 size={20} /> <span className="hidden sm:inline">Chia sẻ</span>
              </button>
           </div>

           {/* Comments Section (Mock) */}
           <div className="mt-8 pt-8 border-t border-slate-100">
              <h4 className="font-bold text-slate-800 mb-4">Bình luận gần đây</h4>
              
              {/* Comment Input */}
              <div className="flex gap-4 mb-6">
                 <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    NV
                 </div>
                 <div className="flex-1 relative">
                    <input 
                      type="text" 
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Viết bình luận của bạn..." 
                      className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <button className="absolute right-2 top-2 p-1.5 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors">
                       <Send size={16} />
                    </button>
                 </div>
              </div>

              {/* Comment List */}
              <div className="space-y-6">
                 <div className="flex gap-4">
                    <img src="https://i.pravatar.cc/150?img=33" alt="User" className="w-10 h-10 rounded-full object-cover" />
                    <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none">
                       <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-slate-800 text-sm">Trần Thu Hà</span>
                          <span className="text-xs text-slate-400">2 giờ trước</span>
                       </div>
                       <p className="text-sm text-slate-600">Thông tin rất hữu ích, cảm ơn Ban Truyền Thông đã chia sẻ kịp thời!</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <img src="https://i.pravatar.cc/150?img=12" alt="User" className="w-10 h-10 rounded-full object-cover" />
                    <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none">
                       <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-slate-800 text-sm">Lê Minh Tuấn</span>
                          <span className="text-xs text-slate-400">5 giờ trước</span>
                       </div>
                       <p className="text-sm text-slate-600">Hóng sự kiện này quá, năm ngoái tổ chức rất vui.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
