import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { sendOTP, verifyOTP, login } from "./authService";
import useAuthStore from "@/store/authStore";
import { Mail, Key, ArrowRight } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [authMode, setAuthMode] = useState("password");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const userData = await login({ email, password });
      setUser(userData);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await sendOTP(email);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
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
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-canvas px-6">

      <div className="w-full max-w-md">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold">
            Admin Login
          </h1>
          <p className="text-white/50 text-sm mt-2">
            Access your dashboard
          </p>
        </div>

        {/* CARD */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

          {/* MODE SWITCH */}
          <div className="flex bg-bg-canvas border border-white/10 rounded-lg p-1 mb-6">
            <button
              onClick={() => {
                setAuthMode("password");
                setStep(1);
              }}
              className={`flex-1 py-2 text-sm rounded-md ${authMode === "password"
                ? "bg-primary text-white"
                : "text-white/50"
                }`}
            >
              Password
            </button>

            <button
              onClick={() => {
                setAuthMode("otp");
                setStep(1);
              }}
              className={`flex-1 py-2 text-sm rounded-md ${authMode === "otp"
                ? "bg-primary text-white"
                : "text-white/50"
                }`}
            >
              OTP
            </button>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
              {error}
            </div>
          )}

          {/* PASSWORD LOGIN */}
          {authMode === "password" ? (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <Input
                name="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail size={14} />}
                required
              />

              <Input
                type="password"
                name="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Key size={14} />}
                required
              />

              <Button type="submit" loading={loading} className="w-full">
                Login <ArrowRight size={16} className="ml-2" />
              </Button>
            </form>
          ) : (
            <>
              {step === 1 ? (
                <form onSubmit={handleSendOTP} className="space-y-4">
                  <Input
                    name="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={<Mail size={14} />}
                    required
                  />

                  <Button type="submit" loading={loading} className="w-full">
                    Send OTP
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <Input
                    name="otp"
                    label="OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />

                  <Button type="submit" loading={loading} className="w-full">
                    Verify OTP
                  </Button>

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-sm text-primary w-full"
                  >
                    Resend OTP
                  </button>
                </form>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default Login;