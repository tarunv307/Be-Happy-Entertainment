import React from 'react';
import { Link } from 'react-router-dom';
import {
  Film,
  Layers,
  Inbox,
  Users,
  Image,
  ArrowRight,
  Clock,
  CheckCircle2,
  PlusCircle,
  Sparkles,
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
        return 'bg-amber-950/40 text-amber-300 border-amber-500/30';
      case 'contacted':
        return 'bg-blue-950/40 text-blue-300 border-blue-500/30';
      case 'in_progress':
        return 'bg-purple-950/40 text-purple-300 border-purple-500/30';
      case 'completed':
        return 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30';
      default:
        return 'bg-neutral-800 text-neutral-300 border-neutral-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#D6AD68] font-bold block mb-1">
            Studio Overview
          </span>
          <h1 className="font-cinematic text-3xl font-black text-white uppercase tracking-wider">
            PRODUCTION DASHBOARD
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/productions"
            className="btn-gold inline-flex items-center gap-1.5 px-4 py-2.5 rounded-sm text-xs uppercase font-extrabold"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Manage Titles</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-xl bg-[#121212] border border-white/10">
          <div className="flex items-center justify-between text-[#D6AD68] mb-3">
            <span className="text-xs uppercase font-bold tracking-wider text-[#7E7E7E]">Catalog Titles</span>
            <Film className="w-5 h-5" />
          </div>
          <div className="text-3xl font-cinematic font-bold text-white">{totalProductions}</div>
          <span className="text-xs text-[#8E8E8E] mt-1 block">{publishedProductions} active on platform</span>
        </div>

        <div className="p-6 rounded-xl bg-[#121212] border border-white/10">
          <div className="flex items-center justify-between text-[#D6AD68] mb-3">
            <span className="text-xs uppercase font-bold tracking-wider text-[#7E7E7E]">Live Services</span>
            <Layers className="w-5 h-5" />
          </div>
          <div className="text-3xl font-cinematic font-bold text-white">{totalServices}</div>
          <span className="text-xs text-[#8E8E8E] mt-1 block">Film, Short Cinema & Live Concerts</span>
        </div>

        <div className="p-6 rounded-xl bg-[#121212] border border-white/10">
          <div className="flex items-center justify-between text-[#D6AD68] mb-3">
            <span className="text-xs uppercase font-bold tracking-wider text-[#7E7E7E]">Core Team</span>
            <Users className="w-5 h-5" />
          </div>
          <div className="text-3xl font-cinematic font-bold text-white">{totalTeam}</div>
          <span className="text-xs text-[#8E8E8E] mt-1 block">Directors & specialists</span>
        </div>

        <div className="p-6 rounded-xl bg-[#121212] border border-white/10">
          <div className="flex items-center justify-between text-[#D6AD68] mb-3">
            <span className="text-xs uppercase font-bold tracking-wider text-[#7E7E7E]">Enquiries</span>
            <Inbox className="w-5 h-5" />
          </div>
          <div className="text-3xl font-cinematic font-bold text-white">{totalEnquiries}</div>
          <span className="text-xs text-[#8E8E8E] mt-1 block">{pendingEnquiries} pending review</span>
        </div>
      </div>

      {/* Catalog Preview */}
      <div className="rounded-xl bg-[#121212] border border-white/10 p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <h2 className="font-cinematic font-bold text-lg text-white">
            Current Platform Originals
          </h2>
          <Link to="/admin/productions" className="text-xs uppercase tracking-wider text-[#D6AD68] hover:text-white flex items-center gap-1">
            <span>View All</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {productions.map((p) => (
            <div key={p.id} className="p-4 rounded-lg bg-white/5 border border-white/5 flex items-center gap-3">
              <img src={p.poster_url} alt={p.title} className="w-12 h-16 object-cover rounded-sm shrink-0" />
              <div className="min-w-0">
                <span className="text-[9px] uppercase tracking-wider text-[#D6AD68] font-mono block">
                  {p.content_type === 'short-film' ? 'Short Film' : 'Movie'} • {p.year}
                </span>
                <h4 className="font-cinematic font-bold text-sm text-white truncate">{p.title}</h4>
                <span className="text-[10px] text-[#7E7E7E] block mt-0.5 truncate">{p.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Enquiries */}
      <div className="rounded-xl bg-[#121212] border border-white/10 p-6">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
          <h2 className="font-cinematic font-bold text-lg text-white">
            Recent Client & Festival Inquiries
          </h2>
          <Link to="/admin/enquiries" className="text-xs uppercase tracking-wider text-[#D6AD68] hover:text-white flex items-center gap-1">
            <span>Inbox</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {recentEnquiries.length > 0 ? (
          <div className="space-y-3">
            {recentEnquiries.map((enq) => (
              <div key={enq.id} className="p-4 rounded-lg bg-white/5 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <strong className="text-white font-medium block">{enq.full_name} ({enq.email})</strong>
                  <span className="text-[#8E8E8E] mt-0.5 block">{enq.project_title} • {enq.project_type}</span>
                </div>
                <span className={`px-2.5 py-1 rounded-xs uppercase tracking-wider text-[10px] font-bold border self-start sm:self-auto ${getStatusBadge(enq.status)}`}>
                  {enq.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[#7E7E7E]">No recent inquiries.</p>
        )}
      </div>
    </div>
  );
};
