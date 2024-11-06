"use client";

import React from "react";
import { DefaultPageLayout } from "@/subframe/layouts/DefaultPageLayout";
import { IconWithBackground } from "@/subframe/components/IconWithBackground";
import { Breadcrumbs } from "@/subframe/components/Breadcrumbs";
import { IconButton } from "@/subframe/components/IconButton";
import { Button } from "@/subframe/components/Button";
import { useRouter } from "next/navigation";


function AgentsLandingPage() {

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
            <Breadcrumbs.Item>Agents</Breadcrumbs.Item>
          </Breadcrumbs>
        </div>
        <div className="flex w-full items-start gap-4">
          <div className="flex grow shrink-0 basis-0 flex-col items-start justify-between self-stretch px-2 py-2">
            <div className="flex w-full flex-col items-start gap-4">
              <img
                className="h-40 w-full flex-none rounded-md object-cover"
                src="https://res.cloudinary.com/subframe/image/upload/v1723780568/uploads/302/lhjnvjqbfep7ar3v3fry.png"
              />
              <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2">
                <div className="flex w-full items-center justify-between">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Security Help Desk
                  </span>
                  <div className="flex items-center gap-2">
                    <IconButton
                      size="small"
                      icon="FeatherShare"
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => { }}
                    />
                    <IconButton
                      size="small"
                      icon="FeatherBookmark"
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => { }}
                    />
                  </div>
                </div>
                <div className="flex w-full grow shrink-0 basis-0 flex-col items-start">
                  <span className="line-clamp-3 text-body font-body text-subtext-color">
                    See incoming requests to the security team from any source
                    and quickly approve or modify AI suggested responses
                  </span>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col items-start justify-between py-2">
              <Button
                className="h-10 w-full flex-none"
                variant="brand-secondary"
                size="large"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => { router.push('/agents/helpdesk') }}
              >
                Let&apos;s Go!
              </Button>
            </div>
          </div>
          <div className="flex grow shrink-0 basis-0 flex-col items-start justify-between self-stretch px-2 py-2">
            <div className="flex w-full flex-col items-start gap-4">
              <img
                className="h-40 w-full flex-none rounded-md object-cover"
                src="https://res.cloudinary.com/subframe/image/upload/v1723780859/uploads/302/hh4s5xjmsigiehqkb1uh.png"
              />
              <div className="flex w-full flex-col items-start gap-2">
                <div className="flex w-full items-center justify-between">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Engineering Security Review
                  </span>
                  <div className="flex items-center gap-2">
                    <IconButton
                      size="small"
                      icon="FeatherShare"
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => { }}
                    />
                    <IconButton
                      size="small"
                      icon="FeatherBookmark"
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => { }}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <span className="line-clamp-3 text-body font-body text-subtext-color">
                    See incoming requests and questions from the engineering
                    team and respond with the help of AI suggested answers
                  </span>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col items-start justify-between py-2">
              <Button
                className="h-10 w-full flex-none"
                variant="brand-secondary"
                size="large"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => { router.push('/agents/engsecurityreview') }}
              >
                Let&apos;s Go!
              </Button>
            </div>
          </div>
        </div>
        <div className="flex w-full items-start gap-4">
          <div className="flex grow shrink-0 basis-0 flex-col items-start justify-between self-stretch px-2 py-2">
            <div className="flex w-full flex-col items-start gap-4">
              <img
                className="h-40 w-full flex-none rounded-md object-cover"
                src="https://res.cloudinary.com/subframe/image/upload/v1723780741/uploads/302/iocrneldnziecxz0a86f.png"
              />
              <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2">
                <div className="flex w-full items-center justify-between">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Compliance &amp; Policy Reviewer
                  </span>
                  <div className="flex items-center gap-2">
                    <IconButton
                      size="small"
                      icon="FeatherShare"
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => { }}
                    />
                    <IconButton
                      size="small"
                      icon="FeatherBookmark"
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => { }}
                    />
                  </div>
                </div>
                <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2">
                  <span className="line-clamp-3 text-body font-body text-subtext-color">
                    Continuously checks updates to regulations or security
                    frameworks to identify any changes needed to policy
                  </span>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col items-start justify-between py-2">
              <Button
                className="h-10 w-full flex-none"
                variant="brand-secondary"
                size="large"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => { router.push('/agents/compliancepolicyreview') }}
              >
                Let&apos;s Go!
              </Button>
            </div>
          </div>
          <div className="flex grow shrink-0 basis-0 flex-col items-start justify-between self-stretch px-2 py-2">
            <div className="flex w-full flex-col items-start gap-4">
              <img
                className="h-40 w-full flex-none rounded-md object-cover"
                src="https://res.cloudinary.com/subframe/image/upload/v1723780568/uploads/302/lhjnvjqbfep7ar3v3fry.png"
              />
              <div className="flex w-full flex-col items-start gap-2">
                <div className="flex w-full items-center justify-between">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Customer Contract Reviewer
                  </span>
                  <div className="flex items-center gap-2">
                    <IconButton
                      size="small"
                      icon="FeatherShare"
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => { }}
                    />
                    <IconButton
                      size="small"
                      icon="FeatherBookmark"
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => { }}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <span className="line-clamp-3 text-body font-body text-subtext-color">
                    Search customer contracts for specific queries or
                    requirements that may not be met by current policies
                  </span>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col items-start justify-between py-2">
              <Button
                className="h-10 w-full flex-none"
                variant="brand-secondary"
                size="large"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
              >
                Let&apos;s Go!
              </Button>
            </div>
          </div>
        </div>
        <div className="flex w-full items-start gap-6">
          <div className="flex grow shrink-0 basis-0 flex-col items-start justify-between px-2 py-2">
            <div className="flex w-full flex-col items-start gap-4">
              <img
                className="h-40 w-full flex-none rounded-md object-cover"
                src="https://res.cloudinary.com/subframe/image/upload/v1723780859/uploads/302/hh4s5xjmsigiehqkb1uh.png"
              />
              <div className="flex w-full flex-col items-start gap-2">
                <div className="flex w-full items-center justify-between">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Security Policy &amp; Doc Suggestions
                  </span>
                  <div className="flex items-center gap-2">
                    <IconButton
                      size="small"
                      icon="FeatherShare"
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => { }}
                    />
                    <IconButton
                      size="small"
                      icon="FeatherBookmark"
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => { }}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <span className="line-clamp-3 text-body font-body text-subtext-color">
                    This agent is continuously reviewing policy and
                    documentation to find gaps or conflicts, recommending and
                    automatically updating content after approval
                  </span>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col items-start justify-between py-2">
              <Button
                className="h-10 w-full flex-none"
                variant="brand-secondary"
                size="large"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => { }}
              >
                Let&apos;s Go!
              </Button>
            </div>
          </div>
          <div className="flex grow shrink-0 basis-0 flex-col items-start justify-between px-2 py-2">
            <div className="flex w-full flex-col items-start gap-4">
              <img
                className="h-40 w-full flex-none rounded-md object-cover"
                src="https://res.cloudinary.com/subframe/image/upload/v1723780741/uploads/302/iocrneldnziecxz0a86f.png"
              />
              <div className="flex w-full flex-col items-start gap-2">
                <div className="flex w-full items-center justify-between">
                  <span className="text-body-bold font-body-bold text-default-font">
                    Customer Security Inquiry Agent
                  </span>
                  <div className="flex items-center gap-2">
                    <IconButton
                      size="small"
                      icon="FeatherShare"
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => { }}
                    />
                    <IconButton
                      size="small"
                      icon="FeatherBookmark"
                      onClick={(
                        event: React.MouseEvent<HTMLButtonElement>
                      ) => { }}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <span className="line-clamp-3 text-body font-body text-subtext-color">
                    This agent is designed to aggregate questions from customers
                    about the organization's security posture and suggest responses
                  </span>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col items-start justify-between py-2">
              <Button
                className="h-10 w-full flex-none"
                variant="brand-secondary"
                size="large"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => { router.push('/agents/clientsecurityinquiries') }}
              >
                Let&apos;s Go!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DefaultPageLayout>
  );
}

export default AgentsLandingPage;