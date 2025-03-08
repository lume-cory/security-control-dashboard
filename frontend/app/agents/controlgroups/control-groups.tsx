'use client'

import { useRouter } from 'next/navigation'
import { DefaultPageLayout } from '@/components/ui/subframe/layouts/DefaultPageLayout'
import { Breadcrumbs } from '@/components/ui/subframe/components/Breadcrumbs'
import { IconWithBackground } from '@/components/ui/subframe/components/IconWithBackground'
import { securityControlGroups } from './data/security-control-groups'
import { SecurityControlGroupCards } from './components/security-control-group-cards'

export default function ControlGroupsComponent() {
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
        <div className="flex w-full items-center justify-between" >
          <Breadcrumbs>
            <Breadcrumbs.Item onClick={() => router.push('/agents')}>Agents</Breadcrumbs.Item>
            <Breadcrumbs.Divider />
            <Breadcrumbs.Item active={true}>
              Control Groups & Efficacy
            </Breadcrumbs.Item>
          </Breadcrumbs>
        </div>
        
        <SecurityControlGroupCards securityControlGroups={securityControlGroups} />
      </div>
    </DefaultPageLayout>
  );
}