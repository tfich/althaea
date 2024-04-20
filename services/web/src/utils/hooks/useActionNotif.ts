import { useContext } from 'react'
import { NotificationProviderContext } from '../contexts/notifications'

const useActionNotif = () => {
  const { notification, setNotification } = useContext(NotificationProviderContext)
  return { notification, setNotification }
}

export default useActionNotif
