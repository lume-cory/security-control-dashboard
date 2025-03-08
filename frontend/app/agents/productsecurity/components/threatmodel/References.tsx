"use client"

import { useState, useEffect } from "react"

interface ComponentProps {
  typingSpeed?: number;
  onComplete?: () => void;
}

export const fullReferences = [
  { url: "https://owasp.org/www-project-internet-of-things/", name: "OWASP Top 10 for IoT" },
  { url: "https://www.nist.gov/publications/nist-special-publication-800-53-security-and-privacy-controls-information-systems-and-organizations", name: "NIST Special Publication 800-53" },
  { url: "https://www.iso.org/standard/61410.html", name: "ISO/IEC 27001:2013 Information Security Management Systems" },
  { url: "https://gdpr.eu/", name: "GDPR (General Data Protection Regulation)" },
  { url: "https://www.ccpa.ca.gov/", name: "CCPA (California Consumer Privacy Act)" },
  { url: "https://www.cisa.gov/cybersecurity-best-practices-for-iot-devices", name: "CISA Cybersecurity Best Practices for IoT Devices" },
  { url: "https://ieeexplore.ieee.org/document/9216219", name: "IEEE IoT Security Standards" },
]

export default function References({ typingSpeed = 20, onComplete }: ComponentProps) {
  const [references, setReferences] = useState<typeof fullReferences>([])

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
            <a href={reference.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              {reference.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

