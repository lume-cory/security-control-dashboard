'use client'

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft } from "lucide-react"
import { useState } from "react"
import { enrichedHippaArticles } from "./hippa-detail-view"

interface ArticleDetailViewProps {
  article: typeof enrichedHippaArticles[0]
  onClose: () => void
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  article,
  onClose,
}) => {
  const [followUpNotes, setFollowUpNotes] = useState("")

  const handleFollowUp = (teamContact: string) => {
    // Implement follow-up logic here
    console.log(`Following up with ${teamContact}`, followUpNotes)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
          className="hover:bg-transparent p-0"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold">{article.name}</h2>
          <p className="text-sm text-gray-500">Article ID: {article.id}</p>
        </div>
      </div>

      {/* Non-compliant Instances */}
      {article.nonCompliantInstances.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-red-600">Non-Compliant Instances</h3>
          {article.nonCompliantInstances.map((instance, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <h4 className="font-semibold">{instance.system.name}</h4>
                <span className="text-sm text-gray-500">{instance.system.team}</span>
              </div>
              <p className="text-sm text-gray-700">{instance.issue}</p>
              <div className="space-y-2">
                <p className="text-sm"><strong>Mitigation:</strong> {instance.mitigation}</p>
                <p className="text-sm"><strong>Status:</strong> {instance.status}</p>
                <p className="text-sm"><strong>Due Date:</strong> {instance.dueDate}</p>
              </div>
              <Textarea
                placeholder="Add notes for follow-up..."
                value={followUpNotes}
                onChange={(e) => setFollowUpNotes(e.target.value)}
                className="mt-2"
              />
              <Button 
                onClick={() => handleFollowUp(instance.system.teamContact)}
                className="mt-2"
              >
                Follow Up with Team
              </Button>
            </div>
          ))}
        </div>
      )}

        {/* Article Description */}
        <div>
          <h3 className="text-xl font-semibold">Description</h3>
          <p className="text-gray-700 mt-2">{article.text}</p>
        </div>

        {/* Company Policies */}
        <div>
          <h3 className="text-xl font-semibold">Company Policies</h3>
          <div className="space-y-4 mt-2">
            {article.policies.map((policy, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h4 className="font-semibold">{policy.name}</h4>
                <p className="text-sm text-gray-700 mt-1">{policy.description}</p>
                <a 
                  href={policy.link}
                  className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Policy Document
                </a>
              </div>
            ))}
          </div>
        </div>

      {/* Impacted Systems */}
      <div>
        <h3 className="text-xl font-semibold">Impacted Systems</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {article.impactedSystems.map((system, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h4 className="font-semibold">{system.name}</h4>
              <p className="text-sm text-gray-500">{system.type}</p>
              <p className="text-sm text-gray-700 mt-1">{system.repository}</p>
              <p className="text-sm text-gray-700">Owned by: {system.team}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 