import { useRemoveToolConfigMutation } from '../graphql'
import useModal from '../utils/hooks/useModal'
import ConfirmationModal from './ConfirmationModal'

interface Props {
  toolID: string
}

const ToolRemove: React.FC<Props> = ({ toolID }) => {
  const { isShowing, toggle } = useModal()

  const [removeToolConfig] = useRemoveToolConfigMutation({ variables: { toolID } })

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="sm:flex sm:items-start sm:justify-between">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Remove Tool Config</h3>
            <div className="mt-2 max-w-xl text-sm leading-5 text-gray-500">
              <p>
                Your group will no longer have access to this tool. However, your data will be saved if you ever wish to
                re-enable it.
              </p>
            </div>
          </div>
          <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
            <span className="inline-flex rounded-md shadow-sm">
              <ConfirmationModal
                isShowing={isShowing}
                toggle={toggle}
                onConfirmation={async () => {
                  removeToolConfig()
                  window.location.href = '/dashboard/tools'
                }}
                title="Are you sure you want to remove this tool?"
              />
              <button
                onClick={toggle}
                type="button"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-50 focus:outline-none focus:border-red-300 focus:shadow-outline-red active:bg-red-200 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                Remove
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToolRemove
