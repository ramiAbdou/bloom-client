import React from 'react';

import { DocumentNode, gql, useQuery, useReactiveVar } from '@apollo/client';
import { modalVar } from '@components/organisms/Modal/Modal.state';
import { IMember } from '@util/constants.entities';
import ApplicantsViewModalButtonList from './ApplicantsViewModalButtonList';
import ApplicantsViewModalFullName from './ApplicantsViewModalFullName';
import ApplicantsViewModalQuestionList from './ApplicantsViewModalQuestionList';

interface GetApplicantByIdArgs {
  memberId: string;
}

interface GetApplicantByIdResult {
  member: IMember;
}

const GET_APPLICANT_BY_ID: DocumentNode = gql`
  query GetApplicantById($memberId: String!) {
    member(id: $memberId) {
      id
      ...ApplicantsViewModalButtonListFragment
      ...ApplicantsViewModalFullNameFragment
      ...ApplicantsViewModalQuestionListFragment
    }
  }
  ${ApplicantsViewModalButtonList.fragment}
  ${ApplicantsViewModalFullName.fragment}
  ${ApplicantsViewModalQuestionList.fragment}
`;

const ApplicantsModal: React.FC = () => {
  const memberId: string = useReactiveVar(modalVar)?.metadata as string;

  const { data, loading } = useQuery<
    GetApplicantByIdResult,
    GetApplicantByIdArgs
  >(GET_APPLICANT_BY_ID, { variables: { memberId } });

  if (loading) return null;

  const member: IMember = data?.member;

  return (
    <>
      {member && <ApplicantsViewModalFullName data={member} />}
      {member && <ApplicantsViewModalQuestionList data={member} />}
      {member && <ApplicantsViewModalButtonList data={member} />}
    </>
  );
};

export default ApplicantsModal;
