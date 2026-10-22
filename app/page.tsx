'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/supabase';

interface Course {
  id: number;
  title: string;
  instructor: string;
  price: string;
  original_price: string;
  rating: number;
  students: string;
  image: string;
  tag: string;
}

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  // Tải danh sách khóa học thực tế từ Supabase
  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase.from('courses').select('*').order('id', { ascending: false });
      if (!error && data) {
        setCourses(data);
      }
      setLoading(false);
    };
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-indigo-600 text-white p-2 rounded-lg font-bold text-lg">ED</span>
            <span className="font-extrabold text-xl tracking-tight text-slate-800">EduPrime</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#courses" className="hover:text-indigo-600 transition">Khóa học</a>
            <Link href="/admin" className="hover:text-indigo-600 transition font-semibold text-indigo-600">Quản trị (Admin)</Link>
          </nav>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition shadow-md shadow-indigo-100">
            Đăng nhập
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto text-center">
        <span className="bg-indigo-50 text-indigo-600 border border-indigo-200 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase">
          🚀 Nâng tầm sự nghiệp công nghệ
        </span>
        <h1 className="text-4xl md:text-6xl font-black mt-6 leading-tight tracking-tight text-slate-900">
          Làm chủ kỹ năng số với <br className="hidden md:block"/>
          <span className="text-indigo-600">chuyên gia hàng đầu</span>
        </h1>
        <p className="mt-4 text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
          Học trực tuyến bài bản, thực chiến theo dự án thật. Cam kết chất lượng và hỗ trợ trọn đời cho mọi học viên.
        </p>
      </section>

      {/* DANH SÁCH KHÓA HỌC TỰ ĐỘNG ĐỒNG BỘ */}
      <section id="courses" className="py-16 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Khóa học nổi bật</h2>
          <p className="text-slate-500 mt-2">Dữ liệu được cập nhật trực tiếp từ hệ thống Quản Trị</p>
        </div>

        {loading ? (
          <div className="text-center py-10 text-slate-400">Đang tải danh sách khóa học...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="relative h-48 w-full overflow-hidden">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-xs font-semibold px-2.5 py-1 rounded-md text-indigo-600 shadow-sm">
                      {course.tag}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-xs font-medium text-amber-500 mb-2">
                      ★ {course.rating} <span className="text-slate-400">({course.students} học viên)</span>
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 line-clamp-2 leading-snug">{course.title}</h3>
                    <p className="text-xs text-slate-500 mt-2">Giảng viên: <span className="font-medium text-slate-700">{course.instructor}</span></p>
                  </div>
                </div>

                <div className="p-5 pt-0 space-y-2">
                  <div className="border-t border-slate-100 pt-4 flex items-baseline gap-2">
                    <span className="text-xl font-bold text-indigo-600">{course.price}</span>
                    <span className="text-sm text-slate-400 line-through">{course.original_price}</span>
                  </div>
                  <Link 
                    href="/learn"
                    className="block text-center w-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold py-2.5 rounded-xl transition">
                    ▶ Học thử miễn phí
                  </Link>
                  <button 
                    onClick={() => setSelectedCourse(course)}
                    className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-medium py-2.5 rounded-xl transition duration-200 text-sm">
                    Đăng ký ngay
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* POPUP MUA HÀNG */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setSelectedCourse(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg font-bold">✕</button>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Xác nhận thanh toán</h3>
            <p className="text-sm text-slate-500 mb-4">{selectedCourse.title}</p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
              <div className="flex justify-between text-sm mb-1 text-slate-600">
                <span>Số tiền:</span>
                <span className="font-bold text-indigo-600 text-lg">{selectedCourse.price}</span>
              </div>
            </div>
            <button onClick={() => { alert("Đăng ký thành công!"); setSelectedCourse(null); }} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-xl transition">
              Hoàn tất chuyển khoản
            </button>
          </div>
        </div>
      )}

      <footer className="border-t border-slate-200 mt-20 py-8 text-center text-sm text-slate-500">
        <p>© 2025 EduPrime. Tất cả các quyền được bảo lưu.</p>
      </footer>
    </div>
  );
}