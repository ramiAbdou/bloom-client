/**
 * @fileoverview Store: Applicant
 * @author Rami Abdou
 */

import { Computed, computed, createContextStore } from 'easy-peasy';
import moment from 'moment-timezone';

import { IPendingApplicant, ResolvedApplicantData } from '@store/schema';

type ApplicantModel = {
  applicant: IPendingApplicant;
  createdAt: Computed<ApplicantModel, string>;
  data: Computed<ApplicantModel, ResolvedApplicantData[]>;
  fullName: Computed<ApplicantModel, string>;
};

export default createContextStore<ApplicantModel>(
  (initialApplicant: IPendingApplicant) => ({
    applicant: initialApplicant,

    createdAt: computed(({ applicant }) =>
      moment(applicant?.createdAt).format('M/D/YY')
    ),

    data: computed(({ applicant }) =>
      (applicant?.applicantData as ResolvedApplicantData[])?.filter(
        ({ question }) => question.inApplicantCard
      )
    ),

    fullName: computed(({ applicant }) => {
      const firstNameQuestion = (applicant?.applicantData as ResolvedApplicantData[])?.find(
        ({ question }) => question.category === 'FIRST_NAME'
      );

      const lastNameQuestion = (applicant?.applicantData as ResolvedApplicantData[])?.find(
        ({ question }) => question.category === 'LAST_NAME'
      );

      return !firstNameQuestion || !lastNameQuestion
        ? ''
        : `${firstNameQuestion.value} ${lastNameQuestion.value}`;
    })
  }),
  { disableImmer: true }
);
