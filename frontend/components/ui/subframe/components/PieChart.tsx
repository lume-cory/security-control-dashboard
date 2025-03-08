"use client";
/*
 * Documentation:
 * Pie Chart — https://app.subframe.com/dd04ff44d9d4/library?component=Pie+Chart_0654ccc7-054c-4f3a-8e9a-b7c81dd3963c
 */

import React from "react";
import * as SubframeCore from "@subframe/core";

interface PieChartRootProps
  extends React.ComponentProps<typeof SubframeCore.PieChart> {
  className?: string;
}

const PieChartRoot = React.forwardRef<HTMLElement, PieChartRootProps>(
  function PieChartRoot({ className, ...otherProps }: PieChartRootProps, ref) {
    return (
      <SubframeCore.PieChart
        className={SubframeCore.twClassNames("h-52 w-52", className)}
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

export const PieChart = PieChartRoot;
