export function getRelativeDate(daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
}

export const DemoDateOffsets = {
  lastAssessment: -15,          // 15 days ago
  nextAssessmentDue: 180,       // 6 months from now
  lastReviewDate: -30,          // 30 days ago
  contractRenewal: 90,          // 3 months from now
  certificationExpiry: 270,     // 9 months from now
  documentLastVerified: -7,     // 7 days ago
  documentUploaded: -45,        // 45 days ago
  questionnaireDue: 14,         // 2 weeks from now
  questionnaireSent: -7,        // 7 days ago
  actionPlanDue: 30             // 1 month from now
} as const; 