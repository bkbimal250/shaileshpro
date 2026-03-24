import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Plus, X, BarChart3, Globe } from "lucide-react";

const employmentTypes = ["Full-time", "Part-time", "Freelance", "Contract", "Internship"];

const ExperienceForm = ({ onSubmit, initialData = {} }) => {
  const [form, setForm] = useState({
    company: initialData.company || "",
    role: initialData.role || "",
    employmentType: initialData.employmentType || "Full-time",
    location: initialData.location || "Remote",
    startDate: initialData.startDate ? new Date(initialData.startDate).toISOString().split('T')[0] : "",
    endDate: initialData.endDate ? new Date(initialData.endDate).toISOString().split('T')[0] : "",
    isCurrent: initialData.isCurrent || false,
    description: initialData.description || "",
    achievements: initialData.achievements ? initialData.achievements.join("\n") : "",
    tools: initialData.tools ? initialData.tools.join(", ") : "",
    companyLogo: initialData.companyLogo || "",
    order: initialData.order || 0,
    metrics: initialData.metrics || [],
    projectLinks: initialData.projectLinks || [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addItem = (type, defaultVal) => {
    setForm({ ...form, [type]: [...form[type], defaultVal] });
  };

  const removeItem = (type, idx) => {
    setForm({ ...form, [type]: form[type].filter((_, i) => i !== idx) });
  };

  const updateItem = (type, idx, field, val) => {
    const list = [...form[type]];
    list[idx][field] = val;
    setForm({ ...form, [type]: list });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...form,
      achievements: form.achievements.split("\n").map(a => a.trim()).filter(a => a !== ""),
      tools: form.tools.split(",").map(t => t.trim()).filter(t => t !== ""),
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Input name="company" label="Company Brand" value={form.company} onChange={handleChange} required />
        <Input name="role" label="Your Role" value={form.role} onChange={handleChange} required />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1 w-full text-[10px] font-black uppercase text-white/30 tracking-widest">
          <label>Employment Type</label>
          <select 
            name="employmentType" 
            value={form.employmentType} 
            onChange={handleChange}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-secondary text-sm"
          >
            {employmentTypes.map(t => <option key={t} value={t} className="bg-dark">{t}</option>)}
          </select>
        </div>
        <Input name="location" label="Location" value={form.location} onChange={handleChange} placeholder="e.g. Remote / Mumbai" />
      </div>

      <div className="grid md:grid-cols-2 gap-6 pt-4">
        <Input name="startDate" type="date" label="Start Date" value={form.startDate} onChange={handleChange} required />
        {!form.isCurrent && (
          <Input name="endDate" type="date" label="End Date" value={form.endDate} onChange={handleChange} />
        )}
      </div>

      <div className="flex items-center gap-6 pb-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            name="isCurrent" 
            id="isCurrent" 
            checked={form.isCurrent} 
            onChange={handleChange}
            className="w-4 h-4 accent-secondary"
          />
          <label htmlFor="isCurrent" className="text-[10px] font-black uppercase text-white/50 tracking-widest">Ongoing Role</label>
        </div>
        <Input type="number" label="Order" name="order" value={form.order} onChange={handleChange} className="w-24" />
      </div>

      <Input name="companyLogo" label="Company Logo (URL)" value={form.companyLogo} onChange={handleChange} placeholder="https://..." />

      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Role description</label>
        <textarea
          name="description"
          rows="3"
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-secondary/50 text-sm"
          value={form.description}
          onChange={handleChange}
          placeholder="What was your main focus?"
        />
      </div>

      {/* Dynamic Metrics */}
      <div className="space-y-4 pt-4 border-t border-white/5">
        <div className="flex justify-between items-center">
           <label className="text-[10px] font-black text-white/30 uppercase tracking-widest flex items-center gap-2"><BarChart3 size={14} /> Performance Metrics</label>
           <button type="button" onClick={() => addItem('metrics', { label: '', value: '' })} className="text-secondary hover:text-white transition-colors"><Plus size={18} /></button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
           {form.metrics.map((m, idx) => (
             <div key={idx} className="flex gap-2 items-center group bg-white/[0.03] p-3 rounded-xl">
               <div className="flex-1 space-y-2">
                  <input placeholder="Label (e.g. ROI)" value={m.label} onChange={(e) => updateItem('metrics', idx, 'label', e.target.value)} className="w-full bg-transparent border-b border-white/10 text-[10px] uppercase font-black tracking-widest text-white/50" />
                  <input placeholder="Value (e.g. +300%)" value={m.value} onChange={(e) => updateItem('metrics', idx, 'value', e.target.value)} className="w-full bg-transparent text-sm font-black text-secondary" />
               </div>
               <button type="button" onClick={() => removeItem('metrics', idx)} className="text-white/20 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><X size={16} /></button>
             </div>
           ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5 pt-4 border-t border-white/5">
        <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Achievements (One per line)</label>
        <textarea
          name="achievements"
          rows="4"
          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-secondary/50 text-sm italic"
          value={form.achievements}
          onChange={handleChange}
          placeholder="- Scaled Instagram reach by 300%&#10;- Managed $50k ad spend with 5x ROAS"
        />
      </div>

      <Input name="tools" label="Tools Used (comma separated)" value={form.tools} onChange={handleChange} placeholder="Facebook Ads, SEMrush, Canva" />

      {/* Project Links */}
      <div className="space-y-4 pt-4 border-t border-white/5">
        <div className="flex justify-between items-center">
           <label className="text-[10px] font-black text-white/30 uppercase tracking-widest flex items-center gap-2"><Globe size={14} /> Relevant Project Links</label>
           <button type="button" onClick={() => addItem('projectLinks', { title: '', url: '' })} className="text-secondary hover:text-white transition-colors"><Plus size={18} /></button>
        </div>
        <div className="grid grid-cols-1 gap-2">
           {form.projectLinks.map((l, idx) => (
             <div key={idx} className="flex gap-4 items-center group bg-white/5 p-4 rounded-xl">
               <input placeholder="Project Title" value={l.title} onChange={(e) => updateItem('projectLinks', idx, 'title', e.target.value)} className="flex-1 bg-transparent border-b border-white/10 text-xs text-white" />
               <input placeholder="Link URL" value={l.url} onChange={(e) => updateItem('projectLinks', idx, 'url', e.target.value)} className="flex-1 bg-transparent border-b border-white/10 text-xs text-secondary italic" />
               <button type="button" onClick={() => removeItem('projectLinks', idx)} className="text-white/20 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><X size={16} /></button>
             </div>
           ))}
        </div>
      </div>

      <div className="flex justify-end pt-8 border-t border-white/5">
        <Button type="submit" className="px-10 h-14 rounded-2xl text-[10px] font-black uppercase tracking-widest">Synch Work Record</Button>
      </div>
    </form>
  );
};

export default ExperienceForm;
