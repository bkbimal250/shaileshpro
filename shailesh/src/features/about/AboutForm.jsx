import { useState, useEffect } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { CheckCircle2, Save, Plus, X, Zap, Target } from "lucide-react";

const AboutForm = ({ initialData, onSubmit, saving, success }) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        location: "",
        tagline: "",
        title: "",
        bio: "",
        longBio: "",
        profileImage: "",
        resumeUrl: "",
        skills: "",
        tools: "",
        experienceYears: 0,
        isAvailableForWork: true,
        highlights: [],
        socialLinks: [],
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                name: initialData.name || "",
                email: initialData.email || "",
                phone: initialData.phone || "",
                location: initialData.location || "",
                tagline: initialData.tagline || "",
                title: initialData.role || initialData.title || "",
                bio: initialData.bio || "",
                longBio: initialData.longBio || "",
                profileImage: initialData.profileImage || "",
                resumeUrl: initialData.resumeUrl || "",
                skills: initialData.skills ? initialData.skills.join(", ") : "",
                tools: initialData.tools ? initialData.tools.join(", ") : "",
                experienceYears: initialData.experienceYears || 0,
                isAvailableForWork: initialData.isAvailableForWork !== undefined ? initialData.isAvailableForWork : true,
                highlights: initialData.highlights || [],
                socialLinks: initialData.socialLinks || [],
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleArrayChange = (type, index, field, value) => {
        const newList = [...form[type]];
        newList[index][field] = value;
        setForm({ ...form, [type]: newList });
    };

    const addArrayItem = (type, defaultValue) => {
        setForm({ ...form, [type]: [...form[type], defaultValue] });
    };

    const removeArrayItem = (type, index) => {
        const newList = form[type].filter((_, i) => i !== index);
        setForm({ ...form, [type]: newList });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 bg-bg-white">
            <div className="flex justify-end mb-6">
                <Button type="submit" loading={saving} className="h-12 px-8 rounded-xl w-full md:w-auto text-[9px]">
                    <Save size={16} className="mr-2" /> DEPLOY UPDATE
                </Button>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-8">
                    <div className="bg-bg-white border border-white/5 p-8 md:p-10 rounded-[3rem] space-y-10 shadow-premium relative overflow-hidden text-left">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-3xl rounded-full" />
                        <div className="flex items-center gap-4 border-b border-white/5 pb-8">
                            <Zap size={14} className="text-primary" />
                            <h3 className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Identity Intel</h3>
                        </div>

                        {success && (
                            <div className="bg-primary/10 border border-primary/20 p-5 rounded-xl text-primary flex items-center gap-3 text-[9px] font-black uppercase tracking-widest italic animate-in slide-in-from-top-4">
                                <CheckCircle2 size={16} /> CORE NEURAL LINK SYNCHRONIZED.
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 gap-8">
                            <Input label="Public Designation" name="name" value={form.name} onChange={handleChange} placeholder="NAME" />
                            <Input label="Tactical Comms (Email)" name="email" value={form.email} onChange={handleChange} placeholder="EMAIL" />
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <Input label="Direct Voice (Phone)" name="phone" value={form.phone} onChange={handleChange} placeholder="PHONE" />
                            <Input label="Deployment Hub" name="location" value={form.location} onChange={handleChange} placeholder="LOCATION" />
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <Input label="Strategic Dossier (CV URL)" name="resumeUrl" value={form.resumeUrl} onChange={handleChange} placeholder="URL" />
                            <Input type="number" label="Operational Cycles (Years)" name="experienceYears" value={form.experienceYears} onChange={handleChange} />
                        </div>

                        <Input label="Identity Mask (Profile Image URL)" name="profileImage" value={form.profileImage} onChange={handleChange} placeholder="URL" />

                        <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                            <input type="checkbox" name="isAvailableForWork" id="isAvailableForWork" checked={form.isAvailableForWork} onChange={handleChange} className="w-5 h-5 rounded-lg accent-primary bg-bg-canvas border-white/10 cursor-pointer" />
                            <label htmlFor="isAvailableForWork" className="text-[9px] font-black uppercase text-white/20 tracking-[0.3em] cursor-pointer hover:text-primary transition-colors italic leading-none">Status: READY FOR DEPLOYMENT</label>
                        </div>
                    </div>

                    <div className="bg-bg-white border border-white/5 p-8 md:p-10 rounded-[3rem] space-y-10 shadow-premium relative overflow-hidden text-left">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 blur-[80px] rounded-full" />
                        <div className="flex items-center gap-4 border-b border-white/5 pb-8">
                            <Target size={14} className="text-secondary" />
                            <h3 className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Campaign Narrative</h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <Input label="Mission Tagline" name="tagline" value={form.tagline} onChange={handleChange} borderVariant="secondary" />
                            <Input label="Strategic Title" name="title" value={form.title} onChange={handleChange} />
                        </div>

                        <div className="space-y-4">
                            <label className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 italic ml-4 leading-none">Strategy Abstract (Short Bio)</label>
                            <textarea name="bio" rows="3" className="w-full bg-bg-canvas border border-white/5 rounded-2xl p-6 text-white text-sm italic font-bold leading-tight uppercase tracking-tight focus:border-primary/40 focus:bg-bg-white transition-all shadow-inner-light outline-none" value={form.bio} onChange={handleChange} />
                        </div>

                        <div className="space-y-4">
                            <label className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 italic ml-4 leading-none">Full Deployment Narrative</label>
                            <textarea name="longBio" rows="6" className="w-full bg-bg-canvas border border-white/5 rounded-[2rem] p-8 text-white/40 text-[13px] leading-relaxed italic font-medium focus:border-primary/40 focus:bg-bg-white transition-all shadow-inner-light outline-none" value={form.longBio} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-bg-white border border-white/5 p-8 rounded-[3rem] space-y-8 shadow-premium relative overflow-hidden text-left">
                        <div className="border-b border-white/5 pb-6">
                            <h3 className="text-white/40 text-[10px] font-black uppercase tracking-[0.5em] italic leading-none">Strategic Stack</h3>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 italic ml-2 leading-none">Operational Expertise</label>
                            <textarea name="skills" rows="3" className="w-full bg-bg-canvas border border-white/5 rounded-2xl p-4 text-white text-[11px] italic font-bold focus:border-primary/40 focus:bg-bg-white transition-all uppercase tracking-widest shadow-inner-light outline-none" value={form.skills} onChange={handleChange} placeholder="SEO, ADS..." />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 italic ml-2 leading-none">Execution Toolset</label>
                            <textarea name="tools" rows="3" className="w-full bg-bg-canvas border border-white/5 rounded-2xl p-4 text-secondary text-[11px] italic font-bold focus:border-secondary/40 focus:bg-bg-white transition-all uppercase tracking-widest shadow-inner-light outline-none" value={form.tools} onChange={handleChange} placeholder="CANVA, HUBSPOT..." />
                        </div>

                        <div className="p-6 bg-bg-canvas rounded-[2.5rem] border border-white/5 shadow-inner-light">
                            <div className="flex justify-between items-center mb-6 px-1">
                                <h4 className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] italic leading-none">Impact Metrics</h4>
                                <button type="button" onClick={() => addArrayItem('highlights', { label: '', value: '' })} className="text-primary hover:text-white transition-colors"><Plus size={16} /></button>
                            </div>
                            <div className="space-y-4">
                                {form.highlights.map((h, i) => (
                                    <div key={i} className="flex items-center justify-between group/h border-b border-white/5 pb-3">
                                        <input className="bg-transparent text-[10px] font-black text-white/60 italic uppercase tracking-tighter w-1/2 outline-none group-hover/h:text-primary transition-colors" value={h.value} onChange={(e) => handleArrayChange('highlights', i, 'value', e.target.value)} placeholder="VALUE" />
                                        <div className="flex items-center gap-2">
                                            <input className="bg-transparent text-[8px] font-black text-white/10 uppercase tracking-widest w-20 text-right outline-none" value={h.label} onChange={(e) => handleArrayChange('highlights', i, 'label', e.target.value)} placeholder="LABEL" />
                                            <button type="button" onClick={() => removeArrayItem('highlights', i)} className="text-white/5 hover:text-red-500 transition-colors"><X size={12} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 bg-primary/5 border border-primary/10 rounded-[2.5rem] shadow-premium">
                            <div className="flex justify-between items-center mb-6 px-1">
                                <h4 className="text-[9px] font-black text-primary uppercase tracking-[0.4em] italic leading-none">Social Signals</h4>
                                <button type="button" onClick={() => addArrayItem('socialLinks', { platform: '', url: '' })} className="text-secondary hover:text-white transition-colors"><Plus size={16} /></button>
                            </div>
                            <div className="space-y-3">
                                {form.socialLinks.map((s, i) => (
                                    <div key={i} className="bg-bg-canvas p-4 rounded-xl border border-white/5 flex items-center justify-between group/s relative">
                                        <div className="flex-1 overflow-hidden">
                                            <input className="bg-transparent text-[7px] font-black text-white/10 uppercase tracking-[0.2em] block mb-1 w-full outline-none" value={s.platform} onChange={(e) => handleArrayChange('socialLinks', i, 'platform', e.target.value)} placeholder="PLATFORM" />
                                            <input className="bg-transparent text-[9px] text-white/40 truncate w-full outline-none font-medium italic" value={s.url} onChange={(e) => handleArrayChange('socialLinks', i, 'url', e.target.value)} placeholder="LINK" />
                                        </div>
                                        <button type="button" onClick={() => removeArrayItem('socialLinks', i)} className="text-white/5 hover:text-red-500 transition-colors ml-2"><X size={12} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AboutForm;
