'use client'

import { useCart } from '@/contexts/cart-context'
import { useEffect, useRef } from 'react'

/** Após retorno do Stripe Checkout com sucesso, evita que o carrinho antigo permaneça preenchido. */
export function CheckoutSuccessClearCart() {
  const { clearCart } = useCart()
  const done = useRef(false)

  useEffect(() => {
    if (done.current) return
    done.current = true
    clearCart()
  }, [clearCart])

  return null
}
