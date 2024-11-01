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

function SecurityTicketReport() {
  const router = useRouter();

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
            value={undefined}
            onValueChange={(value: string) => { }}
          >
            <Select.Item value="1 month">1 month</Select.Item>
            <Select.Item value="3 months">3 months</Select.Item>
            <Select.Item value="6 months">6 months</Select.Item>
            <Select.Item value="1 year">1 year</Select.Item>
            <Select.Item value="2 years">2 years</Select.Item>
            <Select.Item value="3 years">3 years</Select.Item>
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
              { Year: "May", Urgent: 120, High: 110, Medium: 100, Low: 90 },
              { Year: "June", Urgent: 130, High: 95, Medium: 105, Low: 115 },
              { Year: "July", Urgent: 115, High: 105, Medium: 110, Low: 120 },
              { Year: "Aug", Urgent: 125, High: 120, Medium: 90, Low: 130 },
              { Year: "Sep", Urgent: 110, High: 130, Medium: 85, Low: 140 },
              { Year: "Oct", Urgent: 135, High: 100, Medium: 95, Low: 150 },
            ]}
            index={"Year"}
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
                      421
                    </span>
                  </div>
                  <span className="line-clamp-1 w-full text-caption font-caption text-subtext-color">
                    May 31 – Today
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
                      1.24k
                    </span>
                  </div>
                  <span className="line-clamp-1 w-full text-caption font-caption text-subtext-color">
                    May 31 – Today
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
                      132
                    </span>
                  </div>
                  <span className="line-clamp-1 w-full text-caption font-caption text-subtext-color">
                    May 31 – Today
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
                      279
                    </span>
                  </div>
                  <span className="line-clamp-1 w-full text-caption font-caption text-subtext-color">
                    May 31 – Today
                  </span>
                </div>
              </div>
            </div>
            <PieChart
              className="h-auto w-52 flex-none self-stretch"
              category={"Count"}
              data={[
                { Source: "Slack", Count: 421 },
                { Source: "Zendesk", Count: 1240 },
                { Source: "Email", Count: 132 },
                { Source: "Phishing Tags", Count: 279 },
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
              className="h-auto w-52 flex-none self-stretch"
              category={"Graduates"}
              data={[
                { Major: "Psychology", Graduates: 180 },
                { Major: "Business", Graduates: 160 },
                { Major: "Biology", Graduates: 140 },
              ]}
              index={"Major"}
            />
            <div className="flex grow shrink-0 basis-0 flex-wrap items-start gap-4">
              <div className="flex min-w-[160px] grow shrink-0 basis-0 flex-col items-start gap-1 rounded-md bg-neutral-50 px-6 py-6">
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                    Engineering
                  </span>
                  <span className="text-body-bold font-body-bold text-success-600">
                    +1.3%
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-1 font-heading-1 text-brand-700">
                    527
                  </span>
                </div>
                <span className="line-clamp-1 w-full text-caption font-caption text-subtext-color">
                  May 31 – Today
                </span>
              </div>
              <div className="flex min-w-[160px] grow shrink-0 basis-0 flex-col items-start gap-1 rounded-md bg-neutral-50 px-6 py-6">
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                    Sales
                  </span>
                  <span className="text-body-bold font-body-bold text-success-600">
                    +6.1%
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-1 font-heading-1 text-brand-700">
                    356
                  </span>
                </div>
                <span className="line-clamp-1 w-full text-caption font-caption text-subtext-color">
                  May 31 – Today
                </span>
              </div>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-wrap items-start gap-4">
              <div className="flex min-w-[160px] grow shrink-0 basis-0 flex-col items-start gap-1 rounded-md bg-neutral-50 px-6 py-6">
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                    IT
                  </span>
                  <span className="text-body-bold font-body-bold text-error-700">
                    -5.3%
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-1 font-heading-1 text-brand-700">
                    295
                  </span>
                </div>
                <span className="line-clamp-1 w-full text-caption font-caption text-subtext-color">
                  May 31 – Today
                </span>
              </div>
              <div className="flex min-w-[160px] grow shrink-0 basis-0 flex-col items-start gap-1 rounded-md bg-neutral-50 px-6 py-6">
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-body-bold font-body-bold text-default-font">
                    Exec
                  </span>
                  <span className="text-body-bold font-body-bold text-error-700">
                    -2.4%
                  </span>
                </div>
                <div className="flex w-full items-center gap-2">
                  <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-1 font-heading-1 text-brand-700">
                    32
                  </span>
                </div>
                <span className="line-clamp-1 w-full text-caption font-caption text-subtext-color">
                  May 31 – Today
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
                      Endpoint App Installs
                    </span>
                    <span className="line-clamp-1 w-full text-caption font-caption text-subtext-color">
                      274 tickets
                    </span>
                  </div>
                </div>
                <span className="line-clamp-3 text-body font-body text-subtext-color text-center">
                  Requests to use applications blocked or disabled by company
                  policy
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
                      Security Questionnaires
                    </span>
                    <span className="line-clamp-1 w-full text-caption font-caption text-subtext-color">
                      73 tickets
                    </span>
                  </div>
                </div>
                <span className="line-clamp-3 text-body font-body text-subtext-color text-center">
                  Requests to fill out or clarify security questionnaires from
                  clients
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
      </div>
    </DefaultPageLayout>
  );
}

export default SecurityTicketReport;