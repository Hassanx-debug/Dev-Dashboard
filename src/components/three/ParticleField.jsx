import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Stars({ count = 2000 }) {
  const mesh = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100;

      // Randomly tint cyan or purple
      const tint = Math.random();
      if (tint > 0.85) {
        col[i * 3] = 0; col[i * 3 + 1] = 0.96; col[i * 3 + 2] = 1; // cyan
      } else if (tint > 0.75) {
        col[i * 3] = 0.7; col[i * 3 + 1] = 0.28; col[i * 3 + 2] = 0.92; // purple
      } else {
        col[i * 3] = 0.9; col[i * 3 + 1] = 0.9; col[i * 3 + 2] = 1;
      }
    }
    return [pos, col];
  }, [count]);

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = clock.getElapsedTime() * 0.02;
      mesh.current.rotation.x = clock.getElapsedTime() * 0.005;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
      />
    </points>
  );
}

function FloatingOrb({ position, color, speed = 0.3 }) {
  const mesh = useRef();
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * speed) * 0.5;
      mesh.current.rotation.z = clock.getElapsedTime() * 0.2;
    }
  });
  return (
    <mesh ref={mesh} position={position}>
      <torusGeometry args={[1.2, 0.015, 8, 80]} />
      <meshBasicMaterial color={color} transparent opacity={0.15} />
    </mesh>
  );
}

export default function ParticleField() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        <Stars />
        <FloatingOrb position={[4, 2, 0]} color="#00f5ff" speed={0.4} />
        <FloatingOrb position={[-5, -1, -2]} color="#b347ea" speed={0.25} />
        <FloatingOrb position={[2, -3, 1]} color="#00f5ff" speed={0.35} />
      </Canvas>
    </div>
  );
}
