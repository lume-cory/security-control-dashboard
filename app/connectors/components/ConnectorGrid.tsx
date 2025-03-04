import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/subframe/components/Button";
import type { Connector } from "../data/connectors-data";
import { useState } from "react";

interface ConnectorGridProps {
  connectors: Connector[];
}

export function ConnectorGrid({ connectors }: ConnectorGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {connectors.map(connector => (
        <ConnectorCard key={connector.id} connector={connector} />
      ))}
    </div>
  );
}

interface ConnectorCardProps {
  connector: Connector;
}

function ConnectorCard({ connector }: ConnectorCardProps) {
  const [imageError, setImageError] = useState(false);

  // Get status color
  const getStatusColor = (status: 'connected' | 'available' | 'coming-soon') => {
    switch (status) {
      case 'connected':
        return 'bg-green-600';
      case 'available':
        return 'bg-blue-600';
      case 'coming-soon':
        return 'bg-amber-500';
      default:
        return 'bg-gray-400';
    }
  };

  // Get status text
  const getStatusText = (status: 'connected' | 'available' | 'coming-soon') => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'available':
        return 'Available';
      case 'coming-soon':
        return 'Coming Soon';
      default:
        return status;
    }
  };

  return (
    <Card key={connector.id} className="overflow-hidden flex flex-row">
      <div className="h-full w-24 flex items-center justify-center p-2">
        {connector.logo && !imageError ? (
          <img 
            src={connector.logo} 
            alt={connector.name} 
            className="max-w-full max-h-12 object-contain"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="text-2xl font-bold text-gray-500">{connector.name.charAt(0)}</div>
        )}
      </div>
      <div className="flex-1">
        <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
          <div>
            <h3 className="font-semibold">{connector.name}</h3>
            <p className="text-xs text-muted-foreground">{connector.category}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs bg-gray-100">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(connector.status)}`} />
            {getStatusText(connector.status)}
          </span>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <p className="text-sm text-muted-foreground mb-4">{connector.description}</p>
          {connector.status !== 'coming-soon' && (
            <div className="flex justify-end">
              {connector.status === 'connected' ? (
                <Button variant="brand-primary" size="small">Configure</Button>
              ) : (
                <Button variant="brand-primary" size="small">Connect</Button>
              )}
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
} 