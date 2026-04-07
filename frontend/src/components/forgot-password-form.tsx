'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { apiForgotPassword } from '@/lib/auth-api'

export function ForgotPasswordForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await apiForgotPassword(email)
      setDone(true)
      router.push(`/nova-senha?email=${encodeURIComponent(email.trim())}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao solicitar recuperação.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-md px-4">
        <h1 className="mb-2 font-serif text-3xl font-semibold text-foreground">Recuperar senha</h1>
        <p className="mb-8 text-muted-foreground">
          Enviaremos um código para o seu e-mail para criar uma nova senha.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="forgot-email">E-mail</Label>
            <Input
              id="forgot-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}

          {done ? (
            <p className="text-sm text-muted-foreground">Pedido enviado. Redirecionando…</p>
          ) : null}

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? 'Enviando…' : 'Enviar código'}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Lembrou?{' '}
          <Link href="/entrar" className="font-medium text-foreground underline-offset-4 hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </section>
  )
}

