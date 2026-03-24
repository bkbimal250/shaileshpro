import { useState } from "react";
import ProjectForm from "@/features/projects/ProjectForm";
import useProjects from "@/features/projects/useProjects";
import { Loader2, Trash2, ExternalLink, Edit2, X, Plus, Search, Briefcase, Zap, Target } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const Projects = () => {
  const { projects, loading, error, removeProject, addProject, modifyProject } = useProjects();
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [search, setSearch] = useState("");

  const handleAddProject = async (data) => {
    if (editingProject) {
      await modifyProject(editingProject._id, data);
    } else {
      await addProject(data);
    }
    closeForm();
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  const startEdit = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      removeProject(id);
    }
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  if (loading && projects.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-white/50">
        <Loader2 className="animate-spin mr-2 text-primary" /> Synchronizing Project Vault...
      </div>
    );
  }

  return (
    <div className="pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 pb-8 border-b border-white/5">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <Briefcase size={14} className="text-secondary" />
             <h2 className="text-[10px] font-black uppercase text-white/20 tracking-[0.4em] leading-none mb-1 italic">Asset Inventory</h2>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white italic uppercase tracking-tighter leading-none">Project Vault</h1>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
           <div className="relative w-full sm:w-72">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/10" size={16} />
              <input 
                type="text" 
                placeholder="FIND RECORD..." 
                className="w-full bg-bg-canvas border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-white font-black uppercase tracking-widest text-[9px] focus:outline-none focus:border-primary/40 transition-all italic shadow-inner-light placeholder:text-white/10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
           </div>
           <Button onClick={() => setShowForm(!showForm)} className="h-12 w-full sm:w-16 rounded-xl flex-shrink-0">
             {showForm ? <X size={20} /> : <Plus size={20} />}
           </Button>
        </div>
      </div>

      {error && (
        <div className="p-6 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl mb-10 text-[9px] font-black uppercase tracking-[0.4em] italic shadow-sm animate-pulse">
          Critical Sync Error: {error}
        </div>
      )}

      {showForm && (
        <div className="max-w-4xl mb-16 bg-bg-white p-8 md:p-12 rounded-[3.5rem] border border-white/5 shadow-premium animate-in fade-in zoom-in-95 duration-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
          <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-8">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-bg-canvas rounded-xl flex items-center justify-center text-primary shadow-inner-light">
                   <Target size={18} />
                </div>
                <h2 className="text-[10px] font-black text-white uppercase tracking-[0.4em] italic leading-none">{editingProject ? "Update Strategic Data" : "Initialize New Operation"}</h2>
             </div>
             <button onClick={closeForm} className="text-white/20 hover:text-primary transition-colors hover:scale-110 active:scale-90"><X size={20} /></button>
          </div>
          <ProjectForm onSubmit={handleAddProject} initialData={editingProject || {}} />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((p) => (
            <div key={p._id} className="bg-bg-white border border-white/5 p-8 rounded-[3rem] flex flex-col group hover:border-primary/30 transition-all shadow-premium relative overflow-hidden h-full">
              <div className="flex items-start justify-between mb-8">
                 <div className="w-16 h-16 bg-bg-canvas rounded-2xl flex items-center justify-center border border-white/5 group-hover:scale-105 group-hover:bg-primary/5 transition-all overflow-hidden shadow-inner-light">
                   {p.image ? (
                     <img src={p.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                   ) : (
                     <Briefcase size={28} className="text-white/5" />
                   )}
                 </div>
                 <div className="flex gap-2">
                    <button onClick={() => startEdit(p)} className="w-10 h-10 flex items-center justify-center bg-bg-canvas text-white/20 hover:text-primary hover:border-primary/20 rounded-xl transition-all border border-white/5 shadow-sm active:scale-90"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(p._id)} className="w-10 h-10 flex items-center justify-center bg-bg-canvas text-white/20 hover:text-red-500 hover:border-red-100 rounded-xl transition-all border border-white/5 shadow-sm active:scale-90"><Trash2 size={16} /></button>
                 </div>
              </div>

              <div className="flex-1">
                 <div className="flex items-center gap-3 mb-4">
                    <span className="px-4 py-1.5 bg-bg-canvas text-[8px] font-black text-primary border border-white/5 rounded-full uppercase tracking-[0.2em] italic leading-none transition-colors">{p.category || "Execution Node"}</span>
                    {p.featured && <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-xl" />}
                 </div>
                 <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none mb-4 group-hover:text-primary transition-colors">{p.title}</h3>
                 <p className="text-white/40 text-xs italic font-bold leading-relaxed line-clamp-2 mb-8 uppercase tracking-tight">{p.description}</p>
              </div>

              <div className="flex items-center justify-between pt-8 border-t border-white/5 mt-auto">
                 <div className="flex items-center gap-2">
                    <Zap size={12} className="text-accent" />
                    <div className="text-[9px] font-black text-accent uppercase tracking-[0.3em] italic leading-none">{p.results?.toUpperCase() || "LIVE OPS"}</div>
                 </div>
                 {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-white/10 hover:text-primary transition-colors hover:scale-110 active:scale-90">
                       <ExternalLink size={20} />
                    </a>
                 )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-32 text-center border-2 border-dashed border-white/5 rounded-[4rem] text-white/10 italic text-[10px] font-black uppercase tracking-[0.6em] animate-pulse">
            NO RECORDS INDEXED.
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;