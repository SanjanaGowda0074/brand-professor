"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  ContactShadows,
  Float,
  Sparkles,
  RoundedBox,
} from "@react-three/drei";
import * as THREE from "three";

function PremiumBooth({
  mouse,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const group = useRef<THREE.Group>(null);
  const screenGlow = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        mouse.current.x * 0.5 + Math.sin(t * 0.12) * 0.03,
        0.06
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        -0.08 + mouse.current.y * 0.18,
        0.06
      );
    }
    if (screenGlow.current) {
      screenGlow.current.emissiveIntensity = 0.55 + Math.sin(t * 2.2) * 0.2;
    }
  });

  const mint = "#6ee7b7";
  const mintSoft = "#a7f3d0";
  const panel = "#f0fdf4";
  const dark = "#0c1612";
  const metal = "#8fa89a";
  const charcoal = "#1a221e";

  return (
    <group ref={group} position={[0, -0.4, 0]}>
      {/* Raised platform floor with edge glow */}
      <RoundedBox args={[3.6, 0.1, 2.8]} radius={0.03} position={[0, 0, 0]} receiveShadow>
        <meshStandardMaterial color="#1e3a5f" metalness={0.2} roughness={0.35} />
      </RoundedBox>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
        <ringGeometry args={[1.55, 1.62, 64]} />
        <meshStandardMaterial color={mint} emissive={mint} emissiveIntensity={0.6} />
      </mesh>
      {/* Floor graphic strips */}
      {[-0.9, 0, 0.9].map((z) => (
        <mesh key={z} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.055, z]}>
          <planeGeometry args={[2.8, 0.04]} />
          <meshStandardMaterial color={mint} emissive={mint} emissiveIntensity={0.35} transparent opacity={0.5} />
        </mesh>
      ))}

      {/* Back wall — layered panels */}
      <RoundedBox args={[3.4, 2.05, 0.1]} radius={0.02} position={[0, 1.05, -1.2]} castShadow>
        <meshStandardMaterial color={panel} metalness={0.08} roughness={0.42} />
      </RoundedBox>
      {/* Accent vertical strips */}
      {[-1.45, 1.45].map((x) => (
        <mesh key={x} position={[x, 1.05, -1.14]}>
          <boxGeometry args={[0.06, 1.9, 0.02]} />
          <meshStandardMaterial color={mint} emissive={mint} emissiveIntensity={0.7} />
        </mesh>
      ))}

      {/* Overhead fascia / brand bar */}
      <RoundedBox args={[2.8, 0.32, 0.14]} radius={0.02} position={[0, 1.95, -1.1]} castShadow>
        <meshStandardMaterial color={dark} metalness={0.4} roughness={0.3} />
      </RoundedBox>
      <mesh position={[0, 1.95, -1.01]}>
        <boxGeometry args={[2.4, 0.14, 0.03]} />
        <meshStandardMaterial color={mint} emissive={mint} emissiveIntensity={0.95} />
      </mesh>
      {/* Hanging lightbox letters strip */}
      <Float speed={1.1} floatIntensity={0.12}>
        <mesh position={[0, 2.25, -0.55]}>
          <boxGeometry args={[1.6, 0.12, 0.08]} />
          <meshStandardMaterial color={mint} emissive={mint} emissiveIntensity={0.8} />
        </mesh>
      </Float>

      {/* Side walls with cutout feel */}
      {[-1.7, 1.7].map((x) => (
        <group key={x}>
          <RoundedBox args={[0.1, 1.95, 2.2]} radius={0.02} position={[x, 1.0, -0.15]} castShadow>
            <meshStandardMaterial color={panel} metalness={0.08} roughness={0.4} />
          </RoundedBox>
          {/* Inner branded panel */}
          <mesh position={[x > 0 ? x - 0.07 : x + 0.07, 1.05, -0.35]}>
            <boxGeometry args={[0.03, 1.3, 1.1]} />
            <meshStandardMaterial color="#1e3a5f" emissive={mintSoft} emissiveIntensity={0.08} />
          </mesh>
        </group>
      ))}

      {/* Main LED media wall */}
      <RoundedBox args={[1.85, 1.15, 0.08]} radius={0.02} position={[0, 0.95, -1.12]} castShadow>
        <meshStandardMaterial color="#050a08" metalness={0.6} roughness={0.2} />
      </RoundedBox>
      <mesh position={[0, 0.95, -1.06]}>
        <planeGeometry args={[1.7, 1.0]} />
        <meshStandardMaterial
          ref={screenGlow}
          color="#07140e"
          emissive={mint}
          emissiveIntensity={0.55}
          metalness={0.3}
          roughness={0.25}
        />
      </mesh>
      {/* LED pixel grid */}
      {Array.from({ length: 6 }).map((_, r) =>
        Array.from({ length: 10 }).map((_, c) => (
          <mesh key={`${r}-${c}`} position={[-0.72 + c * 0.16, 0.55 + r * 0.14, -1.05]}>
            <boxGeometry args={[0.04, 0.04, 0.01]} />
            <meshStandardMaterial
              color={mint}
              emissive={mint}
              emissiveIntensity={0.35 + ((r + c) % 3) * 0.15}
            />
          </mesh>
        ))
      )}

      {/* Reception counter — layered desk */}
      <RoundedBox args={[1.65, 0.75, 0.55]} radius={0.04} position={[0, 0.42, 0.55]} castShadow>
        <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.28} />
      </RoundedBox>
      <RoundedBox args={[1.7, 0.06, 0.58]} radius={0.02} position={[0, 0.82, 0.55]}>
        <meshStandardMaterial color={mint} emissive={mint} emissiveIntensity={0.55} metalness={0.3} />
      </RoundedBox>
      {/* Counter front logo niche */}
      <mesh position={[0, 0.4, 0.84]}>
        <boxGeometry args={[0.7, 0.35, 0.03]} />
        <meshStandardMaterial color={dark} />
      </mesh>
      <mesh position={[0, 0.4, 0.86]}>
        <boxGeometry args={[0.45, 0.08, 0.02]} />
        <meshStandardMaterial color={mint} emissive={mint} emissiveIntensity={0.9} />
      </mesh>

      {/* Product display plinths with glass tops */}
      {[-1.05, 1.05].map((x, i) => (
        <Float key={x} speed={1.15 + i * 0.1} floatIntensity={0.18} rotationIntensity={0.08}>
          <group position={[x, 0, -0.25]}>
            <RoundedBox args={[0.55, 0.75, 0.55]} radius={0.03} position={[0, 0.42, 0]} castShadow>
              <meshStandardMaterial color="#1e3a5f" metalness={0.15} roughness={0.35} />
            </RoundedBox>
            <mesh position={[0, 0.82, 0]}>
              <boxGeometry args={[0.5, 0.03, 0.5]} />
              <meshStandardMaterial color={mint} emissive={mint} emissiveIntensity={0.4} />
            </mesh>
            {/* Product sculpture */}
            <mesh position={[0, 1.05, 0]}>
              <icosahedronGeometry args={[0.16, 0]} />
              <meshStandardMaterial
                color={mint}
                emissive={mint}
                emissiveIntensity={0.55}
                metalness={0.55}
                roughness={0.2}
              />
            </mesh>
            {/* Glass case */}
            <mesh position={[0, 1.05, 0]}>
              <boxGeometry args={[0.42, 0.42, 0.42]} />
              <meshStandardMaterial color="#a7f3d0" transparent opacity={0.18} metalness={0.1} roughness={0.1} />
            </mesh>
          </group>
        </Float>
      ))}

      {/* Lounge seating left */}
      <group position={[-1.15, 0, 0.85]}>
        <RoundedBox args={[0.7, 0.28, 0.55]} radius={0.04} position={[0, 0.2, 0]} castShadow>
          <meshStandardMaterial color={charcoal} metalness={0.15} roughness={0.5} />
        </RoundedBox>
        <RoundedBox args={[0.7, 0.35, 0.12]} radius={0.03} position={[0, 0.42, -0.2]} castShadow>
          <meshStandardMaterial color={charcoal} metalness={0.15} roughness={0.5} />
        </RoundedBox>
      </group>

      {/* Meeting table + stools right */}
      <group position={[1.1, 0, 0.8]}>
        <mesh position={[0, 0.48, 0]} castShadow>
          <cylinderGeometry args={[0.32, 0.32, 0.05, 32]} />
          <meshStandardMaterial color="#ffffff" metalness={0.25} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.24, 0]}>
          <cylinderGeometry args={[0.05, 0.08, 0.42, 16]} />
          <meshStandardMaterial color={metal} metalness={0.85} roughness={0.2} />
        </mesh>
        {[-0.35, 0.35].map((x) => (
          <mesh key={x} position={[x, 0.28, 0.28]} castShadow>
            <cylinderGeometry args={[0.12, 0.14, 0.32, 20]} />
            <meshStandardMaterial color={charcoal} roughness={0.45} />
          </mesh>
        ))}
      </group>

      {/* Ceiling frame + translucent canopy */}
      <mesh position={[0, 2.15, -0.1]}>
        <boxGeometry args={[3.5, 0.06, 2.5]} />
        <meshStandardMaterial color={metal} metalness={0.75} roughness={0.25} transparent opacity={0.55} />
      </mesh>
      {/* Ceiling light bars */}
      {[-0.7, 0, 0.7].map((z) => (
        <mesh key={z} position={[0, 2.1, z - 0.2]}>
          <boxGeometry args={[2.6, 0.04, 0.08]} />
          <meshStandardMaterial color={mint} emissive={mint} emissiveIntensity={0.75} />
        </mesh>
      ))}
      {/* Corner posts */}
      {[
        [-1.65, -1.15],
        [1.65, -1.15],
        [-1.65, 0.95],
        [1.65, 0.95],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 1.1, z]} castShadow>
          <boxGeometry args={[0.08, 2.15, 0.08]} />
          <meshStandardMaterial color={metal} metalness={0.88} roughness={0.18} />
        </mesh>
      ))}

      {/* Spot lights under canopy */}
      {[-0.8, 0.8].map((x) => (
        <Float key={x} speed={1.3} floatIntensity={0.15}>
          <mesh position={[x, 2.0, 0.15]}>
            <cylinderGeometry args={[0.06, 0.1, 0.12, 16]} />
            <meshStandardMaterial color="#222" metalness={0.8} roughness={0.25} />
          </mesh>
          <pointLight position={[x, 1.7, 0.15]} color={mint} intensity={0.35} distance={3.5} />
        </Float>
      ))}

      <Sparkles count={36} scale={[5, 3, 4]} size={2} speed={0.35} color={mint} opacity={0.6} />
    </group>
  );
}

export function BoothScene() {
  const mouse = useRef({ x: 0, y: 0 });

  return (
    <div
      className="relative h-[300px] w-full cursor-grab overflow-hidden bg-[#0c1612] active:cursor-grabbing sm:h-[380px] md:h-[440px]"
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      }}
    >
      <Canvas
        camera={{ position: [3.5, 2.4, 4.2], fov: 38 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        shadows
      >
        <color attach="background" args={["#0c1612"]} />
        <fog attach="fog" args={["#0c1612", 7, 15]} />
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[4.5, 6, 3]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[0, 2.4, 1.2]} color="#6ee7b7" intensity={1.15} />
        <pointLight position={[-3, 1.8, 1]} color="#a7f3d0" intensity={0.4} />
        <PremiumBooth mouse={mouse} />
        <ContactShadows position={[0, -0.42, 0]} opacity={0.5} scale={11} blur={2.5} far={5} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 3.3}
          maxPolarAngle={Math.PI / 2.12}
          autoRotate={false}
        />
      </Canvas>
      <p className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-[10px] uppercase tracking-[0.18em] text-white/40">
        Move cursor · drag to orbit
      </p>
    </div>
  );
}
