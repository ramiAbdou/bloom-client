import gql from 'graphql-tag';
import React from 'react';

import Form from '@components/organisms/Form/Form';
import { OnFormSubmitFunction } from '@components/organisms/Form/Form.types';
import FormSubmitButton from '@components/organisms/Form/FormSubmitButton';
import { ComponentWithFragments } from '@util/constants';
import { IApplication } from '@util/constants.entities';
import ApplicationMainPageFormQuestionList from './ApplicationMainPageFormQuestionList';
import useApplyToCommunity from './useApplyToCommunity';

const ApplicationMainPageFormSubmitButton: React.FC = () => (
  <FormSubmitButton>Submit Application</FormSubmitButton>
);

const ApplicationMainPageForm: ComponentWithFragments<IApplication> = ({
  data: application
}) => {
  const applyForMembership: OnFormSubmitFunction = useApplyToCommunity();

  return (
    <Form spacing="lg" onSubmit={applyForMembership}>
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
