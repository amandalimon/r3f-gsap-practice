import gsap from "gsap";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useRef } from "react";

const MOUSE_SMOOTH = 0.08;
const BASE_X = 0;
const BASE_Y = 1.4;
const BASE_Z = 0.5;
const MAX_Y = 0.9;
const MAX_X = 0.2;
const MAX_Z = 0.15;
const SPIN_BASE = 0.5;
const SPIN_CURSOR_BOOST = 0.4;

const Cyl = () => {
  const tex = useTexture("/images.png");
  const outerRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const smoothedMouse = useRef(new THREE.Vector2(0, 0));

  const qx = useRef<((v: number) => void) | null>(null);
  const qy = useRef<((v: number) => void) | null>(null);
  const qz = useRef<((v: number) => void) | null>(null);

  useLayoutEffect(() => {
    if (!outerRef.current) return;

    outerRef.current.rotation.set(BASE_X, BASE_Y, BASE_Z);

    qx.current = gsap.quickTo(outerRef.current.rotation, "x", {
      duration: 0.4,
      ease: "power2.out",
    });
    qy.current = gsap.quickTo(outerRef.current.rotation, "y", {
      duration: 0.5,
      ease: "power2.out",
    });
    qz.current = gsap.quickTo(outerRef.current.rotation, "z", {
      duration: 0.35,
      ease: "power2.out",
    });

    return () => {
      qx.current = null;
      qy.current = null;
      qz.current = null;
    };
  }, []);

  useFrame((state, delta) => {
    if (
      !outerRef.current ||
      !innerRef.current ||
      !qx.current ||
      !qy.current ||
      !qz.current
    )
      return;

    const mx = state.mouse.x;
    const my = state.mouse.y;

    smoothedMouse.current.lerp(new THREE.Vector2(mx, my), MOUSE_SMOOTH);

    const smx = smoothedMouse.current.x;
    const smy = smoothedMouse.current.y;

    qx.current(BASE_X + -smy * MAX_X);
    qy.current(BASE_Y + smx * MAX_Y);
    qz.current(BASE_Z + -smx * smy * MAX_Z);

    const cursorDist = Math.sqrt(smx * smx + smy * smy);
    const spinSpeed = SPIN_BASE + cursorDist * SPIN_CURSOR_BOOST;
    innerRef.current.rotation.y += delta * spinSpeed;
  });

  return (
    <group ref={outerRef}>
      <group ref={innerRef}>
        <mesh>
          <cylinderGeometry args={[2, 2, 2, 60, 60, true]} />
          <meshStandardMaterial
            map={tex}
            transparent
            side={THREE.DoubleSide}
            emissiveMap={tex}
            emissiveIntensity={0.85}
          />
        </mesh>
      </group>
    </group>
  );
};

export default Cyl;
