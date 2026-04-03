'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

import styles from './PortfolioNavbar.module.css'

type NavLink = {
  href: string
  label: string
  rel?: string
  target?: string
}

type Props = {
  brand: React.ReactNode
  links: NavLink[]
}

export const PortfolioNavbar = ({ brand, links }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)

    onScroll()
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.navbarScrolled : ''}`}>
      <div className={styles.navbarInner}>
        <a className={styles.brand} href="#top" onClick={closeMenu}>
          {brand}
        </a>

        <div className={styles.desktopLinks}>
          {links.map((link) => (
            <a key={`${link.label}-${link.href}`} className={styles.navLink} href={link.href} rel={link.rel} target={link.target}>
              {link.label}
            </a>
          ))}
        </div>

        <button
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className={styles.mobileToggle}
          onClick={() => setIsMenuOpen((current) => !current)}
          type="button"
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {isMenuOpen ? (
        <div className={styles.mobilePanel}>
          {links.map((link) => (
            <a
              key={`mobile-${link.label}-${link.href}`}
              className={styles.mobileLink}
              href={link.href}
              onClick={closeMenu}
              rel={link.rel}
              target={link.target}
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </nav>
  )
}
