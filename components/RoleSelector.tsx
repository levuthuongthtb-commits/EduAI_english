
import React, { useState } from 'react';
import { UserRole } from '../types';

interface RoleSelectorProps {
  onSelect: (role: UserRole) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ onSelect }) => {
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleTeacherClick = () => {
    setShowPasswordInput(true);
    setError('');
  };

  const handleVerifyPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Lấy mật khẩu từ localStorage, nếu chưa có thì dùng mặc định 'gv2024'
    const TEACHER_PASSWORD = localStorage.getItem('teacher_password') || 'gv2024';
    
    if (password === TEACHER_PASSWORD) {
      onSelect(UserRole.TEACHER);
    } else {
      setError('Mật khẩu không chính xác. Vui lòng thử lại!');
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900 flex items-center justify-center p-4 z-50">
      <div className="max-w-4xl w-full">
        {!showPasswordInput ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in zoom-in duration-300">
            {/* Thẻ Giáo viên */}
            <div className="bg-white p-10 rounded-3xl shadow-2xl border-4 border-transparent hover:border-blue-500 transition-all cursor-pointer group"
                 onClick={handleTeacherClick}>
              <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform">👨‍🏫</div>
              <h2 className="text-3xl font-black text-slate-900 mb-2">Tôi là Giáo viên</h2>
              <p className="text-slate-500 leading-relaxed">Soạn đề bằng AI, quản lý lớp học và phân tích kết quả học tập chi tiết của học sinh.</p>
              <div className="mt-8 flex items-center gap-2 text-blue-600 font-bold">
                Yêu cầu mật khẩu <span>🔒</span>
              </div>
            </div>

            {/* Thẻ Học sinh */}
            <div className="bg-white p-10 rounded-3xl shadow-2xl border-4 border-transparent hover:border-emerald-500 transition-all cursor-pointer group"
                 onClick={() => onSelect(UserRole.STUDENT)}>
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform">🎓</div>
              <h2 className="text-3xl font-black text-slate-900 mb-2">Tôi là Học sinh</h2>
              <p className="text-slate-500 leading-relaxed">Vào phòng thi, làm bài kiểm tra trực tuyến và nhận kết quả đánh giá từ AI ngay lập tức.</p>
              <div className="mt-8 flex items-center gap-2 text-emerald-600 font-bold">
                Vào làm bài ngay <span>→</span>
              </div>
            </div>
          </div>
        ) : (
          /* Giao diện nhập mật khẩu */
          <div className="max-w-md mx-auto bg-white p-10 rounded-3xl shadow-2xl animate-in slide-in-from-bottom-8 duration-300">
            <button 
              onClick={() => setShowPasswordInput(false)}
              className="mb-6 text-slate-400 hover:text-slate-600 flex items-center gap-2 text-sm font-bold"
            >
              ← Quay lại
            </button>
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-6">🔑</div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">Xác thực Giáo viên</h2>
            <p className="text-slate-500 text-sm mb-6">Vui lòng nhập mật khẩu quản trị để truy cập các tính năng dành cho giáo viên.</p>
            
            <form onSubmit={handleVerifyPassword} className="space-y-4">
              <div>
                <input 
                  type="password" 
                  autoFocus
                  placeholder="Nhập mật khẩu..."
                  className={`w-full p-4 bg-slate-50 border-2 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 transition-all font-bold text-center tracking-widest ${error ? 'border-red-200 focus:border-red-400' : 'border-slate-100 focus:border-blue-400'}`}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                />
                {error && <p className="text-red-500 text-xs font-bold mt-2 text-center">{error}</p>}
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95"
              >
                Xác nhận truy cập
              </button>
            </form>
            <p className="mt-6 text-center text-[10px] text-slate-300 font-bold uppercase tracking-widest">Bảo mật hệ thống EduAI</p>
          </div>
        )}
      </div>
      <div className="absolute bottom-8 text-slate-400 text-sm font-medium">EduAI English Pro v2.5 • Global Success EdTech</div>
    </div>
  );
};

export default RoleSelector;
