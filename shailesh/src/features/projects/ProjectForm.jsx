import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Plus, X, Image as ImageIcon } from "lucide-react";

const categories = ["Web", "Mobile", "Backend", "Marketing", "Design"];

const ProjectForm = ({ onSubmit, initialData = {} }) => {
  const [form, setForm] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    image: initialData.image || "",
    gallery: initialData.gallery || [],
    category: initialData.category || "Marketing",
    liveUrl: initialData.liveUrl || "",
    githubUrl: initialData.githubUrl || "",
    results: initialData.results || "",
    tools: initialData.tools ? initialData.tools.join(", ") : "",
    featured: initialData.featured || false,
    order: initialData.order || 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleGalleryChange = (idx, value) => {
    const newGallery = [...form.gallery];
    newGallery[idx] = value;
    setForm({ ...form, gallery: newGallery });
  };

  const addGalleryItem = () => {
    setForm({ ...form, gallery: [...form.gallery, ""] });
  };

  const removeGalleryItem = (idx) => {
    setForm({ ...form, gallery: form.gallery.filter((_, i) => i !== idx) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...form,
      tools: form.tools.split(",").map(t => t.trim()).filter(t => t !== ""),
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Input label="Project Title" name="title" value={form.title} onChange={handleChange} required />
        <div className="flex flex-col gap-3 w-full">
          <label className="text-[9px] font-black uppercase text-white/20 tracking-[0.3em] italic leading-none ml-4">Category</label>
          <select 
            name="category" 
            value={form.category} 
            onChange={handleChange}
            className="w-full bg-bg-canvas border border-white/5 rounded-2xl px-6 py-4 text-white font-black uppercase tracking-widest italic outline-none focus:border-primary/40 focus:bg-bg-white transition-all shadow-inner-light text-[10px]"
          >
            {categories.map(c => <option key={c} value={c} className="bg-bg-canvas">{c}</option>)}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-[9px] font-black uppercase text-white/20 tracking-[0.4em] italic leading-none ml-4">Deployment Summary</label>
        <textarea
          name="description"
          rows="3"
          className="w-full bg-bg-canvas border border-white/5 rounded-2xl p-6 text-white text-[10px] italic font-bold leading-tight uppercase tracking-tight focus:border-primary/40 focus:bg-bg-white transition-all shadow-inner-light"
          value={form.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Input label="Primary Image URL" name="image" value={form.image} onChange={handleChange} placeholder="https://..." />
        <Input label="Impact Metric (e.g. +300% ROI)" name="results" value={form.results} onChange={handleChange} />
      </div>

      <div className="space-y-4 pt-4 border-t border-white/5">
        <div className="flex justify-between items-center mb-2 px-4">
           <label className="text-[9px] font-black uppercase text-white/20 tracking-[0.4em] italic flex items-center gap-2"><ImageIcon size={14} /> Intelligence Assets</label>
           <button type="button" onClick={addGalleryItem} className="text-primary hover:text-white transition-colors"><Plus size={18} /></button>
        </div>
        <div className="grid grid-cols-1 gap-3">
           {form.gallery.map((img, idx) => (
             <div key={idx} className="flex gap-2 items-center group">
               <Input 
                 placeholder="Asset URL" 
                 value={img} 
                 onChange={(e) => handleGalleryChange(idx, e.target.value)} 
                 className="flex-1"
               />
               <button type="button" onClick={() => removeGalleryItem(idx)} className="text-white/20 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><X size={16} /></button>
             </div>
           ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-white/5 uppercase tracking-widest text-xs">
        <Input label="Live Node Access" name="liveUrl" value={form.liveUrl} onChange={handleChange} placeholder="https://..." />
        <Input label="Core Repository" name="githubUrl" value={form.githubUrl} onChange={handleChange} placeholder="https://..." />
      </div>

      <Input label="Strategic Toolset (comma separated)" name="tools" value={form.tools} onChange={handleChange} placeholder="Meta Ads, Google Analytics, SEO" />

      <div className="flex items-center gap-10">
        <div className="flex items-center gap-3 cursor-pointer group">
          <input 
            type="checkbox" 
            name="featured" 
            id="featured" 
            checked={form.featured} 
            onChange={handleChange}
            className="w-5 h-5 accent-primary bg-bg-canvas border-white/10 rounded-lg"
          />
          <label htmlFor="featured" className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 group-hover:text-primary transition-colors italic leading-none">Featured Strategic Node</label>
        </div>
        <div className="flex items-center gap-4">
           <label className="text-[9px] font-black uppercase text-white/20 tracking-[0.3em] italic leading-none">ORDER</label>
           <input type="number" name="order" value={form.order} onChange={handleChange} className="w-20 bg-bg-canvas border border-white/5 rounded-xl px-4 py-2 text-white font-black uppercase tracking-widest text-[10px] focus:border-primary/40 outline-none" />
        </div>
      </div>

      <div className="flex justify-end pt-8 border-t border-white/5">
        <Button type="submit" className="px-12 h-14 rounded-2xl">REGISTRY UPDATE</Button>
      </div>
    </form>
  );
};

export default ProjectForm;