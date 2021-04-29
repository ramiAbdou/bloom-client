import React from 'react';

import { DocumentNode, gql, useQuery, useReactiveVar } from '@apollo/client';
import Modal from '@components/organisms/Modal/Modal';
import { modalVar } from '@components/organisms/Modal/Modal.state';
import { IMember } from '@util/constants.entities';
import ViewApplicantModalButtonList from './ViewApplicantModalButtonList';
import ViewApplicantModalFullName from './ViewApplicantModalFullName';
import ViewApplicantModalQuestionList from './ViewApplicantModalQuestionList';

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
      ...ViewApplicantModalButtonListFragment
      ...ViewApplicantModalFullNameFragment
      ...ViewApplicantModalQuestionListFragment
    }
  }
  ${ViewApplicantModalButtonList.fragment}
  ${ViewApplicantModalFullName.fragment}
  ${ViewApplicantModalQuestionList.fragment}
`;

const ViewApplicantModal: React.FC = () => {
  const memberId: string = useReactiveVar(modalVar)?.metadata as string;

  const { data, loading } = useQuery<
    GetApplicantByIdResult,
    GetApplicantByIdArgs
  >(GET_APPLICANT_BY_ID, { variables: { memberId } });

  if (loading) return null;

  const member: IMember = data?.member;

  return (
    <Modal>
      {member && <ViewApplicantModalFullName data={member} />}
      {member && <ViewApplicantModalQuestionList data={member} />}
      {member && <ViewApplicantModalButtonList data={member} />}
    </Modal>
  );
};

export default ViewApplicantModal;
