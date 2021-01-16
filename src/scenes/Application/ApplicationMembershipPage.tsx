import React from 'react';

import FormStore from '@organisms/Form/Form.store';
import { validateItems } from '@organisms/Form/Form.util';
import FormContinueButton from '@organisms/Form/FormContinueButton';
import FormItem from '@organisms/Form/FormItem';
import FormPage from '@organisms/Form/FormPage';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import { IQuestion } from '@store/entities';
import { useStoreState } from '@store/Store';

const ApplicationMembershipPageButton: React.FC = () => {
  const isSoloPage = FormStore.useStoreState(
    ({ pages }) => pages?.length === 1
  );

  const pageItems = FormStore.useStoreState(({ items }) =>
    items?.filter((item) => item.page === 'APPLICATION')
  );

  const isConfirmationNext = FormStore.useStoreState(
    ({ pages }) => pages?.length === 2
  );

  const disabled = validateItems(pageItems)?.some(({ errorMessage }) => {
    return !!errorMessage;
  });

  if (isSoloPage) {
    return <FormSubmitButton>Submit Application</FormSubmitButton>;
  }

  return (
    <FormContinueButton disabled={disabled}>
      {isConfirmationNext ? 'Next: Confirmation' : 'Next: Choose Membership'}
    </FormContinueButton>
  );
};

const ApplicationMembershipPage: React.FC = () => {
  const iconUrl = useStoreState(({ db }) => db.community?.logoUrl);

  const questions: IQuestion[] = useStoreState(({ db }) => {
    const { byId: byQuestionId } = db.entities.questions;
    return db.community?.questions
      ?.map((questionId: string) => byQuestionId[questionId])
      ?.filter((question: IQuestion) => question.inApplication);
  });

  if (!questions?.length) return null;

  return (
    <FormPage iconUrl={iconUrl} id="APPLICATION">
      {questions?.map((props) => (
        <FormItem key={props.id} page="APPLICATION" {...props} />
      ))}

      <ApplicationMembershipPageButton />
    </FormPage>
  );
};

export default ApplicationMembershipPage;
