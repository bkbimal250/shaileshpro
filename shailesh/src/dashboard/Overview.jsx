import StatsCard from "@/features/analytics/StatsCard";
import useDashboard from "@/features/dashboard/useDashboard";
import { Loader2, Zap, MessageSquare, History, Share2, TrendingUp, Inbox } from "lucide-react";
import Card from "@/components/ui/Card";

const Overview = () => {
  const { stats, loading, error } = useDashboard();

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center text-white/60">
        <Loader2 className="animate-spin mr-2" />
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="pb-10">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Overview</h1>
        <p className="text-sm text-white/50">
          Dashboard summary and recent activity
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatsCard title="Projects" value={stats?.projects || 0} icon={<Zap size={16} />} />
        <StatsCard title="Messages" value={stats?.messages || 0} icon={<MessageSquare size={16} />} />
        <StatsCard title="Experience" value={stats?.experiences || 0} icon={<History size={16} />} />
        <StatsCard title="Socials" value={stats?.socials || 0} icon={<Share2 size={16} />} />
      </div>

      {/* CONTENT */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* RECENT MESSAGES */}
        <Card className="lg:col-span-2 bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Recent Messages</h2>
            <a href="/dashboard/messages" className="text-sm text-primary">
              View all
            </a>
          </div>

          {stats?.latestMessages?.length > 0 ? (
            <div className="space-y-3">
              {stats.latestMessages.map((msg) => (
                <div
                  key={msg._id}
                  className="border border-white/10 rounded-lg p-4 bg-bg-canvas"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">{msg.name}</span>
                    <span className="text-xs text-white/50">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-sm text-white/60 line-clamp-2">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-white/50">
              No messages yet
            </div>
          )}
        </Card>

        {/* KPI CARD */}
        <Card className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col justify-center items-center text-center">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
            <TrendingUp size={20} />
          </div>

          <h3 className="font-semibold mb-1">Growth</h3>
          <p className="text-white/50 text-sm mb-4">
            Performance increase
          </p>

          <div className="text-3xl font-bold text-primary">
            +340%
          </div>
        </Card>

      </div>
    </div>
  );
};

export default Overview;