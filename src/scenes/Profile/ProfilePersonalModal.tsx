import React from 'react';
import { memberIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Form from '@components/organisms/Form/Form';
import { OnFormSubmitFunction } from '@components/organisms/Form/Form.types';
import FormHeader from '@components/organisms/Form/FormHeader';
import FormImage from '@components/organisms/Form/FormImage';
import FormLongText from '@components/organisms/Form/FormLongText';
import FormShortText from '@components/organisms/Form/FormShortText';
import FormSubmitButton from '@components/organisms/Form/FormSubmitButton';
import { IMember } from '@util/constants.entities';
import useFindOne from '@core/gql/hooks/useFindOne';
import { QuestionCategory } from '@util/constants';
import useUpdateMember from './useUpdateMember';

const ProfilePersonalModal: React.FC = () => {
  const memberId: string = useReactiveVar(memberIdVar);
  const updateMember: OnFormSubmitFunction = useUpdateMember();

  const { data: member, loading } = useFindOne(IMember, {
    fields: ['bio', 'firstName', 'lastName', 'pictureUrl'],
    where: { id: memberId }
  });

  if (loading) return null;

  return (
    <Form onSubmit={updateMember}>
      <FormHeader title="Edit Personal Information" />
      <FormImage
        id="PROFILE_PICTURE"
        required={false}
        value={member.pictureUrl}
      />

      <FormShortText
        category={QuestionCategory.FIRST_NAME}
        title="First Name"
        value={member.firstName}
      />

      <FormShortText
        category={QuestionCategory.LAST_NAME}
        title="Last Name"
        value={member.lastName}
      />

      <FormLongText id="BIO" required={false} title="Bio" value={member.bio} />
      <FormSubmitButton loadingText="Saving...">Save</FormSubmitButton>
    </Form>
  );
};

export default ProfilePersonalModal;
