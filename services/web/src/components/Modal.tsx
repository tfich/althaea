import React from 'react'
import ReactDOM from 'react-dom'

interface Props {
  isShowing: boolean
  hide: () => void
  size?: 'small' | 'large'
}

const Modal: React.FC<Props> = ({ isShowing, hide, size = 'small', children }) => {
  if (!isShowing) {
    return null
  }
  return ReactDOM.createPortal(
    <div className="fixed bottom-0 inset-x-0 px-4 pb-4 inset-0 flex items-center justify-center">
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75" />
      </div>
      <div
        className={`bg-white rounded-lg px-4 pt-5 pb-4 overflow-visible shadow-xl transform transition-all sm:max-w-${
          size === 'small' ? 'sm' : 'lg'
        } w-full p-6`}
      >
        <div className="absolute top-0 right-0 pt-4 pr-4">
          <button
            onClick={hide}
            type="button"
            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  )
}

export default Modal
