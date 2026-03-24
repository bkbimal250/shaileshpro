import { useState, useEffect, useCallback } from "react";
import { getProjects, deleteProject, createProject, updateProject } from "./projectService";

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const removeProject = async (id) => {
    try {
      await deleteProject(id);
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      setError("Failed to delete project");
    }
  };

  const addProject = async (data) => {
    try {
      const newProject = await createProject(data);
      setProjects([newProject, ...projects]);
    } catch (err) {
      setError("Failed to create project");
    }
  };

  const modifyProject = async (id, data) => {
    try {
      const updated = await updateProject(id, data);
      setProjects(projects.map((p) => (p._id === id ? updated : p)));
    } catch (err) {
      setError("Failed to update project");
    }
  };

  return { projects, loading, error, removeProject, addProject, modifyProject, refresh: fetchProjects };
};

export default useProjects;