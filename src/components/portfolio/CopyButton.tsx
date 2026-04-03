'use client'

import { useState } from 'react'

type Props = {
  className?: string
  label: string
  value?: null | string
}

export const CopyButton = ({ className, label, value }: Props) => {
  const [copied, setCopied] = useState(false)

  const handleClick = async () => {
    if (!value) {
      return
    }

    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button className={className} onClick={handleClick} type="button">
      {copied ? 'Đã sao chép' : label}
    </button>
  )
}
