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
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Production, ProductionCategory } from '../../types/database';

export const ProductionsAdmin: React.FC = () => {
  const { productions, addProduction, updateProduction, deleteProduction } = useData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<ProductionCategory>('Feature Films');
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [shortDesc, setShortDesc] = useState('');
  const [desc, setDesc] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [youtubeTrailer, setYoutubeTrailer] = useState('');
  const [director, setDirector] = useState('');
  const [producer, setProducer] = useState('Kavin');
  const [cinematographer, setCinematographer] = useState('');
  const [editor, setEditor] = useState('');
  const [castCrew, setCastCrew] = useState('');
  const [status, setStatus] = useState<
    'Pre-Production' | 'In Production' | 'Post-Production' | 'Completed' | 'Released'
  >('Completed');
  const [isPublished, setIsPublished] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setSlug('');
    setCategory('Feature Films');
    setYear(new Date().getFullYear());
    setShortDesc('');
    setDesc('');
    setPosterUrl('');
    setCoverUrl('');
    setYoutubeTrailer('');
    setDirector('');
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
    setYear(prod.year);
    setShortDesc(prod.short_description);
    setDesc(prod.description);
    setPosterUrl(prod.poster_url);
    setCoverUrl(prod.cover_url);
    setYoutubeTrailer(prod.youtube_trailer_url || '');
    setDirector(prod.director);
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
      year: Number(year),
      short_description: shortDesc,
      description: desc,
      poster_url:
        posterUrl ||
        'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
      cover_url:
        coverUrl ||
        'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1600&q=80',
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
    if (window.confirm(`Are you sure you want to remove "${title}" from productions?`)) {
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E9E7E2]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B69A65] font-semibold block mb-1">
            Repertoire Database
          </span>
          <h1 className="font-editorial text-3xl font-semibold text-[#171717]">
            Production Management
          </h1>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#171717] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B69A65] transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Production</span>
        </button>
      </div>

      {/* Productions Table */}
      <div className="bg-white border border-[#E9E7E2] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F6F3] text-[#777777] uppercase tracking-wider font-semibold border-b border-[#E9E7E2]">
              <tr>
                <th className="py-3 px-4">Poster</th>
                <th className="py-3 px-4">Project Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Year</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Featured</th>
                <th className="py-3 px-4 text-center">Published</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E7E2]">
              {productions.map((prod) => (
                <tr key={prod.id} className="hover:bg-[#F7F6F3]/50 transition-colors">
                  <td className="py-3 px-4">
                    <img
                      src={prod.poster_url || prod.cover_url}
                      alt={prod.title}
                      className="w-12 h-14 object-cover border border-[#E9E7E2]"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium text-[#171717]">
                    <div className="text-sm font-semibold">{prod.title}</div>
                    <div className="text-[11px] text-[#777777]">
                      dir. {prod.director} • prod. {prod.producer}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[#777777]">{prod.category}</td>
                  <td className="py-3 px-4 text-[#777777]">{prod.year}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 text-[10px] uppercase font-semibold bg-[#F7F6F3] border border-[#E9E7E2] text-[#171717]">
                      {prod.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => toggleFeatured(prod)}
                      className={`p-1 transition-colors cursor-pointer ${
                        prod.is_featured ? 'text-[#B69A65]' : 'text-neutral-300 hover:text-neutral-500'
                      }`}
                      title={prod.is_featured ? 'Featured on Home' : 'Not Featured'}
                    >
                      <Star className={`w-4 h-4 ${prod.is_featured ? 'fill-current' : ''}`} />
                    </button>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => togglePublish(prod)}
                      className={`p-1 transition-colors cursor-pointer ${
                        prod.is_published
                          ? 'text-emerald-600'
                          : 'text-neutral-400 hover:text-neutral-600'
                      }`}
                      title={prod.is_published ? 'Published (Public)' : 'Draft (Unlisted)'}
                    >
                      {prod.is_published ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(prod)}
                      className="p-1.5 text-[#777777] hover:text-[#171717] transition-colors cursor-pointer"
                      title="Edit Production"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(prod.id, prod.title)}
                      className="p-1.5 text-[#777777] hover:text-red-600 transition-colors cursor-pointer"
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

      {/* Modal Dialog for Create/Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E9E7E2] max-w-3xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-[#777777] hover:text-[#171717] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] uppercase tracking-widest text-[#B69A65] font-semibold block mb-1">
              Production Editor
            </span>
            <h3 className="font-editorial text-2xl font-semibold text-[#171717] mb-6">
              {editingId ? 'Edit Production' : 'Create New Production'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProductionCategory)}
                    className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                  >
                    <option value="Feature Films">Feature Films</option>
                    <option value="Short Films">Short Films</option>
                    <option value="Music Videos">Music Videos</option>
                    <option value="Commercial Advertisements">Commercial Advertisements</option>
                    <option value="Corporate Films">Corporate Films</option>
                    <option value="Event Productions">Event Productions</option>
                    <option value="Photography">Photography</option>
                    <option value="Digital Content">Digital Content</option>
                    <option value="Other Media Productions">Other Media Productions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                    Year *
                  </label>
                  <input
                    type="number"
                    required
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                    Production Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                  >
                    <option value="Pre-Production">Pre-Production</option>
                    <option value="In Production">In Production</option>
                    <option value="Post-Production">Post-Production</option>
                    <option value="Completed">Completed</option>
                    <option value="Released">Released</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                  Short Description * (Catalog summary)
                </label>
                <input
                  type="text"
                  required
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                  Full Narrative / Description *
                </label>
                <textarea
                  rows={4}
                  required
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                    Poster Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={posterUrl}
                    onChange={(e) => setPosterUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                    Cover Banner URL
                  </label>
                  <input
                    type="url"
                    value={coverUrl}
                    onChange={(e) => setCoverUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                  YouTube Trailer / Video URL
                </label>
                <input
                  type="url"
                  value={youtubeTrailer}
                  onChange={(e) => setYoutubeTrailer(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                    Producer *
                  </label>
                  <input
                    type="text"
                    required
                    value={producer}
                    onChange={(e) => setProducer(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                    Director *
                  </label>
                  <input
                    type="text"
                    required
                    value={director}
                    onChange={(e) => setDirector(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                    Cinematographer (DP)
                  </label>
                  <input
                    type="text"
                    value={cinematographer}
                    onChange={(e) => setCinematographer(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                    Lead Editor
                  </label>
                  <input
                    type="text"
                    value={editor}
                    onChange={(e) => setEditor(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                  Cast & Crew Highlights
                </label>
                <input
                  type="text"
                  value={castCrew}
                  onChange={(e) => setCastCrew(e.target.value)}
                  placeholder="Key talent, starring actors, production designers..."
                  className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold uppercase tracking-wider text-[#171717]">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="w-4 h-4 text-[#B69A65]"
                  />
                  <span>Published (Visible to Public)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold uppercase tracking-wider text-[#171717]">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 text-[#B69A65]"
                  />
                  <span>Feature on Homepage</span>
                </label>
              </div>

              {/* Submit Buttons */}
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
                  {editingId ? 'Save Changes' : 'Create Production'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
