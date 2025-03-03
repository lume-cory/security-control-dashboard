import { useState } from 'react'
import { Button } from "@/subframe/components/Button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ArrowLeft, ArrowUp } from 'lucide-react'

// Add this interface near the top with other interfaces
interface Chat {
  id: number
  question: string
  conversation: Array<{
    role: string
    content: string
  }>
}

interface ChatDrawerProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  chatHistory: Chat[]
  onChatHistoryChange: (newHistory: Chat[]) => void
}

export function ChatDrawer({ 
    isOpen, 
    onOpenChange, 
    chatHistory, 
    onChatHistoryChange 
  }: ChatDrawerProps) {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [newMessage, setNewMessage] = useState("")

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
          { role: "assistant", content: "I'm processing your request. Please wait for a moment..." }
        ]
      }
    } else {
      updatedChat = {
        id: chatHistory.length + 1,  // Changed from mockChatHistory to chatHistory
        question: newMessage,
        conversation: [
          { role: "user", content: newMessage },
          { role: "assistant", content: "I'm processing your request. Please wait for a moment..." }
        ]
      }
      onChatHistoryChange([updatedChat, ...chatHistory])  // Update the chat history through props
    }
    
    setSelectedChat(updatedChat)
    setNewMessage("")

    // Simulate AI response after a short delay
    setTimeout(() => {
        const aiResponse = "This is a simulated AI response..."
        const finalUpdatedChat = {
          ...updatedChat,
          conversation: [
            ...updatedChat.conversation.slice(0, -1),
            { role: "assistant", content: aiResponse }
          ]
        }
        setSelectedChat(finalUpdatedChat)
        if (!selectedChat) {
          const newHistory = [finalUpdatedChat, ...chatHistory.slice(1)]
          onChatHistoryChange(newHistory)  // Update the chat history through props
        }
      }, 1000)
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent style={{ maxWidth: 'min(33vw, 1200px)' }} className="w-full overflow-hidden" side="right">
        <SheetHeader>
          <SheetTitle>AI Security Assistant</SheetTitle>
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
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className="p-2 mb-2 rounded cursor-pointer hover:bg-gray-100"
                  onClick={() => handleChatSelect(chat)}
                >
                  {chat.question}
                </div>
              ))}
            </ScrollArea>
          )}
          <div className="flex">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={selectedChat ? "Type your message here..." : "Start a new thread..."}
              className="flex-grow mr-2"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button 
              variant="brand-secondary"
              icon="FeatherArrowUp"
              onClick={handleSendMessage}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
