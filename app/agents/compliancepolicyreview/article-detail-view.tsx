'use client'

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { useState } from "react"
import { enrichedHippaArticles } from "./hippa-detail-view"
import { ScrollArea } from "@/components/ui/scroll-area"


interface ArticleDetailViewProps {
  article: typeof enrichedHippaArticles[0] & { supportingEvidence?: {
    configurations: Array<{
      tool: string;
      type: string;
      evidence: {
        policyName: string;
        settings: Array<{ name: string; value: string }>;
        lastUpdated: string;
        version: string;
      };
    }>;
    metrics: Array<{
      name: string;
      current: number;
      target: number;
      trend: string;
      history: Array<{ date: string; value: number }>;
    }>;
    audits: Array<{
      date: string;
      type: string;
      scope: string;
      findings: string;
      auditor: string;
    }>;
  }};
  onClose: () => void;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  article,
  onClose,
}) => {
  const [followUpNotes, setFollowUpNotes] = useState("")

  const handleFollowUp = (teamContact: string) => {
    // You might want to implement actual follow-up logic here
    console.log(`Following up with ${teamContact}`, followUpNotes);
  }

  const getTrendIcon = (trend: string) => {
    switch(trend) {
      case 'increasing': return <TrendingUp className="h-12 w-12 text-green-500" />
      case 'decreasing': return <TrendingDown className="h-12 w-12 text-red-500" />
      default: return <Minus className="h-12 w-12 text-gray-500" />
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)]">
      <div className="flex items-center space-x-4 flex-shrink-0">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
          className="hover:bg-transparent p-0"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold">{article.name}</h2>
          <p className="text-sm text-gray-500">Article ID: {article.id}</p>
        </div>
      </div>

      <ScrollArea className="flex-1 mt-8">
      <div className="space-y-6">

        {/* Non-compliant Instances */}
        {article.nonCompliantInstances.length > 0 && (
            <div className="space-y-4">
            <h3 className="text-xl font-semibold text-red-600">Non-Compliant Instances</h3>
            {article.nonCompliantInstances.map((instance, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                    <h4 className="font-semibold">{instance.system.name}</h4>
                    <span className="text-sm text-gray-500">{instance.system.team}</span>
                </div>
                <p className="text-sm text-gray-700">{instance.issue}</p>
                <div className="space-y-2">
                    <p className="text-sm"><strong>Mitigation:</strong> {instance.mitigation}</p>
                    <p className="text-sm"><strong>Status:</strong> {instance.status}</p>
                    <p className="text-sm"><strong>Due Date:</strong> {instance.dueDate}</p>
                </div>
                <Textarea
                    placeholder="Add notes for follow-up..."
                    value={followUpNotes}
                    onChange={(e) => setFollowUpNotes(e.target.value)}
                    className="mt-2"
                />
                <Button 
                    onClick={() => handleFollowUp(instance.system.teamContact)}
                    className="mt-2"
                >
                    Follow Up with Team
                </Button>
                </div>
            ))}
            </div>
        )}

        {/* Article Description */}
        <div>
            <h3 className="text-xl font-semibold">Description</h3>
            <p className="text-gray-700 mt-2">{article.text}</p>
        </div>

        {/* Company Policies */}
        <div>
            <h3 className="text-xl font-semibold">Company Policies</h3>
            <div className="space-y-4 mt-2">
            {article.policies.map((policy, index) => (
                <div key={index} className="border rounded-lg p-4">
                <h4 className="font-semibold">{policy.name}</h4>
                <p className="text-sm text-gray-700 mt-1">{policy.description}</p>
                <a 
                    href={policy.link}
                    className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View Policy Document
                </a>
                </div>
            ))}
            </div>
        </div>

        {/* Impacted Systems */}
        <div>
            <h3 className="text-xl font-semibold">Impacted Systems</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {article.impactedSystems.map((system, index) => (
                <div key={index} className="border rounded-lg p-4">
                <h4 className="font-semibold">{system.name}</h4>
                <p className="text-sm text-gray-500">{system.type}</p>
                <p className="text-sm text-gray-700 mt-1">{system.repository}</p>
                <p className="text-sm text-gray-700">Owned by: {system.team}</p>
                </div>
            ))}
            </div>
        </div>

        {/* Supporting Evidence Section */}
        {article.supportingEvidence && (
            <div className="space-y-6">
            
            {/* Security Tool Configurations */}
            <div>
                <h3 className="text-xl font-semibold">Security Tool Configurations</h3>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                {article.supportingEvidence.configurations.map((config, idx) => (
                    <Card key={idx}>
                    <CardHeader>
                        <CardTitle className="text-base">{config.tool}</CardTitle>
                        <p className="text-sm text-gray-500">{config.type}</p>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm font-medium mb-2">Policy: {config.evidence.policyName}</p>
                        <div className="space-y-2">
                        {config.evidence.settings.map((setting, i) => (
                            <div key={i} className="flex justify-between text-sm">
                            <span className="text-gray-600">{setting.name}</span>
                            <span className="font-medium">{setting.value}</span>
                            </div>
                        ))}
                        </div>
                        <div className="mt-4 text-xs text-gray-500">
                        Last updated: {config.evidence.lastUpdated} (v{config.evidence.version})
                        </div>
                    </CardContent>
                    </Card>
                ))}
                </div>
            </div>

            {/* Compliance Metrics */}
            <div>
                <h3 className="text-xl font-semibold">Compliance Metrics</h3>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                {article.supportingEvidence.metrics.map((metric, idx) => (
                    <Card key={idx}>
                    <CardContent className="pt-6 flex flex-col items-center text-center">
                        {getTrendIcon(metric.trend)}
                        <div className="flex justify-center items-start mb-2 w-full">
                            <p className="text-sm font-medium">{metric.name}</p>
                        </div>
                        <div className="flex items-baseline space-x-2">
                            <span className="text-2xl font-bold">{metric.current}</span>
                            <span className="text-sm text-gray-500">/ {metric.target} target</span>
                        </div>
                    </CardContent>
                    </Card>
                ))}
                </div>
            </div>

            {/* Audit History */}
            <div>
                <h3 className="text-xl font-semibold">Recent Audits</h3>
                <div className="mt-2 space-y-4">
                {article.supportingEvidence.audits.map((audit, idx) => (
                    <Card key={idx}>
                    <CardContent className="pt-6">
                        <div className="flex justify-between mb-2">
                        <span className="font-medium">{audit.type} Audit</span>
                        <span className="text-sm text-gray-500">{audit.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Scope: {audit.scope}</p>
                        <p className="text-sm">{audit.findings}</p>
                        <p className="text-sm text-gray-500 mt-2">Auditor: {audit.auditor}</p>
                    </CardContent>
                    </Card>
                ))}
                </div>
                </div>
            </div>
        )}
        </div>
      </ScrollArea>
    </div>
  )
} 