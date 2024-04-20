import classNames from 'classnames'
import Router from 'next/router'

interface Props {
  title: string
  tagline?: string
  backButtonName?: string
  bottomBorder?: boolean
}

const PageHeader: React.FC<Props> = ({ title, tagline, backButtonName, bottomBorder = false }) => {
  return (
    <header
      className={classNames({
        'border-b border-gray-100': bottomBorder
      })}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div className="pb-12">
            <h1 className="text-4xl text-gray-900 font-medium">{title}</h1>
            {tagline && <h3 className="text-gray-500">{tagline}</h3>}
          </div>
          {!!backButtonName && (
            <span onClick={() => Router.back()} className="pb-3 inline-flex hover:font-medium">
              <p className="cursor-pointer">← {backButtonName}</p>
            </span>
          )}
        </div>
      </div>
    </header>
  )
}

export default PageHeader
