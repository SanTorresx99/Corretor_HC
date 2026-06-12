import { useEffect, useRef, useState } from "react";

interface CinematicScrollProps {
  sections: Array<{
    id: string;
    image: string;
    title: string;
    description: string;
    offset?: number;
  }>;
}

export function CinematicScroll({ sections }: CinematicScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;

      setScrollProgress(scrollPercent);

      // Determine active section
      const sectionIndex = Math.floor(scrollPercent * (sections.length - 1));
      setActiveSection(Math.min(sectionIndex, sections.length - 1));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections.length]);

  return (
    <div ref={containerRef} className="relative w-full">
      {sections.map((section, index) => {
        const sectionProgress = Math.max(
          0,
          Math.min(1, (scrollProgress - index / sections.length) * sections.length)
        );

        const zoomLevel = 1 + sectionProgress * 0.3;
        const opacity = index === activeSection ? 1 : Math.max(0, 1 - Math.abs(scrollProgress - index / sections.length) * 5);
        const blur = (1 - sectionProgress) * 10;

        return (
          <div
            key={section.id}
            className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
            style={{
              opacity: Math.max(0.3, opacity),
              transition: "opacity 0.3s ease-out",
            }}
          >
            {/* Background Image with Zoom Effect */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `url('${section.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: `scale(${zoomLevel})`,
                filter: `blur(${blur}px)`,
                transition: "transform 0.1s ease-out, filter 0.1s ease-out",
              }}
            />

            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black"
              style={{
                opacity: 0.3 + sectionProgress * 0.2,
              }}
            />

            {/* Content */}
            <div
              className="relative z-10 container text-center text-white space-y-6 px-4"
              style={{
                opacity: Math.max(0, 1 - Math.abs(scrollProgress - index / sections.length) * 3),
                transform: `translateY(${(1 - sectionProgress) * 50}px)`,
                transition: "opacity 0.3s ease-out, transform 0.1s ease-out",
              }}
            >
              <h2 className="text-5xl md:text-6xl font-bold font-display">{section.title}</h2>
              <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">{section.description}</p>
            </div>

            {/* Progress Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
              <div className="flex gap-2">
                {sections.map((_, i) => (
                  <div
                    key={i}
                    className="h-1 bg-accent/30 rounded-full transition-all duration-300"
                    style={{
                      width: i === activeSection ? "24px" : "8px",
                      backgroundColor: i <= activeSection ? "#D4AF37" : "rgba(212, 175, 55, 0.3)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
