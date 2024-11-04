"use client";

import React, { useState, useMemo } from "react";
import { DefaultPageLayout } from "@/subframe/layouts/DefaultPageLayout";
import { IconWithBackground } from "@/subframe/components/IconWithBackground";
import { Button } from "@/subframe/components/Button";
import { IconButton } from "@/subframe/components/IconButton";
import { BarChart } from "@/subframe/components/BarChart";
import * as SubframeCore from "@subframe/core";
import { DialogLayout } from "@/subframe/layouts/DialogLayout";
import { DropdownMenu } from "@/subframe/components/DropdownMenu";
import { TextField } from "@/subframe/components/TextField";
import { TextArea } from "@/subframe/components/TextArea";
import { LineChart } from "@/subframe/components/LineChart";
import { TimelineDivider } from "@/subframe/components/TimelineDivider";
import { useRouter } from 'next/navigation';
import { Badge } from "@/subframe/components/Badge";
import { Accordion, AccordionTrigger, AccordionItem, AccordionContent } from "@radix-ui/react-accordion";
import { CardContent } from "./ui/card";


const distinctColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', 
    '#F06292', '#AED581', '#7986CB', '#FFD54F', '#4DB6AC',
    '#9575CD', '#4DD0E1', '#81C784', '#DCE775', '#64B5F6'
  ];

