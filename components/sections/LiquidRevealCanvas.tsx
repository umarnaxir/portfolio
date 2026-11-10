'use client';

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const FullBleedLiquidWrap = styled.div<{ $revealed: boolean }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
  overflow: hidden;
  opacity: ${({ $revealed }) => ($revealed ? 1 : 0)};
  transition: opacity 1s ease;

  @media (max-width: 767px) {
    display: none;
  }
`;

const FullBleedCanvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const PortraitContainer = styled.div<{ $revealed: boolean }>`
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  pointer-events: none;
  z-index: 6;
  opacity: 1;
  transform: translateY(${({ $revealed }) => ($revealed ? '0' : '20px')});
  transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);
`;

const PortraitFrame = styled.div`
  position: relative;
  pointer-events: auto;
  cursor: default;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 72vh;
  max-height: 740px;
  width: auto;
  max-width: 90vw;
  transform: none !important;

  @media (min-width: 640px) {
    height: 76vh;
    max-height: 780px;
  }

  @media (min-width: 1024px) {
    height: 82vh;
    max-height: 840px;
  }

  @media (min-width: 1440px) {
    height: 86vh;
    max-height: 900px;
  }

  @media (max-width: 767px) {
    height: 88vh;
    height: 88svh;
    max-height: none;
    max-width: none;
    pointer-events: none;
  }
`;

const BaseImage = styled.img<{ $isHovered?: boolean; $isHeroActive?: boolean }>`
  position: relative;
  display: block;
  height: 100%;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  object-position: bottom center;
  user-select: none;
  pointer-events: none;
  opacity: 1 !important;
  transform: none !important;
  filter: ${({ $isHovered, $isHeroActive }) =>
    $isHovered
      ? 'drop-shadow(0 20px 48px rgba(220, 100, 30, 0.72)) drop-shadow(0 0 40px rgba(255, 145, 50, 0.52)) brightness(1.08) contrast(1.03)'
      : $isHeroActive
      ? 'drop-shadow(0 16px 36px rgba(210, 95, 30, 0.42)) drop-shadow(0 0 25px rgba(255, 140, 50, 0.28)) brightness(1.04)'
      : 'drop-shadow(0 14px 28px rgba(0, 0, 0, 0.12)) brightness(1)'};
  transition: filter 0.35s ease;

  @media (max-width: 767px) {
    max-width: none;
  }
