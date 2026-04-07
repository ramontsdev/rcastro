'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { apiSignUp } from '@/lib/auth-api'

export function SignUpForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const [form, setForm] = useState({
    name: '',
    email: '',
    document: '',
    password: '',
    passwordConfirmation: '',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await apiSignUp(form)
      setDone(true)
      router.push(`/confirmar-email?email=${encodeURIComponent(form.email.trim())}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao criar conta.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-md px-4">
        <h1 className="mb-2 font-serif text-3xl font-semibold text-foreground">Criar conta</h1>
        <p className="mb-8 text-muted-foreground">
          Para concluir o cadastro, enviaremos um código de verificação para o seu e-mail.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="signup-name">Nome</Label>
            <Input
              id="signup-name"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="signup-email">E-mail</Label>
            <Input
              id="signup-email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="signup-document">Documento</Label>
            <Input
              id="signup-document"
              placeholder="CPF ou outro identificador"
              value={form.document}
              onChange={(e) => setForm((p) => ({ ...p, document: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label htmlFor="signup-password">Senha</Label>
            <Input
              id="signup-password"
              type="password"
              autoComplete="new-password"
              value={form.password}
              onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
              required
              minLength={8}
            />
          </div>
          <div>
            <Label htmlFor="signup-passwordConfirmation">Confirmar senha</Label>
            <Input
              id="signup-passwordConfirmation"
              type="password"
              autoComplete="new-password"
              value={form.passwordConfirmation}
              onChange={(e) => setForm((p) => ({ ...p, passwordConfirmation: e.target.value }))}
              required
              minLength={8}
            />
          </div>

          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}

          {done ? (
            <p className="text-sm text-muted-foreground">Conta criada. Redirecionando…</p>
          ) : null}

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? 'Criando…' : 'Criar conta'}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Já tem conta?{' '}
          <Link href="/entrar" className="font-medium text-foreground underline-offset-4 hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </section>
  )
}

