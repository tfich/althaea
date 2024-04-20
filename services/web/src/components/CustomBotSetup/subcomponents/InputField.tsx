import { Dispatch, SetStateAction } from 'react'

interface Props {
  label: string
  setInput: Dispatch<SetStateAction<string>>
}

const InputField: React.FC<Props> = ({ label, setInput }) => {
  return (
    <>
      <label className="block text-sm font-medium leading-5 text-gray-700">{label}</label>
      <input
        onChange={(e) => {
          e.preventDefault()
          setInput(e.target.value)
        }}
        className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
      />
    </>
  )
}

export default InputField
