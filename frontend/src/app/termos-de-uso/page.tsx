import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { siteName } from '@/lib/site'

export const metadata = {
  title: 'Termos de uso',
  description: `Termos de uso da ${siteName}.`,
}

export default function TermosDeUsoPage() {
  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-3xl font-semibold text-foreground">Termos de uso</h1>
            <p className="mt-6 text-muted-foreground">
              Esta é uma página base para publicar os termos de uso da {siteName}. Antes do go-live,
              substitua pelo texto final com regras de compra, trocas, garantias e responsabilidades.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

