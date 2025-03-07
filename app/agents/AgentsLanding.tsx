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
      title: "Security Knowledge Assistant",
      description: "View incoming requests to the security team from any source. Approve or modify AI pre-generated responses. Allow agent to auto-respond to common requests.",
      thumbnail: "/thumbnails/1.svg",
      path: "/agents/helpdesk"
    },
    {
      title: "Product Security Assessments",
      description: "Product security assistants to help with threat modeling, impact risk assessments, and policy mapping",
      thumbnail: "/thumbnails/2.svg",
      path: "/agents/productsecurity"
    },
    {
      title: "Compliance & Policy Reviewer",
      description: "Continuously checks updates to regulations or security frameworks to identify any changes needed to policy",
      thumbnail: "/thumbnails/3.svg",
      path: "/agents/compliancepolicyreview"
    },
    {
      title: "Contract Obligations Reviewer",
      description: "Analyze contracts from customers, vendors, insurance, etc. comparing obligations against our organization's security policy. Also check for non-compliance when polices are updated.",
      thumbnail: "/thumbnails/4.svg",
      path: "/agents/contractobligations"
    },
    {
      title: "3rd Party Risk Review Agent",
      description: "This agent augments the process of collecting 3rd party security controls, synthesizing their security policies, and mapping to our organization's security controls",
      thumbnail: "/thumbnails/9.svg",
      path: "/agents/3p-risk"
    },
    {
      title: "Exposure Remediation Agent",
      description: "This agent assesses vulnerabilities and exposure from multiple sources and generates actions to remediate, either automatically or with human review",
      thumbnail: "/thumbnails/6.svg",
      path: "/agents/exposureremediation"
    },
    {
      title: "Organization Risk Management Assistant",
      description: "This agent is designed to continuously monitor the organization's risk posture, retreiving supporting data from across the organization and synthesizing them to provide a comprehensive risk report",
      thumbnail: "/thumbnails/10.svg",
      path: "/agents/orgrisk"
    },
    {
      title: "Customer Security Inquiry Agent",
      description: "This agent is designed to aggregate questions from customers about the organization's security posture and suggest responses",
      thumbnail: "/thumbnails/7.svg",
      path: "/agents/clientsecurityinquiries"
    },
    {
      title: "Vendor Request Review Agent",
      description: "This agent receives requests from employees to use or renew vendors or applications and automatically generates supporting data and risk analysis based on security policy and vendor risk management data",
      thumbnail: "/thumbnails/8.svg",
      path: "/agents/vendorreview"
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