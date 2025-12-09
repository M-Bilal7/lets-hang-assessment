import { Plus } from 'lucide-react';

export default function ActionButtons() {
  return (
    <div className="flex items-center gap-2.5 flex-wrap">
      <button type="button" className="bg-[#8A7A9A]/60 backdrop-blur-sm rounded-full px-4 py-2.5 text-white text-[13px] font-semibold flex items-center gap-2 hover:bg-[#8A7A9A]/80 transition-all shadow-md">
        <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
        Capacity
      </button>
      <button type="button" className="bg-[#8A7A9A]/60 backdrop-blur-sm rounded-full px-4 py-2.5 text-white text-[13px] font-semibold flex items-center gap-2 hover:bg-[#8A7A9A]/80 transition-all shadow-md">
        <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
        Photo gallery
      </button>
      <button type="button" className="bg-[#8A7A9A]/60 backdrop-blur-sm rounded-full px-4 py-2.5 text-white text-[13px] font-semibold flex items-center gap-2 hover:bg-[#8A7A9A]/80 transition-all shadow-md">
        <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
        Links
      </button>
      <button type="button" className="text-white/35 text-[13px] font-semibold px-4 py-2.5 hover:text-white/55 transition-all">
        Show more
      </button>
    </div>
  );
}