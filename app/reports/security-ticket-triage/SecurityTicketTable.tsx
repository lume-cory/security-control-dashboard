import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle, AlertCircle, MessageSquare, Mail, Ticket, Fish, Phone } from "lucide-react";

interface SecurityTicket {
  summary: string;
  user: string;
  ticketType: string;
  inboundTeam: string;
  slaStatus: "Met" | "Not Met";
  triage: "Urgent" | "High" | "Medium" | "Low";
  source: "Slack #ask-security channel" | "Email to security-helpdesk alias" | "Zendesk ticket" | "Phishing report button" | "Emergency hotline" | "Security review ticket";
}

const mockData: SecurityTicket[] = [
  {
    summary: "Suspicious login attempt from unknown IP",
    user: "Sarah Chen",
    ticketType: "Security Incident",
    inboundTeam: "Security Ops",
    slaStatus: "Met",
    triage: "High",
    source: "Slack #ask-security channel"
  },
  {
    summary: "Request for AWS access for new hire",
    user: "Mike Johnson",
    ticketType: "Access Request",
    inboundTeam: "IT",
    slaStatus: "Met",
    triage: "Low",
    source: "Zendesk ticket"
  },
  {
    summary: "Potential data leak in customer portal",
    user: "David Park",
    ticketType: "Security Incident",
    inboundTeam: "Engineering",
    slaStatus: "Not Met",
    triage: "Urgent",
    source: "Emergency hotline"
  },
  {
    summary: "Suspicious email from vendor",
    user: "Alex Thompson",
    ticketType: "Phishing",
    inboundTeam: "Security Ops",
    slaStatus: "Met",
    triage: "Medium",
    source: "Phishing report button"
  },
  {
    summary: "VPN access issues for remote team",
    user: "Emma Wilson",
    ticketType: "Access Issue",
    inboundTeam: "IT",
    slaStatus: "Met",
    triage: "Medium",
    source: "Email to security-helpdesk alias"
  }
];

export function SecurityTicketTable() {

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'Slack #ask-security channel':
        return <MessageSquare className="h-4 w-4 mr-2" />
      case 'Email to security-helpdesk alias':
        return <Mail className="h-4 w-4 mr-2" />  
      case 'Security review ticket':
        return <Ticket className="h-4 w-4 mr-2" />
      case 'Zendesk ticket':
        return <Ticket className="h-4 w-4 mr-2" />
      case 'Phishing report button':
        return <Fish className="h-4 w-4 mr-2" />
      case 'Emergency hotline':
        return <Phone className="h-4 w-4 mr-2" />
      default:
        return null
    }
  }

  return (
    <Table className="pb-12">
      <TableHeader>
        <TableRow>
          <TableHead>Summary</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Ticket Type</TableHead>
          <TableHead>Inbound Team</TableHead>
          <TableHead>SLA Status</TableHead>
          <TableHead>Triage</TableHead>
          <TableHead>Source</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockData.map((ticket, index) => (
          <TableRow key={index}>
            <TableCell>{ticket.summary}</TableCell>
            <TableCell>{ticket.user}</TableCell>
            <TableCell>{ticket.ticketType}</TableCell>
            <TableCell>{ticket.inboundTeam}</TableCell>
            <TableCell>
              <span className="inline-flex items-center gap-1.5">
                {ticket.slaStatus === 'Met' ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
                {ticket.slaStatus}
              </span>
            </TableCell>
            <TableCell>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                ticket.triage === 'Urgent' ? 'bg-red-100 text-red-800' :
                ticket.triage === 'High' ? 'bg-orange-100 text-orange-800' :
                ticket.triage === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
                }`}>
                {ticket.triage || 'Medium'}
              </span>
            </TableCell>
            <TableCell className="flex items-center">
              {getSourceIcon(ticket.source)}
              {ticket.source}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
} 