import React from 'react';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import Form, { OnFormSubmitFunction } from '@components/organisms/Form/Form';
import FormHeader from '@components/organisms/Form/FormHeader';
import FormSubmitButton from '@components/organisms/Form/FormSubmitButton';
import { IMemberSocials } from '@util/constants.entities';
import ProfileSocialModalFormQuestionList from './ProfileSocialModalFormQuestionList';
import useUpdateMemberSocials from './useUpdateMemberSocials';

interface GetMemberSocialsByMemberIdResult {
  memberSocials: IMemberSocials[];
}

const GET_MEMBER_SOCIALS_BY_MEMBER_ID: DocumentNode = gql`
  query GetMemberSocialsByMemberId($memberId: String!) {
    memberId @client @export(as: "memberId")

    memberSocials(where: { memberId: { _eq: $memberId } }) {
      ...ProfileSocialModalFormQuestionListFragment
    }
  }
  ${ProfileSocialModalFormQuestionList.fragment}
`;

const ProfileSocialModalFormHeader: React.FC = () => (
  <FormHeader title="Edit Social Media" />
);

const ProfileSocialModalFormSubmitButton: React.FC = () => (
  <FormSubmitButton loadingText="Saving...">Save</FormSubmitButton>
);

const ProfileSocialModalForm: React.FC = () => {
  const { data, loading } = useQuery<GetMemberSocialsByMemberIdResult>(
    GET_MEMBER_SOCIALS_BY_MEMBER_ID
  );

  const memberSocials: IMemberSocials = data?.memberSocials?.length
    ? data?.memberSocials[0]
    : null;

  const updateMemberSocials: OnFormSubmitFunction = useUpdateMemberSocials();

  if (loading || !memberSocials) return null;

  return (
    <Form onSubmit={updateMemberSocials}>
      <ProfileSocialModalFormHeader />
      <ProfileSocialModalFormQuestionList data={memberSocials} />
      <ProfileSocialModalFormSubmitButton />
    </Form>
  );
};

export default ProfileSocialModalForm;
