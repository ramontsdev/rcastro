'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { apiConfirmEmail } from '@/lib/auth-api'

export function ConfirmEmailForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const prefillEmail = useMemo(() => searchParams.get('email') ?? '', [searchParams])

  const [email, setEmail] = useState(prefillEmail)
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await apiConfirmEmail({ email, code })
      setSuccess(true)
      router.push('/entrar')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao confirmar e-mail.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-md px-4">
        <h1 className="mb-2 font-serif text-3xl font-semibold text-foreground">Confirmar e-mail</h1>
        <p className="mb-8 text-muted-foreground">
          Insira o código enviado para o seu e-mail para ativar a conta.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="confirm-email">E-mail</Label>
            <Input
              id="confirm-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="confirm-code">Código</Label>
            <Input
              id="confirm-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>

          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}

          {success ? (
            <p className="text-sm text-muted-foreground">E-mail confirmado. Redirecionando…</p>
          ) : null}

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? 'Confirmando…' : 'Confirmar'}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Já confirmou?{' '}
          <Link href="/entrar" className="font-medium text-foreground underline-offset-4 hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </section>
  )
}

