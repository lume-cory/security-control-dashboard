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


  // Mock data for previous chats
  // New mock data for chatbot
const previousChats = [
    {
      id: "1",
      question: "What authentication mechanisms should we implement for our new API endpoints?",
      title: "API Authentication Design",
      timestamp: new Date(Date.now() + (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      conversation: [
        { role: "user", content: "What authentication mechanisms should we implement for our new API endpoints?" },
        { role: "assistant", content: "For our API endpoints, we recommend implementing multiple layers of authentication:\n\n1. OAuth 2.0 with JWT tokens for primary authentication\n2. API keys for service-to-service communication\n3. Mutual TLS (mTLS) for critical infrastructure endpoints\n\nAdditionally, ensure:\n- Token expiration < 1 hour\n- Refresh tokens with rotation\n- Rate limiting per API key\n- Request signing for high-security endpoints" },
        { role: "user", content: "Should we use session-based or token-based auth for the web interface?" },
        { role: "assistant", content: "For our web interface, token-based authentication (JWT) is recommended because:\n\n1. It's stateless and scales better\n2. Works well with our microservices architecture\n3. Supports our mobile apps and API consumers\n\nImplement with:\n- HttpOnly cookies for XSS protection\n- CSRF tokens for forms\n- Secure & SameSite cookie flags\n- Regular token rotation" }
      ]
    },
    {
      id: "2",
      question: "How should we handle secrets management in our Kubernetes deployment?",
      title: "Secrets Management",
      timestamp: new Date(Date.now() + (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      conversation: [
        { role: "user", content: "How should we handle secrets management in our Kubernetes deployment?" },
        { role: "assistant", content: "For Kubernetes secrets management, implement the following:\n\n1. Use HashiCorp Vault as the primary secrets store\n2. Implement the Vault Injector sidecar pattern\n3. Enable encryption-at-rest for etcd\n4. Use RBAC to restrict secrets access\n\nAvoid:\n- Storing secrets in ConfigMaps\n- Hardcoding secrets in Docker images\n- Using plain text secrets in deployment YAML" },
        { role: "user", content: "What about secret rotation?" },
        { role: "assistant", content: "Implement automated secret rotation using:\n\n1. Vault's dynamic secrets for database credentials\n2. Automated certificate rotation with cert-manager\n3. Regular rotation schedule:\n   - Database credentials: 30 days\n   - API keys: 90 days\n   - TLS certificates: 90 days\n\nEnsure applications can handle secret rotation without downtime using:\n- Graceful reload mechanisms\n- Overlap periods for credential validity\n- Health checks for secret updates" }
      ]
    },
    {
      id: "3",
      question: "What security considerations should we have for our new data pipeline?",
      title: "Data Pipeline Security",
      timestamp: new Date(Date.now() + (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      conversation: [
        { role: "user", content: "What security considerations should we have for our new data pipeline?" },
        { role: "assistant", content: "Key security considerations for the data pipeline:\n\n1. Data in Transit:\n   - TLS 1.3 for all connections\n   - Field-level encryption for PII\n   - Secure file transfer protocols (SFTP/FTPS)\n\n2. Data at Rest:\n   - KMS encryption for stored data\n   - Separate encryption keys per environment\n   - Regular key rotation\n\n3. Access Control:\n   - Service account principle of least privilege\n   - Network isolation using VPC\n   - Data access audit logging" },
        { role: "user", content: "How should we handle PII data processing?" },
        { role: "assistant", content: "For PII data processing:\n\n1. Data Classification:\n   - Tag PII fields in schema\n   - Implement data tokenization\n   - Use separate processing pipeline for PII\n\n2. Security Controls:\n   - Field-level encryption\n   - Data masking for non-prod environments\n   - Audit logging of all PII access\n\n3. Compliance:\n   - Implement retention policies\n   - Enable data deletion workflows\n   - Maintain processing audit trail" }
      ]
    },
    {
      id: "4",
      question: "What are the security requirements for our new microservices architecture?",
      title: "Microservices Security",
      timestamp: new Date(Date.now() + (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      conversation: [
        { role: "user", content: "What are the security requirements for our new microservices architecture?" },
        { role: "assistant", content: "Essential security requirements for microservices:\n\n1. Service-to-Service Communication:\n   - Mutual TLS authentication\n   - Service mesh (Istio) for security policies\n   - Zero-trust network policies\n\n2. Authentication/Authorization:\n   - Centralized identity management\n   - JWT token validation at gateway\n   - Service-specific RBAC\n\n3. Monitoring:\n   - Distributed tracing\n   - Centralized logging\n   - Security event monitoring" },
        { role: "user", content: "Should we implement a service mesh?" },
        { role: "assistant", content: "Yes, implementing a service mesh (Istio) is recommended for:\n\n1. Security Benefits:\n   - Automatic mTLS between services\n   - Fine-grained access policies\n   - Traffic encryption\n\n2. Operational Benefits:\n   - Circuit breaking\n   - Load balancing\n   - Traffic monitoring\n\n3. Implementation Approach:\n   - Start with critical services\n   - Use secure-by-default policies\n   - Implement gradual rollout" }
      ]
    },
    {
      id: "5",
      question: "What security testing should we include in our CI/CD pipeline?",
      title: "Security Testing",
      timestamp: new Date(Date.now() + (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      conversation: [
        { role: "user", content: "What security testing should we include in our CI/CD pipeline?" },
        { role: "assistant", content: "Implement these security tests in CI/CD:\n\n1. Static Analysis:\n   - SonarQube for code quality\n   - Snyk for dependency scanning\n   - Custom security rules\n\n2. Dynamic Testing:\n   - OWASP ZAP automated scans\n   - API security testing\n   - Container image scanning\n\n3. Infrastructure Tests:\n   - Terraform plan validation\n   - Policy compliance checks\n   - Secret detection scans" },
        { role: "user", content: "How should we handle security findings?" },
        { role: "assistant", content: "Handle security findings with:\n\n1. Severity-based Approach:\n   - Critical/High: Block deployment\n   - Medium: Require review\n   - Low: Track in backlog\n\n2. Remediation Process:\n   - Automated tickets creation\n   - SLA based on severity\n   - Required security sign-off\n\n3. Monitoring:\n   - Track security debt\n   - Regular vulnerability reports\n   - Compliance dashboards" }
      ]
    }
  ]

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