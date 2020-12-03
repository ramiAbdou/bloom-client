import { Computed, computed, createContextStore } from 'easy-peasy';
import moment from 'moment-timezone';

import { IPendingApplicant, ResolvedApplicantData } from '@store/entities';

type ApplicantModel = {
  applicant: IPendingApplicant;
  createdAt: Computed<ApplicantModel, string>;
  data: Computed<ApplicantModel, ResolvedApplicantData[]>;
  expandedData: Computed<ApplicantModel, ResolvedApplicantData[]>;
  fullName: Computed<ApplicantModel, string>;
};

export const applicantModel: ApplicantModel = {
  applicant: null,

  createdAt: computed(({ applicant }) =>
    moment(applicant?.createdAt).format('M/D/YY')
  ),

  data: computed(({ applicant }) =>
    (applicant?.applicantData as ResolvedApplicantData[])?.filter(
      ({ question }) => question.inApplicantCard
    )
  ),

  expandedData: computed(
    ({ applicant }) => applicant?.applicantData as ResolvedApplicantData[]
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
};

export default createContextStore<ApplicantModel>((model) => model, {
  disableImmer: true
});
