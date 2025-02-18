import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCard } from "./alert-card"

export function AlertsSection({ onAlertClick }: { onAlertClick: () => void }) {
  return (
    <Card className="transition-all duration-200">
      <CardHeader>
      <h2 className="text-xl font-bold">Alerts</h2>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-3 gap-4 transition-all duration-200">
          <AlertCard
            title="Security Policy v7"
            description="The latest revision of the Information Security Policy has resulted in misalignment with the NIST Cybersecurity Frameworks, CRI Profiles, and 3 regulations."
            aligned={94}
            nonAligned={13}
            onClick={onAlertClick}
          />
          <AlertCard
              title="NIST CSF v2.0"
              description="A new version of NIST Cybersecurity Framework (CSF) v2.0 security framework was recently published. The Information Security Policy is misaligned with 4 controls."
              aligned={96}
              nonAligned={4}
              onClick={onAlertClick}
            />
            <AlertCard
              title="EU AI Act"
              description="The EU AI Act has gone into effect and will begin enforcement in 2025. Based on usage of AI and ML products, we'll need to comply. The Information Security Policy is currently misaligned with 8 controls required in this regulation."
              aligned={72}
              nonAligned={8}
              onClick={onAlertClick}
            />
        </div>
      </CardContent>
    </Card>
  )
} 