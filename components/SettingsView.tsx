
import React, { useState, useEffect } from 'react';

const SettingsView: React.FC = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const storedPass = localStorage.getItem('teacher_password') || 'gv2024';
    const storedName = localStorage.getItem('teacher_name') || 'Thầy Giáo';
    const storedSchool = localStorage.getItem('school_name') || 'Trường THCS EduAI';
    
    setPassword(storedPass);
    setNewPassword(storedPass);
    setTeacherName(storedName);
    setSchoolName(storedSchool);
  }, []);

  const handleSave = () => {
    localStorage.setItem('teacher_password', newPassword);
    localStorage.setItem('teacher_name', teacherName);
    localStorage.setItem('school_name', schoolName);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-3xl font-bold text-slate-900">Cài đặt hệ thống ⚙️</h2>
        <p className="text-slate-500 mt-2">Quản lý cấu hình và bảo mật của ứng dụng EduAI.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Section: Thông tin chung */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-sm">👤</span>
              Thông tin Giáo viên
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Tên hiển thị</label>
                <input 
                  type="text" 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Tên trường</label>
                <input 
                  type="text" 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Section: Bảo mật */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-red-50 text-red-600 rounded-lg flex items-center justify-center text-sm">🔒</span>
              Bảo mật cổng Giáo viên
            </h3>
            <div className="space-y-4 max-w-md">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Mật khẩu truy cập hiện tại</label>
                <div className="p-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-400 font-mono select-none">
                  ••••••••
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Mật khẩu mới</label>
                <input 
                  type="text" 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                  placeholder="Nhập mật khẩu mới..."
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <p className="text-[10px] text-slate-400 italic">Mật khẩu này dùng để đăng nhập vào cổng Giáo viên từ màn hình khởi đầu.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-blue-600 p-8 rounded-3xl text-white shadow-xl shadow-blue-100">
            <h4 className="font-bold text-xl mb-4">Lưu thay đổi</h4>
            <p className="text-sm text-blue-100 leading-relaxed mb-6">
              Mọi thay đổi sẽ được áp dụng ngay lập tức cho trình duyệt này. Hãy đảm bảo bạn nhớ mật khẩu mới để không bị khóa khỏi hệ thống.
            </p>
            <button 
              onClick={handleSave}
              className={`w-full py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 ${
                saved ? 'bg-green-500 text-white' : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              {saved ? '✔️ Đã lưu thành công' : '💾 Lưu cấu hình'}
            </button>
          </div>

          <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100">
            <h4 className="font-bold text-amber-800 flex items-center gap-2 mb-3">
              <span>💡</span> Ghi chú
            </h4>
            <p className="text-xs text-amber-700 leading-relaxed">
              Dữ liệu cài đặt và kết quả bài làm hiện được lưu tại <strong>LocalStorage</strong> của trình duyệt. 
              Nếu bạn xóa lịch sử trình duyệt hoặc dùng máy tính khác, các cài đặt này sẽ quay về mặc định.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
