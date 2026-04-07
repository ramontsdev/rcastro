import Link from 'next/link'
import { Instagram, Facebook, Mail } from 'lucide-react'
import { contactEmail, siteName } from '@/lib/site'

export function Footer() {
  return (
    <footer id="contato" className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-serif text-2xl font-semibold mb-4">{siteName}</h3>
            <p className="text-background/70 text-sm leading-relaxed">
              Grife de bolsas feitas à mão, numeradas e em tiragens reduzidas. 
              Crochê artesanal e couro sintético premium, com o mesmo rigor de acabamento.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-medium mb-4 text-sm uppercase tracking-wider">Loja</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/#colecao" className="text-background/70 hover:text-background text-sm transition-colors">
                  Coleção
                </Link>
              </li>
              <li>
                <Link href="/#sobre" className="text-background/70 hover:text-background text-sm transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/#" className="text-background/70 hover:text-background text-sm transition-colors">
                  Novidades
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-medium mb-4 text-sm uppercase tracking-wider">Suporte</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/#" className="text-background/70 hover:text-background text-sm transition-colors">
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link href="/#" className="text-background/70 hover:text-background text-sm transition-colors">
                  Prazo de Entrega
                </Link>
              </li>
              <li>
                <Link href="/#" className="text-background/70 hover:text-background text-sm transition-colors">
                  Perguntas Frequentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium mb-4 text-sm uppercase tracking-wider">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-background/70 text-sm">
                <Mail className="h-4 w-4" />
                {contactEmail}
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-background/70 hover:text-background transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-background/70 hover:text-background transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-sm">
            2026 {siteName}. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="/politica-de-privacidade" className="text-background/50 hover:text-background text-sm transition-colors">
              Política de Privacidade
            </Link>
            <Link href="/termos-de-uso" className="text-background/50 hover:text-background text-sm transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
