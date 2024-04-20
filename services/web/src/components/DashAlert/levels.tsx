import ErrorIcon from './icons/Error'
import InfoIcon from './icons/Info'
import SuccessIcon from './icons/Success'
import WarnIcon from './icons/Warn'

const levels = {
  error: {
    color: 'red',
    icon: ErrorIcon
  },
  info: {
    color: 'blue',
    icon: InfoIcon
  },
  success: {
    color: 'green',
    icon: SuccessIcon
  },
  warn: {
    color: 'yellow',
    icon: WarnIcon
  }
}

export default levels
