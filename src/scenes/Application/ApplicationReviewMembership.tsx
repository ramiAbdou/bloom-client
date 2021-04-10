import React from 'react';

import InformationCard from '@components/containers/Card/InformationCard';
import Row from '@components/containers/Row/Row';
import FormSection from '@components/organisms/Form/FormSection';
import FormSectionHeader from '@components/organisms/Form/FormSectionHeader';
import StoryStore from '@components/organisms/Story/Story.store';
import {
  IMemberType,
  IPaymentMethod,
  RecurrenceType
} from '@core/db/db.entities';
import useFindOneFull from '@core/gql/hooks/useFindOneFull';
import { useStoreState } from '@core/store/Store';
import { take } from '@util/util';

const ApplicationReviewMembership: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

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

  const { data: memberType, loading } = useFindOneFull(IMemberType, {
    where: { amount: { _gt: 0 }, communityId, name: selectedTypeName }
  });

  if (loading) return null;

  const amountString: string = memberType.amount
    ? `$${memberType.amount}`
    : 'FREE';

  const recurrenceString: string = take([
    [memberType.recurrence === RecurrenceType.YEARLY, 'Per Year'],
    [memberType.recurrence === RecurrenceType.MONTHLY, 'Per Month']
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
          show={!!memberType.amount && !!last4}
          title={`${brand} Ending in ${last4}`}
        />
      </Row>
    </FormSection>
  );
};

export default ApplicationReviewMembership;
