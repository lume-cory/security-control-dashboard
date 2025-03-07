"use client";

import React from "react";
import { DefaultPageLayout } from "@/subframe/layouts/DefaultPageLayout";
import { IconWithBackground } from "@/subframe/components/IconWithBackground";
import { Breadcrumbs } from "@/subframe/components/Breadcrumbs";
import { TextField } from "@/subframe/components/TextField";
import { Select } from "@/subframe/components/Select-singleton";
import { FilterBadge } from "@/subframe/components/FilterBadge";
import { Badge } from "@/subframe/components/Badge";
import { BarChart } from "@/subframe/components/BarChart";
import { Button } from "@/subframe/components/Button";
import * as SubframeCore from "@subframe/core";
import { PieChart } from "@/subframe/components/PieChart";
import { useRouter } from "next/navigation";
import { SecurityTicketTable } from "./SecurityTicketTable";

const getMonthName = (monthIndex: number): string => {
  const date = new Date();
  date.setMonth(monthIndex);
  return date.toLocaleString('default', { month: 'short' });
};

function SecurityTicketReport() {
  const router = useRouter();
  const [selectedMonths, setSelectedMonths] = React.useState(6);
  const [slackSourceCount, setSlackSourceCount] = React.useState(421);
  const [zendeskSourceCount, setZendeskSourceCount] = React.useState(1240);
  const [emailSourceCount, setEmailSourceCount] = React.useState(132);
  const [phishingTagsSourceCount, setPhishingTagsSourceCount] = React.useState(279);
  const [engineeringInboundCount, setEngineeringInboundCount] = React.useState(527);
  const [salesInboundCount, setSalesInboundCount] = React.useState(356);
  const [itInboundCount, setItInboundCount] = React.useState(295);
  const [supportInboundCount, setSupportInboundCount] = React.useState(132);
  const [execInboundCount, setExecInboundCount] = React.useState(32);
  const [auditInboundCount, setAuditInboundCount] = React.useState(45);
  const [regulatorInboundCount, setRegulatorInboundCount] = React.useState(53);

  const handleMonthChange = (value: string) => {
    setSelectedMonths(parseInt(value));
  };

  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start gap-6 px-6 py-6">
        <div className="flex w-full items-start gap-4 mobile:flex-col mobile:items-center mobile:justify-start mobile:gap-6">
          <IconWithBackground size="medium" icon="FeatherRocket" />
          <span className="text-heading-2 font-heading-2 text-default-font mobile:text-center">
            Acme Inc
          </span>
        </div>
        <div className="flex w-full items-center justify-between">
          <Breadcrumbs>
            <Breadcrumbs.Item onClick={() => router.push('/reports')}>
              Reports
            </Breadcrumbs.Item>
            <Breadcrumbs.Divider />
            <Breadcrumbs.Item active={true}>
              Security Ticket Triage
            </Breadcrumbs.Item>
          </Breadcrumbs>
        </div>
        <div className="flex w-full items-start gap-2">
          <TextField
            className="h-auto grow shrink-0 basis-0"
            label=""
            helpText=""
            icon="FeatherSearch"
          >
            <TextField.Input
              placeholder="Search"
              value=""
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => { }}
            />
          </TextField>
          <Select
            variant="filled"
            label=""
            placeholder="6 months"
            helpText=""
            value={selectedMonths.toString()}
            onValueChange={handleMonthChange}
          >
            <Select.Item value="1">1 month</Select.Item>
            <Select.Item value="3">3 months</Select.Item>
            <Select.Item value="6">6 months</Select.Item>
            <Select.Item value="12">1 year</Select.Item>
            <Select.Item value="24">2 years</Select.Item>
            <Select.Item value="36">3 years</Select.Item>
          </Select>
        </div>
        <div className="flex w-full flex-wrap items-start gap-4">
          <div className="flex flex-col items-start gap-4 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
            <span className="line-clamp-1 w-full text-body-bold font-body-bold text-default-font">
              Severity
            </span>
            <div className="flex items-center gap-2">
              <FilterBadge label="Urgent" count="335" selected={false} />
              <Badge variant="error" icon="FeatherArrowUp">
                13%
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <FilterBadge label="High" count="945" selected={false} />
              <Badge variant="success" icon="FeatherArrowDown">
                5%
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <FilterBadge label="Medium" count="823" selected={false} />
              <Badge variant="neutral" icon="FeatherArrowRight">
                0%
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <FilterBadge label="Low" count="249" selected={false} />
              <Badge variant="success" icon="FeatherArrowDown">
                25%
              </Badge>
            </div>
          </div>
          <div className="flex grow shrink-0 basis-0 flex-col flex-wrap items-start gap-4">
            <div className="flex w-full flex-wrap items-start gap-4">
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                <span className="line-clamp-1 w-full text-body-bold font-body-bold text-default-font">
                  Resolved
                </span>
                <div className="flex w-full flex-col items-start gap-2">
                  <span className="text-heading-2 font-heading-2 text-default-font">
                    2.4k
                  </span>
                  <Badge variant="neutral" icon="FeatherArrowUp">
                    33%
                  </Badge>
                </div>
              </div>
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                <span className="line-clamp-1 w-full text-body-bold font-body-bold text-default-font">
                  Missed SLAs
                </span>
                <div className="flex w-full flex-col items-start gap-2">
                  <span className="text-heading-2 font-heading-2 text-default-font">
                    45
                  </span>
                  <Badge variant="success" icon="FeatherArrowDown">
                    15%
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex w-full items-start gap-2">
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                <span className="line-clamp-1 w-full text-body-bold font-body-bold text-default-font">
                  Average Agent Hours Spent
                </span>
                <div className="flex w-full flex-col items-start gap-2">
                  <span className="text-heading-2 font-heading-2 text-default-font">
                    3.4
                  </span>
                  <Badge variant="success" icon="FeatherArrowDown">
                    73%
                  </Badge>
                </div>
              </div>
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                <span className="line-clamp-1 w-full text-body-bold font-body-bold text-default-font">
                  Average Time to Resolve
                </span>
                <div className="flex w-full flex-col items-start gap-2">
                  <span className="text-heading-2 font-heading-2 text-default-font">
                    4.4 days
                  </span>
                  <Badge variant="success" icon="FeatherArrowDown">
                    25%
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm">
          <span className="line-clamp-1 w-full text-heading-3 font-heading-3 text-default-font">
            Ticket Severity
          </span>
          <BarChart
            stacked={true}
            categories={["Urgent", "High", "Medium", "Low"]}
            data={[
              { month: getMonthName(new Date().getMonth() - 6), Urgent: 120, High: 110, Medium: 100, Low: 90 },
              { month: getMonthName(new Date().getMonth() - 5), Urgent: 130, High: 95, Medium: 105, Low: 115 },
              { month: getMonthName(new Date().getMonth() - 4), Urgent: 115, High: 105, Medium: 110, Low: 120 },
              { month: getMonthName(new Date().getMonth() - 3), Urgent: 125, High: 120, Medium: 90, Low: 130 },
              { month: getMonthName(new Date().getMonth() - 2), Urgent: 110, High: 130, Medium: 85, Low: 140 },
              { month: getMonthName(new Date().getMonth() -1), Urgent: 135, High: 100, Medium: 95, Low: 150 },
            ]}
            index={"month"}
          />
        </div>
        <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
          <div className="flex w-full items-center gap-2">
            <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font">
              Inbound Sources
            </span>
            <Button
              disabled={false}
              variant="brand-secondary"
              size="medium"
              icon={null}
              iconRight={null}
              loading={false}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
            >
              See All
            </Button>
          </div>
          <div className="flex w-full items-center gap-2">
            <div className="flex grow shrink-0 basis-0 flex-wrap items-start gap-4">
              <div className="flex grow shrink-0 basis-0 flex-wrap items-start gap-4">
                <div className="flex min-w-[160px] grow shrink-0 basis-0 flex-col items-start gap-1 rounded-md bg-neutral-50 px-6 py-6">
                  <div className="flex w-full items-center gap-2">
                    <span className="line-clamp-1 grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                      Slack
                    </span>
                    <span className="text-body-bold font-body-bold text-success-600">
                      +9.3%
                    </span>
                  </div>
                  <div className="flex w-full items-center gap-2">
                    <SubframeCore.Icon
                      className="text-heading-1 font-heading-1 text-default-font"
                      name="FeatherSlack"
                    />
                    <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-1 font-heading-1 text-brand-700">
                      {slackSourceCount}
                    </span>
                  </div>
                  <span className="line-clamp-1 w-full text-caption font-caption text-subtext-color">
                    {`${new Date(new Date().setMonth(new Date().getMonth() - selectedMonths)).toLocaleDateString()} – Today`}
                  </span>
                </div>
                <div className="flex min-w-[160px] grow shrink-0 basis-0 flex-col items-start gap-1 rounded-md bg-neutral-50 px-6 py-6">
                  <div className="flex w-full items-center gap-2">
                    <span className="line-clamp-1 grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                      Zendesk
                    </span>
                    <span className="text-body-bold font-body-bold text-success-600">
                      +15.1%
                    </span>
                  </div>
                  <div className="flex w-full items-center gap-2">
                    <SubframeCore.Icon
                      className="text-heading-1 font-heading-1 text-default-font"
                      name="FeatherTicket"
                    />
                    <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-1 font-heading-1 text-brand-700">
                      {zendeskSourceCount}
                    </span>
                  </div>
                  <span className="line-clamp-1 w-full text-caption font-caption text-subtext-color">
                    {`${new Date(new Date().setMonth(new Date().getMonth() - selectedMonths)).toLocaleDateString()} – Today`}
                  </span>
                </div>
              </div>
              <div className="flex grow shrink-0 basis-0 flex-wrap items-start gap-4">
                <div className="flex min-w-[160px] grow shrink-0 basis-0 flex-col items-start gap-1 rounded-md bg-neutral-50 px-6 py-6">
                  <div className="flex w-full items-center gap-2">
                    <span className="line-clamp-1 grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                      Email
                    </span>
                    <span className="text-body-bold font-body-bold text-success-600">
                      +1.3%
                    </span>
                  </div>
                  <div className="flex w-full items-center gap-2">
                    <SubframeCore.Icon
                      className="text-heading-1 font-heading-1 text-default-font"
                      name="FeatherMail"
                    />
                    <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-1 font-heading-1 text-brand-700">
                      {emailSourceCount}
                    </span>
                  </div>
                  <span className="line-clamp-1 w-full text-caption font-caption text-subtext-color">
                    {`${new Date(new Date().setMonth(new Date().getMonth() - selectedMonths)).toLocaleDateString()} – Today`}
                  </span>
                </div>
                <div className="flex min-w-[160px] grow shrink-0 basis-0 flex-col items-start gap-1 rounded-md bg-neutral-50 px-6 py-6">
                  <div className="flex w-full items-center gap-2">
                    <span className="line-clamp-1 grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                      Phishing Tags
                    </span>
                    <span className="text-body-bold font-body-bold text-success-600">
                      +23.3%
                    </span>
                  </div>
                  <div className="flex w-full items-center gap-2">
                    <SubframeCore.Icon
                      className="text-heading-1 font-heading-1 text-default-font"
                      name="FeatherFish"
                    />
                    <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-1 font-heading-1 text-brand-700">
                      {phishingTagsSourceCount}
                    </span>
                  </div>
                  <span className="line-clamp-1 w-full text-caption font-caption text-subtext-color">
                    {`${new Date(new Date().setMonth(new Date().getMonth() - selectedMonths)).toLocaleDateString()} – Today`}
                  </span>
                </div>
              </div>
            </div>
            <PieChart
              className="h-auto w-52 flex-none self-stretch"
              category={"Count"}
              data={[
                { Source: "Slack", Count: slackSourceCount },
                { Source: "Zendesk", Count: zendeskSourceCount },
                { Source: "Email", Count: emailSourceCount },
                { Source: "Phishing Tags", Count: phishingTagsSourceCount },
              ]}
              index={"Source"}
            />
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
          <div className="flex w-full items-center gap-2">
            <div className="flex grow shrink-0 basis-0 items-center gap-2">
              <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font">
                Inbound Teams
              </span>
            </div>
            <Button
              disabled={false}
              variant="brand-secondary"
              size="medium"
              icon={null}
              iconRight={null}
              loading={false}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
            >
              See All
            </Button>
          </div>
          <div className="flex w-full flex-wrap items-start gap-4">
            <PieChart
              className="h-auto w-64 flex-none self-stretch"
              category={"Issues"}
              data={[
                { Department: "Engineering", Issues: engineeringInboundCount },
                { Department: "Sales", Issues: salesInboundCount },
                { Department: "IT", Issues: itInboundCount },
                { Department: "Support", Issues: supportInboundCount },
                { Department: "Exec", Issues: execInboundCount },
                { Department: "Audit", Issues: auditInboundCount },
                { Department: "Regulator", Issues: regulatorInboundCount },
              ]}
              index={"Department"}
            />
            <div className="flex grow shrink-0 basis-0 flex-wrap items-start gap-4">
              <div className="flex min-w-[160px] grow shrink-0 basis-0 flex-col items-start gap-1 rounded-md bg-neutral-50 px-6 py-6">
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                    Engineering
                  </span>
                  <span className="text-body-bold font-body-bold text-error-700">
                    +1.3%
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-1 font-heading-1 text-brand-700">
                    {engineeringInboundCount}
                  </span>
                </div>
                <span className="line-clamp-1 w-full text-caption font-caption text-subtext-color">
                  {`${new Date(new Date().setMonth(new Date().getMonth() - selectedMonths)).toLocaleDateString()} – Today`}
                </span>
              </div>
              <div className="flex min-w-[160px] grow shrink-0 basis-0 flex-col items-start gap-1 rounded-md bg-neutral-50 px-6 py-6">
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                    Sales
                  </span>
                  <span className="text-body-bold font-body-bold text-error-700">
                    +6.1%
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-1 font-heading-1 text-brand-700">
                    {salesInboundCount}
                  </span>
                </div>
                <span className="line-clamp-1 w-full text-caption font-caption text-subtext-color">
                  {`${new Date(new Date().setMonth(new Date().getMonth() - selectedMonths)).toLocaleDateString()} – Today`}
                </span>
              </div>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-wrap items-start gap-4">
              <div className="flex min-w-[160px] grow shrink-0 basis-0 flex-col items-start gap-1 rounded-md bg-neutral-50 px-6 py-6">
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                    IT
                  </span>
                  <span className="text-body-bold font-body-bold text-success-600">
                    -5.3%
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-1 font-heading-1 text-brand-700">
                    {itInboundCount}
                  </span>
                </div>
                <span className="line-clamp-1 w-full text-caption font-caption text-subtext-color">
                  {`${new Date(new Date().setMonth(new Date().getMonth() - selectedMonths)).toLocaleDateString()} – Today`}
                </span>
              </div>
              <div className="flex min-w-[160px] grow shrink-0 basis-0 flex-col items-start gap-1 rounded-md bg-neutral-50 px-6 py-6">
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                    Customer Support
                  </span>
                  <span className="text-body-bold font-body-bold text-success-600">
                    -2.4%
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-1 font-heading-1 text-brand-700">
                    {supportInboundCount}
                  </span>
                </div>
                <span className="line-clamp-1 w-full text-caption font-caption text-subtext-color">
                  {`${new Date(new Date().setMonth(new Date().getMonth() - selectedMonths)).toLocaleDateString()} – Today`}
                </span>
              </div>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-wrap items-start gap-4">
              <div className="flex min-w-[160px] grow shrink-0 basis-0 flex-col items-start gap-1 rounded-md bg-neutral-50 px-6 py-6">
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                    Exec
                  </span>
                  <span className="text-body-bold font-body-bold text-success-600">
                    -2.4%
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-1 font-heading-1 text-brand-700">
                    {execInboundCount}
                  </span>
                </div>
                <span className="line-clamp-1 w-full text-caption font-caption text-subtext-color">
                  {`${new Date(new Date().setMonth(new Date().getMonth() - selectedMonths)).toLocaleDateString()} – Today`}
                </span>
              </div>
              <div className="flex min-w-[160px] grow shrink-0 basis-0 flex-col items-start gap-1 rounded-md bg-neutral-50 px-6 py-6">
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                    Audit
                  </span>
                  <span className="text-body-bold font-body-bold text-error-700">
                    +8.4%
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-1 font-heading-1 text-brand-700">
                    {auditInboundCount}
                  </span>
                </div>
                <span className="line-clamp-1 w-full text-caption font-caption text-subtext-color">
                  {`${new Date(new Date().setMonth(new Date().getMonth() - selectedMonths)).toLocaleDateString()} – Today`}
                </span>
              </div>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-wrap items-start gap-4">
              <div className="flex min-w-[160px] grow shrink-0 basis-0 flex-col items-start gap-1 rounded-md bg-neutral-50 px-6 py-6">
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                    Regulator
                  </span>
                  <span className="text-body-bold font-body-bold text-error-700">
                    +10.3%
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-1 font-heading-1 text-brand-700">
                    {regulatorInboundCount}
                  </span>
                </div>
                <span className="line-clamp-1 w-full text-caption font-caption text-subtext-color">
                  {`${new Date(new Date().setMonth(new Date().getMonth() - selectedMonths)).toLocaleDateString()} – Today`}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
          <div className="flex w-full items-center gap-2">
            <div className="flex grow shrink-0 basis-0 items-center gap-2">
              <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font">
                Ticket Themes
              </span>
            </div>
            <Button
              disabled={false}
              variant="brand-secondary"
              size="medium"
              icon={null}
              iconRight={null}
              loading={false}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
            >
              See All
            </Button>
          </div>
          <div className="flex w-full flex-col flex-wrap items-center gap-4">
            <div className="flex w-full items-center gap-4">
              <div className="flex grow shrink-0 basis-0 flex-col items-center gap-4 self-stretch px-6 py-6">
                <div className="flex items-center gap-2">
                  <SubframeCore.Icon
                    className="text-heading-1 font-heading-1 text-default-font"
                    name="FeatherFingerprint"
                  />
                  <div className="flex flex-col items-start gap-1">
                    <span className="line-clamp-1 w-full text-body-bold font-body-bold text-default-font">
                      Auth
                    </span>
                    <span className="line-clamp-1 w-full text-caption font-caption text-subtext-color">
                      179 tickets
                    </span>
                  </div>
                </div>
                <span className="line-clamp-3 text-body font-body text-subtext-color text-center">
                  Setting up authentication and authorization into apps
                </span>
                <Button
                  variant="brand-secondary"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
                >
                  See Examples
                </Button>
              </div>
              <div className="flex w-px flex-none flex-col items-center gap-2 self-stretch bg-neutral-border" />
              <div className="flex grow shrink-0 basis-0 flex-col items-center gap-4 self-stretch px-6 py-6">
                <div className="flex items-center gap-2">
                  <SubframeCore.Icon
                    className="text-heading-1 font-heading-1 text-default-font"
                    name="FeatherLayoutGrid"
                  />
                  <div className="flex flex-col items-start gap-1">
                    <span className="line-clamp-1 w-full text-body-bold font-body-bold text-default-font">
                      App & Vendor Install Requests
                    </span>
                    <span className="line-clamp-1 w-full text-caption font-caption text-subtext-color">
                      174 tickets
                    </span>
                  </div>
                </div>
                <span className="line-clamp-3 text-body font-body text-subtext-color text-center">
                  Requests from employees to use applications, triaged and approved based 
                  on residual risk of the vendor. 
                </span>
                <Button
                  variant="brand-secondary"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
                >
                  See Examples
                </Button>
              </div>
              <div className="flex w-px flex-none flex-col items-center gap-2 self-stretch bg-neutral-border" />
              <div className="flex grow shrink-0 basis-0 flex-col items-center gap-4 self-stretch px-6 py-6">
                <div className="flex items-center gap-2">
                  <SubframeCore.Icon
                    className="text-heading-1 font-heading-1 text-default-font"
                    name="FeatherShieldQuestion"
                  />
                  <div className="flex flex-col items-start gap-1">
                    <span className="line-clamp-1 w-full text-body-bold font-body-bold text-default-font">
                      External Security Questions
                    </span>
                    <span className="line-clamp-1 w-full text-caption font-caption text-subtext-color">
                      124 tickets
                    </span>
                  </div>
                </div>
                <span className="line-clamp-3 text-body font-body text-subtext-color text-center">
                  Requests to fill out questionnaires or clarify security practices from
                  clients (customers, sales prospects, partners, vendors, auditors, 
                  or regulators)
                </span>
                <Button
                  variant="brand-secondary"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
                >
                  See Examples
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
          <div className="flex w-full items-center gap-2">
            <div className="flex grow shrink-0 basis-0 items-center gap-2">
              <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font">
                Potential Factors for Delayed Resolution
              </span>
            </div>
            <Button
              disabled={false}
              variant="brand-secondary"
              size="medium"
              icon={null}
              iconRight={null}
              loading={false}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
            >
              See All
            </Button>
          </div>
          <div className="flex w-full flex-col flex-wrap items-center gap-4">
            <div className="flex w-full items-center gap-4">
              <div className="flex grow shrink-0 basis-0 flex-col items-center gap-4 self-stretch px-6 py-6">
                <div className="flex items-center gap-2">
                  <SubframeCore.Icon
                    className="text-heading-1 font-heading-1 text-default-font"
                    name="FeatherTimer"
                  />
                  <div className="flex flex-col items-start gap-1">
                    <span className="line-clamp-1 w-full text-body-bold font-body-bold text-default-font">
                      Expert Availability
                    </span>
                    <span className="line-clamp-1 w-full text-caption font-caption text-subtext-color">
                      54 tickets
                    </span>
                  </div>
                </div>
                <span className="line-clamp-3 text-body font-body text-subtext-color text-center">
                  Expert that the agent needed to confer with not available or
                  response time slow
                </span>
                <Button
                  variant="brand-secondary"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
                >
                  See Examples
                </Button>
              </div>
              <div className="flex w-px flex-none flex-col items-center gap-2 self-stretch bg-neutral-border" />
              <div className="flex grow shrink-0 basis-0 flex-col items-center gap-4 self-stretch px-6 py-6">
                <div className="flex items-center gap-2">
                  <SubframeCore.Icon
                    className="text-heading-1 font-heading-1 text-default-font"
                    name="FeatherMailWarning"
                  />
                  <div className="flex flex-col items-start gap-1">
                    <span className="line-clamp-1 w-full text-body-bold font-body-bold text-default-font">
                      Dead End Email Alias
                    </span>
                    <span className="line-clamp-1 w-full text-caption font-caption text-subtext-color">
                      43 tickets
                    </span>
                  </div>
                </div>
                <span className="line-clamp-3 text-body font-body text-subtext-color text-center">
                  An alias misconfiguration led to many emails being bounced
                  back to the user
                </span>
                <Button
                  variant="brand-secondary"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
                >
                  See Examples
                </Button>
              </div>
              <div className="flex w-px flex-none flex-col items-center gap-2 self-stretch bg-neutral-border" />
              <div className="flex grow shrink-0 basis-0 flex-col items-center gap-4 self-stretch px-6 py-6">
                <div className="flex items-center gap-2">
                  <SubframeCore.Icon
                    className="text-heading-1 font-heading-1 text-default-font"
                    name="FeatherFileX2"
                  />
                  <div className="flex flex-col items-start gap-1">
                    <span className="line-clamp-1 w-full text-body-bold font-body-bold text-default-font">
                      Documentation Gaps
                    </span>
                    <span className="line-clamp-1 w-full text-caption font-caption text-subtext-color">
                      73 tickets
                    </span>
                  </div>
                </div>
                <span className="line-clamp-3 text-body font-body text-subtext-color text-center">
                  The user and help desk agent were unable to find related docs
                  or KB articles
                </span>
                <Button
                  variant="brand-secondary"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
                >
                  See Examples
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
          <div className="flex w-full items-center gap-2">
            <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font">
              Estimated Savings
            </span>
          </div>
          <div className="flex w-full flex-col gap-4">
            {/* App Requests Group */}
            <div className="flex w-full flex-row items-start gap-4">
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1 rounded-md bg-neutral-50 px-6 py-6">
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                    App Requests
                  </span>
                  <span className="text-body-bold font-body-bold text-success-600">
                    -15.3%
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-1 font-heading-1 text-brand-700">
                    2.1 days
                  </span>
                </div>
                <span className="text-caption font-caption text-subtext-color">
                  Time to Resolve
                </span>
              </div>
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1 rounded-md bg-neutral-50 px-6 py-6">
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                    App Request Triage
                  </span>
                  <span className="text-body-bold font-body-bold text-success-600">
                    -23.1%
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-1 font-heading-1 text-brand-700">
                    1.2 hrs
                  </span>
                </div>
                <span className="text-caption font-caption text-subtext-color">
                  Hours Spent
                </span>
              </div>
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1 rounded-md bg-brand-50 px-6 py-6">
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                    Total Time Saved
                  </span>
                  <span className="text-caption font-caption text-subtext-color">
                    Compared to baseline
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-1 font-heading-1 text-brand-700">
                    156.4 hrs
                  </span>
                </div>
                <span className="text-caption font-caption text-subtext-color">
                  Last {selectedMonths} months
                </span>
              </div>
            </div>

            {/* Eng Design Reviews Group */}
            <div className="flex w-full flex-row items-start gap-4">
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1 rounded-md bg-neutral-50 px-6 py-6">
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                    Eng Design Reviews
                  </span>
                  <span className="text-body-bold font-body-bold text-success-600">
                    -8.4%
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-1 font-heading-1 text-brand-700">
                    3.4 days
                  </span>
                </div>
                <span className="text-caption font-caption text-subtext-color">
                  Time to Resolve
                </span>
              </div>
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1 rounded-md bg-neutral-50 px-6 py-6">
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                    Eng Design Triage
                  </span>
                  <span className="text-body-bold font-body-bold text-success-600">
                    -12.7%
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-1 font-heading-1 text-brand-700">
                    2.8 hrs
                  </span>
                </div>
                <span className="text-caption font-caption text-subtext-color">
                  Hours Spent
                </span>
              </div>
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1 rounded-md bg-brand-50 px-6 py-6">
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                    Total Time Saved
                  </span>
                  <span className="text-caption font-caption text-subtext-color">
                    Compared to baseline
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-1 font-heading-1 text-brand-700">
                    243.2 hrs
                  </span>
                </div>
                <span className="text-caption font-caption text-subtext-color">
                  Last {selectedMonths} months
                </span>
              </div>
            </div>

            {/* Client Requests Group */}
            <div className="flex w-full flex-row items-start gap-4">
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1 rounded-md bg-neutral-50 px-6 py-6">
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                    Client Requests
                  </span>
                  <span className="text-body-bold font-body-bold text-success-600">
                    -19.2%
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-1 font-heading-1 text-brand-700">
                    1.8 days
                  </span>
                </div>
                <span className="text-caption font-caption text-subtext-color">
                  Time to Resolve
                </span>
              </div>
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1 rounded-md bg-neutral-50 px-6 py-6">
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                    Client Request Triage
                  </span>
                  <span className="text-body-bold font-body-bold text-success-600">
                    -25.8%
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-1 font-heading-1 text-brand-700">
                    0.9 hrs
                  </span>
                </div>
                <span className="text-caption font-caption text-subtext-color">
                  Hours Spent
                </span>
              </div>
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1 rounded-md bg-brand-50 px-6 py-6">
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                    Total Time Saved
                  </span>
                  <span className="text-caption font-caption text-subtext-color">
                    Compared to baseline
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-1 font-heading-1 text-brand-700">
                    189.6 hrs
                  </span>
                </div>
                <span className="text-caption font-caption text-subtext-color">
                  Last {selectedMonths} months
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
          <div className="flex w-full items-center gap-2">
            <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font">
              Recent Security Tickets
            </span>
          </div>
          <SecurityTicketTable />
        </div>
        <hr className="w-full border-t border-neutral-border" />
      </div>
    </DefaultPageLayout>
  );
}

export default SecurityTicketReport;