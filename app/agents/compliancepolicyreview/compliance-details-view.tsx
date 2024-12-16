import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/subframe/components/Button";
import { Badge } from "@/subframe/components/Badge";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Interfaces for the components
interface SecurityTool {
  name: string;
  category: string;
  currentConfig: string[];
  recommendedConfig: string[];
  configDriftPercentage: number;
}

interface SupportingMetric {
  name: string;
  value: number;
  trend: number[];
  unit: string;
  description: string;
}

interface ComplianceDetailsViewProps {
  securityTools: SecurityTool[];
  supportingMetrics: SupportingMetric[];
}

export const SecurityResourcesSection: React.FC<{ tools: SecurityTool[] }> = ({ tools }) => {
  const [pendingChanges, setPendingChanges] = useState<{[key: string]: boolean}>({});

  const handleAcceptChanges = (toolName: string) => {
    setPendingChanges(prev => ({...prev, [toolName]: true}));
    // TODO: Implement actual ticket creation logic
    alert(`A ticket has been created for reviewing configuration changes for ${toolName}`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Security Resources</h2>
      {tools.map((tool, index) => (
        <Card key={index} className="bg-white shadow-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">{tool.name}</CardTitle>
              <Badge 
                variant={tool.configDriftPercentage > 20 ? 'error' : tool.configDriftPercentage > 10 ? 'warning' : 'success'}
              >
                {`Config Drift: ${tool.configDriftPercentage}%`}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Current Configuration</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {tool.currentConfig.map((config, i) => (
                    <li key={i}>{config}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Recommended Configuration</h3>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {tool.recommendedConfig.map((config, i) => (
                    <li key={i}>{config}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button 
                className="w-full" 
                variant="brand-secondary"
                onClick={() => handleAcceptChanges(tool.name)}
                disabled={pendingChanges[tool.name]}
              >
                {pendingChanges[tool.name] ? 'Changes Submitted' : 'Submit Changes'}
              </Button>
              <Button 
                className="w-full" 
                variant="brand-secondary"
              >
                Defer Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export const SupportingMetricsSection: React.FC<{ metrics: SupportingMetric[] }> = ({ metrics }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Supporting Metrics</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="bg-white shadow-sm">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{metric.name}</CardTitle>
                <Badge 
                  variant={
                    metric.trend[metric.trend.length - 1] > 0 ? 'success' : 
                    metric.trend[metric.trend.length - 1] < 0 ? 'error' : 
                    'neutral'
                  }
                >
                  {metric.trend[metric.trend.length - 1] > 0 ? '↑' : 
                   metric.trend[metric.trend.length - 1] < 0 ? '↓' : '→'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <p className="text-2xl font-bold">{metric.value} {metric.unit}</p>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{metric.description}</p>
              <div className="h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={metric.trend.map((value, index) => ({ x: index, y: value }))}>
                    <XAxis dataKey="x" hide />
                    <YAxis hide />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="y" 
                      stroke={
                        metric.trend[metric.trend.length - 1] > 0 ? '#10B981' : 
                        metric.trend[metric.trend.length - 1] < 0 ? '#EF4444' : 
                        '#6B7280'
                      } 
                      strokeWidth={2} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const ComplianceDetailsView: React.FC<ComplianceDetailsViewProps> = ({ 
  securityTools, 
  supportingMetrics 
}) => {
  return (
    <div className="space-y-8">
      <SecurityResourcesSection tools={securityTools} />
      <SupportingMetricsSection metrics={supportingMetrics} />
    </div>
  );
};
