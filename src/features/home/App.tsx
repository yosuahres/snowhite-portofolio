


import { Link } from "react-router-dom";
import GlossyBackground from "../../components/GlossyBackground";

function App() {
  return (
    <>
      <GlossyBackground />
  <div className="text-white flex justify-center items-center h-screen m-0 bg-transparent">
        <div className="text-center">
          <header className="flex items-center justify-between p-8 absolute top-0 left-0 right-0 orbitron">
          <div className="flex items-center gap-4">
            <span className="font-bold text-2xl">Y.</span>
            <span>yosua/yosua hares</span>
          </div>
            <nav className="flex items-center">
              <Link to="/menu">
                <button
                  className="grid grid-cols-3 grid-rows-3 gap-1 w-8 h-8 p-0 bg-transparent border-none focus:outline-none hover:scale-110 transition-transform mr-4"
                  aria-label="Open menu"
                >
                  {[...Array(9)].map((_, i) => (
                    <span
                      key={i}
                      className="w-2 h-2 bg-transparent border-2 border-white rounded-full block"
                    ></span>
                  ))}
                </button>
              </Link>
            </nav>
          </header>
          <main className="flex flex-col justify-center items-center orbitron">
            <h1 className="text-5xl m-0 leading-tight">
              HEY, I'M YOSUA HARES
              <br />
              BUT YOU CAN CALL ME YOSUA
            </h1>
            <p className="text-xl my-4">
              I'm a robotic, and AI enthusiast based in Indonesia.
            </p>
            <div className="links flex gap-2 justify-center">
              <Link
                to="/projects"
                className="text-white no-underline mx-4 relative group"
              >
                → see my projects
                <span
                  className="block absolute left-0 -bottom-1 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  aria-hidden="true"
                />
              </Link>
              <Link
                to="/about"
                className="text-white no-underline mx-4 relative group"
              >
                → more about me
                <span
                  className="block absolute left-0 -bottom-1 w-full h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
