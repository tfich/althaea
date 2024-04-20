import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import classNames from 'classnames'
import { useState } from 'react'
import { useUpdatePaymentMethodMutation } from '../graphql'
import useActionNotif from '../utils/hooks/useActionNotif'
import Modal from './Modal'

interface Props {
  isShowing: boolean
  toggle: () => void
  isUpdate: boolean
}

const PaymentCardModal: React.FC<Props> = ({ isShowing, toggle, isUpdate }) => {
  const [isComplete, setIsComplete] = useState(false)
  const [cardError, setCardError] = useState<string>(null)
  const [name, setName] = useState<string>(null)
  const { setNotification } = useActionNotif()

  const stripe = useStripe()
  const elements = useElements()

  const [updatePaymentMethod] = useUpdatePaymentMethodMutation()

  return (
    <Modal isShowing={isShowing} hide={toggle}>
      <div className="text-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mt-1 mb-3" id="modal-headline">
          {isUpdate ? 'Update' : 'Add'} Payment Method
        </h3>
        <form className="my-1.5 rounded-md border border-gray-200 shadow-sm">
          <div className="flex items-center border-b border-gray-200 w-full px-2 py-2">
            <svg className="h-5 w-5 mr-2.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              id="name"
              placeholder="Full name"
              className="w-full focus:outline-none placeholder-gray-400 text-sm text-gray-700 font-light leading-none bg-white"
            />
          </div>
          <div className="px-2 py-3">
            <CardElement
              options={{
                iconStyle: 'solid',
                style: {
                  base: {
                    iconColor: '#9fa6b2',
                    color: '#4a5568',
                    fontWeight: '400',
                    fontSize: '14px',
                    fontSmoothing: 'antialiased',
                    ':-webkit-autofill': { color: '#9fa6b2' },
                    '::placeholder': { color: '#9fa6b2' }
                  },
                  invalid: {
                    iconColor: '#9fa6b2',
                    color: '#4a5568'
                  }
                }
              }}
              onChange={({ complete, error }) => {
                setCardError(error?.message)
                setIsComplete(complete && !!name)
              }}
            />
          </div>
        </form>
        {cardError && <p className="mt-2 text-sm text-red-600">{cardError}</p>}
        <div className="mt-4">
          <span className="flex w-full rounded-md shadow-sm">
            <button
              disabled={!isComplete}
              onClick={async (e) => {
                e.preventDefault()
                if (isComplete) {
                  if (!stripe || !elements) {
                    return
                  }

                  const { paymentMethod, error } = await stripe.createPaymentMethod({
                    type: 'card',
                    card: elements.getElement(CardElement)
                  })

                  if (error) {
                    throw error
                  }

                  await updatePaymentMethod({ variables: { paymentID: paymentMethod.id, name } })
                  toggle()
                  setNotification({
                    name: `Payment method successfully ${isUpdate ? 'updated' : 'added'}!`
                  })
                }
              }}
              type="button"
              className={classNames(
                'inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base',
                'leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 ',
                'focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5',
                { 'opacity-50 cursor-not-allowed': !isComplete }
              )}
            >
              {isUpdate ? 'Save' : 'Add'}
            </button>
          </span>
        </div>
      </div>
    </Modal>
  )
}

export default PaymentCardModal
