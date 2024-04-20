import classNames from 'classnames'
import TailwindColor from '../types/TailwindColor'

interface Props {
  color: TailwindColor
  text: string
  onClick?: () => void
}

const SmallButton: React.FC<Props> = ({ color, text, onClick }) => {
  return (
    <span className="inline-flex rounded-md shadow-sm">
      <button
        onClick={onClick}
        type="button"
        className={classNames(
          'inline-flex items-center px-3.5 py-1 border border-transparent text-xs leading-4 font-medium rounded text-white',
          `bg-${color}-600 hover:bg-${color}-500 focus:outline-none focus:border-${color}-700 focus:shadow-outline-${color}`,
          `active:bg-${color}-700 transition ease-in-out duration-150`
        )}
      >
        {text}
      </button>
    </span>
  )
}

export default SmallButton
