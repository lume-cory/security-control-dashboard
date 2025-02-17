'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { enrichedSOC2Articles } from '../data/soc2-enriched-articles'
import { useState } from 'react'
import { ArticleDetailView } from './article-detail-view'
import { frameworkAlignmentData } from '../data/framework-alignment-data'

// Calculate team non-compliance data
const teamNonComplianceData = enrichedSOC2Articles.reduce((acc: { team: string, count: number }[]) => {
  // Get all non-compliant instances across all articles
  const allNonCompliantInstances = enrichedSOC2Articles.flatMap(article => article.nonCompliantInstances);
  
  // Count unique teams
  const teamCounts = allNonCompliantInstances.reduce((teamAcc: Record<string, number>, instance) => {
    const team = instance.system.team;
    teamAcc[team] = (teamAcc[team] || 0) + 1;
    return teamAcc;
  }, {});

  // Convert to array format
  return Object.entries(teamCounts).map(([team, count]) => ({ team, count }));
}, []);

export const Soc2DetailView: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<typeof enrichedSOC2Articles[0] | null>(null);
  const soc2Data = frameworkAlignmentData.find(f => f.name === 'SOC2 Type 1');

  const handleOpenArticle = (article: typeof enrichedSOC2Articles[0]) => {
    setSelectedArticle(article);
  };

  if (selectedArticle) {
    const enrichedArticle = {
      ...selectedArticle,
      policies: selectedArticle.policies.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
        policyText: p.policyText || '',
        status: p.status || 'active',
        link: p.link
      })),
      impactedSystems: selectedArticle.impactedSystems || [],
      nonCompliantInstances: selectedArticle.nonCompliantInstances || [],
      supportingEvidence: {
        configurations: selectedArticle.supportingEvidence?.configurations || [],
        metrics: selectedArticle.supportingEvidence?.metrics || [],
        audits: selectedArticle.supportingEvidence?.audits || []
      }
    };
    
    return <ArticleDetailView 
      article={enrichedArticle}
      onClose={() => setSelectedArticle(null)} 
    />;
  }

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-6">SOC2 Type 1 Compliance</h2>
      
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-6">
          {/* Policy Status Overview */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Policy Status Overview</h3>
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {enrichedSOC2Articles.reduce((count, article) => 
                        count + article.policies.filter(policy => policy.status === 'active').length, 0
                      )}
                    </div>
                    <div className="text-sm text-gray-500">Active Policies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {enrichedSOC2Articles.reduce((count, article) => 
                        count + article.policies.filter(policy => policy.status === 'suggested').length, 0
                      )}
                    </div>
                    <div className="text-sm text-gray-500">Suggested Policies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {enrichedSOC2Articles.reduce((count, article) => 
                        count + article.nonCompliantInstances.length, 0
                      )}
                    </div>
                    <div className="text-sm text-gray-500">Non-compliant Systems</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{soc2Data?.alignment || 0}%</div>
                    <div className="text-sm text-gray-500">Overall Alignment</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Non compliant articles */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Non-Compliant Controls</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {enrichedSOC2Articles
                .filter(article => article.nonCompliantInstances.length > 0)
                .map(article => (
                  <Card key={article.id} className="cursor-pointer hover:bg-gray-50" onClick={() => handleOpenArticle(article)}>
                    <CardHeader>
                      <CardTitle className="text-base">{article.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Non-compliant instances</span>
                        <span className="text-lg font-bold text-red-600">
                          {article.nonCompliantInstances.length}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          {/* Non compliant teams */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Non-Compliance by Team</h3>
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {teamNonComplianceData.map(item => (
                    <div key={item.team} className="text-center">
                      <div className="text-2xl font-bold text-red-600">{item.count}</div>
                      <div className="text-sm text-gray-500">{item.team}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Articles and company policies */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">SOC2 Controls & Company Policy</h3>
            <div className="space-y-6">
              {enrichedSOC2Articles.map(article => (
                <Card key={article.id} className="cursor-default">
                  <CardHeader
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleOpenArticle(article)}
                  >
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{article.name}</CardTitle>
                      {article.nonCompliantInstances.length > 0 && (
                        <span className="text-sm font-bold text-red-600">
                          {article.nonCompliantInstances.length} non-compliant
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{article.text}</p>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible>
                      {article.policies.map((policy, index) => (
                        <AccordionItem key={index} value={`${article.id}-policy-${index}`}>
                          <AccordionTrigger>
                            <span className="flex items-center gap-2">
                              <span>{policy.name}</span>
                              <span className="text-sm text-muted-foreground">({policy.id})</span>
                              {policy.status === 'suggested' && (
                                <span className="text-sm text-yellow-600">(Suggested)</span>
                              )}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="text-sm text-gray-500 mb-2">{policy.description}</p>
                            <p className="text-sm text-gray-700 mb-2">{policy.policyText}</p>
                            <a 
                              href={policy.link}
                              className="text-sm text-blue-600 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Policy Document
                            </a>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="h-8" />
        </div>
      </ScrollArea>
    </div>
  )
} 