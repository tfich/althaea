import { useRouter } from 'next/router'
import PageRoute from '../types/PageRoute'

const isSelected = ({ name, href, exact = false }: PageRoute) => {
  const { pathname } = useRouter()
  return exact ? pathname === href : pathname.startsWith(href)
}

export default isSelected
