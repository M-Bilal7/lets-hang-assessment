'use client';

import { useEffect } from 'react';
import { useRecoilState_TRANSITION_SUPPORT_UNSTABLE } from 'recoil';
import { Link as LinkIcon, Plus, X } from 'lucide-react';
import { selectedModulesAtom } from '@/lib/store/atoms';
import { LinkItem } from '@/lib/types/link';

export default function LinksInput() {
  const [selectedModules, setSelectedModules] = useRecoilState_TRANSITION_SUPPORT_UNSTABLE(selectedModulesAtom);
  const linksModule = selectedModules.find(m => m.type === 'links');
  const links: LinkItem[] = linksModule?.data?.links || [];

  const addLink = () => {
    const newLink: LinkItem = {
      id: `link_${Date.now()}`,
      url: '',
      label: '',
    };

    setSelectedModules(prev =>
      prev.map(m =>
        m.type === 'links'
          ? { ...m, data: { links: [...(m.data?.links || []), newLink] } }
          : m
      )
    );
  };

  const updateLink = (id: string, field: 'url' | 'label', value: string) => {
    setSelectedModules(prev =>
      prev.map(m =>
        m.type === 'links'
          ? {
              ...m,
              data: {
                links: (m.data?.links || []).map((link: LinkItem) =>
                  link.id === id ? { ...link, [field]: value } : link
                ),
              },
            }
          : m
      )
    );
  };

  const removeLink = (id: string) => {
    setSelectedModules(prev =>
      prev.map(m =>
        m.type === 'links'
          ? {
              ...m,
              data: {
                links: (m.data?.links || []).filter((link: LinkItem) => link.id !== id),
              },
            }
          : m
      )
    );
  };

  // Add initial link if none exists
  useEffect(() => {
    if (linksModule && links.length === 0) {
      const newLink: LinkItem = {
        id: `link_${Date.now()}`,
        url: '',
        label: '',
      };

      setSelectedModules(prev =>
        prev.map(m =>
          m.type === 'links'
            ? { ...m, data: { links: [newLink] } }
            : m
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linksModule?.id]);

  return (
    <div className="space-y-3">
      {links.map((link: LinkItem) => (
        <div key={link.id} className="bg-[#6A5A7A]/65 backdrop-blur-sm rounded-[18px] p-4 shadow-lg">
          <div className="flex items-start gap-3">
            <LinkIcon className="w-5 h-5 text-white/60 mt-3" strokeWidth={2.5} />
            <div className="flex-1 space-y-2">
              <input
                type="url"
                value={link.url}
                onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                placeholder="Add link"
                className="w-full bg-transparent text-white placeholder-white/45 outline-none text-[14px] pb-2 border-b border-white/10"
              />
              <input
                type="text"
                value={link.label}
                onChange={(e) => updateLink(link.id, 'label', e.target.value)}
                placeholder="Label (optional)"
                className="w-full bg-transparent text-white placeholder-white/45 outline-none text-[13px]"
              />
            </div>
            {links.length > 1 && (
              <button
                type="button"
                onClick={() => removeLink(link.id)}
                className="text-white/40 hover:text-red-400 transition-colors mt-2"
              >
                <X className="w-4 h-4" strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addLink}
        className="w-full bg-[#6A5A7A]/40 hover:bg-[#6A5A7A]/60 backdrop-blur-sm rounded-[18px] py-3 px-4 text-white/70 text-[13px] font-medium flex items-center justify-center gap-2 transition-all"
      >
        <Plus className="w-4 h-4" strokeWidth={2.5} />
        Add another link
      </button>
    </div>
  );
}