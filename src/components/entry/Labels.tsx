import type { StageKind } from "../../api/client";

// User-friendly labels for the UI
export const StageKindLabels: Record<StageKind, string> = {
  LONG_LEAD: "Long Lead",
  SOURCES_SOUGHT: "Sources Sought",
  SOLICITATION_RFP_RFQ: "Solicitation RFP/RFQ",
  SUBMITTED: "Submitted",
  SHORTLISTED: "Shortlisted",
  INTERVIEWED: "Interviewed",
  WON_AWAITING_CONTRACT: "Selected / Awaiting Contract",
  WON_CONTRACT_RECIEVED: "Awarded / Contract Received",
  LOST: "Lost",
  NO_GO: "No-Go",
  CANCELLED: "Cancelled",
};
