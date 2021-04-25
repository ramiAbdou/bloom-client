import React from 'react';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import Form from '@components/organisms/Form/Form';
import { OnFormSubmitFunction } from '@components/organisms/Form/Form.types';
import FormHeader from '@components/organisms/Form/FormHeader';
import FormSubmitButton from '@components/organisms/Form/FormSubmitButton';
import { IMember } from '@util/constants.entities';
import ProfilePersonalModalFormQuestionList from './ProfilePersonalModalFormQuestionList';
import useUpdateMemberPersonal from './useUpdateMemberPersonal';

interface GetMemberByIdResult {
  member: IMember;
}

const GET_MEMBER_BY_ID: DocumentNode = gql`
  query GetMemberById($memberId: String!) {
    memberId @client @export(as: "memberId")

    member(id: $memberId) {
      ...ProfilePersonalModalFormQuestionListFragment
    }
  }
  ${ProfilePersonalModalFormQuestionList.fragment}
`;

const ProfilePersonalModalFormHeader: React.FC = () => (
  <FormHeader title="Edit Personal Information" />
);

const ProfilePersonalModalFormSubmitButton: React.FC = () => (
  <FormSubmitButton loadingText="Saving...">Save</FormSubmitButton>
);

const ProfilePersonalModalForm: React.FC = () => {
  const { data, loading } = useQuery<GetMemberByIdResult>(GET_MEMBER_BY_ID);
  const updateMemberPersonal: OnFormSubmitFunction = useUpdateMemberPersonal();

  if (loading) return null;

  const member: IMember = data?.member;

  return (
    <Form onSubmit={updateMemberPersonal}>
      <ProfilePersonalModalFormHeader />
      <ProfilePersonalModalFormQuestionList data={member} />
      <ProfilePersonalModalFormSubmitButton />
    </Form>
  );
};

export default ProfilePersonalModalForm;
