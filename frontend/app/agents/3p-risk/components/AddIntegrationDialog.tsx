import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/subframe/components/Button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AddIntegrationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newIntegration: string;
  setNewIntegration: (value: string) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addIntegration: () => void;
}

export default function AddIntegrationDialog({
  isOpen,
  onOpenChange,
  newIntegration,
  handleFileUpload,
  setNewIntegration,
  addIntegration,
}: AddIntegrationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Integration or Upload File</DialogTitle>
          <DialogDescription>Choose to add a new integration app or upload a file.</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="integration">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="integration">New Integration</TabsTrigger>
            <TabsTrigger value="file">Upload File</TabsTrigger>
          </TabsList>
          <TabsContent value="integration">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-integration" className="text-right">
                  Integration Name
                </Label>
                <Input
                  id="new-integration"
                  value={newIntegration}
                  onChange={(e) => setNewIntegration(e.target.value)}
                  className="col-span-3"
                />
                <Label htmlFor="new-integration" className="text-right">Endpoint / URL</Label>
                <Input
                  id="new-integration"
                  value={newIntegration}
                  onChange={(e) => setNewIntegration(e.target.value)}
                  className="col-span-3"
                />
                <Label htmlFor="new-integration" className="text-right">API Key (optional)</Label>
                <Input
                  id="new-integration"
                  value={newIntegration}
                  onChange={(e) => setNewIntegration(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addIntegration}>Add Integration</Button>
            </DialogFooter>
          </TabsContent>
          <TabsContent value="file">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file-upload" className="text-right">
                  Choose File
                </Label>
                <Input
                  id="file-upload"
                  type="file"
                  onChange={handleFileUpload}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => onOpenChange(false)}>Upload File</Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}