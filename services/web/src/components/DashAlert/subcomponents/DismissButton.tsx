interface Props {
  color: string
}

const DismissButton: React.FC<Props> = ({ color }) => {
  return (
    <div className="ml-auto pl-3">
      <div className="-mx-1.5 -my-1.5">
        <button
          className={`inline-flex rounded-md p-1.5 text-${color}-500 hover:bg-${color}-100 focus:outline-none focus:bg-${color}-100 transition ease-in-out duration-150`}
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default DismissButton
