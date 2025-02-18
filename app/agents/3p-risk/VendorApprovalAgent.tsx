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
import { AlertsSection } from "./components/AlertsSection"
import { alerts } from "./data/alerts"


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
      <div className="flex h-full w-full flex-col items-start gap-6 px-6 py-6">
        <div className="flex w-full items-start gap-4 mobile:flex-col mobile:items-center mobile:justify-start mobile:gap-6">
          <IconWithBackground size="medium" icon="FeatherRocket" />
          <span className="text-heading-2 font-heading-2 text-default-font mobile:text-center">
            Acme Inc
          </span>
        </div>
        <div className="flex w-full items-center justify-between">
          <Breadcrumbs>
            <Breadcrumbs.Item onClick={() => router.push('/agents')}>Agents</Breadcrumbs.Item>
            <Breadcrumbs.Divider />
            <Breadcrumbs.Item active={true}>
              3rd Party Vendor Review Agent
            </Breadcrumbs.Item>
          </Breadcrumbs>
        </div>

        <div className="space-y-6 w-full">
          <IntegrationsSection />
          <AlertsSection alerts={alerts} />
          <VendorSection />
        </div>
      </div>

      {/*chat drawer*/}
      <ChatDrawer />
    </DefaultPageLayout>
  );
}

export default VendorApprovalAgent;