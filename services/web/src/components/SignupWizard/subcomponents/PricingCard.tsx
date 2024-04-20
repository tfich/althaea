import classNames from 'classnames'
import { BotPlan } from '../../../graphql'
import prettyPrice from '../../../utils/prettyPrice'
import LargeBadge from '../../LargeBadge'
import PlanHighlight from './PlanHighlight'

interface Props {
  plan: BotPlan
  selected: boolean
  onClick: () => void
}

const PricingCard: React.FC<Props> = ({ plan: { name, price, highlights }, selected, onClick }) => {
  return (
    <div
      className={classNames('flex flex-col bg-gray-50 rounded-lg border border-gray-200 shadow-sm cursor-pointer', {
        'border-4 border-gray-900': selected
      })}
      onClick={onClick}
    >
      <div className="p-4 rounded-lg bg-white">
        <LargeBadge color="indigo" text={name} />
        <div className="mt-1.5 flex">
          <div className="text-4xl font-bold text-gray-900">{prettyPrice(price)}</div>
          <div className="text-2xl font-medium text-gray-400 ml-px pt-3">/mo</div>
        </div>
      </div>
      <div className="px-4 py-2">
        <ul>
          {highlights.map((h, i) => (
            <PlanHighlight text={h} key={i} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PricingCard
