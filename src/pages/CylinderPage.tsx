import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Cyl from "../components/Cyl";

const CylinderPage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-white text-xl font-bold mt-8">Cylinder</h1>
      <p className="text-white/80 text-sm">
        Move your mouse to rotate and tilt the cylinder
      </p>
      <Canvas flat camera={{ fov: 40 }}>
        <OrbitControls />
        <ambientLight />
        <Cyl />
      </Canvas>
    </div>
  );
};

export default CylinderPage;
