import React, { useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  imageUrl: string;
  title: string;
  caption?: string;
  category?: string;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  imageUrl,
  title,
  caption,
  category,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-fadeIn"
      onClick={onClose}
    >
      {/* Top Header */}
      <div
        className="flex items-center justify-between text-white max-w-7xl mx-auto w-full z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {category && (
            <span className="text-[10px] uppercase tracking-widest text-[#B69A65] font-semibold block">
              {category}
            </span>
          )}
          <h4 className="font-editorial text-lg sm:text-xl text-neutral-100">{title}</h4>
        </div>
        <button
          onClick={onClose}
          aria-label="Close Lightbox"
          className="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer bg-white/10 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Center Image */}
      <div
        className="flex-1 flex items-center justify-center my-4 overflow-hidden relative max-w-6xl mx-auto w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageUrl}
          alt={title}
          className="max-h-[78vh] max-w-full object-contain rounded-xs shadow-2xl transition-transform duration-300"
        />
      </div>

      {/* Bottom Caption */}
      {caption && (
        <div
          className="max-w-3xl mx-auto w-full text-center text-xs text-neutral-300 font-light z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <p>{caption}</p>
        </div>
      )}
    </div>
  );
};
