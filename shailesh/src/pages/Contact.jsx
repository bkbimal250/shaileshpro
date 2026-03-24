import { useState } from "react";
import axios from "@/lib/axios";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Section from "@/components/common/Section";
import Container from "@/components/common/Container";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2 } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/messages", formData);
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-bg-canvas text-white min-h-screen">
      <Navbar />

      {/* HEADER */}
      <Section className="pt-24 pb-12 border-b border-white/10">
        <Container>
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold">
              Contact Me
            </h1>

            <p className="text-white/60 mt-4">
              Have a project or idea? Let’s talk and build something great.
            </p>
          </div>
        </Container>
      </Section>

      {/* CONTENT */}
      <Section className="py-16">
        <Container>
          <div className="grid md:grid-cols-2 gap-12">

            {/* LEFT INFO */}
            <div className="space-y-6">

              <div className="flex items-center gap-4">
                <Mail className="text-primary" />
                <div>
                  <p className="text-sm text-white/40">Email</p>
                  <p>shaileshpatel012000@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Phone className="text-primary" />
                <div>
                  <p className="text-sm text-white/40">Phone</p>
                  <p>+91 9136872792</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <MapPin className="text-primary" />
                <div>
                  <p className="text-sm text-white/40">Location</p>
                  <p>India</p>
                </div>
              </div>

            </div>

            {/* FORM */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">

              {success ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="text-primary mx-auto mb-4" size={40} />
                  <h2 className="text-xl font-semibold">
                    Message sent successfully
                  </h2>
                  <p className="text-white/60 mt-2">
                    I’ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">

                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full p-3 rounded-lg bg-bg-canvas border border-white/10 outline-none focus:border-primary"
                  />

                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full p-3 rounded-lg bg-bg-canvas border border-white/10 outline-none focus:border-primary"
                  />

                  <input
                    type="text"
                    placeholder="Phone (optional)"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full p-3 rounded-lg bg-bg-canvas border border-white/10 outline-none focus:border-primary"
                  />

                  <textarea
                    rows={5}
                    required
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full p-3 rounded-lg bg-bg-canvas border border-white/10 outline-none focus:border-primary resize-none"
                  />

                  <button
                    disabled={loading}
                    className="w-full bg-primary py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={18} />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send size={16} />
                      </>
                    )}
                  </button>

                </form>
              )}
            </div>

          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="py-20 border-t border-white/10">
        <Container>
          <div className="bg-primary rounded-2xl p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold">
              Let’s build something amazing 🚀
            </h2>

            <p className="text-white/80 mt-2">
              I’m available for freelance & projects.
            </p>
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  );
};

export default Contact;