"use client";

import React from "react";
import { DefaultPageLayout } from "@/subframe/layouts/DefaultPageLayout";
import { IconWithBackground } from "@/subframe/components/IconWithBackground";
import { ChatDrawer } from "./components/ChatDrawer";
import { Breadcrumbs } from "@/subframe/components/Breadcrumbs";
import * as SubframeCore from "@subframe/core";
import { useRouter } from "next/navigation";
import { useState } from 'react'
import { DataSourcesSection } from "./components/DataSourcesSection";
import { HighlightsSection } from "./components/HighlightsSection";
import { OrganizationRisksSection } from "./components/OrganizationRisksSection";
import { RiskDetailSheet } from "./components/RiskDetailSheet";
import { Risk } from "./data/risk-data";


function OrgRiskAgent() {
  const router = useRouter();
  const [selectedRisk, setSelectedRisk] = useState<Risk | null>(null);

  const handleRiskSelection = (risk: Risk) => {
    setSelectedRisk(risk);
  };

  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start gap-6 px-6 py-6">
        
        {/*Title and navigation breadcrumbs*/}
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
              Organization Risk Management Assistant
            </Breadcrumbs.Item>
          </Breadcrumbs>
        </div>

        <DataSourcesSection />
        <HighlightsSection />
        <OrganizationRisksSection onSelectRisk={handleRiskSelection} />
        <RiskDetailSheet risk={selectedRisk} onClose={() => setSelectedRisk(null)} />

      <ChatDrawer />
      </div>
    </DefaultPageLayout>
  );
}

export default OrgRiskAgent;