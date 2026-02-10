"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return reduced;
}

function Particles({ count = 900 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const x = THREE.MathUtils.randFloatSpread(18); // -9..9
      const y = THREE.MathUtils.randFloat(0.5, 9);
      const z = THREE.MathUtils.randFloat(-18, 4);

      positions[i * 3 + 0] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      speeds[i] = THREE.MathUtils.randFloat(0.25, 1.1);
    }

    return { positions, speeds };
  }, [count]);

  useFrame((_state, delta) => {
    const pts = pointsRef.current;
    if (!pts) return;

    const arr = pts.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * delta * 0.15;
      arr[i * 3 + 2] -= speeds[i] * delta * 0.08;

      if (arr[i * 3 + 1] > 10) arr[i * 3 + 1] = 0.5;
      if (arr[i * 3 + 2] < -22) arr[i * 3 + 2] = 4;
    }

    pts.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          itemSize={3}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        transparent
        opacity={0.55}
        depthWrite={false}
        color="#c7b8ff"
      />
    </points>
  );
}

function EquityLine() {
  const lineRef = useRef<THREE.Line>(null);

  const { geometry } = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    let y = 1.6;

    for (let i = 0; i < 42; i++) {
      const x = -7.5 + i * 0.38;
      const wave = Math.sin(i * 0.28) * 0.18;
      const pullback = (i % 9 === 0 ? -0.22 : 0) + (i % 13 === 0 ? -0.15 : 0);
      y += 0.02 + wave * 0.05 + pullback * 0.02;
      const z = -8.5 + Math.cos(i * 0.18) * 0.25;

      pts.push(new THREE.Vector3(x, y, z));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(pts);
    return { geometry };
  }, []);

  useFrame((state) => {
    const obj = lineRef.current;
    if (!obj) return;

    const t = state.clock.getElapsedTime();
    obj.position.y = Math.sin(t * 0.35) * 0.05;
    obj.rotation.y = Math.sin(t * 0.18) * 0.03;
  });

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#ffffff" transparent opacity={0.85} />
    </line>
  );
}

function GridFloor() {
  // Легка “підлога” з line segments (без drei Grid)
  const linesRef = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const size = 40;
    const step = 0.7;

    const vertices: number[] = [];
    const half = size / 2;

    for (let i = -half; i <= half; i += step) {
      // lines parallel to X (varying Z)
      vertices.push(-half, 0, i, half, 0, i);
      // lines parallel to Z (varying X)
      vertices.push(i, 0, -half, i, 0, half);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    return geo;
  }, []);

  useFrame((state) => {
    // дуже легке "дихання" brightness через opacity (імітація живого фону)
    const obj = linesRef.current;
    if (!obj) return;
    const t = state.clock.getElapsedTime();
    (obj.material as THREE.LineBasicMaterial).opacity = 0.22 + Math.sin(t * 0.25) * 0.03;
  });

  return (
    <group position={[0, 0, -8]} rotation={[-Math.PI / 2, 0, 0]}>
      <lineSegments ref={linesRef} geometry={geometry}>
        <lineBasicMaterial color="#6d4cff" transparent opacity={0.22} />
      </lineSegments>
    </group>
  );
}

function Scene() {
  return (
    <>
      <fog attach="fog" args={["#000000", 6, 22]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 10, 6]} intensity={0.55} />

      <GridFloor />
      <Particles count={900} />
      <group position={[0, 0.2, 0]}>
        <EquityLine />
      </group>
    </>
  );
}

export function Background3D() {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return (
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(900px 380px at 20% 15%, rgba(140,80,255,0.18), transparent 55%), radial-gradient(900px 380px at 80% 85%, rgba(140,80,255,0.10), transparent 60%), rgba(0,0,0,0.55)",
        }}
      />
    );
  }

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 5.5, 10], fov: 45, near: 0.1, far: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Scene />
      </Canvas>

      {/* overlay gradients */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(1200px 500px at 15% 10%, rgba(140,80,255,0.18), transparent 60%), radial-gradient(900px 380px at 85% 80%, rgba(140,80,255,0.10), transparent 60%)",
          opacity: 0.9,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.65), rgba(0,0,0,0.35), rgba(0,0,0,0.75))",
        }}
      />
    </div>
  );
}
