import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { CatalogSection } from '@/components/catalog-section'
import { AboutSection } from '@/components/about-section'
import { Footer } from '@/components/footer'
import { fetchCommerceProducts } from '@/lib/commerce-products'
import { PRODUCTS } from '@/lib/products'

export default async function HomePage() {
  const products = await fetchCommerceProducts().catch(() => PRODUCTS)

  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">
        <HeroSection />
        <CatalogSection products={products} />
        <AboutSection />
      </main>
      <Footer />
    </>
  )
}
