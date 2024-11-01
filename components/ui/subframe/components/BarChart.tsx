"use client";
/*
 * Documentation:
 * Bar Chart — https://app.subframe.com/dd04ff44d9d4/library?component=Bar+Chart_4d4f30e7-1869-4980-8b96-617df3b37912
 */

import React from "react";
import * as SubframeCore from "@subframe/core";

interface BarChartRootProps
  extends React.ComponentProps<typeof SubframeCore.BarChart> {
  stacked?: boolean;
  className?: string;
}

const BarChartRoot = React.forwardRef<HTMLElement, BarChartRootProps>(
  function BarChartRoot(
    { stacked = false, className, ...otherProps }: BarChartRootProps,
    ref
  ) {
    return (
      <SubframeCore.BarChart
        className={SubframeCore.twClassNames("h-80 w-full", className)}
        ref={ref as any}
        stacked={stacked}
        colors={[
          "#f24596",
          "#a16ae8",
          "#6257e3",
          "#9aedb6",
          "#00eded",
          "#2ee2ab",
          "#FB7185",
          "#22D3EE",
          "#E879F9",
          "#67E8F9",
        ]}
        {...otherProps}
      />
    );
  }
);

export const BarChart = BarChartRoot;
