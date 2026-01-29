import type { StageKind } from "../../api/client";
import type { ZodObject } from "zod";
import { iAwardedContractRecievedStageDataSchema, iCancelledStageDataSchema, iInterviewedStageDataSchema, iLongLeadStageDataSchema, iLostStageDataSchema, iNoGoStageDataSchema, iSelectedAwaitingContractStageDataSchema, iShortlistedStageDataSchema, iSolicitationRfpRfqStageDataSchema, iSourcesSoughtStageDataSchema, iSubmittedStageDataSchema } from "../../api/client.zod";

/**
 * Map of polymorphic discriminator StageKind to their effective zod schema.
 */
export const stageSchemas: Record<StageKind, ZodObject<any>> = {
  LONG_LEAD: iLongLeadStageDataSchema,
  SOURCES_SOUGHT: iSourcesSoughtStageDataSchema,
  SOLICITATION_RFP_RFQ: iSolicitationRfpRfqStageDataSchema,
  SUBMITTED: iSubmittedStageDataSchema,
  SHORTLISTED: iShortlistedStageDataSchema,
  INTERVIEWED: iInterviewedStageDataSchema,
  WON_AWAITING_CONTRACT: iSelectedAwaitingContractStageDataSchema,
  WON_CONTRACT_RECIEVED: iAwardedContractRecievedStageDataSchema,
  LOST: iLostStageDataSchema,
  NO_GO: iNoGoStageDataSchema,
  CANCELLED: iCancelledStageDataSchema,
};