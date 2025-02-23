"use client";

import { DefaultPageLayout } from "@/subframe/layouts/DefaultPageLayout";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IconWithBackground } from "@/subframe/components/IconWithBackground";
import { Breadcrumbs } from "@/subframe/components/Breadcrumbs";
import * as SubframeCore from "@subframe/core";
import { ThreatModelSection } from "./components/threatmodel/ThreatModelSection"
import { VulnerabilitySection } from "./components/vulnerability/VulnerabilitySection"


function ProductSecurityHome() {
  const router = useRouter();


  return (
    <DefaultPageLayout>

      {/*Title and navigation breadcrumbs*/}
      <div className="flex h-full w-full flex-col items-start gap-6 px-6 py-6">
        <div className="flex w-full items-start gap-4 mobile:flex-col mobile:items-center mobile:justify-start mobile:gap-6">
          <IconWithBackground size="medium" icon="FeatherRocket" />
          <span className="text-heading-2 font-heading-2 text-default-font mobile:text-center">
            Acme Inc
          </span>
        </div>
        <div className="flex w-full items-center justify-between">
          <Breadcrumbs>
            <Breadcrumbs.Item onClick={() => router.push('/agents')}>Agents</Breadcrumbs.Item>
            <Breadcrumbs.Divider />
            <Breadcrumbs.Item active={true}>
              Product Security Agent
            </Breadcrumbs.Item>
          </Breadcrumbs>
        </div>

        <div className="space-y-6 w-full">
          <ThreatModelSection />
          <VulnerabilitySection />
        </div>
      </div>

      {/*chat drawer*/}
      {/* <ChatDrawer /> */}
    </DefaultPageLayout>
  );
}

export default ProductSecurityHome;