import StatsCard from "@/features/analytics/StatsCard";
import useDashboard from "@/features/dashboard/useDashboard";
import { Loader2, Zap, MessageSquare, History, Share2, TrendingUp, Inbox } from "lucide-react";
import Card from "@/components/ui/Card";

const Overview = () => {
  const { stats, loading, error } = useDashboard();

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-text-muted">
        <Loader2 className="animate-spin mr-2 text-primary" /> Initializing Strategy Deck...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 bg-red-500/10 border border-red-500/20 text-red-500 rounded-[3rem] text-[10px] font-black uppercase tracking-[0.4em] italic shadow-sm animate-pulse">
        Operational Error: {error}
      </div>
    );
  }

  return (
    <div className="pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
        <div>
          <div className="flex items-center gap-3 mb-3">
             <TrendingUp size={14} className="text-primary animate-bounce-subtle" />
             <h2 className="text-[10px] font-black uppercase text-white/20 tracking-[0.4em] leading-none mb-1 italic">Real-Time Performance</h2>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter leading-none">Operations Deck</h1>
        </div>
        <div className="px-5 py-2.5 bg-bg-white border border-white/5 rounded-2xl shadow-sm text-[9px] font-black uppercase text-primary tracking-[0.3em] italic">
           System Active // V2.4.0
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <StatsCard title="Projects" value={stats?.projects || 0} icon={<Zap size={14} />} />
        <StatsCard title="Messages" value={stats?.messages || 0} icon={<MessageSquare size={14} />} />
        <StatsCard title="Deployments" value={stats?.experiences || 0} icon={<History size={14} />} />
        <StatsCard title="Ecosystems" value={stats?.socials || 0} icon={<Share2 size={14} />} />
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <Card className="lg:col-span-2 bg-bg-white border border-white/5 p-8 md:p-12 rounded-[3.5rem] shadow-premium group">
          <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-8">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-bg-canvas rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-inner-light">
                  <Inbox size={20} />
               </div>
               <h2 className="text-sm font-black text-white uppercase italic tracking-widest leading-none">Recent Intelligence</h2>
            </div>
            <a href="/dashboard/messages" className="text-[9px] font-black text-white/20 hover:text-primary uppercase tracking-[0.4em] italic flex items-center gap-3 transition-all hover:translate-x-1">Log Archive</a>
          </div>

          {stats?.latestMessages?.length > 0 ? (
            <div className="space-y-4">
              {stats.latestMessages.map((msg) => (
                <div key={msg._id} className="p-6 rounded-3xl border border-white/5 bg-bg-canvas hover:border-primary/30 transition-all group/msg">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3">
                    <span className="font-black text-white text-lg italic uppercase tracking-tighter leading-none group-hover/msg:text-primary transition-colors">{msg.name}</span>
                    <span className="text-[9px] text-white/20 font-black uppercase tracking-widest italic">{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed font-bold italic line-clamp-1 uppercase tracking-tight">{msg.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-white/10 italic text-[11px] font-black uppercase tracking-[0.6em] animate-pulse">No tactical intel indexed.</div>
          )}
        </Card>

        <Card className="bg-bg-white border border-white/5 p-10 md:p-14 rounded-[3.5rem] flex flex-col justify-center items-center text-center shadow-premium relative overflow-hidden group hover:border-primary/30 transition-all border-l-4 border-l-primary">
           <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/5 blur-3xl rounded-full" />
           <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white mb-8 shadow-3xl shadow-primary/20 transform group-hover:scale-105 transition-transform">
              <TrendingUp size={36} />
           </div>
           <h3 className="text-xl font-black text-white uppercase italic tracking-tighter leading-none mb-4">Velocity</h3>
           <p className="text-white/20 text-[9px] italic leading-relaxed uppercase tracking-[0.2em] mb-10 font-black leading-tight max-w-[200px]">Surging metrics across all deployment channels.</p>
           <div className="text-5xl md:text-6xl font-black text-primary italic tracking-tighter leading-none mb-3">+340%</div>
           <div className="text-[8px] font-black text-white/10 uppercase tracking-[0.5em] italic">ROI ARCHITECTURE</div>
        </Card>
      </div>
    </div>
  );
};

export default Overview;