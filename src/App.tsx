
import { Routes, Route } from 'react-router-dom';
import HomeApp from './features/home/App';
import MenuPage from './features/home/MenuPage';
import ProjectsPage from './features/projects/ProjectsPage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeApp />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/menu" element={<MenuPage />} />
      {/* other routes */}
    </Routes>
  );
}

export default App
