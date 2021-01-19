import React from 'react';
import { IoLockClosed } from 'react-icons/io5';

import Separator from '@atoms/Separator';
import Row from '@containers/Row/Row';
import QuestionValueList, {
  QuestionValueItemProps
} from '@molecules/QuestionValueList';
import FormStore from '@organisms/Form/Form.store';
import FormErrorMessage from '@organisms/Form/FormErrorMessage';
import FormPage from '@organisms/Form/FormPage';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import { IMemberType, IQuestion } from '@store/entities';
import { useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';
import InformationCard from '../../components/containers/Card/InformationCard';

const ApplicationFinishMembershipSection: React.FC = () => {
  const selectedTypeName: string = FormStore.useStoreState(({ getItem }) => {
    return getItem({ category: 'MEMBERSHIP_TYPE' })?.value;
  });

  const cardInfo = FormStore.useStoreState(({ getItem }) => {
    return getItem({ category: 'CREDIT_OR_DEBIT_CARD' })?.value;
  });

  const isPaidMembershipSelected: boolean = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;

    const selectedType: IMemberType = db.community?.types
      ?.map((typeId: string) => byTypeId[typeId])
      ?.find((type: IMemberType) => type?.name === selectedTypeName);

    return !!selectedType?.amount;
  });

  const description = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;

    const selectedType: IMemberType = db.community?.types
      ?.map((typeId: string) => byTypeId[typeId])
      ?.find((type: IMemberType) => type?.name === selectedTypeName);

    if (!selectedType) return null;

    const { amount, recurrence } = selectedType;

    // Formats the amount with FREE if the amount is 0.
    const amountString = amount ? `$${amount / 100}` : 'FREE';

    // Construct string "Per" timespan based on the recurrence.
    const recurrenceString = takeFirst([
      [recurrence === 'YEARLY', 'Per Year'],
      [recurrence === 'MONTHLY', 'Per Month'],
      [recurrence === 'LIFETIME', 'Lifetime']
    ]);

    return `${amountString} ${recurrenceString}`;
  });

  const { brand, expirationDate, last4 } = cardInfo ?? {};

  return (
    <div className="s-application-confirmation-membership">
      <h2>{cardInfo ? 'Membership & Payment' : 'Membership Plan'} </h2>
      <Row spaceBetween>
        <InformationCard description={description} title={selectedTypeName} />

        <InformationCard
          description={`Expires ${expirationDate}`}
          show={!!isPaidMembershipSelected && !!last4}
          title={`${brand} Ending in ${last4}`}
        />
      </Row>
    </div>
  );
};

const ApplicationFinishPage: React.FC = () => {
  const questions: IQuestion[] = useStoreState(({ db }) => {
    const { byId: byQuestionId } = db.entities.questions;
    return db.community?.questions
      ?.map((questionId: string) => byQuestionId[questionId])
      ?.filter((question: IQuestion) => question.inApplication);
  });

  const cardInfo = FormStore.useStoreState(({ getItem }) => {
    return getItem({ category: 'CREDIT_OR_DEBIT_CARD' })?.value?.last4;
  });

  const applicationItems = FormStore.useStoreState(({ items }) =>
    items?.filter((item) => item.page === 'APPLICATION')
  );

  if (!questions?.length) return null;

  const items: QuestionValueItemProps[] = applicationItems.map(
    ({ title, type, value }) => ({ handleNull: 'HIDE_ALL', title, type, value })
  );

  return (
    <FormPage className="s-application-confirmation" id="FINISH">
      <Separator marginBottom={24} marginTop={0} />
      <h2>Application</h2>
      <QuestionValueList items={items} marginBottom={24} />
      <ApplicationFinishMembershipSection />
      <FormErrorMessage marginBottom={24} marginTop={24} />

      <FormSubmitButton>
        {cardInfo && <IoLockClosed />}
        {cardInfo ? 'Confirm Payment and Join' : 'Submit Application'}
      </FormSubmitButton>
    </FormPage>
  );
};

export default ApplicationFinishPage;
