import React from 'react';

import InformationCard from '@containers/Card/InformationCard';
import Row from '@containers/Row/Row';
import StoryStore from '@organisms/Story/Story.store';
import { IMemberType } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';

const ApplicationReviewMembeship: React.FC = () => {
  const selectedTypeName: string = StoryStore.useStoreState(({ items }) => {
    return items.MEMBERSHIP_TYPE?.value;
  });

  const cardInfo = StoryStore.useStoreState(({ items }) => {
    return items.CREDIT_OR_DEBIT_CARD?.value;
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

export default ApplicationReviewMembeship;
