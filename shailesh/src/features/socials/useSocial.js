import { useState, useEffect, useCallback } from "react";
import { getSocials, createSocial, updateSocial, deleteSocial } from "./socialService";

const useSocial = () => {
  const [socials, setSocials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSocials = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getSocials();
      setSocials(data || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch social records.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSocials();
  }, [fetchSocials]);

  const addSocial = async (data) => {
    try {
      const newSocial = await createSocial(data);
      setSocials((prev) => [...prev, newSocial]);
      return newSocial;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create social record.");
      throw err;
    }
  };

  const modifySocial = async (id, data) => {
    try {
      const updated = await updateSocial(id, data);
      setSocials((prev) => prev.map((s) => (s._id === id ? updated : s)));
      return updated;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update social record.");
      throw err;
    }
  };

  const removeSocial = async (id) => {
    try {
      await deleteSocial(id);
      setSocials((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete social record.");
      throw err;
    }
  };

  return { socials, loading, error, addSocial, modifySocial, removeSocial, refresh: fetchSocials };
};

export default useSocial;
