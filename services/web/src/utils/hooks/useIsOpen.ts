import { useEffect, useRef, useState } from 'react'

const useIsOpen = () => {
  const node = useRef<any>()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleClick = (e: Event) => {
      if (!node.current || node.current.contains(e.target)) {
        return
      }
      setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])

  return { node, isOpen, setIsOpen }
}

export default useIsOpen
