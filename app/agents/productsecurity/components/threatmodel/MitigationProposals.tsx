"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Mitigation {
  threat: string;
  mitigation: string;
}

interface ComponentProps {
  typingSpeed?: number;
  onComplete?: () => void;
}

export const fullMitigations = [
  {
    threat: "Fake camera feeds injection",
    mitigation: "Implement strong authentication for IoT cameras and use digital signatures for video streams",
  },
  {
    threat: "Manipulation of stored vehicle data",
    mitigation:
      "Use encryption at rest, implement strict access controls, and maintain audit logs for all data modifications",
  },
  {
    threat: "Unauthorized changes to tracking logs",
    mitigation: "Implement immutable logging and use blockchain technology for tamper-evident record-keeping",
  },
  {
    threat: "Leakage of sensitive vehicle location data",
    mitigation: "Enforce end-to-end encryption, implement data masking, and establish strict data access policies",
  },
  {
    threat: "Overwhelming the video ingestion service",
    mitigation: "Implement rate limiting, use load balancers, and set up auto-scaling for the ingestion service",
  },
  {
    threat: "Unauthorized access to admin functions",
    mitigation:
      "Enforce multi-factor authentication, implement least privilege access, and regularly audit admin accounts",
  },
]

export default function MitigationProposals({ typingSpeed = 20, onComplete }: ComponentProps) {
  const [mitigations, setMitigations] = useState<Mitigation[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      if (mitigations.length < fullMitigations.length) {
        setMitigations((prevMitigations) => [...prevMitigations, fullMitigations[prevMitigations.length]])
      } else {
        clearInterval(interval)
        onComplete?.()
      }
    }, typingSpeed)

    return () => clearInterval(interval)
  }, [mitigations])

  return (
    <div className="mb-6">
      <p className="text-md font-bold mb-2">Propose mitigations for each identified threat</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Threat</TableHead>
            <TableHead>Mitigation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mitigations.map((mitigation, index) => (
            <TableRow key={index}>
              <TableCell>{mitigation.threat}</TableCell>
              <TableCell>{mitigation.mitigation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

