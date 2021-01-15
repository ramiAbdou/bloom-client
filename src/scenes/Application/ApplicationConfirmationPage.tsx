import React from 'react';

import Separator from '@atoms/Separator';
import Row from '@containers/Row/Row';
import QuestionValueList, {
  QuestionValueItemProps
} from '@molecules/QuestionValueList';
import FormStore from '@organisms/Form/Form.store';
import { validateItems } from '@organisms/Form/Form.util';
import FormErrorMessage from '@organisms/Form/FormErrorMessage';
import FormPage from '@organisms/Form/FormPage';
import { IQuestion } from '@store/entities';
import { useStoreState } from '@store/Store';
import InformationCard from '../../components/containers/Card/InformationCard';
import FormContinueButton from '../../components/organisms/Form/FormContinueButton';

const ApplicationConfirmationMembershipSection: React.FC = () => {
  return (
    <div className="s-application-confirmation-membership">
      <h2>Membership & Payment</h2>
      <Row spaceBetween>
        <InformationCard description="$125 Per Year" title="General Member" />
        <InformationCard
          description="Expires 05/2024"
          title="Mastercard Ending in 1234"
        />
      </Row>
    </div>
  );
};

const ApplicationConfirmationPage: React.FC = () => {
  const questions: IQuestion[] = useStoreState(({ db }) => {
    const { byId: byQuestionId } = db.entities.questions;
    return db.community?.questions
      ?.map((questionId: string) => byQuestionId[questionId])
      ?.filter((question: IQuestion) => question.inApplication);
  });

  const isConfirmationNext = FormStore.useStoreState(
    ({ pages }) => pages?.length === 2
  );

  const applicationItems = FormStore.useStoreState(({ items }) =>
    items?.filter((item) => item.page === 'APPLICATION')
  );

  const disabled = validateItems(questions)?.some(({ errorMessage }) => {
    return !!errorMessage;
  });

  if (!questions?.length) return null;

  const items: QuestionValueItemProps[] = applicationItems.map(
    ({ title, type, value }) => ({ handleNull: 'HIDE_ALL', title, type, value })
  );

  return (
    <FormPage className="s-application-confirmation" id="CONFIRMATION">
      <Separator marginBottom={24} marginTop={0} />
      <h2>Application</h2>
      <QuestionValueList items={items} marginBottom={24} />
      <ApplicationConfirmationMembershipSection />
      <FormErrorMessage marginBottom={-24} />
      <FormContinueButton disabled={disabled}>
        {isConfirmationNext ? 'Next: Confirmation' : 'Next: Choose Membership'}
      </FormContinueButton>
    </FormPage>
  );
};

export default ApplicationConfirmationPage;
