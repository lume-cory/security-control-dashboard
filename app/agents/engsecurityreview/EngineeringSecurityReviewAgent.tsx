"use client";

import React from "react";
import { DefaultPageLayout } from "@/subframe/layouts/DefaultPageLayout";
import { IconWithBackground } from "@/subframe/components/IconWithBackground";
import { Breadcrumbs } from "@/subframe/components/Breadcrumbs";
import { Button } from "@/subframe/components/Button";
import * as SubframeCore from "@subframe/core";
import { FilterBadge } from "@/subframe/components/FilterBadge";
import { Badge } from "@/subframe/components/Badge";
import { Table } from "@/subframe/components/Table";
import { useRouter } from "next/navigation";

function SecurityHelpDeskAgent() {
  const router = useRouter();

  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start gap-6 px-6 py-6" >
        <div className="flex w-full items-start gap-4 mobile:flex-col mobile:items-center mobile:justify-start mobile:gap-6" >
          <IconWithBackground size="medium" icon="FeatherRocket" />
          <span className="text-heading-2 font-heading-2 text-default-font mobile:text-center" >
            Acme Inc
          </span>
        </div>
        < div className="flex w-full items-center justify-between" >
          <Breadcrumbs>
            <Breadcrumbs.Item onClick={() => router.push('/agents')}>Agents </Breadcrumbs.Item>
            < Breadcrumbs.Divider />
            <Breadcrumbs.Item active={true}>
              Security Help Desk
            </Breadcrumbs.Item>
          </Breadcrumbs>
        </div>
        < div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm" >
          <div className="flex w-full items-center gap-2" >
            <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font" >
              Integrations and Data Sources
            </span>
            < Button
              className="h-6 w-auto flex-none"
              disabled={false}
              variant="brand-primary"
              icon="FeatherPlus"
              loading={false}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }
              }
            >
              Add
            </Button>
          </div>
          < div className="flex w-full items-start gap-4" >
            <div className="flex items-center gap-2 rounded-md bg-neutral-50 px-2 py-2" >
              <SubframeCore.Icon
                className="text-heading-2 font-heading-2 text-default-font"
                name="FeatherSlack"
              />
              <div className="flex flex-col items-start gap-2 px-1" >
                <span className="text-body-bold font-body-bold text-default-font" >
                  Slack Channels
                </span>
                < span className="text-caption font-caption text-default-font" >
                  10k + messages
                </span>
              </div>
            </div>
            < div className="flex items-center gap-2 rounded-md bg-neutral-50 px-2 py-2" >
              <SubframeCore.Icon
                className="text-heading-2 font-heading-2 text-default-font"
                name="FeatherFile"
              />
              <div className="flex flex-col items-start gap-2 px-1" >
                <span className="text-body-bold font-body-bold text-default-font" >
                  Security Policy Docs
                </span>
                < span className="text-caption font-caption text-default-font" >
                  150 files
                </span>
              </div>
            </div>
            < div className="flex items-center gap-2 rounded-md bg-neutral-50 px-2 py-2" >
              <SubframeCore.Icon
                className="text-heading-2 font-heading-2 text-default-font"
                name="FeatherTicket"
              />
              <div className="flex flex-col items-start gap-2 px-1" >
                <span className="text-body-bold font-body-bold text-default-font" >
                  Security Tickets
                </span>
                < span className="text-caption font-caption text-default-font" >
                  2.5k ticket threads
                </span>
              </div>
            </div>
            < div className="flex items-center gap-2 rounded-md bg-neutral-50 px-2 py-2" >
              <SubframeCore.Icon
                className="text-heading-2 font-heading-2 text-default-font"
                name="FeatherFile"
              />
              <div className="flex flex-col items-start gap-2 px-1" >
                <span className="text-body-bold font-body-bold text-default-font" >
                  Security Design Reviews
                </span>
                < span className="text-caption font-caption text-default-font" >
                  320 files
                </span>
              </div>
            </div>
          </div>
        </div>
        < div className="flex w-full flex-wrap items-start gap-4" >
          <div className="flex flex-col items-start gap-4 self-stretch rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm" >
            <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color" >
              Outstanding questions
            </span>
            < div className="flex items-center gap-2" >
              <FilterBadge label="Urgent" count="3" selected={false} />
              <Badge variant="error" icon="FeatherArrowUp" >
                13 %
              </Badge>
            </div>
            < div className="flex items-center gap-2" >
              <FilterBadge label="High" count="2" selected={false} />
              <Badge variant="success" icon="FeatherArrowDown" >
                5 %
              </Badge>
            </div>
            < div className="flex items-center gap-2" >
              <FilterBadge label="Medium" count="2" selected={false} />
              <Badge variant="neutral" icon="FeatherArrowRight" >
                0 %
              </Badge>
            </div>
            < div className="flex items-center gap-2" >
              <FilterBadge label="Low" count="1" selected={false} />
              <Badge variant="success" icon="FeatherArrowDown" >
                25 %
              </Badge>
            </div>
          </div>
          < div className="flex grow shrink-0 basis-0 flex-col flex-wrap items-start gap-4" >
            <div className="flex w-full flex-wrap items-start gap-4" >
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm" >
                <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color" >
                  Open Missed SLAs
                </span>
                < div className="flex w-full flex-col items-start gap-2" >
                  <span className="text-heading-2 font-heading-2 text-default-font" >
                    4
                  </span>
                  < Badge variant="error" icon="FeatherArrowUp" >
                    25 %
                  </Badge>
                </div>
              </div>
              < div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm" >
                <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color" >
                  Missed SLAs(past - 30 days)
                </span>
                < div className="flex w-full flex-col items-start gap-2" >
                  <span className="text-heading-2 font-heading-2 text-default-font" >
                    9
                  </span>
                  < Badge variant="success" icon="FeatherArrowDown" >
                    33 %
                  </Badge>
                </div>
              </div>
            </div>
            < div className="flex w-full flex-wrap items-start gap-4" >
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm" >
                <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color" >
                  Average time to resolve(past - 30 days)
                </span>
                < div className="flex w-full flex-col items-start gap-2" >
                  <span className="text-heading-2 font-heading-2 text-default-font" >
                    4.4 days
                  </span>
                  < Badge variant="success" icon="FeatherArrowDown" >
                    25 %
                  </Badge>
                </div>
              </div>
              < div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm" >
                <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color" >
                  Resolved(past - 30 days)
                </span>
                < div className="flex w-full flex-col items-start gap-2" >
                  <span className="text-heading-2 font-heading-2 text-default-font" >
                    75
                  </span>
                  < Badge variant="neutral" icon="FeatherArrowUp" >
                    33 %
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
        < div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm" >
          <div className="flex w-full items-center gap-2" >
            <span className="grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font" >
              Downtime
            </span>
            < div className="flex grow shrink-0 basis-0 items-center justify-end gap-2" >
              <Button
                className="h-auto w-auto flex-none self-stretch"
                variant="brand-secondary"
                icon="FeatherCheck"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
              >
                Oustanding
              </Button>
              < Button
                className="h-auto w-auto flex-none self-stretch"
                variant="neutral-secondary"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
              >
                Resolved
              </Button>
            </div>
          </div>
          < div className="flex w-full flex-col items-start gap-6 overflow-hidden overflow-auto" >
            <Table
              header={
                <Table.HeaderRow>
                  <Table.HeaderCell>Time period </Table.HeaderCell>
                  < Table.HeaderCell > Availability </Table.HeaderCell>
                  < Table.HeaderCell > Downtime </Table.HeaderCell>
                  < Table.HeaderCell > Status </Table.HeaderCell>
                </Table.HeaderRow>
              }
            >
              <Table.Row>
                <Table.Cell>
                  <span className="text-body-bold font-body-bold text-neutral-700" >
                    Last 24 hours
                  </span>
                </Table.Cell>
                < Table.Cell >
                  <span className="text-body font-body text-neutral-500" >
                    100.00 %
                  </span>
                </Table.Cell>
                < Table.Cell >
                  <span className="text-body font-body text-neutral-500" >
                    0s
                  </span>
                </Table.Cell>
                < Table.Cell >
                  <Badge>Active </Badge>
                </Table.Cell>
              </Table.Row>
              < Table.Row >
                <Table.Cell>
                  <span className="text-body-bold font-body-bold text-neutral-700" >
                    Last 7 days
                  </span>
                </Table.Cell>
                < Table.Cell >
                  <span className="text-body font-body text-neutral-500" >
                    99.99 %
                  </span>
                </Table.Cell>
                < Table.Cell >
                  <span className="text-body font-body text-neutral-500" >
                    1m 10s
                  </span>
                </Table.Cell>
                < Table.Cell >
                  <Badge>Active </Badge>
                </Table.Cell>
              </Table.Row>
              < Table.Row >
                <Table.Cell>
                  <span className="text-body-bold font-body-bold text-neutral-700" >
                    Last 30 days
                  </span>
                </Table.Cell>
                < Table.Cell >
                  <span className="text-body font-body text-neutral-500" >
                    99.95 %
                  </span>
                </Table.Cell>
                < Table.Cell >
                  <span className="text-body font-body text-neutral-500" >
                    2m 30s
                  </span>
                </Table.Cell>
                < Table.Cell >
                  <Badge>Active </Badge>
                </Table.Cell>
              </Table.Row>
              < Table.Row >
                <Table.Cell>
                  <span className="text-body-bold font-body-bold text-neutral-700" >
                    Last 365 days
                  </span>
                </Table.Cell>
                < Table.Cell >
                  <span className="text-body font-body text-neutral-500" >
                    99.94 %
                  </span>
                </Table.Cell>
                < Table.Cell >
                  <span className="text-body font-body text-neutral-500" >
                    4m 20s
                  </span>
                </Table.Cell>
                < Table.Cell >
                  <Badge>Active </Badge>
                </Table.Cell>
              </Table.Row>
            </Table>
          </div>
          < div className="flex w-full items-center justify-center gap-4" >
            <span className="grow shrink-0 basis-0 text-body font-body text-subtext-color" >
              Showing 1 – 4 of 8
            </span>
            < div className="flex items-center justify-center gap-2" >
              <Button
                variant="neutral-secondary"
                size="medium"
                icon={null}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
              >
                Prev
              </Button>
              < Button
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
      </div>
    </DefaultPageLayout>
  );
}

export default SecurityHelpDeskAgent;