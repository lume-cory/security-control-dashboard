"use client";
/*
 * Documentation:
 * Line Chart — https://app.subframe.com/dd04ff44d9d4/library?component=Line+Chart_22944dd2-3cdd-42fd-913a-1b11a3c1d16d
 */

import React from "react";
import * as SubframeCore from "@subframe/core";

interface LineChartRootProps
  extends React.ComponentProps<typeof SubframeCore.LineChart> {
  className?: string;
}

const LineChartRoot = React.forwardRef<HTMLElement, LineChartRootProps>(
  function LineChartRoot(
    { className, ...otherProps }: LineChartRootProps,
    ref
  ) {
    return (
      <SubframeCore.LineChart
        className={SubframeCore.twClassNames("h-80 w-full", className)}
        ref={ref as any}
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

export const LineChart = LineChartRoot;
