import { gql } from '@apollo/client'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import client from '../../apollo/client'
import { GroupPartsFragmentDoc, UserPartsFragmentDoc } from '../../graphql'
import BaseCache from '../../types/BaseCache'
import isSelected from '../../utils/isSelected'
import dashboardRoutes from '../../utils/routes/dashboard'
import GroupSelector from '../GroupSelector'
import Logo from './subcomponents/Logo'
import Profile from './subcomponents/Profile'
import SignInButton from './subcomponents/SignInButton'
import Tab from './subcomponents/Tab'

interface Props {
  setIsGap: Function
  showTabs: boolean
  showGroupSelector: boolean
}

const Navbar: React.FC<Props> = ({ setIsGap, showTabs, showGroupSelector }) => {
  const topBar = useRef(null)
  const [isSticky, setIsSticky] = useState(false)

  const { user, group } = client.cache.readQuery<BaseCache>({
    query: gql`
      {
        user {
          ...UserParts
        }
        group {
          ...GroupParts
        }
      }
      ${UserPartsFragmentDoc}
      ${GroupPartsFragmentDoc}
    `
  })

  useEffect(() => {
    window.onscroll = () => {
      const sticky = topBar.current && window.pageYOffset > topBar.current.offsetHeight
      setIsSticky(sticky)
      setIsGap(sticky)
    }
  })

  return (
    <nav className={classNames('bg-white', { 'border-b border-gray-200': !showTabs })}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={topBar} className="mx-2 flex justify-between h-12 items-center">
          <div className="flex items-center">
            <Logo />
            {showGroupSelector && group && (
              <>
                <div className="mx-3.5 text-base text-gray-400">+</div>
                <GroupSelector user={user} group={group} />
              </>
            )}
          </div>
          <div className="flex sm:ml-6 sm:items-center">
            {user && <Profile user={user} />}
            {!user && <SignInButton />}
          </div>
        </div>
      </div>
      {showTabs && (
        <div
          className={classNames('pt-1 bg-white border-b border-gray-200', {
            'fixed top-0 right-0 w-full': isSticky
          })}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto">
              {dashboardRoutes.map((route) => (
                <Tab href={route.href} name={route.name} selected={isSelected(route)} key={route.name} />
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
