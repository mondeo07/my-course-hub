'use client';
import { useState } from 'react';
import Link from 'next/link';

// Danh sách các bài giảng trong khóa học
const LESSONS = [
  {
    id: 1,
    title: "Bài 1: Giới thiệu khóa học & Lộ trình bài bản",
    duration: "08:15",
    isFree: true, // Bài này được xem miễn phí
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 2,
    title: "Bài 2: Cài đặt công cụ và môi trường thực chiến",
    duration: "14:20",
    isFree: false, // Bài này bị KHÓA
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 3,
    title: "Bài 3: Xây dựng dự án đầu tay từ con số 0",
    duration: "25:40",
    isFree: false, // Bài này bị KHÓA
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 4,
    title: "Bài 4: Tối ưu hóa hiệu năng & Chuẩn SEO",
    duration: "18:05",
    isFree: false, // Bài này bị KHÓA
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
];

export default function LearnPage() {
  const [currentLesson, setCurrentLesson] = useState(LESSONS[0]);
  const [showPaywall, setShowPaywall] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false); // Trạng thái đã mua hay chưa

  const handleSelectLesson = (lesson: typeof LESSONS[0]) => {
    // Nếu bài học miễn phí HOẶC người dùng đã mua khóa học
    if (lesson.isFree || isUnlocked) {
      setCurrentLesson(lesson);
    } else {
      // Nếu chưa mua mà bấm bài bị khóa -> Hiện cảnh báo mua
      setShowPaywall(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col font-sans">
      {/* HEADER BÀI HỌC */}
      <header className="h-14 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-6">
        <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 text-sm font-medium">
          ← Quay lại trang chủ
        </Link>
        <div className="font-semibold text-sm truncate max-w-md">
          Lập trình Web Fullstack từ Zero đến Hero
        </div>
        <div>
          {isUnlocked ? (
            <span className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30">
              ✓ Đã kích hoạt VIP
            </span>
          ) : (
            <button 
              onClick={() => setShowPaywall(true)}
              className="text-xs bg-amber-500 hover:bg-amber-600 text-black font-bold px-3 py-1.5 rounded-full transition">
              Mua toàn bộ (1.299.000đ)
            </button>
          )}
        </div>
      </header>

      {/* KHUNG NỘI DUNG CHÍNH (Gồm Video bên trái, Menu bài giảng bên phải) */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* KHUNG VIDEO BÊN TRÁI */}
        <div className="flex-1 bg-black flex flex-col justify-center p-4 lg:p-8">
          <div className="w-full max-w-5xl mx-auto aspect-video rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
            <iframe 
              className="w-full h-full"
              src={currentLesson.videoUrl} 
              title={currentLesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
          <div className="max-w-5xl mx-auto w-full mt-4 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold">{currentLesson.title}</h2>
              <p className="text-xs text-slate-400 mt-1">Thời lượng: {currentLesson.duration}</p>
            </div>
            {currentLesson.isFree && !isUnlocked && (
              <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded border border-emerald-500/20">
                Đang học thử miễn phí
              </span>
            )}
          </div>
        </div>

        {/* CỘT DANH SÁCH BÀI GIẢNG BÊN PHẢI */}
        <div className="w-full lg:w-96 bg-slate-950 border-t lg:border-t-0 lg:border-l border-slate-800 p-4 overflow-y-auto">
          <h3 className="font-bold text-sm text-slate-300 uppercase tracking-wider mb-4">
            Nội dung khóa học ({LESSONS.length} bài)
          </h3>
          <div className="space-y-2">
            {LESSONS.map((lesson) => {
              const isLocked = !lesson.isFree && !isUnlocked;
              const isCurrent = currentLesson.id === lesson.id;

              return (
                <button
                  key={lesson.id}
                  onClick={() => handleSelectLesson(lesson)}
                  className={`w-full text-left p-3.5 rounded-xl border transition flex items-center justify-between gap-3 ${
                    isCurrent 
                      ? 'bg-indigo-600/20 border-indigo-500 text-white' 
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm">
                      {isLocked ? '🔒' : '▶'}
                    </span>
                    <div>
                      <p className={`text-xs font-semibold line-clamp-1 ${isLocked ? 'text-slate-500' : 'text-slate-200'}`}>
                        {lesson.title}
                      </p>
                      <span className="text-[10px] text-slate-500">{lesson.duration}</span>
                    </div>
                  </div>

                  <div>
                    {lesson.isFree ? (
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">
                        Học thử
                      </span>
                    ) : (
                      isLocked && (
                        <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                          Khóa
                        </span>
                      )
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* POPUP YÊU CẦU MUA / KHÓA BÀI HỌC (PAYWALL) */}
      {showPaywall && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl relative text-center">
            <button 
              onClick={() => setShowPaywall(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white">
              ✕
            </button>
            <div className="w-16 h-16 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
              🔒
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Bài học này đã bị khóa!</h3>
            <p className="text-xs text-slate-400 mb-6">
              Bạn chỉ có thể xem thử Bài 1. Vui lòng thanh toán để mở khóa toàn bộ {LESSONS.length} bài học và nhận chứng chỉ trọn đời.
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6 text-left">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Khóa học trọn gói:</span>
                <span className="line-through">2.500.000đ</span>
              </div>
              <div className="flex justify-between font-bold text-emerald-400 text-base">
                <span>Ưu đãi hôm nay:</span>
                <span>1.299.000đ</span>
              </div>
            </div>

            <button 
              onClick={() => {
                setIsUnlocked(true); // Giả lập đã thanh toán mở khóa thành công
                setShowPaywall(false);
                alert("🎉 Chúc mừng bạn đã mở khóa toàn bộ bài học thành công!");
              }}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition text-sm mb-3">
              Mở khóa toàn bộ khóa học ngay
            </button>
            <button 
              onClick={() => setShowPaywall(false)}
              className="text-xs text-slate-500 hover:text-slate-400">
              Tôi sẽ xem sau
            </button>
          </div>
        </div>
      )}
    </div>
  );
}