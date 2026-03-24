import { useState } from "react";
import ExperienceForm from "@/features/experience/ExperienceForm";
import useExperience from "@/features/experience/useExperience";
import { Loader2, Trash2, Calendar, Edit2, X, Plus } from "lucide-react";
import Button from "@/components/ui/Button";

const Experience = () => {
  const {
    experiences,
    loading,
    error,
    removeExperience,
    addExperience,
    modifyExperience,
  } = useExperience();

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
    if (window.confirm("Delete this experience?")) {
      removeExperience(id);
    }
  };

  if (loading && experiences.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-white/60">
        <Loader2 className="animate-spin mr-2" />
        Loading...
      </div>
    );
  }

  return (
    <div className="pb-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Experience</h1>
          <p className="text-sm text-white/50">
            Manage your work history
          </p>
        </div>

        <Button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2"
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? "Close" : "Add Experience"}
        </Button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
          {error}
        </div>
      )}

      {/* FORM */}
      {showForm && (
        <div className="mb-8 bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium">
              {editingExp ? "Edit Experience" : "Add Experience"}
            </h2>
            <button onClick={closeForm}>
              <X size={18} />
            </button>
          </div>

          <ExperienceForm
            onSubmit={handleAddExperience}
            initialData={editingExp || {}}
          />
        </div>
      )}

      {/* LIST */}
      <div className="space-y-4">
        {experiences.length > 0 ? (
          experiences.map((exp) => (
            <div
              key={exp._id}
              className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col md:flex-row justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 text-sm text-white/50">
                  <Calendar size={14} />
                  {new Date(exp.startDate).getFullYear()} -{" "}
                  {exp.isCurrent
                    ? "Present"
                    : new Date(exp.endDate).getFullYear()}
                </div>

                <h3 className="font-semibold text-lg">
                  {exp.role}
                </h3>

                <p className="text-sm text-white/60">
                  {exp.company} • {exp.location}
                </p>

                <p className="text-sm text-white/50 line-clamp-2">
                  {exp.description}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(exp)}
                  className="w-9 h-9 flex items-center justify-center border border-white/10 rounded-lg hover:bg-white/5 transition"
                >
                  <Edit2 size={14} />
                </button>

                <button
                  onClick={() => handleDelete(exp._id)}
                  className="w-9 h-9 flex items-center justify-center border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/10 transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 text-white/50">
            No experience added yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Experience;