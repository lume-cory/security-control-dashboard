"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Threat {
  category: string;
  threat: string;
}

interface ComponentProps {
  typingSpeed?: number;
  onComplete?: () => void;
}

export const fullThreats = [
  { category: "Spoofing", threat: "Fake camera feeds injection" },
  { category: "Tampering", threat: "Manipulation of stored vehicle data" },
  { category: "Repudiation", threat: "Unauthorized changes to tracking logs" },
  { category: "Information Disclosure", threat: "Leakage of sensitive vehicle location data" },
  { category: "Denial of Service", threat: "Overwhelming the video ingestion service" },
  { category: "Elevation of Privilege", threat: "Unauthorized access to admin functions" },
]

export default function ThreatsAnalysis({ typingSpeed = 20, onComplete }: ComponentProps) {
  const [threats, setThreats] = useState<Threat[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      if (threats.length < fullThreats.length) {
        setThreats((prevThreats) => [...prevThreats, fullThreats[prevThreats.length]])
      } else {
        clearInterval(interval)
        onComplete?.()
      }
    }, typingSpeed)

    return () => clearInterval(interval)
  }, [threats])

  return (
    <div className="mb-6">
      <p className="text-md font-bold mb-2">List the threats identified in the system based on the STRIDE model</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Threat</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {threats.map((threat, index) => (
            <TableRow key={index}>
              <TableCell>{threat.category}</TableCell>
              <TableCell>{threat.threat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

