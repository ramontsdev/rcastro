import Link from 'next/link'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">
        <section className="py-20">
          <div className="mx-auto max-w-2xl px-4 text-center">
            <h1 className="mb-4 font-serif text-3xl font-semibold text-foreground">Página não encontrada</h1>
            <p className="mb-8 text-muted-foreground">
              O link pode ter expirado, ou a página foi movida.
            </p>
            <Button asChild size="lg">
              <Link href="/">Voltar para a loja</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

