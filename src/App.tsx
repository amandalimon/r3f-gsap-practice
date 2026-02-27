import { Routes, Route, NavLink } from "react-router";
import MacPage from "./pages/MacPage";
import CylinderPage from "./pages/CylinderPage";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm ${isActive ? "text-amber-400 font-semibold" : "text-white hover:text-amber-200"}`;

const App = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <nav className="flex gap-4 p-4 justify-center text-sm">
        <NavLink to="/" end className={navLinkClass}>
          Mac
        </NavLink>
        <NavLink to="/cylinder" className={navLinkClass}>
          Cylinder
        </NavLink>
      </nav>
      <main className="flex-1 min-h-0">
        <Routes>
          <Route path="/" element={<MacPage />} />
          <Route path="/cylinder" element={<CylinderPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
