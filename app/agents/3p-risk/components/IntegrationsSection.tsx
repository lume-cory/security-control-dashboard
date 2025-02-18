import { Button } from "@/subframe/components/Button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useState } from "react"
import * as SubframeCore from "@subframe/core"
import AddIntegrationDialog from "./AddIntegrationDialog"
import { cn } from "@/lib/utils"

interface Integration {
  name: string;
  subtitle: string;
  icon: SubframeCore.IconName;
  link: string;
}

export function IntegrationsSection() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newIntegration, setNewIntegration] = useState('');
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      name: "Slack Channels",
      subtitle: "10k+ messages",
      icon: "FeatherSlack",
      link: "#"
    },
    {
      name: "Vendor Management System",
      subtitle: "40 apps & libraries",
      icon: "FeatherShapes",
      link: "#"
    },
    {
      name: "Security Policy Docs",
      subtitle: "150 files",
      icon: "FeatherFiles",
      link: "#"
    },
    {
      name: "Vendor Review Tickets",
      subtitle: "2.5k ticket threads",
      icon: "FeatherTicket",
      link: "#"
    },
    {
      name: "Vendor Contracts",
      subtitle: "320 files",
      icon: "FeatherFiles",
      link: "#"
    },
    {
      name: "3P Security Questionnaires",
      subtitle: "320 files",
      icon: "FeatherFiles",
      link: "#"
    },
    {
      name: "Vendor Emails",
      subtitle: "10k+ emails",
      icon: "FeatherMail",
      link: "#"
    }
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const file = files[0];
    if (file) {
      setIntegrations([...integrations, { name: `Uploaded: ${file.name}`, icon: 'FeatherFile', subtitle: '', link: "#" }]);
      setShowAddDialog(false);
    }
  };

  const addIntegration = () => {
    if (newIntegration) {
      setIntegrations([...integrations, { name: newIntegration, icon: 'FeatherFile', subtitle: '', link: "#" }]);
      setNewIntegration('');
      setShowAddDialog(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex w-full items-center gap-2">
          <h2 className="line-clamp-1 grow shrink-0 basis-0 text-lg font-semibold">
            Integrations and Data Sources
          </h2>
          <Button
            className="h-6 w-auto flex-none"
            variant="brand-primary"
            icon="FeatherPlus"
            onClick={() => setShowAddDialog(true)}
          >
            Add
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-fr gap-4">
          {integrations.map(({ name, link, subtitle, icon }, i) => (
            <a key={`${name}-${i}`} href={link} target="_blank">
              <div className={cn(
                "flex items-center gap-2 rounded-md bg-neutral-50 px-2 py-2",
                integrations.length > 4 && "md:col-span-2 lg:col-span-1"
              )}>
                <SubframeCore.Icon
                  className="text-heading-2 font-heading-2 text-default-font"
                  name={icon}
                />
                <div className="flex flex-col items-start gap-2 px-1">
                  <span className="text-body-bold font-body-bold text-default-font">
                    {name}
                  </span>
                  {subtitle && (
                    <span className="text-caption font-caption text-default-font">
                      {subtitle}
                    </span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </CardContent>

      <AddIntegrationDialog 
        isOpen={showAddDialog} 
        onOpenChange={setShowAddDialog}
        newIntegration={newIntegration}
        setNewIntegration={setNewIntegration}
        handleFileUpload={handleFileUpload}
        addIntegration={addIntegration}
      />
    </Card>
  );
} 