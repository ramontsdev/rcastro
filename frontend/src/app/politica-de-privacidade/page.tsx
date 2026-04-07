import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { siteName } from '@/lib/site'

export const metadata = {
  title: 'Política de privacidade',
  description: `Política de privacidade da ${siteName}.`,
}

export default function PoliticaDePrivacidadePage() {
  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-3xl font-semibold text-foreground">Política de privacidade</h1>
            <p className="mt-6 text-muted-foreground">
              Esta é uma página base para publicar a política de privacidade da {siteName}. Antes do go-live,
              substitua pelo texto jurídico final (LGPD), descrevendo dados coletados no checkout (nome, e-mail,
              endereço, telefone), finalidade, retenção e direitos do titular.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

