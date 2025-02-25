'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import EndpointProtectionDetailsComponent from './ep-details-subframe'
import DataStorageDetailsComponent from './ds-details-subframe'
import AccessManagementDetailsComponent from './am-details-subframe'
import DecentralizedProvisioningDetailsComponent from './up-details-subframe'
import DetailViewWithActivity from './am-details-subframe'
import { DefaultPageLayout } from '@/components/ui/subframe/layouts/DefaultPageLayout'
import { Breadcrumbs } from '@/components/ui/subframe/components/Breadcrumbs'
import { IconWithBackground } from '@/components/ui/subframe/components/IconWithBackground'
import { Button } from '@/subframe/components/Button'
import { Badge } from "@/subframe/components/Badge"

export default function ControlGroupsComponent() {
  const router = useRouter();
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)

  const securityThemes = [
    {
      name: "Access Management",
      effectiveness: 75,
      controls: 9,
      resources: 9,
      metrics: 9,
      findings: 6,
      criticalFinding: "Only 60% of users have enabled Multi-Factor Authentication (MFA).",
      impact: "Critical"
    },
    {
      name: "Data Protection",
      effectiveness: 60,
      controls: 7,
      resources: 6,
      metrics: 8,
      findings: 5,
      criticalFinding: "15% of sensitive data remains unencrypted, risking unauthorized access and data breaches.",
      impact: "Critical"
    },
    {
      name: "Network Security",
      effectiveness: 80,
      controls: 8,
      resources: 7,
      metrics: 9,
      findings: 4,
      criticalFinding: "20% of firewall rules are obsolete, potentially allowing unauthorized network access.",
      impact: "High"
    },
    {
      name: "Incident Response",
      effectiveness: 70,
      controls: 6,
      resources: 5,
      metrics: 7,
      findings: 5,
      criticalFinding: "Average time to contain security incidents is 8 hours, exceeding the 4-hour target.",
      impact: "High"
    },
    {
      name: "Security Awareness & Training",
      effectiveness: 65,
      controls: 5,
      resources: 4,
      metrics: 6,
      findings: 4,
      criticalFinding: "25% of employees failed the latest phishing simulation test.",
      impact: "High"
    },
    {
      name: "Provisioning",
      effectiveness: 55,
      controls: 7,
      resources: 6,
      metrics: 9,
      findings: 6,
      criticalFinding: "30% of user accounts remain active for >10 days after employee departure.",
      impact: "Critical"
    },
    {
      name: "Endpoint Protection",
      effectiveness: 85,
      controls: 6,
      resources: 6,
      metrics: 9,
      findings: 6,
      criticalFinding: "20% increase in ransomware attempts targeting endpoint devices in the last quarter.",
      impact: "Critical"
    },
    {
      name: "Data Storage",
      effectiveness: 72,
      controls: 10,
      resources: 7,
      metrics: 9,
      findings: 6,
      criticalFinding: "5% of sensitive data remains unencrypted in certain storage locations.",
      impact: "Critical"
    }
  ]

  const getEffectivenessColors = (effectiveness: number) => {
    if (effectiveness >= 80) return {
      text: "text-green-600",
      bg: "bg-green-50"
    }
    if (effectiveness >= 60) return {
      text: "text-yellow-600",
      bg: "bg-yellow-50"
    }
    return {
      text: "text-red-600",
      bg: "bg-red-50"
    }
  }

  const getProgressColor = (effectiveness: number) => {
    if (effectiveness >= 80) return "bg-green-600"
    if (effectiveness >= 60) return "bg-yellow-600"
    return "bg-red-600"
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Critical":
        return "text-red-600"
      case "High":
        return "text-orange-500"
      case "Medium":
        return "text-yellow-500"
      default:
        return "text-green-500"
    }
  }

  const getEffectivenessBadgeVariant = (effectiveness: number) => {
    if (effectiveness >= 80) return "success" as const
    if (effectiveness >= 60) return "warning" as const
    return "error" as const
  }

  const handleCardClick = (themeName: string) => {
    setSelectedTheme(themeName)
  }

  const renderThemeDetails = () => {
    switch (selectedTheme) {
      case "Endpoint Protection":
        return <EndpointProtectionDetailsComponent onClose={() => setSelectedTheme(null)} />
      case "Access Management":
        return <AccessManagementDetailsComponent onClose={() => setSelectedTheme(null)} />
      case "Data Storage":
        return <DataStorageDetailsComponent onClose={() => setSelectedTheme(null)} />
      case "Provisioning":
        return <DecentralizedProvisioningDetailsComponent onClose={() => setSelectedTheme(null)} />
      case "Data Protection":
        return <DetailViewWithActivity onClose={() => setSelectedTheme(null)} />
      default:
        return null
    }
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
              Control Groups & Efficacy
            </Breadcrumbs.Item>
          </Breadcrumbs>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {securityThemes.map((theme, index) => (
            <Card key={index} className="flex flex-col cursor-pointer" onClick={() => handleCardClick(theme.name)}>
              <CardHeader className="flex-grow pb-0">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{theme.name}</CardTitle>
                  <Badge variant={getEffectivenessBadgeVariant(theme.effectiveness)}>
                    {`Effectiveness: ${theme.effectiveness}%`}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-sm my-2 p-2 rounded">
                  <div className="grid grid-cols-2 gap-2">
                    <p><span className="font-semibold">Framework Controls:</span> {theme.controls}</p>
                    <p><span className="font-semibold">Security Resources:</span> {theme.resources}</p>
                    <p><span className="font-semibold">Metrics:</span> {theme.metrics}</p>
                    <p><span className="font-semibold">Findings & Responses:</span> {theme.findings}</p>
                  </div>
                </div>
                <div className="text-sm mt-2 p-2">
                  <div className="flex justify-between items-start">
                    <p className="font-semibold">Finding:</p>
                    <span className={cn("font-semibold", getImpactColor(theme.impact))}>
                      Impact: {theme.impact}
                    </span>
                  </div>
                  <p>{theme.criticalFinding}</p>
                </div>
                <Button variant="brand-secondary" className="font-semibold hover:underline">see more...</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Sheet open={!!selectedTheme} onOpenChange={() => setSelectedTheme(null)}>
          <SheetContent className="w-full sm:max-w-[800px] overflow-y-auto">
            {renderThemeDetails()}
          </SheetContent>
        </Sheet>
      </div>
    </DefaultPageLayout>
  );
}