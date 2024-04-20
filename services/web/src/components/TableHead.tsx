interface Props {
  text: string
}

const TableHead: React.FC<Props> = ({ text }) => (
  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
    {text}
  </th>
)

export default TableHead
