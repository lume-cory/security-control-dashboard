'use client'

import { useState } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Plus } from "lucide-react"
import { Button } from "@/subframe/components/Button"
import { cn } from "@/lib/utils"
import { Input } from '@/components/ui/input'

interface Chat {
  id: string
  title: string
  timestamp: string
  preview?: string
  question: string
  conversation: Array<{
    role: string;
    content: string;
  }>;
}

export function ChatDrawer() {
  const [open, setOpen] = useState(false)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [newMessage, setNewMessage] = useState("")

  // Update the chat examples in ChatDrawer.tsx
  const [previousChats] = useState<Chat[]>([
    {
      id: "1",
      question: "What are AWS's current SOC 2 compliance gaps and remediation timeline?",
      title: "AWS SOC 2 Compliance Status",
      timestamp: new Date(Date.now() - (2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      conversation: [
        { role: "user", content: "What are AWS's current SOC 2 compliance gaps and remediation timeline?" },
        { role: "assistant", content: "Based on AWS's latest assessment:\n\n1. Current Gaps:\n   - Access review documentation incomplete\n   - Encryption key rotation policy needs updating\n   - Incident response testing documentation insufficient\n\n2. Remediation Status:\n   - Access review: 80% complete, due Mar 15\n   - Encryption policy: In review, due Apr 1\n   - IR testing: Scheduled for Mar 20\n\n3. Impact:\n   - No critical security issues\n   - Compensating controls in place\n   - Monthly progress tracking established" },
        { role: "user", content: "Are there any blockers for the remediation plan?" },
        { role: "assistant", content: "Current remediation blockers:\n\n1. Access Review:\n   - Waiting on third-party system integration\n   - Expected resolution: Mar 10\n\n2. Encryption Policy:\n   - Legal team review pending\n   - No major concerns identified\n\n3. IR Testing:\n   - Resources allocated\n   - No current blockers\n\nOverall timeline remains on track for Q2 completion." }
      ]
    },
    {
      id: "2",
      question: "What data residency requirements does Snowflake meet for EU customer data?",
      title: "Snowflake EU Data Residency",
      timestamp: new Date(Date.now() - (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      conversation: [
        { role: "user", content: "What data residency requirements does Snowflake meet for EU customer data?" },
        { role: "assistant", content: "Snowflake's EU data residency compliance:\n\n1. Infrastructure:\n   - Primary EU data centers in Germany, Netherlands\n   - Backup locations within EU borders\n   - No data transfer outside EU without explicit consent\n\n2. Certifications:\n   - ISO 27701 for data privacy\n   - GDPR compliance validated\n   - BSI C5 attestation\n\n3. Controls:\n   - Data location pinning\n   - Geographic access restrictions\n   - Audit logging for cross-border requests" },
        { role: "user", content: "Do they have specific controls for UK data post-Brexit?" },
        { role: "assistant", content: "Snowflake's UK-specific controls:\n\n1. UK Data Protection:\n   - Dedicated UK region in London\n   - UK-specific DPA available\n   - ICO registration maintained\n\n2. Transfer Mechanisms:\n   - UK-approved SCCs implemented\n   - UK GDPR compliance validated\n   - Impact assessment documentation available\n\n3. Additional Measures:\n   - UK-specific support team\n   - Local data sovereignty guarantees\n   - Regular UK compliance audits" }
      ]
    },
    {
      id: "3",
      question: "What's Okta's incident response time for critical security events?",
      title: "Okta Security Response SLA",
      timestamp: new Date(Date.now() - (3 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      conversation: [
        { role: "user", content: "What's Okta's incident response time for critical security events?" },
        { role: "assistant", content: "Okta's incident response SLAs:\n\n1. Critical Events (P1):\n   - Initial response: 15 minutes\n   - Status updates: Every 30 minutes\n   - Resolution target: 4 hours\n\n2. Security Team Structure:\n   - 24/7 SOC coverage\n   - Follow-the-sun model\n   - Dedicated incident managers\n\n3. Communication Channels:\n   - Status page updates\n   - Direct customer notification\n   - Incident bridge availability" },
        { role: "user", content: "Can you show their historical performance against these SLAs?" },
        { role: "assistant", content: "Okta's SLA performance (last 12 months):\n\n1. Response Time Metrics:\n   - Average initial response: 12 minutes\n   - SLA met: 99.1% of incidents\n   - Mean time to resolution: 3.2 hours\n\n2. Notable Incidents:\n   - March 2024: Authentication delay (3.5 hours)\n   - January 2024: API latency (2.8 hours)\n   - November 2023: MFA sync issue (3.9 hours)\n\n3. Improvement Trends:\n   - 15% faster response time YoY\n   - Reduced repeat incidents by 40%\n   - Enhanced automated detection" }
      ]
    },
    {
      id: "4",
      question: "What encryption standards does Snowflake use for data at rest and in transit?",
      title: "Snowflake Encryption Standards",
      timestamp: new Date(Date.now() - (4 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      conversation: [
        { role: "user", content: "What encryption standards does Snowflake use for data at rest and in transit?" },
        { role: "assistant", content: "Snowflake's encryption implementation:\n\n1. Data at Rest:\n   - AES 256-bit encryption\n   - Automatic key rotation every 30 days\n   - BYOK support with AWS KMS\n\n2. Data in Transit:\n   - TLS 1.2+ required\n   - Perfect Forward Secrecy\n   - Strong cipher suites only\n\n3. Key Management:\n   - HSM protection for master keys\n   - Hierarchical key model\n   - Automated key lifecycle" },
        { role: "user", content: "Do they support customer-managed keys?" },
        { role: "assistant", content: "Snowflake's customer key management options:\n\n1. BYOK Capabilities:\n   - AWS KMS integration\n   - Azure Key Vault support\n   - GCP Cloud KMS compatible\n\n2. Key Rotation Options:\n   - Customer-controlled rotation\n   - Automated rotation support\n   - Emergency key revocation\n\n3. Implementation Requirements:\n   - IAM role configuration\n   - Key policy documentation\n   - Monitoring setup guide\n\nRefer to: docs.snowflake.com/security/key-management" }
      ]
    },
    {
      id: "5",
      question: "What's AWS's compliance status with NIST 800-53 controls?",
      title: "AWS NIST Compliance",
      timestamp: new Date(Date.now() - (5 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      conversation: [
        { role: "user", content: "What's AWS's compliance status with NIST 800-53 controls?" },
        { role: "assistant", content: "AWS NIST 800-53 compliance status:\n\n1. Control Implementation:\n   - 325/350 controls fully implemented\n   - 15 controls partially implemented\n   - 10 controls with compensating controls\n\n2. Recent Updates:\n   - Rev 5 assessment completed\n   - FedRAMP High authorization\n   - DoD IL5 certification\n\n3. Gap Analysis:\n   - SC-28: Enhanced crypto needed\n   - AC-25: Review in progress\n   - SI-7: Compensating controls" },
        { role: "user", content: "Which controls are still pending implementation?" },
        { role: "assistant", content: "Pending NIST controls for AWS:\n\n1. In Progress:\n   - SC-28 (Enhanced Encryption)\n     * Implementation: 70% complete\n     * Due: Q2 2024\n\n2. Partially Implemented:\n   - AC-25 (Reference Monitor)\n     * Technical review phase\n     * Architecture updates needed\n\n3. Compensating Controls:\n   - SI-7 (Software Integrity)\n     * Alternative solutions documented\n     * Agency approvals received" }
      ]
    }
  ]);

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat)
  }

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    let updatedChat
    if (selectedChat) {
      updatedChat = {
        ...selectedChat,
        conversation: [
          ...selectedChat.conversation,
          { role: "user", content: newMessage },
          { role: "assistant", content: "I'm processing your request. Please wait for a moment..." } // Placeholder response
        ]
      }
    } else {
      updatedChat = {
        id: String(previousChats.length + 1),
        question: newMessage,
        title: "New Conversation",
        timestamp: new Date().toISOString().split('T')[0],
        conversation: [
          { role: "user", content: newMessage },
          { role: "assistant", content: "I'm processing your request. Please wait for a moment..." }
        ]
      }
      previousChats.unshift(updatedChat)
    }
    
    setSelectedChat(updatedChat)
    setNewMessage("")

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse = "This is a simulated AI response. In a real implementation, this would be generated by an AI model based on the user's input and the conversation context."
      const finalUpdatedChat = {
        ...updatedChat,
        conversation: [
          ...updatedChat.conversation.slice(0, -1),
          { role: "assistant", content: aiResponse }
        ]
      }
      setSelectedChat(finalUpdatedChat)
      if (!selectedChat) {
        previousChats[0] = finalUpdatedChat
      }
    }, 1000)
  }


  return (
    <>
      <Button
        variant="brand-primary"
        size="large"
        icon="FeatherMessageSquare"
        className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg"
        onClick={() => setIsChatbotOpen(true)}
      />

      {/* AI Chatbot Drawer */}
      <Sheet open={isChatbotOpen} onOpenChange={setIsChatbotOpen}>
        <SheetContent style={{ maxWidth: 'min(33vw, 1200px)' }} className="w-full overflow-hidden" side="right">
          <SheetHeader>
            <SheetTitle>Security Review Assistant</SheetTitle>
            <SheetDescription>Ask questions about security policies and compliance</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col mt-4 h-[calc(100vh-200px)]">
            {selectedChat ? (
              <>
                <Button 
                  size="medium"
                  variant="brand-secondary" 
                  className="self-start mb-4" 
                  icon="FeatherArrowLeft"
                  onClick={() => setSelectedChat(null)}
                >
                 Back to Questions
                </Button>
                <ScrollArea className="flex-grow mb-4">
                  {selectedChat.conversation.map((message, index) => (
                    <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                      <div className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                        {message.content}
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </>
            ) : (
              <ScrollArea className="flex-grow mb-4">
                <h3 className="font-semibold mb-2">Recent Questions</h3>
                {previousChats.map((chat) => (
                  <div
                    key={chat.id}
                    className="p-4 mb-3 rounded cursor-pointer hover:bg-gray-100 border border-gray-200"
                    onClick={() => handleChatSelect(chat)}
                  >
                    <div className="font-medium mb-1">{chat.title}</div>
                    <div className="text-sm text-gray-600 mb-2">{chat.question}</div>
                    <div className="text-xs text-gray-400">{chat.timestamp}</div>
                  </div>
                ))}
              </ScrollArea>
            )}
            <div className="flex">
              <Input
                value={newMessage}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
                placeholder={selectedChat ? "Type your message here..." : "Start a new thread..."}
                className="flex-grow mr-2"
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button 
                variant="brand-primary"
                icon="FeatherArrowUp"
                onClick={handleSendMessage}
              >
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
} 