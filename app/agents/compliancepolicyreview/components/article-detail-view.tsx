'use client'

import { Button } from "@/subframe/components/Button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { useState } from "react"
import { enrichedHippaArticles } from "./hippa-detail-view"
import { ScrollArea } from "@/components/ui/scroll-area"
import { enrichedSOC2Articles } from "../data/soc2-enriched-articles"

interface BaseArticle {
  id: string;
  name: string;
  text: string;
  policies: Array<{
    id: string;
    name: string;
    description: string;
    policyText: string;
    link: string;
    status: string;
  }>;
  impactedSystems: Array<{
    name: string;
    type: string;
    repository: string;
    team: string;
    teamContact: string;
  }>;
  nonCompliantInstances: Array<{
    system: {
      name: string;
      type: string;
      repository: string;
      team: string;
      teamContact: string;
    };
    issue: string;
    mitigation: string;
    status: string;
    dueDate: string;
  }>;
}

interface ArticleDetailViewProps {
  article: BaseArticle & {
    supportingEvidence?: {
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
        status: 'good' | 'bad' | 'neutral';
        history: Array<{ date: string; value: number }>;
      }>;
      audits: Array<{
        date: string;
        type: string;
        scope: string;
        findings: string;
        auditor: string;
      }>;
    };
  };
  onClose: () => void;
}

interface PolicyCardProps {
  policy: {
    id: string;
    name: string;
    description: string;
    policyText: string;
    link: string;
    status?: string;
    associatedRegulations?: Array<{ name: string }>;
  };
}

const PolicyCard: React.FC<PolicyCardProps> = ({ policy }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(policy.policyText);

  const handleSaveModification = () => {
    // TODO: API call to save modified policy
    console.log('Saving modified policy:', editedText);
    setIsEditing(false);
  };

  const isStatusSuggested = (policy.status || '').toLowerCase() === 'suggested';

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center gap-2">
        <h4 className="font-semibold">{policy.name}</h4>
        <span className="text-sm text-muted-foreground">({policy.id})</span>
        {isStatusSuggested && (
          <span className="text-sm text-yellow-600">(Suggested Update)</span>
        )}
      </div>
      <p className="text-sm text-gray-500 mt-1">{policy.description}</p>
      
      {isStatusSuggested ? (
        isEditing ? (
          <div className="mt-2">
            <Textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="min-h-[100px] text-sm"
            />
            <div className="flex gap-2 mt-2">
              <Button size="small" onClick={handleSaveModification}>Save Changes</Button>
              <Button size="small" variant="brand-secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-700 mt-2">{policy.policyText}</p>
            {policy.associatedRegulations && policy.associatedRegulations.length <= 3 && (
              <p className="text-sm text-gray-600 mt-2">
                This policy is applicable for the {
                  policy.associatedRegulations.length === 1 
                    ? `${policy.associatedRegulations[0].name} regulation`
                    : policy.associatedRegulations.length === 2
                      ? `${policy.associatedRegulations[0].name} and ${policy.associatedRegulations[1].name} regulations`
                      : `${policy.associatedRegulations[0].name}, ${policy.associatedRegulations[1].name}, and ${policy.associatedRegulations[2].name} regulations`
                }.
              </p>
            )}
            <div className="flex gap-2 mt-2">
              <Button size="small" onClick={() => setIsEditing(true)}>Modify</Button>
              <Button size="small" variant="brand-secondary">Submit for Approval</Button>
              <Button size="small" variant="brand-secondary">Ignore</Button>
            </div>
            <p className="text-sm text-gray-500 mt-2">Once approved by the policy approval board, this change will be applied to the policy document listed above. </p>
          </>
        )
      ) : (
        <>
          <p className="text-sm text-gray-700 mt-2">{policy.policyText}</p>
          {policy.associatedRegulations && policy.associatedRegulations.length <= 2 && (
            <p className="text-sm text-gray-600 mt-2">
              This policy is applicable for {policy.associatedRegulations
                .map(reg => reg.name)
                .join(' and ')} regulation.
            </p>
          )}
          <a 
            href={policy.link}
            className="text-sm text-blue-600 hover:underline mt-2 inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Policy Document
          </a>
        </>
      )}
    </div>
  );
};

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  article,
  onClose,
}) => {
  const [followUpNotes, setFollowUpNotes] = useState("")

  const handleFollowUp = (teamContact: string) => {
    // You might want to implement actual follow-up logic here
    console.log(`Following up with ${teamContact}`, followUpNotes);
  }

  const getTrendIcon = (trend: string, status: 'good' | 'bad' | 'neutral') => {
    const getColorClass = () => {
      switch(status) {
        case 'good': return 'text-green-500'
        case 'bad': return 'text-red-500'
        case 'neutral': return 'text-gray-500'
      }
    }

    const colorClass = getColorClass()
    
    switch(trend) {
      case 'increasing': return <TrendingUp className={`h-12 w-12 ${colorClass}`} />
      case 'decreasing': return <TrendingDown className={`h-12 w-12 ${colorClass}`} />
      default: return <Minus className={`h-12 w-12 ${colorClass}`} />
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)]">
      <div className="flex items-center space-x-4 flex-shrink-0">
        <Button 
          variant="brand-secondary" 
          size="small" 
          icon="FeatherChevronLeft"
          onClick={onClose}
          className="hover:bg-transparent p-0"
        >
        </Button>
        <div>
          <h2 className="text-2xl font-bold">{article.name}</h2>
          <p className="text-sm text-gray-500">ID: {article.id}</p>
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
              <PolicyCard key={index} policy={policy} />
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
                        {getTrendIcon(metric.trend, metric.status)}
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

      {/* Footer */}
      <div className="flex justify-end gap-4 p-6">
        <Button variant="brand-primary" icon="FeatherFile" onClick={() => console.log('Generate Report')}>
          Generate Report
        </Button>
      </div>
    </div>
  )
} 