function ReportsPage() {
  const router = useRouter();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reportName, setReportName] = useState('');

  const profileControls = {
    protect: [
      {
        id: "PR.AC-01.01",
        name: "Access Control Policy",
        description: "Develop and implement an access control policy that restricts access to information systems and data based on the principle of least privilege.",
        status: "Compliant",
        progress: "100%",
        risk: "Low",
        mitigation: "Regular review of access rights, implementation of multi-factor authentication.",
        evidence: "Access control policy document, access logs, audit trails"
      },
      {
        id: "PR.IP-01.01",
        name: "Security Awareness and Training",
        description: "Establish a security awareness and training program to ensure personnel are aware of and adhere to security policies and procedures.",
        status: "Partially Compliant",
        progress: "70%",
        risk: "Moderate",
        mitigation: "Developing comprehensive training program with regular updates and assessments.",
        evidence: "Training materials, attendance records, assessment results"
      }
    ],
    detect: [
      {
        id: "DE.CM-01.01",
        name: "Continuous Monitoring",
        description: "Implement continuous monitoring to detect anomalous activities and potential cybersecurity events.",
        status: "Compliant",
        progress: "100%",
        risk: "Low",
        mitigation: "24/7 security operations center, automated alert system.",
        evidence: "Monitoring logs, incident reports, system configuration documentation"
      }
    ],
    respond: [
      {
        id: "RS.RP-01.01",
        name: "Incident Response Plan",
        description: "Develop and maintain an incident response plan to guide the organization in responding to and recovering from cybersecurity incidents.",
        status: "Compliant",
        progress: "100%",
        risk: "Low",
        mitigation: "Regular updates to the incident response plan, conduct of tabletop exercises.",
        evidence: "Incident response plan document, exercise reports, post-incident reviews"
      }
    ]
  }


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
          <span className="text-heading-3 font-heading-3 text-default-font">
            Reports
          </span>
          <Button
            disabled={false}
            variant="brand-primary"
            size="medium"
            icon="FeatherPlus"
            loading={false}
            onClick={() => setIsDialogOpen(true)}
            >
            Create
          </Button>
        </div>
        <div className="flex w-full items-center gap-4">
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm">
            <div className="flex w-full items-center gap-2">
              <div className="flex grow shrink-0 basis-0 items-start gap-2">
                <span className="grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font">
                  Business Coverage
                </span>
                <IconButton
                  disabled={false}
                  variant="neutral-tertiary"
                  size="medium"
                  icon="FeatherMoreHorizontal"
                  loading={false}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                />
              </div>
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
            <div className="flex w-full items-start gap-2">
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2">
                  <span className="text-caption font-caption text-subtext-color">
                    Shows coverage the security program provides across revenue
                    driving assets
                  </span>
                </div>
                <div className="flex w-full grow shrink-0 basis-0 items-start gap-4">
                  <div className="flex items-center gap-1">
                    <SubframeCore.Icon
                      className="text-caption font-caption text-subtext-color"
                      name="FeatherClock"
                    />
                    <span className="text-caption font-caption text-subtext-color">
                      1 hour ago
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <SubframeCore.Icon
                      className="text-caption font-caption text-subtext-color"
                      name="FeatherEye"
                    />
                    <span className="text-caption font-caption text-subtext-color">
                      253
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm">
            <div className="flex w-full items-center gap-2">
              <div className="flex grow shrink-0 basis-0 items-start gap-2">
                <span className="grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font">
                  Control Effectiveness
                </span>
                <IconButton
                  disabled={false}
                  variant="neutral-tertiary"
                  size="medium"
                  icon="FeatherMoreHorizontal"
                  loading={false}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                />
              </div>
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
            <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
              <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2">
                <span className="text-caption font-caption text-subtext-color">
                  Outlines how well security program controls are covering
                  business assets and how well each of the controls is working
                </span>
              </div>
              <div className="flex w-full grow shrink-0 basis-0 items-start gap-4">
                <div className="flex items-center gap-1">
                  <SubframeCore.Icon
                    className="text-caption font-caption text-subtext-color"
                    name="FeatherClock"
                  />
                  <span className="text-caption font-caption text-subtext-color">
                    1 hour ago
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <SubframeCore.Icon
                    className="text-caption font-caption text-subtext-color"
                    name="FeatherEye"
                  />
                  <span className="text-caption font-caption text-subtext-color">
                    253
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center gap-4">
          <div className="flex grow shrink-0 basis-0 flex-col items-center gap-4 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm">
            <div className="flex w-full items-center gap-2">
              <div className="flex grow shrink-0 basis-0 items-start gap-2">
                <span className="grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font">
                  Testing Timeline
                </span>
                <IconButton
                  disabled={false}
                  variant="neutral-tertiary"
                  size="medium"
                  icon="FeatherMoreHorizontal"
                  loading={false}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                />
              </div>
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
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
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
                <div className="flex flex-col items-center self-stretch pb-2.5">
                  <div className="flex h-0.5 w-0.5 flex-none flex-col items-center gap-2 bg-default-background" />
                  <div className="flex h-4 w-4 flex-none flex-col items-start gap-2 rounded-full border-2 border-solid border-brand-600" />
                  <div className="flex w-0.5 grow shrink-0 basis-0 flex-col items-center gap-2 bg-brand-600" />
                </div>
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 pb-2.5">
                  <span className="w-full text-body-bold font-body-bold text-default-font">
                    New CVE affects Veeam data backups
                  </span>
                  <span className="text-caption font-caption text-subtext-color">
                    3:00 AM GMT
                  </span>
                  <Button
                    variant="neutral-secondary"
                    size="small"
                    iconRight="FeatherChevronRight"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    View details
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex w-full items-start gap-2">
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2">
                  <span className="text-caption font-caption text-subtext-color">
                    Shows coverage the security program provides across revenue
                    driving assets
                  </span>
                </div>
                <div className="flex w-full grow shrink-0 basis-0 items-start gap-4">
                  <div className="flex items-center gap-1">
                    <SubframeCore.Icon
                      className="text-caption font-caption text-subtext-color"
                      name="FeatherClock"
                    />
                    <span className="text-caption font-caption text-subtext-color">
                      1 hour ago
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <SubframeCore.Icon
                      className="text-caption font-caption text-subtext-color"
                      name="FeatherEye"
                    />
                    <span className="text-caption font-caption text-subtext-color">
                      253
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div 
            className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm cursor-pointer hover:bg-neutral-hover"
            onClick={() => router.push('/reports/vulnerability-resolution')}
           >
            <div className="flex w-full items-center gap-2">
              <div className="flex grow shrink-0 basis-0 items-start gap-2">
                <span className="grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font">
                  Vulnerability Resolution
                </span>
                <IconButton
                  disabled={false}
                  variant="neutral-tertiary"
                  size="medium"
                  icon="FeatherMoreHorizontal"
                  loading={false}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                />
              </div>
            </div>
            <div className="flex grow shrink-0 basis-0 flex-col flex-wrap items-start gap-4">
              <div className="flex w-full flex-wrap items-start gap-4">
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                  <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color">
                    Average time to detect (past-30 days)
                  </span>
                  <div className="flex w-full flex-col items-start gap-2">
                    <span className="text-heading-2 font-heading-2 text-default-font">
                      4.0 days
                    </span>
                    <Badge variant="success" icon="FeatherArrowUp">
                      25%
                    </Badge>
                  </div>
                </div>
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                  <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color">
                    Missed SLAs (past-30 days)
                  </span>
                  <div className="flex w-full flex-col items-start gap-2">
                    <span className="text-heading-2 font-heading-2 text-default-font">
                      1
                    </span>
                    <Badge variant="success" icon="FeatherArrowDown">
                      33%
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-wrap items-start gap-4">
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                  <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color">
                    Average time to resolve (past-30 days)
                  </span>
                  <div className="flex w-full flex-col items-start gap-2">
                    <span className="text-heading-2 font-heading-2 text-default-font">
                      4.4 days
                    </span>
                    <Badge variant="success" icon="FeatherArrowUp">
                      25%
                    </Badge>
                  </div>
                </div>
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                  <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color">
                    Missed SLAs (past-week)
                  </span>
                  <div className="flex w-full flex-col items-start gap-2">
                    <span className="text-heading-2 font-heading-2 text-default-font">
                      1
                    </span>
                    <Badge variant="success" icon="FeatherArrowDown">
                      33%
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full items-start gap-2">
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2">
                  <span className="text-caption font-caption text-subtext-color">
                    Shows coverage the security program provides across revenue
                    driving assets
                  </span>
                </div>
                <div className="flex w-full grow shrink-0 basis-0 items-start gap-4">
                  <div className="flex items-center gap-1">
                    <SubframeCore.Icon
                      className="text-caption font-caption text-subtext-color"
                      name="FeatherClock"
                    />
                    <span className="text-caption font-caption text-subtext-color">
                      1 hour ago
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <SubframeCore.Icon
                      className="text-caption font-caption text-subtext-color"
                      name="FeatherEye"
                    />
                    <span className="text-caption font-caption text-subtext-color">
                      253
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center gap-4">
        <div 
            className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm cursor-pointer hover:bg-neutral-hover"
            onClick={() => router.push('/reports/cri-compliance')}
           >
            <div className="flex w-full items-center gap-2">
              <div className="flex grow shrink-0 basis-0 items-start gap-2">
                <span className="grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font">
                  CRI Regulatory Compliance
                </span>
                <IconButton
                  disabled={false}
                  variant="neutral-tertiary"
                  size="medium"
                  icon="FeatherMoreHorizontal"
                  loading={false}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                />
              </div>
            </div>
            <CardContent className="space-y-6">
              <section>
              <h2 className="text-xl font-body mb-2">Profile Controls</h2>
              {Object.entries(profileControls).map(([type, controls]) => (
              <div key={type} className="mb-4">
                <h3 className="text-lg font-body capitalize mb-2">{type}</h3>
                <Accordion type="single" collapsible className="w-full">
                  {controls.map((control, index) => (
                    <AccordionItem value={`${type}-${index}`} key={index}>
                      <AccordionTrigger className="flex justify-between">
                        <span className="font-body">{control.id}: {control.name}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          control.status === 'Compliant' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {control.status}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <p><strong>Description:</strong> {control.description}</p>
                          <p><strong>Compliance Status:</strong> {control.status}</p>
                          <p><strong>Progress:</strong> {control.progress}</p>
                          <p><strong>Risk Assessment:</strong> {control.risk}</p>
                          <p><strong>Mitigation Strategies:</strong> {control.mitigation}</p>
                          <p><strong>Supporting Evidence:</strong> {control.evidence}</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                  </Accordion>
                </div>
              ))}
              </section>
            </CardContent>
            <div className="flex w-full items-start gap-2">
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2">
                  <span className="text-caption font-caption text-subtext-color">
                    Shows coverage the security program provides for the CRI Profile v2.0
                  </span>
                </div>
                <div className="flex w-full grow shrink-0 basis-0 items-start gap-4">
                  <div className="flex items-center gap-1">
                    <SubframeCore.Icon
                      className="text-caption font-caption text-subtext-color"
                      name="FeatherClock"
                    />
                    <span className="text-caption font-caption text-subtext-color">
                      1 hour ago
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <SubframeCore.Icon
                      className="text-caption font-caption text-subtext-color"
                      name="FeatherEye"
                    />
                    <span className="text-caption font-caption text-subtext-color">
                      253
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm cursor-pointer hover:bg-neutral-hover"
            onClick={() => router.push('/reports/security-ticket-triage')}>
            <div className="flex w-full items-center gap-2">
              <div className="flex grow shrink-0 basis-0 items-start gap-2">
                <span className="grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font">
                  Security Ticket Triage 
                </span>
                <IconButton
                  disabled={false}
                  variant="neutral-tertiary"
                  size="medium"
                  icon="FeatherMoreHorizontal"
                  loading={false}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                />
              </div>
            </div>
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
            <div className="flex w-full items-start gap-2">
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
                <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2">
                  <span className="text-caption font-caption text-subtext-color">
                    Metrics for resolved security tickets from engineering design reviews and security help desk inquiries.
                  </span>
                </div>
                <div className="flex w-full grow shrink-0 basis-0 items-start gap-4">
                  <div className="flex items-center gap-1">
                    <SubframeCore.Icon
                      className="text-caption font-caption text-subtext-color"
                      name="FeatherClock"
                    />
                    <span className="text-caption font-caption text-subtext-color">
                      1 hour ago
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <SubframeCore.Icon
                      className="text-caption font-caption text-subtext-color"
                      name="FeatherEye"
                    />
                    <span className="text-caption font-caption text-subtext-color">
                      253
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DialogLayout open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <div className="flex h-full w-full flex-col items-start bg-default-background">
          <div className="flex w-full flex-col items-start px-6 py-6">
            <div className="flex w-full flex-col items-start">
                <IconButton
                  icon="FeatherX"
                  onClick={() => setIsDialogOpen(false)}
                />
              </div>
              <div className="flex w-full flex-col items-start gap-8 px-4 py-4">
                <div className="flex w-full items-center justify-between">
                  <div className="flex flex-col items-start gap-2">
                    <span className="text-heading-2 font-heading-2 text-default-font">
                      Create New Report
                    </span>
                    <span className="text-body font-body text-default-font">
                      Create a report to suit your needs. Fill out the fields below
                      and click Generate.
                    </span>              
                    <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2">
                    <span className="text-heading-3 font-heading-3 text-default-font">
                      Report Name
                    </span>
                    <TextField
                      disabled={false}
                      error={false}
                      variant="outline"
                      label=""
                      helpText=""
                      icon={null}
                      iconRight={null}
                    >
                      <TextField.Input
                        placeholder=""
                        value={reportName}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                          setReportName(event.target.value);
                        }}
                        />
                      </TextField>
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center gap-2">
                  <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2">
                    <span className="text-heading-3 font-heading-3 text-default-font">
                      Audience
                    </span>
                    <SubframeCore.DropdownMenu.Root>
                      <SubframeCore.DropdownMenu.Trigger asChild={true}>
                        <Button
                          variant="neutral-secondary"
                          iconRight="FeatherChevronDown"
                          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                        >
                          Select an Audience
                        </Button>
                      </SubframeCore.DropdownMenu.Trigger>
                      <SubframeCore.DropdownMenu.Portal>
                        <SubframeCore.DropdownMenu.Content
                          side="bottom"
                          align="start"
                          sideOffset={4}
                          asChild={true}
                        >
                          <DropdownMenu>
                            <DropdownMenu.DropdownItem icon={null}>
                              Board of Directors
                            </DropdownMenu.DropdownItem>
                            <DropdownMenu.DropdownItem icon={null}>
                              Regulator
                            </DropdownMenu.DropdownItem>
                            <DropdownMenu.DropdownItem icon={null}>
                              Audit
                            </DropdownMenu.DropdownItem>
                            <DropdownMenu.DropdownItem icon={null}>
                              Company Leadership
                            </DropdownMenu.DropdownItem>
                            <DropdownMenu.DropdownItem icon={null}>
                              Security Team
                            </DropdownMenu.DropdownItem>
                            <DropdownMenu.DropdownItem icon={null}>
                              Development Team
                            </DropdownMenu.DropdownItem>
                          </DropdownMenu>
                        </SubframeCore.DropdownMenu.Content>
                      </SubframeCore.DropdownMenu.Portal>
                    </SubframeCore.DropdownMenu.Root>
                  </div>
                </div>
                <div className="flex w-full items-center gap-2">
                  <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2">
                    <span className="text-heading-3 font-heading-3 text-default-font">
                      Report Format
                    </span>
                    <SubframeCore.DropdownMenu.Root>
                      <SubframeCore.DropdownMenu.Trigger asChild={true}>
                        <Button
                          variant="neutral-secondary"
                          iconRight="FeatherChevronDown"
                          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                        >
                          Choose a Format
                        </Button>
                      </SubframeCore.DropdownMenu.Trigger>
                      <SubframeCore.DropdownMenu.Portal>
                        <SubframeCore.DropdownMenu.Content
                          side="bottom"
                          align="start"
                          sideOffset={4}
                          asChild={true}
                        >
                          <DropdownMenu>
                            <DropdownMenu.DropdownItem icon={null}>
                              Text / Doc
                            </DropdownMenu.DropdownItem>
                            <DropdownMenu.DropdownItem icon={null}>
                              Visual
                            </DropdownMenu.DropdownItem>
                            <DropdownMenu.DropdownItem icon={null}>
                              Mixed Mode
                            </DropdownMenu.DropdownItem>
                          </DropdownMenu>
                        </SubframeCore.DropdownMenu.Content>
                      </SubframeCore.DropdownMenu.Portal>
                    </SubframeCore.DropdownMenu.Root>
                  </div>
                </div>
                <div className="flex w-full items-center gap-2">
                  <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2">
                    <span className="text-heading-3 font-heading-3 text-default-font">
                      Describe Report Content
                    </span>
                    <TextArea
                      className="h-auto w-full flex-none"
                      error={false}
                      variant="outline"
                      label=""
                      helpText=""
                    >
                      <TextArea.Input
                        className="h-auto min-h-[96px] w-full flex-none"
                        placeholder=""
                        value=""
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {}}
                      />
                    </TextArea>
                  </div>
                </div>
                <div className="flex w-full items-center gap-4">
                  <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2">
                    <span className="text-heading-3 font-heading-3 text-default-font">
                      Report Template (optional)
                    </span>
                    <span className="text-caption font-caption text-subtext-color">
                      For best results, upload a template of a prior report that can be
                      used as a reference
                    </span>
                    <Button
                      variant="neutral-secondary"
                      icon="FeatherUpload"
                      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                    >
                      Upload
                    </Button>
                  </div>
                </div>
              </div>
              <Button
                className="h-10 w-full flex-none"
                size="large"
                icon="FeatherSparkles"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Generate Report
              </Button>
            </div>
          </div>
        </DialogLayout>
    </DefaultPageLayout>
  );
}

export default ReportsPage;
