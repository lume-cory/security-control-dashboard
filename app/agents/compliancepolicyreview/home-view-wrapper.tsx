'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { HomeViewComponent, DetailViewType } from './home-view'
import { ComplianceMapperComponent } from './compliance-mapper'
import { HippaDetailView } from './hippa-detail-view'
import { DoraDetailView } from './dora-detail-view'
import { DefaultPageLayout } from '@/components/ui/subframe/layouts/DefaultPageLayout'
import { IconWithBackground } from '@/components/ui/subframe/components/IconWithBackground'
import { Breadcrumbs } from '@/components/ui/subframe/components/Breadcrumbs'

export default function HomeViewWrapper() {
  const router = useRouter();
  const [activeView, setActiveView] = useState<DetailViewType>(null);

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
              Compliance & Policy Reviewer
            </Breadcrumbs.Item>
          </Breadcrumbs>
        </div>

        <HomeViewComponent 
          activeView={activeView}
          setActiveView={setActiveView}
        />

        <Sheet open={activeView !== null} onOpenChange={() => setActiveView(null)}>
          <SheetContent 
            side="right" 
            className={`w-full ${
              activeView === 'compliance-mapper' 
                ? 'sm:w-[1200px] sm:max-w-[90vw]' 
                : 'sm:w-[600px] sm:max-w-[75vw]'
            }`}
          >
            {activeView === 'compliance-mapper' && (
              <ComplianceMapperComponent onBack={() => setActiveView(null)} />
            )}
            {activeView === 'hipaa' && <HippaDetailView />}
            {activeView === 'dora' && <DoraDetailView />}
          </SheetContent>
        </Sheet>
      </div>
    </DefaultPageLayout>
  );
}
