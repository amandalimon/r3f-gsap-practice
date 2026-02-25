import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Cyl from "./components/Cyl";
import {
  Bloom,
  EffectComposer,
  ToneMapping,
} from "@react-three/postprocessing";

const App = () => {
  return (
    <>
      <Canvas flat camera={{ fov: 40 }}>
        <OrbitControls />
        <ambientLight />
        <Cyl />
        <EffectComposer>
          <Bloom
            mipmapBlur
            intensity={0.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.025}
          />
          <ToneMapping adaptative />
        </EffectComposer>
      </Canvas>
    </>
  );
};

export default App;
