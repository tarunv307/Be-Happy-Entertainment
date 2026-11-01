import React, { useState } from 'react';
import {
  Film,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Star,
  X,
  Check,
  ExternalLink,
  Play,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Production, ProductionCategory } from '../../types/database';
import { CinematicPlayerModal } from '../../components/player/CinematicPlayerModal';

export const ProductionsAdmin: React.FC = () => {
  const { productions, addProduction, updateProduction, deleteProduction } = useData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<ProductionCategory>('Feature Films');
  const [contentType, setContentType] = useState<'movie' | 'short-film' | 'concert'>('movie');
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [runtime, setRuntime] = useState('');
  const [tagline, setTagline] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [desc, setDesc] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [youtubeTrailer, setYoutubeTrailer] = useState('');
  const [director, setDirector] = useState('Kavin');
  const [producer, setProducer] = useState('Kavin');
  const [cinematographer, setCinematographer] = useState('');
  const [editor, setEditor] = useState('');
  const [castCrew, setCastCrew] = useState('');
  const [status, setStatus] = useState<
    'Pre-Production' | 'In Production' | 'Post-Production' | 'Completed' | 'Released'
  >('Completed');
  const [isPublished, setIsPublished] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  // Quick player preview state
  const [previewVideo, setPreviewVideo] = useState<{ isOpen: boolean; url: string; title: string }>({
    isOpen: false,
    url: '',
    title: '',
  });

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setSlug('');
    setCategory('Feature Films');
    setContentType('movie');
    setYear(new Date().getFullYear());
    setRuntime('');
    setTagline('');
    setShortDesc('');
    setDesc('');
    setPosterUrl('');
    setCoverUrl('');
    setVideoUrl('');
    setYoutubeTrailer('');
    setDirector('Kavin');
    setProducer('Kavin');
    setCinematographer('');
    setEditor('');
    setCastCrew('');
    setStatus('Completed');
    setIsPublished(true);
    setIsFeatured(false);
  };

  const openCreateModal = () => {
    resetForm();
    setModalOpen(true);
  };

  const openEditModal = (prod: Production) => {
    setEditingId(prod.id);
    setTitle(prod.title);
    setSlug(prod.slug);
    setCategory(prod.category);
    setContentType(prod.content_type || 'movie');
    setYear(prod.year);
    setRuntime(prod.runtime || '');
    setTagline(prod.tagline || '');
    setShortDesc(prod.short_description);
    setDesc(prod.description);
    setPosterUrl(prod.poster_url);
    setCoverUrl(prod.cover_url);
    setVideoUrl(prod.video_url || '');
    setYoutubeTrailer(prod.youtube_trailer_url || '');
    setDirector(prod.director || 'Kavin');
    setProducer(prod.producer || 'Kavin');
    setCinematographer(prod.cinematographer || '');
    setEditor(prod.editor || '');
    setCastCrew(prod.cast_and_crew || '');
    setStatus(prod.status);
    setIsPublished(prod.is_published);
    setIsFeatured(prod.is_featured);
    setModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingId) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
      category,
      content_type: contentType,
      year: Number(year),
      runtime,
      tagline,
      short_description: shortDesc,
      description: desc,
      poster_url: posterUrl || '/media/padikathavan-poster.webp',
      cover_url: coverUrl || posterUrl || '/media/padikathavan-poster.webp',
      video_url: videoUrl,
      youtube_trailer_url: youtubeTrailer,
      director,
      producer,
      cinematographer,
      editor,
      cast_and_crew: castCrew,
      credits: [
        { role: 'Producer', name: producer },
        { role: 'Director', name: director },
        ...(cinematographer ? [{ role: 'Cinematographer', name: cinematographer }] : []),
        ...(editor ? [{ role: 'Editor', name: editor }] : []),
      ],
      gallery_images: [posterUrl, coverUrl].filter(Boolean),
      status,
      is_published: isPublished,
      is_featured: isFeatured,
    };

    if (editingId) {
      await updateProduction(editingId, payload);
    } else {
      await addProduction(payload);
    }

    setModalOpen(false);
    resetForm();
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove "${title}" from the catalog?`)) {
      await deleteProduction(id);
    }
  };

  const togglePublish = async (prod: Production) => {
    await updateProduction(prod.id, { is_published: !prod.is_published });
  };

  const toggleFeatured = async (prod: Production) => {
    await updateProduction(prod.id, { is_featured: !prod.is_featured });
  };

  return (
    <div className="space-y-6">
      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#D6AD68] font-bold block mb-1">
            Repertoire Database
          </span>
          <h1 className="font-cinematic text-3xl font-black text-white uppercase tracking-wider">
            PRODUCTION & OTT MANAGEMENT
          </h1>
        </div>

        <button
          onClick={openCreateModal}
          className="btn-gold inline-flex items-center gap-2 px-5 py-2.5 rounded-sm text-xs uppercase font-extrabold cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Production</span>
        </button>
      </div>

      {/* Productions Table */}
      <div className="bg-[#121212] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1A1A1A] text-[#8E8E8E] uppercase tracking-wider font-semibold border-b border-white/10">
              <tr>
                <th className="py-3 px-4">Poster</th>
                <th className="py-3 px-4">Project Title</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Year</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Video Stream</th>
                <th className="py-3 px-4 text-center">Featured</th>
                <th className="py-3 px-4 text-center">Published</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {productions.map((prod) => (
                <tr key={prod.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4">
                    <img
                      src={prod.poster_url || prod.cover_url}
                      alt={prod.title}
                      className="w-12 h-16 object-cover rounded-sm border border-white/10"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium text-white">
                    <div className="text-sm font-cinematic font-bold">{prod.title}</div>
                    <div className="text-[11px] text-[#7E7E7E] mt-0.5">
                      dir. {prod.director} • prod. {prod.producer}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[#B5B5B5]">
                    <span className="px-2 py-0.5 rounded-xs text-[10px] uppercase font-mono bg-white/5 text-[#D6AD68]">
                      {prod.content_type || 'movie'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#B5B5B5]">{prod.year}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 text-[10px] uppercase font-semibold bg-white/5 border border-white/10 text-white rounded-xs">
                      {prod.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {prod.video_url ? (
                      <button
                        onClick={() =>
                          setPreviewVideo({
                            isOpen: true,
                            url: prod.video_url!,
                            title: prod.title,
                          })
                        }
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#D6AD68]/20 text-[#D6AD68] hover:bg-[#D6AD68] hover:text-black border border-[#D6AD68]/40 text-[10px] font-bold uppercase transition-all cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Stream</span>
                      </button>
                    ) : (
                      <span className="text-[#555] text-[10px] uppercase font-mono">No Video</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => toggleFeatured(prod)}
                      className={`p-1.5 transition-colors cursor-pointer ${
                        prod.is_featured ? 'text-[#D6AD68]' : 'text-white/20 hover:text-white/60'
                      }`}
                      title={prod.is_featured ? 'Featured on Hero' : 'Not Featured'}
                    >
                      <Star className={`w-4 h-4 ${prod.is_featured ? 'fill-current' : ''}`} />
                    </button>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => togglePublish(prod)}
                      className={`p-1.5 transition-colors cursor-pointer ${
                        prod.is_published ? 'text-emerald-400' : 'text-white/20 hover:text-white/60'
                      }`}
                      title={prod.is_published ? 'Published (Live)' : 'Draft (Unlisted)'}
                    >
                      {prod.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(prod)}
                      className="p-1.5 text-[#B5B5B5] hover:text-[#D6AD68] transition-colors cursor-pointer"
                      title="Edit Production"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(prod.id, prod.title)}
                      className="p-1.5 text-[#B5B5B5] hover:text-red-400 transition-colors cursor-pointer"
                      title="Delete Production"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Create Production Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#141414] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h2 className="font-cinematic font-bold text-xl text-white">
                {editingId ? 'Edit Production & OTT Metadata' : 'Add New Cinematic Production'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-white/50 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                    Film / Title Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                    Content Classification *
                  </label>
                  <select
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value as any)}
                    className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
                  >
                    <option value="movie">Movie / Feature Film</option>
                    <option value="short-film">Short Film</option>
                    <option value="concert">Concert / Musical Event</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                    Release Year
                  </label>
                  <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                    Runtime
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 22m or 1h 48m"
                    value={runtime}
                    onChange={(e) => setRuntime(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                  Tagline / Catchphrase
                </label>
                <input
                  type="text"
                  placeholder="e.g. Some stories find you... First love. Lasts forever."
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                    Poster URL *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="/media/..."
                    value={posterUrl}
                    onChange={(e) => setPosterUrl(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                    Cover / Banner URL
                  </label>
                  <input
                    type="text"
                    placeholder="/media/..."
                    value={coverUrl}
                    onChange={(e) => setCoverUrl(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                    Actual Video URL (MP4 Stream)
                  </label>
                  <input
                    type="text"
                    placeholder="/media/padikathavan.mp4"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                    YouTube URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://youtube.com/..."
                    value={youtubeTrailer}
                    onChange={(e) => setYoutubeTrailer(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                  Synopsis / Story Description
                </label>
                <textarea
                  rows={3}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                    Director
                  </label>
                  <input
                    type="text"
                    value={director}
                    onChange={(e) => setDirector(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                    Producer
                  </label>
                  <input
                    type="text"
                    value={producer}
                    onChange={(e) => setProducer(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                    Production Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
                  >
                    <option value="Pre-Production">Pre-Production</option>
                    <option value="In Production">In Production</option>
                    <option value="Post-Production">Post-Production</option>
                    <option value="Completed">Completed</option>
                    <option value="Released">Released</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="accent-[#D6AD68] w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="isFeatured" className="text-xs uppercase font-bold text-white cursor-pointer">
                    Feature in OTT Hero
                  </label>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="isPublished"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="accent-[#D6AD68] w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="isPublished" className="text-xs uppercase font-bold text-white cursor-pointer">
                    Live / Published
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-sm bg-white/5 hover:bg-white/10 text-white text-xs uppercase font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gold px-6 py-2.5 rounded-sm text-xs uppercase font-extrabold cursor-pointer"
                >
                  {editingId ? 'Save Production Changes' : 'Create Production'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Video Preview Modal */}
      <CinematicPlayerModal
        isOpen={previewVideo.isOpen}
        onClose={() => setPreviewVideo((prev) => ({ ...prev, isOpen: false }))}
        videoUrl={previewVideo.url}
        title={previewVideo.title}
      />
    </div>
  );
};
