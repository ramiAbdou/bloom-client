import React from 'react';

import { IMember } from '@db/db.entities';
import useFindOne from '@gql/useFindOne';
import Form from '@organisms/Form/Form';
import { OnFormSubmitFunction } from '@organisms/Form/Form.types';
import FormHeader from '@organisms/Form/FormHeader';
import FormImage from '@organisms/Form/FormImage';
import FormLongText from '@organisms/Form/FormLongText';
import FormShortText from '@organisms/Form/FormShortText';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import { useStoreState } from '@store/Store';
import { QuestionCategory } from '@util/constants';
import useUpdateMember from './useUpdateMember';

const ProfilePersonalModal: React.FC = () => {
  const memberId: string = useStoreState(({ db }) => db.memberId);

  const { bio, firstName, lastName, pictureUrl } = useFindOne(IMember, {
    fields: ['bio', 'firstName', 'lastName', 'pictureUrl'],
    where: { id: memberId }
  });

  const updateMember: OnFormSubmitFunction = useUpdateMember();

  return (
    <Form onSubmit={updateMember}>
      <FormHeader title="Edit Personal Information" />
      <FormImage id="PROFILE_PICTURE" required={false} value={pictureUrl} />

      <FormShortText
        category={QuestionCategory.FIRST_NAME}
        title="First Name"
        value={firstName}
      />

      <FormShortText
        category={QuestionCategory.LAST_NAME}
        title="Last Name"
        value={lastName}
      />
      <FormLongText id="BIO" required={false} title="Bio" value={bio} />
      <FormSubmitButton loadingText="Saving...">Save</FormSubmitButton>
    </Form>
  );
};

export default ProfilePersonalModal;
