'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from "@/subframe/components/Button"
import * as SubframeCore from "@subframe/core";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QuestionsTable } from '@/components/questions-table-eng-security-review'
import { ExternalLink } from 'lucide-react'
import { DefaultPageLayout } from '@/components/ui/subframe/layouts/DefaultPageLayout'
import { IconWithBackground } from '@/components/ui/subframe/components/IconWithBackground'
import { Breadcrumbs } from '@/components/ui/subframe/components/Breadcrumbs'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { HomeViewComponent } from './home-view'
import { ComplianceMapperComponent } from './compliance-mapper'



export function HomeViewWrapper() {
  const router = useRouter()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleCardClick = () => {
    setIsDrawerOpen(true)
  }

  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start gap-6 p-4 sm:p-6" >
        <div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center" >
          <IconWithBackground size="medium" icon="FeatherRocket" />
          <span className="text-heading-2 font-heading-2 text-default-font text-center sm:text-left" >
            Acme Inc
          </span>
        </div>
        <div className="flex w-full items-center justify-between overflow-x-auto">
          <Breadcrumbs className="flex items-center gap-1">
            <Breadcrumbs.Item
              onClick={() => router.push('/agents')}
              className="cursor-pointer hover:underline"
            >
              Agents
            </Breadcrumbs.Item>
            <Breadcrumbs.Divider />
            <Breadcrumbs.Item active={true}>
              Compliance & Policy Reviewer
            </Breadcrumbs.Item>
          </Breadcrumbs>
        </div>

        <div className="w-full">
          <HomeViewComponent onNavigateToComplianceMapper={handleCardClick} />

          <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <SheetContent side="right" className="w-full overflow-hidden" style={{ maxWidth: 'min(90vw, 1200px)' }}>
              <div className="h-[calc(100vh-4rem)] overflow-y-auto">
                <ComplianceMapperComponent onBack={() => setIsDrawerOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </DefaultPageLayout>
  )
}
