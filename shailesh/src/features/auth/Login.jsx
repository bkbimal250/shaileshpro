import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { sendOTP, verifyOTP } from "./authService";
import useAuthStore from "@/store/authStore";
import { ShieldCheck, Zap, Mail, KeyRound, ArrowRight } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: Send OTP, 2: Verify OTP
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await sendOTP(email);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const userData = await verifyOTP({ email, otp });
      setUser(userData); 
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-canvas p-6 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-secondary/10 blur-[120px] rounded-full animate-pulse delay-700" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-3xl flex items-center justify-center text-primary mx-auto mb-6 shadow-3xl shadow-primary/10 transform -rotate-6">
                <ShieldCheck size={32} />
            </div>
            <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none mb-3">Core Access</h1>
            <div className="flex items-center justify-center gap-3">
               <Zap size={10} className="text-secondary animate-pulse" />
               <p className="text-white/20 text-[10px] font-black italic tracking-[0.4em] uppercase leading-none">Strategic Command Center</p>
            </div>
        </div>

        <div className="bg-bg-white border border-white/5 p-10 rounded-[3rem] shadow-premium relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />
          
          <div className="mb-8">
            <h2 className="text-xs font-black text-white/40 uppercase tracking-[0.4em] italic mb-2">
              {step === 1 ? "Identity Verification" : "Security Intercept"}
            </h2>
            <p className="text-white/20 text-[9px] font-black italic tracking-widest leading-relaxed uppercase">
                {step === 1 
                  ? "Initialize neural link with your registered workspace credentials." 
                  : "Enter the tactical 6-digit intercept code sent to your comms."}
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-[9px] font-black uppercase tracking-widest italic mb-8 animate-pulse text-center">
              SYSTEM ALERT: {error}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleSendOTP} className="space-y-8 text-left">
              <Input 
                name="email" 
                label="Comms Route (Email)" 
                placeholder="ADMIN@SHAILESH.COM"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
              <Button type="submit" loading={loading} className="w-full h-14 rounded-2xl group/btn" variant="primary">
                 <span className="flex items-center gap-3">
                   INITIALIZE LINK <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                 </span>
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-8 text-left">
              <Input 
                name="otp" 
                label="Intercept Code" 
                placeholder="6-DIGIT CODE"
                value={otp}
                onChange={(e) => setOtp(e.target.value)} 
                required
              />
              <div className="space-y-4">
                <Button type="submit" loading={loading} className="w-full h-14 rounded-2xl group/btn" variant="secondary">
                   <span className="flex items-center gap-3">
                     ESTABLISH SESSION <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                   </span>
                </Button>
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-white/20 text-[9px] font-black uppercase tracking-[0.3em] italic hover:text-primary transition-colors text-center py-2"
                >
                  WRONG ROUTE? RE-INITIALIZE
                </button>
              </div>
            </form>
          )}
        </div>
        
        <div className="mt-12 text-center">
           <div className="text-[8px] font-black text-white/10 uppercase tracking-[0.6em] italic leading-none">Secure Administration Protocol V2.4.0</div>
        </div>
      </div>
    </div>
  );
};

export default Login;