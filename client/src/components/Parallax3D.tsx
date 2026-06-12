import { useEffect, useRef, useState } from "react";

interface Parallax3DProps {
  children: React.ReactNode;
  intensity?: number;
}

export function Parallax3D({ children, intensity = 20 }: Parallax3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      setMousePosition({ x, y });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
      setIsHovering(false);
      setMousePosition({ x: 0, y: 0 });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  const transformStyle = isHovering
    ? {
        transform: `perspective(1000px) rotateX(${mousePosition.y * intensity}deg) rotateY(${
          mousePosition.x * intensity
        }deg) scale(1.02)`,
        transition: "transform 0.1s ease-out",
      }
    : {
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
        transition: "transform 0.6s ease-out",
      };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <div style={transformStyle}>{children}</div>
    </div>
  );
}
