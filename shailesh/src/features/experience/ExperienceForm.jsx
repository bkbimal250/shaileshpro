import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Plus, X } from "lucide-react";

const employmentTypes = ["Full-time", "Part-time", "Freelance", "Contract", "Internship"];

const ExperienceForm = ({ onSubmit, initialData = {} }) => {
  const [form, setForm] = useState({
    company: initialData.company || "",
    role: initialData.role || "",
    employmentType: initialData.employmentType || "Full-time",
    location: initialData.location || "Remote",
    startDate: initialData.startDate
      ? new Date(initialData.startDate).toISOString().split("T")[0]
      : "",
    endDate: initialData.endDate
      ? new Date(initialData.endDate).toISOString().split("T")[0]
      : "",
    isCurrent: initialData.isCurrent || false,
    description: initialData.description || "",
    achievements: initialData.achievements
      ? initialData.achievements.join("\n")
      : "",
    tools: initialData.tools ? initialData.tools.join(", ") : "",
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
    setForm({
      ...form,
      [type]: form[type].filter((_, i) => i !== idx),
    });
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
      achievements: form.achievements
        .split("\n")
        .map((a) => a.trim())
        .filter(Boolean),
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
        <Input name="company" label="Company" value={form.company} onChange={handleChange} required />
        <Input name="role" label="Role" value={form.role} onChange={handleChange} required />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-white/50 mb-1 block">Employment Type</label>
          <select
            name="employmentType"
            value={form.employmentType}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-bg-canvas border border-white/10 text-sm outline-none"
          >
            {employmentTypes.map((t) => (
              <option key={t} value={t} className="bg-bg-canvas">
                {t}
              </option>
            ))}
          </select>
        </div>

        <Input name="location" label="Location" value={form.location} onChange={handleChange} />
      </div>

      {/* DATES */}
      <div className="grid md:grid-cols-2 gap-4">
        <Input name="startDate" type="date" label="Start Date" value={form.startDate} onChange={handleChange} required />
        {!form.isCurrent && (
          <Input name="endDate" type="date" label="End Date" value={form.endDate} onChange={handleChange} />
        )}
      </div>

      <label className="flex items-center gap-2 text-sm text-white/70">
        <input
          type="checkbox"
          name="isCurrent"
          checked={form.isCurrent}
          onChange={handleChange}
          className="accent-primary"
        />
        Currently working here
      </label>

      {/* DESCRIPTION */}
      <div>
        <label className="text-sm text-white/50 mb-1 block">Description</label>
        <textarea
          name="description"
          rows={3}
          className="w-full p-3 rounded-lg bg-bg-canvas border border-white/10 text-sm outline-none"
          value={form.description}
          onChange={handleChange}
        />
      </div>

      {/* METRICS */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">Metrics</h3>
          <button type="button" onClick={() => addItem("metrics", { label: "", value: "" })}>
            <Plus size={16} />
          </button>
        </div>

        {form.metrics.map((m, idx) => (
          <div key={idx} className="flex gap-2">
            <input
              placeholder="Label"
              value={m.label}
              onChange={(e) => updateItem("metrics", idx, "label", e.target.value)}
              className="flex-1 p-2 rounded bg-bg-canvas border border-white/10 text-sm"
            />
            <input
              placeholder="Value"
              value={m.value}
              onChange={(e) => updateItem("metrics", idx, "value", e.target.value)}
              className="flex-1 p-2 rounded bg-bg-canvas border border-white/10 text-sm"
            />
            <button type="button" onClick={() => removeItem("metrics", idx)}>
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* ACHIEVEMENTS */}
      <div>
        <label className="text-sm text-white/50 mb-1 block">
          Achievements (one per line)
        </label>
        <textarea
          name="achievements"
          rows={3}
          className="w-full p-3 rounded-lg bg-bg-canvas border border-white/10 text-sm outline-none"
          value={form.achievements}
          onChange={handleChange}
        />
      </div>

      {/* TOOLS */}
      <Input
        name="tools"
        label="Tools (comma separated)"
        value={form.tools}
        onChange={handleChange}
      />

      {/* LINKS */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium">Project Links</h3>
          <button type="button" onClick={() => addItem("projectLinks", { title: "", url: "" })}>
            <Plus size={16} />
          </button>
        </div>

        {form.projectLinks.map((l, idx) => (
          <div key={idx} className="flex gap-2">
            <input
              placeholder="Title"
              value={l.title}
              onChange={(e) => updateItem("projectLinks", idx, "title", e.target.value)}
              className="flex-1 p-2 rounded bg-bg-canvas border border-white/10 text-sm"
            />
            <input
              placeholder="URL"
              value={l.url}
              onChange={(e) => updateItem("projectLinks", idx, "url", e.target.value)}
              className="flex-1 p-2 rounded bg-bg-canvas border border-white/10 text-sm"
            />
            <button type="button" onClick={() => removeItem("projectLinks", idx)}>
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* SUBMIT */}
      <div className="flex justify-end pt-4">
        <Button type="submit">
          Save Experience
        </Button>
      </div>

    </form>
  );
};

export default ExperienceForm;