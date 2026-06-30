import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";

function CodeCube() {
  const groupRef = useRef();
  const wireRef = useRef();

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.4;
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -clock.getElapsedTime() * 0.6;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Core cube */}
      <RoundedBox args={[2, 2, 2]} radius={0.1} smoothness={4}>
        <meshStandardMaterial
          color="#020408"
          emissive="#00f5ff"
          emissiveIntensity={0.05}
          transparent
          opacity={0.7}
          wireframe={false}
        />
      </RoundedBox>

      {/* Wireframe overlay */}
      <mesh ref={wireRef}>
        <boxGeometry args={[2.4, 2.4, 2.4]} />
        <meshBasicMaterial color="#00f5ff" wireframe transparent opacity={0.12} />
      </mesh>

      {/* Glowing edges */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(2.02, 2.02, 2.02)]} />
        <lineBasicMaterial color="#00f5ff" transparent opacity={0.5} />
      </lineSegments>

      {/* Face labels */}
      {[
        { text: "React", pos: [0, 0, 1.1], rot: [0, 0, 0] },
        { text: "Node", pos: [0, 0, -1.1], rot: [0, Math.PI, 0] },
        { text: "Mongo", pos: [1.1, 0, 0], rot: [0, -Math.PI / 2, 0] },
        { text: "API", pos: [-1.1, 0, 0], rot: [0, Math.PI / 2, 0] },
      ].map(({ text, pos, rot }) => (
        <Text
          key={text}
          position={pos}
          rotation={rot}
          fontSize={0.28}
          color="#00f5ff"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/orbitron/v31/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyKS6BogtscmdctNMber39ogv.woff"
        >
          {text}
        </Text>
      ))}
    </group>
  );
}

export default function HeroCube() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} color="#00f5ff" intensity={2} />
        <pointLight position={[-5, -3, -3]} color="#b347ea" intensity={1.5} />
        <CodeCube />
      </Canvas>
    </div>
  );
}
