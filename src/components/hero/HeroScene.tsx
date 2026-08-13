"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, Sparkles, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

function StageWorld({
  mouse,
  compact,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  compact: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const orbit = useRef<THREE.Group>(null);
  const orbitB = useRef<THREE.Group>(null);
  const scan = useRef<THREE.Group>(null);
  const lights = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        mouse.current.x * 0.4 + t * 0.06,
        0.035
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        -0.18 + mouse.current.y * 0.14,
        0.035
      );
    }
    if (ringA.current) ringA.current.rotation.z = t * 0.4;
    if (ringB.current) ringB.current.rotation.z = -t * 0.55;
    if (orbit.current) orbit.current.rotation.y = t * 0.5;
    if (orbitB.current) orbitB.current.rotation.y = -t * 0.28;
    if (lights.current) lights.current.rotation.y = Math.sin(t * 0.35) * 0.12;
    if (scan.current) {
      scan.current.children.forEach((child, i) => {
        child.position.y = 0.45 + ((t * 0.45 + i * 0.22) % 2.0);
      });
    }
  });

  const mint = "#6ee7b7";
  const deep = "#0c1612";
  const metal = "#a3bdb0";
  const cream = "#ecfdf5";

  const nodes = useMemo(
    () =>
      Array.from({ length: compact ? 10 : 14 }).map((_, i) => {
        const a = (i / (compact ? 10 : 14)) * Math.PI * 2;
        const r = 2.7 + (i % 3) * 0.15;
        return [Math.cos(a) * r, 0.9 + Math.sin(i * 1.7) * 0.45, Math.sin(a) * r] as [
          number,
          number,
          number,
        ];
      }),
    [compact]
  );

  const outerNodes = useMemo(
    () =>
      Array.from({ length: compact ? 6 : 10 }).map((_, i) => {
        const a = (i / (compact ? 6 : 10)) * Math.PI * 2 + 0.3;
        return [Math.cos(a) * 3.5, 1.6 + (i % 2) * 0.4, Math.sin(a) * 3.5] as [number, number, number];
      }),
    [compact]
  );

  const panelCount = compact ? 11 : 16;

  return (
    <group ref={group} position={[compact ? 0 : 1.1, -0.45, 0]} scale={compact ? 0.85 : 1.05}>
      {/* Multi-ring floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <cylinderGeometry args={[3.8, 3.8, 0.1, 72]} />
        <meshStandardMaterial color="#14241c" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
        <ringGeometry args={[2.55, 2.75, 72]} />
        <meshStandardMaterial color={mint} emissive={mint} emissiveIntensity={0.85} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.065, 0]}>
        <ringGeometry args={[1.55, 1.65, 64]} />
        <meshStandardMaterial color={mint} emissive={mint} emissiveIntensity={0.5} transparent opacity={0.75} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.07, 0]}>
        <ringGeometry args={[3.35, 3.45, 72]} />
        <meshStandardMaterial color={mint} emissive={mint} emissiveIntensity={0.35} transparent opacity={0.55} />
      </mesh>

      {/* Curved mega LED wall */}
      {Array.from({ length: panelCount }).map((_, i) => {
        const a = -1.2 + (i / (panelCount - 1)) * 2.4;
        return (
          <group key={i} position={[Math.sin(a) * 2.55, 1.45, -Math.cos(a) * 2.55 - 0.2]} rotation={[0, -a, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.42, 2.35, 0.12]} />
              <meshStandardMaterial
                color={deep}
                emissive={mint}
                emissiveIntensity={0.32 + (i % 4) * 0.08}
                metalness={0.7}
                roughness={0.2}
              />
            </mesh>
            <mesh position={[0, 0, 0.07]}>
              <boxGeometry args={[0.36, 2.2, 0.02]} />
              <meshStandardMaterial color="#040906" metalness={0.5} roughness={0.35} />
            </mesh>
          </group>
        );
      })}

      {/* Horizontal LED scan lines */}
      <group ref={scan}>
        {Array.from({ length: 7 }).map((_, i) => (
          <mesh key={i} position={[0, 0.5, -2.55]}>
            <boxGeometry args={[4.4, 0.035, 0.02]} />
            <meshStandardMaterial color={mint} emissive={mint} emissiveIntensity={1.5} transparent opacity={0.5} />
          </mesh>
        ))}
      </group>

      {/* Main stage deck */}
      <RoundedBox args={[3.4, 0.28, 2.0]} radius={0.04} position={[0, 0.2, 0.55]} castShadow>
        <meshStandardMaterial color={cream} metalness={0.22} roughness={0.28} />
      </RoundedBox>
      <mesh position={[0, 0.1, 1.52]}>
        <boxGeometry args={[3.35, 0.12, 0.08]} />
        <meshStandardMaterial color="#34d399" emissive={mint} emissiveIntensity={0.65} />
      </mesh>

      {/* Stairs */}
      {[0, 1, 2].map((i) => (
        <RoundedBox
          key={i}
          args={[1.3 - i * 0.15, 0.09, 0.26]}
          radius={0.02}
          position={[0, 0.06 + i * 0.09, 1.7 + i * 0.2]}
          castShadow
        >
          <meshStandardMaterial color={cream} metalness={0.15} roughness={0.35} />
        </RoundedBox>
      ))}

      {/* Lattice truss uprights */}
      {[-1.7, 1.7].map((x) => (
        <group key={x}>
          <mesh position={[x, 1.7, -0.9]} castShadow>
            <boxGeometry args={[0.11, 3.2, 0.11]} />
            <meshStandardMaterial color={metal} metalness={0.92} roughness={0.14} />
          </mesh>
          <mesh position={[x, 1.7, -0.35]}>
            <boxGeometry args={[0.08, 3.2, 0.08]} />
            <meshStandardMaterial color={metal} metalness={0.92} roughness={0.14} />
          </mesh>
          {[0.5, 1.2, 1.9, 2.6].map((y) => (
            <mesh key={y} position={[x, y, -0.62]}>
              <boxGeometry args={[0.04, 0.04, 0.58]} />
              <meshStandardMaterial color={metal} metalness={0.9} roughness={0.16} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Top truss bridges */}
      <mesh position={[0, 3.2, -0.9]}>
        <boxGeometry args={[3.55, 0.12, 0.12]} />
        <meshStandardMaterial color={metal} metalness={0.92} roughness={0.14} />
      </mesh>
      <mesh position={[0, 3.2, -0.35]}>
        <boxGeometry args={[3.55, 0.1, 0.1]} />
        <meshStandardMaterial color={metal} metalness={0.92} roughness={0.14} />
      </mesh>
      <mesh position={[0, 3.2, 0.35]}>
        <boxGeometry args={[3.2, 0.08, 0.08]} />
        <meshStandardMaterial color={metal} metalness={0.9} roughness={0.16} />
      </mesh>
      {[-1.1, -0.35, 0.35, 1.1].map((x) => (
        <mesh key={x} position={[x, 3.2, -0.5]}>
          <boxGeometry args={[0.04, 0.04, 0.7]} />
          <meshStandardMaterial color={metal} metalness={0.9} roughness={0.16} />
        </mesh>
      ))}

      {/* Moving-head array */}
      <group ref={lights}>
        {[-1.4, -0.7, 0, 0.7, 1.4].map((x, i) => (
          <Float key={x} speed={1.1 + i * 0.12} floatIntensity={0.28} rotationIntensity={0.18}>
            <group position={[x, 2.95, -0.15]}>
              <mesh>
                <cylinderGeometry args={[0.08, 0.13, 0.2, 18]} />
                <meshStandardMaterial color="#1a1a1a" metalness={0.85} roughness={0.22} />
              </mesh>
              <mesh position={[0, -0.65, 0.35]} rotation={[0.55, 0, i * 0.05]}>
                <coneGeometry args={[0.5, 1.5, 24, 1, true]} />
                <meshStandardMaterial
                  color={mint}
                  transparent
                  opacity={0.13}
                  emissive={mint}
                  emissiveIntensity={0.55}
                  side={THREE.DoubleSide}
                  depthWrite={false}
                />
              </mesh>
              <pointLight position={[0, -0.4, 0.25]} color={mint} intensity={0.4} distance={4} />
            </group>
          </Float>
        ))}
      </group>

      {/* Side LED towers with banding */}
      {[-2.7, 2.7].map((x) => (
        <group key={x} position={[x, 1.35, 0.15]}>
          <RoundedBox args={[0.42, 2.7, 0.42]} radius={0.03} castShadow>
            <meshStandardMaterial color="#1a2e24" emissive={mint} emissiveIntensity={0.2} metalness={0.45} />
          </RoundedBox>
          {[0.4, 0, -0.4, -0.8].map((y) => (
            <mesh key={y} position={[0.22, y, 0]}>
              <boxGeometry args={[0.03, 0.08, 0.35]} />
              <meshStandardMaterial color={mint} emissive={mint} emissiveIntensity={1} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Speaker stacks */}
      {[-2.0, 2.0].map((x) => (
        <group key={`spk-${x}`} position={[x, 0.75, 1.05]}>
          <RoundedBox args={[0.45, 1.25, 0.5]} radius={0.03} castShadow>
            <meshStandardMaterial color="#1a2420" metalness={0.4} roughness={0.35} />
          </RoundedBox>
          {[0.28, -0.15].map((y) => (
            <mesh key={y} position={[0.24, y, 0]} rotation={[0, Math.PI / 2, 0]}>
              <cylinderGeometry args={[0.13, 0.13, 0.06, 24]} />
              <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.3} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Center totem + dual hologram rings */}
      <mesh position={[0, 0.55, 0.5]} castShadow>
        <cylinderGeometry args={[0.4, 0.5, 0.95, 40]} />
        <meshStandardMaterial color={cream} metalness={0.28} roughness={0.28} />
      </mesh>
      <mesh ref={ringA} position={[0, 1.35, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.62, 0.025, 16, 72]} />
        <meshStandardMaterial color={mint} emissive={mint} emissiveIntensity={1.3} />
      </mesh>
      <mesh ref={ringB} position={[0, 1.55, 0.5]} rotation={[Math.PI / 2.4, 0.3, 0]}>
        <torusGeometry args={[0.42, 0.018, 12, 64]} />
        <meshStandardMaterial color={mint} emissive={mint} emissiveIntensity={1} transparent opacity={0.85} />
      </mesh>
      <Float speed={2.2} floatIntensity={0.7}>
        <mesh position={[0, 1.75, 0.5]}>
          <icosahedronGeometry args={[0.26, 1]} />
          <meshStandardMaterial
            color={mint}
            emissive={mint}
            emissiveIntensity={0.95}
            metalness={0.55}
            roughness={0.15}
            wireframe
          />
        </mesh>
      </Float>

      {/* Floating ambient modules (background quantity) */}
      {!compact &&
        [
          [-3.8, 2.2, -1.5],
          [3.6, 2.6, -0.8],
          [-3.2, 0.8, 2.2],
          [3.4, 1.1, 2.0],
          [-4.2, 1.6, 0.4],
          [4.0, 1.9, 0.2],
        ].map((pos, i) => (
          <Float key={i} speed={1 + i * 0.08} floatIntensity={0.4} rotationIntensity={0.25}>
            <mesh position={pos as [number, number, number]}>
              {i % 2 === 0 ? (
                <octahedronGeometry args={[0.18 + (i % 3) * 0.04, 0]} />
              ) : (
                <boxGeometry args={[0.22, 0.22, 0.22]} />
              )}
              <meshStandardMaterial
                color={mint}
                emissive={mint}
                emissiveIntensity={0.7}
                wireframe={i % 3 === 0}
                transparent
                opacity={0.75}
              />
            </mesh>
          </Float>
        ))}

      {/* Orbit rings of particles */}
      <group ref={orbit}>
        {nodes.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.06 + (i % 3) * 0.015, 16, 16]} />
            <meshStandardMaterial color={mint} emissive={mint} emissiveIntensity={1.5} />
          </mesh>
        ))}
      </group>
      <group ref={orbitB}>
        {outerNodes.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial color={mint} emissive={mint} emissiveIntensity={1.1} transparent opacity={0.85} />
          </mesh>
        ))}
      </group>

      <Sparkles
        count={compact ? 50 : 90}
        scale={compact ? [7, 4, 7] : [10, 5, 9]}
        size={2.4}
        speed={0.45}
        color={mint}
        opacity={0.65}
      />
    </group>
  );
}

export function HeroScene({ compact = false }: { compact?: boolean }) {
  const mouse = useRef({ x: 0, y: 0 });

  return (
    <div
      className="absolute inset-0"
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      }}
    >
      <Canvas
        camera={{
          position: compact ? [0.2, 1.8, 6.4] : [1.8, 2.1, 6.2],
          fov: compact ? 42 : 34,
        }}
        dpr={compact ? [1, 1.35] : [1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        shadows
      >
        <color attach="background" args={["#0c1612"]} />
        <fog attach="fog" args={["#0c1612", 8, 18]} />
        <ambientLight intensity={0.38} />
        <directionalLight position={[6, 8, 4]} intensity={1.3} castShadow />
        <pointLight position={[0, 3.5, 1.5]} intensity={1.5} color="#6ee7b7" />
        <pointLight position={[-5, 2.2, 2]} intensity={0.55} color="#a7f3d0" />
        <pointLight position={[4, 1.5, 3]} intensity={0.35} color="#34d399" />
        <StageWorld mouse={mouse} compact={compact} />
        <ContactShadows position={[0, -0.48, 0]} opacity={0.6} scale={16} blur={2.8} far={7} />
      </Canvas>
    </div>
  );
}
