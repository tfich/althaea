import classNames from 'classnames'
import TailwindColor from '../types/TailwindColor'

interface Props {
  color: TailwindColor
  text: string
}

const MediumButton: React.FC<Props> = ({ color, text }) => {
  return (
    <span className="inline-flex rounded-md shadow-sm">
      <button
        type="button"
        className={classNames(
          'inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded text-white',
          `bg-${color}-600 hover:bg-${color}-500 focus:outline-none focus:border-${color}-700 focus:shadow-outline-${color}`,
          `active:bg-${color}-700 transition ease-in-out duration-150`
        )}
      >
        {text}
      </button>
    </span>
  )
}

export default MediumButton
