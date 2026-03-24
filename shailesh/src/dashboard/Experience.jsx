import { useState } from "react";
import ExperienceForm from "@/features/experience/ExperienceForm";
import useExperience from "@/features/experience/useExperience";
import { Loader2, Trash2, Calendar, Edit2, X, Plus } from "lucide-react";
import Button from "@/components/ui/Button";

const Experience = () => {
  const { experiences, loading, error, removeExperience, addExperience, modifyExperience } = useExperience();
  const [showForm, setShowForm] = useState(false);
  const [editingExp, setEditingExp] = useState(null);

  const handleAddExperience = async (data) => {
    if (editingExp) {
      await modifyExperience(editingExp._id, data);
    } else {
      await addExperience(data);
    }
    closeForm();
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingExp(null);
  };

  const startEdit = (exp) => {
    setEditingExp(exp);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this professional milestone?")) {
      removeExperience(id);
    }
  };

  if (loading && experiences.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-white/50">
        <Loader2 className="animate-spin mr-2" /> Loading Experiences...
      </div>
    );
  }

  return (
    <div className="pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10 pb-8 border-b border-white/5">
        <div>
           <h1 className="text-2xl md:text-3xl font-black text-white leading-tight uppercase tracking-tighter italic mb-1.5">Experience Vault</h1>
           <p className="text-white/20 text-[9px] font-black italic tracking-[0.4em] uppercase leading-none">Chronicle of operational deployment.</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="h-12 px-8 rounded-xl w-full md:w-auto text-[9px]">
          {showForm ? <X size={18} /> : <div className="flex items-center gap-2"><Plus size={18} /> REGISTER MILESTONE</div>}
        </Button>
      </div>

      {error && (
        <div className="p-6 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl mb-10 text-[9px] font-black uppercase tracking-[0.4em] italic shadow-sm animate-pulse">
           System Alert: {error}
        </div>
      )}

      {showForm && (
        <div className="max-w-4xl mb-12 bg-bg-white p-8 md:p-10 rounded-[3rem] border border-white/5 shadow-premium animate-in fade-in zoom-in-95 duration-500 relative overflow-hidden">
          <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-8">
             <h2 className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] italic leading-none">{editingExp ? "Update Milestone Data" : "Initialize Professional Record"}</h2>
             <button onClick={closeForm} className="text-white/20 hover:text-white transition-colors"><X size={18} /></button>
          </div>
          <ExperienceForm onSubmit={handleAddExperience} initialData={editingExp || {}} />
        </div>
      )}

      <div className="space-y-6">
        {experiences.length > 0 ? (
          experiences.map((exp) => (
            <div key={exp._id} className="bg-bg-white border border-white/5 p-8 md:p-10 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group hover:border-secondary transition-all shadow-premium relative overflow-hidden">
              <div className="flex-1 space-y-4">
                 <div className="flex items-center gap-3 text-accent text-[8px] font-black uppercase tracking-[0.4em] italic leading-none mb-2">
                    <Calendar size={12} />
                    {new Date(exp.startDate).getFullYear()} — {exp.isCurrent ? "PRESENT" : new Date(exp.endDate).getFullYear()}
                 </div>
                 <h3 className="text-xl font-black text-white uppercase italic tracking-tighter leading-none">{exp.role}</h3>
                 <p className="text-white/20 font-black uppercase tracking-[0.2em] text-[10px] italic">{exp.company} • {exp.location}</p>
                 <p className="text-[13px] text-white/40 max-w-2xl leading-relaxed italic line-clamp-2 uppercase tracking-tight leading-relaxed">{exp.description}</p>
              </div>
              
              <div className="flex items-center gap-2">
                 <button 
                   onClick={() => startEdit(exp)}
                   className="w-10 h-10 flex items-center justify-center bg-bg-canvas text-white/20 hover:text-secondary hover:bg-secondary/10 transition-all rounded-xl border border-white/5"
                   title="Edit Record"
                 >
                   <Edit2 size={16} />
                 </button>
                 <button 
                   onClick={() => handleDelete(exp._id)}
                   className="w-10 h-10 flex items-center justify-center bg-bg-canvas text-white/20 hover:text-red-500 hover:bg-red-500/10 transition-all rounded-xl border border-white/5"
                   title="Purge Record"
                 >
                   <Trash2 size={16} />
                 </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-24 border-2 border-dashed border-white/5 rounded-[3rem] text-center text-white/5 uppercase tracking-[0.6em] font-black text-[9px] italic animate-pulse">
            No professional experience indexed.
          </div>
        )}
      </div>
    </div>
  );
};

export default Experience;
