import { useEffect, useState } from 'react'

const screens = {
  sm: 640, // @media (min-width: 640px)
  md: 768,
  lg: 1024,
  xl: 1280
}

const getValidScreens = () => {
  const validScreens = {}
  Object.keys(screens).forEach((s) => {
    validScreens[s] = screens[s] < window.innerWidth
  })
  return validScreens as { [S in keyof typeof screens]: boolean }
}

const useScreens = () => {
  const [validScreens, setValidScreens] = useState(getValidScreens())

  useEffect(() => {
    window.onresize = () => {
      const screen = getValidScreens()
      setValidScreens(screen)
    }
  })

  return validScreens
}

export default useScreens
