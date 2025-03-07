"use client";

import React, { useState } from "react";
import { DefaultPageLayout } from "@/subframe/layouts/DefaultPageLayout";
import { IconWithBackground } from "@/subframe/components/IconWithBackground";
import { Breadcrumbs } from "@/subframe/components/Breadcrumbs";
import { Button } from "@/subframe/components/Button";
import * as SubframeCore from "@subframe/core";
import { FilterBadge } from "@/subframe/components/FilterBadge";
import { Badge } from "@/subframe/components/Badge";
import { useRouter } from "next/navigation";
import { SuggestedModifications } from './components/suggested-modifications'
import { QuestionsTable } from './components/questions-table'
import AddIntegrationDialog from "./components/AddIntegrationDialog";
import { ChatDrawer } from './components/ChatDrawer'
import { Integration, integrations as defaultIntegrations } from './data/integrations-data'
import { RequestMetrics } from './components/RequestMetrics';


function SecurityHelpDeskAgent() {
  const router = useRouter();
  const [integrations, setIntegrations] = useState<Integration[]>(defaultIntegrations)

  const [newIntegration, setNewIntegration] = useState('')
  const [, setNewFile] = useState<File | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [showModifications, setShowModifications] = useState(false)

  const addIntegration = () => {
    if (newIntegration) {
      setIntegrations([...integrations, { 
        name: newIntegration, 
        icon: 'FeatherFile', 
        subtitle: '', 
        link: "#" 
      }])
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
      setIntegrations([...integrations, { 
        name: `Uploaded: ${file.name}`, 
        icon: 'FeatherFile', 
        subtitle: '', 
        link: "#" 
      }])
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
              Security Knowledge Assistant
            </Breadcrumbs.Item>
          </Breadcrumbs>
        </div>
        <div>
          <Button size="medium" onClick={() => setShowModifications(!showModifications)}>
            {showModifications ? 'Back to Review Requests' : 'View Suggested Doc Modifications'}
          </Button>
        </div>

        {showModifications ? (
          <SuggestedModifications onBack={() => setShowModifications(false)} />
        ) : (
          <>
            {/* Integrations and Data Sources Section */}
            < div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm" >
              <div className="flex w-full items-center gap-2" >
                <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font" >
                  Integrations and Data Sources
                </span>
                <AddIntegrationDialog
                  isAddDialogOpen={isAddDialogOpen}
                  setIsAddDialogOpen={setIsAddDialogOpen}
                  newIntegration={newIntegration}
                  setNewIntegration={setNewIntegration}
                  addIntegration={addIntegration}
                  handleFileUpload={handleFileUpload}
                />
              </div>
              < div className="flex w-full items-start gap-4" >
                {integrations.map(({ name, link, subtitle, icon }, i) => {
                return (
                  <a key={`${name}-${i}`} href={link} target="_blank">
                    <div className="flex items-center gap-2 rounded-md bg-neutral-50 px-2 py-2">
                      <SubframeCore.Icon
                        className="text-heading-2 font-heading-2 text-default-font"
                        name={icon}
                      />
                      <div className="flex flex-col items-start gap-2 px-1" >
                        <span className="text-body-bold font-body-bold text-default-font" >
                          {name}
                        </span>
                        {subtitle &&
                          < span className="text-caption font-caption text-default-font" >
                            {subtitle}
                          </span>
                        }
                      </div>
                    </div>
                  </a>
                  )
                })}
              </div>
            </div>

            {/* Use the RequestMetrics component without passing props to use calculated values */}
            <RequestMetrics />

            {/* Questions Table Section */}
            < div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm" >
              <QuestionsTable />
            </div>
          </>
        )}
      </div>
      <div className="flex w-full items-center justify-between px-6 py-6">

      </div>
      <ChatDrawer />
    </DefaultPageLayout>
  );
}

export default SecurityHelpDeskAgent;