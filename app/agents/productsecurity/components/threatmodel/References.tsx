"use client"

import { useState, useEffect } from "react"

interface ComponentProps {
  typingSpeed?: number;
  onComplete?: () => void;
}

export const fullReferences = [
  "OWASP Top 10 for IoT: https://owasp.org/www-project-internet-of-things/",
  "NIST Special Publication 800-53: Security and Privacy Controls for Information Systems and Organizations",
  "ISO/IEC 27001:2013 Information Security Management Systems",
  "GDPR (General Data Protection Regulation) for handling personal data",
  "CCPA (California Consumer Privacy Act) for data privacy",
  "CISA Cybersecurity Best Practices for IoT Devices",
  "IEEE IoT Security Standards",
]

export default function References({ typingSpeed = 20, onComplete }: ComponentProps) {
  const [references, setReferences] = useState<string[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      if (references.length < fullReferences.length) {
        setReferences((prevReferences) => [...prevReferences, fullReferences[prevReferences.length]])
      } else {
        clearInterval(interval)
        onComplete?.()
      }
    }, typingSpeed)

    return () => clearInterval(interval)
  }, [references])

  return (
    <div className="mb-6">
      <p className="text-md font-bold mb-2">List any references and additional resources related to the threat and mitigations</p>
      <ul className="list-disc pl-5">
        {references.map((reference, index) => (
          <li key={index} className="mb-2">
            {reference}
          </li>
        ))}
      </ul>
    </div>
  )
}

