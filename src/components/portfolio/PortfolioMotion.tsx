'use client'

import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const transitionEase = [0.22, 1, 0.36, 1] as const

type MotionRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  scale?: number
  y?: number
}

type MotionStaggerProps = {
  children: ReactNode
  className?: string
  delayChildren?: number
  staggerChildren?: number
}

type HoverPreset = 'button' | 'card' | 'chip' | 'none'

type MotionStaggerItemProps = {
  children: ReactNode
  className?: string
  hover?: HoverPreset
  inline?: boolean
}

const hoverPresets: Record<Exclude<HoverPreset, 'none'>, { scale: number; y: number }> = {
  button: {
    scale: 1.012,
    y: -3,
  },
  card: {
    scale: 1.01,
    y: -7,
  },
  chip: {
    scale: 1.018,
    y: -2,
  },
}

export const MotionReveal = ({ children, className, delay = 0, scale = 0.985, y = 24 }: MotionRevealProps) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale, y }}
      transition={{
        delay,
        duration: 0.56,
        ease: transitionEase,
      }}
      viewport={{ amount: 0.22, once: true }}
      whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
    >
      {children}
    </motion.div>
  )
}

export const MotionStagger = ({
  children,
  className,
  delayChildren = 0.05,
  staggerChildren = 0.08,
}: MotionStaggerProps) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial="hidden"
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren,
            staggerChildren: prefersReducedMotion ? 0 : staggerChildren,
          },
        },
      }}
      viewport={{ amount: 0.18, once: true }}
      whileInView="visible"
    >
      {children}
    </motion.div>
  )
}

export const MotionStaggerItem = ({
  children,
  className,
  hover = 'none',
  inline = false,
}: MotionStaggerItemProps) => {
  const prefersReducedMotion = useReducedMotion()
  const hoverState = !prefersReducedMotion && hover !== 'none' ? hoverPresets[hover] : undefined

  return (
    <motion.div
      className={className}
      style={inline ? { display: 'inline-block' } : undefined}
      transition={{
        duration: 0.44,
        ease: transitionEase,
      }}
      variants={{
        hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={hoverState}
      whileTap={!prefersReducedMotion && hover === 'button' ? { scale: 0.99 } : undefined}
    >
      {children}
    </motion.div>
  )
}
