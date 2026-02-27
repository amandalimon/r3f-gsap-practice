import { useGLTF, useTexture, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";

type MacContainerProps = {
  desktopIndex: number;
  desktopOptions: readonly string[];
  onLoaded?: () => void;
};

type MacModelMeshes = {
  [key: string]: THREE.Object3D;
};

const base = import.meta.env.BASE_URL;

const MacContainer = ({
  desktopIndex,
  desktopOptions,
  onLoaded,
}: MacContainerProps) => {
  const model = useGLTF(`${base}mac.glb`);

  const textures = useTexture(desktopOptions.map((f) => `${base}${f}`));

  const meshesRef = useRef<MacModelMeshes | null>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial | null>(null);

  useMemo(() => {
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
    });
  }, [textures]);

  useMemo(() => {
    materialRef.current = new THREE.MeshBasicMaterial({
      map: textures[0],
      toneMapped: false,
    });
  }, [textures]);

  useLayoutEffect(() => {
    const meshes: MacModelMeshes = {} as MacModelMeshes;

    model.scene.traverse((c) => {
      if (c.name) meshes[c.name] = c;
    });

    meshesRef.current = meshes;

    const matteMesh = meshes.matte as THREE.Mesh;
    const screen = meshes.screen as THREE.Mesh;

    if (matteMesh && materialRef.current) {
      matteMesh.material = materialRef.current;
    }

    if (screen) {
      screen.rotation.x = THREE.MathUtils.degToRad(180);
    }

    onLoaded?.();
  }, [model, onLoaded]);

  useEffect(() => {
    if (!materialRef.current) return;

    materialRef.current.map = textures[desktopIndex];
    materialRef.current.needsUpdate = true;
  }, [desktopIndex, textures]);

  const scrollData = useScroll();

  useFrame(() => {
    const meshes = meshesRef.current;
    if (!meshes?.screen) return;

    const angle = 180 - scrollData.offset * 90;
    (meshes.screen as THREE.Mesh).rotation.x = THREE.MathUtils.degToRad(angle);
  });

  return (
    <group position={[0, -10, 20]}>
      <primitive object={model.scene} />
    </group>
  );
};

export default MacContainer;
