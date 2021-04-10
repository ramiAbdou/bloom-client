import React from 'react';

import Form from '@components/organisms/Form/Form';
import { OnFormSubmitFunction } from '@components/organisms/Form/Form.types';
import FormHeader from '@components/organisms/Form/FormHeader';
import FormImage from '@components/organisms/Form/FormImage';
import FormLongText from '@components/organisms/Form/FormLongText';
import FormShortText from '@components/organisms/Form/FormShortText';
import FormSubmitButton from '@components/organisms/Form/FormSubmitButton';
import { useStoreState } from '@core/store/Store';
import { IMember } from '@core/db/db.entities';
import useFindOne from '@gql/hooks/useFindOne';
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
