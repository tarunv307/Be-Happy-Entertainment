import React, { useEffect } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxItem {
  id?: string;
  image_url: string;
  title: string;
  caption?: string;
  category?: string;
}

interface LightboxProps {
  isOpen?: boolean;
  item?: LightboxItem | null;
  imageUrl?: string;
  title?: string;
  caption?: string;
  category?: string;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  item,
  imageUrl,
  title,
  caption,
  category,
  onClose,
  onNext,
  onPrev,
}) => {
  const effectiveIsOpen = isOpen !== undefined ? isOpen : !!item;
  const effectiveImageUrl = item ? item.image_url : (imageUrl || '');
  const effectiveTitle = item ? item.title : (title || '');
  const effectiveCaption = item ? item.caption : caption;
  const effectiveCategory = item ? item.category : category;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    if (effectiveIsOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [effectiveIsOpen, onClose, onNext, onPrev]);

  if (!effectiveIsOpen) return null;

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
          {effectiveCategory && (
            <span className="text-[10px] uppercase tracking-widest text-[#D6AD68] font-semibold block">
              {effectiveCategory}
            </span>
          )}
          <h4 className="font-editorial text-lg sm:text-xl text-neutral-100">{effectiveTitle}</h4>
        </div>
        <button
          onClick={onClose}
          aria-label="Close Lightbox"
          className="p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer bg-white/10 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Center Image with Navigation */}
      <div
        className="flex-1 flex items-center justify-between my-4 overflow-hidden relative max-w-7xl mx-auto w-full px-2"
        onClick={(e) => e.stopPropagation()}
      >
        {onPrev ? (
          <button
            onClick={onPrev}
            aria-label="Previous image"
            className="p-3 text-white bg-black/60 hover:bg-[#D6AD68] hover:text-black rounded-full border border-white/10 transition-all cursor-pointer z-20 shrink-0"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        ) : (
          <div className="w-12 shrink-0" />
        )}

        <div className="flex-1 flex items-center justify-center max-w-5xl mx-4">
          <img
            src={effectiveImageUrl}
            alt={effectiveTitle}
            className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl transition-transform duration-300"
          />
        </div>

        {onNext ? (
          <button
            onClick={onNext}
            aria-label="Next image"
            className="p-3 text-white bg-black/60 hover:bg-[#D6AD68] hover:text-black rounded-full border border-white/10 transition-all cursor-pointer z-20 shrink-0"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        ) : (
          <div className="w-12 shrink-0" />
        )}
      </div>

      {/* Bottom Caption */}
      {effectiveCaption && (
        <div
          className="max-w-3xl mx-auto w-full text-center text-xs text-neutral-300 font-light z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <p>{effectiveCaption}</p>
        </div>
      )}
    </div>
  );
};
