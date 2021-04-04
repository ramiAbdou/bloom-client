import React from 'react';

import InformationCard from '@containers/Card/InformationCard';
import Row from '@containers/Row/Row';
import FormSection from '@organisms/Form/FormSection';
import FormSectionHeader from '@organisms/Form/FormSectionHeader';
import StoryStore from '@organisms/Story/Story.store';
import {
  IMemberType,
  IPaymentMethod,
  RecurrenceType
} from '@db/Db.entities';
import { useStoreState } from '@store/Store';
import { take } from '@util/util';

const ApplicationReviewMembeship: React.FC = () => {
  const selectedTypeName: string = StoryStore.useStoreState(
    ({ items }) => items.MEMBER_TYPE?.value as string
  );

  const {
    brand,
    expirationDate,
    last4
  }: IPaymentMethod = StoryStore.useStoreState(
    ({ items }) => (items.CREDIT_OR_DEBIT_CARD?.value ?? {}) as IPaymentMethod
  );

  const isPaidMembershipSelected: boolean = useStoreState(({ db }) => {
    const selectedType: IMemberType = db.community?.memberTypes
      ?.map((memberTypeId: string) => db.byMemberTypeId[memberTypeId])
      ?.find((type: IMemberType) => type?.name === selectedTypeName);

    return !!selectedType?.amount;
  });

  const description: string = useStoreState(({ db }) => {
    const selectedType: IMemberType = db.community?.memberTypes
      ?.map((memberTypeId: string) => db.byMemberTypeId[memberTypeId])
      ?.find((type: IMemberType) => type?.name === selectedTypeName);

    if (!selectedType) return null;

    const { amount, recurrence } = selectedType;
    // Formats the amount with FREE if the amount is 0.
    const amountString = amount ? `$${amount}` : 'FREE';

    // Construct string "Per" timespan based on the recurrence.
    const recurrenceString = take([
      [recurrence === RecurrenceType.YEARLY, 'Per Year'],
      [recurrence === RecurrenceType.MONTHLY, 'Per Month']
    ]);

    return `${amountString} ${recurrenceString}`;
  });

  return (
    <FormSection>
      <FormSectionHeader
        title={last4 ? 'Membership & Payment' : 'Membership Type'}
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
