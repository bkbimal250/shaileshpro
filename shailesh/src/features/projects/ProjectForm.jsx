import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Plus, X } from "lucide-react";

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
    setForm({
      ...form,
      gallery: form.gallery.filter((_, i) => i !== idx),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...form,
      tools: form.tools
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
        <Input
          label="Project Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <div>
          <label className="text-sm text-white/50 mb-1 block">
            Category
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-bg-canvas border border-white/10 text-sm outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c} className="bg-bg-canvas">
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="text-sm text-white/50 mb-1 block">
          Description
        </label>
        <textarea
          name="description"
          rows={3}
          className="w-full p-3 rounded-lg bg-bg-canvas border border-white/10 text-sm outline-none"
          value={form.description}
          onChange={handleChange}
          required
        />
      </div>

      {/* IMAGE + RESULT */}
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Image URL"
          name="image"
          value={form.image}
          onChange={handleChange}
        />

        <Input
          label="Result"
          name="results"
          value={form.results}
          onChange={handleChange}
        />
      </div>

      {/* GALLERY */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">Gallery</h3>
          <button type="button" onClick={addGalleryItem}>
            <Plus size={16} />
          </button>
        </div>

        {form.gallery.map((img, idx) => (
          <div key={idx} className="flex gap-2">
            <input
              placeholder="Image URL"
              value={img}
              onChange={(e) => handleGalleryChange(idx, e.target.value)}
              className="flex-1 p-2 rounded bg-bg-canvas border border-white/10 text-sm"
            />
            <button type="button" onClick={() => removeGalleryItem(idx)}>
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* LINKS */}
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Live URL"
          name="liveUrl"
          value={form.liveUrl}
          onChange={handleChange}
        />

        <Input
          label="GitHub URL"
          name="githubUrl"
          value={form.githubUrl}
          onChange={handleChange}
        />
      </div>

      {/* TOOLS */}
      <Input
        label="Tools (comma separated)"
        name="tools"
        value={form.tools}
        onChange={handleChange}
      />

      {/* OPTIONS */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-white/70">
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
            className="accent-primary"
          />
          Featured project
        </label>

        <div className="flex items-center gap-2">
          <label className="text-sm text-white/50">Order</label>
          <input
            type="number"
            name="order"
            value={form.order}
            onChange={handleChange}
            className="w-16 p-2 rounded bg-bg-canvas border border-white/10 text-sm"
          />
        </div>
      </div>

      {/* SUBMIT */}
      <div className="flex justify-end pt-4">
        <Button type="submit">
          Save Project
        </Button>
      </div>

    </form>
  );
};

export default ProjectForm;