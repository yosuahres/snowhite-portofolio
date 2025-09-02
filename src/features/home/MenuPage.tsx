import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import GlossyBackground from "../../components/GlossyBackground";



export default function MenuPage() {
  // Removed activeIndex state, no longer needed
  const navigate = useNavigate();
  const menuOptions = [
    { label: "HOME", to: "/" },
    { label: "WORK", to: "/work" },
    { label: "ABOUT", to: "/about" },
    { label: "CONTACT", to: "/contact" },
  ];

  // We'll use a ref to the nav to get its position
  const navRef = useRef<HTMLDivElement>(null);

  return (
  <div className="bg-[#222] text-white min-h-screen w-screen h-screen flex flex-col justify-start items-stretch relative overflow-hidden pb-6">
      {/* Partial glossy background from main page with smooth blend */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none overflow-hidden">
        <div
          className="w-[400vw] h-full scale-110 transition-transform duration-700 relative"
          style={{
            transform: `translateY(-10%)`,
          }}
        >
          {/* Unique organic mask for glossy background */}
          <svg
            width="100vw"
            height="100vh"
            viewBox="0 0 1920 1080"
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              width: '100vw',
              height: '100vh',
              minWidth: 0,
              minHeight: 0,
              zIndex: 2,
              pointerEvents: 'none',
              filter: 'blur(0.5px)',
            }}
          >
            <defs>
              {/* Unique, abstract organic shape for the mask */}
              <clipPath id="menuGlossyMask">
                {/* Full-page, modern organic shape (fills from top to bottom) */}
                <path d="M0,100 Q400,0 900,120 Q1500,0 1920,100 Q1920,540 1800,800 Q1920,1080 1200,1080 Q900,1000 600,1080 Q0,1080 120,800 Q0,540 0,100 Z" />
              </clipPath>
              {/* Feathered radial gradient for smooth blending */}
              <radialGradient id="menuGlossyFeather" cx="50%" cy="55%" r="80%">
                <stop offset="60%" stopColor="#fff" stopOpacity="1" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0" />
              </radialGradient>
              <mask id="menuGlossyAlpha">
                <rect width="1920" height="1080" fill="url(#menuGlossyFeather)" />
              </mask>
            </defs>
          </svg>
          <div
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              width: '100vw',
              height: '100vh',
              minWidth: 0,
              minHeight: 0,
              zIndex: 1,
              WebkitClipPath: 'url(#menuGlossyMask)',
              clipPath: 'url(#menuGlossyMask)',
              WebkitMask: 'url(#menuGlossyAlpha)',
              mask: 'url(#menuGlossyAlpha)',
              pointerEvents: 'none',
              overflow: 'hidden',
            }}
          >
            <GlossyBackground />
          </div>
        </div>
        {/* Gradient fade to blend the bottom edge */}
        <div
          className="absolute left-0 right-0 bottom-0 h-24"
          style={{
            background: 'linear-gradient(to bottom, rgba(20,20,20,0) 0%, #181818 100%)',
            zIndex: 1,
          }}
        />
      </div>

      {/* Header - keep outside nav highlight wrapper so it stays on top */}
  <header
    className="absolute flex justify-between items-center z-10"
    style={{
      left: '50%',
      top: '5.5rem',
      transform: 'translateX(-50%)',
      width: '70vw',
      maxWidth: '1200px',
      padding: '0 2.5rem',
    }}
  >
        <div className="flex items-center gap-4 text-lg">
          {/* Using text as placeholder for logo */}
          <span className="font-bold text-2xl">Y.</span>
          <span>yosua/yosua hares</span>
        </div>
        <div className="flex items-center gap-6">
          <span>FR</span>
          {/* Placeholder for theme toggle icon */}
          <button type="button" className="text-2xl">
            ☼
          </button>
          <button
            type="button"
            className="text-4xl hover:rotate-90 transition-transform duration-300"
            aria-label="Close menu"
            onClick={() => navigate("/")}
          >
            &times;
          </button>
        </div>
      </header>

      {/* Animated curved blob background and menu options */}
      <div
        ref={navRef}
        className="flex-1 flex flex-col justify-center items-start w-full h-full relative gap-4"
  // onMouseLeave handler simplified, no activeIndex
      >
  {/* Blobs removed as requested */}
  <nav className="flex flex-col gap-4 text-7xl md:text-8xl font-bold tracking-tighter text-left z-10 relative px-16 md:px-32 lg:px-48">
          {menuOptions.map((opt, i) => (
            <Link
              key={opt.label}
              to={opt.to}
              className="hover:opacity-80 transition relative"
              // onMouseEnter/onMouseLeave handlers simplified, no activeIndex
              style={{ zIndex: 30 }}
            >
              <span className="text-2xl font-mono absolute left-[-3.5rem] top-1/2 -translate-y-1/2 opacity-60 select-none">
                0{i + 1}
              </span>
              {opt.label}
            </Link>
          ))}
        </nav>
        {/* Social links */}
  <div className="flex gap-8 text-lg z-10 px-16 md:px-32 lg:px-48">
          <a href="#" className="hover:opacity-80 transition inline-flex items-center gap-2">
            ↗ instagram
          </a>
          <a href="#" className="hover:opacity-80 transition inline-flex items-center gap-2">
            ↗ behance
          </a>
        </div>
      </div>
    </div>
  );
}
