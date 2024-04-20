import { css } from '@emotion/core'
import ClipLoader from 'react-spinners/ClipLoader'

interface Props {
  loading: boolean
}

export const LoadingSpinner: React.FC<Props> = ({ loading }) => {
  return <ClipLoader loading={loading} css={css``} />
}
