import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ScrollControls } from "@react-three/drei";
import { useState } from "react";
import MacContainer from "../components/MacContainer";

const DESKTOP_OPTIONS = [
  "desktop1.webp",
  "desktop2.webp",
  "desktop3.webp",
] as const;

const base = import.meta.env.BASE_URL;

const MacPage = () => {
  const [desktopIndex, setDesktopIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relativew-full h-full flex flex-col items-center justify-center gap-4">
      {loaded && (
        <div className="absolute">
          <h1 className="text-white text-xl font-bold mt-8">
            Scroll to open the lid :)
          </h1>
          <p className="text-white/80 text-sm">
            Click and drag to orbit around the scene
          </p>
        </div>
      )}

      <Canvas camera={{ fov: 20, position: [0, -2, 120] }}>
        <OrbitControls enableZoom={false} />

        <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/exr/4k/wooden_studio_09_4k.exr" />

        <ScrollControls pages={3}>
          <MacContainer
            desktopIndex={desktopIndex}
            desktopOptions={DESKTOP_OPTIONS}
            onLoaded={() => setLoaded(true)}
          />
        </ScrollControls>
      </Canvas>

      {loaded && (
        <div className="flex gap-4">
          {DESKTOP_OPTIONS.map((filename, i) => {
            const url = `${base}${filename}`;
            return (
              <button
                key={filename}
                type="button"
                onClick={() => setDesktopIndex(i)}
                className={`cursor-pointer rounded overflow-hidden border-2 transition-colors ${
                  desktopIndex === i
                    ? "border-amber-400"
                    : "border-transparent hover:border-white/50"
                }`}
              >
                <img
                  src={url}
                  alt={filename}
                  width={200}
                  height={200}
                  className="object-cover block"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MacPage;
