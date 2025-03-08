"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface DataItem {
  type: string;
  description: string;
  sensitivity: string;
}

interface ComponentProps {
  typingSpeed?: number;
  onComplete?: () => void;
}

export const fullData = [
  { type: "Input", description: "Video feeds from IoT cameras", sensitivity: "High" },
  { type: "Input", description: "Uploaded vehicle images", sensitivity: "Medium" },
  { type: "Created", description: "Processed video metadata", sensitivity: "Medium" },
  { type: "Created", description: "Vehicle location data", sensitivity: "High" },
  { type: "Created", description: "Vehicle tracking logs", sensitivity: "High" },
  { type: "Output", description: "Vehicle location reports", sensitivity: "High" },
  { type: "Output", description: "Real-time alerts", sensitivity: "High" },
]

export default function DataAnalysis({ typingSpeed = 20, onComplete }: ComponentProps) {
  const [data, setData] = useState<DataItem[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      if (data.length < fullData.length) {
        setData((prevData) => [...prevData, fullData[prevData.length]])
      } else {
        clearInterval(interval)
        onComplete?.()
      }
    }, typingSpeed)

    return () => clearInterval(interval)
  }, [data])

  return (
    <div className="mb-6">
      <p className="text-md font-bold mb-2">Provide a detailed list of the data input and output for the system</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Sensitivity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.sensitivity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

