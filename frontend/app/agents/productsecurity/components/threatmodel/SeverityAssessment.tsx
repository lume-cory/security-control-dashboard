"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Assessment {
  threat: string;
  severity: string;
  reasoning: string;
}

interface ComponentProps {
  typingSpeed?: number;
  onComplete?: () => void;
}

export const fullAssessments = [
  {
    threat: "Fake camera feeds injection",
    severity: "High",
    reasoning: "Could lead to false vehicle tracking and compromised decision-making",
  },
  {
    threat: "Manipulation of stored vehicle data",
    severity: "High",
    reasoning: "May result in inaccurate historical data and flawed analytics",
  },
  {
    threat: "Unauthorized changes to tracking logs",
    severity: "Medium",
    reasoning: "Could impede accountability and audit trails",
  },
  {
    threat: "Leakage of sensitive vehicle location data",
    severity: "Critical",
    reasoning: "Violates privacy laws and could lead to misuse of information",
  },
  {
    threat: "Overwhelming the video ingestion service",
    severity: "High",
    reasoning: "May cause system-wide disruption and loss of real-time tracking capabilities",
  },
  {
    threat: "Unauthorized access to admin functions",
    severity: "Critical",
    reasoning: "Could lead to complete system compromise and data manipulation",
  },
]

export default function SeverityAssessment({ typingSpeed = 20, onComplete }: ComponentProps) {
  const [assessments, setAssessments] = useState<Assessment[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      if (assessments.length < fullAssessments.length) {
        setAssessments((prevAssessments) => [...prevAssessments, fullAssessments[prevAssessments.length]])
        setAssessments((prevAssessments) => [...prevAssessments, fullAssessments[prevAssessments.length]])
      } else {
        clearInterval(interval)
        onComplete?.()
      }
    }, typingSpeed)

    return () => clearInterval(interval)
  }, [assessments])

  return (
    <div className="mb-6">
      <p className="text-md font-bold mb-2">Access the severity of each identified threat</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Threat</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Reasoning</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assessments.map((assessment, index) => (
            <TableRow key={index}>
              <TableCell>{assessment.threat}</TableCell>
              <TableCell>{assessment.severity}</TableCell>
              <TableCell>{assessment.reasoning}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

