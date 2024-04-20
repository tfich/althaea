import { gql } from '@apollo/client'
import classNames from 'classnames'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import client from '../../../apollo/client'
import Layout from '../../../components/Layout'
import PageHeader from '../../../components/PageHeader'
import ToolConfigRow from '../../../components/ToolConfigRow'
import ToolFilterDropdown from '../../../components/ToolFilterDropdown'
import { GroupPartsFragmentDoc } from '../../../graphql'
import BaseCache from '../../../types/BaseCache'
import { capitalizeFirstLetters, pluralize } from '../../../utils/conventions'

const DashboardTools: NextPage = () => {
  const Header: React.FC = () => (
    <PageHeader title="Tools" tagline="Configure your enabled commands and modules" bottomBorder />
  )
  const { query }: any = useRouter()
  const node = useRef<any>()
  const [openedDropdown, setOpenDropdown] = useState<string>(null)
  const [searchQuery, setSearchQuery] = useState<string>(null)

  useEffect(() => {
    const handleClick = (e: Event) => {
      if (!node.current || node.current.contains(e.target)) {
        return
      }
      setOpenDropdown(null)
    }
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])

  const { group } = client.cache.readQuery<BaseCache>({
    query: gql`
      {
        group {
          ...GroupParts
        }
      }
      ${GroupPartsFragmentDoc}
    `
  })

  const categories = group.toolConfigs
    .reduce<string[]>((list, t) => {
      const cat = capitalizeFirstLetters(t.tool.category)
      return list.includes(cat) ? list : [...list, cat]
    }, [])
    .sort()

  const types = group.toolConfigs
    .reduce<string[]>((list, t) => {
      const type = capitalizeFirstLetters(t.tool.type)
      return list.includes(type) ? list : [...list, type]
    }, [])
    .sort()

  const filteredConfigs = group.toolConfigs.filter(({ tool: { name, description, type, category } }) => {
    if (searchQuery && ![name, description].join(' ').toLowerCase().includes(searchQuery)) {
      return false
    }
    if (query.type && query.type !== type.toLowerCase()) {
      return false
    }
    if (query.category && query.category !== category.toLowerCase()) {
      return false
    }
    return true
  })

  if (!categories.length) {
    return (
      <Layout title="Tools" header={Header} grayBackground>
        <div className="flex mt-10 mx-auto">
          <div className="mx-auto">
            <h3 className="text-center text-2xl text-gray-900 font-medium">
              Your group does not have any enabled tools
            </h3>
            <h6 className="my-2 text-center text-gray-500">Browse and add tools in the marketplace</h6>
            <span className="pt-3 flex items-center justify-center">
              <Link href="/tools">
                <a
                  className={classNames(
                    'inline-flex items-center px-2.5 py-1.5 border border-transparent text-sm leading-5 font-medium',
                    'rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none',
                    'active:bg-indigo-700 transition ease-in-out duration-150'
                  )}
                >
                  Browse Marketplace
                </a>
              </Link>
            </span>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Tools" header={Header} grayBackground>
      <div className="mt-4 rounded-md bg-indigo-100 py-2.5">
        <div className="px-2 text-center text-indigo-800">
          Browse and add <b>over 50</b> commands and modules in the
          <a href="/tools" className="ml-1 underline font-medium">
            Tools Marketplace →
          </a>
        </div>
      </div>
      <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between">
        <div className="flex items-center">
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
                setSearchQuery(e.target.value.toLowerCase())
              }}
              id="search"
              className={classNames(
                'block pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500',
                'focus:outline-none focus:placeholder-gray-400 w-full'
              )}
              placeholder="Search"
              type="search"
            />
          </div>
          <div className="hidden sm:block w-24 ml-2 leading-5 text-gray-500 tracking-wide">
            {filteredConfigs.length} {pluralize('Result', filteredConfigs.length)}
          </div>
        </div>
        <div ref={node} className="mt-3 sm:mt-0 flex sm:block space-x-3">
          <ToolFilterDropdown
            name="Category"
            options={categories}
            openedDropdown={openedDropdown}
            setOpenDropdown={setOpenDropdown}
          />
          <ToolFilterDropdown
            name="Type"
            options={types}
            openedDropdown={openedDropdown}
            setOpenDropdown={setOpenDropdown}
          />
        </div>
      </div>
      <div>
        <div className="bg-white shadow overflow-hidden rounded-md">
          <ul>
            {filteredConfigs.map((c, i) => (
              <ToolConfigRow toolConfig={c} key={i} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default DashboardTools
