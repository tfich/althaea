import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useState } from 'react'
import { BotPlan, useBotPlansQuery, useCreatableGroupsQuery, useCreateGroupMutation } from '../../graphql'
import CheckoutForm from './subcomponents/CheckoutForm'
import Footer from './subcomponents/Footer'
import GroupCard from './subcomponents/GroupCard'
import PricingCard from './subcomponents/PricingCard'

const SignupWizard: React.FC = () => {
  const [step, setStep] = useState<number>(1)
  const [group, setGroup] = useState<string>(null)
  const [botPlan, setBotPlan] = useState<BotPlan>(null)
  const [validCoupon, setValidCoupon] = useState<string>(null)
  const [name, setName] = useState<string>(null)
  const [isCardComplete, setIsCardComplete] = useState(false)
  const [isFree, setIsFree] = useState(false)

  const stripe = useStripe()
  const elements = useElements()

  const { data: creatableGroupsData } = useCreatableGroupsQuery()
  const { data: botPlansData } = useBotPlansQuery()

  const [createGroup, { loading: createGroupLoading }] = useCreateGroupMutation()

  const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault()
    if (!stripe || !elements) {
      return
    }

    if (isFree) {
      await createGroup({ variables: { groupID: group, botPlanID: botPlan.id } })
      return (window.location.href = '/dashboard')
    }

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    })
    if (!error) {
      await createGroup({
        variables: {
          groupID: group,
          botPlanID: botPlan.id,
          paymentID: paymentMethod.id,
          name,
          coupon: validCoupon
        }
      })
      return (window.location.href = '/dashboard')
    }
  }

  if (step === 1) {
    return (
      <div>
        <h3 className="text-xl font-medium text-gray-900 leading-snug">
          Which Discord server would you like to add Althaea to?
        </h3>
        <div className="text-gray-500 text-sm mt-1">You must be a server Admin to setup Althaea</div>
        <div className="my-6 grid grid-cols-2 lg:grid-cols-7 gap-4 lg:gap-6">
          {creatableGroupsData &&
            creatableGroupsData.creatableGroups.map((g, i) => (
              <GroupCard group={g} selected={group === g.id} onClick={() => setGroup(g.id)} key={i} />
            ))}
        </div>
        <Footer currentStep={step} setStep={setStep} canProdceed={!!group} handleSubmit={handleSubmit} />
      </div>
    )
  }

  if (step === 2) {
    return (
      <div>
        <h3 className="text-xl font-medium text-gray-900 leading-snug">Which Bot plan would you like?</h3>
        <a target="_blank" href="#" className="inline-flex items-center text-indigo-600">
          <div className="text-sm">View plan details</div>
          <svg className="h-4 w-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
          </svg>
        </a>
        <div className="my-4 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {botPlansData &&
            [...botPlansData.botPlans]
              .sort((a, b) => a.price - b.price)
              .map((p, i) => (
                <PricingCard
                  plan={p as any}
                  selected={botPlan && botPlan.id === p.id}
                  onClick={() => setBotPlan(p as any)}
                  key={i}
                />
              ))}
        </div>
        <Footer currentStep={step} setStep={setStep} canProdceed={!!botPlan} handleSubmit={handleSubmit} />
      </div>
    )
  }

  if (step === 3) {
    return (
      <div>
        <h3 className="text-xl font-medium text-gray-900 leading-snug">Payment Method</h3>
        <CheckoutForm
          setValidCoupon={setValidCoupon}
          setIsCardComplete={setIsCardComplete}
          setName={setName}
          setIsFree={setIsFree}
          botPlan={botPlan}
        />
        <Footer
          currentStep={step}
          setStep={setStep}
          canProdceed={(isCardComplete || isFree) && !createGroupLoading}
          handleSubmit={handleSubmit}
        />
      </div>
    )
  }

  return null
}

export default SignupWizard
