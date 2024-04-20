import classNames from 'classnames'
import { NextPage } from 'next'
import Router, { useRouter } from 'next/router'
import FilterNavGroup from '../components/FilterNavGroup'
import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import ToolCard from '../components/ToolCard'
import VerticalSelect from '../components/VerticalSelect'
import { useToolsQuery } from '../graphql'
import buildQuerystring from '../utils/buildQuerystring'
import { capitalizeFirstLetters } from '../utils/conventions'

const Tools: NextPage = () => {
  const { query }: any = useRouter()

  const { type, category, q } = query

  const { data } = useToolsQuery()

  const allTools = data?.tools || []

  const tools = allTools.filter(
    (t) =>
      (!category ||
        (category === 'free' && t.free) ||
        (category === 'featured' && t.featured) ||
        t.category.toLowerCase() === category.replace(' ', '_')) &&
      (!type || t.type.toLowerCase() === type.replace(' ', '_')) &&
      (!q || t.name.toLowerCase().includes(q.toLowerCase()))
  )

  const sortedCategories = allTools
    .reduce<string[]>((list, t) => {
      const cat = capitalizeFirstLetters(t.category.replace('_', ' '))
      return list.includes(cat) ? list : [...list, cat]
    }, [])
    .sort()
  const categories = ['Featured', 'Free', ...sortedCategories]

  const Header: React.FC = () => (
    <PageHeader title="Tools Marketplace" tagline="Add advanced functionality to your Discord server"></PageHeader>
  )

  return (
    <Layout isDashboard={false} title="Tools Marketplace" header={Header} grayHeader>
      <div className="flex flex-col lg:flex-row my-4">
        <div className="hidden lg:block w-full lg:w-1/4 mr-6">
          <FilterNavGroup name="Types" queryKey="type" options={['Command', 'Module']} />
          <FilterNavGroup name="Categories" queryKey="category" options={categories} />
        </div>
        <div className="flex flex-col w-full lg:hidden">
          <div>
            <VerticalSelect name="Types" queryKey="type" options={['Command', 'Module']} />
          </div>
          <div className="mt-4">
            <VerticalSelect name="Categories" queryKey="category" options={categories} />
          </div>
        </div>
        <div className="mt-4 lg:mt-2 flex flex-col w-full lg:w-3/4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              onChange={(e) => {
                e.preventDefault()
                if (e.target.value) {
                  Router.push(`/tools${buildQuerystring({ ...query, q: e.target.value })}`)
                } else {
                  delete query.q
                  Router.push(`/tools${buildQuerystring(query)}`)
                }
              }}
              id="search"
              className={classNames(
                'block pl-10 pr-3 py-3 lg:py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500',
                'focus:outline-none focus:placeholder-gray-400 w-full'
              )}
              placeholder="Search for commands and modules"
              type="search"
            />
          </div>
          {tools.length > 0 && (
            <ul className="grid grid-cols-1 grid-rows-none lg:grid-cols-2 mt-4 lg:mt-6 gap-4 lg:gap-6">
              {tools
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((t, i) => (
                  <ToolCard tool={t as any} key={i} />
                ))}
            </ul>
          )}
          {!tools.length && (
            <div className="flex mx-auto">
              <div className="mx-auto">
                <h3 className="mt-6 text-center text-xl text-gray-900 font-medium">
                  There are no tools available under {Object.keys(query).length === 1 ? 'this filter' : 'these filters'}
                </h3>
                <h6 className="my-2 text-center text-gray-500">Select a different category to find more tools</h6>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Tools
