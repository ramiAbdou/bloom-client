/**
 * @fileoverview Store: Applicant
 * @author Rami Abdou
 */

import { createContextStore } from 'easy-peasy';

import { IPendingApplicant } from '@store/schema';

type ApplicantModel = { applicant: IPendingApplicant };

export default createContextStore<ApplicantModel>(
  ({ applicant }: ApplicantModel) => ({ applicant }),
  { disableImmer: true }
);
