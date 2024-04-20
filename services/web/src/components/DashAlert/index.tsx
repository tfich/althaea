import Link from 'next/link'
import { useRouter } from 'next/router'
import DashboardAlert from '../../types/DashboardAlert'
import levels from './levels'
import DismissButton from './subcomponents/DismissButton'

interface Props {
  alert: DashboardAlert
}

const DashAlert: React.FC<Props> = ({
  alert: { level, dismissButton = true, title, message, inlineLink, sideLink, bulletPoints, overviewOnly = false }
}) => {
  const router = useRouter()

  if (overviewOnly && router.pathname !== '/dashboard') {
    return null
  }

  const { color, icon: Icon } = levels[level]

  return (
    <div className={`rounded-md bg-${color}-100 p-3`}>
      <div className="flex">
        <div className="flex-shrink-0">{<Icon />}</div>
        <div className="ml-3">
          {title && <h3 className={`text-sm leading-5 font-medium text-${color}-800`}>{title}</h3>}
          {message && (
            <div className={`mt-1 text-sm leading-5 text-${color}-700`}>
              <p>
                {message}{' '}
                {inlineLink && (
                  <Link href={inlineLink.href}>
                    <a
                      className={`font-medium underline text-${color}-700 hover:text-${color}-600 transition ease-in-out duration-150`}
                    >
                      {inlineLink.title}
                    </a>
                  </Link>
                )}
              </p>
            </div>
          )}
          {bulletPoints && bulletPoints.length && (
            <div className={`mt-2 text-sm leading-5 text-${color}-700`}>
              <ul className="list-disc pl-5">
                {bulletPoints.map((bp, i) => (
                  <li key={i}>{bp}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {sideLink && (
          <p className="mt-3 text-sm leading-5 md:mt-0 md:ml-6">
            <Link href={sideLink.href}>
              <a
                className={`whitespace-no-wrap font-medium text-${color}-700 hover:text-${color}-600 transition ease-in-out duration-150`}
              >
                {sideLink.title} &rarr;
              </a>
            </Link>
          </p>
        )}
        {dismissButton && !sideLink && <DismissButton color={color} />}
      </div>
    </div>
  )
}

export default DashAlert
