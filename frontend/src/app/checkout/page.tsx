import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CheckoutForm } from '@/components/checkout-form'
import { siteName } from '@/lib/site'

export const metadata = {
  title: 'Checkout',
  description: `Finalize sua compra na ${siteName}.`,
}

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">
        <CheckoutForm />
      </main>
      <Footer />
    </>
  )
}
