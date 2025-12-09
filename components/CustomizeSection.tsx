import { Link, Image } from 'lucide-react';

export default function CustomizeSection() {
  return (
    <div className="bg-[#5A4A6A]/40 backdrop-blur-sm rounded-[24px] p-7 relative overflow-hidden shadow-lg">
      <div className="absolute top-5 left-5 text-white/15">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5H7z" />
        </svg>
      </div>
      <div className="absolute top-8 right-8 text-white/15">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
        </svg>
      </div>
      <div className="absolute bottom-7 left-8 text-white/15 transform rotate-12">
        <Link className="w-9 h-9" strokeWidth={2} />
      </div>
      <div className="absolute bottom-5 right-7 text-white/15">
        <Image className="w-8 h-8" strokeWidth={2} />
      </div>

      <div className="absolute bottom-6 right-20 text-white/25 font-black text-[20px] tracking-wider">
        RSVP
      </div>

      <div className="text-center relative z-10 mb-5">
        <h3 className="text-white text-[20px] font-bold leading-tight">Customize your</h3>
        <p className="text-white text-[20px] font-bold leading-tight">event your way</p>
      </div>

      <button type="button" className="w-full bg-[#5A4A6A]/50 backdrop-blur-sm rounded-[16px] py-3.5 px-6 text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#6A5A7A]/50 transition-all text-[14px] shadow-md">
        <span>🎨</span>
        Customize
      </button>
    </div>
  );
}