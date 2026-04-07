import { getApiBaseUrl } from '@/lib/api-base'

export type AuthUser = {
  id: string
  name: string
  email: string
  isEmailVerified: boolean
  createdAt: string
  updatedAt: string
}

function messageFromBody(body: unknown): string {
  if (body && typeof body === 'object' && 'error' in body && typeof (body as { error: string }).error === 'string') {
    return (body as { error: string }).error
  }
  return 'Não foi possível concluir o pedido.'
}

export async function apiSignIn(email: string, password: string): Promise<{ accessToken: string }> {
  const res = await fetch(`${getApiBaseUrl()}/api/sign-in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.trim(), password }),
  })
  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(messageFromBody(data))
  }

  if (!data?.accessToken || typeof data.accessToken !== 'string') {
    throw new Error('Resposta inválida do servidor.')
  }

  return { accessToken: data.accessToken }
}

export async function apiFetchMe(accessToken: string): Promise<AuthUser> {
  const res = await fetch(`${getApiBaseUrl()}/api/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(messageFromBody(data))
  }

  if (!data?.id || !data?.email) {
    throw new Error('Resposta inválida do servidor.')
  }

  return data as AuthUser
}

export async function apiSignUp(input: {
  name: string
  email: string
  document: string
  password: string
  passwordConfirmation: string
}): Promise<void> {
  const res = await fetch(`${getApiBaseUrl()}/api/sign-up`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(messageFromBody(data))
  }
}

export async function apiConfirmEmail(input: { email: string; code: string }): Promise<void> {
  const res = await fetch(`${getApiBaseUrl()}/api/confirm-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: input.email.trim(), code: input.code.trim() }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(messageFromBody(data))
  }
}

export async function apiForgotPassword(email: string): Promise<void> {
  const res = await fetch(`${getApiBaseUrl()}/api/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.trim() }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(messageFromBody(data))
  }
}

export async function apiResetPassword(input: {
  email: string
  code: string
  password: string
  passwordConfirmation: string
}): Promise<void> {
  const res = await fetch(`${getApiBaseUrl()}/api/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: input.email.trim(),
      code: input.code.trim(),
      password: input.password,
      passwordConfirmation: input.passwordConfirmation,
    }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(messageFromBody(data))
  }
}
