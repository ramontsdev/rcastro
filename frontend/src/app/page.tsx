import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { CatalogSection } from '@/components/catalog-section'
import { AboutSection } from '@/components/about-section'
import { Footer } from '@/components/footer'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">
        <HeroSection />
        <CatalogSection />
        <AboutSection />
      </main>
      <Footer />
    </>
  )
}
