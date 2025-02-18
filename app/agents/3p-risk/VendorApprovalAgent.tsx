"use client";

import React from "react";
import { DefaultPageLayout } from "@/subframe/layouts/DefaultPageLayout";
import { IconWithBackground } from "@/subframe/components/IconWithBackground";
import { Breadcrumbs } from "@/subframe/components/Breadcrumbs";
import { Button } from "@/subframe/components/Button";
import * as SubframeCore from "@subframe/core";
import { FilterBadge } from "@/subframe/components/FilterBadge";
import { Badge } from "@/subframe/components/Badge";
import { Table } from "@/subframe/components/Table";
import { useRouter } from "next/navigation";
import { useState } from 'react'
import { QuestionsTable } from './components/questions-table'
import AddIntegrationDialog from "./components/AddIntegrationDialog";
import { ChatDrawer } from './components/ChatDrawer'
import { IntegrationsSection } from './components/IntegrationsSection'
import { VendorSection } from './components/VendorSection'


function VendorApprovalAgent() {
  const router = useRouter();

  const [integrations, setIntegrations] = useState<Array<{
    name: string;
    subtitle: string;
    icon: SubframeCore.IconName;
    link: string;
  }>>([
    {
      name: "Slack Channels",
      subtitle: "10k+ messages",
      icon: "FeatherSlack",
      link: "#"
    },
    {
      name: "Vendor Management System",
      subtitle: "40 apps & libraries",
      icon: "FeatherShapes",
      link: "#"
    },
    {
      name: "Security Policy Docs",
      subtitle: "150 files",
      icon: "FeatherFiles",
      link: "#"
    },
    {
      name: "Vendor Review Tickets",
      subtitle: "2.5k ticket threads",
      icon: "FeatherTicket",
      link: "#"
    },
    {
      name: "Vendor Contracts",
      subtitle: "320 files",
      icon: "FeatherFiles",
      link: "#"
    }, 
    {
      name: "3P Security Questionnaires",
      subtitle: "320 files",
      icon: "FeatherFiles",
      link: "#"
    }, 
    {
      name: "Vendor Emails",
      subtitle: "10k+ emails",
      icon: "FeatherMail",
      link: "#"
    }
  ])
  const [newIntegration, setNewIntegration] = useState('')
  const [, setNewFile] = useState<File | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

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

      {/*Title and navigation breadcrumbs*/}
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
              3rd Party Vendor Review Agent
            </Breadcrumbs.Item>
          </Breadcrumbs>
        </div>

        <>
          <IntegrationsSection />
          <VendorSection />

          {/*Metrics section*/}
          < div className="flex w-full flex-wrap items-start gap-4" >
            <div className="flex flex-col items-start gap-4 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm" >
              <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color" >
                Outstanding questions
              </span>
              < div className="flex items-center gap-2" >
                <FilterBadge label="Urgent" count="0" selected={false} />
                <Badge variant="error" icon="FeatherArrowUp" >
                  13 %
                </Badge>
              </div>
              < div className="flex items-center gap-2" >
                <FilterBadge label="High" count="2" selected={false} />
                <Badge variant="success" icon="FeatherArrowDown" >
                  5 %
                </Badge>
              </div>
              < div className="flex items-center gap-2" >
                <FilterBadge label="Medium" count="2" selected={false} />
                <Badge variant="neutral" icon="FeatherArrowRight" >
                  0 %
                </Badge>
              </div>
              < div className="flex items-center gap-2" >
                <FilterBadge label="Low" count="1" selected={false} />
                <Badge variant="success" icon="FeatherArrowDown" >
                  25 %
                </Badge>
              </div>
            </div>
            < div className="flex grow shrink-0 basis-0 flex-col flex-wrap items-start gap-4" >
              <div className="flex w-full flex-wrap items-start gap-4" >
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm" >
                  <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color" >
                    Open Missed SLAs
                  </span>
                  < div className="flex w-full flex-col items-start gap-2" >
                    <span className="text-heading-2 font-heading-2 text-default-font" >
                      2
                    </span>
                    < Badge variant="error" icon="FeatherArrowUp" >
                      25 %
                    </Badge>
                  </div>
                </div>
                < div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm" >
                  <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color" >
                    Missed SLAs(past - 30 days)
                  </span>
                  < div className="flex w-full flex-col items-start gap-2" >
                    <span className="text-heading-2 font-heading-2 text-default-font" >
                      7
                    </span>
                    < Badge variant="success" icon="FeatherArrowDown" >
                      33 %
                    </Badge>
                  </div>
                </div>
              </div>
              < div className="flex w-full flex-wrap items-start gap-4" >
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm" >
                  <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color" >
                    Average time to resolve(past 30 days)
                  </span>
                  < div className="flex w-full flex-col items-start gap-2" >
                    <span className="text-heading-2 font-heading-2 text-default-font" >
                      11 days
                    </span>
                    < Badge variant="success" icon="FeatherArrowDown" >
                      25 %
                    </Badge>
                  </div>
                </div>
                < div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm" >
                  <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color" >
                    Resolved(past 30 days)
                  </span>
                  < div className="flex w-full flex-col items-start gap-2" >
                    <span className="text-heading-2 font-heading-2 text-default-font" >
                      44
                    </span>
                    < Badge variant="neutral" icon="FeatherArrowUp" >
                      33 %
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*questions table section*/}
          {/* < div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm" >
            <QuestionsTable />
          </div> */}
        </>
      </div>

      {/*chat drawer*/}
      <ChatDrawer />
    </DefaultPageLayout>
  );
}

export default VendorApprovalAgent;