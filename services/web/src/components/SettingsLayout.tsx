import Link from 'next/link'
import isSelected from '../utils/isSelected'
import settingsRoutes from '../utils/routes/settings'
import Layout from './Layout'
import VerticalNavButton from './VerticalNavButton'

const SettingsLayout: React.FC = ({ children }) => {
  return (
    <Layout title="Settings" grayBackground>
      <div className="lg:hidden">
        <Link href="/dashboard/settings">
          <a className="flex items-center my-4">
            <h3 className="ml-1 text-lg leading-6 font-medium text-gray-900">&larr; Group Settings</h3>
          </a>
        </Link>
      </div>
      <div className="flex mt-5">
        <div className="hidden lg:block w-full lg:w-1/5 mr-6">
          <nav>
            {settingsRoutes.map((route) => (
              <VerticalNavButton href={route.href} name={route.name} selected={isSelected(route)} key={route.name} />
            ))}
          </nav>
        </div>
        <div className="w-full lg:w-4/5">{children}</div>
      </div>
    </Layout>
  )
}

export default SettingsLayout
