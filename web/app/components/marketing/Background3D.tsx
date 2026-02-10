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

/**
 * Theme detection:
 * - html/body class "dark"
 * - data-theme="dark" / data-mode="dark" / data-color-scheme="dark"
 * - fallback: prefers-color-scheme
 */
function useIsDarkTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const read = () => {
      const html = document.documentElement;
      const body = document.body;

      const hasDarkClass =
        html.classList.contains("dark") || body?.classList?.contains("dark");

      const attr = (name: string) =>
        html.getAttribute(name) || body?.getAttribute?.(name);

      const themeAttr =
        attr("data-theme") || attr("data-mode") || attr("data-color-scheme");

      const isDarkAttr = themeAttr?.toLowerCase() === "dark";

      const prefersDark =
        window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;

      setIsDark(hasDarkClass || isDarkAttr || prefersDark);
    };

    read();

    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "data-mode", "data-color-scheme"],
    });
    if (document.body) {
      obs.observe(document.body, {
        attributes: true,
        attributeFilter: [
          "class",
          "data-theme",
          "data-mode",
          "data-color-scheme",
        ],
      });
    }

    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    const onMq = () => read();
    mq?.addEventListener?.("change", onMq);

    return () => {
      obs.disconnect();
      mq?.removeEventListener?.("change", onMq);
    };
  }, []);

  return isDark;
}

function MarketDust({
  count = 900,
  isDark,
}: {
  count?: number;
  isDark: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, base, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // spread across viewport, slightly in front of content
      const x = THREE.MathUtils.randFloatSpread(22); // -11..11
      const y = THREE.MathUtils.randFloat(0.5, 10.5);
      const z = THREE.MathUtils.randFloat(-14, 4); // behind/in-front mix

      positions[i * 3 + 0] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      base[i * 3 + 0] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;

      speeds[i] = THREE.MathUtils.randFloat(0.6, 1.35);
    }

    return { positions, base, speeds };
  }, [count]);

  useFrame((state) => {
    const pts = pointsRef.current;
    if (!pts) return;

    const t = state.clock.getElapsedTime();
    const arr = pts.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const bx = base[i * 3 + 0];
      const by = base[i * 3 + 1];
      const bz = base[i * 3 + 2];
      const s = speeds[i];

      // subtle "market dust" drift (not falling)
      arr[i * 3 + 0] = bx + Math.sin(t * 0.22 * s + i * 0.7) * 0.10;
      arr[i * 3 + 1] = by + Math.cos(t * 0.18 * s + i * 0.9) * 0.08;
      arr[i * 3 + 2] = bz + Math.sin(t * 0.16 * s + i * 0.5) * 0.12;
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

      {/* IMPORTANT: additive blending so dust stays visible even with overlays */}
      <pointsMaterial
        size={isDark ? 0.03 : 0.028}
        transparent
        opacity={isDark ? 0.42 : 0.28}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color={isDark ? "#d7ccff" : "#8d74ff"}
      />
    </points>
  );
}

function Scene({ isDark }: { isDark: boolean }) {
  return (
    <>
      {/* прибрали fog — він якраз “з’їдав” пил */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 10, 6]} intensity={0.55} />

      {/* тільки пил */}
      <MarketDust count={900} isDark={isDark} />
    </>
  );
}

export function Background3D() {
  const reducedMotion = usePrefersReducedMotion();
  const isDark = useIsDarkTheme();

  // lighter overlays so particles remain visible
  const overlayLinear = isDark
    ? "linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.18), rgba(0,0,0,0.40))"
    : "linear-gradient(to bottom, rgba(255,255,255,0.28), rgba(255,255,255,0.14), rgba(255,255,255,0.22))";

  const overlayRadials = isDark
    ? "radial-gradient(1200px 500px at 15% 10%, rgba(140,80,255,0.16), transparent 62%), radial-gradient(900px 380px at 85% 80%, rgba(140,80,255,0.10), transparent 62%)"
    : "radial-gradient(1200px 500px at 15% 10%, rgba(140,80,255,0.10), transparent 62%), radial-gradient(900px 380px at 85% 80%, rgba(140,80,255,0.06), transparent 62%)";

  if (reducedMotion) {
    return (
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: isDark
            ? "radial-gradient(900px 380px at 20% 15%, rgba(140,80,255,0.16), transparent 60%), radial-gradient(900px 380px at 80% 85%, rgba(140,80,255,0.10), transparent 62%), rgba(0,0,0,0.45)"
            : "radial-gradient(900px 380px at 20% 15%, rgba(140,80,255,0.12), transparent 60%), radial-gradient(900px 380px at 80% 85%, rgba(140,80,255,0.08), transparent 62%), rgba(255,255,255,0.40)",
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
        camera={{ position: [0, 6.2, 10], fov: 45, near: 0.1, far: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Scene isDark={isDark} />
      </Canvas>

      {/* overlays */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: overlayRadials,
          opacity: 0.95,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: overlayLinear,
        }}
      />
    </div>
  );
}
