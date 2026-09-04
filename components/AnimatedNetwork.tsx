"use client";

import { useEffect, useRef } from "react";

interface Particule {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function AnimatedNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduireMouvement = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let largeur = 0;
    let hauteur = 0;
    let particules: Particule[] = [];
    let animationId: number;

    function redimensionner() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      largeur = parent.clientWidth;
      hauteur = parent.clientHeight;
      const ratio = window.devicePixelRatio || 1;
      canvas!.width = largeur * ratio;
      canvas!.height = hauteur * ratio;
      canvas!.style.width = `${largeur}px`;
      canvas!.style.height = `${hauteur}px`;
      ctx!.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function initParticules() {
      const nombre = Math.round((largeur * hauteur) / 22000);
      particules = Array.from({ length: Math.max(nombre, 10) }, () => ({
        x: Math.random() * largeur,
        y: Math.random() * hauteur,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
    }

    function dessiner() {
      ctx!.clearRect(0, 0, largeur, hauteur);

      if (!reduireMouvement) {
        for (const p of particules) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > largeur) p.vx *= -1;
          if (p.y < 0 || p.y > hauteur) p.vy *= -1;
        }
      }

      const distanceMax = 150;
      for (let i = 0; i < particules.length; i++) {
        for (let j = i + 1; j < particules.length; j++) {
          const a = particules[i];
          const b = particules[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < distanceMax) {
            ctx!.strokeStyle = `rgba(99, 102, 241, ${0.18 * (1 - distance / distanceMax)})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      for (const p of particules) {
        ctx!.fillStyle = "#4f46e5";
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (!reduireMouvement) {
        animationId = requestAnimationFrame(dessiner);
      }
    }

    redimensionner();
    initParticules();
    dessiner();

    function surRedimensionnement() {
      redimensionner();
      initParticules();
      if (reduireMouvement) dessiner();
    }
    window.addEventListener("resize", surRedimensionnement);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener("resize", surRedimensionnement);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-70" />;
}
