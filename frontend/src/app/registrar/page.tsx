import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { SignUpForm } from '@/components/signup-form'
import { siteName } from '@/lib/site'

export const metadata = {
  title: 'Criar conta',
  description: `Crie sua conta na ${siteName}.`,
}

export default function RegistrarPage() {
  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">
        <SignUpForm />
      </main>
      <Footer />
    </>
  )
}

