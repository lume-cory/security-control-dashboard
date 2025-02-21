"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/subframe/components/Badge"
import { Button } from "@/subframe/components/Button"
import SystemDescription, { fullDescription } from "./SystemDescription"
import DataAnalysis, { fullData } from "./DataAnalysis"
import DataflowsTable, { fullDataflows } from "./DataflowsTable"
import ThreatsAnalysis, { fullThreats } from "./ThreatsAnalysis"
import SeverityAssessment, { fullAssessments } from "./SeverityAssessment"
import MitigationProposals, { fullMitigations } from "./MitigationProposals"
import References, { fullReferences } from "./References"
import { Textarea } from "@/components/ui/textarea"

type SectionStatus = 'PENDING' | 'GENERATING' | 'COMPLETE' | 'UPDATED';

interface Section {
  name: string;
  status: SectionStatus;
  isEditing: boolean;
}

interface SectionContent {
  type: string;
  content: any;
}

interface ComponentProps {
  typingSpeed?: number;
}

export default function ThreatModelAssistant({ typingSpeed = 2000 }: ComponentProps) {
  const [confluenceLink, setConfluenceLink] = useState("")
  const [featureName, setFeatureName] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentSection, setCurrentSection] = useState("")
  const [sections, setSections] = useState<Section[]>([
    { name: "System Description", status: 'PENDING', isEditing: false },
    { name: "Data Analysis", status: 'PENDING', isEditing: false },
    { name: "Dataflows", status: 'PENDING', isEditing: false },
    { name: "Threat Analysis (STRIDE)", status: 'PENDING', isEditing: false },
    { name: "Severity Assessment", status: 'PENDING', isEditing: false },
    { name: "Suggested Mitigations", status: 'PENDING', isEditing: false },
    { name: "References", status: 'PENDING', isEditing: false }
  ])
  const [editContent, setEditContent] = useState<SectionContent | null>(null)
  const [sectionProgress, setSectionProgress] = useState<Record<number, boolean>>({})

  const getStatusBadge = (status: SectionStatus) => {
    switch (status) {
      case 'GENERATING':
        return <Badge variant="warning">Generating...</Badge>
      case 'COMPLETE':
        return <Badge variant="success">Complete</Badge>
      case 'UPDATED':
        return <Badge variant="brand">Updated</Badge>
      default:
        return <Badge variant="neutral">Pending</Badge>
    }
  }

  const startAnalysis = () => {
    setIsAnalyzing(true)
    // Set first section to Generating
    setSections(prev => prev.map((section, idx) => ({
      ...section,
      status: idx === 0 ? 'GENERATING' : 'PENDING'
    })))
  }

  const getSectionContent = (index: number) => {
    switch (index) {
      case 0:
        return { type: 'text', content: fullDescription }
      case 1:
        return { type: 'table', content: fullData }
      case 2:
        return { type: 'table', content: fullDataflows }
      case 3:
        return { type: 'table', content: fullThreats }
      case 4:
        return { type: 'table', content: fullAssessments }
      case 5:
        return { type: 'table', content: fullMitigations }
      case 6:
        return { type: 'list', content: fullReferences }
      default:
        return null
    }
  }

  const toggleEdit = (index: number) => {
    setSections(prev => prev.map((section, idx) => {
      if (idx === index) {
        if (section.isEditing) {
          // Save changes
          // Here you would update the component's data with editContent
          return { ...section, isEditing: false, status: 'UPDATED' }
        } else {
          // Start editing
          setEditContent(getSectionContent(index))
          return { ...section, isEditing: true }
        }
      }
      return section
    }))
  }

  const renderEditContent = (content: SectionContent) => {
    if (content.type === 'text') {
      return (
        <Textarea
          className="w-full min-h-[200px]"
          value={JSON.stringify(content.content, null, 2)}
          onChange={(e) => setEditContent({ ...content, content: e.target.value })}
        />
      )
    }
    return (
      <Textarea
        className="w-full min-h-[200px]"
        value={JSON.stringify(content.content, null, 2)}
        onChange={(e) => setEditContent({ ...content, content: JSON.parse(e.target.value) })}
      />
    )
  }

  const onSectionComplete = (index: number) => {
    setSectionProgress(prev => ({ ...prev, [index]: true }))

    // Set current section to Complete
    setSections(prev => prev.map((section, idx) => {
      if (idx === index) {
        return { ...section, status: 'COMPLETE' }
      }
      // Set next section to Generating
      if (idx === index + 1) {
        return { ...section, status: 'GENERATING' }
      }
      return section
    }))
  }

  const handleSave = (index: number) => {
    if (!editContent) return

    // Here you would update the source data
    // For now, just close the edit view
    setEditContent(null)
    setSections(prev => prev.map((section, idx) =>
      idx === index ? { ...section, isEditing: false, status: 'UPDATED' } : section
    ))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Threat Model Analysis</CardTitle>
            {isAnalyzing && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">{currentSection}</span>
                <Progress value={progress} className="w-[100px]" />
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Feature Name</label>
              <Input
                value={featureName}
                onChange={(e) => setFeatureName(e.target.value)}
                placeholder="Vehicle Detection System"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Engineering Design Document</label>
              <Input
                value={confluenceLink}
                onChange={(e) => setConfluenceLink(e.target.value)}
                placeholder="https://confluence.acme.com/design/vehicle-detection"
                className="mt-1"
              />
            </div>
            {!isAnalyzing && (
              <button
                className="w-full bg-brand-primary text-white py-2 rounded-md hover:bg-brand-primary/90"
                onClick={startAnalysis}
                disabled={!confluenceLink || !featureName}
              >
                Start Analysis
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      {isAnalyzing && (
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={section.name} className="relative">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold">{section.name}</h2>
                <div className="flex items-center gap-2">
                  {getStatusBadge(section.status)}
                  {(section.status === 'COMPLETE' || section.status === 'UPDATED') && (
                    <Button
                      variant="brand-secondary"
                      size="small"
                      icon={section.isEditing ? 'FeatherSave' : 'FeatherEdit'}
                      onClick={() => section.isEditing ? handleSave(index) : toggleEdit(index)}
                    >
                      {section.isEditing ? 'Save' : 'Edit'}
                    </Button>
                  )}
                </div>
              </div>

              <div className={section.isEditing ? 'opacity-50' : ''}>
                {index === 0 && (
                  <SystemDescription
                    typingSpeed={section.status === 'GENERATING' ? 5 : 0}
                    onComplete={section.status === 'GENERATING' ? () => onSectionComplete(0) : undefined}
                  />
                )}
                {index === 1 && sectionProgress[0] && (
                  <DataAnalysis
                    typingSpeed={section.status === 'GENERATING' ? 400 : 0}
                    onComplete={section.status === 'GENERATING' ? () => onSectionComplete(1) : undefined}
                  />
                )}
                {index === 2 && sectionProgress[1] && <DataflowsTable typingSpeed={400} onComplete={() => onSectionComplete(2)} />}
                {index === 3 && sectionProgress[2] && <ThreatsAnalysis typingSpeed={400} onComplete={() => onSectionComplete(3)} />}
                {index === 4 && sectionProgress[3] && <SeverityAssessment typingSpeed={400} onComplete={() => onSectionComplete(4)} />}
                {index === 5 && sectionProgress[4] && <MitigationProposals typingSpeed={400} onComplete={() => onSectionComplete(5)} />}
                {index === 6 && sectionProgress[5] && <References typingSpeed={400} onComplete={() => onSectionComplete(6)} />}
              </div>

              {section.isEditing && editContent && (
                <div className="absolute inset-0 bg-white p-4">
                  {renderEditContent(editContent)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

