import { Button } from "@/subframe/components/Button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useState } from "react"
import * as SubframeCore from "@subframe/core"
import AddIntegrationDialog from "./AddIntegrationDialog"

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
    <Card>
      <CardHeader>
        <div className="flex w-full items-center gap-2">
          <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font">
            Integrations and Data Sources
          </span>
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
        <div className="flex w-full items-start gap-4">
          {integrations.map(({ name, link, subtitle, icon }, i) => (
            <a key={`${name}-${i}`} href={link} target="_blank">
              <div className="flex items-center gap-2 rounded-md bg-neutral-50 px-2 py-2">
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