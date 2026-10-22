'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Course {
  id: number;
  title: string;
  instructor: string;
  price: string;
  originalPrice: string;
  rating: number;
  students: string;
  image: string;
  tag: string;
  videoUrl?: string;
}

export default function AdminPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  
  // Form state
  const [title, setTitle] = useState('');
  const [instructor, setInstructor] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [image, setImage] = useState('');
  const [tag, setTag] = useState('Mới');
  const [videoUrl, setVideoUrl] = useState('');

  // Tải danh sách khóa học từ LocalStorage
  useEffect(() => {
    const savedCourses = localStorage.getItem('my_courses');
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    } else {
      // Dữ liệu mẫu ban đầu
      const initialCourses = [
        {
          id: 1,
          title: "Lập trình Web Fullstack từ Zero đến Hero",
          instructor: "Nguyễn Văn A",
          price: "1.299.000đ",
          originalPrice: "2.500.000đ",
          rating: 5.0,
          students: "1.250",
          image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
          tag: "Bán chạy nhất",
          videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }
      ];
      setCourses(initialCourses);
      localStorage.setItem('my_courses', JSON.stringify(initialCourses));
    }
  }, []);

  // Xử lý đăng nhập đơn giản (Mật khẩu mặc định là: admin123)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsLoggedIn(true);
    } else {
      alert('Sai mật khẩu! (Mật khẩu mặc định: admin123)');
    }
  };

  // Thêm khóa học mới
  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price) {
      alert('Vui lòng điền đủ tên và giá khóa học!');
      return;
    }

    const newCourse: Course = {
      id: Date.now(),
      title,
      instructor: instructor || "Chưa cập nhật",
      price,
      originalPrice: originalPrice || price,
      rating: 5.0,
      students: "0",
      image: image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
      tag,
      videoUrl
    };

    const updated = [newCourse, ...courses];
    setCourses(updated);
    localStorage.setItem('my_courses', JSON.stringify(updated));

    // Reset form
    setTitle('');
    setInstructor('');
    setPrice('');
    setOriginalPrice('');
    setImage('');
    setVideoUrl('');
    alert('Thêm khóa học thành công!');
  };

  // Xóa khóa học
  const handleDeleteCourse = (id: number) => {
    if (confirm('Bạn có chắc muốn xóa khóa học này?')) {
      const updated = courses.filter(c => c.id !== id);
      setCourses(updated);
      localStorage.setItem('my_courses', JSON.stringify(updated));
    }
  };

  // MÀN HÌNH ĐĂNG NHẬP
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-6">Trang Quản Trị</h2>
          <label className="block text-sm font-medium text-slate-600 mb-2">Mật khẩu quản trị</label>
          <input 
            type="password" 
            placeholder="Gõ: admin123" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 border rounded-xl mb-4 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800"
          />
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl transition">
            Đăng nhập
          </button>
        </form>
      </div>
    );
  }

  // GIAO DIỆN QUẢN TRỊ VIÊN
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Topbar */}
      <header className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-4">
          <span className="font-extrabold text-xl tracking-wider text-indigo-400">ADMIN HUB</span>
          <Link href="/" target="_blank" className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition">
            🌐 Xem trang chủ web
          </Link>
        </div>
        <button onClick={() => setIsLoggedIn(false)} className="text-xs text-rose-400 hover:underline">
          Đăng xuất
        </button>
      </header>

      <div className="max-w-7xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CỘT TRÁI: FORM TẠO KHÓA HỌC */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">➕ Thêm khóa học mới</h3>
          <form onSubmit={handleAddCourse} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-600">Tên khóa học *</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="VD: Khóa học React nâng cao" className="w-full mt-1 px-3 py-2 border rounded-lg text-sm outline-none focus:border-indigo-500" required />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Giảng viên</label>
              <input type="text" value={instructor} onChange={e => setInstructor(e.target.value)} placeholder="VD: Nguyễn Văn A" className="w-full mt-1 px-3 py-2 border rounded-lg text-sm outline-none focus:border-indigo-500" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600">Giá bán *</label>
                <input type="text" value={price} onChange={e => setPrice(e.target.value)} placeholder="VD: 599.000đ" className="w-full mt-1 px-3 py-2 border rounded-lg text-sm outline-none focus:border-indigo-500" required />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600">Giá gốc</label>
                <input type="text" value={originalPrice} onChange={e => setOriginalPrice(e.target.value)} placeholder="VD: 1.200.000đ" className="w-full mt-1 px-3 py-2 border rounded-lg text-sm outline-none focus:border-indigo-500" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Link ảnh bìa (URL)</label>
              <input type="text" value={image} onChange={e => setImage(e.target.value)} placeholder="https://..." className="w-full mt-1 px-3 py-2 border rounded-lg text-sm outline-none focus:border-indigo-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Link Video bài giảng (YouTube/Vimeo)</label>
              <input type="text" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} placeholder="https://youtube.com/..." className="w-full mt-1 px-3 py-2 border rounded-lg text-sm outline-none focus:border-indigo-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600">Nhãn (Tag)</label>
              <select value={tag} onChange={e => setTag(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm outline-none focus:border-indigo-500 bg-white">
                <option value="Mới">Mới</option>
                <option value="Hot">Hot</option>
                <option value="Bán chạy nhất">Bán chạy nhất</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg text-sm transition">
              Lưu khóa học
            </button>
          </form>
        </div>

        {/* CỘT PHẢI: DANH SÁCH KHÓA HỌC HIỆN TẠI */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold text-slate-800">Danh sách bài giảng ({courses.length})</h3>
          </div>
          
          <div className="space-y-3">
            {courses.map(course => (
              <div key={course.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between gap-4">
                <img src={course.image} alt={course.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded font-bold">{course.tag}</span>
                    <h4 className="font-bold text-slate-800 text-sm line-clamp-1">{course.title}</h4>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Giảng viên: {course.instructor}</p>
                  <p className="text-xs font-semibold text-emerald-600 mt-1">{course.price}</p>
                </div>
                <button 
                  onClick={() => handleDeleteCourse(course.id)}
                  className="text-rose-500 hover:bg-rose-50 p-2 rounded-lg text-sm font-semibold transition flex-shrink-0">
                  Xóa
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}