`;

interface LiquidRevealCanvasProps {
  revealed?: boolean;
  heroMouse?: {
    x: number;
    y: number;
    clientX: number;
    clientY: number;
    active: boolean;
  };
}

export function LiquidRevealCanvas({
  revealed = true,
  heroMouse,
}: LiquidRevealCanvasProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const pointsRef = useRef<{ x: number; y: number }[]>([]);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  // Full-bleed liquid reveal canvas setup
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const mainCtx = canvas.getContext('2d');
    if (!mainCtx) return;

    const coverCanvas = document.createElement('canvas');
    const coverCtx = coverCanvas.getContext('2d');
    const brushCanvas = document.createElement('canvas');
    const brushCtx = brushCanvas.getContext('2d');
    if (!coverCtx || !brushCtx) return;

    const brushRadius = 165;
    const decay = 0.016;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let radius = brushRadius * dpr;
    let diam = Math.ceil(radius * 2);

    function prepBrush() {
      radius = brushRadius * dpr;
      diam = Math.ceil(radius * 2);
      brushCanvas.width = diam;
      brushCanvas.height = diam;
    }
    prepBrush();

    function updateCoverCanvas() {
      const cw = coverCanvas.width;
      const ch = coverCanvas.height;
      if (cw === 0 || ch === 0 || !coverCtx) return;

      coverCtx.clearRect(0, 0, cw, ch);

      // Create radiant, rich sunset orange atmosphere matching the Lumora reference
      const grad = coverCtx.createRadialGradient(
        cw * 0.5,
        ch * 0.45,
        cw * 0.05,
        cw * 0.5,
        ch * 0.5,
        cw * 0.8
      );
      grad.addColorStop(0, 'rgba(255, 160, 60, 0.98)'); // Golden amber core
      grad.addColorStop(0.25, 'rgba(235, 115, 35, 0.94)'); // Radiant burnt orange
      grad.addColorStop(0.5, 'rgba(205, 90, 25, 0.88)'); // Deep studio orange
      grad.addColorStop(0.75, 'rgba(177, 95, 44, 0.75)'); // Studio accent
      grad.addColorStop(1, 'rgba(125, 45, 15, 0.6)'); // Warm twilight edge

      coverCtx.fillStyle = grad;
      coverCtx.fillRect(0, 0, cw, ch);

      // Add atmospheric light ray streaks across the sunset sky
      const linearStreak = coverCtx.createLinearGradient(0, ch * 0.2, cw, ch * 0.8);
      linearStreak.addColorStop(0, 'rgba(255, 180, 80, 0.4)');
      linearStreak.addColorStop(0.5, 'rgba(220, 100, 30, 0.15)');
      linearStreak.addColorStop(1, 'rgba(150, 50, 15, 0.35)');

      coverCtx.fillStyle = linearStreak;
      coverCtx.fillRect(0, 0, cw, ch);
    }

    function resize() {
      if (!wrap || !canvas) return;
      const rect = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      prepBrush();

      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      coverCanvas.width = canvas.width;
      coverCanvas.height = canvas.height;
      updateCoverCanvas();
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    function stamp(x: number, y: number) {
      if (!brushCtx || !mainCtx) return;

      brushCtx.clearRect(0, 0, diam, diam);
      brushCtx.globalCompositeOperation = 'source-over';

      const grad = brushCtx.createRadialGradient(radius, radius, 0, radius, radius, radius);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.45, 'rgba(255, 255, 255, 0.88)');
      grad.addColorStop(0.8, 'rgba(255, 255, 255, 0.35)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      brushCtx.fillStyle = grad;
      brushCtx.fillRect(0, 0, diam, diam);

      brushCtx.globalCompositeOperation = 'source-in';
      brushCtx.drawImage(coverCanvas, x - radius, y - radius, diam, diam, 0, 0, diam, diam);

      mainCtx.globalCompositeOperation = 'source-over';
      mainCtx.drawImage(brushCanvas, x - radius, y - radius);
    }

    let animId: number;
    let idle = 0;

    function renderLiquid() {
      if (!mainCtx || !canvas) return;

      const points = pointsRef.current;
      const drawing = points.length > 0;
      if (drawing) {
        idle = 0;
      } else {
        idle++;
      }

      if (idle <= 150) {
        const fade = drawing ? decay : Math.min(decay + idle * 0.003, 0.38);
        mainCtx.globalCompositeOperation = 'destination-out';
        mainCtx.fillStyle = `rgba(0, 0, 0, ${fade})`;
        mainCtx.fillRect(0, 0, canvas.width, canvas.height);

        if (drawing) {
          for (let i = 0; i < points.length; i++) {
            stamp(points[i].x, points[i].y);
          }
          points.length = 0;
        }

        if (idle === 150) {
          mainCtx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }

      animId = requestAnimationFrame(renderLiquid);
    }

    animId = requestAnimationFrame(renderLiquid);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  // React to mouse movement across entire Hero section (desktop & tablet hover only)
  useEffect(() => {
    const wrap = wrapRef.current;
    const frame = frameRef.current;
    if (!wrap || !frame) return;

    if (!heroMouse || !heroMouse.active || window.innerWidth < 768) {
      lastPointRef.current = null;
      const raf = requestAnimationFrame(() => setIsHovered(false));
      return () => cancelAnimationFrame(raf);
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const wrapRect = wrap.getBoundingClientRect();
    const cx = (heroMouse.clientX - wrapRect.left) * dpr;
    const cy = (heroMouse.clientY - wrapRect.top) * dpr;

    // Liquid trail stamping across hero
    const lastPoint = lastPointRef.current;
    if (!lastPoint) {
      lastPointRef.current = { x: cx, y: cy };
      pointsRef.current.push({ x: cx, y: cy });
    } else {
      const radius = 165 * dpr;
      const step = Math.max(radius * 0.28, 1);
      const dist = Math.hypot(cx - lastPoint.x, cy - lastPoint.y);
      const n = Math.min(Math.ceil(dist / step), 50);

      for (let i = 1; i <= n; i++) {
        const t = i / n;
        pointsRef.current.push({
          x: lastPoint.x + (cx - lastPoint.x) * t,
          y: lastPoint.y + (cy - lastPoint.y) * t,
        });
      }
      lastPointRef.current = { x: cx, y: cy };
    }

    // Determine if mouse is over/near profile portrait for subtle lighting effect
    // STRICT CONSTRAINT: Do NOT change size, position, zoom, scale, or tilt image
    const frameRect = frame.getBoundingClientRect();
    const inBounds =
      heroMouse.clientX >= frameRect.left - 20 &&
      heroMouse.clientX <= frameRect.right + 20 &&
      heroMouse.clientY >= frameRect.top - 20 &&
      heroMouse.clientY <= frameRect.bottom + 20;

    const raf = requestAnimationFrame(() => setIsHovered(inBounds));
    return () => cancelAnimationFrame(raf);
  }, [heroMouse]);

  return (
    <>
      {/* Full-bleed liquid reveal canvas across hero */}
      <FullBleedLiquidWrap ref={wrapRef} $revealed={revealed} aria-hidden="true">
        <FullBleedCanvas ref={canvasRef} />
      </FullBleedLiquidWrap>

      {/* Centered Transparent Portrait of Umar with 3D Parallax */}
      <PortraitContainer $revealed={revealed} aria-hidden="true">
        <PortraitFrame ref={frameRef}>
          <BaseImage
            $isHovered={isHovered}
            $isHeroActive={heroMouse?.active}
            src="/images/umar.png"
            alt="Umar Nazir"
          />
        </PortraitFrame>
      </PortraitContainer>
    </>
  );
}