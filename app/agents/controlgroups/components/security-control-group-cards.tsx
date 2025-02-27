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

  const getEffectivenessColor = (effectiveness: number, asTailwind = false) => {
    if (asTailwind) {
      return effectiveness >= 90 ? 'bg-green-600' : 
             effectiveness >= 70 ? 'bg-yellow-600' : 
             'bg-red-600'
    }
    return effectiveness >= 90 ? '#16a34a' : // green-600
           effectiveness >= 70 ? '#ca8a04' : // yellow-600
           '#dc2626' // red-600
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
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {securityControlGroups.map((theme, index) => (
          <Card key={index} className="flex flex-col cursor-pointer overflow-hidden hover:bg-gray-50" onClick={() => handleCardClick(theme.name)}>
            <div className="h-2" style={{ backgroundColor: getEffectivenessColor(theme.effectiveness) }}></div>
            <CardHeader className="flex-grow pb-0">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{theme.name}</CardTitle>
                <span className="inline-flex font-medium items-center gap-1.5 px-3 py-1.5 rounded-full text-sm bg-gray-100">
                  <div className={`w-2.5 h-2.5 rounded-full ${getEffectivenessColor(theme.effectiveness, true)}`} />
                  {`Effectiveness: ${theme.effectiveness}%`}
                </span>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-sm my-2 p-2 rounded">
                <div className="grid grid-cols-2 divide-x divide-gray-200 gap-4">
                  <div className="space-y-2">
                    <p className="flex justify-between items-baseline">
                      <span className="text-sm font-medium text-gray-500">Framework Controls:</span>
                      <span className="font-semibold text-base">{theme.controls}</span>
                    </p>
                    <p className="flex justify-between items-baseline">
                      <span className="text-sm font-medium text-gray-500">Security Resources:</span>
                      <span className="font-semibold text-base">{theme.resources}</span>
                    </p>
                  </div>
                  <div className="space-y-2 pl-4">
                    <p className="flex justify-between items-baseline">
                      <span className="text-sm font-medium text-gray-500">Metrics:</span>
                      <span className="font-semibold text-base">{theme.metrics}</span>
                    </p>
                    <p className="flex justify-between items-baseline">
                      <span className="text-sm font-medium text-gray-500">Findings & Responses:</span>
                      <span className="font-semibold text-base">{theme.findings}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-sm mt-2 p-2">
                <div className="flex justify-between items-start">
                  <p className="font-semibold">Key Finding:</p>
                </div>
                <p className="text-sm font-medium text-gray-500">{theme.criticalFinding}</p>
              </div>
              {/* <div className="flex mt-3 justify-center">
                <Button variant="brand-secondary" className="font-semibold hover:underline">see more...</Button>
              </div> */}
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