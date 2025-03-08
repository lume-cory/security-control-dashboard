import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Alert } from "../data/alerts"

interface SlackThreadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  thread?: Alert['slackThread'];
}

export function SlackThreadDialog({ isOpen, onClose, thread }: SlackThreadDialogProps) {
  if (!thread) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-[90vw] md:w-[600px] lg:w-[800px] h-[90vh] md:h-[900px]">
        <DialogHeader className="px-1">
          <DialogTitle>
            <span className="text-muted-foreground text-sm">{thread.channel}</span>
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(100%-60px)] pr-4">
          <div className="space-y-4">
            {thread.messages.map((message, index) => (
              <div key={index} className="flex flex-col space-y-1 p-3 rounded-lg hover:bg-slate-50">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold">{message.user}</span>
                  <span className="text-xs text-muted-foreground">{message.role}</span>
                </div>
                <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                <span className="text-xs text-muted-foreground">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
} 