import TailwindColor from '../types/TailwindColor'
import { capitalizeFirstLetters } from '../utils/conventions'

interface Props {
  color: TailwindColor
  text: string
}

const SmallBadge: React.FC<Props> = ({ color, text }) => {
  return (
    <span
      className={`ml-2 items-center px-2 py-0.5 rounded-full text-xs font-medium leading-none bg-${color}-100 text-${color}-800`}
    >
      {capitalizeFirstLetters(text)}
    </span>
  )
}

export default SmallBadge
