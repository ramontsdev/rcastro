import Link from 'next/link'

import { CheckoutSuccessClearCart } from '@/components/checkout-success-clear-cart'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { siteName } from '@/lib/site'
import { CheckCircle2 } from 'lucide-react'

export const metadata = {
  title: 'Pagamento',
  description: `Confirmação de pagamento — ${siteName}.`,
}

type Props = {
  searchParams: Promise<{ session_id?: string }>
}

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { session_id: sessionId } = await searchParams

  return (
    <>
      <Header />
      <CheckoutSuccessClearCart />
      <main className="pt-16 lg:pt-20">
        <section className="py-20">
          <div className="mx-auto max-w-2xl px-4 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="mb-4 font-serif text-3xl font-semibold text-foreground">
              Pagamento recebido
            </h1>
            <p className="mb-2 text-muted-foreground">
              Obrigado pela sua compra. Enviaremos a confirmação por e-mail assim que o pagamento for
              confirmado.
            </p>
            {sessionId ? (
              <p className="mb-8 font-mono text-xs text-muted-foreground">
                Referência: {sessionId.slice(0, 24)}…
              </p>
            ) : (
              <p className="mb-8 text-sm text-muted-foreground">
                Se não visualizar o e-mail em alguns minutos, verifique a pasta de spam.
              </p>
            )}
            <Link href="/">
              <Button size="lg">Voltar para a loja</Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
