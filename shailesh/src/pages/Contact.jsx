import { useState } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Section from "@/components/common/Section";
import Container from "@/components/common/Container";
import FadeIn from "@/components/animations/FadeIn";
import SlideUp from "@/components/animations/SlideUp";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, MessageSquare } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "", phone: "" });
    }, 2000);
  };

  const contactInfo = [
    { icon: <Mail className="text-primary" />, label: "Email", value: "hello@shailesh.pro", href: "mailto:hello@shailesh.pro" },
    { icon: <Phone className="text-secondary" />, label: "Phone", value: "+91 91100 XXXX", href: "tel:+9191100XXXXX" },
    { icon: <MapPin className="text-accent" />, label: "Location", value: "Bengaluru, India", href: "#" },
  ];

  return (
    <div className="bg-bg-canvas min-h-screen text-text-primary">
      <Navbar />

      <Section className="pt-32 pb-24 md:pt-48 md:pb-56 relative overflow-hidden">
        {/* Ambient Effects */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] -z-10 rounded-full animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 blur-[120px] -z-10 rounded-full" />

        <Container>
          <div className="grid lg:grid-cols-12 gap-16 md:gap-24 items-start relative z-10 max-w-6xl mx-auto">

            {/* Content Side */}
            <div className="lg:col-span-5 space-y-16">
              <FadeIn>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-[1px] bg-primary" />
                  <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em] block italic">Get in Touch</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8 uppercase italic tracking-tighter">
                  LET'S <br /><span className="text-primary text-stroke-primary">TALK.</span>
                </h1>
                <p className="text-text-secondary text-lg md:text-xl font-bold uppercase italic border-l-4 border-primary pl-6 py-2 max-w-md">
                   Ready to design your next high-performance growth engine.
                </p>
              </FadeIn>

              <div className="space-y-6">
                {contactInfo.map((info, idx) => (
                  <SlideUp key={idx} delay={idx * 0.1}>
                    <a href={info.href} className="group flex items-center gap-6 p-6 bg-bg-white border border-white/5 hover:border-primary/20 rounded-3xl transition-all hover:-translate-y-1 shadow-premium">
                      <div className="w-12 h-12 bg-bg-canvas rounded-xl flex items-center justify-center border border-white/5 group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] mb-1 italic leading-none">{info.label}</div>
                        <div className="text-base md:text-xl font-black text-text-primary italic tracking-tight uppercase leading-none">{info.value}</div>
                      </div>
                    </a>
                  </SlideUp>
                ))}
              </div>
            </div>

            {/* Form Side */}
            <div className="lg:col-span-7">
              <FadeIn delay={0.3}>
                <div className="bg-bg-white border border-white/5 p-8 md:p-14 rounded-[3.5rem] shadow-premium relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-3xl opacity-50" />
                  
                  {isSuccess ? (
                    <div className="py-20 text-center space-y-10 animate-in fade-in zoom-in-95">
                      <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-3xl shadow-primary/20">
                        <CheckCircle2 size={48} className="text-white" />
                      </div>
                      <div className="space-y-4">
                        <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Message Received.</h2>
                        <p className="text-text-secondary text-base font-bold uppercase italic max-w-sm mx-auto">I'll get back to you within 24 hours.</p>
                      </div>
                      <button onClick={() => setIsSuccess(false)} className="text-primary text-[10px] font-black uppercase tracking-[0.4em] hover:underline italic">Send Another Message</button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                      <div className="border-b border-white/5 pb-6 mb-8 flex items-center gap-4">
                        <MessageSquare size={20} className="text-secondary" />
                        <div>
                           <h3 className="text-xl font-black text-white uppercase italic tracking-tighter leading-none mb-1">Project Inquiry</h3>
                           <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] italic leading-none">Typical response time: &lt;24hrs</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-3 group">
                          <label className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em] italic ml-4 leading-none group-focus-within:text-primary transition-colors">Identity</label>
                          <input
                            required
                            type="text"
                            placeholder="YOUR NAME"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-bg-canvas border border-white/5 text-text-primary p-6 rounded-2xl outline-none focus:border-primary/40 transition-all font-black placeholder:text-white/5 uppercase tracking-widest italic text-xs shadow-inner-light"
                          />
                        </div>
                        <div className="space-y-3 group">
                          <label className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em] italic ml-4 leading-none group-focus-within:text-secondary transition-colors">Email Address</label>
                          <input
                            required
                            type="email"
                            placeholder="YOUR@EMAIL.COM"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-bg-canvas border border-white/5 text-text-primary p-6 rounded-2xl outline-none focus:border-secondary/40 transition-all font-black placeholder:text-white/5 uppercase tracking-widest italic text-xs shadow-inner-light"
                          />
                        </div>
                      </div>

                      <div className="space-y-3 group">
                        <label className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em] italic ml-4 leading-none group-focus-within:text-accent transition-colors">Project Brief</label>
                        <textarea
                          required
                          rows={6}
                          placeholder="OUTLINE YOUR GROWTH OBJECTIVES..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-bg-canvas border border-white/5 text-text-primary p-8 rounded-3xl outline-none focus:border-accent/40 transition-all font-black placeholder:text-white/5 uppercase tracking-widest italic text-xs resize-none shadow-inner-light"
                        />
                      </div>

                      <button
                        disabled={isSubmitting}
                        className="w-full bg-primary text-white py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:scale-105 active:scale-95 transition-all shadow-3xl shadow-primary/20 flex items-center justify-center gap-4 group disabled:opacity-50 italic relative overflow-hidden"
                      >
                        {isSubmitting ? (
                          <><Loader2 className="animate-spin" size={18} /> PROCESSING...</>
                        ) : (
                          <>
                            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            <span>SEND TRANSMISSION</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </Section>

      <Footer />
    </div>
  );
};

export default Contact;