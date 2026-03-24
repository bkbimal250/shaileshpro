import { useState } from "react";
import SocialForm from "@/features/socials/SocialForm";
import useSocial from "@/features/socials/useSocial";
import { Loader2, Trash2, Globe, TrendingUp, BarChart, Instagram, Linkedin, Facebook, Youtube, Twitter, Edit2, X, Plus, ExternalLink } from "lucide-react";
import Button from "@/components/ui/Button";

const Icons = {
  Instagram: <Instagram size={18} className="text-pink-500" />,
  LinkedIn: <Linkedin size={18} className="text-blue-600" />,
  Facebook: <Facebook size={18} className="text-blue-500" />,
  YouTube: <Youtube size={18} className="text-red-500" />,
  Twitter: <Twitter size={18} className="text-white" />,
};

const Socials = () => {
  const { socials, loading, error, removeSocial, addSocial, modifySocial } = useSocial();
  const [showForm, setShowForm] = useState(false);
  const [editingSocial, setEditingSocial] = useState(null);

  const handleAddSocial = async (data) => {
    if (editingSocial) {
      await modifySocial(editingSocial._id, data);
    } else {
      await addSocial(data);
    }
    closeForm();
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingSocial(null);
  };

  const startEdit = (social) => {
    setEditingSocial(social);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this brand record?")) {
      removeSocial(id);
    }
  };

  if (loading && socials.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-white/50">
        <Loader2 className="animate-spin mr-2 text-secondary" /> Indexing Social Hive...
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10 pb-8 border-b border-white/5">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white leading-tight uppercase tracking-tighter italic mb-1.5">Social Hub</h1>
          <p className="text-white/20 text-[9px] font-black italic tracking-[0.4em] uppercase leading-none">Registry of managed digital ecosystems.</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="h-12 px-8 rounded-xl w-full md:w-auto text-[9px]">
          {showForm ? <X size={18} /> : <div className="flex items-center gap-2"><Plus size={18} /> INITIALIZE</div>}
        </Button>
      </div>

      {error && (
        <div className="p-6 bg-red-500/10 border border-red-500/20 text-red-500 rounded-3xl mb-10 text-[10px] font-black uppercase tracking-widest italic animate-bounce">
          System Alert: {error}
        </div>
      )}

      {showForm && (
        <div className="max-w-4xl mb-12 bg-bg-white p-8 md:p-10 rounded-[3rem] border border-white/5 shadow-premium animate-in fade-in zoom-in-95 duration-500 overflow-x-hidden">
          <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-8">
             <h2 className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] italic leading-none">{editingSocial ? "Synchronize Brand Intel" : "Initialize New Ecosystem"}</h2>
             <button onClick={closeForm} className="text-white/20 hover:text-white transition-colors"><X size={18} /></button>
          </div>
          <SocialForm onSubmit={handleAddSocial} initialData={editingSocial || {}} />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {socials.length > 0 ? (
          socials.map((s) => (
            <div key={s._id} className="bg-bg-white border border-white/5 p-8 rounded-[2.5rem] flex flex-col group hover:border-secondary/40 transition-all shadow-premium relative overflow-hidden h-full">
              <div className="flex items-start justify-between mb-10">
                 <div className="w-14 h-14 bg-bg-canvas rounded-2xl flex items-center justify-center border border-white/5 group-hover:scale-105 group-hover:bg-secondary/5 transition-all overflow-hidden shadow-xl">
                   {s.logo ? (
                     <img src={s.logo} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                   ) : (
                     <span className="opacity-20">{Icons[s.platform] || <Globe size={20} />}</span>
                   )}
                 </div>
                 <div className="flex gap-2">
                    <button onClick={() => startEdit(s)} className="w-9 h-9 flex items-center justify-center bg-bg-canvas text-white/20 hover:text-secondary hover:bg-secondary/10 rounded-xl transition-all border border-white/5"><Edit2 size={14} /></button>
                    <button onClick={() => handleDelete(s._id)} className="w-9 h-9 flex items-center justify-center bg-bg-canvas text-white/20 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all border border-white/5"><Trash2 size={14} /></button>
                 </div>
              </div>

              <div className="flex-1 mb-8">
                 <h3 className="text-xl font-black text-white uppercase italic tracking-tighter leading-none mb-2 group-hover:text-secondary transition-all">{s.handle || s.platform}</h3>
                 <div className="text-[9px] font-black text-white/10 uppercase tracking-[0.4em] mb-6">{s.platform} • {s.niche || "Lifestyle"}</div>
                                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-bg-canvas rounded-2xl border border-white/5">
                        <span className="text-[8px] font-black text-white/10 uppercase tracking-widest leading-none">Subscribers</span>
                        <span className="text-lg font-black text-white leading-none italic">{s.followers?.toLocaleString() || "10K+"}</span>
                    </div>
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-2">
                           <TrendingUp size={12} className="text-secondary" />
                           <span className="text-[8px] font-black text-secondary uppercase tracking-widest">{s.growth || "Organic"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <BarChart size={12} className="text-accent" />
                           <span className="text-[8px] font-black text-accent uppercase tracking-widest">{s.engagementRate || "N/A"} ROI</span>
                        </div>
                    </div>
                 </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                 <span className={`px-3 py-1.5 bg-bg-canvas text-[8px] font-black rounded-full border border-white/5 uppercase tracking-widest italic ${s.managed ? 'text-secondary' : 'text-white/10'}`}>
                    {s.managed ? "MANAGED" : "INACTIVE"}
                 </span>
                 <a href={s.profileUrl || "#"} target="_blank" rel="noopener noreferrer" className="text-white/10 hover:text-white transition-colors">
                    <ExternalLink size={18} />
                 </a>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-32 text-center border border-dashed border-white/5 rounded-[4rem] text-white/10 italic text-[10px] font-black uppercase tracking-[0.6em] animate-pulse">
            No brand records indexed.
          </div>
        )}
      </div>
    </>
  );
};

export default Socials;
