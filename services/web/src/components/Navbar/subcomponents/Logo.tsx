import Link from 'next/link'
import React from 'react'

const Logo: React.FC = () => {
  return (
    <div className="flex-shrink-0 flex items-center">
      <Link href="/" as="/home">
        <img className="block h-8 w-8 cursor-pointer" src="/images/logo.svg" alt="Logo" />
      </Link>
    </div>
  )
}

export default Logo
