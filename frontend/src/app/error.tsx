'use client'

import Link from 'next/link'
import { useEffect } from 'react'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">
        <section className="py-20">
          <div className="mx-auto max-w-2xl px-4 text-center">
            <h1 className="mb-4 font-serif text-3xl font-semibold text-foreground">Algo deu errado</h1>
            <p className="mb-8 text-muted-foreground">
              Tente novamente. Se o erro persistir, volte para a loja e refaça o caminho.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" onClick={() => reset()}>
                Tentar novamente
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/">Voltar para a loja</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

