import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Plus, X, Globe, TrendingUp, ImageIcon, MessageSquare } from "lucide-react";

const platforms = ["Instagram", "LinkedIn", "Facebook", "YouTube", "Twitter", "TikTok"];

const SocialForm = ({ onSubmit, initialData = {} }) => {
  const [form, setForm] = useState({
    platform: initialData.platform || "Instagram",
    handle: initialData.handle || "",
    profileUrl: initialData.profileUrl || "",
    logo: initialData.logo || "",
    followers: initialData.followers || 0,
    growth: initialData.growth || "",
    engagementRate: initialData.engagementRate || "",
    niche: initialData.niche || "",
    managed: initialData.managed !== undefined ? initialData.managed : true,
    isFeatured: initialData.isFeatured || false,
    order: initialData.order || 0,
    highlights: initialData.highlights || [],
    topPosts: initialData.topPosts || [],
    campaignTypes: initialData.campaignTypes ? initialData.campaignTypes.join(", ") : "",
    toolsUsed: initialData.toolsUsed ? initialData.toolsUsed.join(", ") : "",
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
      campaignTypes: form.campaignTypes.split(",").map(t => t.trim()).filter(t => t !== ""),
      toolsUsed: form.toolsUsed.split(",").map(t => t.trim()).filter(t => t !== ""),
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6 pb-6 border-b border-white/5">
        <div className="flex flex-col gap-1 w-full text-[10px] font-black uppercase text-white/30 tracking-[0.2em]">
          <label>Social Platform</label>
          <select 
            name="platform" 
            value={form.platform} 
            onChange={handleChange}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-secondary text-sm"
          >
            {platforms.map(p => <option key={p} value={p} className="bg-dark">{p}</option>)}
          </select>
        </div>
        <Input label="Handle / Username" name="handle" value={form.handle} onChange={handleChange} required placeholder="@brandname" />
      </div>

      <div className="grid md:grid-cols-2 gap-6 pt-6 border-b border-white/5 pb-6">
        <Input label="External Profile URL" name="profileUrl" value={form.profileUrl} onChange={handleChange} placeholder="https://..." />
        <Input label="Brand/Profile Logo (optional URL)" name="logo" value={form.logo} onChange={handleChange} placeholder="https://..." />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Input type="number" label="Total Followers" name="followers" value={form.followers} onChange={handleChange} />
        <Input label="Niche" name="niche" value={form.niche} onChange={handleChange} placeholder="Spa / Tech / Fitness" />
        <Input type="number" label="Display Order" name="order" value={form.order} onChange={handleChange} />
      </div>

      <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-white/5">
        <Input label="Growth Performance" name="growth" value={form.growth} onChange={handleChange} placeholder="e.g. +10K in 3mo" />
        <Input label="Interaction Rate (%)" name="engagementRate" value={form.engagementRate} onChange={handleChange} placeholder="e.g. 5.2%" />
      </div>

      {/* Dynamic Highlights */}
      <div className="space-y-4 pt-6 mt-6 border-t border-white/5 bg-white/[0.01] p-6 rounded-[2rem]">
        <div className="flex justify-between items-center">
           <label className="text-[10px] font-black text-white/30 uppercase tracking-widest flex items-center gap-2"><TrendingUp size={14} /> Key Brand Stats</label>
           <button type="button" onClick={() => addItem('highlights', { label: '', value: '' })} className="text-secondary hover:text-white transition-colors"><Plus size={18} /></button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
           {form.highlights.map((h, idx) => (
             <div key={idx} className="flex gap-2 items-center group bg-white/5 p-4 rounded-xl">
               <div className="flex-1 flex flex-col gap-2">
                  <input placeholder="Reach/Impressions" value={h.label} onChange={(e) => updateItem('highlights', idx, 'label', e.target.value)} className="w-full bg-transparent border-b border-white/10 text-[10px] font-black uppercase text-white/50" />
                  <input placeholder="Value (e.g. 1.2M/mo)" value={h.value} onChange={(e) => updateItem('highlights', idx, 'value', e.target.value)} className="w-full bg-transparent text-sm font-bold text-white" />
               </div>
               <button type="button" onClick={() => removeItem('highlights', idx)} className="text-white/20 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><X size={16} /></button>
             </div>
           ))}
        </div>
      </div>

      <Input label="Campaign Types (comma separated)" name="campaignTypes" value={form.campaignTypes} onChange={handleChange} placeholder="Reels, Paid Ads, Influencer Content" />
      <Input label="Tools Used (comma separated)" name="toolsUsed" value={form.toolsUsed} onChange={handleChange} placeholder="Meta Ads, Canva, Buffer" />

      {/* Top Posts */}
      <div className="space-y-4 pt-6 border-t border-white/5 bg-accent/5 p-6 rounded-[2rem]">
        <div className="flex justify-between items-center">
           <label className="text-[10px] font-black text-white/30 uppercase tracking-widest flex items-center gap-2"><ImageIcon size={14} /> Viral Content Gallery</label>
           <button type="button" onClick={() => addItem('topPosts', { image: '', link: '', description: '' })} className="text-accent hover:text-white transition-colors"><Plus size={18} /></button>
        </div>
        <div className="space-y-4">
           {form.topPosts.map((p, idx) => (
             <div key={idx} className="bg-white/5 p-6 rounded-2xl relative group grid md:grid-cols-12 gap-6">
                <div className="md:col-span-4 flex flex-col gap-2">
                   <Input placeholder="Image URL" value={p.image} onChange={(e) => updateItem('topPosts', idx, 'image', e.target.value)} className="text-xs" />
                </div>
                <div className="md:col-span-8 flex flex-col gap-2">
                   <Input placeholder="Post External Link" value={p.link} onChange={(e) => updateItem('topPosts', idx, 'link', e.target.value)} className="text-xs" />
                   <textarea placeholder="Description" value={p.description} onChange={(e) => updateItem('topPosts', idx, 'description', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white" />
                </div>
                <button type="button" onClick={() => removeItem('topPosts', idx)} className="absolute top-4 right-4 text-white/20 hover:text-red-500 transition-all"><X size={16} /></button>
             </div>
           ))}
        </div>
      </div>

      <div className="flex items-center gap-10 pt-6">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} className="w-5 h-5 bg-white/5 border-white/10 text-secondary accent-secondary" />
          <span className="text-[10px] font-black uppercase text-white/50 tracking-widest group-hover:text-secondary transition-colors">Showcase Brand</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer group">
          <input type="checkbox" name="managed" checked={form.managed} onChange={handleChange} className="w-5 h-5 bg-white/5 border-white/10 text-secondary accent-secondary" />
          <span className="text-[10px] font-black uppercase text-white/50 tracking-widest group-hover:text-secondary transition-colors">Managed Campaign</span>
        </label>
      </div>

      <div className="flex justify-end pt-8 mt-8 border-t border-white/10">
        <Button type="submit" className="px-14 h-16 rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-secondary/20 transition-all hover:-translate-y-1">
           Index Social Brand
        </Button>
      </div>
    </form>
  );
};

export default SocialForm;
