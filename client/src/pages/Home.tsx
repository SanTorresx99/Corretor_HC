import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Shield, Users, FileCheck } from "lucide-react";
import { useState, useEffect } from "react";

/**
 * Landing Page - Hanndrey Cascaes
 * Design: Minimalismo Cinematográfico Escuro (Dark Elegance)
 * Paleta: Preto Profundo + Dourado Champagne + Branco Puro
 * Tipografia: Playfair Display (títulos) + Montserrat (subtítulos) + Inter (corpo)
 */

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between py-4 md:py-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-lg">HC</span>
            </div>
            <span className="hidden md:block font-heading font-semibold text-lg">Hanndrey Cascaes</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#sobre" className="text-sm font-medium hover:text-accent transition-colors">
              Sobre
            </a>
            <a href="#imoveis" className="text-sm font-medium hover:text-accent transition-colors">
              Imóveis
            </a>
            <a href="#processo" className="text-sm font-medium hover:text-accent transition-colors">
              Processo
            </a>
            <a href="#contato" className="text-sm font-medium hover:text-accent transition-colors">
              Contato
            </a>
          </div>

          <Button className="btn-primary text-sm">Agendar Consulta</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary opacity-50" />

        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url('/manus-storage/mockup_dark_bf81598d.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="container relative z-10 grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 fade-in">
            <div className="space-y-4">
              <p className="text-accent font-heading font-semibold text-sm md:text-base tracking-wider">
                CORRETOR DE IMÓVEIS | BACHAREL EM DIREITO
              </p>
              <h1 className="hero-text text-foreground">
                O Imóvel Certo Existe. E Eu Sei Onde Encontrá-lo.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
                Especialista em transformar o seu sonho em um endereço real em Manaus. Atendimento exclusivo, segurança jurídica e as melhores condições do mercado.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="btn-primary flex items-center gap-2">
                Fazer Simulação Gratuita
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button className="btn-secondary flex items-center gap-2">
                Falar no WhatsApp
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border">
              <div>
                <p className="text-2xl font-bold text-accent">100+</p>
                <p className="text-sm text-muted-foreground">Clientes Satisfeitos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">18</p>
                <p className="text-sm text-muted-foreground">Imóveis Exclusivos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">10+</p>
                <p className="text-sm text-muted-foreground">Anos de Experiência</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden md:block relative h-96 lg:h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-2xl" />
            <img
              src="/manus-storage/mockup_light_7b6e3be8.png"
              alt="Imóvel de Luxo em Manaus"
              className="w-full h-full object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-accent rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-accent rounded-full" />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* About Section */}
      <section id="sobre" className="py-20 md:py-32 bg-secondary/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 slide-up">
              <h2 className="text-foreground">Muito Mais Que Negócios, Construímos Relações.</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Olá, sou Hanndrey Cascaes. Com formação em Direito e paixão pelo mercado imobiliário, meu objetivo não é apenas vender imóveis, mas garantir que você faça o investimento mais seguro e inteligente da sua vida.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Entendo que por trás de cada contrato existe o sonho de uma família, e é por isso que dedico meu tempo, conhecimento e esforço para encontrar a chave perfeita para você.
              </p>

              {/* Features */}
              <div className="space-y-4 pt-4">
                <div className="flex gap-4 items-start">
                  <Shield className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">Segurança Jurídica</h3>
                    <p className="text-sm text-muted-foreground">Em cada etapa do processo</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <Users className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">Atendimento Humanizado</h3>
                    <p className="text-sm text-muted-foreground">Exclusivo e dedicado</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <FileCheck className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading font-semibold text-foreground">Especialista em Financiamento</h3>
                    <p className="text-sm text-muted-foreground">Análise de crédito e aprovação</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-card p-8 rounded-xl border border-border hover:border-accent transition-colors">
                <p className="text-4xl font-bold text-accent mb-2">100+</p>
                <p className="text-muted-foreground">Clientes Satisfeitos</p>
              </div>
              <div className="bg-card p-8 rounded-xl border border-border hover:border-accent transition-colors">
                <p className="text-4xl font-bold text-accent mb-2">R$50M+</p>
                <p className="text-muted-foreground">Negociados</p>
              </div>
              <div className="bg-card p-8 rounded-xl border border-border hover:border-accent transition-colors">
                <p className="text-4xl font-bold text-accent mb-2">18</p>
                <p className="text-muted-foreground">Empreendimentos</p>
              </div>
              <div className="bg-card p-8 rounded-xl border border-border hover:border-accent transition-colors">
                <p className="text-4xl font-bold text-accent mb-2">10+</p>
                <p className="text-muted-foreground">Anos de Experiência</p>
              </div>
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
            <h2 className="text-foreground">Oportunidades Exclusivas em Manaus</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Seleção cuidadosa de imóveis de alto padrão com as melhores condições de financiamento
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group bg-card rounded-xl overflow-hidden border border-border hover:border-accent transition-all duration-300 hover:shadow-xl">
              <div className="h-64 bg-gradient-to-br from-accent/20 to-secondary relative overflow-hidden">
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <MapPin className="absolute top-4 right-4 w-6 h-6 text-accent" />
              </div>
              <div className="p-8 space-y-4">
                <h3 className="text-2xl font-heading font-semibold text-foreground">Ponta Negra</h3>
                <p className="text-muted-foreground">Vista para o rio, 2 e 3 quartos com varanda gourmet.</p>
                <div className="space-y-2 text-sm">
                  <p className="text-accent font-semibold">Renda a partir de R$18 mil</p>
                  <p className="text-muted-foreground">Entrada facilitada | Financiamento até 90%</p>
                </div>
                <Button className="btn-secondary w-full">Ver Detalhes</Button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group bg-card rounded-xl overflow-hidden border border-border hover:border-accent transition-all duration-300 hover:shadow-xl">
              <div className="h-64 bg-gradient-to-br from-accent/20 to-secondary relative overflow-hidden">
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <MapPin className="absolute top-4 right-4 w-6 h-6 text-accent" />
              </div>
              <div className="p-8 space-y-4">
                <h3 className="text-2xl font-heading font-semibold text-foreground">Aleixo (Zenith)</h3>
                <p className="text-muted-foreground">Apartamentos modernos com +10 áreas de lazer.</p>
                <div className="space-y-2 text-sm">
                  <p className="text-accent font-semibold">Localização Premium</p>
                  <p className="text-muted-foreground">Av. André Araújo | Conforto e qualidade</p>
                </div>
                <Button className="btn-secondary w-full">Ver Detalhes</Button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group bg-card rounded-xl overflow-hidden border border-border hover:border-accent transition-all duration-300 hover:shadow-xl">
              <div className="h-64 bg-gradient-to-br from-accent/20 to-secondary relative overflow-hidden">
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <MapPin className="absolute top-4 right-4 w-6 h-6 text-accent" />
              </div>
              <div className="p-8 space-y-4">
                <h3 className="text-2xl font-heading font-semibold text-foreground">Coroado</h3>
                <p className="text-muted-foreground">Seu apartamento próprio em 2026 com FGTS.</p>
                <div className="space-y-2 text-sm">
                  <p className="text-accent font-semibold">Renda a partir de R$10 mil</p>
                  <p className="text-muted-foreground">Parcelas a partir de R$1.500</p>
                </div>
                <Button className="btn-secondary w-full">Ver Detalhes</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* Process Section */}
      <section id="processo" className="py-20 md:py-32 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-foreground">O Caminho Para o Seu Novo Lar</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Processo simplificado e transparente, do primeiro contato até a entrega das chaves
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: "📝",
                title: "Análise de Crédito",
                description: "Entendemos seu perfil e capacidade de investimento",
              },
              {
                icon: "🔍",
                title: "Seleção Exclusiva",
                description: "Apresentamos as melhores opções para seu sonho",
              },
              {
                icon: "🏦",
                title: "Aprovação",
                description: "Cuidamos de toda a burocracia com segurança",
              },
              {
                icon: "🔑",
                title: "Entrega das Chaves",
                description: "Momento de celebrar sua nova conquista",
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-card p-8 rounded-xl border border-border text-center space-y-4 hover:border-accent transition-colors">
                  <div className="text-5xl">{step.icon}</div>
                  <h3 className="font-heading font-semibold text-foreground text-lg">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
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

      {/* CTA Section */}
      <section id="contato" className="py-20 md:py-32">
        <div className="container">
          <div className="bg-gradient-to-br from-card to-secondary rounded-2xl p-12 md:p-16 text-center space-y-8 border border-border">
            <h2 className="text-foreground">Pronto Para Dar o Próximo Passo?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Chega de adiar o seu sonho. Fale comigo agora e descubra como é fácil conquistar o seu imóvel próprio.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button className="btn-primary text-base px-10 py-4">
                Falar com Hanndrey no WhatsApp
              </Button>
              <Button className="btn-secondary text-base px-10 py-4">
                Agendar Consulta
              </Button>
            </div>

            <p className="text-sm text-muted-foreground pt-4">
              Resposta rápida | Atendimento 24/7 | Sem compromisso
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/50 border-t border-border py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <span className="text-accent-foreground font-bold">HC</span>
                </div>
                <span className="font-heading font-semibold">Hanndrey Cascaes</span>
              </div>
              <p className="text-sm text-muted-foreground">Corretor de Imóveis em Manaus</p>
            </div>

            <div className="space-y-4">
              <h4 className="font-heading font-semibold text-foreground">Links</h4>
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
              <h4 className="font-heading font-semibold text-foreground">Contato</h4>
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
              <h4 className="font-heading font-semibold text-foreground">Legal</h4>
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
            <p className="mt-2">CRECI: [Inserir CRECI] | Bacharel em Direito</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
