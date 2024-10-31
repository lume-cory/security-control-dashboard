'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from "@/subframe/components/Button"
import * as SubframeCore from "@subframe/core";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QuestionsTable } from '@/components/questions-table-eng-security-review'
import { ExternalLink } from 'lucide-react'

// Import the SuggestedModifications component
import { SuggestedModifications } from '@/components/suggested-modifications'
import { DefaultPageLayout } from '@/components/ui/subframe/layouts/DefaultPageLayout'
import { IconWithBackground } from '@/components/ui/subframe/components/IconWithBackground'
import { Breadcrumbs } from '@/components/ui/subframe/components/Breadcrumbs'
import IntegrationsAndDataSources from './IntegrationsAndDataSources';
import AddIntegrationDialog from './AddIntegrationDialog';
import EngSecurityReviewQuestionsTable from './QuestionsTable';

export default function EngineeringSecurityReviewAgent() {
  const router = useRouter()
  const [integrations, setIntegrations] = useState([
    {
      name: "Prior security design review docs",
      subtitle: "75 files",
      icon: "FeatherFile",
      link: "#"
    },
    {
      name: "Slack #ask-security channel questions and responses",
      subtitle: "3k + messages",
      icon: "FeatherSlack",
      link: "#"
    },
    {
      name: "Security policy docs",
      subtitle: "150 files",
      icon: "FeatherFile",
      link: "#"
    },
    {
      name: "Design review meeting notes and transcripts",
      subtitle: "35 docs",
      icon: "FeatherFile",
      link: "#"
    },
    {
      name: "Release approval checklists and associated docs",
      subtitle: "315 docs",
      icon: "FeatherFile",
      link: "#"
    },
    {
      name: "Security ticket threads and associated docs",
      subtitle: "500 links",
      icon: "FeatherSlack",
      link: "#"
    }
  ])
  const [newIntegration, setNewIntegration] = useState('')
  const [newFile, setNewFile] = useState<File | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [showModifications, setShowModifications] = useState(false)

  const addIntegration = () => {
    if (newIntegration) {
      setIntegrations([...integrations, { name: newIntegration, icon: 'FeatherFile', subtitle: '', link: "#" }])
      setNewIntegration('')
      setIsAddDialogOpen(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return
    const file = files[0]
    if (file) {
      setNewFile(file)
      setIntegrations([...integrations, { name: `Uploaded: ${file.name}`, icon: 'FeatherFile', subtitle: '', link: "#" }])
      setIsAddDialogOpen(false)
    }
  }

  const handleDialogOpen = () => {
    setIsAddDialogOpen(!isAddDialogOpen);
  }

  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start gap-6 px-6 py-6" >
        <div className="flex w-full items-start gap-4 mobile:flex-col mobile:items-center mobile:justify-start mobile:gap-6" >
          <IconWithBackground size="medium" icon="FeatherRocket" />
          <span className="text-heading-2 font-heading-2 text-default-font mobile:text-center" >
            Acme Inc
          </span>
        </div>
        < div className="flex w-full items-center justify-between" >
          <Breadcrumbs>
            <Breadcrumbs.Item onClick={() => router.push('/agents')}>Agents </Breadcrumbs.Item>
            < Breadcrumbs.Divider />
            <Breadcrumbs.Item active={true}>
              Engineering Security Review
            </Breadcrumbs.Item>
          </Breadcrumbs>
        </div>

        <IntegrationsAndDataSources integrations={integrations} addIntegration={handleDialogOpen} />

        {showModifications ? (
          <SuggestedModifications onBack={() => setShowModifications(false)} />
        ) : (
          <EngSecurityReviewQuestionsTable />
        )}


        <div className="container mx-auto p-4 space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Engineering Security Review Agent</h1>
            <Button onClick={() => setShowModifications(!showModifications)}>
              {showModifications ? 'Back to Review Requests' : 'View Suggested Modifications'}
            </Button>
          </div>

          {showModifications ? (
            <SuggestedModifications onBack={() => setShowModifications(false)} />
          ) : (
            <>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold">Integrations and Data Sources</h2>
                  <AddIntegrationDialog
                    isAddDialogOpen={isAddDialogOpen}
                    newIntegration={newIntegration}
                    handleFileUpload={handleFileUpload}
                    setIsAddDialogOpen={setIsAddDialogOpen}
                    setNewIntegration={setNewIntegration}
                    addIntegration={addIntegration}
                  />
                </div>
              </div>
              <QuestionsTable />


            </>
          )}
        </div>
      </div>
    </DefaultPageLayout>
  )
}
