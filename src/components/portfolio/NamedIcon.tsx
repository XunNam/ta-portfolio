import type { LucideIcon } from 'lucide-react'
import {
  BadgeCheck,
  Briefcase,
  Code2,
  Cpu,
  ExternalLink,
  Folder,
  Globe,
  ImageIcon,
  LayoutTemplate,
  Link as LinkIcon,
  Mail,
  MonitorSmartphone,
  Send,
  Smartphone,
  Sparkles,
  Star,
  Users,
} from 'lucide-react'
import type { SVGProps } from 'react'

import { DEFAULT_ICON_NAME } from '@/constants/iconOptions'

const GitHubIcon = ({ className, size = 24, strokeWidth = 1.8, ...props }: SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number }) => (
  <svg
    aria-hidden
    className={className}
    fill="none"
    height={size}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={strokeWidth}
    viewBox="0 0 24 24"
    width={size}
    {...props}
  >
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.6c0-1 .1-1.4-.5-2a4.8 4.8 0 0 0-.3-6.6 4.4 4.4 0 0 0-.1-3.2s-1.1-.3-3.6 1.2a12.5 12.5 0 0 0-6.5 0C1.5 6.3.4 6.6.4 6.6a4.4 4.4 0 0 0-.1 3.2 4.8 4.8 0 0 0-.3 6.6c-.6.6-.6 1-.6 2V22" />
  </svg>
)

const ICON_MAP: Record<string, LucideIcon> = {
  badge: BadgeCheck,
  briefcase: Briefcase,
  code: Code2,
  cpu: Cpu,
  'external-link': ExternalLink,
  folder: Folder,
  github: GitHubIcon as unknown as LucideIcon,
  globe: Globe,
  image: ImageIcon,
  layout: LayoutTemplate,
  link: LinkIcon,
  mail: Mail,
  monitor: MonitorSmartphone,
  send: Send,
  smartphone: Smartphone,
  sparkles: Sparkles,
  star: Star,
  users: Users,
}

type Props = {
  className?: string
  name?: null | string
  size?: number
  strokeWidth?: number
}

export const NamedIcon = ({ className, name, size = 24, strokeWidth = 1.8 }: Props) => {
  const Icon = ICON_MAP[name || DEFAULT_ICON_NAME] || ICON_MAP[DEFAULT_ICON_NAME]

  return <Icon aria-hidden className={className} size={size} strokeWidth={strokeWidth} />
}
