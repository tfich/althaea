import levels from '../components/DashAlert/levels'

export default interface DashboardAlert {
  level: keyof typeof levels
  title?: string
  message?: string
  inlineLink?: AlertLink
  sideLink?: AlertLink
  bulletPoints?: string[]
  dismissButton?: boolean
  overviewOnly?: boolean
}

interface AlertLink {
  title: string
  href: string
}
