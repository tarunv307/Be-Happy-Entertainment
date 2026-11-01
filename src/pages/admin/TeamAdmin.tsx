import React, { useState } from 'react';
import { Users, Plus, Edit2, Trash2, X, Star } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { TeamMember } from '../../types/database';

export const TeamAdmin: React.FC = () => {
  const { teamMembers, addTeamMember, updateTeamMember, deleteTeamMember } = useData();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [roleCategory, setRoleCategory] = useState<
    'Executive' | 'Direction' | 'Cinematography' | 'Post-Production' | 'Crew'
  >('Direction');
  const [photoUrl, setPhotoUrl] = useState('');
  const [biography, setBiography] = useState('');
  const [creativePhilosophy, setCreativePhilosophy] = useState('');
  const [isProducer, setIsProducer] = useState(false);
  const [instagram, setInstagram] = useState('');
  const [youtube, setYoutube] = useState('');
  const [displayOrder, setDisplayOrder] = useState(1);
  const [isPublished, setIsPublished] = useState(true);

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setPosition('');
    setRoleCategory('Direction');
    setPhotoUrl('');
    setBiography('');
    setCreativePhilosophy('');
    setIsProducer(false);
    setInstagram('');
    setYoutube('');
    setDisplayOrder(teamMembers.length + 1);
    setIsPublished(true);
  };

  const openCreateModal = () => {
    resetForm();
    setModalOpen(true);
  };

  const openEditModal = (member: TeamMember) => {
    setEditingId(member.id);
    setName(member.name);
    setPosition(member.position);
    setRoleCategory(member.role_category);
    setPhotoUrl(member.photo_url);
    setBiography(member.biography);
    setCreativePhilosophy(member.creative_philosophy || '');
    setIsProducer(member.is_producer);
    setInstagram(member.social_links?.instagram || '');
    setYoutube((member.social_links as any)?.youtube || '');
    setDisplayOrder(member.display_order);
    setIsPublished(member.is_published);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name,
      position,
      role_category: roleCategory,
      photo_url: photoUrl || '/media/kavin-director-banner.png',
      biography,
      creative_philosophy: creativePhilosophy,
      is_producer: isProducer,
      social_links: {
        instagram: instagram || undefined,
        youtube: youtube || undefined,
      },
      display_order: Number(displayOrder),
      is_published: isPublished,
    };

    if (editingId) {
      await updateTeamMember(editingId, payload);
    } else {
      await addTeamMember(payload);
    }

    setModalOpen(false);
    resetForm();
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove ${name}?`)) {
      await deleteTeamMember(id);
    }
  };

  const sortedMembers = [...teamMembers].sort((a, b) => a.display_order - b.display_order);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#D6AD68] font-bold block mb-1">
            Studio Key Crew
          </span>
          <h1 className="font-cinematic text-3xl font-black text-white uppercase tracking-wider">
            TEAM & ARTISTS MANAGEMENT
          </h1>
        </div>

        <button
          onClick={openCreateModal}
          className="btn-gold inline-flex items-center gap-2 px-5 py-2.5 rounded-sm text-xs uppercase font-extrabold cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      <div className="bg-[#121212] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1A1A1A] text-[#8E8E8E] uppercase tracking-wider font-semibold border-b border-white/10">
              <tr>
                <th className="py-3 px-4">Photo</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Position</th>
                <th className="py-3 px-4">Role Category</th>
                <th className="py-3 px-4 text-center">Producer Lead</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {sortedMembers.map((m) => (
                <tr key={m.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4">
                    <img
                      src={m.photo_url}
                      alt={m.name}
                      className="w-10 h-10 rounded-full object-cover border border-white/10"
                    />
                  </td>
                  <td className="py-3 px-4 font-bold text-white text-sm font-cinematic">{m.name}</td>
                  <td className="py-3 px-4 text-[#B5B5B5]">{m.position}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-xs text-[10px] uppercase font-mono bg-white/5 text-[#D6AD68]">
                      {m.role_category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {m.is_producer && (
                      <span className="px-2 py-0.5 rounded-xs text-[10px] font-bold uppercase bg-[#D6AD68] text-black">
                        Lead Producer
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(m)}
                      className="p-1.5 text-[#B5B5B5] hover:text-[#D6AD68] cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(m.id, m.name)}
                      className="p-1.5 text-[#B5B5B5] hover:text-red-400 cursor-pointer"
                      title="Delete"
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

      {/* Modal */}
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
              {editingId ? 'Edit Team Member' : 'Add Creative Collaborator'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                    Role / Position *
                  </label>
                  <input
                    type="text"
                    required
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                  Photo URL
                </label>
                <input
                  type="text"
                  placeholder="/media/..."
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                  Creative Philosophy / Tagline
                </label>
                <input
                  type="text"
                  value={creativePhilosophy}
                  onChange={(e) => setCreativePhilosophy(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-sm p-2.5 text-xs text-white focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs uppercase font-bold text-[#B5B5B5] block mb-1">
                  Biography & Background
                </label>
                <textarea
                  rows={3}
                  value={biography}
                  onChange={(e) => setBiography(e.target.value)}
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
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
