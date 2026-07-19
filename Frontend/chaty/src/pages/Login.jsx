import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/login", formData);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#1C1C1C] overflow-hidden flex items-center justify-center px-4">

      {/* ambient glow, black and white only */}
      <div className="absolute w-80 h-80 rounded-full bg-white opacity-[0.08] blur-[110px] -top-20 -left-20" />
      <div className="absolute w-72 h-72 rounded-full bg-white opacity-[0.06] blur-[110px] -bottom-16 -right-10" />

      <div
        className="relative w-full max-w-md rounded-2xl p-8"
        style={{
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.16)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        }}
      >
        <div className="flex flex-col items-center text-center mb-6">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)" }}
          >
            <HiOutlineChatBubbleLeftRight className="text-white" size={18} />
          </div>
          <h1 className="text-2xl font-medium text-white">QuickChat</h1>
        </div>

        {error && (
          <div className="bg-red-500/10 text-red-300 border border-red-500/30 rounded-lg px-4 py-2 mb-5 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-white/75 text-xs mb-1.5">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full text-white rounded-lg px-4 py-2.5 text-sm outline-none placeholder:text-white/40 border transition-colors"
              style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.16)" }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.5)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.16)")}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-white/75 text-xs mb-1.5">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full text-white rounded-lg px-4 py-2.5 pr-11 text-sm outline-none placeholder:text-white/40 border transition-colors"
                style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.16)" }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.16)")}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/55 hover:text-white transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <FaRegEye size={16} />
                ) : (
                  <FaRegEyeSlash size={16} />
                )}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white hover:bg-white/90 transition text-black font-medium text-sm py-2.5 rounded-lg disabled:opacity-60 mt-1"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center text-white/55 text-xs mt-6">
          Don't have an account?{" "}
          <Link
            to="/"
            className="text-white font-medium hover:text-white/80"
          >
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
