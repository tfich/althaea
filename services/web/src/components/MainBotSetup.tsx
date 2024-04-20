import classNames from 'classnames'

const MainBotSetup: React.FC = () => {
  return (
    <div className="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mx-auto">
        <div
          className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-sm sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                Action Required
              </h3>
              <div className="mt-2">
                <p className="text-sm leading-5 text-gray-500">
                  You must add Althaea to your server before getting started.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <span className="flex w-full rounded-md shadow-sm">
              <a
                rel="noreferrer"
                href="/dashboard/bot/add"
                type="button"
                className={classNames(
                  'inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base',
                  'leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 ',
                  'focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5'
                )}
              >
                Add to server
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainBotSetup
