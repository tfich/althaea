import { useEffect, useState } from 'react'
import ActionNotification from '../types/ActionNotification'
import { NotificationProviderContext } from '../utils/contexts/notifications'
import ActionNotificationPopup from './ActionNotificationPopup'

const NotificationProvider: React.FC = ({ children }) => {
  const [notification, setNotification] = useState<ActionNotification | null>(null)

  useEffect(() => {
    notification && setTimeout(() => setNotification(null), 4000)
  })

  return (
    <NotificationProviderContext.Provider value={{ notification, setNotification }}>
      <ActionNotificationPopup notification={notification || undefined} />
      {children}
    </NotificationProviderContext.Provider>
  )
}

export default NotificationProvider
