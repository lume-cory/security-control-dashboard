import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/subframe/components/Button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type AddIntegrationDialogProps = {
  isAddDialogOpen: boolean;
  newIntegration: any;
  setIsAddDialogOpen: (b: boolean) => {};
  addIntegration: () => {};
  setNewIntegration: (s: string) => {};
  handleFileUpload: () => {};
}

export default function AddIntegrationDialog({
  isAddDialogOpen,
  newIntegration,
  handleFileUpload,
  setIsAddDialogOpen,
  setNewIntegration,
  addIntegration,
}: AddIntegrationDialogProps) {
  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogTrigger asChild>
        <Button>Add New</Button>
      </DialogTrigger>
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
              <Button onClick={() => setIsAddDialogOpen(false)}>Upload File</Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}