import deepequal from 'fast-deep-equal';
import React from 'react';

import StatusTag from '@atoms/Tag/StatusTag';
import Card from '@containers/Card/Card';
import Row from '@containers/Row/Row';
import { IMemberType, RecurrenceType } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { take } from '@util/util';
import MembershipCurrentMemberTypeActions from './MembershipCurrentMemberTypeActions';

const MembershipCurrentMemberTypeHeader: React.FC = () => {
  const isDuesActive = useStoreState(({ db }) => db.member?.isDuesActive);

  return (
    <Row justify="sb" spacing="xs">
      <h3>Current Type</h3>

      <StatusTag positive={isDuesActive}>
        {isDuesActive ? 'Active' : 'Inactive'}
      </StatusTag>
    </Row>
  );
};

const MembershipCurrentMemberTypeDescription: React.FC = () => {
  const currentType: IMemberType = useStoreState(
    ({ db }) => db.byMemberTypeId[db.member.memberType],
    deepequal
  );

  if (!currentType) return null;

  const { amount, name, recurrence } = currentType;
  // Formats the amount with FREE if the amount is 0.
  const amountString = amount ? `$${amount}` : 'FREE';

  // Construct string "Per" timespan based on the recurrence.
  const recurrenceString = take([
    [recurrence === RecurrenceType.YEARLY, 'Per Year'],
    [recurrence === RecurrenceType.MONTHLY, 'Per Month']
  ]);

  return (
    <>
      <p>
        <span>{amountString}</span>
        <span>{recurrenceString}</span>
      </p>

      <p>{name}</p>
    </>
  );
};

const MembershipCurrentMemberType: React.FC = () => (
  <Card className="s-membership-card s-membership-card--plan">
    <MembershipCurrentMemberTypeHeader />
    <MembershipCurrentMemberTypeDescription />
    <MembershipCurrentMemberTypeActions />
  </Card>
);

export default MembershipCurrentMemberType;
