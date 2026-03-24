import { useState } from "react";
import ProjectForm from "@/features/projects/ProjectForm";
import useProjects from "@/features/projects/useProjects";
import { Loader2, Trash2, ExternalLink, Edit2, X, Plus, Search } from "lucide-react";
import Button from "@/components/ui/Button";

const Projects = () => {
  const {
    projects,
    loading,
    error,
    removeProject,
    addProject,
    modifyProject,
  } = useProjects();

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
    if (window.confirm("Delete this project?")) {
      removeProject(id);
    }
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  if (loading && projects.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-white/60">
        <Loader2 className="animate-spin mr-2" />
        Loading projects...
      </div>
    );
  }

  return (
    <div className="pb-10">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold">Projects</h1>
          <p className="text-sm text-white/50">
            Manage your projects
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">

          {/* SEARCH */}
          <div className="relative w-full md:w-60">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
            />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-bg-canvas border border-white/10 text-sm outline-none focus:border-primary"
            />
          </div>

          {/* BUTTON */}
          <Button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2"
          >
            {showForm ? <X size={16} /> : <Plus size={16} />}
            {showForm ? "Close" : "Add"}
          </Button>
        </div>
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
              {editingProject ? "Edit Project" : "Add Project"}
            </h2>
            <button onClick={closeForm}>
              <X size={18} />
            </button>
          </div>

          <ProjectForm
            onSubmit={handleAddProject}
            initialData={editingProject || {}}
          />
        </div>
      )}

      {/* GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((p) => (
            <div
              key={p._id}
              className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col"
            >

              {/* TOP */}
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs text-white/50">
                  {p.category}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(p)}
                    className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-lg hover:bg-white/5 transition"
                  >
                    <Edit2 size={14} />
                  </button>

                  <button
                    onClick={() => handleDelete(p._id)}
                    className="w-8 h-8 flex items-center justify-center border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/10 transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* BODY */}
              <h3 className="font-semibold text-lg mb-2">
                {p.title}
              </h3>

              <p className="text-sm text-white/60 line-clamp-2 flex-1">
                {p.description}
              </p>

              {/* FOOTER */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-primary">
                  {p.results || "Live"}
                </span>

                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-primary"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>

            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16 text-white/50">
            No projects found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;