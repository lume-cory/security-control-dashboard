"use client";
/*
 * Documentation:
 * Default Page Layout — https://app.subframe.com/dd04ff44d9d4/library?component=Default+Page+Layout_a57b1c43-310a-493f-b807-8cc88e2452cf
 * Sidebar rail with labels — https://app.subframe.com/dd04ff44d9d4/library?component=Sidebar+rail+with+labels_3296372a-ba83-4ca9-b291-10dc2aa86fdd
 * Dropdown Menu — https://app.subframe.com/dd04ff44d9d4/library?component=Dropdown+Menu_99951515-459b-4286-919e-a89e7549b43b
 * Avatar — https://app.subframe.com/dd04ff44d9d4/library?component=Avatar_bec25ae6-5010-4485-b46b-cf79e3943ab2
 */

import React from "react";
import * as SubframeCore from "@subframe/core";
import { SidebarRailWithLabels } from "../components/SidebarRailWithLabels";
import { DropdownMenu } from "../components/DropdownMenu";
import { Avatar } from "../components/Avatar";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';

interface DefaultPageLayoutRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const DefaultPageLayoutRoot = React.forwardRef<
  HTMLElement,
  DefaultPageLayoutRootProps
>(function DefaultPageLayoutRoot(
  { children, className, ...otherProps }: DefaultPageLayoutRootProps,
  ref
) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className={SubframeCore.twClassNames(
        "flex h-screen w-full items-center",
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      <SidebarRailWithLabels
        className="h-auto w-auto flex-none self-stretch"
        header={
          <div className="flex flex-col items-center justify-center gap-2">
            <img
              className="h-11 w-11 flex-none object-contain"
              src="https://res.cloudinary.com/subframe/image/upload/v1729641533/uploads/4287/aabtmtlfguh3rdkbqrsv.png"
            />
          </div>
        }
        footer={
          <>
            <SidebarRailWithLabels.NavItem icon="FeatherBell" />
            <SidebarRailWithLabels.NavItem icon="FeatherSettings" />
            <div className="flex flex-col items-center justify-end gap-1 px-2 py-2">
              <SubframeCore.DropdownMenu.Root>
                <SubframeCore.DropdownMenu.Trigger asChild={true}>
                  <Avatar image="https://res.cloudinary.com/subframe/image/upload/v1711417507/shared/fychrij7dzl8wgq2zjq9.avif">
                    A
                  </Avatar>
                </SubframeCore.DropdownMenu.Trigger>
                <SubframeCore.DropdownMenu.Portal>
                  <SubframeCore.DropdownMenu.Content
                    side="right"
                    align="end"
                    sideOffset={4}
                    asChild={true}
                  >
                    <DropdownMenu>
                      <DropdownMenu.DropdownItem icon="FeatherUser">
                        Account
                      </DropdownMenu.DropdownItem>
                      <DropdownMenu.DropdownItem icon="FeatherSettings">
                        Settings
                      </DropdownMenu.DropdownItem>
                      <DropdownMenu.DropdownItem icon="FeatherLogOut">
                        Log out
                      </DropdownMenu.DropdownItem>
                    </DropdownMenu>
                  </SubframeCore.DropdownMenu.Content>
                </SubframeCore.DropdownMenu.Portal>
              </SubframeCore.DropdownMenu.Root>
            </div>
          </>
        }
      >
        <SidebarRailWithLabels.NavItem
          className="h-auto min-h-[44px] w-full flex-none"
          icon="FeatherSun"
          selected={pathname === '/dashboard'}
          onClick={() => router.push('/dashboard')}
        >
          Insights
        </SidebarRailWithLabels.NavItem>
        <SidebarRailWithLabels.NavItem
          className="h-auto min-h-[44px] w-full flex-none"
          icon="FeatherLayers"
          selected={pathname === '/controls'}
          onClick={() => router.push('/controls')}
        >
          Controls
        </SidebarRailWithLabels.NavItem>
        <SidebarRailWithLabels.NavItem
          className="h-auto min-h-[44px] w-full flex-none"
          icon="FeatherShapes"
          selected={pathname === '/connectors'}
          onClick={() => router.push('/connectors')}
        >
          Connectors
        </SidebarRailWithLabels.NavItem>
        {/* <SidebarRailWithLabels.NavItem
          className="h-auto min-h-[44px] w-full flex-none"
          icon="FeatherShield"
          selected={pathname === '/defenses'}
          onClick={() => router.push('/defenses')}
        >
          Defenses
        </SidebarRailWithLabels.NavItem>
        <SidebarRailWithLabels.NavItem 
          icon="FeatherTestTube"
          selected={pathname === '/tests'}
          onClick={() => router.push('/tests')}
        >
          Tests
        </SidebarRailWithLabels.NavItem> */}
        <SidebarRailWithLabels.NavItem 
          icon="FeatherRefreshCw"
          selected={pathname === '/agents'}
          onClick={() => router.push('/agents')}
        >
          Agents
        </SidebarRailWithLabels.NavItem>
        <SidebarRailWithLabels.NavItem 
          icon="FeatherBarChart2" 
          selected={pathname === '/reports'}
          onClick={() => router.push('/reports')}
        >
          Reports
        </SidebarRailWithLabels.NavItem>
      </SidebarRailWithLabels>
      {children ? (
        <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 self-stretch overflow-y-auto bg-default-background">
          {children}
        </div>
      ) : null}
    </div>
  );
});

export const DefaultPageLayout = DefaultPageLayoutRoot;
