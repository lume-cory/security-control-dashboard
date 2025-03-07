import { Badge } from "@/subframe/components/Badge";
import { outstandingQuestions, resolvedQuestions } from '../data/questions-data';

interface MetricProps {
  title: string;
  value: string | number;
  changePercentage: number;
  changeDirection: 'up' | 'down' | 'neutral';
}

interface OutstandingMetricProps {
  label: string;
  count: number;
  changePercentage: number;
  changeDirection: 'up' | 'down' | 'neutral';
  color: 'red' | 'orange' | 'yellow' | 'green';
}

interface NoteworthyUpdateProps {
  label: string;
  count: number;
}

interface RequestMetricsProps {
  outstandingMetrics?: OutstandingMetricProps[];
  noteworthyUpdates?: NoteworthyUpdateProps[];
  metrics?: MetricProps[];
}

export function RequestMetrics({ 
  outstandingMetrics: propOutstandingMetrics, 
  noteworthyUpdates: propNoteworthyUpdates, 
  metrics: propMetrics 
}: RequestMetricsProps) {
  // Calculate metrics from data
  const calculateOutstandingMetrics = (): OutstandingMetricProps[] => {
    const urgentCount = outstandingQuestions.filter(q => q.triage === 'urgent').length;
    const highCount = outstandingQuestions.filter(q => q.triage === 'high').length;
    const mediumCount = outstandingQuestions.filter(q => q.triage === 'medium').length;
    const lowCount = outstandingQuestions.filter(q => q.triage === 'low').length;
    
    // For trend data, we'll use the provided values since we don't have historical data
    return [
      { 
        label: "Urgent", 
        count: urgentCount, 
        changePercentage: 13, 
        changeDirection: 'up', 
        color: 'red' 
      },
      { 
        label: "High", 
        count: highCount, 
        changePercentage: 5, 
        changeDirection: 'down', 
        color: 'orange' 
      },
      { 
        label: "Medium", 
        count: mediumCount, 
        changePercentage: 0, 
        changeDirection: 'neutral', 
        color: 'yellow' 
      },
      { 
        label: "Low", 
        count: lowCount, 
        changePercentage: 25, 
        changeDirection: 'down', 
        color: 'green' 
      }
    ];
  };
  
  const calculateNoteworthyUpdates = (): NoteworthyUpdateProps[] => {
    // Count questions awaiting response (last reply was by the requestor)
    const awaitingResponse = outstandingQuestions.filter(q => 
      q.lastReplyBy === 'requestor'
    ).length;
    
    // Count inactive questions (last update was over 4 business days ago)
    const fourDaysAgo = new Date();
    fourDaysAgo.setDate(fourDaysAgo.getDate() - 4); // Simple approximation of business days
    const inactiveQuestions = outstandingQuestions.filter(q => {
      const lastUpdated = new Date(q.lastUpdatedDate);
      return lastUpdated < fourDaysAgo;
    }).length;
    
    // Count AI-identified questions (those with AI_AGENT submission method)
    const aiIdentified = outstandingQuestions.filter(q => 
      q.submissionMethod === 'AI_AGENT'
    ).length;
    
    // Count questions submitted last week based on creation date
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const submittedLastWeek = outstandingQuestions.filter(q => {
      const createdDate = new Date(q.createdDate);
      return createdDate > oneWeekAgo;
    }).length;
    
    return [
      { label: "Awaiting Response", count: awaitingResponse },
      { label: "Inactive (4+ days)", count: inactiveQuestions },
      { label: "Topics Identified by Security Assistant", count: aiIdentified },
      { label: "Submitted this week", count: submittedLastWeek }
    ];
  };
  
  const calculateMetrics = (): MetricProps[] => {
    // Count missed SLAs (questions past due date)
    const now = new Date();
    const missedSLAs = outstandingQuestions.filter(q => {
      const dueDate = new Date(q.dueDate);
      return dueDate < now;
    }).length;
    
    // Count resolved questions in last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const resolvedLast30Days = resolvedQuestions.filter(q => {
      const resolvedDate = new Date(q.resolvedDate);
      return resolvedDate > thirtyDaysAgo;
    }).length;
    
    // For average time and trends, we'll use the provided values
    return [
      { 
        title: "Open Missed SLAs", 
        value: missedSLAs, 
        changePercentage: 25, 
        changeDirection: 'up' 
      },
      { 
        title: "Missed SLAs (30 days)", 
        value: 9, // Using provided value as we don't have historical data
        changePercentage: 33, 
        changeDirection: 'down' 
      },
      { 
        title: "Average time to resolve (30 days)", 
        value: "4.4 days", // Using provided value as we need to calculate average
        changePercentage: 25, 
        changeDirection: 'down' 
      },
      { 
        title: "Resolved (30 days)", 
        value: 70, // Using provided value as we need to calculate average
        changePercentage: 33, 
        changeDirection: 'up' 
      }
    ];
  };
  
  // Use calculated metrics or props if provided
  const outstandingMetrics = propOutstandingMetrics || calculateOutstandingMetrics();
  const noteworthyUpdates = propNoteworthyUpdates || calculateNoteworthyUpdates();
  const metrics = propMetrics || calculateMetrics();

  const getVariant = (direction: 'up' | 'down' | 'neutral', metric: string) => {
    if (metric === 'Open Missed SLAs') {
      return direction === 'up' ? 'error' : direction === 'down' ? 'success' : 'neutral';
    }
    
    return direction === 'up' ? 'neutral' : direction === 'down' ? 'success' : 'neutral';
  };
  
  const getIcon = (direction: 'up' | 'down' | 'neutral') => {
    return direction === 'up' 
      ? 'FeatherArrowUp' 
      : direction === 'down' 
        ? 'FeatherArrowDown' 
        : 'FeatherArrowRight';
  };
  
  const getTextColor = (color: 'red' | 'orange' | 'yellow' | 'green') => {
    const colors = {
      red: 'text-red-600',
      orange: 'text-orange-600',
      yellow: 'text-yellow-600',
      green: 'text-green-600'
    };
    return colors[color];
  };

  return (
    <div className="flex w-full flex-wrap items-start gap-4 justify-between">
      {/* Outstanding Questions block */}
      <div className="flex flex-col items-start gap-4 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm w-[25%]">
        <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color">
          Outstanding Questions
        </span>
        <div className="w-full">
          {outstandingMetrics.map((metric, index) => (
            <div key={index} className="flex w-full items-center justify-between mb-2">
              <div className="flex w-full items-center justify-between px-3 py-2">
                <span className="text-sm font-medium text-default-font">{metric.label}</span>
                <span className={`text-heading-2 font-heading-2 text-default-font ${getTextColor(metric.color)} px-2`}>
                  {metric.count}
                </span>
              </div>
              <Badge 
                variant={metric.changeDirection === 'up' ? 'error' : metric.changeDirection === 'down' ? 'success' : 'neutral'} 
                icon={getIcon(metric.changeDirection)} 
                className="ml-2 w-[20%]"
              >
                {`${metric.changePercentage}%`}
              </Badge>
            </div>
          ))}
        </div>
      </div>
      
      {/* Metrics blocks */}
      <div className="flex grow shrink-0 basis-0 flex-col flex-wrap items-start gap-4">
        <div className="flex w-full flex-wrap items-start gap-4">
          {metrics.slice(0, 2).map((metric, index) => (
            <div key={index} className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
              <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color">
                {metric.title}
              </span>
              <div className="flex w-full flex-col items-start gap-2 px-3">
                <span className="text-heading-2 font-heading-2 text-default-font">
                  {metric.value}
                </span>
                <Badge 
                  variant={getVariant(metric.changeDirection, metric.title)} 
                  icon={getIcon(metric.changeDirection)}
                >
                  {`${metric.changePercentage}%`}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        <div className="flex w-full flex-wrap items-start gap-4">
          {metrics.slice(2, 4).map((metric, index) => (
            <div key={index} className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
              <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color">
                {metric.title}
              </span>
              <div className="flex w-full flex-col items-start gap-2 px-3">
                <span className="text-heading-2 font-heading-2 text-default-font">
                  {metric.value}
                </span>
                <Badge 
                  variant={getVariant(metric.changeDirection, metric.title)} 
                  icon={getIcon(metric.changeDirection)}
                >
                  {`${metric.changePercentage}%`}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Noteworthy Updates block */}
      <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm h-full">
        <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color">
          Noteworthy Updates
        </span>
        <div className="flex w-full flex-col items-start gap-3 flex-grow justify-between">
          <div className="w-full">
            {noteworthyUpdates.map((update, index) => (
              <div key={index} className="flex w-full items-center justify-between mb-2">
                <div className="flex w-full items-center justify-between px-3 py-2">
                  <p className="text-sm font-medium text-default-font">{update.label}</p>
                  <p className="text-heading-2 font-heading-2 text-default-font text-amber-600">{update.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 