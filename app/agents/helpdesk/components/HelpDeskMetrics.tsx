import * as SubframeCore from '@subframe/core'
import { Button } from "@/subframe/components/Button"
import { Dispatch, SetStateAction } from 'react';
import { FilterBadge } from "@/subframe/components/FilterBadge";
import { Badge } from "@/subframe/components/Badge";
import { helpDeskMetrics } from '../data/metrics-data';

export default function HelpDeskMetrics() {
  return (
    <div className="flex w-full flex-wrap items-start gap-4">
      {helpDeskMetrics.map((metric, index) => (
        <div key={index} className="flex flex-col items-start gap-4 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
          <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color">
            {metric.title}
          </span>
          {metric.badges ? (
            metric.badges.map((badge, badgeIndex) => (
              <div key={badgeIndex} className="flex items-center gap-2">
                <FilterBadge label={badge.label} count={badge.count} selected={false} />
                {badge.trend && (
                  <Badge 
                    variant={badge.trend.variant} 
                    icon={`Feather${badge.trend.direction === 'up' ? 'ArrowUp' : badge.trend.direction === 'down' ? 'ArrowDown' : 'ArrowRight'}`}
                  >
                    {`${badge.trend.value.toString()} %`}
                  </Badge>
                )}
              </div>
            ))
          ) : (
            <div className="flex w-full flex-col items-start gap-2">
              <span className="text-heading-2 font-heading-2 text-default-font">
                {metric.count}
              </span>
              {metric.trend && (
                <Badge 
                  variant={metric.trend.variant} 
                  icon={`Feather${metric.trend.direction === 'up' ? 'ArrowUp' : metric.trend.direction === 'down' ? 'ArrowDown' : 'ArrowRight'}`}
                >
                  {`${metric.trend.value.toString()} %`}
                </Badge>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
