import { createContext, Dispatch, SetStateAction } from 'react'
import ActionNotification from '../../types/ActionNotification'

export const NotificationProviderContext = createContext<{
  notification: ActionNotification | null
  setNotification: Dispatch<SetStateAction<ActionNotification | null>>
}>({
  notification: null,
  setNotification: () => null
})
