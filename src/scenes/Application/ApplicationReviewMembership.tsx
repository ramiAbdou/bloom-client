import React from 'react';

import InformationCard from '@containers/Card/InformationCard';
import Row from '@containers/Row/Row';
import FormSection from '@organisms/Form/FormSection';
import FormSectionHeader from '@organisms/Form/FormSectionHeader';
import StoryStore from '@organisms/Story/Story.store';
import {
  IMemberPlan,
  IPaymentMethod,
  RecurrenceType
} from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';

const ApplicationReviewMembeship: React.FC = () => {
  const selectedTypeName: string = StoryStore.useStoreState(({ items }) => {
    return items.MEMBERSHIP_TYPE?.value;
  });

  const {
    brand,
    expirationDate,
    last4
  }: IPaymentMethod = StoryStore.useStoreState(({ items }) => {
    return items.CREDIT_OR_DEBIT_CARD?.value ?? {};
  });

  const isPaidMembershipSelected: boolean = useStoreState(({ db }) => {
    const selectedType: IMemberPlan = db.community?.plans
      ?.map((planId: string) => db.byMemberPlanId[planId])
      ?.find((type: IMemberPlan) => type?.name === selectedTypeName);

    return !!selectedType?.amount;
  });

  const description: string = useStoreState(({ db }) => {
    const selectedType: IMemberPlan = db.community?.plans
      ?.map((planId: string) => db.byMemberPlanId[planId])
      ?.find((type: IMemberPlan) => type?.name === selectedTypeName);

    if (!selectedType) return null;

    const { amount, recurrence } = selectedType;

    // Formats the amount with FREE if the amount is 0.
    const amountString = amount ? `$${amount}` : 'FREE';

    // Construct string "Per" timespan based on the recurrence.
    const recurrenceString = takeFirst([
      [recurrence === RecurrenceType.YEARLY, 'Per Year'],
      [recurrence === RecurrenceType.MONTHLY, 'Per Month'],
      [recurrence === RecurrenceType.LIFETIME, 'Lifetime']
    ]);

    return `${amountString} ${recurrenceString}`;
  });

  return (
    <FormSection>
      <FormSectionHeader
        title={last4 ? 'Membership & Payment' : 'Membership Plan'}
      />

      <Row justify="sb" spacing="xs">
        <InformationCard description={description} title={selectedTypeName} />

        <InformationCard
          description={`Expires ${expirationDate}`}
          show={!!isPaidMembershipSelected && !!last4}
          title={`${brand} Ending in ${last4}`}
        />
      </Row>
    </FormSection>
  );
};

export default ApplicationReviewMembeship;
