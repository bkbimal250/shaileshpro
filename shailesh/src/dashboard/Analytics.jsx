import Chart from "@/features/analytics/Chart";

const Analytics = () => {
  return (
    <div className="pb-24">
      <div className="mb-10 pb-8 border-b border-white/5">
        <h1 className="text-2xl md:text-3xl font-black text-white leading-tight uppercase tracking-tighter italic mb-1.5">Growth Analytics</h1>
        <p className="text-white/20 text-[9px] font-black italic tracking-[0.4em] uppercase leading-none">Track your lead generation and engagement metrics in real-time.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 h-[550px]">
        <div className="lg:col-span-8 bg-bg-white border border-white/5 rounded-[3rem] p-8 md:p-10 shadow-premium group">
            <h3 className="text-white/40 font-black text-[10px] uppercase tracking-[0.4em] mb-8 italic group-hover:text-primary transition-colors">Campaign Performance</h3>
            <Chart />
        </div>
        <div className="lg:col-span-4 bg-bg-white border border-white/5 rounded-[3rem] p-8 md:p-10 relative overflow-hidden group shadow-premium flex flex-col justify-center border-l-4 border-l-accent">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl rounded-full -m-10 group-hover:scale-150 transition-transform" />
            <h3 className="text-white/40 font-black text-[10px] uppercase tracking-[0.4em] mb-6 italic relative z-10 leading-none">Engagement ROI</h3>
            <div className="text-5xl font-black text-white italic tracking-tighter relative z-10 leading-none">248<span className="text-accent">%</span></div>
            <p className="text-white/10 text-[8px] font-black uppercase tracking-[0.3em] mt-6 relative z-10 leading-relaxed italic">Avg increase across <br /> paid campaigns.</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;