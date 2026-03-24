import { useState, useEffect } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { CheckCircle2, Save, Plus, X } from "lucide-react";

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
                isAvailableForWork:
                    initialData.isAvailableForWork !== undefined
                        ? initialData.isAvailableForWork
                        : true,
                highlights: initialData.highlights || [],
                socialLinks: initialData.socialLinks || [],
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
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
        <form onSubmit={handleSubmit} className="space-y-6">

            {/* SAVE */}
            <div className="flex justify-end">
                <Button type="submit" loading={saving}>
                    <Save size={16} className="mr-2" />
                    Save
                </Button>
            </div>

            {success && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-sm text-green-400 flex items-center gap-2">
                    <CheckCircle2 size={16} /> Saved successfully
                </div>
            )}

            <div className="grid lg:grid-cols-3 gap-6">

                {/* LEFT */}
                <div className="lg:col-span-2 space-y-6">

                    {/* BASIC */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                        <h2 className="font-medium">Basic Info</h2>

                        <div className="grid md:grid-cols-2 gap-4">
                            <Input label="Name" name="name" value={form.name} onChange={handleChange} />
                            <Input label="Email" name="email" value={form.email} onChange={handleChange} />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />
                            <Input label="Location" name="location" value={form.location} onChange={handleChange} />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <Input label="Resume URL" name="resumeUrl" value={form.resumeUrl} onChange={handleChange} />
                            <Input type="number" label="Experience (years)" name="experienceYears" value={form.experienceYears} onChange={handleChange} />
                        </div>

                        <Input label="Profile Image URL" name="profileImage" value={form.profileImage} onChange={handleChange} />

                        <label className="flex items-center gap-2 text-sm text-white/70">
                            <input
                                type="checkbox"
                                name="isAvailableForWork"
                                checked={form.isAvailableForWork}
                                onChange={handleChange}
                                className="accent-primary"
                            />
                            Available for work
                        </label>
                    </div>

                    {/* CONTENT */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                        <h2 className="font-medium">Content</h2>

                        <div className="grid md:grid-cols-2 gap-4">
                            <Input label="Tagline" name="tagline" value={form.tagline} onChange={handleChange} />
                            <Input label="Title" name="title" value={form.title} onChange={handleChange} />
                        </div>

                        <textarea
                            name="bio"
                            rows={2}
                            placeholder="Short bio"
                            className="w-full p-3 rounded-lg bg-bg-canvas border border-white/10 text-sm outline-none"
                            value={form.bio}
                            onChange={handleChange}
                        />

                        <textarea
                            name="longBio"
                            rows={4}
                            placeholder="Detailed bio"
                            className="w-full p-3 rounded-lg bg-bg-canvas border border-white/10 text-sm outline-none"
                            value={form.longBio}
                            onChange={handleChange}
                        />
                    </div>

                </div>

                {/* RIGHT */}
                <div className="space-y-6">

                    {/* SKILLS */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-3">
                        <h2 className="font-medium">Skills & Tools</h2>

                        <textarea
                            name="skills"
                            rows={2}
                            placeholder="Skills (comma separated)"
                            className="w-full p-3 rounded-lg bg-bg-canvas border border-white/10 text-sm"
                            value={form.skills}
                            onChange={handleChange}
                        />

                        <textarea
                            name="tools"
                            rows={2}
                            placeholder="Tools (comma separated)"
                            className="w-full p-3 rounded-lg bg-bg-canvas border border-white/10 text-sm"
                            value={form.tools}
                            onChange={handleChange}
                        />
                    </div>

                    {/* HIGHLIGHTS */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="font-medium">Highlights</h2>
                            <button
                                type="button"
                                onClick={() =>
                                    addArrayItem("highlights", { label: "", value: "" })
                                }
                            >
                                <Plus size={16} />
                            </button>
                        </div>

                        <div className="space-y-2">
                            {form.highlights.map((h, i) => (
                                <div key={i} className="flex gap-2">
                                    <input
                                        className="flex-1 p-2 rounded bg-bg-canvas border border-white/10 text-sm"
                                        placeholder="Value"
                                        value={h.value}
                                        onChange={(e) =>
                                            handleArrayChange("highlights", i, "value", e.target.value)
                                        }
                                    />
                                    <input
                                        className="w-24 p-2 rounded bg-bg-canvas border border-white/10 text-sm"
                                        placeholder="Label"
                                        value={h.label}
                                        onChange={(e) =>
                                            handleArrayChange("highlights", i, "label", e.target.value)
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem("highlights", i)}
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SOCIAL LINKS */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="font-medium">Social Links</h2>
                            <button
                                type="button"
                                onClick={() =>
                                    addArrayItem("socialLinks", { platform: "", url: "" })
                                }
                            >
                                <Plus size={16} />
                            </button>
                        </div>

                        <div className="space-y-2">
                            {form.socialLinks.map((s, i) => (
                                <div key={i} className="flex gap-2">
                                    <input
                                        className="w-24 p-2 rounded bg-bg-canvas border border-white/10 text-sm"
                                        placeholder="Platform"
                                        value={s.platform}
                                        onChange={(e) =>
                                            handleArrayChange("socialLinks", i, "platform", e.target.value)
                                        }
                                    />
                                    <input
                                        className="flex-1 p-2 rounded bg-bg-canvas border border-white/10 text-sm"
                                        placeholder="URL"
                                        value={s.url}
                                        onChange={(e) =>
                                            handleArrayChange("socialLinks", i, "url", e.target.value)
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeArrayItem("socialLinks", i)}
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </form>
    );
};

export default AboutForm;