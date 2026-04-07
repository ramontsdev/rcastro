import { Suspense } from 'react'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { ResetPasswordForm } from '@/components/reset-password-form'
import { siteName } from '@/lib/site'

export const metadata = {
  title: 'Nova senha',
  description: `Defina uma nova senha na ${siteName}.`,
}

export default function NovaSenhaPage() {
  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">
        <Suspense fallback={<div className="py-16" />}>
          <ResetPasswordForm />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

