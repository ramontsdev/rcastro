import { notFound } from 'next/navigation'
import { PRODUCTS, getProductById } from '@/lib/products'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductDetails } from '@/components/product-details'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }))
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params
  const product = getProductById(id)
  
  if (!product) {
    return {
      title: 'Produto não encontrado | Bella Borsa',
    }
  }

  return {
    title: `${product.name} | Bella Borsa`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">
        <ProductDetails product={product} />
      </main>
      <Footer />
    </>
  )
}
