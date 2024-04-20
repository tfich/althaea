import Router from 'next/router'
import { useEffect } from 'react'

interface Props {
  href: string
  external?: boolean
}

const Redirect: React.FC<Props> = ({ href, external = false }) => {
  useEffect(() => {
    if (external) {
      window.location.href = href
    } else {
      try {
        Router.push(href)
      } catch {}
    }
  })
  return null
}

export default Redirect
