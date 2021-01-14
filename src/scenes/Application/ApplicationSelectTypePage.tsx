import React from 'react';

import FormErrorMessage from '@organisms/Form/FormErrorMessage';
import FormItem from '@organisms/Form/FormItem';
import FormPage from '@organisms/Form/FormPage';
import { IQuestion } from '@store/entities';
import { useStoreState } from '@store/Store';
import FormContinueButton from '../../components/organisms/Form/FormContinueButton';

const ApplicationSelectTypePage: React.FC = () => {
  const questions: IQuestion[] = useStoreState(({ db }) => {
    const { byId: byQuestionId } = db.entities.questions;
    return db.community?.questions
      ?.map((questionId: string) => byQuestionId[questionId])
      ?.filter((question: IQuestion) => question.inApplication);
  });

  return (
    <FormPage id="SELECT_TYPE">
      HELLO
      {/* {questions?.map((props) => (
        <FormItem key={props.id} {...props} />
      ))}

      <FormErrorMessage marginBottom={-24} />
      <FormContinueButton>Next: Choose Membership</FormContinueButton> */}
    </FormPage>
  );
};

export default ApplicationSelectTypePage;
