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
import { Spinner } from "../ui/Spinner"

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

type AnalysisStep = {
    id: string;
    label: string;
    status: 'pending' | 'active' | 'complete';
}

export default function ThreatModelAssistant({ typingSpeed = 2000 }: ComponentProps) {
  const [confluenceLink, setConfluenceLink] = useState("")
  const [featureName, setFeatureName] = useState("")
  const [repositoryUrl, setRepositoryUrl] = useState("")
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
  const [showTemplate, setShowTemplate] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [isFullyComplete, setIsFullyComplete] = useState(false)

  const analysisSteps: AnalysisStep[] = [
    { id: 'design', label: 'Interrogating design doc', status: 'pending' },
    { id: 'code', label: 'Parsing code repo', status: 'complete' },
    { id: 'model', label: 'Constructing initial threat model', status: 'pending' }
  ]

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
    setCurrentStep(0)

    // Simulate AI processing steps first
    const stepDuration = 2000 // 2 seconds per step
    analysisSteps.forEach((_, index) => {
        setTimeout(() => {
            setCurrentStep(index)
        }, index * stepDuration)
    })

    // After analysis steps, start section generation
    setTimeout(() => {
        setShowTemplate(true)
        
        // Initialize first section
        setSections(prev => prev.map((section, idx) => ({
            ...section,
            status: idx === 0 ? 'GENERATING' : 'PENDING'
        })))

        // Calculate total duration for all sections
        const totalDuration = sections.reduce((acc, _, i) => {
            const contentLength = getSectionContent(i)?.content?.length || 0
            return acc + Math.max(typingSpeed, contentLength * 30) + 1000
        }, 0)

        // Start the section progression
        sections.forEach((_, index) => {
            // Calculate delays based on content length
            const contentLength = getSectionContent(index)?.content?.length || 0
            const revealDuration = Math.max(typingSpeed, contentLength * 30) // 30ms per character minimum
            const sectionDelay = index === 0 ? 0 : 
                sections.slice(0, index).reduce((acc, _, i) => {
                    const prevContentLength = getSectionContent(i)?.content?.length || 0
                    return acc + Math.max(typingSpeed, prevContentLength * 30) + 1000
                }, 0)
            
            setTimeout(() => {
                setProgress((index + 1) * (100 / sections.length))
                setCurrentSection(sections[index].name)
                
                if (index > 0) {
                    setSections(prev => prev.map((section, idx) => ({
                        ...section,
                        status: idx === index ? 'GENERATING' : 
                                idx < index ? 'COMPLETE' : 'PENDING'
                    })))
                }
            }, sectionDelay)
            
            // Mark section as complete after its content is fully revealed
            setTimeout(() => {
                onSectionComplete(index)
            }, sectionDelay + revealDuration)
        })
    }, analysisSteps.length * stepDuration)
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
        // Set next section to Generating if it exists
        if (idx === index + 1) {
            return { ...section, status: 'GENERATING' }
        }
        return section
    }))

    // If this was the last section, mark as fully complete
    if (index === sections.length - 1) {
        setIsFullyComplete(true)
    }
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

  const getStepStatus = (index: number) => {
    if (index < currentStep) return 'complete'
    if (index === currentStep) return 'active'
    return 'pending'
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Threat Model Analysis</CardTitle>
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
            <div>
              <label className="text-sm font-medium">Repository URL</label>
              <Input
                value={repositoryUrl}
                onChange={(e) => setRepositoryUrl(e.target.value)}
                placeholder="https://github.com/acme/vehicle-detection"
                className="mt-1"
              />
            </div>
            {!showTemplate && (
              <Button
                variant="brand-primary"
                onClick={startAnalysis}
                disabled={isAnalyzing}
              >
                Start Analysis
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {isAnalyzing && !isFullyComplete && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Spinner className="h-5 w-5" />
              AI Analysis in Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analysisSteps.map((step, index) => (
                <div 
                  key={step.id}
                  className="flex items-center gap-3"
                >
                  {getStepStatus(index) === 'complete' ? (
                    <Badge variant="success">✓</Badge>
                  ) : getStepStatus(index) === 'active' ? (
                    <Spinner className="h-4 w-4" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border" />
                  )}
                  <span className={
                    getStepStatus(index) === 'complete' 
                      ? 'text-muted-foreground line-through' 
                      : getStepStatus(index) === 'active'
                      ? 'font-medium'
                      : ''
                  }>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {showTemplate && (
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

