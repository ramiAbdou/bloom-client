import { Computed, computed, createContextStore } from 'easy-peasy';
import moment from 'moment-timezone';

import { ApplicantData, IPendingApplicant } from '@store/entities';

type ApplicantModel = {
  applicant: IPendingApplicant;
  createdAt: Computed<ApplicantModel, string>;
  data: Computed<ApplicantModel, ApplicantData[]>;
  expandedData: Computed<ApplicantModel, ApplicantData[]>;
  fullName: Computed<ApplicantModel, string>;
};

export const applicantModel: ApplicantModel = {
  applicant: null,

  createdAt: computed(({ applicant }) =>
    moment(applicant?.createdAt).format('M/D/YY')
  ),

  data: computed(({ applicant }) =>
    applicant?.applicantData?.filter(({ question }) => question.inApplicantCard)
  ),

  expandedData: computed(({ applicant }) => applicant?.applicantData),

  fullName: computed(({ applicant }) => {
    const firstNameQuestion = applicant?.applicantData?.find(
      ({ question }) => question.category === 'FIRST_NAME'
    );

    const lastNameQuestion = applicant?.applicantData?.find(
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
