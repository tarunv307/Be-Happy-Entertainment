import React, { useState } from 'react';
import { Layers, Plus, Edit2, Trash2, Eye, EyeOff, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { ServiceItem } from '../../types/database';

export const ServicesAdmin: React.FC = () => {
  const { services, addService, updateService, deleteService } = useData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Cinema');
  const [tagline, setTagline] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [desc, setDesc] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [workflow, setWorkflow] = useState('');
  const [deliverables, setDeliverables] = useState('');
  const [displayOrder, setDisplayOrder] = useState(1);
  const [isPublished, setIsPublished] = useState(true);

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setSlug('');
    setCategory('Cinema');
    setTagline('');
    setShortDesc('');
    setDesc('');
    setImageUrl('');
    setWorkflow('');
    setDeliverables('');
    setDisplayOrder(services.length + 1);
    setIsPublished(true);
  };

  const openCreateModal = () => {
    resetForm();
    setModalOpen(true);
  };

  const openEditModal = (service: ServiceItem) => {
    setEditingId(service.id);
    setTitle(service.title);
    setSlug(service.slug);
    setCategory(service.category);
    setTagline(service.tagline);
    setShortDesc(service.short_description);
    setDesc(service.description);
    setImageUrl(service.image_url);
    setWorkflow((service.workflow_steps || []).join('\n'));
    setDeliverables((service.deliverables || []).join(', '));
    setDisplayOrder(service.display_order);
    setIsPublished(service.is_published);
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
      tagline,
      short_description: shortDesc,
      description: desc,
      image_url:
        imageUrl ||
        '/media/title-3-teaser.png',
      workflow_steps: workflow
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      deliverables: deliverables
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      display_order: Number(displayOrder),
      is_published: isPublished,
    };

    if (editingId) {
      await updateService(editingId, payload);
    } else {
      await addService(payload);
    }

    setModalOpen(false);
    resetForm();
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove "${name}"?`)) {
      await deleteService(id);
    }
  };

  const togglePublish = async (service: ServiceItem) => {
    await updateService(service.id, { is_published: !service.is_published });
  };

  const sortedServices = [...services].sort((a, b) => a.display_order - b.display_order);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#D6AD68] font-bold block mb-1">
            Capabilities & Live Entertainment
          </span>
          <h1 className="font-cinematic text-3xl font-black text-white uppercase tracking-wider">
            SERVICE & CONCERT MANAGEMENT
          </h1>
        </div>

        <button
          onClick={openCreateModal}
          className="btn-gold inline-flex items-center gap-2 px-5 py-2.5 rounded-sm text-xs uppercase font-extrabold cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      <div className="bg-[#121212] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1A1A1A] text-[#8E8E8E] uppercase tracking-wider font-semibold border-b border-white/10">
              <tr>
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Service Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Tagline</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {sortedServices.map((srv) => (
                <tr key={srv.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 text-center font-mono text-[#7E7E7E]">
                    {srv.display_order}
                  </td>
                  <td className="py-3 px-4">
                    <img
                      src={srv.image_url}
                      alt={srv.title}
                      className="w-14 h-10 object-cover rounded-sm border border-white/10"
                    />
                  </td>
                  <td className="py-3 px-4 font-bold text-white text-sm font-cinematic">{srv.title}</td>
                  <td className="py-3 px-4 text-[#B5B5B5]">
                    <span className="px-2 py-0.5 rounded-xs text-[10px] uppercase font-mono bg-white/5 text-[#D6AD68]">
                      {srv.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#8E8E8E] max-w-[240px] truncate">
                    {srv.tagline}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => togglePublish(srv)}
                      className={`p-1.5 cursor-pointer ${
                        srv.is_published ? 'text-emerald-400' : 'text-white/20 hover:text-white/60'
                      }`}
                      title={srv.is_published ? 'Live' : 'Hidden'}
                    >
                      {srv.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(srv)}
                      className="p-1.5 text-[#B5B5B5] hover:text-[#D6AD68] cursor-pointer"
                      title="Edit Service"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(srv.id, srv.title)}
                      className="p-1.5 text-[#B5B5B5] hover:text-red-400 cursor-pointer"
                      title="Delete Service"
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

      {/* Service Edit / Create Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-white/10 max-w-2xl w-full p-6 sm:p-8 rounded-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-white/50 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-cinematic font-bold text-xl text-white mb-6">
              {editingId ? 'Edit Service' : 'Add New Production Service'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                    Service Title *
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
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#1A1A1A] border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
                  >
                    <option value="Cinema">Cinema</option>
                    <option value="Live Events">Live Events & DJ</option>
                    <option value="Audio">Audio & Sound Engineering</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                  Tagline *
                </label>
                <input
                  type="text"
                  required
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  placeholder="/media/..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                  Workflow Steps (One per line)
                </label>
                <textarea
                  rows={3}
                  value={workflow}
                  onChange={(e) => setWorkflow(e.target.value)}
                  placeholder="Step 1&#10;Step 2&#10;Step 3"
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
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
