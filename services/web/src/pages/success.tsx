import { NextPage } from 'next'
import Layout from '../components/Layout'

const Success: NextPage = () => {
  return (
    <Layout grayBackground isDashboard={false} showGroupSelector={false}>
      <div className="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-96">
          <div className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-sm sm:w-full sm:p-6">
            <div>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="mt-3 text-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mt-1" id="modal-headline">
                  Successfully Redirected!
                </h3>
                <div className="mt-2">
                  <p className="text-sm leading-5 text-gray-500">
                    Your action was successful, you may close this page and return to your main tab.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Success
