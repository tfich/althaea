import classNames from 'classnames'
import { Dispatch } from 'react'

interface Props {
  currentStep: number
  setStep: Dispatch<any>
  canProdceed: boolean
  handleSubmit: (e: MouseEvent) => Promise<any>
  numSteps?: number
}

const Footer: React.FC<Props> = ({ currentStep, setStep, canProdceed, handleSubmit, numSteps = 3 }) => {
  return (
    <nav className="mt-4 px-4 flex items-center justify-between sm:px-0">
      <div className="w-0 flex-1 flex">
        <button
          disabled={currentStep === 1}
          className={classNames(
            '-mt-px  pt-4 pr-1 inline-flex items-center text-sm leading-5 font-medium text-gray-500 cursor-pointer',
            {
              'hover:text-gray-700 focus:outline-none focus:text-gray-700 focus:border-gray-400': currentStep > 1,
              'opacity-50 cursor-not-allowed': currentStep === 1
            }
          )}
          onClick={() => {
            if (currentStep > 1) {
              currentStep--
              setStep(currentStep)
            }
          }}
        >
          <svg className="mr-3 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Previous
        </button>
      </div>
      <div className="hidden md:flex">
        {Array.from(Array(numSteps).keys()).map((n) => (
          <div
            className={classNames(
              '-mt-px pt-4 px-2 inline-flex items-center text-xl leading-5 font-medium text-gray-500',
              { 'text-indigo-600': n === currentStep - 1 }
            )}
            key={n}
          >
            •
          </div>
        ))}
      </div>
      <div className="w-0 flex-1 flex justify-end">
        <button
          disabled={!canProdceed}
          className={classNames(
            '-mt-px  pt-4 pr-1 inline-flex items-center text-sm leading-5 font-medium text-gray-500 cursor-pointer',
            {
              'hover:text-gray-700 focus:outline-none focus:text-gray-700 focus:border-gray-400':
                currentStep < numSteps,
              'opacity-50 cursor-not-allowed': !canProdceed
            }
          )}
          onClick={(e) => {
            if (currentStep < numSteps && canProdceed) {
              currentStep++
              setStep(currentStep)
            } else if (currentStep === numSteps && handleSubmit) {
              handleSubmit(e as any)
            }
          }}
        >
          {currentStep === numSteps && (
            <>
              <div className="hidden lg:block">Submit Payment</div>
              <div className="lg:hidden">Submit</div>
            </>
          )}
          {currentStep !== numSteps && 'Next'}
          <svg className="ml-3 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </nav>
  )
}

export default Footer
