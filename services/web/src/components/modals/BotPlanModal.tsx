import classNames from 'classnames'
import { useState } from 'react'
import { useBotPlansQuery, useUpdateBotPlanMutation } from '../../graphql'
import useActionNotif from '../../utils/hooks/useActionNotif'
import prettyPrice from '../../utils/prettyPrice'
import Modal from '../Modal'
import SimpleDropdownSelect from '../_v2/SimpleDropdownSelect'

interface Props {
  isShowing: boolean
  hide: () => void
  currentBotPlanID?: string
}

const BotPlanModal: React.FC<Props> = ({ isShowing, hide, currentBotPlanID }) => {
  const [botPlanID, setBotPlanID] = useState(currentBotPlanID)
  const { setNotification } = useActionNotif()

  const { data } = useBotPlansQuery()
  const [updateBotPlan] = useUpdateBotPlanMutation()

  return (
    <Modal isShowing={isShowing} hide={hide} size="small">
      <div className="text-center space-y-3">
        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
          Change Bot Plan
        </h3>
        <p className="text-sm leading-5 text-gray-500">
          Select a different bot plan from the options below. Your monthly payment will be prorated.
        </p>
        {data && (
          <SimpleDropdownSelect
            options={data.botPlans.map(({ name, id, price }) => ({
              name: `${name} - ${prettyPrice(price)}/mo`,
              value: id
            }))}
            selectedValue={botPlanID}
            onChange={setBotPlanID}
          />
        )}
        <span className="flex w-full rounded-md shadow-sm">
          <button
            disabled={botPlanID === currentBotPlanID}
            onClick={async (e) => {
              e.preventDefault()
              await updateBotPlan({ variables: { botPlanID } })
              hide()
              setNotification({ name: 'Bot plan successfully updated!' })
            }}
            type="button"
            className={classNames(
              'inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base',
              'leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 ',
              'focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5',
              { 'opacity-50 cursor-not-allowed': botPlanID === currentBotPlanID }
            )}
          >
            Update
          </button>
        </span>
      </div>
    </Modal>
  )
}

export default BotPlanModal
