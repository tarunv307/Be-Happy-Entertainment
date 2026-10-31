import React, { useState } from 'react';
import { Layers, Plus, Edit2, Trash2, Eye, EyeOff, X, ArrowUp, ArrowDown } from 'lucide-react';
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

    const workflowSteps = workflow
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const deliverablesList = deliverables
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      title,
      slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
      category,
      tagline,
      short_description: shortDesc,
      description: desc,
      image_url:
        imageUrl ||
        'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
      workflow_steps: workflowSteps,
      deliverables: deliverablesList,
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

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove "${title}"?`)) {
      await deleteService(id);
    }
  };

  const togglePublish = async (service: ServiceItem) => {
    await updateService(service.id, { is_published: !service.is_published });
  };

  const sortedServices = [...services].sort((a, b) => a.display_order - b.display_order);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E9E7E2]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B69A65] font-semibold block mb-1">
            Capabilities
          </span>
          <h1 className="font-editorial text-3xl font-semibold text-[#171717]">
            Service Management ({services.length})
          </h1>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#171717] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B69A65] transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      <div className="bg-white border border-[#E9E7E2] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F6F3] text-[#777777] uppercase tracking-wider font-semibold border-b border-[#E9E7E2]">
              <tr>
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Service Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Tagline</th>
                <th className="py-3 px-4 text-center">Published</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E7E2]">
              {sortedServices.map((srv) => (
                <tr key={srv.id} className="hover:bg-[#F7F6F3]/50 transition-colors">
                  <td className="py-3 px-4 text-center font-mono text-[#777777]">
                    {srv.display_order}
                  </td>
                  <td className="py-3 px-4">
                    <img
                      src={srv.image_url}
                      alt={srv.title}
                      className="w-12 h-10 object-cover border border-[#E9E7E2]"
                    />
                  </td>
                  <td className="py-3 px-4 font-semibold text-[#171717]">{srv.title}</td>
                  <td className="py-3 px-4 text-[#777777]">{srv.category}</td>
                  <td className="py-3 px-4 text-[#777777] max-w-[200px] truncate">
                    {srv.tagline}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => togglePublish(srv)}
                      className={`p-1 cursor-pointer ${
                        srv.is_published ? 'text-emerald-600' : 'text-neutral-400'
                      }`}
                      title={srv.is_published ? 'Published' : 'Hidden'}
                    >
                      {srv.is_published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(srv)}
                      className="p-1.5 text-[#777777] hover:text-[#171717] cursor-pointer"
                      title="Edit Service"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(srv.id, srv.title)}
                      className="p-1.5 text-[#777777] hover:text-red-600 cursor-pointer"
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E9E7E2] max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-[#777777] hover:text-[#171717] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] uppercase tracking-widest text-[#B69A65] font-semibold block mb-1">
              Service Configuration
            </span>
            <h3 className="font-editorial text-2xl font-semibold text-[#171717] mb-6">
              {editingId ? 'Edit Service' : 'Add New Service'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                    Service Title *
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
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                  Tagline / Header Pitch *
                </label>
                <input
                  type="text"
                  required
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                  Short Description * (Cards)
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
                  Full Service Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                  Workflow Steps (one per line)
                </label>
                <textarea
                  rows={3}
                  value={workflow}
                  onChange={(e) => setWorkflow(e.target.value)}
                  placeholder="Step 1&#10;Step 2&#10;Step 3"
                  className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                  Deliverables (comma separated)
                </label>
                <input
                  type="text"
                  value={deliverables}
                  onChange={(e) => setDeliverables(e.target.value)}
                  placeholder="4K Master, Teaser Cuts, High-Res Stills"
                  className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold uppercase tracking-wider text-[#171717]">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="w-4 h-4 text-[#B69A65]"
                  />
                  <span>Published (Visible on Services page)</span>
                </label>
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
                  {editingId ? 'Save Changes' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
