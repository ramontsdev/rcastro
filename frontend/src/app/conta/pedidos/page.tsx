import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { MyOrders } from '@/components/my-orders'
import { siteName } from '@/lib/site'

export const metadata = {
  title: 'Meus pedidos',
  description: `Histórico de compras na ${siteName}.`,
}

export default function MyOrdersPage() {
  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">
        <MyOrders />
      </main>
      <Footer />
    </>
  )
}

