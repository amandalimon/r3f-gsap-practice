import { useRef } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Cyl = () => {
  let tex = useTexture("/images.png");
  let cyl = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (cyl.current) {
      cyl.current.rotation.y += delta;
    }
  });

  return (
    <group rotation={[0, 1.4, 0.5] as [number, number, number]}>
      <mesh ref={cyl}>
        <cylinderGeometry args={[2, 2, 2, 60, 60, true]} />
        <meshStandardMaterial map={tex} transparent side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export default Cyl;
