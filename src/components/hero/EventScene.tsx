"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, Sparkles, OrbitControls, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

function EventArena({
  mouse,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const group = useRef<THREE.Group>(null);
  const scan = useRef<THREE.Group>(null);
  const beams = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        mouse.current.x * 0.55 + Math.sin(t * 0.15) * 0.04,
        0.06
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        -0.12 + mouse.current.y * 0.2,
        0.06
      );
    }
    if (scan.current) {
      scan.current.children.forEach((child, i) => {
        child.position.y = 0.35 + ((t * 0.35 + i * 0.18) % 1.6);
      });
    }
    if (beams.current) {
      beams.current.rotation.y = Math.sin(t * 0.4) * 0.15;
    }
  });

  const mint = "#6ee7b7";
  const mintDeep = "#059669";
  const metal = "#a8beb2";
  const dark = "#0c1612";
  const cream = "#ecfdf5";

  return (
    <group ref={group} position={[0, -0.55, 0]}>
      {/* Venue floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[3.4, 72]} />
        <meshStandardMaterial color="#121a15" metalness={0.55} roughness={0.32} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[2.55, 2.72, 72]} />
        <meshStandardMaterial color={mint} emissive={mint} emissiveIntensity={0.85} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
        <ringGeometry args={[1.35, 1.42, 64]} />
        <meshStandardMaterial color={mint} emissive={mint} emissiveIntensity={0.45} transparent opacity={0.7} />
      </mesh>

      {/* Curved LED wall — denser panels */}
      {Array.from({ length: 14 }).map((_, i) => {
        const a = -1.15 + i * 0.177;
        return (
          <group key={i} position={[Math.sin(a) * 2.25, 1.2, -Math.cos(a) * 2.25]} rotation={[0, -a, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.4, 2.05, 0.1]} />
              <meshStandardMaterial
                color={dark}
                emissive={mint}
                emissiveIntensity={0.28 + (i % 4) * 0.08}
                metalness={0.65}
                roughness={0.22}
              />
            </mesh>
            {/* Panel bezel */}
            <mesh position={[0, 0, 0.06]}>
              <boxGeometry args={[0.36, 1.95, 0.02]} />
              <meshStandardMaterial color="#06100a" metalness={0.4} roughness={0.4} />
            </mesh>
          </group>
        );
      })}

      {/* LED scan lines */}
      <group ref={scan}>
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh key={i} position={[0, 0.5, -2.2]}>
            <boxGeometry args={[3.8, 0.03, 0.02]} />
            <meshStandardMaterial color={mint} emissive={mint} emissiveIntensity={1.4} transparent opacity={0.55} />
          </mesh>
        ))}
      </group>

      {/* Stage deck with thickness + front fascia */}
      <RoundedBox args={[2.8, 0.28, 1.7]} radius={0.04} position={[0, 0.2, 0.55]} castShadow>
        <meshStandardMaterial color={cream} metalness={0.22} roughness={0.28} />
      </RoundedBox>
      <mesh position={[0, 0.08, 1.38]}>
        <boxGeometry args={[2.75, 0.12, 0.06]} />
        <meshStandardMaterial color={mintDeep} emissive={mint} emissiveIntensity={0.55} />
      </mesh>

      {/* Steps */}
      {[0, 1].map((i) => (
        <RoundedBox
          key={i}
          args={[1.1 - i * 0.15, 0.1, 0.28]}
          radius={0.02}
          position={[0, 0.05 + i * 0.1, 1.55 + i * 0.2]}
          castShadow
        >
          <meshStandardMaterial color={cream} metalness={0.15} roughness={0.35} />
        </RoundedBox>
      ))}

      {/* Center LED podium / totem */}
      <mesh position={[0, 0.85, 0.35]} castShadow>
        <boxGeometry args={[0.55, 1.1, 0.22]} />
        <meshStandardMaterial color={dark} emissive={mint} emissiveIntensity={0.5} metalness={0.5} />
      </mesh>
      <Float speed={2} floatIntensity={0.35}>
        <mesh position={[0, 1.55, 0.35]}>
          <octahedronGeometry args={[0.18, 0]} />
          <meshStandardMaterial color={mint} emissive={mint} emissiveIntensity={1.1} wireframe />
        </mesh>
      </Float>

      {/* Side speaker stacks */}
      {[-1.55, 1.55].map((x) => (
        <group key={x} position={[x, 0.7, 0.9]}>
          <RoundedBox args={[0.38, 1.15, 0.42]} radius={0.03} castShadow>
            <meshStandardMaterial color="#1a2420" metalness={0.4} roughness={0.35} />
          </RoundedBox>
          {[0.25, -0.15].map((y) => (
            <mesh key={y} position={[0.2, y, 0]} rotation={[0, Math.PI / 2, 0]}>
              <cylinderGeometry args={[0.12, 0.12, 0.06, 24]} />
              <meshStandardMaterial color="#333" metalness={0.7} roughness={0.3} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Box truss uprights + cross members */}
      {[-1.35, 1.35].map((x) => (
        <group key={x}>
          <mesh position={[x, 1.55, 0.15]} castShadow>
            <boxGeometry args={[0.1, 2.6, 0.1]} />
            <meshStandardMaterial color={metal} metalness={0.92} roughness={0.15} />
          </mesh>
          <mesh position={[x, 1.55, 0.55]}>
            <boxGeometry args={[0.07, 2.6, 0.07]} />
            <meshStandardMaterial color={metal} metalness={0.92} roughness={0.15} />
          </mesh>
          {[0.6, 1.3, 2.0].map((y) => (
            <mesh key={y} position={[x, y, 0.35]}>
              <boxGeometry args={[0.04, 0.04, 0.42]} />
              <meshStandardMaterial color={metal} metalness={0.9} roughness={0.18} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Top truss ladder */}
      <mesh position={[0, 2.85, 0.35]}>
        <boxGeometry args={[2.85, 0.12, 0.12]} />
        <meshStandardMaterial color={metal} metalness={0.92} roughness={0.15} />
      </mesh>
      <mesh position={[0, 2.85, 0.05]}>
        <boxGeometry args={[2.85, 0.08, 0.08]} />
        <meshStandardMaterial color={metal} metalness={0.92} roughness={0.15} />
      </mesh>
      {[-0.9, -0.3, 0.3, 0.9].map((x) => (
        <mesh key={x} position={[x, 2.85, 0.2]}>
          <boxGeometry args={[0.04, 0.04, 0.35]} />
          <meshStandardMaterial color={metal} metalness={0.9} roughness={0.18} />
        </mesh>
      ))}

      {/* Moving-head lights + volumetric cones */}
      <group ref={beams}>
        {[-0.95, 0, 0.95].map((x, i) => (
          <Float key={x} speed={1.1 + i * 0.2} floatIntensity={0.25} rotationIntensity={0.2}>
            <group position={[x, 2.55, 0.55]}>
              <mesh>
                <cylinderGeometry args={[0.08, 0.14, 0.22, 20]} />
                <meshStandardMaterial color="#1c1c1c" metalness={0.85} roughness={0.25} />
              </mesh>
              <mesh position={[0, -0.55, 0.25]} rotation={[0.45, 0, 0]}>
                <coneGeometry args={[0.48, 1.35, 24, 1, true]} />
                <meshStandardMaterial
                  color={mint}
                  transparent
                  opacity={0.16}
                  emissive={mint}
                  emissiveIntensity={0.65}
                  side={THREE.DoubleSide}
                  depthWrite={false}
                />
              </mesh>
              <pointLight position={[0, -0.3, 0.2]} color={mint} intensity={0.55} distance={4} />
            </group>
          </Float>
        ))}
      </group>

      {/* Side LED wings */}
      {[-2.15, 2.15].map((x) => (
        <mesh key={x} position={[x, 1.15, -0.15]} castShadow>
          <boxGeometry args={[0.28, 2.1, 0.9]} />
          <meshStandardMaterial color="#132019" emissive={mint} emissiveIntensity={0.22} metalness={0.45} />
        </mesh>
      ))}

      <Sparkles count={45} scale={[7, 4, 6]} size={2.2} speed={0.4} color={mint} opacity={0.65} />
    </group>
  );
}

export function EventScene() {
  const mouse = useRef({ x: 0, y: 0 });

  return (
    <div
      className="relative h-[320px] w-full cursor-grab active:cursor-grabbing sm:h-[380px] md:h-[440px]"
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      }}
    >
      <Canvas
        camera={{ position: [3.6, 2.4, 4.6], fov: 38 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        shadows
      >
        <color attach="background" args={["#0c1612"]} />
        <fog attach="fog" args={["#0c1612", 7, 16]} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 7, 3]} intensity={1.25} castShadow shadow-mapSize={[1024, 1024]} />
        <pointLight position={[0, 3.2, 1.5]} color="#6ee7b7" intensity={1.35} />
        <pointLight position={[-3, 2, 2]} color="#a7f3d0" intensity={0.45} />
        <EventArena mouse={mouse} />
        <ContactShadows position={[0, -0.56, 0]} opacity={0.55} scale={12} blur={2.6} far={6} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 3.2}
          maxPolarAngle={Math.PI / 2.15}
          autoRotate={false}
        />
      </Canvas>
      <p className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-[10px] uppercase tracking-[0.18em] text-white/40">
        Move cursor · drag to orbit
      </p>
    </div>
  );
}
