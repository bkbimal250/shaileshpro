import { useState, useEffect, useCallback } from "react";
import { getExperiences, deleteExperience, createExperience, updateExperience } from "./experienceService";

const useExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExperiences = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getExperiences();
      setExperiences(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  const removeExperience = async (id) => {
    try {
      await deleteExperience(id);
      setExperiences(experiences.filter((e) => e._id !== id));
    } catch (err) {
      setError("Failed to delete experience");
    }
  };

  const addExperience = async (data) => {
    try {
      const newEntry = await createExperience(data);
      setExperiences([newEntry, ...experiences]);
    } catch (err) {
      setError("Failed to create experience");
    }
  };

  const modifyExperience = async (id, data) => {
    try {
      const updated = await updateExperience(id, data);
      setExperiences(experiences.map((e) => (e._id === id ? updated : e)));
    } catch (err) {
      setError("Failed to update experience");
    }
  };

  return { experiences, loading, error, removeExperience, addExperience, modifyExperience, refresh: fetchExperiences };
};

export default useExperience;
