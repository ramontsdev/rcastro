import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { LoginForm } from '@/components/login-form'
import { siteName } from '@/lib/site'
import { Suspense } from 'react'

export const metadata = {
  title: 'Entrar',
  description: `Acesse sua conta na ${siteName}.`,
}

function LoginFallback() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-md px-4">
        <div className="h-10 w-40 animate-pulse rounded bg-muted" />
        <div className="mt-8 h-9 w-2/3 animate-pulse rounded bg-muted" />
        <div className="mt-4 h-4 w-full animate-pulse rounded bg-muted" />
        <div className="mt-8 space-y-4">
          <div className="h-10 animate-pulse rounded bg-muted" />
          <div className="h-10 animate-pulse rounded bg-muted" />
          <div className="h-11 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </section>
  )
}

export default function EntrarPage() {
  return (
    <>
      <Header />
      <main className="pt-16 lg:pt-20">
        <Suspense fallback={<LoginFallback />}>
          <LoginForm />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
