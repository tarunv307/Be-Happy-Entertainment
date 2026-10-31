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
    if (window.confirm(`Are you sure you want to permanently delete the enquiry from "${clientName}"?`)) {
      await deleteEnquiry(id);
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry(null);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'contacted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in_progress':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-neutral-100 text-neutral-800 border-neutral-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E9E7E2]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B69A65] font-semibold block mb-1">
            Client Directives
          </span>
          <h1 className="font-editorial text-3xl font-semibold text-[#171717]">
            Project Enquiries ({enquiries.length})
          </h1>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['All', 'new', 'contacted', 'in_progress', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                statusFilter === status
                  ? 'bg-[#171717] text-white'
                  : 'bg-white border border-[#E9E7E2] text-[#777777] hover:text-[#171717]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-[#777777] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by client name, email, or project title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E9E7E2] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F6F3] text-[#777777] uppercase tracking-wider font-semibold border-b border-[#E9E7E2]">
              <tr>
                <th className="py-3 px-4">Client Name</th>
                <th className="py-3 px-4">Project Title</th>
                <th className="py-3 px-4">Project Type</th>
                <th className="py-3 px-4">Budget / Timeline</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Received</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E7E2]">
              {filteredEnquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-[#F7F6F3]/50 transition-colors">
                  <td className="py-3.5 px-4 font-medium text-[#171717]">
                    <div className="font-semibold">{enq.full_name}</div>
                    <div className="text-[11px] text-[#777777]">{enq.email}</div>
                  </td>
                  <td className="py-3.5 px-4 text-[#171717] font-medium max-w-[220px] truncate">
                    {enq.project_title}
                  </td>
                  <td className="py-3.5 px-4 text-[#777777]">{enq.project_type}</td>
                  <td className="py-3.5 px-4 text-[#777777]">
                    <div>{enq.estimated_budget || 'Unspecified'}</div>
                    <div className="text-[10px] text-neutral-400">
                      {enq.expected_timeline || 'Flexible'}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={enq.status}
                      onChange={(e) => handleStatusChange(enq.id, e.target.value as EnquiryStatus)}
                      className={`text-[10px] font-semibold uppercase tracking-wider border rounded-xs px-2 py-1 cursor-pointer ${getStatusBadge(
                        enq.status
                      )}`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="archived">Archived</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right text-[#777777]">
                    {new Date(enq.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => openDetails(enq)}
                      className="p-1.5 text-[#777777] hover:text-[#171717] cursor-pointer"
                      title="Inspect Full Brief"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(enq.id, enq.full_name)}
                      className="p-1.5 text-[#777777] hover:text-red-600 cursor-pointer"
                      title="Delete Spam"
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

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E9E7E2] max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setSelectedEnquiry(null)}
              className="absolute top-5 right-5 text-[#777777] hover:text-[#171717] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] uppercase tracking-widest text-[#B69A65] font-semibold block mb-1">
              Confidential Client Brief
            </span>
            <h3 className="font-editorial text-2xl font-semibold text-[#171717] mb-2">
              {selectedEnquiry.project_title}
            </h3>

            <div className="flex items-center gap-3 mb-6">
              <span
                className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${getStatusBadge(
                  selectedEnquiry.status
                )}`}
              >
                {selectedEnquiry.status}
              </span>
              <span className="text-xs text-[#777777]">
                Received {new Date(selectedEnquiry.created_at).toLocaleString()}
              </span>
            </div>

            {/* Client Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#F7F6F3] border border-[#E9E7E2] text-xs mb-6">
              <div>
                <span className="text-[10px] uppercase text-[#777777] block">Client Name</span>
                <span className="font-semibold text-[#171717] text-sm">
                  {selectedEnquiry.full_name}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase text-[#777777] block">Company</span>
                <span className="font-semibold text-[#171717]">
                  {selectedEnquiry.company || 'Independent'}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase text-[#777777] block">Email Address</span>
                <a
                  href={`mailto:${selectedEnquiry.email}`}
                  className="font-semibold text-[#B69A65] hover:underline"
                >
                  {selectedEnquiry.email}
                </a>
              </div>

              <div>
                <span className="text-[10px] uppercase text-[#777777] block">Phone</span>
                <a
                  href={`tel:${selectedEnquiry.phone}`}
                  className="font-semibold text-[#171717] hover:underline"
                >
                  {selectedEnquiry.phone}
                </a>
              </div>

              <div>
                <span className="text-[10px] uppercase text-[#777777] block">Project Type</span>
                <span className="font-semibold text-[#171717]">
                  {selectedEnquiry.project_type}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase text-[#777777] block">Estimated Budget</span>
                <span className="font-semibold text-[#171717]">
                  {selectedEnquiry.estimated_budget || 'Unspecified'}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase text-[#777777] block">Expected Timeline</span>
                <span className="font-semibold text-[#171717]">
                  {selectedEnquiry.expected_timeline || 'Flexible'}
                </span>
              </div>

              {selectedEnquiry.reference_links && (
                <div>
                  <span className="text-[10px] uppercase text-[#777777] block">Reference Links</span>
                  <a
                    href={selectedEnquiry.reference_links}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#B69A65] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Open Reference</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#171717] mb-2">
                Project Scope & Requirements
              </h4>
              <div className="p-4 bg-white border border-[#E9E7E2] text-xs text-[#171717] leading-relaxed whitespace-pre-wrap">
                {selectedEnquiry.project_description}
              </div>
            </div>

            {/* Internal Notes */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#171717]">
                  Internal Studio Notes
                </h4>
                <button
                  onClick={handleSaveNotes}
                  className="text-xs uppercase font-semibold text-[#B69A65] hover:underline inline-flex items-center gap-1"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Notes</span>
                </button>
              </div>
              <textarea
                rows={3}
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="Log internal discussions, scheduled pitch calls, director assignments..."
                className="w-full p-3 text-xs bg-[#F7F6F3] border border-[#E9E7E2] focus:outline-hidden focus:border-[#B69A65]"
              />
            </div>

            {/* Close */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E9E7E2]">
              <button
                onClick={() => handleDelete(selectedEnquiry.id, selectedEnquiry.full_name)}
                className="text-xs uppercase tracking-wider text-red-600 hover:underline"
              >
                Delete Enquiry
              </button>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="px-6 py-2 bg-[#171717] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B69A65] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
