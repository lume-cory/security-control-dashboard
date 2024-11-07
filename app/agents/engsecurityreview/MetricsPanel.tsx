import React from 'react';
import { FilterBadge } from "@/subframe/components/FilterBadge";
import { Badge } from "@/subframe/components/Badge";

const MetricsPanel = () => {
  return (
    <div className="flex w-full flex-wrap items-start gap-4">
      <div className="flex flex-col items-start gap-4 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
        <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color">
          Outstanding questions
        </span>
        <div className="flex items-center gap-2">
          <FilterBadge label="Urgent" count="3" selected={false} />
          <Badge variant="error" icon="FeatherArrowUp">
            13 %
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <FilterBadge label="High" count="2" selected={false} />
          <Badge variant="success" icon="FeatherArrowDown">
            5 %
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <FilterBadge label="Medium" count="2" selected={false} />
          <Badge variant="neutral" icon="FeatherArrowRight">
            0 %
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <FilterBadge label="Low" count="1" selected={false} />
          <Badge variant="success" icon="FeatherArrowDown">
            25 %
          </Badge>
        </div>
      </div>
      <div className="flex grow shrink-0 basis-0 flex-col flex-wrap items-start gap-4">
        <div className="flex w-full flex-wrap items-start gap-4">
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
            <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color">
              Open Missed SLAs
            </span>
            <div className="flex w-full flex-col items-start gap-2">
              <span className="text-heading-2 font-heading-2 text-default-font">
                4
              </span>
              <Badge variant="error" icon="FeatherArrowUp">
                25 %
              </Badge>
            </div>
          </div>
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
            <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color">
              Missed SLAs(past - 30 days)
            </span>
            <div className="flex w-full flex-col items-start gap-2">
              <span className="text-heading-2 font-heading-2 text-default-font">
                9
              </span>
              <Badge variant="success" icon="FeatherArrowDown">
                33 %
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-wrap items-start gap-4">
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
            <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color">
              Average time to resolve(past - 30 days)
            </span>
            <div className="flex w-full flex-col items-start gap-2">
              <span className="text-heading-2 font-heading-2 text-default-font">
                4.4 days
              </span>
              <Badge variant="success" icon="FeatherArrowDown">
                25 %
              </Badge>
            </div>
          </div>
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
            <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color">
              Resolved(past - 30 days)
            </span>
            <div className="flex w-full flex-col items-start gap-2">
              <span className="text-heading-2 font-heading-2 text-default-font">
                75
              </span>
              <Badge variant="neutral" icon="FeatherArrowUp">
                33 %
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsPanel; 