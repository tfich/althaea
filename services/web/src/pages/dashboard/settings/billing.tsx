import { gql } from '@apollo/client'
import classNames from 'classnames'
import moment from 'moment-timezone'
import { NextPage } from 'next'
import client from '../../../apollo/client'
import BotPlanModal from '../../../components/modals/BotPlanModal'
import PaymentCardModal from '../../../components/PaymentCardModal'
import SettingsLayout from '../../../components/SettingsLayout'
import TableHead from '../../../components/TableHead'
import { GroupPartsFragmentDoc, useApplyCouponMutation, useCouponLazyQuery, useInvoicesQuery } from '../../../graphql'
import BaseCache from '../../../types/BaseCache'
import { capitalizeFirstLetters } from '../../../utils/conventions'
import getCouponMessage from '../../../utils/getCouponMessage'
import useActionNotif from '../../../utils/hooks/useActionNotif'
import useModal from '../../../utils/hooks/useModal'
import prettyPrice from '../../../utils/prettyPrice'

const SettingsBilling: NextPage = () => {
  const {
    group: { paymentMethod, subscription, botPlan, botPlanID }
  } = client.cache.readQuery<BaseCache>({
    query: gql`
      {
        group {
          ...GroupParts
        }
      }
      ${GroupPartsFragmentDoc}
    `
  })

  const { isShowing: isPaymentModalShowing, toggle: togglePaymentModal } = useModal()
  const { isShowing: isBotPlanModalShowing, toggle: toggleBotPlanModal } = useModal()
  const { setNotification } = useActionNotif()

  const [getCoupon, { data: couponData }] = useCouponLazyQuery()
  const [applyCoupon] = useApplyCouponMutation()
  const { data: invoiceData } = useInvoicesQuery()

  return (
    <SettingsLayout>
      <div>
        <BotPlanModal currentBotPlanID={botPlanID} isShowing={isBotPlanModalShowing} hide={toggleBotPlanModal} />
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-700">Subscription</h3>
            <div className="mt-5">
              <dl className="grid sm:grid-cols-3 gap-y-2 gap-x-36x">
                <dt className="text-sm leading-5 font-medium text-gray-500">Bot Plan</dt>
                <dd className="flex flex-row text-sm leading-5 text-gray-900 sm:col-span-2 font-semibold">
                  {botPlan.name}
                  <svg
                    className="ml-1.5 h-4 w-auto text-indigo-600 font-semibold hover:text-indigo-900 cursor-pointer"
                    onClick={toggleBotPlanModal}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </dd>
                <dt className="text-sm leading-5 font-medium text-gray-500">Status</dt>
                <dd className="text-sm leading-5 text-gray-900 sm:col-span-2">
                  {capitalizeFirstLetters(subscription.status.replace('_', ' '))}
                </dd>
                <dt className="text-sm leading-5 font-medium text-gray-500">Next Payment</dt>
                <dd className="text-sm leading-5 text-gray-900 sm:col-span-2">
                  {
                    /* eslint-disable indent */
                    subscription.nextPaymentDate && typeof subscription.nextPaymentAmount === 'number'
                      ? `${moment(new Date(subscription.nextPaymentDate))
                          .format('ll')
                          .replace('ago', '')} (${prettyPrice(subscription.nextPaymentAmount)})`
                      : 'None'
                  }
                </dd>
                <dt className="text-sm leading-5 font-medium text-gray-500">Previous Payment</dt>
                <dd className="text-sm leading-5 text-gray-900 sm:col-span-2">
                  {subscription.previousPaymentDate && typeof subscription.previousPaymentAmount === 'number'
                    ? `${moment(new Date(subscription.previousPaymentDate))
                        .format('ll')
                        .replace('ago', '')} (${prettyPrice(subscription.previousPaymentAmount)})`
                    : 'None'}
                </dd>
                <dt className="text-sm leading-5 font-medium text-gray-500">Coupon</dt>
                <dd className="text-sm leading-5 text-gray-900 sm:col-span-2">{subscription.coupon || 'None'}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <PaymentCardModal isShowing={isPaymentModalShowing} toggle={togglePaymentModal} isUpdate={!!paymentMethod} />
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Payment Method</h3>
            <div className="mt-5">
              <div className="rounded-md bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
                <div className="sm:flex sm:items-start">
                  <svg
                    className="text-gray-500 h-8 w-auto sm:flex-shrink-0 sm:h-8"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path>
                    <path
                      fillRule="evenodd"
                      d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <div className="text-sm leading-5 font-medium text-gray-900">
                      {paymentMethod &&
                        `${capitalizeFirstLetters(paymentMethod.brand)} ending in ${paymentMethod.lastFour}`}
                      {!paymentMethod && 'No payment method attached'}
                    </div>
                    <div className="mt-1 text-sm leading-5 text-gray-600 sm:flex sm:items-center">
                      {paymentMethod && (
                        <>
                          <div>
                            Expires {paymentMethod.month}/{paymentMethod.year}
                          </div>
                          <span className="hidden sm:mx-2 sm:inline" aria-hidden="true">
                            &middot;
                          </span>
                          <div className="mt-1 sm:mt-0">Postal Code {paymentMethod.postalCode}</div>
                        </>
                      )}
                      {!paymentMethod && 'Add one before selecting a paid plan'}
                    </div>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
                  <span className="inline-flex rounded-md shadow-sm">
                    <button
                      onClick={togglePaymentModal}
                      type="button"
                      className={classNames(
                        'inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md',
                        'text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300',
                        'focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150'
                      )}
                    >
                      {paymentMethod ? 'Edit' : 'Add'}
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Apply Coupon</h3>
            <div className="mt-2 max-w-xl text-sm leading-5 text-gray-500">
              <p>If you have a coupon to apply, you can enter it here.</p>
            </div>
            <div className="mt-5 sm:flex sm:items-center">
              <div className="max-w-xs w-full">
                <div className="relative rounded-md shadow-sm">
                  <input
                    onChange={(e) => {
                      const id = e.target.value
                      if (id) {
                        getCoupon({ variables: { id } })
                      }
                    }}
                    maxLength={12}
                    className="form-input block w-full sm:text-sm sm:leading-5"
                    placeholder="Coupon"
                  />
                </div>
              </div>
              <span className="mt-3 inline-flex rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:w-auto">
                <button
                  disabled={!couponData || !couponData.coupon}
                  onClick={async () => {
                    if (couponData && couponData.coupon) {
                      await applyCoupon({ variables: { id: couponData.coupon.id } })
                      setNotification({ name: 'Coupon successfully applied!' })
                    }
                  }}
                  type="button"
                  className={classNames(
                    'w-full inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-white',
                    'bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo',
                    'active:bg-indigo-700 transition ease-in-out duration-150 sm:w-auto sm:text-sm sm:leading-5',
                    {
                      'opacity-75 cursor-not-allowed': !couponData || !couponData.coupon
                    }
                  )}
                >
                  Apply
                </button>
              </span>
            </div>
            {couponData && couponData.coupon && (
              <p className="mt-2 text-sm text-green-500" id="email-error">
                {getCouponMessage(couponData.coupon as any)}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="my-6">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Invoices</h3>
            <div className="mt-5 align-middle min-w-full overflow-x-scroll border border-gray-200 rounded-lg">
              {invoiceData && (
                <table className="min-w-full">
                  <thead className="border-b border-gray-200">
                    <tr className="bg-gray-50">
                      <TableHead text="Date" />
                      <TableHead text="Amount" />
                      <TableHead text="Status" />
                      <th className="px-6 py-3 border-b border-gray-200" />
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {invoiceData.invoices.map(({ date, amount, status, pdfUrl }, i) => (
                      <tr key={i}>
                        <td
                          className={classNames(
                            'px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500',
                            { 'border-none': i === invoiceData.invoices.length - 1 }
                          )}
                        >
                          {moment(date).format('L')}
                        </td>
                        <td
                          className={classNames(
                            'px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500',
                            { 'border-none': i === invoiceData.invoices.length - 1 }
                          )}
                        >
                          {prettyPrice(amount, true)}
                        </td>
                        <td
                          className={classNames(
                            'px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500',
                            { 'border-none': i === invoiceData.invoices.length - 1 }
                          )}
                        >
                          {capitalizeFirstLetters(status.replace('_', ' '))}
                        </td>
                        <td
                          className={classNames(
                            'px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium',
                            { 'border-none': i === invoiceData.invoices.length - 1 }
                          )}
                        >
                          <a href={pdfUrl} className="text-indigo-600 hover:text-indigo-900">
                            Download
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </SettingsLayout>
  )
}

export default SettingsBilling
