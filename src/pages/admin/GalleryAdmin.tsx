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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#D6AD68] font-bold block mb-1">
            Visual Media Repository
          </span>
          <h1 className="font-cinematic text-3xl font-black text-white uppercase tracking-wider">
            GALLERY MANAGEMENT ({galleryItems.length})
          </h1>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="btn-gold inline-flex items-center gap-2 px-5 py-2.5 rounded-sm text-xs uppercase font-extrabold cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Media Asset</span>
        </button>
      </div>

      {/* Grid of gallery assets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-xl overflow-hidden bg-[#121212] border border-white/10 hover:border-[#D6AD68]/40 transition-all flex flex-col justify-between"
          >
            <div className="relative aspect-4/3 w-full overflow-hidden bg-black">
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
              <button
                onClick={() => handleDelete(item.id, item.title)}
                className="absolute top-3 right-3 p-2 rounded-full bg-red-950/80 hover:bg-red-600 text-white transition-colors cursor-pointer"
                title="Remove Asset"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-[#141414]">
              <span className="text-[10px] uppercase font-mono text-[#D6AD68] block">
                {item.category}
              </span>
              <h4 className="font-cinematic font-bold text-sm text-white mt-0.5 truncate">
                {item.title}
              </h4>
              {item.caption && (
                <p className="text-xs text-[#8E8E8E] mt-1 line-clamp-1">
                  {item.caption}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-white/10 max-w-lg w-full p-6 sm:p-8 rounded-2xl shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-white/50 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-cinematic font-bold text-xl text-white mb-6">
              Add New Gallery Asset
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                  Asset Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
                >
                  <option value="Behind The Scenes">Behind The Scenes</option>
                  <option value="Film Production">Film Production</option>
                  <option value="Studio">Studio & Audio Console</option>
                </select>
              </div>

              <div>
                <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                  Image URL (/media/...) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="/media/..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                  Caption
                </label>
                <textarea
                  rows={2}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-sm bg-white/5 hover:bg-white/10 text-white text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gold px-6 py-2 rounded-sm text-xs uppercase font-extrabold"
                >
                  Add Media
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
