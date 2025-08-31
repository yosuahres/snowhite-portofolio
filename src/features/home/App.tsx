function App() {
  return (
    <div className="bg-[#222] text-white font-sans flex justify-center items-center h-screen m-0">
      <div className="text-center">
        <header className="flex justify-between p-8 absolute top-0 left-0 right-0">
          <div className="text-4xl font-bold">Sk</div>
          <nav className="flex items-center">
            <span className="ml-4">FR</span>
            <span className="ml-4">☀️</span>
            <span className="ml-4">...</span>
          </nav>
        </header>
        <main className="flex flex-col justify-center items-center">
          <h1 className="text-5xl m-0 leading-tight">
            HEY, I'M YOSUA HARES
            <br />
            BUT YOU CAN CALL ME YOSUA
          </h1>
          <p className="text-xl my-4">
            I'm a robotic, and AI enthusiast based in Indonesia.
          </p>
          <div className="links">
            <a href="#" className="text-white no-underline mx-4">
              → see my projects
            </a>
            <a href="#" className="text-white no-underline mx-4">
              → more about me
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
