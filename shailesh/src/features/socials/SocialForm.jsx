import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Plus, X } from "lucide-react";

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
    isPersonal: initialData.isPersonal || false,
    isFeatured: initialData.isFeatured || false,
    isActive: initialData.isActive !== undefined ? initialData.isActive : true,
    order: initialData.order || 0,
    highlights: initialData.highlights || [],
    topPosts: initialData.topPosts || [],
    campaignTypes: initialData.campaignTypes
      ? initialData.campaignTypes.join(", ")
      : "",
    toolsUsed: initialData.toolsUsed
      ? initialData.toolsUsed.join(", ")
      : "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addItem = () => {
    setForm({
      ...form,
      highlights: [...form.highlights, { label: "", value: "" }],
    });
  };

  const removeItem = (idx) => {
    setForm({
      ...form,
      highlights: form.highlights.filter((_, i) => i !== idx),
    });
  };

  const updateItem = (idx, field, val) => {
    const list = [...form.highlights];
    list[idx][field] = val;
    setForm({ ...form, highlights: list });
  };

  // TOP POSTS
  const addPost = () => {
    setForm({
      ...form,
      topPosts: [...form.topPosts, { image: "", link: "", description: "" }],
    });
  };

  const removePost = (idx) => {
    setForm({
      ...form,
      topPosts: form.topPosts.filter((_, i) => i !== idx),
    });
  };

  const updatePost = (idx, field, val) => {
    const list = [...form.topPosts];
    list[idx][field] = val;
    setForm({ ...form, topPosts: list });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...form,
      campaignTypes: form.campaignTypes
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      toolsUsed: form.toolsUsed
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* BASIC */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-white/50 mb-1 block">
            Platform
          </label>
          <select
            name="platform"
            value={form.platform}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-bg-canvas border border-white/10 text-sm outline-none"
          >
            {platforms.map((p) => (
              <option key={p} value={p} className="bg-bg-canvas">
                {p}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Handle"
          name="handle"
          value={form.handle}
          onChange={handleChange}
          placeholder="@username"
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Profile URL"
          name="profileUrl"
          value={form.profileUrl}
          onChange={handleChange}
        />

        <Input
          label="Logo URL"
          name="logo"
          value={form.logo}
          onChange={handleChange}
        />
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-4">
        <Input
          type="number"
          label="Followers"
          name="followers"
          value={form.followers}
          onChange={handleChange}
        />

        <Input
          label="Niche"
          name="niche"
          value={form.niche}
          onChange={handleChange}
        />

        <Input
          type="number"
          label="Order"
          name="order"
          value={form.order}
          onChange={handleChange}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Growth"
          name="growth"
          value={form.growth}
          onChange={handleChange}
        />

        <Input
          label="Engagement Rate"
          name="engagementRate"
          value={form.engagementRate}
          onChange={handleChange}
        />
      </div>

      {/* HIGHLIGHTS */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">Highlights</h3>
          <button type="button" onClick={addItem}>
            <Plus size={16} />
          </button>
        </div>

        {form.highlights.map((h, idx) => (
          <div key={idx} className="flex gap-2">
            <input
              placeholder="Label"
              value={h.label}
              onChange={(e) => updateItem(idx, "label", e.target.value)}
              className="flex-1 p-2 rounded bg-bg-canvas border border-white/10 text-sm"
            />
            <input
              placeholder="Value"
              value={h.value}
              onChange={(e) => updateItem(idx, "value", e.target.value)}
              className="flex-1 p-2 rounded bg-bg-canvas border border-white/10 text-sm"
            />
            <button type="button" onClick={() => removeItem(idx)}>
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* EXTRA */}
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Campaign Types (comma separated)"
          name="campaignTypes"
          value={form.campaignTypes}
          onChange={handleChange}
        />

        <Input
          label="Tools Used (comma separated)"
          name="toolsUsed"
          value={form.toolsUsed}
          onChange={handleChange}
        />
      </div>

      {/* TOP POSTS */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">Top Posts (Previews)</h3>
          <button type="button" onClick={addPost}>
            <Plus size={16} />
          </button>
        </div>

        {form.topPosts.map((post, idx) => (
          <div key={idx} className="space-y-2 border-b border-white/5 pb-4 last:border-0">
            <div className="flex gap-2">
              <input
                placeholder="Image URL"
                value={post.image}
                onChange={(e) => updatePost(idx, "image", e.target.value)}
                className="flex-1 p-2 rounded bg-bg-canvas border border-white/10 text-sm"
              />
              <input
                placeholder="Post Link"
                value={post.link}
                onChange={(e) => updatePost(idx, "link", e.target.value)}
                className="flex-1 p-2 rounded bg-bg-canvas border border-white/10 text-sm"
              />
              <button type="button" onClick={() => removePost(idx)}>
                <X size={14} />
              </button>
            </div>
            <input
              placeholder="Description (short)"
              value={post.description}
              onChange={(e) => updatePost(idx, "description", e.target.value)}
              className="w-full p-2 rounded bg-bg-canvas border border-white/10 text-sm"
            />
          </div>
        ))}
      </div>

      {/* OPTIONS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <label className="flex items-center gap-2 text-sm text-white/70">
          <input
            type="checkbox"
            name="isFeatured"
            checked={form.isFeatured}
            onChange={handleChange}
            className="accent-primary"
          />
          Featured
        </label>

        <label className="flex items-center gap-2 text-sm text-white/70">
          <input
            type="checkbox"
            name="managed"
            checked={form.managed}
            onChange={handleChange}
            className="accent-primary"
          />
          Managed
        </label>

        <label className="flex items-center gap-2 text-sm text-white/70">
          <input
            type="checkbox"
            name="isPersonal"
            checked={form.isPersonal}
            onChange={handleChange}
            className="accent-primary"
          />
          Personal
        </label>

        <label className="flex items-center gap-2 text-sm text-white/70">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
            className="accent-primary"
          />
          Active
        </label>
      </div>

      {/* SUBMIT */}
      <div className="flex justify-end pt-4">
        <Button type="submit">
          Save Social
        </Button>
      </div>

    </form>
  );
};

export default SocialForm;