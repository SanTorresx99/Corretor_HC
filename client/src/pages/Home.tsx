import { Button } from "@/components/ui/button";
import { Parallax3D } from "@/components/Parallax3D";
import { CinematicScroll } from "@/components/CinematicScroll";
import { ArrowRight, MapPin, Shield, Users, FileCheck, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

/**
 * Landing Page - Hanndrey Cascaes
 * Design: Cinematografia Imersiva com Parallax 3D
 * Experiência: Câmera virtual entrando no apartamento ao rolar
 */

const cinematicSections = [
  {
    id: "exterior",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663362044607/hzpuYcxarCpvpsU3RMPArx/hero_exterior-eyNAve9pMudbXffyMBULoS.webp",
    title: "Bem-vindo à Ponta Negra",
    description: "Uma jornada visual pela luxúria e sofisticação em Manaus",
  },
  {
    id: "living",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663362044607/hzpuYcxarCpvpsU3RMPArx/living_room-au3rNu6Wk8HjLyanBBKZq8.webp",
    title: "Sala de Estar Panorâmica",
    description: "Vista para o Rio Negro em cada momento",
  },
  {
    id: "kitchen",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663362044607/hzpuYcxarCpvpsU3RMPArx/kitchen-HLQ8mTqgmDx3mhWKjjbtnW.webp",
    title: "Cozinha Gourmet",
    description: "Elegância e funcionalidade em cada detalhe",
  },
  {
    id: "suite",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663362044607/hzpuYcxarCpvpsU3RMPArx/master_suite-Q2MVnSaUxLvN9RfZKWLhaQ.webp",
    title: "Suíte Master",
    description: "Seu refúgio de luxo e conforto",
  },
  {
    id: "balcony",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663362044607/hzpuYcxarCpvpsU3RMPArx/balcony_view-cWUwXtTTPs5V5mKjxpB.webp",
    title: "Varanda Exclusiva",
    description: "O melhor pôr do sol de Manaus",
  },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Fixed Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-2xl" : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between py-4 md:py-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-accent-foreground font-bold text-xl">HC</span>
            </div>
            <div className="hidden md:block">
              <p className="font-display font-bold text-lg text-foreground">Hanndrey Cascaes</p>
              <p className="text-xs text-accent">Corretor de Imóveis</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <a href="#sobre" className="text-sm font-medium hover:text-accent transition-colors duration-300">
              Sobre
            </a>
            <a href="#imoveis" className="text-sm font-medium hover:text-accent transition-colors duration-300">
              Imóveis
            </a>
            <a href="#processo" className="text-sm font-medium hover:text-accent transition-colors duration-300">
              Processo
            </a>
          </div>

          <Button className="btn-primary text-sm">Agendar Consulta</Button>
        </div>
      </nav>

      {/* Hero Section with Parallax 3D */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663362044607/hzpuYcxarCpvpsU3RMPArx/hero_exterior-eyNAve9pMudbXffyMBULoS.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: `translateY(${mouseY * 0.1}px)`,
              transition: "transform 0.1s ease-out",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-background" />
        </div>

        {/* Content */}
        <Parallax3D intensity={15}>
          <div className="container relative z-10 space-y-8 text-center">
            {/* Animated Title */}
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block">
                <p className="text-accent font-heading font-bold text-sm md:text-base tracking-widest uppercase mb-4">
                  ✨ Experiência Cinematográfica
                </p>
              </div>

              <h1 className="hero-text text-foreground leading-tight">
                Bem-vindo ao Seu
                <br />
                <span className="bg-gradient-to-r from-accent via-yellow-400 to-accent bg-clip-text text-transparent">
                  Novo Lar
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto font-light">
                Uma jornada imersiva pela luxúria, sofisticação e elegância. Descubra como é viver em um dos apartamentos mais exclusivos de Manaus.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button className="btn-primary flex items-center gap-2 text-base px-8 py-6 group">
                Iniciar Visita Virtual
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button className="btn-secondary flex items-center gap-2 text-base px-8 py-6">
                Falar no WhatsApp
              </Button>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs text-accent font-semibold uppercase tracking-wider">Role para explorar</p>
                <ChevronDown className="w-6 h-6 text-accent" />
              </div>
            </div>
          </div>
        </Parallax3D>
      </section>

      {/* Cinematic Scroll Experience */}
      <CinematicScroll sections={cinematicSections} />

      {/* Divider */}
      <div className="section-divider" />

      {/* About Section */}
      <section id="sobre" className="py-20 md:py-32 bg-secondary/50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8 slide-up">
              <h2 className="text-foreground">Especialista em Transformar Sonhos em Realidade</h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Com formação em Direito e paixão pelo mercado imobiliário, meu objetivo é garantir que você faça o investimento mais seguro e inteligente da sua vida.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4 items-start group">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/40 transition-colors">
                    <Shield className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground text-lg">Segurança Jurídica</h3>
                    <p className="text-sm text-muted-foreground">Bacharel em Direito com expertise em contratos imobiliários</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start group">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/40 transition-colors">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground text-lg">Atendimento Humanizado</h3>
                    <p className="text-sm text-muted-foreground">Dedicado exclusivamente ao seu sucesso</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start group">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/40 transition-colors">
                    <FileCheck className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-foreground text-lg">Especialista em Financiamento</h3>
                    <p className="text-sm text-muted-foreground">Análise de crédito e aprovação garantida</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: "100+", label: "Clientes Satisfeitos", icon: "👥" },
                { number: "R$50M+", label: "Negociados", icon: "💰" },
                { number: "18", label: "Empreendimentos", icon: "🏢" },
                { number: "10+", label: "Anos de Experiência", icon: "⭐" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-card p-8 rounded-xl border border-border hover:border-accent hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <p className="text-4xl mb-2 group-hover:scale-125 transition-transform">{stat.icon}</p>
                  <p className="text-3xl font-bold text-accent mb-2">{stat.number}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* Properties Section */}
      <section id="imoveis" className="py-20 md:py-32">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-foreground">Oportunidades Exclusivas</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Seleção cuidadosa de imóveis de alto padrão com as melhores condições de financiamento
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Ponta Negra",
                desc: "Vista para o rio, 2 e 3 quartos com varanda gourmet",
                price: "R$18 mil+",
                features: ["Vista Panorâmica", "Varanda Gourmet", "Financiamento até 90%"],
              },
              {
                title: "Aleixo (Zenith)",
                desc: "Apartamentos modernos com +10 áreas de lazer",
                price: "Localização Premium",
                features: ["Av. André Araújo", "10+ Áreas de Lazer", "Conforto Total"],
              },
              {
                title: "Coroado",
                desc: "Seu apartamento próprio em 2026 com FGTS",
                price: "R$10 mil+",
                features: ["Entrada R$5 mil", "Parcelas R$1.500", "Use seu FGTS"],
              },
            ].map((prop, i) => (
              <div
                key={i}
                className="group bg-card rounded-xl overflow-hidden border border-border hover:border-accent transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="h-64 bg-gradient-to-br from-accent/30 to-secondary relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                  <MapPin className="absolute top-4 right-4 w-8 h-8 text-accent group-hover:scale-125 transition-transform" />
                </div>
                <div className="p-8 space-y-4">
                  <h3 className="text-2xl font-heading font-bold text-foreground">{prop.title}</h3>
                  <p className="text-muted-foreground">{prop.desc}</p>
                  <p className="text-accent font-bold text-lg">Renda mínima {prop.price}</p>
                  <div className="space-y-2">
                    {prop.features.map((f, j) => (
                      <p key={j} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                        {f}
                      </p>
                    ))}
                  </div>
                  <Button className="btn-secondary w-full mt-4">Ver Detalhes</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* Process Section */}
      <section id="processo" className="py-20 md:py-32 bg-secondary/50">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-foreground">O Caminho Para o Seu Novo Lar</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Processo simplificado e transparente, do primeiro contato até a entrega das chaves
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", icon: "📝", title: "Análise de Crédito", desc: "Entendemos seu perfil" },
              { step: "02", icon: "🔍", title: "Seleção Exclusiva", desc: "Melhores opções" },
              { step: "03", icon: "🏦", title: "Aprovação", desc: "Burocracia resolvida" },
              { step: "04", icon: "🔑", title: "Entrega das Chaves", desc: "Sua nova vida" },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-card p-8 rounded-xl border border-border hover:border-accent transition-all duration-300 text-center space-y-4 group hover:shadow-xl">
                  <div className="text-5xl group-hover:scale-125 transition-transform">{item.icon}</div>
                  <p className="text-accent font-bold text-sm">PASSO {item.step}</p>
                  <h3 className="font-heading font-bold text-foreground text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-accent/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* Final CTA */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="bg-gradient-to-br from-card to-secondary rounded-2xl p-12 md:p-20 text-center space-y-8 border border-border overflow-hidden relative">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-r from-accent via-transparent to-accent animate-pulse" />
            </div>

            <div className="relative z-10 space-y-8">
              <h2 className="text-foreground">Pronto Para Dar o Próximo Passo?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Chega de adiar o seu sonho. Fale comigo agora e descubra como é fácil conquistar o seu imóvel próprio em Manaus.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button className="btn-primary text-base px-10 py-4">
                  Falar no WhatsApp Agora
                </Button>
                <Button className="btn-secondary text-base px-10 py-4">
                  Agendar Consulta Exclusiva
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                ⚡ Resposta em minutos | 24/7 | Sem compromisso
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/80 border-t border-border py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <span className="text-accent-foreground font-bold">HC</span>
                </div>
                <span className="font-heading font-bold">Hanndrey Cascaes</span>
              </div>
              <p className="text-sm text-muted-foreground">Corretor de Imóveis em Manaus</p>
            </div>

            <div className="space-y-4">
              <h4 className="font-heading font-bold text-foreground">Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#sobre" className="hover:text-accent transition-colors">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="#imoveis" className="hover:text-accent transition-colors">
                    Imóveis
                  </a>
                </li>
                <li>
                  <a href="#processo" className="hover:text-accent transition-colors">
                    Processo
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-heading font-bold text-foreground">Contato</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="https://wa.me/5592" className="hover:text-accent transition-colors">
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/corretor.manaus_hanndrey" className="hover:text-accent transition-colors">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-heading font-bold text-foreground">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Termos
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© 2026 Hanndrey Cascaes - Corretor de Imóveis. Todos os direitos reservados.</p>
            <p className="mt-2">CRECI: [Inserir CRECI] | Bacharel em Direito | Manaus - Amazonas</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
