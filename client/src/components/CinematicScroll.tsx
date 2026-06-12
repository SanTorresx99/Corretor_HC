import { useEffect, useRef } from "react";

export interface RoomSection {
  id: string;
  image: string;
  time: string;
  room: string;
  title: string;
  titleItalic?: string;
  description: string;
}

// ─── Time-of-day atmosphere ───────────────────────────────────────────────────
// journey: 0 = dawn, 0.5 = noon, 1 = sunset

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.max(0, Math.min(1, t));
}

function getAtmosphere(journey: number) {
  // Brightness arc: dark dawn → bright noon → darkening sunset
  const brightness =
    journey < 0.5
      ? lerp(0.78, 1.1, journey * 2)
      : lerp(1.1, 0.65, (journey - 0.5) * 2);

  // Saturation: vivid at extremes, calm at noon
  const saturation =
    journey < 0.5
      ? lerp(1.35, 0.95, journey * 2)
      : lerp(0.95, 1.6, (journey - 0.5) * 2);

  // Warm sepia tint at dawn, slight at sunset
  const sepia =
    journey < 0.5
      ? lerp(0.16, 0, journey * 2)
      : lerp(0, 0.12, (journey - 0.5) * 2);

  const cssFilter = `brightness(${brightness.toFixed(3)}) saturate(${saturation.toFixed(3)}) sepia(${sepia.toFixed(3)})`;

  // Color overlay: amber dawn → pale morning → clear noon → gold afternoon → crimson sunset
  let r: number, g: number, b: number, alpha: number;
  if (journey < 0.25) {
    const t = journey / 0.25;
    r = 255; g = Math.round(lerp(70, 190, t)); b = Math.round(lerp(10, 60, t));
    alpha = lerp(0.48, 0.18, t);
  } else if (journey < 0.5) {
    const t = (journey - 0.25) / 0.25;
    r = 255; g = 225; b = 140;
    alpha = lerp(0.18, 0.03, t);
  } else if (journey < 0.75) {
    const t = (journey - 0.5) / 0.25;
    r = 255; g = Math.round(lerp(215, 110, t)); b = Math.round(lerp(130, 20, t));
    alpha = lerp(0.04, 0.3, t);
  } else {
    const t = (journey - 0.75) / 0.25;
    r = Math.round(lerp(200, 55, t));
    g = Math.round(lerp(50, 12, t));
    b = Math.round(lerp(15, 110, t));
    alpha = lerp(0.32, 0.62, t);
  }

  const overlay = `rgba(${r},${g},${b},${alpha.toFixed(3)})`;

  // Time-of-day accent color (for labels and indicators)
  const timeColors = ["#FF8C42", "#F5C464", "#F0EAD6", "#FFA040", "#D44040"];
  const timeColor = timeColors[Math.min(4, Math.floor(journey * 5))];

  return { cssFilter, overlay, timeColor };
}

// ─── Component ────────────────────────────────────────────────────────────────

const SECTION_VH = 180;

