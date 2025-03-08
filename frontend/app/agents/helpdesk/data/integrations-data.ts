import * as SubframeCore from "@subframe/core";

export interface Integration {
  name: string;
  subtitle: string;
  icon: SubframeCore.IconName;
  link: string;
}

export const integrations: Integration[] = [
  {
    name: "Slack Channels",
    subtitle: "37 channels",
    icon: "FeatherSlack",
    link: "#"
  },
  {
    name: "Knowledge Base",
    subtitle: "57 articles",
    icon: "FeatherBook",
    link: "#"
  },
  {
    name: "Security Policy Docs",
    subtitle: "150 files",
    icon: "FeatherFile",
    link: "#"
  },
  {
    name: "Prior Security Tickets",
    subtitle: "2.5k ticket threads",
    icon: "FeatherTicket",
    link: "#"
  },
  {
    name: "Security & Compliance Tools",
    subtitle: "197 configurations",
    icon: "FeatherTool",
    link: "#"
  }, 
  {
    name: "Security Design Reviews",
    subtitle: "320 files",
    icon: "FeatherFile",
    link: "#"
  }
] 