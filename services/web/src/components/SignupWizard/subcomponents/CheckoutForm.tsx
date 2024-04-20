import { useApolloClient } from '@apollo/client'
import { CardElement } from '@stripe/react-stripe-js'
import { StripeCardElementOptions } from '@stripe/stripe-js'
import classNames from 'classnames'
import { Dispatch, useState } from 'react'
import { BotPlan, CouponDocument, Query } from '../../../graphql'
import prettyPrice from '../../../utils/prettyPrice'
import SmallBadge from '../../SmallBadge'

interface Props {
  setValidCoupon: Dispatch<any>
  setName: Dispatch<any>
  setIsCardComplete: Dispatch<any>
  setIsFree: Dispatch<any>
  botPlan: BotPlan | null
}

const CheckoutForm: React.FC<Props> = ({ setValidCoupon, setIsCardComplete, setName, setIsFree, botPlan }) => {
  const [cardError, setCardError] = useState<string>(null)
  const client = useApolloClient()

  const paymentDisabled = botPlan.price === 0

  if (paymentDisabled) {
    setIsFree(true)
  }

  const options: StripeCardElementOptions = {
    disabled: paymentDisabled,
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
  }

  // TODO
  const handleCouponChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const {
      data: { coupon }
    } = await client.query<Query>({
      query: CouponDocument
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div
        className={classNames('w-full col-span-3', {
          'opacity-50': paymentDisabled
        })}
      >
        <div className="flex justify-between mt-3">
          <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
            Coupon
          </label>
          <span className="text-sm leading-5 text-gray-500" id="email-optional">
            Optional
          </span>
        </div>
        <form className="my-1.5 rounded-md border border-gray-200 shadow-sm">
          <div className="flex items-center w-full px-2 py-2">
            <svg className="h-5 w-5 mr-2.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </svg>
            <input
              disabled={paymentDisabled}
              onChange={handleCouponChange}
              type="text"
              placeholder="Coupon"
              className="w-full focus:outline-none placeholder-gray-400 text-sm text-gray-700 font-light leading-none bg-white"
            />
          </div>
        </form>
        <div className="flex justify-between mt-4">
          <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
            Card Details
          </label>
        </div>
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
              disabled={paymentDisabled}
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
              options={options}
              onChange={({ complete, error }) => {
                setCardError(error && !paymentDisabled ? error.message : null)
                setIsCardComplete(complete)
              }}
            />
          </div>
        </form>
        {cardError && (
          <p className="mt-2 text-sm text-red-600" id="email-error">
            {cardError}
          </p>
        )}
      </div>
      <div className="w-full col-span-2 order-first lg:order-last">
        <div className="flex mt-3 pb-1 border-b border-gray-200 justify-between font-medium">
          <div>Total</div>
          <div>{prettyPrice(botPlan.price)}/mo</div>
        </div>
        <div className="flex py-2 border-b border-gray-200 justify-between text-sm text-gray-700">
          <div className="inline-flex">
            Bot Plan
            <div className="-ml-1">
              <SmallBadge color="indigo" text={botPlan.name} />
            </div>
          </div>
          <div>{prettyPrice(botPlan.price)}/mo</div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutForm
