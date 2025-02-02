"use client";

import React, { useState, useRef, useEffect } from "react";
import { DefaultPageLayout } from "@/subframe/layouts/DefaultPageLayout";
import { IconWithBackground } from "@/subframe/components/IconWithBackground";
import { Button } from "@/subframe/components/Button";
import { Badge } from "@/subframe/components/Badge";
import { BarChart } from "@/subframe/components/BarChart";
import { ToggleGroup } from "@/subframe/components/ToggleGroup";
import { PieChart } from "@/subframe/components/PieChart";
import { LineChart } from "@/subframe/components/LineChart";
import { FilterBadge } from "@/subframe/components/FilterBadge";
import { TimelineDivider } from "@/subframe/components/TimelineDivider";
import { Progress } from "@/subframe/components/Progress";
import { DropdownMenu } from "@/subframe/components/DropdownMenu";
import * as SubframeCore from "@subframe/core";
import { Table } from "@/subframe/components/Table";
import AccessManagementDetailsView from "@/app/agents/controlgroups/am-details-subframe";
import EndpointProtectionDetailsView from "@/app/agents/controlgroups/ep-details-subframe";
import DataStorageDetailsView from "@/app/agents/controlgroups/ds-details-subframe";
import ProvisioningDetailsView from "@/app/agents/controlgroups/up-details-subframe";

const distinctColors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
  '#F06292', '#AED581', '#7986CB', '#FFD54F', '#4DB6AC',
  '#9575CD', '#4DD0E1', '#81C784', '#DCE775', '#64B5F6'
];

function DashboardWithAnalytics() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (themeName: string) => {
    setSelectedTheme(themeName);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedTheme(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDrawerOpen && drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        closeDrawer();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDrawerOpen]);

  const renderThemeDetails = () => {
    switch (selectedTheme) {
      case "Endpoint Protection":
        return <EndpointProtectionDetailsView onClose={closeDrawer} />
      case "Access Management":
        return <AccessManagementDetailsView onClose={closeDrawer} />
      case "Data Storage":
        return <DataStorageDetailsView onClose={closeDrawer} />
      case "Provisioning":
        return <ProvisioningDetailsView onClose={closeDrawer} />
      //   case "Data Protection":
      //     return <DetailViewWithActivity onClose={() => setSelectedTheme(null)} />
      default:
        return null
    }
  }

  return (
    <DefaultPageLayout>
      <div className="container max-w-none flex h-full w-full flex-col items-start gap-6 bg-default-background py-12">
        <div className="flex w-full items-start gap-4 mobile:flex-col mobile:items-center mobile:justify-start mobile:gap-6">
          <IconWithBackground size="medium" icon="FeatherRocket" />
          <span className="text-heading-2 font-heading-2 text-default-font mobile:text-center">
            Acme Inc Security Controls
          </span>
        </div>
        <div className="flex w-full flex-wrap items-start gap-2 mobile:flex-col mobile:flex-wrap mobile:items-start mobile:justify-center mobile:gap-2">
          <Button
            className="mobile:h-8 mobile:w-full mobile:flex-none"
            variant="brand-secondary"
            size="medium"
            icon="FeatherSend"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
          >
            Share report
          </Button>
          <Button
            className="mobile:h-8 mobile:w-full mobile:flex-none"
            variant="neutral-secondary"
            size="medium"
            icon="FeatherBuilding"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
          >
            Business Coverage
          </Button>
          <Button
            className="mobile:h-8 mobile:w-full mobile:flex-none"
            variant="neutral-secondary"
            size="medium"
            icon="FeatherSprout"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
          >
            Control Maturity
          </Button>
          <Button
            className="mobile:h-8 mobile:w-full mobile:flex-none"
            variant="neutral-secondary"
            size="medium"
            icon="FeatherActivity"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
          >
            Test Findings &amp; Actions
          </Button>
        </div>
        <span className="text-heading-3 font-heading-3 text-default-font">
          Business Coverage
        </span>
        <div className="flex w-full flex-wrap items-start gap-4">
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
            <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color">
              Revenue from assets covered by controls
            </span>
            <div className="flex w-full flex-col items-start gap-2">
              <span className="text-heading-2 font-heading-2 text-default-font">
                $319M
              </span>
              <Badge variant="success" icon="FeatherArrowUp">
                13%
              </Badge>
            </div>
          </div>
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
            <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color">
              Assets with least coverage
            </span>
            <div className="flex w-full flex-col items-start gap-2">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Point of sale systems
              </span>
              <span className="text-heading-3 font-heading-3 text-default-font">
                Personal mobile devices
              </span>
              {/* <Badge variant="warning" icon="FeatherArrowUp">
                25%
              </Badge> */}
            </div>
          </div>
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
            <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color">
              Revenue from assets without coverage
            </span>
            <div className="flex w-full flex-col items-start gap-2">
              <span className="text-heading-2 font-heading-2 text-default-font">
                $63.8M
              </span>
              <Badge variant="success" icon="FeatherArrowDown">
                33%
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center gap-4">
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm">
            <div className="flex w-full items-center gap-2">
              <span className="grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font">
                Asset Revenue by Type ($M)
              </span>
            </div>
            <BarChart
              className="h-64 w-full flex-none mobile:h-auto mobile:w-full mobile:flex-none"
              stacked={true}
              categories={["Documentation", "People", "Devices", "Services", "Software", "Data"]}
              data={[
                { Year: "Q3'24", Documentation: 9, People: 75, Device: 10, Services: 60, Software: 100, Data: 70 },
              ]}
              index={"Year"}
              colors={distinctColors}
            />
          </div>
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm">
            <div className="flex w-full items-center gap-2">
              <span className="grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font">
                Revenue Covered by Resource Type (%)
              </span>
              <ToggleGroup value="" onValueChange={(value: string) => { }}>
                <ToggleGroup.Item disabled={true} icon={null} value="95e4937b">
                  Current
                </ToggleGroup.Item>
                <ToggleGroup.Item disabled={true} icon={null} value="71fdf7b1">
                  3mo
                </ToggleGroup.Item>
                <div className="flex grow shrink-0 basis-0 items-center gap-2">
                  <ToggleGroup.Item
                    disabled={true}
                    icon={null}
                    value="4e0ff535"
                  >
                    1y
                  </ToggleGroup.Item>
                  <ToggleGroup.Item icon={null} value="3c18122f">
                    3y
                  </ToggleGroup.Item>
                </div>
              </ToggleGroup>
            </div>
            <BarChart
              className="h-64 w-full flex-none"
              stacked={true}
              categories={[
                "N/A", "Insurance", "Audit", "3P Pentests", "Op. Costs",
                "MSSP", "Headcount", "R&D", "License", "Tooling"
              ]}
              data={[
                { Year: "2022", "N/A": 38, Insurance: 3, Audit: 3, "3P Pentests": 3, "Op. Costs": 4, MSSP: 2, Headcount: 15, "R&D": 6, Licensing: 1, Tooling: 25 },
                { Year: "2023", "N/A": 30, Insurance: 9, Audit: 3, "3P Pentests": 3, "Op. Costs": 5, MSSP: 3, Headcount: 16, "R&D": 6, Licensing: 1, Tooling: 25 },
                { Year: "2024", "N/A": 20, Insurance: 8, Audit: 4, "3P Pentests": 5, "Op. Costs": 5, MSSP: 3, Headcount: 17, "R&D": 6, Licensing: 1, Tooling: 31 },
              ]}
              index={"Year"}
              colors={distinctColors}
            />
          </div>
        </div>
        <div className="flex w-full items-center gap-4">
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm">
            <div className="flex w-full grow shrink-0 basis-0 flex-col items-center gap-2">
              <span className="w-full text-heading-3 font-heading-3 text-default-font">
                Cost by Resource Type ($M)
              </span>
              <div className="flex w-full grow shrink-0 basis-0 flex-col items-center justify-center gap-2">
                <PieChart
                  className="w-full grow shrink-0 basis-0"
                  category={"Cost"}
                  data={[
                    { Type: "Tooling", Cost: 39.50 },
                    { Type: "Licensing", Cost: 5.43 },
                    { Type: "R&D", Cost: 38.70 },
                    { Type: "Headcount", Cost: 38.70 },
                    { Type: "MSSP", Cost: 17.00 },
                    { Type: "Op. Costs", Cost: 19.75 },
                    { Type: "3P Pentests", Cost: 9.38 },
                    { Type: "Audit", Cost: 15.25 },
                    { Type: "Insurance", Cost: 23.00 },
                    { Type: "N/A", Cost: 0.00 },
                  ]}
                  index={"Type"}
                  colors={distinctColors}
                />
              </div>
            </div>
          </div>
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm">
            <div className="flex w-full items-center gap-2">
              <span className="grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font">
                Revenue Covered vs. Cost by Resource Type ($M)
              </span>
            </div>
            <BarChart
              categories={["Revenue Covered", "Cost"]}
              data={[
                { Type: "N/A", "Revenue Covered": 20, Cost: 0 },
                { Type: "Insurance", "Revenue Covered": 8, Cost: 2.3 },
                { Type: "Audit", "Revenue Covered": 4, Cost: 1.525 },
                { Type: "3P Pentests", "Revenue Covered": 5, Cost: .938 },
                { Type: "Op. Costs", "Revenue Covered": 5, Cost: 1.975 },
                { Type: "MSSP", "Revenue Covered": 3, Cost: 1.700 },
                { Type: "Headcount", "Revenue Covered": 17, Cost: 1.500 },
                { Type: "R&D", "Revenue Covered": 6, Cost: 3.870 },
                { Type: "Licensing", "Revenue Covered": 1, Cost: .543 },
                { Type: "Tooling", "Revenue Covered": 32, Cost: 3.950 },
              ]}
              index={"Type"}
              colors={distinctColors}
            />
          </div>
        </div>
        <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-200" />
        <span className="text-heading-3 font-heading-3 text-default-font">
          Control Maturity
        </span>
        <div className="flex w-full flex-wrap items-start gap-4">
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
            <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color">
              Average control maturity
            </span>
            <div className="flex w-full flex-col items-start gap-2">
              <span className="text-heading-2 font-heading-2 text-default-font">
                75%
              </span>
              <Badge variant="success" icon="FeatherArrowUp">
                2%
              </Badge>
            </div>
          </div>
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
            <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color">
              Average control effectiveness
            </span>
            <div className="flex w-full flex-col items-start gap-2">
              <span className="text-heading-2 font-heading-2 text-default-font">
                85%
              </span>
              <Badge variant="success" icon="FeatherArrowUp">
                1%
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex w-full items-start gap-4 mobile:flex-col mobile:gap-6">
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm">
            <div className="flex w-full items-center gap-2">
              <span className="grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font">
                Control Coverage Maturity (%)
              </span>
              <ToggleGroup value="" onValueChange={(value: string) => { }}>
                <ToggleGroup.Item disabled={true} icon={null} value="305aa703">
                  3mo
                </ToggleGroup.Item>
                <ToggleGroup.Item disabled={true} icon={null} value="c6ee0d82">
                  1y
                </ToggleGroup.Item>
                <ToggleGroup.Item icon={null} value="fff8b878">
                  3y
                </ToggleGroup.Item>
              </ToggleGroup>
            </div>
            <LineChart
              className="h-64 w-full flex-none mobile:h-auto mobile:w-full mobile:flex-none"
              categories={[
                "Insurance", "Audit", "3P Pentests", "Op. Costs",
                "MSSP", "Headcount", "R&D", "License", "Tooling"
              ]}
              data={[
                { Month: "Jan 2022", Insurance: 68, Audit: 71, "3P Pentests": 65, "Op. Costs": 83, MSSP: 84, Headcount: 86, "R&D": 88, Licensing: 76, Tooling: 55 },
                { Month: "Apr 2022", Insurance: 69, Audit: 72, "3P Pentests": 66, "Op. Costs": 84, MSSP: 85, Headcount: 87, "R&D": 89, Licensing: 77, Tooling: 56 },
                { Month: "Jul 2022", Insurance: 70, Audit: 73, "3P Pentests": 67, "Op. Costs": 85, MSSP: 85, Headcount: 87, "R&D": 89, Licensing: 78, Tooling: 57 },
                { Month: "Oct 2022", Insurance: 72, Audit: 74, "3P Pentests": 69, "Op. Costs": 86, MSSP: 86, Headcount: 88, "R&D": 90, Licensing: 79, Tooling: 59 },
                { Month: "Jan 2023", Insurance: 75, Audit: 76, "3P Pentests": 72, "Op. Costs": 85, MSSP: 83, Headcount: 88, "R&D": 90, Licensing: 80, Tooling: 62 },
                { Month: "Apr 2023", Insurance: 78, Audit: 77, "3P Pentests": 75, "Op. Costs": 86, MSSP: 82, Headcount: 89, "R&D": 91, Licensing: 81, Tooling: 65 },
                { Month: "Jul 2023", Insurance: 80, Audit: 78, "3P Pentests": 78, "Op. Costs": 86, MSSP: 82, Headcount: 89, "R&D": 91, Licensing: 82, Tooling: 67 },
                { Month: "Oct 2023", Insurance: 79, Audit: 80, "3P Pentests": 81, "Op. Costs": 87, MSSP: 83, Headcount: 90, "R&D": 92, Licensing: 83, Tooling: 70 },
                { Month: "Jan 2024", Insurance: 77, Audit: 82, "3P Pentests": 85, "Op. Costs": 86, MSSP: 83, Headcount: 91, "R&D": 91, Licensing: 84, Tooling: 75 },
                { Month: "Apr 2024", Insurance: 76, Audit: 84, "3P Pentests": 89, "Op. Costs": 86, MSSP: 83, Headcount: 92, "R&D": 90, Licensing: 85, Tooling: 80 },
                { Month: "Jul 2024", Insurance: 75, Audit: 85, "3P Pentests": 93, "Op. Costs": 86, MSSP: 83, Headcount: 93, "R&D": 90, Licensing: 85, Tooling: 85 },
                { Month: "Oct 2024", Insurance: 74, Audit: 86, "3P Pentests": 95, "Op. Costs": 87, MSSP: 84, Headcount: 94, "R&D": 91, Licensing: 86, Tooling: 88 },
              ]}
              index={"Month"}
              colors={distinctColors}
            />
          </div>
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm">
            <div className="flex w-full items-center gap-2">
              <span className="grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font">
                Control Effectiveness (%)
              </span>
              <ToggleGroup value="" onValueChange={(value: string) => { }}>
                <ToggleGroup.Item disabled={true} icon={null} value="fbc3d95e">
                  3mo
                </ToggleGroup.Item>
                <ToggleGroup.Item disabled={true} icon={null} value="b101169b">
                  1y
                </ToggleGroup.Item>
                <ToggleGroup.Item icon={null} value="c377ab45">
                  3y
                </ToggleGroup.Item>
              </ToggleGroup>
            </div>
            <LineChart
              className="h-64 w-full flex-none"
              categories={[
                "Insurance", "Audit", "3P Pentests", "Op. Costs",
                "MSSP", "Headcount", "R&D", "License", "Tooling"
              ]}
              data={[
                { Month: "Jan 2022", Insurance: 62, Audit: 68, "3P Pentests": 70, "Op. Costs": 79, MSSP: 81, Headcount: 83, "R&D": 85, Licensing: 72, Tooling: 58 },
                { Month: "Apr 2022", Insurance: 64, Audit: 70, "3P Pentests": 72, "Op. Costs": 80, MSSP: 82, Headcount: 84, "R&D": 86, Licensing: 73, Tooling: 60 },
                { Month: "Jul 2022", Insurance: 65, Audit: 71, "3P Pentests": 73, "Op. Costs": 81, MSSP: 83, Headcount: 85, "R&D": 87, Licensing: 74, Tooling: 61 },
                { Month: "Oct 2022", Insurance: 67, Audit: 72, "3P Pentests": 75, "Op. Costs": 82, MSSP: 84, Headcount: 86, "R&D": 88, Licensing: 75, Tooling: 63 },
                { Month: "Jan 2023", Insurance: 70, Audit: 74, "3P Pentests": 78, "Op. Costs": 83, MSSP: 85, Headcount: 87, "R&D": 89, Licensing: 76, Tooling: 66 },
                { Month: "Apr 2023", Insurance: 73, Audit: 75, "3P Pentests": 80, "Op. Costs": 84, MSSP: 86, Headcount: 88, "R&D": 90, Licensing: 77, Tooling: 69 },
                { Month: "Jul 2023", Insurance: 75, Audit: 76, "3P Pentests": 82, "Op. Costs": 85, MSSP: 87, Headcount: 89, "R&D": 91, Licensing: 78, Tooling: 71 },
                { Month: "Oct 2023", Insurance: 77, Audit: 78, "3P Pentests": 84, "Op. Costs": 86, MSSP: 88, Headcount: 90, "R&D": 92, Licensing: 79, Tooling: 74 },
                { Month: "Jan 2024", Insurance: 79, Audit: 80, "3P Pentests": 86, "Op. Costs": 87, MSSP: 89, Headcount: 91, "R&D": 93, Licensing: 80, Tooling: 77 },
                { Month: "Apr 2024", Insurance: 80, Audit: 82, "3P Pentests": 88, "Op. Costs": 88, MSSP: 90, Headcount: 92, "R&D": 94, Licensing: 81, Tooling: 80 },
                { Month: "Jul 2024", Insurance: 81, Audit: 83, "3P Pentests": 90, "Op. Costs": 89, MSSP: 91, Headcount: 93, "R&D": 95, Licensing: 82, Tooling: 82 },
                { Month: "Oct 2024", Insurance: 82, Audit: 84, "3P Pentests": 91, "Op. Costs": 90, MSSP: 92, Headcount: 94, "R&D": 96, Licensing: 83, Tooling: 84 },
              ]}
              index={"Month"}
              colors={distinctColors}
            />
          </div>
        </div>
        <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-200" />
        <span className="text-heading-3 font-heading-3 text-default-font">
          Test Findings &amp; Actions
        </span>
        <div className="flex w-full flex-wrap items-start gap-4">
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
            <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color">
              Alerts from red teaming &amp; tooling
            </span>
            <div className="flex items-center gap-2">
              <FilterBadge label="Critical" count="2" />
              <FilterBadge label="High" count="3" />
              <FilterBadge label="Medium" count="12" />
              <FilterBadge label="Low" count="7" />
            </div>
          </div>
        </div>
        <div className="flex w-full grow shrink-0 basis-0 flex-col items-center gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-2 shadow-sm">
          <div className="flex w-full flex-col items-start justify-center gap-4 pt-6">
            <span className="w-full text-heading-3 font-heading-3 text-default-font">
              Automated Testing
            </span>
          </div>
          <div className="flex w-full flex-col items-start">
            <div className="flex w-full flex-col items-start pb-2">
              <TimelineDivider>Today</TimelineDivider>
            </div>
            <div className="flex w-full items-start gap-4">
              <div className="flex flex-col items-center self-stretch">
                <div className="flex h-0.5 w-0.5 flex-none flex-col items-center gap-2 bg-default-background" />
                <div className="flex h-4 w-4 flex-none flex-col items-start gap-2 rounded-full border-2 border-solid border-brand-600" />
                <div className="flex w-0.5 grow shrink-0 basis-0 flex-col items-center gap-2 bg-brand-600" />
              </div>
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 pb-2.5">
                <div className="flex w-full flex-col items-start">
                  <span className="w-full text-body-bold font-body-bold text-default-font">
                    Daily automated red team performed
                  </span>
                  <span className="w-full text-body font-body text-default-font">
                    357/357 security controls tested
                  </span>
                </div>
                <span className="text-caption font-caption text-subtext-color">
                  3 hours ago
                </span>
              </div>
            </div>
            <div className="flex w-full items-start gap-4">
              <div className="flex flex-col items-center self-stretch pb-2.5">
                <div className="flex h-0.5 w-0.5 flex-none flex-col items-center gap-2 bg-brand-600" />
                <div className="flex h-4 w-4 flex-none flex-col items-start gap-2 rounded-full border-2 border-solid border-brand-600" />
                <div className="flex w-0.5 grow shrink-0 basis-0 flex-col items-center gap-2 bg-brand-600" />
              </div>
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 pb-2.5">
                <div className="flex w-full flex-col items-start">
                  <span className="w-full text-body-bold font-body-bold text-default-font">
                    Alerts found
                  </span>
                  <span className="w-full text-body font-body text-default-font">
                    We&#39;ve found 3 items that require your attention
                  </span>
                </div>
                <span className="w-full text-caption font-caption text-subtext-color">
                  3 hours ago
                </span>
                <Button
                  variant="neutral-secondary"
                  size="small"
                  iconRight="FeatherChevronRight"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
                >
                  View details
                </Button>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-start">
            <div className="flex w-full flex-col items-start pb-2">
              <TimelineDivider>Yesterday</TimelineDivider>
            </div>
            <div className="flex w-full items-start gap-4">
              <div className="flex flex-col items-center self-stretch">
                <div className="flex h-0.5 w-0.5 flex-none flex-col items-center gap-2 bg-default-background" />
                <div className="flex h-4 w-4 flex-none flex-col items-start gap-2 rounded-full border-2 border-solid border-brand-600" />
                <div className="flex w-0.5 grow shrink-0 basis-0 flex-col items-center gap-2 bg-brand-600" />
              </div>
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 pb-2.5">
                <div className="flex w-full flex-col items-start">
                  <span className="w-full text-body-bold font-body-bold text-default-font">
                    New CVE affects Veeam data backups
                  </span>
                  <span className="w-full text-body font-body text-default-font">
                    7 new tasks added to automated testing. Your Veeam instance
                    is susceptible.
                  </span>
                </div>
                <span className="text-caption font-caption text-subtext-color">
                  3:00 AM GMT
                </span>
                <div className="flex items-start gap-2">
                  <Badge variant="error">Severity: Critcal</Badge>
                  <Button
                    variant="neutral-secondary"
                    size="small"
                    iconRight="FeatherChevronRight"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
                  >
                    View details
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex w-full items-start gap-4">
              <div className="flex flex-col items-center self-stretch">
                <div className="flex h-0.5 w-0.5 flex-none flex-col items-center gap-2 bg-default-background" />
                <div className="flex h-4 w-4 flex-none flex-col items-start gap-2 rounded-full border-2 border-solid border-brand-600" />
                <div className="flex w-0.5 grow shrink-0 basis-0 flex-col items-center gap-2 bg-brand-600" />
              </div>
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 pb-2.5">
                <span className="w-full text-body-bold font-body-bold text-default-font">
                  Patch available and ready to deploy
                </span>
                <span className="text-caption font-caption text-subtext-color">
                  7:00 AM GMT
                </span>
                <Button
                  variant="neutral-secondary"
                  size="small"
                  iconRight="FeatherChevronRight"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
                >
                  View details
                </Button>
              </div>
            </div>
            <div className="flex w-full items-start gap-4">
              <div className="flex flex-col items-center self-stretch">
                <div className="flex h-0.5 w-0.5 flex-none flex-col items-center gap-2 bg-default-background" />
                <div className="flex h-4 w-4 flex-none flex-col items-start gap-2 rounded-full border-2 border-solid border-brand-600" />
                <div className="flex w-0.5 grow shrink-0 basis-0 flex-col items-center gap-2 bg-brand-600" />
              </div>
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 pb-2.5">
                <div className="flex w-full flex-col items-start">
                  <span className="w-full text-body-bold font-body-bold text-default-font">
                    Daily automated red team performed
                  </span>
                  <span className="w-full text-body font-body text-default-font">
                    350/350 security controls tested
                  </span>
                </div>
                <span className="text-caption font-caption text-subtext-color">
                  10:00 AM GMT
                </span>
              </div>
            </div>
            <div className="flex w-full items-start gap-4">
              <div className="flex flex-col items-center self-stretch pb-2.5">
                <div className="flex h-0.5 w-0.5 flex-none flex-col items-center gap-2 bg-brand-600" />
                <div className="flex h-4 w-4 flex-none flex-col items-start gap-2 rounded-full border-2 border-solid border-brand-600" />
                <div className="flex w-0.5 grow shrink-0 basis-0 flex-col items-center gap-2 bg-brand-600" />
              </div>
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 pb-2.5">
                <span className="w-full text-body-bold font-body-bold text-default-font">
                  No alerts found
                </span>
                <span className="w-full text-caption font-caption text-subtext-color">
                  10:05 AM GMT
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="brand-secondary"
            size="medium"
            iconRight="FeatherChevronRight"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
          >
            See more
          </Button>
        </div>
        <div className="flex w-full items-start gap-4">
          <div
            className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm cursor-pointer"
            onClick={() => handleCardClick("Access Management")}
          >
            <div className="flex w-full flex-col items-center gap-2">
              <span className="w-full text-heading-3 font-heading-3 text-default-font">
                Access Management
              </span>
              <Progress value={75} />
              <div className="flex w-full items-center gap-2">
                <span className="text-body font-body text-warning-700">
                  Effectiveness:
                </span>
                <span className="text-body font-body text-warning-700">
                  75%
                </span>
              </div>
              <div className="flex w-full flex-col items-center gap-2 rounded-md bg-neutral-50 px-4 py-4">
                <div className="flex w-full items-center gap-2">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Security Resources:
                  </span>
                  <span className="text-body font-body text-default-font">
                    9
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Metrics:
                  </span>
                  <span className="text-body font-body text-default-font">
                    9
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Findings &amp; Resources:
                  </span>
                  <span className="text-body font-body text-default-font">
                    6
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-col items-center gap-2 rounded-md bg-neutral-50 px-4 py-4">
                <span className="w-full text-body-bold font-body-bold text-default-font">
                  Key Finding
                </span>
                <span className="w-full text-body font-body text-default-font">
                  Only 60% of users in the sales and marketing team have enabled
                  Multi-Factor Authentication (MFA). The company average is 92%
                  for other business units.
                </span>
                <div className="flex w-full items-center gap-2">
                  <span className="text-body-bold font-body-bold text-warning-700">
                    Impact:
                  </span>
                  <span className="text-body-bold font-body-bold text-warning-700">
                    Medium
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm cursor-pointer"
            onClick={() => handleCardClick("Endpoint Protection")}
          >
            <div className="flex w-full flex-col items-center gap-2">
              <span className="w-full text-heading-3 font-heading-3 text-default-font">
                Endpoint Protection
              </span>
              <Progress value={85} />
              <div className="flex w-full items-center gap-2">
                <span className="text-body font-body text-success-700">
                  Effectiveness:
                </span>
                <span className="text-body font-body text-success-700">
                  85%
                </span>
              </div>
              <div className="flex w-full flex-col items-center gap-2 rounded-md bg-neutral-50 px-4 py-4">
                <div className="flex w-full items-center gap-2">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Security Resources:
                  </span>
                  <span className="text-body font-body text-default-font">
                    12
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Metrics:
                  </span>
                  <span className="text-body font-body text-default-font">
                    6
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Findings &amp; Resources:
                  </span>
                  <span className="text-body font-body text-default-font">
                    19
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-col items-center gap-2 rounded-md bg-neutral-50 px-4 py-4">
                <span className="w-full text-body-bold font-body-bold text-default-font">
                  Key Finding
                </span>
                <span className="w-full text-body font-body text-default-font">
                  20% increase in ransomware attempts targeting endpoint devices
                  in the last quarter.
                </span>
                <div className="flex w-full items-center gap-2">
                  <span className="text-body-bold font-body-bold text-error-700">
                    Impact:
                  </span>
                  <span className="text-body-bold font-body-bold text-error-700">
                    Critical
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full items-start gap-4">
          <div
            className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm cursor-pointer"
            onClick={() => handleCardClick("Provisioning")}
          >
            <div className="flex w-full flex-col items-center gap-2">
              <span className="w-full text-heading-3 font-heading-3 text-default-font">
                Provisioning
              </span>
              <Progress value={75} />
              <div className="flex w-full items-center gap-2">
                <span className="text-body font-body text-warning-700">
                  Effectiveness:
                </span>
                <span className="text-body font-body text-warning-700">72</span>
              </div>
              <div className="flex w-full flex-col items-center gap-2 rounded-md bg-neutral-50 px-4 py-4">
                <div className="flex w-full items-center gap-2">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Security Resources:
                  </span>
                  <span className="text-body font-body text-default-font">
                    7
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Metrics:
                  </span>
                  <span className="text-body font-body text-default-font">
                    9
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Findings &amp; Resources:
                  </span>
                  <span className="text-body font-body text-default-font">
                    6
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-col items-center gap-2 rounded-md bg-neutral-50 px-4 py-4">
                <span className="w-full text-body-bold font-body-bold text-default-font">
                  Key Finding
                </span>
                <span className="w-full text-body font-body text-default-font">
                  30% of user accounts remain active for &gt;10 days after
                  employee departure.
                </span>
                <div className="flex w-full items-center gap-2">
                  <span className="text-body-bold font-body-bold text-warning-700">
                    Impact:
                  </span>
                  <span className="text-body-bold font-body-bold text-warning-700">
                    Medium
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm cursor-pointer"
            onClick={() => handleCardClick("Data Storage")}
          >
            <div className="flex w-full flex-col items-center gap-2">
              <span className="w-full text-heading-3 font-heading-3 text-default-font">
                Data Storage
              </span>
              <Progress value={85} />
              <div className="flex w-full items-center gap-2">
                <span className="text-body font-body text-success-700">
                  Effectiveness:
                </span>
                <span className="text-body font-body text-success-700">
                  90%
                </span>
              </div>
              <div className="flex w-full flex-col items-center gap-2 rounded-md bg-neutral-50 px-4 py-4">
                <div className="flex w-full items-center gap-2">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Security Resources:
                  </span>
                  <span className="text-body font-body text-default-font">
                    6
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Metrics:
                  </span>
                  <span className="text-body font-body text-default-font">
                    9
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Findings &amp; Resources:
                  </span>
                  <span className="text-body font-body text-default-font">
                    6
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-col items-center gap-2 rounded-md bg-neutral-50 px-4 py-4">
                <span className="w-full text-body-bold font-body-bold text-default-font">
                  Key Finding
                </span>
                <span className="w-full text-body font-body text-default-font">
                  The last data backup integrity check was performed 35 days
                  ago.
                </span>
                <div className="flex w-full items-center gap-2">
                  <span className="text-body-bold font-body-bold text-error-700">
                    Impact:
                  </span>
                  <span className="text-body-bold font-body-bold text-error-700">
                    High
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full items-start gap-4">
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm">
            <div className="flex w-full flex-col items-center gap-2">
              <span className="w-full text-heading-3 font-heading-3 text-default-font">
                Data Protection
              </span>
              <Progress value={75} />
              <div className="flex w-full items-center gap-2">
                <span className="text-body font-body text-warning-700">
                  Effectiveness:
                </span>
                <span className="text-body font-body text-warning-700">
                  75%
                </span>
              </div>
              <div className="flex w-full flex-col items-center gap-2 rounded-md bg-neutral-50 px-4 py-4">
                <div className="flex w-full items-center gap-2">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Security Resources:
                  </span>
                  <span className="text-body font-body text-default-font">
                    9
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Metrics:
                  </span>
                  <span className="text-body font-body text-default-font">
                    9
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Findings &amp; Resources:
                  </span>
                  <span className="text-body font-body text-default-font">
                    6
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-col items-center gap-2 rounded-md bg-neutral-50 px-4 py-4">
                <span className="w-full text-body-bold font-body-bold text-default-font">
                  Key Finding
                </span>
                <span className="w-full text-body font-body text-default-font">
                  15% of sensitive data remains unencrypted, risking
                  unauthorized access and data breaches.
                </span>
                <div className="flex w-full items-center gap-2">
                  <span className="text-body-bold font-body-bold text-warning-700">
                    Impact:
                  </span>
                  <span className="text-body-bold font-body-bold text-warning-700">
                    Medium
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm">
            <div className="flex w-full flex-col items-center gap-2">
              <span className="w-full text-heading-3 font-heading-3 text-default-font">
                Network Access
              </span>
              <Progress value={85} />
              <div className="flex w-full items-center gap-2">
                <span className="text-body font-body text-success-700">
                  Effectiveness:
                </span>
                <span className="text-body font-body text-success-700">
                  82%
                </span>
              </div>
              <div className="flex w-full flex-col items-center gap-2 rounded-md bg-neutral-50 px-4 py-4">
                <div className="flex w-full items-center gap-2">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Security Resources:
                  </span>
                  <span className="text-body font-body text-default-font">
                    12
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Metrics:
                  </span>
                  <span className="text-body font-body text-default-font">
                    6
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Findings &amp; Resources:
                  </span>
                  <span className="text-body font-body text-default-font">
                    19
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-col items-center gap-2 rounded-md bg-neutral-50 px-4 py-4">
                <span className="w-full text-body-bold font-body-bold text-default-font">
                  Key Finding
                </span>
                <span className="w-full text-body font-body text-default-font">
                  20% of firewall rules are obsolete, potentially allowing
                  unauthorized network access.
                </span>
                <div className="flex w-full items-center gap-2">
                  <span className="text-body-bold font-body-bold text-success-700">
                    Impact:
                  </span>
                  <span className="text-body-bold font-body-bold text-success-700">
                    Low
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full items-start gap-4">
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm">
            <div className="flex w-full flex-col items-center gap-2">
              <span className="w-full text-heading-3 font-heading-3 text-default-font">
                Incidence Response
              </span>
              <Progress value={75} />
              <div className="flex w-full items-center gap-2">
                <span className="text-body font-body text-success-700">
                  Effectiveness:
                </span>
                <span className="text-body font-body text-success-700">
                  82%
                </span>
              </div>
              <div className="flex w-full flex-col items-center gap-2 rounded-md bg-neutral-50 px-4 py-4">
                <div className="flex w-full items-center gap-2">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Security Resources:
                  </span>
                  <span className="text-body font-body text-default-font">
                    9
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Metrics:
                  </span>
                  <span className="text-body font-body text-default-font">
                    9
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Findings &amp; Resources:
                  </span>
                  <span className="text-body font-body text-default-font">
                    6
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-col items-center gap-2 rounded-md bg-neutral-50 px-4 py-4">
                <span className="w-full text-body-bold font-body-bold text-default-font">
                  Key Finding
                </span>
                <span className="w-full text-body font-body text-default-font">
                  Average time to contain security incidents is 8 hours,
                  exceeding the 4-hour target.
                </span>
                <div className="flex w-full items-center gap-2">
                  <span className="text-body-bold font-body-bold text-success-700">
                    Impact:
                  </span>
                  <span className="text-body-bold font-body-bold text-success-700">
                    Low
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm">
            <div className="flex w-full flex-col items-center gap-2">
              <span className="w-full text-heading-3 font-heading-3 text-default-font">
                Security Awareness &amp; Training
              </span>
              <Progress value={85} />
              <div className="flex w-full items-center gap-2">
                <span className="text-body font-body text-warning-700">
                  Effectiveness:
                </span>
                <span className="text-body font-body text-warning-700">
                  79%
                </span>
              </div>
              <div className="flex w-full flex-col items-center gap-2 rounded-md bg-neutral-50 px-4 py-4">
                <div className="flex w-full items-center gap-2">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Security Resources:
                  </span>
                  <span className="text-body font-body text-default-font">
                    12
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Metrics:
                  </span>
                  <span className="text-body font-body text-default-font">
                    6
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Findings &amp; Resources:
                  </span>
                  <span className="text-body font-body text-default-font">
                    19
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-col items-center gap-2 rounded-md bg-neutral-50 px-4 py-4">
                <span className="w-full text-body-bold font-body-bold text-default-font">
                  Key Finding
                </span>
                <span className="w-full text-body font-body text-default-font">
                  25% of employees failed the latest phishing simulation test.
                </span>
                <div className="flex w-full items-center gap-2">
                  <span className="text-body-bold font-body-bold text-success-700">
                    Impact:
                  </span>
                  <span className="text-body-bold font-body-bold text-success-700">
                    Low
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm">
          <div className="flex w-full items-center gap-2">
            <span className="grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font">
              Security Control Maturity
            </span>
            <SubframeCore.DropdownMenu.Root>
              <SubframeCore.DropdownMenu.Trigger asChild={true}>
                <Button
                  variant="neutral-secondary"
                  icon={null}
                  iconRight="FeatherChevronDown"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
                >
                  Group by
                </Button>
              </SubframeCore.DropdownMenu.Trigger>
              <SubframeCore.DropdownMenu.Portal>
                <SubframeCore.DropdownMenu.Content
                  side="bottom"
                  align="end"
                  sideOffset={4}
                  asChild={true}
                >
                  <DropdownMenu>
                    <DropdownMenu.DropdownItem icon={null}>
                      Time Period
                    </DropdownMenu.DropdownItem>
                    <DropdownMenu.DropdownItem icon={null}>
                      Server
                    </DropdownMenu.DropdownItem>
                    <DropdownMenu.DropdownItem icon={null}>
                      Incidents
                    </DropdownMenu.DropdownItem>
                  </DropdownMenu>
                </SubframeCore.DropdownMenu.Content>
              </SubframeCore.DropdownMenu.Portal>
            </SubframeCore.DropdownMenu.Root>
          </div>
          <div className="flex w-full flex-col items-start gap-6 overflow-hidden overflow-auto mobile:overflow-auto mobile:max-w-full">
            <Table
              header={
                <Table.HeaderRow>
                  <Table.HeaderCell>Policy Group</Table.HeaderCell>
                  <Table.HeaderCell>Policies</Table.HeaderCell>
                  <Table.HeaderCell>Regulations</Table.HeaderCell>
                  <Table.HeaderCell>Frameworks</Table.HeaderCell>
                  <Table.HeaderCell className="h-8 w-auto flex-none">
                    Customers Requirements
                  </Table.HeaderCell>
                  <Table.HeaderCell>Coverage</Table.HeaderCell>
                  <Table.HeaderCell>Effectiveness</Table.HeaderCell>
                </Table.HeaderRow>
              }
            >
              <Table.Row>
                <Table.Cell>
                  <span className="text-body-bold font-body-bold text-neutral-700">
                    Endpoint Protection
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-neutral-500">
                    17
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Badge>DORA</Badge>
                  <Badge>GDPR</Badge>
                  <span className="text-body font-body text-default-font">
                    +3
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Badge>Badge</Badge>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <span className="text-body-bold font-body-bold text-neutral-700">
                    Access Management
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-neutral-500">
                    23
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Badge>CCPA</Badge>
                  <Badge>DORA</Badge>
                  <span className="text-body font-body text-default-font">
                    +3
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-neutral-500">
                    1m 10s
                  </span>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <span className="text-body-bold font-body-bold text-neutral-700">
                    Provisioning
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-neutral-500">
                    14
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Badge>NIS2</Badge>
                  <Badge>GDPR</Badge>
                  <span className="text-body font-body text-default-font">
                    +3
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-neutral-500">
                    2m 30s
                  </span>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <span className="text-body-bold font-body-bold text-neutral-700">
                    Data Storage
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-neutral-500">
                    25
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Badge>CCPA</Badge>
                  <Badge>PCI</Badge>
                  <span className="text-body font-body text-default-font">
                    +3
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-neutral-500">
                    4m 20s
                  </span>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <span className="text-body-bold font-body-bold text-neutral-700">
                    Network Management
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-neutral-500">
                    19
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Badge>SOX</Badge>
                  <Badge>GDPR</Badge>
                  <span className="text-body font-body text-default-font">
                    +3
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-neutral-500">
                    4m 20s
                  </span>
                </Table.Cell>
              </Table.Row>
            </Table>
          </div>
          <div className="flex w-full items-center justify-center gap-4">
            <span className="grow shrink-0 basis-0 text-body font-body text-subtext-color">
              Showing 1 – 5 of 8
            </span>
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="neutral-secondary"
                size="medium"
                icon={null}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
              >
                Prev
              </Button>
              <Button
                variant="neutral-secondary"
                size="medium"
                iconRight={null}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
        {isDrawerOpen && selectedTheme && (
          <div
            ref={drawerRef}
            className="fixed inset-y-0 right-0 w-1/2 bg-white shadow-lg transform translate-x-0 transition-transform duration-300 ease-in-out flex flex-col"
          >
            <div className="flex-grow overflow-y-auto p-6">
              {renderThemeDetails()}
            </div>
          </div>
        )}
      </div>
    </DefaultPageLayout>
  );
}

export default DashboardWithAnalytics;