import { Footer } from '@/components/footer'
import { ForgotPasswordForm } from '@/components/forgot-password-form'
import { Header } from '@/components/header'
import { siteName } from '@/lib/site'

export const metadata = {
  title: 'Recuperar senha',
  description: `Recupere o acesso à sua conta na ${siteName}.`,
}

export default function EsqueciSenhaPage() {
  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">
        <ForgotPasswordForm />
      </main>
      <Footer />
    </>
  )
}

