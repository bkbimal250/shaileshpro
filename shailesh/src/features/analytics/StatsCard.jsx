import Card from "@/components/ui/Card";

const StatsCard = ({ title, value }) => {
  return (
    <Card className="text-center group border border-white/5 hover:border-primary/20 p-5 rounded-2xl bg-bg-white shadow-premium hover:-translate-y-1 transition-all">
      <p className="text-[9px] font-black uppercase text-white/20 tracking-[0.3em] mb-3 italic leading-none">{title.toUpperCase()}</p>
      <h2 className="text-2xl lg:text-3xl font-black text-white italic tracking-tighter leading-none group-hover:text-primary transition-colors">{value}</h2>
      <div className="w-6 h-1 bg-white/5 mx-auto mt-4 rounded-full group-hover:w-12 group-hover:bg-primary/20 transition-all" />
    </Card>
  );
};

export default StatsCard;