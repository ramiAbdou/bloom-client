import { Computed, computed, createContextStore } from 'easy-peasy';
import moment from 'moment-timezone';

import { IMembership } from '@store/entities';

type ApplicantModel = {
  applicant: IMembership;
  createdAt: Computed<ApplicantModel, string>;
  data: Computed<ApplicantModel, any>;
  expandedData: Computed<ApplicantModel, any>;
  fullName: Computed<ApplicantModel, string>;
};

export const applicantModel: ApplicantModel = {
  applicant: null,

  createdAt: computed(({ applicant }) =>
    moment(applicant?.createdAt).format('M/D/YY')
  ),

  data: computed(({ applicant }) => {
    console.log(applicant);
    return applicant?.applicantData?.filter(
      ({ question }) => question?.inApplicantCard
    );
  }),

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
