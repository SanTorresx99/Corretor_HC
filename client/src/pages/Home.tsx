import { Button } from "@/components/ui/button";
import { CinematicScroll, type RoomSection } from "@/components/CinematicScroll";
import { Parallax3D } from "@/components/Parallax3D";
import { ArrowRight, ChevronDown, MapPin, Shield, Users, FileCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const HERO_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663362044607/hzpuYcxarCpvpsU3RMPArx/hero_exterior-eyNAve9pMudbXffyMBULoS.webp";

const cinematicSections: RoomSection[] = [
  {
    id: "exterior",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663362044607/hzpuYcxarCpvpsU3RMPArx/hero_exterior-eyNAve9pMudbXffyMBULoS.webp",
    time: "05 : 47",
    room: "Fachada · Ponta Negra",
    title: "A Chegada",
    titleItalic: "ao amanhecer",
    description:
      "O sol nasce sobre o Rio Negro e banha cada linha da fachada em âmbar. Este é o momento em que o dia começa a revelar o que te espera.",
  },
  {
    id: "living",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663362044607/hzpuYcxarCpvpsU3RMPArx/living_room-au3rNu6Wk8HjLyanBBKZq8.webp",
    time: "08 : 30",
    room: "Sala de Estar",
    title: "Luz da Manhã",
    titleItalic: "inunda o espaço",
    description:
      "A claridade entra pelas janelas panorâmicas e ilumina cada superfície. O Rio Negro, ao longe, faz parte da decoração.",
  },
  {
    id: "kitchen",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663362044607/hzpuYcxarCpvpsU3RMPArx/kitchen-HLQ8mTqgmDx3mhWKjjbtnW.webp",
    time: "12 : 15",
    room: "Cozinha Gourmet",
    title: "O Coração",
    titleItalic: "da casa",
    description:
      "Ao meio-dia, cada detalhe em aço e mármore brilha na luz mais crua e honesta. Um espaço feito para quem vive bem.",
  },
  {
    id: "suite",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663362044607/hzpuYcxarCpvpsU3RMPArx/master_suite-Q2MVnSaUxLvN9RfZKWLhaQ.webp",
    time: "16 : 00",
    room: "Suíte Master",
    title: "Sombras douradas",
    titleItalic: "da tarde",
    description:
      "A luz da tarde atravessa o ambiente na diagonal, criando volumes e intimidade. O refúgio que você sempre imaginou.",
  },
  {
    id: "balcony",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663362044607/hzpuYcxarCpvpsU3RMPArx/balcony_view-cWUwXtTTPs5V5mKjxpB.webp",
    time: "18 : 23",
    room: "Varanda",
    title: "O espetáculo",
    titleItalic: "do pôr do sol",
    description:
      "O céu incendeia sobre Manaus. As sombras se aprofundam, as cores explodem. Este é o motivo pelo qual você veio até aqui.",
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll(".reveal").forEach((child) =>
            child.classList.add("visible")
          );
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const heroParallaxRef = useRef<HTMLDivElement>(null);

  const aboutRef = useReveal();
  const propertiesRef = useReveal();
  const processRef = useReveal();

  useEffect(() => {
    let rafId = 0;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 80);
        if (heroParallaxRef.current) {
          heroParallaxRef.current.style.transform = `translateY(${(window.scrollY * 0.38).toFixed(1)}px)`;
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── Navigation ─────────────────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 100,
          transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
          backgroundColor: isScrolled ? "rgba(8,8,8,0.94)" : "transparent",
          backdropFilter: isScrolled ? "blur(16px)" : "none",
          borderBottom: isScrolled ? "1px solid rgba(201,168,76,0.12)" : "1px solid transparent",
        }}
      >
        <div className="container flex items-center justify-between py-5">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div
              style={{
                width: 44,
                height: 44,
                border: "1px solid rgba(201,168,76,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  color: "#C9A84C",
                  letterSpacing: "0.04em",
                }}
              >
                HC
              </span>
            </div>
            <div className="hidden md:block">
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400,
                  fontSize: "1.1rem",
                  color: "#F5F0E8",
                  letterSpacing: "0.04em",
                }}
              >
                Hanndrey Cascaes
              </p>
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 400,
                  fontSize: "0.6rem",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "#C9A84C",
                }}
              >
                Corretor de Imóveis
              </p>
            </div>
          </div>

          {/* Links */}
          <div
            className="hidden lg:flex items-center gap-10"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.68rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 400,
            }}
          >
            {["Sobre", "Imóveis", "Processo"].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase().replace("ó", "o").replace("ó", "o")}`}
                style={{ color: "rgba(245,240,232,0.7)", transition: "color 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A84C")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.7)")}
              >
                {label}
              </a>
            ))}
          </div>

          <Button className="btn-primary text-xs">Agendar</Button>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden film-grain">
        {/* Parallax background */}
        <div
          ref={heroParallaxRef}
          style={{
            position: "absolute",
            inset: "-20%",
            backgroundImage: `url('${HERO_IMAGE}')`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            willChange: "transform",
          }}
        />

        {/* Dawn colour wash */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 120% 100% at 60% 40%, rgba(255,120,30,0.18) 0%, transparent 60%)",
          }}
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.45) 50%, rgba(8,8,8,0.95) 100%)",
          }}
        />

        {/* Letterbox top */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3vh", backgroundColor: "#000", zIndex: 10 }} />

        {/* Content */}
        <Parallax3D intensity={8}>
          <div
            className="container relative text-center"
            style={{ zIndex: 10, paddingTop: "10vh", paddingBottom: "8vh" }}
          >
            {/* Eyebrow */}
            <p
              className="reveal"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 500,
                letterSpacing: "0.38em",
                textTransform: "uppercase",
                color: "#C9A84C",
                marginBottom: "2rem",
              }}
            >
              Experiência Cinematográfica · Manaus
            </p>

            {/* Main title */}
            <h1
              className="reveal reveal-delay-1"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontSize: "clamp(3.5rem, 10vw, 8.5rem)",
                color: "#F5F0E8",
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                marginBottom: "0.5rem",
              }}
            >
              Bem-vindo ao
            </h1>
            <h1
              className="reveal reveal-delay-2"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(3.5rem, 10vw, 8.5rem)",
                color: "#C9A84C",
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                marginBottom: "2.5rem",
              }}
            >
              seu novo lar
            </h1>

            <p
              className="reveal reveal-delay-3"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(0.95rem, 1.8vw, 1.2rem)",
                fontWeight: 300,
                color: "rgba(245,240,232,0.65)",
                letterSpacing: "0.04em",
                lineHeight: 1.8,
                maxWidth: "640px",
                margin: "0 auto 3rem",
              }}
            >
              Uma jornada imersiva do amanhecer ao pôr do sol pelos ambientes mais
              exclusivos de Manaus. Role para entrar.
            </p>

            {/* CTAs */}
            <div
              className="reveal reveal-delay-4"
              style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
            >
              <Button className="btn-primary flex items-center gap-3 text-xs px-8 py-4 group">
                Iniciar Visita
                <ArrowRight
                  className="w-3.5 h-3.5"
                  style={{ transition: "transform 0.3s" }}
                />
              </Button>
              <Button className="btn-secondary text-xs px-8 py-4">
                Falar no WhatsApp
              </Button>
            </div>

            {/* Scroll cue */}
            <div
              style={{
                position: "absolute",
                bottom: "-4vh",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "0.55rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "rgba(201,168,76,0.7)",
                }}
              >
                Role para explorar
              </span>
              <ChevronDown
                style={{
                  width: 16,
                  height: 16,
                  color: "#C9A84C",
                  animation: "bounce 2s infinite",
                }}
              />
            </div>
          </div>
        </Parallax3D>
      </section>

      {/* ── Cinematic Walk-Through ─────────────────────────────────────────── */}
      <CinematicScroll sections={cinematicSections} />

      <div className="section-divider" />

      {/* ── About ──────────────────────────────────────────────────────────── */}
      <section id="sobre" className="py-24 md:py-36">
        <div className="container" ref={aboutRef}>
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left */}
            <div className="space-y-8">
              <p className="reveal label-text text-accent">Sobre o Corretor</p>

              <h2
                className="reveal reveal-delay-1"
                style={{ fontWeight: 300 }}
              >
                Especialista em{" "}
                <em style={{ color: "#C9A84C", fontStyle: "italic" }}>
                  transformar sonhos
                </em>{" "}
                em realidade
              </h2>

              <p
                className="reveal reveal-delay-2"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  color: "rgba(245,240,232,0.65)",
                  lineHeight: 1.9,
                  fontSize: "1rem",
                  letterSpacing: "0.02em",
                }}
              >
                Com formação em Direito e paixão pelo mercado imobiliário, garanto
                que você faça o investimento mais seguro e inteligente da sua vida.
                Do crédito às chaves, cuido de cada detalhe.
              </p>

              <div className="reveal reveal-delay-3 space-y-5 pt-2">
                {[
                  {
                    icon: Shield,
                    title: "Segurança Jurídica",
                    sub: "Bacharel em Direito · expertise em contratos imobiliários",
                  },
                  {
                    icon: Users,
                    title: "Atendimento Humanizado",
                    sub: "Dedicado exclusivamente ao seu sucesso",
                  },
                  {
                    icon: FileCheck,
                    title: "Especialista em Financiamento",
                    sub: "Análise de crédito e aprovação com agilidade",
                  },
                ].map(({ icon: Icon, title, sub }) => (
                  <div key={title} className="flex gap-5 items-start group">
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        border: "1px solid rgba(201,168,76,0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "border-color 0.3s",
                      }}
                      className="group-hover:border-accent/60"
                    >
                      <Icon style={{ width: 18, height: 18, color: "#C9A84C" }} />
                    </div>
                    <div>
                      <p
                        style={{
                          fontFamily: "'Jost', sans-serif",
                          fontWeight: 500,
                          fontSize: "0.9rem",
                          color: "#F5F0E8",
                          marginBottom: "4px",
                        }}
                      >
                        {title}
                      </p>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 300,
                          fontSize: "0.82rem",
                          color: "rgba(245,240,232,0.5)",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-px bg-border">
              {[
                { number: "100+", label: "Clientes Satisfeitos" },
                { number: "R$50M+", label: "em Negócios" },
                { number: "18", label: "Empreendimentos" },
                { number: "10+", label: "Anos de Experiência" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="reveal"
                  style={{
                    transitionDelay: `${0.1 + i * 0.1}s`,
                    backgroundColor: "#131313",
                    padding: "clamp(2rem, 4vw, 3rem)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 300,
                      fontSize: "clamp(2.5rem, 5vw, 3.8rem)",
                      color: "#C9A84C",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}
                  >
                    {stat.number}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontWeight: 400,
                      fontSize: "0.68rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(245,240,232,0.45)",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Properties ─────────────────────────────────────────────────────── */}
      <section id="imoveis" className="py-24 md:py-36 bg-secondary/20">
        <div className="container" ref={propertiesRef}>
          <div className="text-center mb-16 space-y-4">
            <p className="reveal label-text text-accent">Portfólio</p>
            <h2 className="reveal reveal-delay-1" style={{ fontWeight: 300 }}>
              Oportunidades{" "}
              <em style={{ color: "#C9A84C", fontStyle: "italic" }}>exclusivas</em>
            </h2>
            <p
              className="reveal reveal-delay-2"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                color: "rgba(245,240,232,0.55)",
                fontSize: "0.95rem",
                letterSpacing: "0.03em",
                lineHeight: 1.8,
                maxWidth: "520px",
                margin: "0 auto",
              }}
            >
              Seleção rigorosa de imóveis de alto padrão com as melhores
              condições de financiamento em Manaus
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-border">
            {[
              {
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663362044607/hzpuYcxarCpvpsU3RMPArx/balcony_view-cWUwXtTTPs5V5mKjxpB.webp",
                region: "Ponta Negra",
                title: "Vista para o Rio Negro",
                price: "Renda R$18 mil+",
                features: ["Vista Panorâmica", "Varanda Gourmet", "Financiamento até 90%"],
              },
              {
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663362044607/hzpuYcxarCpvpsU3RMPArx/living_room-au3rNu6Wk8HjLyanBBKZq8.webp",
                region: "Aleixo · Zenith",
                title: "Av. André Araújo",
                price: "Localização Premium",
                features: ["10+ Áreas de Lazer", "Acabamento Alto Padrão", "Conforto Total"],
              },
              {
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663362044607/hzpuYcxarCpvpsU3RMPArx/kitchen-HLQ8mTqgmDx3mhWKjjbtnW.webp",
                region: "Coroado",
                title: "Seu apê em 2026",
                price: "Entrada R$5 mil",
                features: ["Use seu FGTS", "Parcelas R$1.500", "Renda R$10 mil+"],
              },
            ].map((prop, i) => (
              <div
                key={i}
                className="reveal group"
                style={{
                  transitionDelay: `${0.1 + i * 0.15}s`,
                  backgroundColor: "#131313",
                  overflow: "hidden",
                }}
              >
                {/* Image */}
                <div style={{ height: "260px", overflow: "hidden", position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: `url('${prop.image}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
                    }}
                    className="group-hover:scale-105"
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
                    }}
                  />
                  <div style={{ position: "absolute", bottom: 16, left: 20 }}>
                    <p
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: "0.58rem",
                        fontWeight: 500,
                        letterSpacing: "0.28em",
                        textTransform: "uppercase",
                        color: "#C9A84C",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <MapPin style={{ width: 10, height: 10 }} />
                      {prop.region}
                    </p>
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: "clamp(1.5rem, 3vw, 2.5rem)" }}>
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 300,
                      fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                      color: "#F5F0E8",
                      letterSpacing: "-0.01em",
                      marginBottom: "8px",
                    }}
                  >
                    {prop.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontWeight: 500,
                      fontSize: "0.72rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#C9A84C",
                      marginBottom: "20px",
                    }}
                  >
                    {prop.price}
                  </p>

                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
                    {prop.features.map((f) => (
                      <p
                        key={f}
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 300,
                          fontSize: "0.82rem",
                          color: "rgba(245,240,232,0.5)",
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          letterSpacing: "0.02em",
                        }}
                      >
                        <span
                          style={{
                            width: 4,
                            height: 4,
                            borderRadius: "50%",
                            backgroundColor: "#C9A84C",
                            flexShrink: 0,
                          }}
                        />
                        {f}
                      </p>
                    ))}
                  </div>

                  <Button className="btn-secondary w-full text-xs">Ver Detalhes</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Process ────────────────────────────────────────────────────────── */}
      <section id="processo" className="py-24 md:py-36">
        <div className="container" ref={processRef}>
          <div className="text-center mb-16 space-y-4">
            <p className="reveal label-text text-accent">Como funciona</p>
            <h2 className="reveal reveal-delay-1" style={{ fontWeight: 300 }}>
              O caminho para o{" "}
              <em style={{ color: "#C9A84C", fontStyle: "italic" }}>
                seu imóvel
              </em>
            </h2>
          </div>

          {/* Timeline */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1px",
              backgroundColor: "var(--border)",
            }}
          >
            {[
              { step: "01", title: "Análise de Crédito", desc: "Entendo seu perfil financeiro e as melhores opções para você." },
              { step: "02", title: "Seleção Exclusiva", desc: "Apresento os imóveis certos para o seu momento de vida." },
              { step: "03", title: "Aprovação", desc: "Resolvo toda a burocracia com banco e construtora." },
              { step: "04", title: "Entrega das Chaves", desc: "O momento que transforma o sonho em endereço." },
            ].map((item, i) => (
              <div
                key={i}
                className="reveal group"
                style={{
                  transitionDelay: `${0.1 + i * 0.12}s`,
                  backgroundColor: "#0d0d0d",
                  padding: "clamp(2rem, 4vw, 3.5rem)",
                  position: "relative",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 300,
                    fontSize: "clamp(4rem, 8vw, 6rem)",
                    color: "rgba(201,168,76,0.08)",
                    lineHeight: 1,
                    marginBottom: "1.5rem",
                    transition: "color 0.4s",
                  }}
                  className="group-hover:text-accent/20"
                >
                  {item.step}
                </p>
                <h3
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                    letterSpacing: "0.04em",
                    color: "#F5F0E8",
                    marginBottom: "12px",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.82rem",
                    color: "rgba(245,240,232,0.45)",
                    lineHeight: 1.75,
                    letterSpacing: "0.02em",
                  }}
                >
                  {item.desc}
                </p>
                {/* Bottom accent line on hover */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "1px",
                    background: "linear-gradient(to right, transparent, #C9A84C, transparent)",
                    opacity: 0,
                    transition: "opacity 0.4s",
                  }}
                  className="group-hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Final CTA ──────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-40 relative overflow-hidden film-grain">
        {/* Background image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url('${HERO_IMAGE}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.22) saturate(1.4)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 100% 100% at center, rgba(0,0,0,0) 0%, rgba(8,8,8,0.85) 100%)",
          }}
        />

        <div className="container relative text-center" style={{ zIndex: 10 }}>
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.6rem",
              fontWeight: 500,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "#C9A84C",
              marginBottom: "1.5rem",
            }}
          >
            Próximo passo
          </p>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300,
              fontSize: "clamp(2.8rem, 7vw, 6rem)",
              color: "#F5F0E8",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
              maxWidth: "700px",
              margin: "0 auto 1.5rem",
            }}
          >
            Pronto para dar o
            <em style={{ color: "#C9A84C", fontStyle: "italic", display: "block" }}>
              próximo passo?
            </em>
          </h2>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
              color: "rgba(245,240,232,0.55)",
              letterSpacing: "0.04em",
              lineHeight: 1.85,
              maxWidth: "520px",
              margin: "0 auto 3rem",
            }}
          >
            Chega de adiar o seu sonho. Fale comigo agora e descubra como é
            fácil conquistar o seu imóvel próprio em Manaus.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Button className="btn-primary text-xs px-10 py-5">
              Falar no WhatsApp Agora
            </Button>
            <Button className="btn-secondary text-xs px-10 py-5">
              Agendar Consulta Exclusiva
            </Button>
          </div>

          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "0.6rem",
              fontWeight: 400,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(245,240,232,0.3)",
              marginTop: "2.5rem",
            }}
          >
            Resposta em minutos · Sem compromisso · 100% gratuito
          </p>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid rgba(201,168,76,0.1)",
          backgroundColor: "#060606",
          padding: "4rem 0 3rem",
        }}
      >
        <div className="container">
          <div className="grid md:grid-cols-4 gap-10 mb-14">
            <div className="space-y-4">
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    border: "1px solid rgba(201,168,76,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 600,
                      color: "#C9A84C",
                      fontSize: "1rem",
                    }}
                  >
                    HC
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 400,
                    fontSize: "1.05rem",
                    color: "#F5F0E8",
                  }}
                >
                  Hanndrey Cascaes
                </span>
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: "0.8rem",
                  color: "rgba(245,240,232,0.4)",
                  lineHeight: 1.7,
                }}
              >
                Corretor de Imóveis em Manaus.
                <br />
                Bacharel em Direito.
              </p>
            </div>

            {[
              {
                title: "Navegação",
                links: [
                  { label: "Sobre", href: "#sobre" },
                  { label: "Imóveis", href: "#imoveis" },
                  { label: "Processo", href: "#processo" },
                ],
              },
              {
                title: "Contato",
                links: [
                  { label: "WhatsApp", href: "https://wa.me/5592" },
                  { label: "Instagram", href: "https://instagram.com/corretor.manaus_hanndrey" },
                ],
              },
              {
                title: "Legal",
                links: [
                  { label: "Privacidade", href: "#" },
                  { label: "Termos", href: "#" },
                ],
              },
            ].map(({ title, links }) => (
              <div key={title} className="space-y-4">
                <p
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.62rem",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "rgba(245,240,232,0.35)",
                  }}
                >
                  {title}
                </p>
                <ul className="space-y-3">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 300,
                          fontSize: "0.85rem",
                          color: "rgba(245,240,232,0.5)",
                          transition: "color 0.3s",
                          letterSpacing: "0.02em",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A84C")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.5)")}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(245,240,232,0.06)",
              paddingTop: "2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: "0.75rem",
                color: "rgba(245,240,232,0.25)",
                letterSpacing: "0.05em",
                textAlign: "center",
              }}
            >
              © 2026 Hanndrey Cascaes · Corretor de Imóveis · Manaus — Amazonas
            </p>
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                fontWeight: 400,
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(201,168,76,0.25)",
              }}
            >
              CRECI: [Inserir CRECI]
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
