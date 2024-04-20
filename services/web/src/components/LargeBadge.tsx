import TailwindColor from '../types/TailwindColor'

interface Props {
  color: TailwindColor
  text: string
}

const LargeBadge: React.FC<Props> = ({ color, text }) => {
  return (
    <span
      className={`items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-${color}-100 text-${color}-800`}
    >
      {text}
    </span>
  )
}

export default LargeBadge
