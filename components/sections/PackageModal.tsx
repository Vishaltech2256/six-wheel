'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, Phone, MessageCircle, ArrowRight } from 'lucide-react';

interface PackageModalProps {
  packageId: string | null;
  packageName?: string;
  onClose: () => void;
}

export const PackageModal: React.FC<PackageModalProps> = ({
  packageId,
  packageName = 'Tour Package',
  onClose,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Close on Escape & lock body scroll
  useEffect(() => {
    if (!packageId) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [packageId, onClose]);

  // Road Map Bézier Path and Scroll Tracking
  useEffect(() => {
    if (!packageId || packageId !== 'munnar') return;

    const root = containerRef.current;
    const scrollEl = scrollContainerRef.current;
    if (!root || !scrollEl) return;

    const road = root.querySelector<HTMLElement>('.road');
    if (!road) return;

    const svg = road.querySelector<SVGSVGElement>('.trace');
    if (!svg) return;

    const paths = svg.querySelectorAll<SVGPathElement>('path');
    const P = svg.querySelector<SVGPathElement>('.prog');
    if (!P) return;

    const stops = Array.from(road.querySelectorAll<HTMLElement>('.stop'));
    const jeep = road.querySelector<HTMLElement>('.jeep');
    const a = road.querySelector<HTMLElement>('.start');
    const z = road.querySelector<HTMLElement>('.finish');

    if (!jeep || !a || !z || stops.length === 0) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let pts: [number, number][] = [];
    let len = 0;
    let H = 0;
    let busy = false;

    function build() {
      if (!road || !svg || !P || !a || !z) return;
      const r = road.getBoundingClientRect();
      H = r.height;
      if (H === 0 || r.width === 0) return;

      pts = stops.map((s) => {
        const mk = s.querySelector<HTMLElement>('.mk');
        if (!mk) return [0, 0] as [number, number];
        const b = mk.getBoundingClientRect();
        return [b.left + b.width / 2 - r.left, b.top + b.height / 2 - r.top] as [number, number];
      });

      if (!pts[0]) return;

      let d = 'M' + pts[0][0] + ' ' + (a.offsetTop + a.offsetHeight - 6) + ' L' + pts[0][0] + ' ' + pts[0][1];
      for (let i = 1; i < pts.length; i++) {
        const p = pts[i - 1];
        const q = pts[i];
        const k = (q[1] - p[1]) / 2;
        d += ' C' + p[0] + ' ' + (p[1] + k) + ' ' + q[0] + ' ' + (q[1] - k) + ' ' + q[0] + ' ' + q[1];
      }
      const e = pts[pts.length - 1];
      d += ' L' + e[0] + ' ' + (z.offsetTop + 6);

      svg.setAttribute('viewBox', '0 0 ' + r.width + ' ' + H);
      for (let j = 0; j < paths.length; j++) {
        paths[j].setAttribute('d', d);
      }

      len = P.getTotalLength();
      P.style.strokeDasharray = String(len);
      road.classList.add('live');
      update();
    }

    function update() {
      busy = false;
      if (!len || !P || !jeep || !road || !scrollEl) return;
      const rTop = road.getBoundingClientRect().top;
      const viewH = scrollEl.clientHeight || window.innerHeight;
      const ty = reduce ? H : Math.min(H, Math.max(0, viewH * 0.55 - rTop));
      let lo = 0;
      let hi = len;
      for (let i = 0; i < 22; i++) {
        const m = (lo + hi) / 2;
        if (P.getPointAtLength(m).y < ty) lo = m;
        else hi = m;
      }
      const pt = P.getPointAtLength(lo);
      P.style.strokeDashoffset = String(len - lo);
      jeep.style.transform = `translate(${pt.x}px,${pt.y}px) translate(-50%,-50%)`;

      let cur = -1;
      stops.forEach((s, i) => {
        const on = pts[i] ? pts[i][1] <= pt.y + 1 : false;
        if (on) cur = i;
        s.classList.toggle('on', on);
      });
      stops.forEach((s, i) => {
        s.classList.toggle('now', i === cur);
      });
    }

    const onScroll = () => {
      if (!busy) {
        busy = true;
        requestAnimationFrame(update);
      }
    };

    if (!reduce) {
      scrollEl.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        build();
      });
      ro.observe(road);
    } else {
      window.addEventListener('resize', build);
    }

    const timer = setTimeout(build, 120);

    return () => {
      clearTimeout(timer);
      scrollEl.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', onScroll);
      if (ro) {
        ro.disconnect();
      } else {
        window.removeEventListener('resize', build);
      }
    };
  }, [packageId]);

  if (!packageId) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex flex-col bg-navy-950/85 backdrop-blur-md animate-in fade-in duration-300"
    >
      {/* Sticky Top Header Navigation */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-8 py-3.5 bg-navy-950/95 border-b border-gold/25 backdrop-blur-md shadow-lg">
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Sixwheel Holidays"
            width={38}
            height={38}
            className="rounded-full border border-gold/40 shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] tracking-widest uppercase font-semibold text-gold">
                Sixwheel Holidays
              </span>
              <span className="w-1 h-1 rounded-full bg-gold/50" />
              <span className="text-[10px] tracking-wider uppercase text-ivory/70">
                Package Details
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-serif text-ivory font-medium line-clamp-1">
              {packageId === 'munnar' ? 'One Day in Munnar • Day Excursion' : packageName}
            </h2>
          </div>
        </div>

        <button
          onClick={onClose}
          type="button"
          aria-label="Close Package Details"
          className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-gold hover:text-navy border border-white/20 hover:border-gold text-ivory text-xs font-semibold uppercase tracking-wider transition-all duration-200"
        >
          <span className="hidden sm:inline">Close</span>
          <X size={16} className="group-hover:rotate-90 transition-transform duration-200" />
        </button>
      </header>

      {/* Scrollable Package Container */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto overscroll-contain bg-navy-950"
      >
        <div className="max-w-5xl mx-auto my-0 sm:my-8 sm:px-4">
          <div className="bg-ivory text-ink rounded-none sm:rounded-2xl overflow-hidden shadow-2xl border-0 sm:border border-gold/30">
            {packageId === 'munnar' ? (
              <div ref={containerRef} className="munnar-package-scope">
                <style jsx global>{`
                  .munnar-package-scope {
                    --pkg-navy: #0a1226;
                    --pkg-navy-2: #111d3d;
                    --pkg-gold: #c9a24a;
                    --pkg-gold-2: #e3c27a;
                    --pkg-ivory: #f7f4ee;
                    --pkg-paper: #ffffff;
                    --pkg-ink: #1a2036;
                    --pkg-muted: #6a7188;
                    --pkg-line: #e6e1d5;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    background: var(--pkg-ivory);
                    color: var(--pkg-ink);
                    line-height: 1.6;
                    -webkit-font-smoothing: antialiased;
                    position: relative;
                  }

                  .munnar-package-scope svg.i {
                    width: 1em;
                    height: 1em;
                    fill: none;
                    stroke: currentColor;
                    stroke-width: 1.8;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    flex-shrink: 0;
                  }

                  .munnar-package-scope .wrap {
                    max-width: 1080px;
                    margin: 0 auto;
                    padding: 0 24px;
                  }

                  /* HERO */
                  .munnar-package-scope .hero {
                    position: relative;
                    background: radial-gradient(120% 90% at 85% 10%, #33305e 0%, var(--pkg-navy-2) 45%, var(--pkg-navy) 100%);
                    color: #fff;
                    padding: 90px 0 130px;
                    overflow: hidden;
                  }

                  .munnar-package-scope .hero .wrap {
                    display: grid;
                    grid-template-columns: 1.25fr 0.75fr;
                    gap: 40px;
                    align-items: center;
                    position: relative;
                    z-index: 2;
                  }

                  .munnar-package-scope .eyebrow {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    color: var(--pkg-gold-2);
                    font-size: 12px;
                    letter-spacing: 4px;
                    text-transform: uppercase;
                    margin-bottom: 22px;
                    font-weight: 600;
                  }

                  .munnar-package-scope .eyebrow::before {
                    content: '';
                    width: 38px;
                    height: 1px;
                    background: var(--pkg-gold);
                  }

                  .munnar-package-scope .hero h1 {
                    font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
                    font-weight: 500;
                    font-size: clamp(34px, 5.5vw, 62px);
                    line-height: 1.08;
                    letter-spacing: -0.5px;
                  }

                  .munnar-package-scope .hero h1 span {
                    color: var(--pkg-gold-2);
                    font-style: italic;
                  }

                  .munnar-package-scope .hero p.lead {
                    margin-top: 20px;
                    max-width: 520px;
                    color: #c3c9de;
                    font-size: 16px;
                    line-height: 1.6;
                  }

                  .munnar-package-scope .hero-cta {
                    margin-top: 30px;
                    display: flex;
                    gap: 14px;
                    flex-wrap: wrap;
                  }

                  .munnar-package-scope .btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 13px 26px;
                    font-size: 12px;
                    letter-spacing: 1.8px;
                    text-transform: uppercase;
                    text-decoration: none;
                    font-weight: 600;
                    border-radius: 2px;
                    transition: all 0.2s ease;
                  }

                  .munnar-package-scope .btn.gold {
                    background: var(--pkg-gold);
                    color: var(--pkg-navy);
                  }

                  .munnar-package-scope .btn.gold:hover {
                    background: var(--pkg-gold-2);
                    transform: translateY(-1px);
                  }

                  .munnar-package-scope .btn.ghost {
                    border: 1px solid rgba(255, 255, 255, 0.45);
                    color: #fff;
                  }

                  .munnar-package-scope .btn.ghost:hover {
                    background: rgba(255, 255, 255, 0.1);
                  }

                  .munnar-package-scope .hero-logo {
                    justify-self: center;
                    position: relative;
                  }

                  .munnar-package-scope .hero-logo::before {
                    content: '';
                    position: absolute;
                    inset: -22px;
                    border-radius: 50%;
                    border: 1px solid rgba(201, 162, 74, 0.35);
                  }

                  .munnar-package-scope .hero-logo::after {
                    content: '';
                    position: absolute;
                    inset: -44px;
                    border-radius: 50%;
                    border: 1px solid rgba(201, 162, 74, 0.15);
                  }

                  .munnar-package-scope .hero-logo img {
                    width: 100%;
                    max-width: 250px;
                    border-radius: 50%;
                    display: block;
                    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.55);
                  }

                  .munnar-package-scope .hills {
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: -1px;
                    width: 100%;
                    height: 130px;
                    z-index: 1;
                    pointer-events: none;
                  }

                  /* INFO BAR */
                  .munnar-package-scope .info {
                    position: relative;
                    z-index: 3;
                    margin-top: -50px;
                  }

                  .munnar-package-scope .info-grid {
                    background: var(--pkg-paper);
                    box-shadow: 0 20px 50px rgba(10, 18, 38, 0.12);
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    border-top: 3px solid var(--pkg-gold);
                    border-radius: 2px;
                  }

                  .munnar-package-scope .info-item {
                    padding: 22px 20px;
                    display: flex;
                    gap: 14px;
                    align-items: center;
                    border-right: 1px solid var(--pkg-line);
                  }

                  .munnar-package-scope .info-item:last-child {
                    border-right: 0;
                  }

                  .munnar-package-scope .info-item .i {
                    font-size: 24px;
                    color: var(--pkg-gold);
                  }

                  .munnar-package-scope .info-item small {
                    display: block;
                    font-size: 10.5px;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    color: var(--pkg-muted);
                  }

                  .munnar-package-scope .info-item strong {
                    font-size: 16px;
                    font-weight: 600;
                    color: var(--pkg-ink);
                  }

                  /* SECTIONS */
                  .munnar-package-scope section.block {
                    padding: 80px 0 20px;
                  }

                  .munnar-package-scope .sec-head {
                    text-align: center;
                    margin-bottom: 50px;
                  }

                  .munnar-package-scope .sec-head .kicker {
                    font-size: 11px;
                    letter-spacing: 4px;
                    text-transform: uppercase;
                    color: var(--pkg-gold);
                    font-weight: 600;
                  }

                  .munnar-package-scope .sec-head h2 {
                    font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
                    font-weight: 500;
                    font-size: clamp(26px, 3.8vw, 38px);
                    margin-top: 10px;
                  }

                  .munnar-package-scope .sec-head h2::after {
                    content: '';
                    display: block;
                    width: 54px;
                    height: 2px;
                    background: var(--pkg-gold);
                    margin: 16px auto 0;
                  }

                  .munnar-package-scope .sec-head p {
                    color: var(--pkg-muted);
                    margin-top: 14px;
                    font-size: 15px;
                  }

                  /* ROAD MAP */
                  .munnar-package-scope .road {
                    position: relative;
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 60px 0;
                  }

                  .munnar-package-scope .road svg.trace {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    overflow: visible;
                    pointer-events: none;
                  }

                  .munnar-package-scope .road path {
                    fill: none;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                  }

                  .munnar-package-scope .road .shoulder {
                    stroke: rgba(201, 162, 74, 0.45);
                    stroke-width: 44;
                  }

                  .munnar-package-scope .road .asp {
                    stroke: #16264d;
                    stroke-width: 32;
                  }

                  .munnar-package-scope .road .dash {
                    stroke: rgba(247, 244, 238, 0.6);
                    stroke-width: 2;
                    stroke-dasharray: 8 10;
                    stroke-linecap: butt;
                  }

                  .munnar-package-scope .road .prog {
                    stroke: var(--pkg-gold);
                    stroke-width: 3;
                  }

                  .munnar-package-scope .end {
                    position: absolute;
                    z-index: 3;
                    transform: translateX(-50%);
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: var(--pkg-gold);
                    color: var(--pkg-navy);
                    font-size: 11px;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    font-weight: 700;
                    padding: 8px 15px;
                    border-radius: 30px;
                    white-space: nowrap;
                    box-shadow: 0 8px 20px rgba(10, 18, 38, 0.15);
                  }

                  .munnar-package-scope .end.start {
                    top: 0;
                    left: 36%;
                  }

                  .munnar-package-scope .end.finish {
                    bottom: 0;
                    left: 64%;
                  }

                  .munnar-package-scope .jeep {
                    position: absolute;
                    left: 0;
                    top: 0;
                    z-index: 4;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: var(--pkg-gold);
                    color: var(--pkg-navy);
                    display: grid;
                    place-items: center;
                    font-size: 19px;
                    border: 3px solid #fff;
                    box-shadow: 0 0 0 6px rgba(201, 162, 74, 0.3), 0 8px 18px rgba(10, 18, 38, 0.4);
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.4s;
                  }

                  .munnar-package-scope .road.live .jeep {
                    opacity: 1;
                  }

                  .munnar-package-scope ol.stops {
                    list-style: none;
                    position: relative;
                  }

                  .munnar-package-scope .stop {
                    position: relative;
                    z-index: 2;
                    min-height: 165px;
                  }

                  .munnar-package-scope .stop:nth-child(4) {
                    min-height: 200px;
                  }

                  .munnar-package-scope .stop::before {
                    content: attr(data-n);
                    position: absolute;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                    font: 500 88px/1 'Cormorant Garamond', Georgia, serif;
                    color: transparent;
                    -webkit-text-stroke: 1px rgba(201, 162, 74, 0.5);
                    pointer-events: none;
                  }

                  .munnar-package-scope .stop:nth-child(even)::before {
                    left: auto;
                    right: 0;
                  }

                  .munnar-package-scope .mk {
                    position: absolute;
                    top: 50%;
                    left: 36%;
                    width: 54px;
                    height: 54px;
                    margin: -27px 0 0 -27px;
                    border-radius: 50%;
                    background: var(--pkg-ivory);
                    border: 2px solid var(--pkg-gold);
                    color: var(--pkg-navy);
                    display: grid;
                    place-items: center;
                    font-size: 22px;
                    box-shadow: 0 0 0 6px rgba(201, 162, 74, 0.25), 0 10px 24px rgba(10, 18, 38, 0.25);
                    transition: background 0.4s, box-shadow 0.4s;
                  }

                  .munnar-package-scope .stop:nth-child(even) .mk {
                    left: 64%;
                  }

                  .munnar-package-scope .stop.on .mk {
                    background: var(--pkg-gold);
                  }

                  .munnar-package-scope .stop .card {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left: calc(36% + 80px);
                    width: min(410px, calc(64% - 80px));
                    transition: box-shadow 0.4s;
                    background: var(--pkg-paper);
                    border: 1px solid var(--pkg-line);
                    border-left: 3px solid var(--pkg-gold);
                    padding: 18px 22px;
                    border-radius: 2px;
                  }

                  .munnar-package-scope .stop:nth-child(even) .card {
                    left: auto;
                    right: calc(36% + 80px);
                    border-left: 1px solid var(--pkg-line);
                    border-right: 3px solid var(--pkg-gold);
                  }

                  .munnar-package-scope .stop .card::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: -52px;
                    width: 48px;
                    height: 1px;
                    background: var(--pkg-gold);
                  }

                  .munnar-package-scope .stop:nth-child(even) .card::before {
                    left: auto;
                    right: -52px;
                  }

                  .munnar-package-scope .stop .no {
                    display: none;
                    font-family: Georgia, serif;
                    font-size: 11px;
                    letter-spacing: 3px;
                    color: var(--pkg-gold);
                    font-weight: 700;
                  }

                  .munnar-package-scope .stop h3 {
                    font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
                    font-size: 21px;
                    font-weight: 600;
                    color: var(--pkg-ink);
                  }

                  .munnar-package-scope .stop p {
                    color: var(--pkg-muted);
                    font-size: 14px;
                    margin-top: 4px;
                  }

                  .munnar-package-scope .chip {
                    background: var(--pkg-navy);
                    color: var(--pkg-gold-2);
                    font-size: 11.5px;
                    letter-spacing: 1.5px;
                    padding: 7px 14px;
                    white-space: nowrap;
                    display: inline-flex;
                    gap: 8px;
                    align-items: center;
                    margin-top: 10px;
                    border-radius: 2px;
                  }

                  /* DAY JOURNEY: sunrise to night */
                  .munnar-package-scope #itinerary-inner {
                    position: relative;
                    overflow: hidden;
                    padding-bottom: 160px;
                    background: linear-gradient(
                      180deg,
                      var(--pkg-ivory) 0%,
                      #f6e6c1 22%,
                      #e8ecf6 42%,
                      #8a90b8 60%,
                      #2b3664 76%,
                      var(--pkg-navy) 92%
                    );
                  }

                  .munnar-package-scope #itinerary-inner .wrap {
                    position: relative;
                    z-index: 1;
                  }

                  .munnar-package-scope #itinerary-inner::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    height: 48%;
                    z-index: 0;
                    pointer-events: none;
                    -webkit-mask-image: linear-gradient(transparent, #000 50%);
                    mask-image: linear-gradient(transparent, #000 50%);
                    background-image: radial-gradient(circle 2px at 12% 20%, #fff 40%, transparent),
                      radial-gradient(circle 1.5px at 28% 58%, #fff 40%, transparent),
                      radial-gradient(circle 2px at 44% 12%, #e3c27a 40%, transparent),
                      radial-gradient(circle 1.5px at 63% 36%, #fff 40%, transparent),
                      radial-gradient(circle 2px at 78% 22%, #fff 40%, transparent),
                      radial-gradient(circle 1.5px at 91% 48%, #e3c27a 40%, transparent),
                      radial-gradient(circle 1.5px at 6% 70%, #fff 40%, transparent),
                      radial-gradient(circle 2px at 52% 64%, #fff 40%, transparent),
                      radial-gradient(circle 1.5px at 86% 78%, #fff 40%, transparent),
                      radial-gradient(circle 1.5px at 35% 84%, #e3c27a 40%, transparent);
                  }

                  .munnar-package-scope .sun {
                    position: absolute;
                    z-index: 0;
                    top: 50px;
                    right: 8%;
                    width: 68px;
                    height: 68px;
                    border-radius: 50%;
                    background: radial-gradient(circle at 40% 40%, #fff3c9, var(--pkg-gold-2));
                    box-shadow: 0 0 65px 22px rgba(227, 194, 122, 0.55);
                  }

                  .munnar-package-scope .moon {
                    position: absolute;
                    z-index: 0;
                    bottom: 280px;
                    right: 8%;
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    box-shadow: inset -14px -5px 0 0 #f4ecd6;
                    filter: drop-shadow(0 0 14px rgba(244, 236, 214, 0.55));
                  }

                  .munnar-package-scope .ridge {
                    position: absolute;
                    left: 0;
                    bottom: -1px;
                    width: 100%;
                    height: 140px;
                    z-index: 0;
                    pointer-events: none;
                  }

                  .munnar-package-scope .stop.now .card {
                    box-shadow: 0 20px 44px rgba(10, 18, 38, 0.3), 0 0 0 1px var(--pkg-gold);
                  }

                  .munnar-package-scope .stop.now .mk {
                    box-shadow: 0 0 0 8px rgba(201, 162, 74, 0.5), 0 10px 24px rgba(10, 18, 38, 0.3);
                  }

                  @media (max-width: 860px) {
                    .munnar-package-scope #itinerary-inner {
                      padding-bottom: 130px;
                    }
                    .munnar-package-scope .moon {
                      display: none;
                    }
                    .munnar-package-scope .sun {
                      width: 48px;
                      height: 48px;
                      top: 30px;
                      right: 5%;
                    }
                    .munnar-package-scope .road {
                      padding: 50px 0;
                    }
                    .munnar-package-scope .road .shoulder {
                      stroke-width: 32;
                    }
                    .munnar-package-scope .road .asp {
                      stroke-width: 22;
                    }
                    .munnar-package-scope .end.start,
                    .munnar-package-scope .end.finish {
                      left: 0;
                      transform: none;
                    }
                    .munnar-package-scope .stop {
                      min-height: 0;
                      padding: 12px 0 12px 84px;
                    }
                    .munnar-package-scope .stop::before,
                    .munnar-package-scope .stop .card::before {
                      display: none;
                    }
                    .munnar-package-scope .mk {
                      left: 28px;
                      width: 44px;
                      height: 44px;
                      margin: -22px 0 0 -22px;
                      font-size: 19px;
                      box-shadow: 0 0 0 5px var(--pkg-ivory);
                    }
                    .munnar-package-scope .stop:nth-child(even) .mk {
                      left: 44px;
                    }
                    .munnar-package-scope .stop .card,
                    .munnar-package-scope .stop:nth-child(even) .card {
                      position: static;
                      transform: none;
                      width: auto;
                      border: 1px solid var(--pkg-line);
                      border-left: 3px solid var(--pkg-gold);
                      padding: 15px 16px;
                    }
                    .munnar-package-scope .stop .no {
                      display: block;
                    }
                  }

                  /* INCLUDED */
                  .munnar-package-scope .inc {
                    background: var(--pkg-navy);
                    color: #fff;
                    margin-top: 0;
                    padding: 80px 0;
                    position: relative;
                  }

                  .munnar-package-scope .inc .sec-head h2 {
                    color: #fff;
                  }

                  .munnar-package-scope .inc .sec-head {
                    margin-bottom: 42px;
                  }

                  .munnar-package-scope .inc-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
                    gap: 16px;
                    max-width: 900px;
                    margin: 0 auto;
                  }

                  .munnar-package-scope .inc-item {
                    display: flex;
                    gap: 14px;
                    align-items: center;
                    padding: 18px 20px;
                    border: 1px solid rgba(201, 162, 74, 0.3);
                    background: rgba(255, 255, 255, 0.03);
                    border-radius: 2px;
                  }

                  .munnar-package-scope .inc-item .tick {
                    width: 26px;
                    height: 26px;
                    border-radius: 50%;
                    background: var(--pkg-gold);
                    color: var(--pkg-navy);
                    display: grid;
                    place-items: center;
                    font-size: 14px;
                    flex-shrink: 0;
                  }

                  .munnar-package-scope .inc-item span {
                    font-size: 15px;
                    font-weight: 500;
                  }

                  /* CTA */
                  .munnar-package-scope .cta {
                    padding: 80px 0;
                    background: var(--pkg-ivory);
                  }

                  .munnar-package-scope .cta-box {
                    border: 1px solid var(--pkg-gold);
                    background: var(--pkg-paper);
                    padding: 50px 24px;
                    text-align: center;
                    position: relative;
                    box-shadow: 0 20px 50px rgba(10, 18, 38, 0.08);
                    border-radius: 2px;
                  }

                  .munnar-package-scope .cta-box::before {
                    content: '';
                    position: absolute;
                    inset: 8px;
                    border: 1px solid var(--pkg-line);
                    pointer-events: none;
                  }

                  .munnar-package-scope .cta-box h2 {
                    font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
                    font-weight: 500;
                    font-size: clamp(26px, 3.8vw, 36px);
                    color: var(--pkg-ink);
                  }

                  .munnar-package-scope .cta-box p {
                    color: var(--pkg-muted);
                    margin: 12px auto 26px;
                    max-width: 460px;
                    font-size: 15.5px;
                  }

                  .munnar-package-scope .cta-box .btns {
                    display: flex;
                    gap: 14px;
                    justify-content: center;
                    flex-wrap: wrap;
                    position: relative;
                    z-index: 2;
                  }

                  .munnar-package-scope .btn.navy {
                    background: var(--pkg-navy);
                    color: #fff;
                  }

                  .munnar-package-scope .btn.navy:hover {
                    background: var(--pkg-navy-2);
                    transform: translateY(-1px);
                  }

                  .munnar-package-scope .btn.outline {
                    border: 1px solid var(--pkg-navy);
                    color: var(--pkg-navy);
                  }

                  .munnar-package-scope .btn.outline:hover {
                    background: var(--pkg-navy);
                    color: #fff;
                    transform: translateY(-1px);
                  }

                  @media (max-width: 860px) {
                    .munnar-package-scope .hero {
                      padding: 70px 0 110px;
                    }
                    .munnar-package-scope .hero .wrap {
                      grid-template-columns: 1fr;
                      text-align: left;
                    }
                    .munnar-package-scope .hero-logo {
                      order: -1;
                      justify-self: start;
                    }
                    .munnar-package-scope .hero-logo img {
                      max-width: 120px;
                    }
                    .munnar-package-scope .hero-logo::before {
                      inset: -10px;
                    }
                    .munnar-package-scope .hero-logo::after {
                      display: none;
                    }
                    .munnar-package-scope .info-grid {
                      grid-template-columns: repeat(2, 1fr);
                    }
                    .munnar-package-scope .info-item:nth-child(2) {
                      border-right: 0;
                    }
                    .munnar-package-scope .info-item:nth-child(-n + 2) {
                      border-bottom: 1px solid var(--pkg-line);
                    }
                  }

                  @media (max-width: 560px) {
                    .munnar-package-scope .info-item {
                      padding: 18px 14px;
                      gap: 10px;
                    }
                    .munnar-package-scope .info-item strong {
                      font-size: 14px;
                    }
                  }
                `}</style>

                {/* SVG Icon Sprites */}
                <svg width="0" height="0" className="absolute pointer-events-none opacity-0">
                  <defs>
                    <symbol id="modal-pkg-pin" viewBox="0 0 24 24">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </symbol>
                    <symbol id="modal-pkg-clock" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </symbol>
                    <symbol id="modal-pkg-cal" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </symbol>
                    <symbol id="modal-pkg-phone" viewBox="0 0 24 24">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </symbol>
                    <symbol id="modal-pkg-chat" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </symbol>
                    <symbol id="modal-pkg-check" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </symbol>
                    <symbol id="modal-pkg-bus" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="13" rx="2" />
                      <line x1="3" y1="11" x2="21" y2="11" />
                      <circle cx="7.5" cy="19.5" r="1.5" />
                      <circle cx="16.5" cy="19.5" r="1.5" />
                    </symbol>
                    <symbol id="modal-pkg-cup" viewBox="0 0 24 24">
                      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                      <line x1="6" y1="1" x2="6" y2="4" />
                      <line x1="10" y1="1" x2="10" y2="4" />
                      <line x1="14" y1="1" x2="14" y2="4" />
                    </symbol>
                    <symbol id="modal-pkg-sun" viewBox="0 0 24 24">
                      <path d="M17 18a5 5 0 0 0-10 0" />
                      <line x1="12" y1="2" x2="12" y2="9" />
                      <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
                      <line x1="1" y1="18" x2="3" y2="18" />
                      <line x1="21" y1="18" x2="23" y2="18" />
                      <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
                      <line x1="23" y1="22" x2="1" y2="22" />
                    </symbol>
                    <symbol id="modal-pkg-compass" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                    </symbol>
                    <symbol id="modal-pkg-fork" viewBox="0 0 24 24">
                      <path d="M5 2v7a3 3 0 0 0 3 3v10" />
                      <path d="M8 2v7" />
                      <path d="M11 2v7a3 3 0 0 1-3 3" />
                      <path d="M18 22V2c-3 1-5 4-5 8 0 2 1 3 3 3h2" />
                    </symbol>
                    <symbol id="modal-pkg-flame" viewBox="0 0 24 24">
                      <path d="M12 2c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-6 1-9z" />
                    </symbol>
                    <symbol id="modal-pkg-back" viewBox="0 0 24 24">
                      <line x1="19" y1="12" x2="5" y2="12" />
                      <polyline points="12 19 5 12 12 5" />
                    </symbol>
                  </defs>
                </svg>

                {/* HERO BANNER */}
                <header className="hero">
                  <div className="wrap">
                    <div>
                      <div className="eyebrow">Day Excursion Package</div>
                      <h1>
                        One Day in <span>Munnar</span>
                      </h1>
                      <p className="lead">
                        A thoughtfully planned day in the Western Ghats: jeep safari through misty hills and tea country, curated meals, and an evening fire camp, with comfortable pickup and drop from Coimbatore.
                      </p>
                      <div className="hero-cta">
                        <a
                          className="btn gold"
                          href="https://wa.me/917639341779?text=Hi%20Mohan%2C%20I%20would%20like%20to%20enquire%20about%20the%20One%20Day%20Munnar%20Excursion%20Package."
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg className="i">
                            <use href="#modal-pkg-chat" />
                          </svg>
                          Enquire Now
                        </a>
                        <a className="btn ghost" href="#itinerary-inner">
                          View Itinerary
                        </a>
                      </div>
                    </div>
                    <div className="hero-logo">
                      <Image
                        src="/logo.png"
                        alt="Sixwheel Holidays"
                        width={250}
                        height={250}
                        className="rounded-full"
                        priority
                      />
                    </div>
                  </div>

                  {/* Scenic Wave Separator */}
                  <svg className="hills" viewBox="0 0 1440 150" preserveAspectRatio="none" aria-hidden="true">
                    <path
                      d="M0 95 C 140 40, 260 120, 420 80 S 700 20, 860 70 S 1180 130, 1440 60 L1440 150 L0 150Z"
                      fill="#16264d"
                      opacity=".75"
                    />
                    <path
                      d="M0 120 C 180 80, 320 140, 520 110 S 860 70, 1040 110 S 1300 130, 1440 100 L1440 150 L0 150Z"
                      fill="#0f1c3d"
                    />
                    <path
                      d="M0 142 C 240 118, 460 150, 720 132 S 1180 120, 1440 140 L1440 150 L0 150Z"
                      fill="#f7f4ee"
                    />
                  </svg>
                </header>

                {/* INFO BAR */}
                <div className="info">
                  <div className="wrap">
                    <div className="info-grid">
                      <div className="info-item">
                        <svg className="i">
                          <use href="#modal-pkg-pin" />
                        </svg>
                        <div>
                          <small>Destination</small>
                          <strong>Munnar</strong>
                        </div>
                      </div>
                      <div className="info-item">
                        <svg className="i">
                          <use href="#modal-pkg-bus" />
                        </svg>
                        <div>
                          <small>Pickup</small>
                          <strong>Coimbatore</strong>
                        </div>
                      </div>
                      <div className="info-item">
                        <svg className="i">
                          <use href="#modal-pkg-cal" />
                        </svg>
                        <div>
                          <small>Duration</small>
                          <strong>One Day</strong>
                        </div>
                      </div>
                      <div className="info-item">
                        <svg className="i">
                          <use href="#modal-pkg-back" />
                        </svg>
                        <div>
                          <small>Drop</small>
                          <strong>Coimbatore</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ITINERARY / ROAD MAP */}
                <section className="block" id="itinerary-inner">
                  <i className="sun" aria-hidden="true" />
                  <i className="moon" aria-hidden="true" />
                  <svg className="ridge" viewBox="0 0 1440 150" preserveAspectRatio="none" aria-hidden="true">
                    <path
                      d="M0 80 C 160 30, 300 100, 470 60 S 760 10, 940 55 S 1230 100, 1440 40 L1440 150 L0 150Z"
                      fill="#1b2c5a"
                      opacity=".8"
                    />
                    <path
                      d="M0 108 C 200 70, 340 128, 560 98 S 900 60, 1090 98 S 1320 120, 1440 92 L1440 150 L0 150Z"
                      fill="#111d3d"
                    />
                    <path
                      d="M0 140 C 260 120, 480 150, 740 134 S 1190 124, 1440 140 L1440 150 L0 150Z"
                      fill="#0a1226"
                    />
                  </svg>

                  <div className="wrap">
                    <div className="sec-head">
                      <div className="kicker">Itinerary</div>
                      <h2>Your Road Map</h2>
                      <p>Follow the route from Coimbatore up into the hills and back, stop by stop.</p>
                    </div>

                    <div className="road">
                      <svg className="trace" aria-hidden="true">
                        <path className="shoulder" />
                        <path className="asp" />
                        <path className="dash" />
                        <path className="prog" />
                      </svg>

                      <div className="end start">
                        <svg className="i">
                          <use href="#modal-pkg-pin" />
                        </svg>
                        Depart Coimbatore
                      </div>

                      <div className="jeep" aria-hidden="true">
                        <svg className="i">
                          <use href="#modal-pkg-bus" />
                        </svg>
                      </div>

                      <ol className="stops">
                        <li className="stop" data-n="01">
                          <div className="mk">
                            <svg className="i">
                              <use href="#modal-pkg-bus" />
                            </svg>
                          </div>
                          <div className="card">
                            <div className="no">01</div>
                            <h3>Travel to Munnar</h3>
                            <p>Pickup from Coimbatore and a scenic drive up to the hills.</p>
                          </div>
                        </li>

                        <li className="stop" data-n="02">
                          <div className="mk">
                            <svg className="i">
                              <use href="#modal-pkg-cup" />
                            </svg>
                          </div>
                          <div className="card">
                            <div className="no">02</div>
                            <h3>Morning Refreshment</h3>
                            <p>Tea or coffee to begin the day.</p>
                          </div>
                        </li>

                        <li className="stop" data-n="03">
                          <div className="mk">
                            <svg className="i">
                              <use href="#modal-pkg-sun" />
                            </svg>
                          </div>
                          <div className="card">
                            <div className="no">03</div>
                            <h3>Breakfast</h3>
                            <p>A hearty breakfast before the sightseeing begins.</p>
                          </div>
                        </li>

                        <li className="stop" data-n="04">
                          <div className="mk">
                            <svg className="i">
                              <use href="#modal-pkg-compass" />
                            </svg>
                          </div>
                          <div className="card">
                            <div className="no">04</div>
                            <h3>Jeep Ride</h3>
                            <p>Explore Munnar’s viewpoints and tea landscapes by jeep.</p>
                            <div className="chip">
                              <svg className="i">
                                <use href="#modal-pkg-clock" />
                              </svg>
                              10 AM – 6 PM
                            </div>
                          </div>
                        </li>

                        <li className="stop" data-n="05">
                          <div className="mk">
                            <svg className="i">
                              <use href="#modal-pkg-fork" />
                            </svg>
                          </div>
                          <div className="card">
                            <div className="no">05</div>
                            <h3>Lunch</h3>
                            <p>Served on the way, along the route.</p>
                          </div>
                        </li>

                        <li className="stop" data-n="06">
                          <div className="mk">
                            <svg className="i">
                              <use href="#modal-pkg-flame" />
                            </svg>
                          </div>
                          <div className="card">
                            <div className="no">06</div>
                            <h3>Fire Camp</h3>
                            <p>An evening bonfire in the cool mountain air.</p>
                          </div>
                        </li>

                        <li className="stop" data-n="07">
                          <div className="mk">
                            <svg className="i">
                              <use href="#modal-pkg-fork" />
                            </svg>
                          </div>
                          <div className="card">
                            <div className="no">07</div>
                            <h3>Dinner</h3>
                            <p>A warm dinner to close out the day.</p>
                          </div>
                        </li>

                        <li className="stop" data-n="08">
                          <div className="mk">
                            <svg className="i">
                              <use href="#modal-pkg-back" />
                            </svg>
                          </div>
                          <div className="card">
                            <div className="no">08</div>
                            <h3>Return to Coimbatore</h3>
                            <p>A comfortable drop back to Coimbatore.</p>
                          </div>
                        </li>
                      </ol>

                      <div className="end finish">
                        <svg className="i">
                          <use href="#modal-pkg-pin" />
                        </svg>
                        Arrive Coimbatore
                      </div>
                    </div>
                  </div>
                </section>

                {/* PACKAGE INCLUSIONS */}
                <section className="inc">
                  <div className="wrap">
                    <div className="sec-head">
                      <div className="kicker">Package Inclusions</div>
                      <h2>What&apos;s Included</h2>
                    </div>
                    <div className="inc-grid">
                      <div className="inc-item">
                        <div className="tick">
                          <svg className="i">
                            <use href="#modal-pkg-check" />
                          </svg>
                        </div>
                        <span>Pickup &amp; Drop – Coimbatore</span>
                      </div>
                      <div className="inc-item">
                        <div className="tick">
                          <svg className="i">
                            <use href="#modal-pkg-check" />
                          </svg>
                        </div>
                        <span>Morning Refreshment</span>
                      </div>
                      <div className="inc-item">
                        <div className="tick">
                          <svg className="i">
                            <use href="#modal-pkg-check" />
                          </svg>
                        </div>
                        <span>Breakfast</span>
                      </div>
                      <div className="inc-item">
                        <div className="tick">
                          <svg className="i">
                            <use href="#modal-pkg-check" />
                          </svg>
                        </div>
                        <span>Jeep Ride (10 AM – 6 PM)</span>
                      </div>
                      <div className="inc-item">
                        <div className="tick">
                          <svg className="i">
                            <use href="#modal-pkg-check" />
                          </svg>
                        </div>
                        <span>Lunch on the way</span>
                      </div>
                      <div className="inc-item">
                        <div className="tick">
                          <svg className="i">
                            <use href="#modal-pkg-check" />
                          </svg>
                        </div>
                        <span>Fire Camp</span>
                      </div>
                      <div className="inc-item">
                        <div className="tick">
                          <svg className="i">
                            <use href="#modal-pkg-check" />
                          </svg>
                        </div>
                        <span>Dinner</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* RESERVATIONS CTA */}
                <section className="cta" id="munnar-enquire">
                  <div className="wrap">
                    <div className="cta-box">
                      <div
                        className="kicker"
                        style={{
                          fontSize: '12px',
                          letterSpacing: '4px',
                          textTransform: 'uppercase',
                          color: 'var(--pkg-gold)',
                          fontWeight: 600,
                          marginBottom: '12px',
                          position: 'relative',
                        }}
                      >
                        Reservations
                      </div>
                      <h2>Plan Your Munnar Day Trip</h2>
                      <p>Speak directly with Mohan to confirm availability, dates and customized group arrangements.</p>
                      <div className="btns">
                        <a className="btn navy" href="tel:+917639341779">
                          <svg className="i">
                            <use href="#modal-pkg-phone" />
                          </svg>
                          +91 76393 41779
                        </a>
                        <a
                          className="btn outline"
                          href="https://wa.me/917639341779?text=Hi%20Mohan%2C%20I%20would%20like%20to%20book%20the%20One%20Day%20Munnar%20Excursion%20Package.%20Please%20share%20the%20available%20dates%20and%20details."
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg className="i">
                            <use href="#modal-pkg-chat" />
                          </svg>
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            ) : (
              /* Placeholder for upcoming packages that user will supply next */
              <div className="p-8 sm:p-14 text-center bg-navy-950 text-ivory">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-wider mb-6">
                  Custom Tour Package
                </div>
                <h3 className="font-serif text-2xl sm:text-4xl text-ivory font-light mb-4">
                  {packageName}
                </h3>
                <p className="text-sm sm:text-base text-stone max-w-lg mx-auto leading-relaxed mb-8">
                  The bespoke itinerary for this journey is ready for booking! Connect directly with Mohan for customized dates, private vehicle options, and instant group pricing.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="tel:+917639341779"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold hover:bg-gold-hover text-navy text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    <Phone size={15} />
                    <span>Call +91 76393 41779</span>
                  </a>
                  <a
                    href={`https://wa.me/917639341779?text=Hi%20Mohan%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(
                      packageName
                    )}%20package.%20Please%20share%20details.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold text-gold hover:bg-gold hover:text-navy text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    <MessageCircle size={15} />
                    <span>WhatsApp Mohan</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
