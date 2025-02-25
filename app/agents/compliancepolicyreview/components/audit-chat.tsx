import { useState } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/subframe/components/Button"
import { Input } from '@/components/ui/input'
import { auditChatHistory, type AuditChat } from '../data/audit-chat-history'

export function AuditChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedChat, setSelectedChat] = useState<AuditChat | null>(null)
  const [newMessage, setNewMessage] = useState("")

  const handleChatSelect = (chat: AuditChat) => {
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
          { role: "assistant", content: "I'm retrieving the information. One moment please..." }
        ]
      }
    } else {
      updatedChat = {
        id: String(auditChatHistory.length + 1),
        question: newMessage,
        title: "New Audit Question",
        timestamp: new Date().toISOString().split('T')[0],
        conversation: [
          { role: "user", content: newMessage },
          { role: "assistant", content: "I'm retrieving the information. One moment please..." }
        ]
      }
      auditChatHistory.unshift(updatedChat)
    }
    
    setSelectedChat(updatedChat)
    setNewMessage("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = "Here's what I found in our compliance documentation..."
      const finalUpdatedChat = {
        ...updatedChat,
        conversation: [
          ...updatedChat.conversation.slice(0, -1),
          { role: "assistant", content: aiResponse }
        ]
      }
      setSelectedChat(finalUpdatedChat)
      if (!selectedChat) {
        auditChatHistory[0] = finalUpdatedChat
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
        onClick={() => setIsOpen(true)}
      />

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent style={{ maxWidth: 'min(33vw, 1200px)' }} className="w-full overflow-hidden" side="right">
          <SheetHeader>
            <SheetTitle>Compliance Assistant</SheetTitle>
            <SheetDescription>Ask questions about compliance policies and evidence</SheetDescription>
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
                      <div className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'} max-w-[85%]`}>
                        <div className="whitespace-pre-wrap">{message.content}</div>
                        
                        {message.evidence && (
                          <div className="mt-4 space-y-4">
                            {/* Policy Links */}
                            {message.evidence.policies && (
                              <div className="border-t pt-2">
                                <h4 className="font-medium mb-2">Related Policies</h4>
                                {message.evidence.policies.map(policy => (
                                  <a 
                                    key={policy.id}
                                    href={policy.link}
                                    className="block text-sm text-blue-600 hover:underline mb-1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {policy.name} ({policy.id})
                                  </a>
                                ))}
                              </div>
                            )}

                            {/* Metrics */}
                            {message.evidence.metrics && (
                              <div className="border-t pt-2">
                                <h4 className="font-medium mb-2">Compliance Metrics</h4>
                                <div className="grid grid-cols-2 gap-4">
                                  {message.evidence.metrics.map(metric => (
                                    <div key={metric.name} className="bg-white p-2 rounded shadow-sm">
                                      <div className="text-sm font-medium">{metric.name}</div>
                                      <div className="flex items-baseline gap-2">
                                        <span className="text-xl font-bold">{metric.current}</span>
                                        <span className="text-sm text-gray-500">/ {metric.target}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Configurations */}
                            {message.evidence.configurations && (
                              <div className="border-t pt-2">
                                <h4 className="font-medium mb-2">Security Tool Configurations</h4>
                                {message.evidence.configurations.map(config => (
                                  <div key={config.tool} className="bg-white p-2 rounded shadow-sm mb-2">
                                    <div className="font-medium">{config.tool}</div>
                                    <div className="text-sm text-gray-600 mb-1">{config.evidence.policyName}</div>
                                    <div className="space-y-1">
                                      {config.evidence.settings.map(setting => (
                                        <div key={setting.name} className="text-sm flex justify-between">
                                          <span className="text-gray-600">{setting.name}</span>
                                          <span>{setting.value}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Contract Requirements */}
                            {message.evidence.contracts && (
                              <div className="border-t pt-2">
                                <h4 className="font-medium mb-2">Contract Requirements</h4>
                                {message.evidence.contracts.map(contract => (
                                  <div key={contract.customer} className="bg-white p-2 rounded shadow-sm mb-2">
                                    <div className="font-medium">{contract.customer}</div>
                                    <div className="text-sm text-gray-600 mb-1">{contract.requirement}</div>
                                    <a 
                                      href={contract.link}
                                      className="text-sm text-blue-600 hover:underline"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      View Contract
                                    </a>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </>
            ) : (
              <ScrollArea className="flex-grow mb-4">
                <h3 className="font-semibold mb-2">Recent Audit Questions</h3>
                {auditChatHistory.map((chat) => (
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
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={selectedChat ? "Type your message here..." : "Ask a compliance question..."}
                className="flex-grow mr-2"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button 
                variant="brand-primary"
                icon="FeatherArrowUp"
                onClick={handleSendMessage}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
} 