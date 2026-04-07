import { notFound } from 'next/navigation'
import { fetchCommerceProductBySlug } from '@/lib/commerce-products'
import { siteName } from '@/lib/site'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductDetails } from '@/components/product-details'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params
  const product = await fetchCommerceProductBySlug(id).catch(() => null)
  
  if (!product) {
    return {
      title: { absolute: `Produto não encontrado | ${siteName}` },
    }
  }

  return {
    title: product.name,
    description: product.description,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = await fetchCommerceProductBySlug(id).catch(() => null)

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
