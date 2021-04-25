import gql from 'graphql-tag';
import React from 'react';

import Form from '@components/organisms/Form/Form';
import { OnFormSubmitFunction } from '@components/organisms/Form/Form.types';
import FormSubmitButton from '@components/organisms/Form/FormSubmitButton';
import StoryStore from '@components/organisms/Story/Story.store';
import { ComponentWithFragments } from '@util/constants';
import { IApplication } from '@util/constants.entities';
import ApplicationMainPageFormQuestionList from './ApplicationMainPageFormQuestionList';
import useApplyToCommunity from './useApplyToCommunity';
import useValidateEmail from './useValidateEmail';

const ApplicationMainPageFormSubmitButton: React.FC = () => (
  <FormSubmitButton>Submit Application</FormSubmitButton>
);

const ApplicationMainPageForm: ComponentWithFragments<IApplication> = ({
  data: application
}) => {
  const isSolo: boolean = StoryStore.useStoreState(
    ({ pages }) =>
      pages?.filter(({ id }) => id !== 'CONFIRMATION')?.length === 1
  );

  const applyForMembership: OnFormSubmitFunction = useApplyToCommunity();
  const validateEmail: OnFormSubmitFunction = useValidateEmail();

  return (
    <Form
      spacing="lg"
      onSubmit={isSolo ? applyForMembership : validateEmail}
      onSubmitDeps={[isSolo]}
    >
      <ApplicationMainPageFormQuestionList data={application} />
      <ApplicationMainPageFormSubmitButton />
    </Form>
  );
};

ApplicationMainPageForm.fragment = gql`
  fragment ApplicationMainPageFormFragment on applications {
    ...ApplicationMainPageFormQuestionListFragment
  }
  ${ApplicationMainPageFormQuestionList.fragment}
`;

export default ApplicationMainPageForm;
