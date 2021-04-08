import React from 'react';

import InformationCard from '@containers/Card/InformationCard';
import Row from '@containers/Row/Row';
import { IMemberType, IPaymentMethod, RecurrenceType } from '@db/db.entities';
import useFindOne from '@gql/useFindOne';
import FormSection from '@organisms/Form/FormSection';
import FormSectionHeader from '@organisms/Form/FormSectionHeader';
import StoryStore from '@organisms/Story/Story.store';
import { useStoreState } from '@store/Store';
import { take } from '@util/util';

const ApplicationReviewMembership: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.community?.id);

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

  const { amount, recurrence } = useFindOne(IMemberType, {
    where: { amount: { _gt: 0 }, communityId, name: selectedTypeName }
  });

  const amountString: string = amount ? `$${amount}` : 'FREE';

  const recurrenceString: string = take([
    [recurrence === RecurrenceType.YEARLY, 'Per Year'],
    [recurrence === RecurrenceType.MONTHLY, 'Per Month']
  ]);

  const description: string = `${amountString} ${recurrenceString}`;

  return (
    <FormSection>
      <FormSectionHeader
        title={last4 ? 'Membership & Payment' : 'Membership Type'}
      />

      <Row justify="sb" spacing="xs">
        <InformationCard description={description} title={selectedTypeName} />

        <InformationCard
          description={`Expires ${expirationDate}`}
          show={!!amount && !!last4}
          title={`${brand} Ending in ${last4}`}
        />
      </Row>
    </FormSection>
  );
};

export default ApplicationReviewMembership;
