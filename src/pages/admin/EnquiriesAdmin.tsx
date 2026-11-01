import React, { useState } from 'react';
import {
  Inbox,
  Search,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  Building,
  DollarSign,
  Calendar,
  X,
  ExternalLink,
  Save,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Enquiry, EnquiryStatus } from '../../types/database';

export const EnquiriesAdmin: React.FC = () => {
  const { enquiries, updateEnquiryStatus, updateEnquiryNotes, deleteEnquiry } = useData();

  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [internalNotes, setInternalNotes] = useState('');

  const filteredEnquiries = enquiries.filter((enq) => {
    const matchesStatus = statusFilter === 'All' || enq.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      enq.full_name.toLowerCase().includes(q) ||
      enq.email.toLowerCase().includes(q) ||
      enq.project_title.toLowerCase().includes(q) ||
      (enq.company && enq.company.toLowerCase().includes(q));
    return matchesStatus && matchesSearch;
  });

  const openDetails = (enq: Enquiry) => {
    setSelectedEnquiry(enq);
    setInternalNotes(enq.internal_notes || '');
  };

  const handleStatusChange = async (id: string, newStatus: EnquiryStatus) => {
    await updateEnquiryStatus(id, newStatus);
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    await updateEnquiryNotes(selectedEnquiry.id, internalNotes);
    setSelectedEnquiry({ ...selectedEnquiry, internal_notes: internalNotes });
  };

  const handleDelete = async (id: string, clientName: string) => {
    if (window.confirm(`Are you sure you want to permanently delete the inquiry from "${clientName}"?`)) {
      await deleteEnquiry(id);
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry(null);
      }
    }
  };

  const getStatusBadge = (status: EnquiryStatus) => {
    switch (status) {
      case 'new':
        return 'bg-amber-950/50 text-amber-300 border-amber-500/30';
      case 'contacted':
        return 'bg-blue-950/50 text-blue-300 border-blue-500/30';
      case 'in_progress':
        return 'bg-purple-950/50 text-purple-300 border-purple-500/30';
      case 'completed':
        return 'bg-emerald-950/50 text-emerald-300 border-emerald-500/30';
      default:
        return 'bg-neutral-800 text-neutral-300 border-neutral-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#D6AD68] font-bold block mb-1">
            Client Directives & Screening Requests
          </span>
          <h1 className="font-cinematic text-3xl font-black text-white uppercase tracking-wider">
            PROJECT INQUIRIES ({enquiries.length})
          </h1>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['All', 'new', 'contacted', 'in_progress', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer rounded-xs ${
                statusFilter === status
                  ? 'bg-[#D6AD68] text-black font-bold shadow-md'
                  : 'bg-white/5 border border-white/10 text-[#B5B5B5] hover:text-white hover:bg-white/10'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-[#D6AD68] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by client name, email, or project title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-xs bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-xs text-white focus:outline-hidden"
        />
      </div>

      {/* Table */}
      <div className="bg-[#121212] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#1A1A1A] text-[#8E8E8E] uppercase tracking-wider font-semibold border-b border-white/10">
              <tr>
                <th className="py-3 px-4">Client Name</th>
                <th className="py-3 px-4">Project Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredEnquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-white">
                    <div className="font-bold font-cinematic">{enq.full_name}</div>
                    <div className="text-[11px] text-[#7E7E7E]">{enq.email}</div>
                  </td>
                  <td className="py-3.5 px-4 text-[#D6AD68] font-medium max-w-[220px] truncate">
                    {enq.project_title}
                  </td>
                  <td className="py-3.5 px-4 text-[#B5B5B5]">
                    <span className="px-2 py-0.5 rounded-xs text-[10px] uppercase font-mono bg-white/5 border border-white/10">
                      {enq.project_type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={enq.status}
                      onChange={(e) => handleStatusChange(enq.id, e.target.value as EnquiryStatus)}
                      className={`text-[10px] uppercase tracking-wider font-bold py-1 px-2.5 rounded-xs border cursor-pointer ${getStatusBadge(
                        enq.status
                      )}`}
                    >
                      <option value="new" className="bg-[#151515] text-amber-300">New</option>
                      <option value="contacted" className="bg-[#151515] text-blue-300">Contacted</option>
                      <option value="in_progress" className="bg-[#151515] text-purple-300">In Progress</option>
                      <option value="completed" className="bg-[#151515] text-emerald-300">Completed</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => openDetails(enq)}
                      className="p-1.5 text-[#B5B5B5] hover:text-[#D6AD68] cursor-pointer"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(enq.id, enq.full_name)}
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

      {/* Details Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-white/10 max-w-xl w-full p-6 sm:p-8 rounded-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setSelectedEnquiry(null)}
              className="absolute top-5 right-5 text-white/50 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] uppercase tracking-widest text-[#D6AD68] font-bold block mb-1">
              Inquiry Dossier
            </span>
            <h2 className="font-cinematic font-bold text-2xl text-white mb-4">
              {selectedEnquiry.project_title}
            </h2>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#7E7E7E]">Client:</span>
                  <strong className="text-white">{selectedEnquiry.full_name}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7E7E7E]">Email:</span>
                  <a href={`mailto:${selectedEnquiry.email}`} className="text-[#D6AD68] hover:underline">
                    {selectedEnquiry.email}
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7E7E7E]">Phone:</span>
                  <a href={`tel:${selectedEnquiry.phone}`} className="text-white">
                    {selectedEnquiry.phone}
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7E7E7E]">Type:</span>
                  <strong className="text-white">{selectedEnquiry.project_type}</strong>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-[#7E7E7E] block mb-1">
                  Creative Brief & Message
                </span>
                <p className="p-3.5 rounded-xl bg-white/5 text-[#B5B5B5] leading-relaxed">
                  {selectedEnquiry.project_description}
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-[#7E7E7E] block mb-1">
                  Internal Production Notes
                </span>
                <textarea
                  rows={3}
                  value={internalNotes}
                  onChange={(e) => setInternalNotes(e.target.value)}
                  placeholder="Record internal team remarks, budget quotes, or callback timestamps..."
                  className="w-full bg-white/5 border border-white/10 focus:border-[#D6AD68] rounded-xl p-3 text-xs text-white focus:outline-hidden"
                />
                <button
                  onClick={handleSaveNotes}
                  className="mt-2 btn-gold px-4 py-2 rounded-sm text-xs uppercase font-bold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Notes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
