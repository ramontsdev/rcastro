import { Award, Gem, Leaf } from 'lucide-react'
import { siteName } from '@/lib/site'

export function AboutSection() {
  return (
    <section id="sobre" className="py-20 lg:py-28 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-accent mb-3 font-medium">
            A grife
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            {siteName}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Nascemos para oferecer bolsas de alto padrão, produzidas artesanalmente e lançadas em edições limitadas.
            Duas linguagens — crochê e couro sintético — com o mesmo cuidado de acabamento e identidade numerada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-background rounded-xl p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
              <Award className="h-7 w-7 text-accent" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
              100% artesanal
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Cada peça é executada manualmente, sem linha de massa. O tempo de oficina garante rigor,
              textura e um caráter que a indústria não reproduz.
            </p>
          </div>

          <div className="bg-background rounded-xl p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
              <Gem className="h-7 w-7 text-accent" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
              Tiragens numeradas
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Coleções em quantidades restritas, com numeração que atesta exclusividade.
              Para quem busca uma bolsa com história própria, não apenas um acessório.
            </p>
          </div>

          <div className="bg-background rounded-xl p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
              <Leaf className="h-7 w-7 text-accent" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
              Materiais com propósito
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Fibras naturais no crochê quando a peça pede leveza; couro sintético premium nas silhuetas estruturadas —
              sempre com escolha consciente e acabamento de grife.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
