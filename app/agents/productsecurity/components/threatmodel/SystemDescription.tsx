"use client"

import { useState, useEffect } from "react"

interface SystemDescriptionProps {
  typingSpeed?: number;
  onComplete?: () => void;
}

export const fullDescription = `The system is an advanced video content analysis application designed for a city government's IoT camera network. It processes video feeds from cameras installed throughout the city to identify and track vehicles based on characteristics from uploaded images.

Key components of the system include:
1. IoT Camera Network: Distributed across the city, capturing real-time video footage.
2. Video Ingestion Service: Receives and processes incoming video streams from the IoT cameras.
3. Image Upload Interface: Allows users to upload reference images of vehicles.
4. Computer Vision Engine: Analyzes video content and compares it with uploaded images.
5. Vehicle Tracking Module: Identifies and tracks vehicles matching the specified characteristics.
6. Data Storage: Stores processed video data, vehicle information, and tracking results.
7. User Interface: Provides access to search, view results, and manage the system.
8. API Layer: Enables integration with other city systems and services.

The system aims to enhance public safety, traffic management, and law enforcement capabilities by providing real-time vehicle location and tracking information based on specific criteria.`

export default function SystemDescription({ typingSpeed = 20, onComplete }: SystemDescriptionProps) {
  const [description, setDescription] = useState("")

  useEffect(() => {
    let currentText = ""
    const interval = setInterval(() => {
      if (currentText.length < fullDescription.length) {
        currentText += fullDescription[currentText.length]
        setDescription(currentText)
      } else {
        clearInterval(interval)
        onComplete?.()
      }
    }, typingSpeed)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mb-6">
      <p className="text-md font-bold mb-2">Provide a detailed description of the system</p>
      <p className="whitespace-pre-wrap">{description}</p>
    </div>
  )
}

