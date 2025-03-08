'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from "@/subframe/components/Button"
import { FilterBadge } from "@/subframe/components/FilterBadge";
import { Badge } from "@/subframe/components/Badge";
import * as SubframeCore from "@subframe/core";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import VulnerabilitiesTable from './vulnerabilities-table'
import { IconName } from '@subframe/core';

export default function Vulnerabilities() {
  const router = useRouter()
  const [integrations, setIntegrations] = useState([
    {
      name: "GitHub Repository Scans",
      subtitle: "Code analysis, secrets detection, dependency checks",
      icon: "FeatherGithub",
      link: "#"
    },
    {
      name: "AWS Security Hub",
      subtitle: "Cloud security posture, compliance reports",
      icon: "FeatherCloud",
      link: "#"
    },
    {
      name: "Google Cloud Security Command Center",
      subtitle: "Threat detection, security health analytics",
      icon: "FeatherCloud",
      link: "#"
    },
    {
      name: "Snyk Vulnerability Scanner",
      subtitle: "Dependencies, containers, IaC scanning",
      icon: "FeatherShield",
      link: "#"
    },
    {
      name: "Wiz Cloud Security",
      subtitle: "Cloud infrastructure risks, compliance",
      icon: "FeatherShield",
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
    <div className="flex flex-col gap-4">
      <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
        <div className="flex w-full items-center gap-2">
          <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font">
            Integrations and Data Sources
          </span>
          <Button
            className="h-6 w-auto flex-none"
            disabled={false}
            variant="brand-primary"
            icon="FeatherPlus"
            loading={false}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => { addIntegration(); }
            }
          >
            Add
          </Button>
        </div>
        <div className="grid w-full grid-cols-3 items-start gap-4">
          {integrations.map(({ name, link, subtitle, icon }, i) => {
            return (
              <a key={`${name}-${i}`} href={link} target="_blank">
                <div className="flex items-center gap-2 rounded-md bg-neutral-50 px-2 py-2">
                  <SubframeCore.Icon
                    className="text-heading-2 font-heading-2 text-default-font"
                    name={icon as IconName}
                  />
                  <div className="flex flex-col items-start gap-2 px-1">
                    <span className="text-body-bold font-body-bold text-default-font">
                      {name}
                    </span>
                    {subtitle &&
                      <span className="text-caption font-caption text-default-font">
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
      <VulnerabilitiesTable />
    </div>
  )
}
