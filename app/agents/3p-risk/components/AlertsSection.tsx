import { Card } from "@/components/ui/card"
import { Badge } from "@/subframe/components/Badge"
import { Button } from "@/subframe/components/Button"
import type { Alert } from "../data/alerts"
import { useState } from "react"
import { SlackThreadDialog } from "./SlackThreadDialog"

interface AlertsSectionProps {
  alerts: Alert[];
}

export function AlertsSection({ alerts }: AlertsSectionProps) {
  const [selectedThread, setSelectedThread] = useState<Alert['slackThread']>();
  const activeAlerts = alerts.filter(alert => alert.status !== 'DISMISSED');

  return (
    <Card className="p-6">
      <div className="flex items-center w-full justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Alerts</h2>
          <p className="text-sm text-muted-foreground">
            {activeAlerts.length} active alerts
          </p>
        </div>
        {/* {activeAlerts.length > 0 && (
          <Button variant="brand-secondary" size="small">
            Dismiss All
          </Button>
        )} */}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {activeAlerts.map(alert => (
          <Card key={alert.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium">{alert.title}</h3>
                  {alert.status === 'NEW' && (
                    <Badge variant="success">New</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {alert.description}
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground">
                    {alert.date}
                  </span>
                  {alert.source && (
                    <span className="text-muted-foreground">
                      Source: {alert.source}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                {alert.link && (
                  <Button 
                    variant="brand-primary" 
                    size="small"
                    onClick={() => alert.slackThread && setSelectedThread(alert.slackThread)}
                  >
                    {alert.link.text}
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}

        {activeAlerts.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            No active alerts
          </div>
        )}
      </div>

      <SlackThreadDialog 
        isOpen={!!selectedThread}
        onClose={() => setSelectedThread(undefined)}
        thread={selectedThread}
      />
    </Card>
  )
} 