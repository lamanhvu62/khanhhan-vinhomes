import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <div className="relative">
        <h1 className="text-9xl font-extrabold text-[#E9C46A] tracking-widest opacity-80">404</h1>
        <div className="bg-gray-800 px-3 py-1 text-sm font-medium rounded rotate-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white shadow-lg whitespace-nowrap">
          Trang không tồn tại
        </div>
      </div>
      
      <div className="mt-8 space-y-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Rất tiếc, trang bạn tìm kiếm không có ở đây
        </h2>
        <p className="text-gray-500 max-w-md mx-auto text-sm md:text-base">
          Liên kết có thể đã bị hỏng, hoặc trang đã bị gỡ bỏ. Vui lòng kiểm tra lại đường dẫn hoặc quay về trang chủ để tiếp tục khám phá các dự án của Vinhomes.
        </p>
      </div>

      <div className="mt-10">
        <Link 
          href="/" 
          className="relative inline-flex items-center justify-center px-8 py-3.5 text-base font-bold text-white transition-all duration-300 bg-[#E9C46A] hover:bg-[#d8b056] shadow hover:shadow-lg rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E9C46A]"
        >
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
}
