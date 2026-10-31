import React from 'react';
import { Link } from 'react-router-dom';
import {
  Film,
  Layers,
  Inbox,
  Users,
  Image,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  PlusCircle,
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export const DashboardHome: React.FC = () => {
  const { productions, services, teamMembers, galleryItems, enquiries } = useData();

  const totalProductions = productions.length;
  const publishedProductions = productions.filter((p) => p.is_published).length;
  const totalEnquiries = enquiries.length;
  const pendingEnquiries = enquiries.filter((e) => e.status === 'new').length;
  const totalServices = services.length;
  const totalTeam = teamMembers.length;

  const recentEnquiries = enquiries.slice(0, 5);

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
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E9E7E2]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B69A65] font-semibold block mb-1">
            Studio Overview
          </span>
          <h1 className="font-editorial text-3xl font-semibold text-[#171717]">
            Production Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/productions"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#171717] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#B69A65] transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>New Production</span>
          </Link>
          <Link
            to="/admin/enquiries"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-[#E9E7E2] text-[#171717] text-xs uppercase tracking-widest font-semibold hover:border-[#171717] transition-colors"
          >
            <span>Review Enquiries ({pendingEnquiries})</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 border border-[#E9E7E2] shadow-xs space-y-3">
          <div className="flex items-center justify-between text-[#777777]">
            <span className="text-xs uppercase tracking-wider font-semibold">Total Productions</span>
            <Film className="w-4 h-4 text-[#B69A65]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#171717]">{totalProductions}</span>
            <span className="text-xs text-[#777777]">({publishedProductions} published)</span>
          </div>
        </div>

        <div className="bg-white p-6 border border-[#E9E7E2] shadow-xs space-y-3">
          <div className="flex items-center justify-between text-[#777777]">
            <span className="text-xs uppercase tracking-wider font-semibold">Client Enquiries</span>
            <Inbox className="w-4 h-4 text-[#B69A65]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#171717]">{totalEnquiries}</span>
            {pendingEnquiries > 0 ? (
              <span className="text-xs text-amber-600 font-semibold">
                ({pendingEnquiries} pending review)
              </span>
            ) : (
              <span className="text-xs text-emerald-600 font-medium">(All addressed)</span>
            )}
          </div>
        </div>

        <div className="bg-white p-6 border border-[#E9E7E2] shadow-xs space-y-3">
          <div className="flex items-center justify-between text-[#777777]">
            <span className="text-xs uppercase tracking-wider font-semibold">Live Services</span>
            <Layers className="w-4 h-4 text-[#B69A65]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#171717]">{totalServices}</span>
            <span className="text-xs text-[#777777]">production lines</span>
          </div>
        </div>

        <div className="bg-white p-6 border border-[#E9E7E2] shadow-xs space-y-3">
          <div className="flex items-center justify-between text-[#777777]">
            <span className="text-xs uppercase tracking-wider font-semibold">Creative Team</span>
            <Users className="w-4 h-4 text-[#B69A65]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#171717]">{totalTeam}</span>
            <span className="text-xs text-[#777777]">roster profiles</span>
          </div>
        </div>
      </div>

      {/* Recent Enquiries Section */}
      <div className="bg-white border border-[#E9E7E2] p-6 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-editorial text-xl font-semibold text-[#171717]">
              Recent Project Inquiries
            </h3>
            <p className="text-xs text-[#777777]">
              Confidential client briefs received through the portal
            </p>
          </div>
          <Link
            to="/admin/enquiries"
            className="text-xs uppercase tracking-wider font-semibold text-[#B69A65] hover:underline inline-flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentEnquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F6F3] text-[#777777] uppercase tracking-wider font-semibold border-b border-[#E9E7E2]">
                <tr>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Project</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Budget</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9E7E2]">
                {recentEnquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-[#F7F6F3]/50 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-[#171717]">
                      <div>{enq.full_name}</div>
                      <div className="text-[11px] text-[#777777] font-normal">{enq.email}</div>
                    </td>
                    <td className="py-3.5 px-4 text-[#171717] font-medium max-w-[200px] truncate">
                      {enq.project_title}
                    </td>
                    <td className="py-3.5 px-4 text-[#777777]">{enq.project_type}</td>
                    <td className="py-3.5 px-4 text-[#777777]">
                      {enq.estimated_budget || 'Unspecified'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${getStatusBadge(
                          enq.status
                        )}`}
                      >
                        {enq.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right text-[#777777]">
                      {new Date(enq.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-xs text-[#777777]">
            No client enquiries received yet.
          </div>
        )}
      </div>

      {/* Production Works Summary */}
      <div className="bg-white border border-[#E9E7E2] p-6 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-editorial text-xl font-semibold text-[#171717]">
              Current Productions
            </h3>
            <p className="text-xs text-[#777777]">Active and released film productions in catalog</p>
          </div>
          <Link
            to="/admin/productions"
            className="text-xs uppercase tracking-wider font-semibold text-[#B69A65] hover:underline inline-flex items-center gap-1"
          >
            <span>Manage All Productions</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {productions.slice(0, 3).map((prod) => (
            <div
              key={prod.id}
              className="flex items-center gap-4 p-3 border border-[#E9E7E2] bg-[#F7F6F3]"
            >
              <img
                src={prod.poster_url || prod.cover_url}
                alt={prod.title}
                className="w-16 h-16 object-cover flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[10px] uppercase tracking-wider text-[#B69A65] font-semibold block truncate">
                  {prod.category}
                </span>
                <h4 className="font-editorial text-sm font-semibold text-[#171717] truncate">
                  {prod.title}
                </h4>
                <div className="flex items-center gap-2 text-[11px] text-[#777777] mt-0.5">
                  <span>{prod.year}</span>
                  <span>•</span>
                  <span>{prod.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
