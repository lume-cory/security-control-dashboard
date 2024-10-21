'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { EndpointProtectionDetailsComponent } from './endpoint-protection-details'
import { DataStorageDetailsComponent } from './data-storage-details'
import { AccessManagementDetailsComponent } from './access-management-details'
import { DecentralizedProvisioningDetailsComponent } from './decentralized-provisioning-details'

export function SecurityAppComponent() {
  const [activeTab, setActiveTab] = useState("themes")
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null)
  const router = useRouter()

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

  const getEffectivenessColor = (effectiveness: number) => {
    if (effectiveness >= 80) return "text-green-600"
    if (effectiveness >= 60) return "text-yellow-600"
    return "text-red-600"
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

  const handleCardClick = (themeName: string) => {
    switch (themeName) {
      case "Endpoint Protection":
        router.push('/endpoint-protection')
        break
      case "Access Management":
        router.push('/access-management')
        break
      case "Data Storage":
        router.push('/data-storage')
        break
      case "Provisioning":
        router.push('/provisioning')
        break
      default:
        setSelectedTheme(themeName)
    }
  }

  return (
    <div className="container mx-auto p-4 min-h-screen overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">AMCE Inc. Security Control Effectiveness</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="themes">Security Themes</TabsTrigger>
          <TabsTrigger value="controls">Security Controls</TabsTrigger>
          <TabsTrigger value="resources">Security Resources</TabsTrigger>
        </TabsList>
        <TabsContent value="themes">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {securityThemes.map((theme, index) => (
              <Card key={index} className="flex flex-col cursor-pointer" onClick={() => handleCardClick(theme.name)}>
                <CardHeader className="flex-grow pb-0">
                  <CardTitle className="text-lg">{theme.name}</CardTitle>
                  <Progress 
                    value={theme.effectiveness} 
                    className={cn(
                      "w-full h-2 bg-gray-200",
                      "border border-gray-300 rounded-full",
                      "[&>div]:transition-all",
                      `[&>div]:${getProgressColor(theme.effectiveness)}`
                    )}
                  />
                  <CardDescription className={cn("font-semibold", getEffectivenessColor(theme.effectiveness))}>
                    Effectiveness: {theme.effectiveness}%
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-sm my-2 p-2 bg-gray-100 rounded grid grid-cols-1 gap-2">
                    <p><span className="font-semibold">NIST CSF Controls:</span> {theme.controls}</p>
                    <p><span className="font-semibold">Security Resources:</span> {theme.resources}</p>
                    <p><span className="font-semibold">Metrics:</span> {theme.metrics}</p>
                    <p><span className="font-semibold">Findings & Responses:</span> {theme.findings}</p>
                  </div>
                  <div className="text-sm mt-2 p-2 bg-gray-100 rounded">
                    <p className="font-semibold">Finding:</p>
                    <p>{theme.criticalFinding}</p>
                    <p className={cn("font-semibold", getImpactColor(theme.impact))}>
                      Impact: {theme.impact}
                    </p>
                    <p className="font-semibold hover:underline">see more...</p>
                  </div>
                </CardContent>              
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="controls">
          <p>Security Controls content will go here.</p>
        </TabsContent>
        <TabsContent value="resources">
          <p>Security Resources content will go here.</p>
        </TabsContent>
      </Tabs>
      {selectedTheme && (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setSelectedTheme(null)}
        >
          Back to Themes
        </button>
      )}
      {/* Remove or comment out these sections */}
      {/*
      {selectedTheme === "Data Storage" && (
        <div className="mt-4">
          <DataStorageDetailsComponent />
        </div>
      )}
      {selectedTheme === "Access Management" && (
        <div className="mt-4">
          <AccessManagementDetailsComponent />
        </div>
      )}
      {selectedTheme === "Provisioning" && (
        <div className="mt-4">
          <DecentralizedProvisioningDetailsComponent />
        </div>
      )}
      */}
    </div>
  )
}
