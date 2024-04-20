import classNames from 'classnames'
import Head from 'next/head'
import { useState } from 'react'
import DashAlert from './DashAlert'
import Navbar from './Navbar'

interface Props {
  title?: string
  isDashboard?: boolean
  header?: React.FC
  grayHeader?: boolean
  grayBackground?: boolean
  showGroupSelector?: boolean
}

const Layout: React.FC<Props> = ({
  title = null,
  isDashboard = true,
  header: Header = null,
  grayHeader = false,
  grayBackground = false,
  showGroupSelector = true,
  children
}) => {
  const [isGap, setIsGap] = useState(false)

  if (typeof window !== 'undefined') {
    // #f9fafb = gray-50
    const color = grayBackground ? '#f9fafb' : '#ffffff'
    document.documentElement.style.setProperty('--bg-color', color)
  }

  return (
    <>
      <Head>
        <title>{`${isDashboard ? 'Althaea - Dashboard' : 'Althaea'} ${title ? ' - ' + title : ''}`}</title>
      </Head>
      <Navbar setIsGap={setIsGap} showTabs={isDashboard} showGroupSelector={showGroupSelector} />
      <div className={classNames({ 'bg-white': Header && !grayHeader, 'bg-gray-50': Header && grayHeader })}>
        <div className="max-w-5xl mx-auto">
          {/* TOOD: add alerts functionality */}
          {[].map((a, i) => (
            <div className="p-4 sm:py-6 sm:px-8" key={i}>
              <DashAlert alert={a} />
            </div>
          ))}
        </div>
        {Header && (
          <div className={classNames({ 'pt-10': true /* alerts.length TODO: add for alerts */ })}>
            <Header />
          </div>
        )}
      </div>
      <div className={classNames('max-w-5xl mx-auto px-4 sm:px-6 lg:px-8', { 'mt-16': isGap && isDashboard })}>
        {children}
      </div>
    </>
  )
}

export default Layout