export function CinematicScroll({ sections }: { sections: RoomSection[] }) {
  // Refs for the outer containers (used for scroll progress math)
  const outerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Refs for the inner elements we animate directly (avoids React re-renders)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let rafId = 0;

    const tick = () => {
      outerRefs.current.forEach((outer, i) => {
        if (!outer) return;

        const imageEl = imageRefs.current[i];
        const overlayEl = overlayRefs.current[i];
        const contentEl = contentRefs.current[i];

        const rect = outer.getBoundingClientRect();
        const scrollable = outer.offsetHeight - window.innerHeight;
        const p = scrollable > 0 ? Math.max(0, Math.min(1, -rect.top / scrollable)) : 0;

        // Ken Burns: zoom in + alternating pan
        const scale = 1 + p * 0.12;
        const panX = i % 2 === 0 ? -p * 3 : p * 3;
        const panY = -p * 2.5;

        if (imageEl) {
          imageEl.style.transform = `scale(${scale.toFixed(4)}) translate(${panX.toFixed(3)}%, ${panY.toFixed(3)}%)`;
        }

        // Overlay: slightly deepen at scroll extremes
        if (overlayEl) {
          const journey = sections.length > 1 ? i / (sections.length - 1) : 0;
          const { overlay } = getAtmosphere(journey);
          overlayEl.style.backgroundColor = overlay;
        }

        // Text: fade in first 20%, hold, fade out last 15%
        if (contentEl) {
          const enter = Math.min(1, p / 0.2);
          const exit = p > 0.82 ? Math.max(0, 1 - (p - 0.82) / 0.12) : 1;
          const opacity = enter * exit;
          const translateY = (1 - enter) * 30;
          contentEl.style.opacity = opacity.toFixed(3);
          contentEl.style.transform = `translateY(${translateY.toFixed(2)}px)`;
        }
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    tick();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [sections.length]);

  return (
    <div>
      {sections.map((section, index) => {
        const journey = sections.length > 1 ? index / (sections.length - 1) : 0;
        const { cssFilter, overlay, timeColor } = getAtmosphere(journey);

        return (
          <div
            key={section.id}
            ref={(el) => { outerRefs.current[index] = el; }}
            style={{ height: `${SECTION_VH}vh` }}
          >
            <div
              style={{
                position: "sticky",
                top: 0,
                height: "100vh",
                overflow: "hidden",
              }}
            >
              {/* ── Background image ── */}
              <div
                ref={(el) => { imageRefs.current[index] = el; }}
                style={{
                  position: "absolute",
                  inset: "-8%",
                  backgroundImage: `url('${section.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: cssFilter,
                  willChange: "transform",
                  transformOrigin: "center center",
                }}
              />

              {/* ── Time-of-day colour wash ── */}
              <div
                ref={(el) => { overlayRefs.current[index] = el; }}
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: overlay,
                  mixBlendMode: journey < 0.5 ? "screen" : "multiply",
                  pointerEvents: "none",
                }}
              />

              {/* ── Radial vignette ── */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(ellipse 85% 75% at 50% 45%, transparent 30%, rgba(0,0,0,0.72) 100%)",
                  pointerEvents: "none",
                }}
              />

              {/* ── Bottom gradient — legibility ── */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 32%, transparent 58%)",
                  pointerEvents: "none",
                }}
              />

              {/* ── Top fade ── */}
              <div
                style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: "140px",
                  background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 100%)",
                  pointerEvents: "none",
                }}
              />

              {/* ── Letterbox bars ── */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3vh", backgroundColor: "#000", zIndex: 30 }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3vh", backgroundColor: "#000", zIndex: 30 }} />

              {/* ── Ghost room number ── */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "clamp(1rem, 4vw, 5rem)",
                  transform: "translateY(-50%)",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(7rem, 16vw, 14rem)",
                  fontWeight: 300,
                  color: "rgba(255,255,255,0.04)",
                  lineHeight: 1,
                  userSelect: "none",
                  pointerEvents: "none",
                  zIndex: 5,
                }}
              >
                0{index + 1}
              </div>

              {/* ── Text content ── */}
              <div
                ref={(el) => { contentRefs.current[index] = el; }}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "clamp(2rem, 5vw, 6rem)",
                  paddingBottom: "clamp(5rem, 9vh, 9rem)",
                  zIndex: 20,
                  willChange: "opacity, transform",
                }}
              >
                {/* Time + room label */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    marginBottom: "20px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "0.6rem",
                      fontWeight: 500,
                      letterSpacing: "0.32em",
                      textTransform: "uppercase",
                      color: timeColor,
                    }}
                  >
                    {section.time}
                  </span>
                  <span
                    style={{
                      display: "inline-block",
                      height: "1px",
                      width: "36px",
                      backgroundColor: timeColor,
                      opacity: 0.5,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: "0.6rem",
                      fontWeight: 400,
                      letterSpacing: "0.32em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.45)",
                    }}
                  >
                    {section.room}
                  </span>
                </div>

                {/* Title */}
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(3rem, 7.5vw, 6.5rem)",
                    fontWeight: 300,
                    color: "#fff",
                    lineHeight: 1.0,
                    letterSpacing: "-0.02em",
                    textShadow: "0 4px 80px rgba(0,0,0,0.5)",
                    margin: "0 0 8px",
                  }}
                >
                  {section.title}
                  {section.titleItalic && (
                    <em
                      style={{
                        display: "block",
                        fontStyle: "italic",
                        fontWeight: 300,
                        color: timeColor,
                      }}
                    >
                      {section.titleItalic}
                    </em>
                  )}
                </h2>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "clamp(0.82rem, 1.4vw, 0.98rem)",
                    fontWeight: 300,
                    color: "rgba(255,255,255,0.6)",
                    letterSpacing: "0.04em",
                    lineHeight: 1.8,
                    maxWidth: "500px",
                    marginTop: "16px",
                  }}
                >
                  {section.description}
                </p>
              </div>

              {/* ── Vertical progress indicator ── */}
              <div
                style={{
                  position: "absolute",
                  right: "clamp(1rem, 2.5vw, 2.5rem)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  alignItems: "center",
                  zIndex: 25,
                }}
              >
                {sections.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: "1.5px",
                      height: i === index ? "32px" : "8px",
                      backgroundColor: i === index ? timeColor : "rgba(255,255,255,0.18)",
                      borderRadius: "1px",
                      transition: "height 0.5s cubic-bezier(0.16,1,0.3,1), background-color 0.5s ease",
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
