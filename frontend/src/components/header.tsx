'use client'

import { CartDrawer } from '@/components/cart-drawer'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'
import { useCart } from '@/contexts/cart-context'
import { siteName } from '@/lib/site'
import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { totalItems, setIsOpen } = useCart()
  const { user, isAuthenticated, isReady, logout } = useAuth()

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 -ml-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Logo */}
            <Link href="/" className="shrink-0">
              <h1 className="font-serif text-2xl lg:text-3xl font-semibold tracking-tight text-foreground">
                {siteName}
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                href="/"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Início
              </Link>
              <Link
                href="/#colecao"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Coleção
              </Link>
              <Link
                href="/#sobre"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Sobre
              </Link>
              <Link
                href="/#contato"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Contato
              </Link>
            </nav>

            {/* Right section */}
            <div className="flex items-center gap-1 sm:gap-2">
              {isReady && isAuthenticated ? (
                <>
                  <span
                    className="hidden max-w-[140px] truncate text-sm text-muted-foreground md:inline"
                    title={user?.email}
                  >
                    {user?.name?.split(' ')[0] ?? user?.email}
                  </span>
                  <Button variant="ghost" size="sm" className="hidden md:inline-flex" asChild>
                    <Link href="/conta/pedidos">Meus pedidos</Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="hidden sm:inline-flex" onClick={() => logout()}>
                    Sair
                  </Button>
                </>
              ) : isReady ? (
                <Button variant="outline" size="sm" className="hidden sm:inline-flex" asChild>
                  <Link href="/entrar">Entrar</Link>
                </Button>
              ) : null}
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Search className="h-5 w-5" />
                <span className="sr-only">Buscar</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsOpen(true)}
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
                <span className="sr-only">Carrinho</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden border-t border-border bg-background">
            <div className="px-4 py-4 space-y-3">
              <Link
                href="/"
                className="block text-base font-medium text-foreground py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Início
              </Link>
              <Link
                href="/#colecao"
                className="block text-base font-medium text-muted-foreground py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Coleção
              </Link>
              <Link
                href="/#sobre"
                className="block text-base font-medium text-muted-foreground py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sobre
              </Link>
              <Link
                href="/#contato"
                className="block text-base font-medium text-muted-foreground py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contato
              </Link>
              {isReady && isAuthenticated ? (
                <>
                  <p className="pt-2 text-sm text-muted-foreground">
                    Olá, {user?.name?.split(' ')[0]}
                  </p>
                  <Link
                    href="/conta/pedidos"
                    className="block rounded-md border border-border py-2 text-center text-base font-medium text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Meus pedidos
                  </Link>
                  <button
                    type="button"
                    className="block w-full rounded-md border border-border py-2 text-center text-base font-medium text-foreground"
                    onClick={() => {
                      logout()
                      setMobileMenuOpen(false)
                    }}
                  >
                    Sair
                  </button>
                </>
              ) : isReady ? (
                <Link
                  href="/entrar"
                  className="block rounded-md bg-primary py-2 text-center text-base font-medium text-primary-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Entrar
                </Link>
              ) : null}
            </div>
          </nav>
        )}
      </header>
      <CartDrawer />
    </>
  )
}
