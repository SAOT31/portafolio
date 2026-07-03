import { useEffect, useState, useRef } from 'react';
import { useUISounds } from '../hooks/useSound';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const linkHoveredRef = useRef(false);
  const [hidden, setHidden] = useState(false);
  
  const { playHoverSound, playClickSound } = useUISounds();

  useEffect(() => {
    // Only run on desktop
    if (window.innerWidth < 768) return;

    const mMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const mEnter = () => setHidden(false);
    const mLeave = () => setHidden(true);
    const mDown = () => {
      setClicked(true);
      if (linkHoveredRef.current) playClickSound();
    };
    const mUp = () => setClicked(false);

    document.addEventListener('mousemove', mMove);
    document.addEventListener('mouseenter', mEnter);
    document.addEventListener('mouseleave', mLeave);
    document.addEventListener('mousedown', mDown);
    document.addEventListener('mouseup', mUp);

    // Use event delegation for link hovering to catch dynamically added elements
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, input, textarea, select, [role="button"], .glass-panel');
      if (target) {
        if (!linkHoveredRef.current) playHoverSound();
        setLinkHovered(true);
        linkHoveredRef.current = true;
      }
    };
    
    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, input, textarea, select, [role="button"], .glass-panel');
      if (target) {
        setLinkHovered(false);
        linkHoveredRef.current = false;
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', mMove);
      document.removeEventListener('mouseenter', mEnter);
      document.removeEventListener('mouseleave', mLeave);
      document.removeEventListener('mousedown', mDown);
      document.removeEventListener('mouseup', mUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  if (window.innerWidth < 768) return null; // Don't render on mobile

  return (
    <>
      <div 
        className={`custom-cursor ${hidden ? 'hidden' : ''} ${clicked ? 'clicked' : ''} ${linkHovered ? 'hover' : ''}`} 
        style={{ left: `${position.x}px`, top: `${position.y}px` }} 
      />
      <div 
        className={`custom-cursor-follower ${hidden ? 'hidden' : ''} ${clicked ? 'clicked' : ''} ${linkHovered ? 'hover' : ''}`} 
        style={{ left: `${position.x}px`, top: `${position.y}px` }} 
      />
    </>
  );
};
