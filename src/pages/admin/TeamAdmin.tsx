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
  const [linkedin, setLinkedin] = useState('');
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
    setLinkedin('');
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
    setLinkedin(member.social_links?.linkedin || '');
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
      photo_url:
        photoUrl ||
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80',
      biography,
      creative_philosophy: creativePhilosophy,
      is_producer: isProducer,
      social_links: {
        instagram: instagram || undefined,
        linkedin: linkedin || undefined,
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

  const handleDelete = async (id: string, memberName: string) => {
    if (window.confirm(`Are you sure you want to remove "${memberName}" from the team roster?`)) {
      await deleteTeamMember(id);
    }
  };

  const sortedMembers = [...teamMembers].sort((a, b) => a.display_order - b.display_order);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E9E7E2]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B69A65] font-semibold block mb-1">
            Studio Roster
          </span>
          <h1 className="font-editorial text-3xl font-semibold text-[#171717]">
            Team Management ({teamMembers.length})
          </h1>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#171717] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B69A65] transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      <div className="bg-white border border-[#E9E7E2] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F6F3] text-[#777777] uppercase tracking-wider font-semibold border-b border-[#E9E7E2]">
              <tr>
                <th className="py-3 px-4">Photo</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Position</th>
                <th className="py-3 px-4">Role Department</th>
                <th className="py-3 px-4 text-center">Producer Role</th>
                <th className="py-3 px-4 text-center">Order</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E7E2]">
              {sortedMembers.map((member) => (
                <tr key={member.id} className="hover:bg-[#F7F6F3]/50 transition-colors">
                  <td className="py-3 px-4">
                    <img
                      src={member.photo_url}
                      alt={member.name}
                      className="w-10 h-12 object-cover border border-[#E9E7E2]"
                    />
                  </td>
                  <td className="py-3 px-4 font-semibold text-[#171717]">{member.name}</td>
                  <td className="py-3 px-4 text-[#777777]">{member.position}</td>
                  <td className="py-3 px-4 text-[#777777]">{member.role_category}</td>
                  <td className="py-3 px-4 text-center">
                    {member.is_producer ? (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-[#B69A65]">
                        <Star className="w-3 h-3 fill-current" /> Producer
                      </span>
                    ) : (
                      <span className="text-[#777777]">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center font-mono text-[#777777]">
                    {member.display_order}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(member)}
                      className="p-1.5 text-[#777777] hover:text-[#171717] cursor-pointer"
                      title="Edit Profile"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(member.id, member.name)}
                      className="p-1.5 text-[#777777] hover:text-red-600 cursor-pointer"
                      title="Delete Profile"
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

      {/* Member Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E9E7E2] max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-[#777777] hover:text-[#171717] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] uppercase tracking-widest text-[#B69A65] font-semibold block mb-1">
              Roster Profile
            </span>
            <h3 className="font-editorial text-2xl font-semibold text-[#171717] mb-6">
              {editingId ? 'Edit Team Member' : 'Add Team Member'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                    Position / Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="e.g. Director of Photography"
                    className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                    Role Category *
                  </label>
                  <select
                    value={roleCategory}
                    onChange={(e) => setRoleCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                  >
                    <option value="Executive">Executive</option>
                    <option value="Direction">Direction</option>
                    <option value="Cinematography">Cinematography</option>
                    <option value="Post-Production">Post-Production</option>
                    <option value="Crew">Crew</option>
                  </select>
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
                  Photo URL *
                </label>
                <input
                  type="url"
                  required
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                  Biography *
                </label>
                <textarea
                  rows={3}
                  required
                  value={biography}
                  onChange={(e) => setBiography(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                  Creative Philosophy / Quote (Optional)
                </label>
                <input
                  type="text"
                  value={creativePhilosophy}
                  onChange={(e) => setCreativePhilosophy(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#171717] mb-1">
                    Instagram URL
                  </label>
                  <input
                    type="url"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="https://instagram.com/..."
                    className="w-full px-3 py-2 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold uppercase tracking-wider text-[#171717]">
                  <input
                    type="checkbox"
                    checked={isProducer}
                    onChange={(e) => setIsProducer(e.target.checked)}
                    className="w-4 h-4 text-[#B69A65]"
                  />
                  <span>Featured as Head Producer</span>
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
                  {editingId ? 'Save Profile' : 'Add Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
