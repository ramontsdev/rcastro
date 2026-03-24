import { Award, Leaf, Heart } from 'lucide-react'

export function AboutSection() {
  return (
    <section id="sobre" className="py-20 lg:py-28 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-accent mb-3 font-medium">
            Sobre Nós
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Nossa História
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A Mãos de Fio nasceu da paixão pelo crochê e pelo trabalho artesanal. 
            Cada peça é criada com técnicas tradicionais, preservando uma arte que passa de geração em geração.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-background rounded-xl p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
              <Award className="h-7 w-7 text-accent" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
              100% Artesanal
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Cada bolsa é feita inteiramente à mão, ponto por ponto, 
              garantindo uma peça única e exclusiva para você.
            </p>
          </div>

          <div className="bg-background rounded-xl p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
              <Heart className="h-7 w-7 text-accent" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
              Feito com Amor
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Por trás de cada peça está o carinho de artesãs que dedicam 
              horas de trabalho manual para criar algo especial.
            </p>
          </div>

          <div className="bg-background rounded-xl p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
              <Leaf className="h-7 w-7 text-accent" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
              Fios Naturais
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Trabalhamos com fios de algodão natural e materiais sustentáveis, 
              respeitando o meio ambiente em cada criação.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
