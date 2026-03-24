import { useState, useEffect, useCallback } from "react";
import { getAbout, updateAbout } from "./aboutService";

const useAbout = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAbout = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAbout();
      setAbout(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAbout();
  }, [fetchAbout]);

  const saveAbout = async (data) => {
    try {
      const updated = await updateAbout(data);
      setAbout(updated);
    } catch (err) {
      setError("Failed to update profile");
    }
  };

  return { about, loading, error, saveAbout, refresh: fetchAbout };
};

export default useAbout;
