'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

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
  const prefersReducedMotion = useReducedMotion()

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
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              initial={{ opacity: 0, rotate: isMenuOpen ? -42 : 42, scale: 0.88 }}
              key={isMenuOpen ? 'close' : 'open'}
              transition={{
                duration: prefersReducedMotion ? 0.12 : 0.22,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isMenuOpen ? (
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className={styles.mobilePanel}
            exit={{ opacity: 0, scale: 0.98, y: -12 }}
            initial={{ opacity: 0, scale: 0.98, y: -16 }}
            transition={{
              duration: prefersReducedMotion ? 0.12 : 0.24,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {links.map((link, index) => (
              <motion.a
                animate={{ opacity: 1, x: 0 }}
                className={styles.mobileLink}
                href={link.href}
                initial={{ opacity: 0, x: -10 }}
                key={`mobile-${link.label}-${link.href}`}
                onClick={closeMenu}
                rel={link.rel}
                target={link.target}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.04 * index,
                  duration: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  )
}
