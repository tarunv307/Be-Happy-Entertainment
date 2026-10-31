import React, { useState } from 'react';
import { Image, Plus, Trash2, X } from 'lucide-react';
import { useData } from '../../context/DataContext';

export const GalleryAdmin: React.FC = () => {
  const { galleryItems, addGalleryItem, deleteGalleryItem } = useData();

  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState<
    'Behind The Scenes' | 'Film Production' | 'Photography' | 'Events' | 'Studio' | 'Team'
  >('Behind The Scenes');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) return;

    await addGalleryItem({
      title,
      caption,
      category,
      image_url: imageUrl,
      aspect_ratio: 'landscape',
      display_order: galleryItems.length + 1,
    });

    setModalOpen(false);
    setTitle('');
    setCaption('');
    setImageUrl('');
  };

  const handleDelete = async (id: string, itemTitle: string) => {
    if (window.confirm(`Delete "${itemTitle}" from the gallery?`)) {
      await deleteGalleryItem(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E9E7E2]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B69A65] font-semibold block mb-1">
            Visual Media Repository
          </span>
          <h1 className="font-editorial text-3xl font-semibold text-[#171717]">
            Gallery Management ({galleryItems.length})
          </h1>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#171717] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B69A65] transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Media Asset</span>
        </button>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#E9E7E2] overflow-hidden group shadow-xs"
          >
            <div className="aspect-16/10 relative bg-[#F7F6F3] overflow-hidden">
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => handleDelete(item.id, item.title)}
                className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                title="Delete Image"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="p-3">
              <span className="text-[10px] uppercase tracking-wider text-[#B69A65] font-semibold block">
                {item.category}
              </span>
              <h4 className="font-semibold text-xs text-[#171717] truncate mt-0.5">{item.title}</h4>
              {item.caption && (
                <p className="text-[11px] text-[#777777] truncate mt-0.5 font-light">
                  {item.caption}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E9E7E2] max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-[#777777] hover:text-[#171717] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] uppercase tracking-widest text-[#B69A65] font-semibold block mb-1">
              Asset Registration
            </span>
            <h3 className="font-editorial text-2xl font-semibold text-[#171717] mb-6">
              Add Photo to Gallery
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                  Asset Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Master Lens Alignment"
                  className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                >
                  <option value="Behind The Scenes">Behind The Scenes</option>
                  <option value="Film Production">Film Production</option>
                  <option value="Photography">Photography</option>
                  <option value="Events">Events</option>
                  <option value="Studio">Studio</option>
                  <option value="Team">Team</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                  Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                  Caption (Optional)
                </label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Notes about lighting, gear or location..."
                  className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                />
              </div>

              <div className="pt-4 border-t border-[#E9E7E2] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-[#E9E7E2] text-xs uppercase tracking-wider font-semibold text-[#777777] hover:bg-[#F7F6F3]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#171717] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B69A65] transition-colors"
                >
                  Upload To Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
