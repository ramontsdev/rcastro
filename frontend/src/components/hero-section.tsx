import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Coleção de bolsas de crochê artesanais"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-xl">
          <p className="text-sm uppercase tracking-[0.2em] text-accent mb-4 font-medium">
            Peças Numeradas e Exclusivas
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-6 text-balance">
            Arte em Cada Ponto de Crochê
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Bolsas de crochê feitas à mão em edições limitadas. 
            Cada peça é numerada e única, criada com técnicas tradicionais passadas de geração em geração.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/#colecao">
              <Button size="lg" className="px-8">
                Ver Coleção
              </Button>
            </Link>
            <Link href="/#sobre">
              <Button size="lg" variant="outline" className="px-8 bg-transparent">
                Nossa História
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
