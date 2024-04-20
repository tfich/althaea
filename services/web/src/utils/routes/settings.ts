import PageRoute from '../../types/PageRoute'

const settingsRoutes: PageRoute[] = [
  {
    name: 'General',
    href: '/dashboard/settings',
    exact: true,
    asPath: '/dashboard/settings/general'
  },
  {
    name: 'Billing',
    href: '/dashboard/settings/billing'
  },
  {
    name: 'Group Admins',
    href: '/dashboard/settings/admins'
  },
  {
    name: 'Developers',
    href: '/dashboard/settings/developers'
  }
]

export default settingsRoutes
