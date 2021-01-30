import deline from 'deline';
import React from 'react';
import { IoLockClosed } from 'react-icons/io5';

import Separator from '@atoms/Separator';
import Row from '@containers/Row/Row';
import QuestionValueList, {
  QuestionValueItemProps
} from '@molecules/QuestionValueList';
import Form from '@organisms/Form/Form';
import FormStore from '@organisms/Form/Form.store';
import FormErrorMessage from '@organisms/Form/FormErrorMessage';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import StoryPage from '@organisms/Story/StoryPage';
import { IMemberType, IQuestion } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';
import InformationCard from '../../components/containers/Card/InformationCard';

const ApplicationReviewMembeship: React.FC = () => {
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

const ApplicationReviewContent: React.FC = () => {
  const cardInfo = FormStore.useStoreState(({ getItem }) => {
    return getItem({ category: 'CREDIT_OR_DEBIT_CARD' })?.value?.last4;
  });

  const items: QuestionValueItemProps[] = FormStore.useStoreState((store) =>
    store.items?.map(({ title, type, value }) => ({
      handleNull: 'HIDE_ALL',
      title,
      type,
      value
    }))
  );

  return (
    <>
      <Separator marginBottom={24} marginTop={0} />
      <h2>Application</h2>
      <QuestionValueList items={items} marginBottom={24} />
      <ApplicationReviewMembeship />
      <FormErrorMessage marginBottom={24} marginTop={24} />

      <FormSubmitButton>
        {cardInfo && <IoLockClosed />}
        {cardInfo ? 'Confirm Payment and Join' : 'Submit Application'}
      </FormSubmitButton>
    </>
  );
};

const ApplicationReview: React.FC = () => {
  const questions: IQuestion[] = useStoreState(({ db }) => {
    const { byId: byQuestionId } = db.entities.questions;
    return db.community?.questions
      ?.map((questionId: string) => byQuestionId[questionId])
      ?.filter((question: IQuestion) => question.inApplication);
  });

  const showForm: boolean = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;
    const types = db.community?.types;

    const isMoreThanOneType = types?.length > 1;
    const isFirstTypePaid = !!types && !byTypeId[types[0]]?.isFree;
    return isMoreThanOneType || isFirstTypePaid;
  });

  if (!questions?.length) return null;

  if (!showForm) return null;

  return (
    <StoryPage
      className="s-application-confirmation"
      description={deline`
        You’re almost done! Just review this information to make sure we got
        everything right.
      `}
      id="FINISH"
      title="Confirmation"
    >
      <Form>
        <ApplicationReviewContent />
      </Form>
    </StoryPage>
  );
};

export default ApplicationReview;
