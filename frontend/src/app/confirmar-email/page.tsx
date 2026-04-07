import { Suspense } from 'react'

import { ConfirmEmailForm } from '@/components/confirm-email-form'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { siteName } from '@/lib/site'

export const metadata = {
  title: 'Confirmar e-mail',
  description: `Ative sua conta na ${siteName}.`,
}

export default function ConfirmarEmailPage() {
  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">
        <Suspense fallback={<div className="py-16" />}>
          <ConfirmEmailForm />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

