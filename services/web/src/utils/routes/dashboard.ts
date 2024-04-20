import PageRoute from '../../types/PageRoute'

const dashboardRoutes: PageRoute[] = [
  {
    name: 'Overview',
    href: '/dashboard',
    exact: true
  },
  {
    name: 'Bot',
    href: '/dashboard/bot'
  },
  {
    name: 'Tools',
    href: '/dashboard/tools'
  },
  {
    name: 'Users',
    href: '/dashboard/users'
  },
  {
    name: 'Settings',
    href: '/dashboard/settings'
  }
]

export default dashboardRoutes
