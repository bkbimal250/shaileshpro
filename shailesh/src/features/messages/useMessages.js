import { useEffect, useState, useCallback } from "react";
import axios from "@/lib/axios";

const useMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await axios.get("/messages");
      setMessages(res.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const removeMessage = async (id) => {
    try {
      await axios.delete(`/messages/${id}`);
      setMessages((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
        console.error("Failed to delete message:", err.message);
    }
  };

  return { messages, loading, error, removeMessage, refresh: fetchMessages };
};

export default useMessages;