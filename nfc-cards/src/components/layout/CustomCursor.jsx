import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const mainCursorRef = useRef(null);
  const glowCursorRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const touchQuery = window.matchMedia('(pointer: coarse)');
    setIsMobile(touchQuery.matches);
    const onChange = (e) => setIsMobile(e.matches);
    
    if (touchQuery.addEventListener) {
      touchQuery.addEventListener('change', onChange);
    } else {
      touchQuery.addListener(onChange);
    }

    return () => {
      if (touchQuery.removeEventListener) {
        touchQuery.removeEventListener('change', onChange);
      } else {
        touchQuery.removeListener(onChange);
      }
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let lastMouseX = mouseX;
    let lastMouseY = mouseY;
    
    let mainX = mouseX;
    let mainY = mouseY;
    let glowX = mouseX;
    let glowY = mouseY;

    let speed = 0;
    let angle = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const dx = mouseX - lastMouseX;
      const dy = mouseY - lastMouseY;
      speed = Math.min(Math.sqrt(dx * dx + dy * dy) * 0.15, 1.8);
      angle = Math.atan2(dy, dx) * (180 / Math.PI);

      lastMouseX = mouseX;
      lastMouseY = mouseY;
    };

    const onMouseDown = () => {
      if (glowCursorRef.current) glowCursorRef.current.classList.add('cursor-clicked');
      if (mainCursorRef.current) mainCursorRef.current.classList.add('cursor-dot-clicked');
    };

    const onMouseUp = () => {
      if (glowCursorRef.current) glowCursorRef.current.classList.remove('cursor-clicked');
      if (mainCursorRef.current) mainCursorRef.current.classList.remove('cursor-dot-clicked');
    };

    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, [role="button"], input, select, textarea').forEach((el) => {
        el.addEventListener('mouseenter', () => {
          if (glowCursorRef.current) glowCursorRef.current.classList.add('cursor-hovered');
          if (mainCursorRef.current) mainCursorRef.current.classList.add('cursor-dot-hovered');
        });
        el.addEventListener('mouseleave', () => {
          if (glowCursorRef.current) glowCursorRef.current.classList.remove('cursor-hovered');
          if (mainCursorRef.current) mainCursorRef.current.classList.remove('cursor-dot-hovered');
        });
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    handleLinkHoverEvents();

    const observer = new MutationObserver(handleLinkHoverEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    let animationFrameId;
    const animateCursor = () => {
      mainX += (mouseX - mainX) * 0.35;
      mainY += (mouseY - mainY) * 0.35;

      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;

      speed *= 0.92;

      if (mainCursorRef.current) {
        mainCursorRef.current.style.transform = `translate3d(${mainX}px, ${mainY}px, 0)`;
      }

      if (glowCursorRef.current) {
        const scaleX = 1 + speed * 0.45;
        const scaleY = 1 - speed * 0.25;
        glowCursorRef.current.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;
      }

      animationFrameId = requestAnimationFrame(animateCursor);
    };

    animateCursor();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div className="hidden md:block pointer-events-none">
      <style>{`
        @media (min-width: 768px) {
          html, body {
            cursor: none !important;
          }
          a, button, [role="button"], input, select, textarea {
            cursor: none !important;
          }
        }
        .cursor-liquid-outer {
          position: fixed;
          top: -24px;
          left: -24px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: transparent;
          border: 2px solid #0f172a;
          pointer-events: none;
          transition: border-color 0.3s, background-color 0.3s, box-shadow 0.3s, width 0.3s, height 0.3s;
          will-change: transform;
          opacity: 1 !important;
          box-shadow: 0 0 10px rgba(15, 23, 42, 0.1);
          z-index: 999999;
        }
        .cursor-liquid-inner {
          position: fixed;
          top: -4px;
          left: -4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #0f172a;
          pointer-events: none;
          transition: width 0.2s, height 0.2s, background-color 0.2s;
          will-change: transform;
          opacity: 1 !important;
          box-shadow: 0 0 8px rgba(15, 23, 42, 0.3);
          z-index: 1000000;
        }
        .cursor-liquid-outer.cursor-hovered {
          background-color: rgba(15, 23, 42, 0.08);
          border-color: #1e293b;
          width: 56px;
          height: 56px;
          top: -28px;
          left: -28px;
        }
        .cursor-liquid-inner.cursor-dot-hovered {
          width: 14px;
          height: 14px;
          top: -7px;
          left: -7px;
          background-color: #1e293b;
        }
        .cursor-liquid-outer.cursor-clicked {
          transform: scale(0.75);
          background-color: rgba(15, 23, 42, 0.15);
        }
        .cursor-liquid-inner.cursor-dot-clicked {
          transform: scale(0.6);
        }
      `}</style>
      <div ref={glowCursorRef} className="cursor-liquid-outer" />
      <div ref={mainCursorRef} className="cursor-liquid-inner" />
    </div>
  );
};

export default CustomCursor;
