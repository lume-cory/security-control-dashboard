"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Dataflow {
  name: string;
  source: string;
  destination: string;
  type: string;
  protocol: string;
  port: number | string;
}

interface ComponentProps {
  typingSpeed?: number;
  onComplete?: () => void;
}

export const fullDataflows = [
  {
    name: "Camera Feed Ingestion",
    source: "IoT Cameras",
    destination: "Video Ingestion Service",
    type: "Video Stream",
    protocol: "RTSP",
    port: 554,
  },
  {
    name: "Image Upload",
    source: "User Interface",
    destination: "Computer Vision Engine",
    type: "Image File",
    protocol: "HTTPS",
    port: 443,
  },
  {
    name: "Video Analysis",
    source: "Video Ingestion Service",
    destination: "Computer Vision Engine",
    type: "Processed Video Data",
    protocol: "Internal",
    port: "N/A",
  },
  {
    name: "Vehicle Tracking",
    source: "Computer Vision Engine",
    destination: "Vehicle Tracking Module",
    type: "Metadata",
    protocol: "Internal",
    port: "N/A",
  },
  {
    name: "Data Storage",
    source: "Vehicle Tracking Module",
    destination: "Data Storage",
    type: "Structured Data",
    protocol: "Internal",
    port: "N/A",
  },
  {
    name: "API Requests",
    source: "User Interface",
    destination: "API Layer",
    type: "JSON",
    protocol: "HTTPS",
    port: 443,
  },
  {
    name: "Data Retrieval",
    source: "API Layer",
    destination: "Data Storage",
    type: "Query/Response",
    protocol: "Internal",
    port: "N/A",
  },
]

export default function DataflowsTable({ typingSpeed = 20, onComplete }: ComponentProps) {
  const [dataflows, setDataflows] = useState<Dataflow[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      if (dataflows.length < fullDataflows.length) {
        setDataflows((prevDataflows) => [...prevDataflows, fullDataflows[prevDataflows.length]])
      } else {
        clearInterval(interval)
        onComplete?.()
      }
    }, typingSpeed)

    return () => clearInterval(interval)
  }, [dataflows])

  return (
    <div className="mb-6">
      <p className="text-md font-bold mb-2">Include or describe a Level 0 Data Flow Diagram &#40;DFD&#41; for the system</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Protocol</TableHead>
            <TableHead>Port</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataflows.map((flow, index) => (
            <TableRow key={index}>
              <TableCell>{flow.name}</TableCell>
              <TableCell>{flow.source}</TableCell>
              <TableCell>{flow.destination}</TableCell>
              <TableCell>{flow.type}</TableCell>
              <TableCell>{flow.protocol}</TableCell>
              <TableCell>{flow.port}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

