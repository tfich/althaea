import { NextPage } from 'next'
import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import SignupWizard from '../components/SignupWizard'

const Create: NextPage = () => {
  const Header: React.FC = () => <PageHeader title="Create Group" bottomBorder />

  return (
    <Layout isDashboard={false} title="Create Group" header={Header} grayHeader showGroupSelector={false}>
      <div className="-mt-10 mb-8 bg-white overflow-hidden shadow-lg rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <SignupWizard />
        </div>
      </div>
    </Layout>
  )
}

export default Create
