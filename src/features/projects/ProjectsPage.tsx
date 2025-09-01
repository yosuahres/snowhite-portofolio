import { useState } from "react";

const projects = [
  {
    name: "sharlee",
    type: "Branding",
    image: "/images/sharlee.jpg",
  },
  {
    name: "act responsable",
    type: "Web Development",
    image: "/images/act-responsable.jpg",
  },
  {
    name: "dua lipa",
    type: "Portrait",
    image: "/images/dua-lipa.jpg",
  },
  {
    name: "cocolyze",
    type: "UX/UI Design",
    image: "/images/cocolyze.jpg",
  },
  {
    name: "les indécis",
    type: "Branding",
    image: "/images/les-indecis.jpg",
  },
  {
    name: "game of the goose",
    type: "Game Design",
    image: "/images/game-of-the-goose.jpg",
  },
  {
    name: "l'équipe explore",
    type: "Illustration",
    image: "/images/lequipe-explore.jpg",
  },
  {
    name: "silhouette",
    type: "Portrait",
    image: "/images/silhouette.jpg",
  },
  {
    name: "portraits",
    type: "Portrait",
    image: "/images/portraits.jpg",
  },
];

export default function ProjectsPage() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="min-h-screen w-full flex items-end justify-start bg-[#23242a] text-white font-sans relative pb-10 pl-10">
      {/* Side by side: image and table */}
      <div className="flex flex-row items-end gap-24">
        {/* Image preview */}
        <div className="w-[600px] h-[600px] flex items-end justify-start">
          {hovered !== null && (
            <img
              src={projects[hovered].image}
              alt={projects[hovered].name}
              className="object-contain w-full h-full transition-opacity duration-300 opacity-100"
              style={{ pointerEvents: "none" }}
            />
          )}
        </div>
        {/* Table */}
  <div className="flex flex-col items-start justify-end min-h-[600px] w-[700px] max-w-[900px] ml-24">
          <div className="flex items-center w-full mb-2">
            <h2 className="text-5xl font-bold tracking-tight mr-4">WORK</h2>
            <span className="text-lg text-gray-400 font-mono">{projects.length}</span>
          </div>
          <div className="w-full border-t border-gray-500/30">
            {projects.map((project, i) => (
              <div
                key={project.name}
                className="flex items-center justify-between py-3 border-b border-gray-500/30 cursor-pointer group"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <span className="text-2xl font-medium group-hover:tracking-widest transition-all duration-200 flex items-center">
                  {hovered === i && (
                    <span className="mr-2 text-lg">→</span>
                  )}
                  {project.name}
                </span>
                <span className="text-base text-gray-400 group-hover:text-white transition-colors duration-200">
                  {project.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
