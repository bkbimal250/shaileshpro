import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import axios from "@/lib/axios";
import { CheckCircle2, AlertCircle } from "lucide-react";

const MessageForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await axios.post("/messages", form);
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  if (status === "success") {
    return (
      <div className="bg-success/10 border border-success/20 p-8 rounded-3xl text-center space-y-4">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center text-success mx-auto">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-xl font-bold text-white">Message Sent!</h3>
        <p className="text-text-secondary">Thank you for reaching out. I'll get back to you shortly.</p>
        <Button onClick={() => setStatus(null)} variant="secondary" className="mt-4">Send another message</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {status === "error" && (
        <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-red-500 text-sm flex items-center gap-2">
          <AlertCircle size={16} /> Something went wrong. Please try again.
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        <Input name="name" label="Full Name" placeholder="John Doe" value={form.name} onChange={handleChange} required />
        <Input name="email" label="Email Address" type="email" placeholder="john@company.com" value={form.email} onChange={handleChange} required />
      </div>

      <Input name="phone" label="Phone Number (Optional)" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-white/50">How can I help you?</label>
        <textarea
          name="message"
          rows="5"
          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
          placeholder="Tell me about your project or goals..."
          value={form.message}
          onChange={handleChange}
          required
        />
      </div>

      <Button type="submit" loading={loading} className="py-4 text-lg">Send Professional Inquiry</Button>
    </form>
  );
};

export default MessageForm;