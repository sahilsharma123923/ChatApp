import Sidebar from "../components/Sidebar";
import Chatwindow from '../components/Chatwindow';

const HomePage = () => {
  const handleLogout = () => {
    // e.g. await api.post("/auth/logout"); navigate("/login");
    console.log("logout clicked");
  };

  return (
    <div className="relative min-h-screen w-full bg-[#1C1C1C] overflow-hidden flex items-center justify-center p-4">

      {/* ambient glow, black and white only */}
      <div className="absolute w-96 h-96 rounded-full bg-white opacity-[0.06] blur-[130px] -top-24 -left-24" />
      <div className="absolute w-80 h-80 rounded-full bg-white opacity-[0.05] blur-[130px] -bottom-20 -right-16" />

      <div
        className="relative w-full max-w-5xl h-[85vh] rounded-2xl overflow-hidden flex"
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.14)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        }}
      >
        <Sidebar
          currentUser={{ name: "You", avatarUrl: "" }}
          onLogout={handleLogout}
        />

        <Chatwindow onLogout={handleLogout} />
      </div>
    </div>
  );
};

export default HomePage;
