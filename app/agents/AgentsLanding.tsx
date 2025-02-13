"use client";

import React from "react";
import { DefaultPageLayout } from "@/subframe/layouts/DefaultPageLayout";
import { IconWithBackground } from "@/subframe/components/IconWithBackground";
import { Breadcrumbs } from "@/subframe/components/Breadcrumbs";
import { IconButton } from "@/subframe/components/IconButton";
import { Button } from "@/subframe/components/Button";
import { useRouter } from "next/navigation";
import Image from 'next/image';


function AgentsLandingPage() {

  const router = useRouter();

  const agents = [
    {
      title: "Security Help Desk",
      description: "See incoming requests to the security team from any source and quickly approve or modify AI suggested responses",
      thumbnail: "/thumbnails/1.svg",
      path: "/agents/helpdesk"
    },
    {
      title: "Engineering Security Review",
      description: "See incoming requests and questions from the engineering team and respond with the help of AI suggested answers",
      thumbnail: "/thumbnails/2.svg",
      path: "/agents/engsecurityreview"
    },
    {
      title: "Compliance & Policy Reviewer",
      description: "Continuously checks updates to regulations or security frameworks to identify any changes needed to policy",
      thumbnail: "/thumbnails/3.svg",
      path: "/agents/compliancepolicyreview"
    },
    {
      title: "Customer Requirement Review Agent",
      description: "Parse RFP, Questionnaire, or contract from customers for specific questions or requirements, analyzing them against the organization's security policy and generating suggested responses",
      thumbnail: "/thumbnails/4.svg",
      path: "/agents/clientrequirements"
    },
    {
      title: "Vendor & App Approval Agent",
      description: "This agent receives requests from employees to use or renew vendors or applications and automatically generates supporting data and risk analysis based on security policy and vendor risk management data",
      thumbnail: "/thumbnails/5.svg",
      path: "/agents/vendorreview"
    },
    {
      title: "Customer Security Inquiry Agent",
      description: "This agent is designed to aggregate questions from customers about the organization's security posture and suggest responses",
      thumbnail: "/thumbnails/6.svg",
      path: "/agents/clientsecurityinquiries"
    },
    {
      title: "Security Control Groups",
      description: "This agent displays security control groups and methods to increase effectiveness considering business context",
      thumbnail: "/thumbnails/8.svg",
      path: "/agents/controlgroups"
    }
  ];

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
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {agents.map(({ title, description, thumbnail, path }) => (
            <div key={path} className="flex grow shrink-0 basis-0 flex-col items-start justify-between self-stretch px-2 py-2">
              <div className="flex w-full flex-col items-start gap-4">
                <div className="h-40 w-full flex-none rounded-md bg-gray-50 overflow-hidden">
                  <Image
                    src={thumbnail}
                    alt={`${title} thumbnail`}
                    width={400}
                    height={160}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <div className="flex w-full flex-col items-start gap-2">
                  <div className="flex w-full items-center justify-between">
                    <span className="text-body-bold font-body-bold text-default-font">
                      {title}
                    </span>
                    <div className="flex items-center gap-2">
                      <IconButton
                        size="small"
                        icon="FeatherShare"
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                        }}
                      />
                      <IconButton
                        size="small"
                        icon="FeatherBookmark"
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <span className="line-clamp-3 text-body font-body text-subtext-color">
                      {description}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col items-start justify-between py-2">
                <Button
                  className="h-10 w-full flex-none"
                  variant="brand-primary"
                  size="large"
                  onClick={() => router.push(path)}
                >
                  Let&apos;s Go!
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DefaultPageLayout>
  );
}

export default AgentsLandingPage;