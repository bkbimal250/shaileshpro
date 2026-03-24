import Card from "@/components/ui/Card";

const StatsCard = ({ title, value }) => {
  return (
    <Card className="text-center group border border-white/5 hover:border-primary/20 p-8 rounded-[2.5rem] bg-bg-white shadow-premium hover:-translate-y-1 transition-all">
      <p className="text-[10px] font-black uppercase text-white/20 tracking-[0.3em] mb-4 italic leading-none">{title.toUpperCase()}</p>
      <h2 className="text-4xl lg:text-5xl font-black text-white italic tracking-tighter leading-none group-hover:text-primary transition-colors">{value}</h2>
      <div className="w-8 h-1 bg-white/5 mx-auto mt-6 rounded-full group-hover:w-16 group-hover:bg-primary/20 transition-all" />
    </Card>
  );
};

export default StatsCard;