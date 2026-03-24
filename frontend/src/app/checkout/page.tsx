import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CheckoutForm } from '@/components/checkout-form'

export const metadata = {
  title: 'Checkout | Bella Borsa',
  description: 'Finalize sua compra na Bella Borsa',
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
