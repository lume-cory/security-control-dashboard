'use client'

import { useState } from 'react'
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '@/subframe/components/Button'
import EndpointProtectionDetailsComponent from '../ep-details-subframe'
import DataStorageDetailsComponent from '../ds-details-subframe'
import AccessManagementDetailsComponent from '../am-details-subframe'
import DecentralizedProvisioningDetailsComponent from '../up-details-subframe'
import DetailViewWithActivity from '../am-details-subframe'
import { SecurityControlGroup } from '../data/security-control-groups'

interface SecurityControlGroupCardsProps {
  securityControlGroups: SecurityControlGroup[];
}

export function SecurityControlGroupCards({ securityControlGroups }: SecurityControlGroupCardsProps) {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)

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
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {securityControlGroups.map((theme, index) => (
          <Card key={index} className="flex flex-col cursor-pointer" onClick={() => handleCardClick(theme.name)}>
            <CardHeader className="flex-grow pb-0">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{theme.name}</CardTitle>
                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs bg-gray-100">
                  <div className={`w-2 h-2 rounded-full ${
                    theme.effectiveness >= 80 ? 'bg-green-600' : 
                    theme.effectiveness >= 60 ? 'bg-yellow-600' : 
                    'bg-red-600'
                  }`} />
                  {`Effectiveness: ${theme.effectiveness}%`}
                </span>
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
    </>
  )
} 