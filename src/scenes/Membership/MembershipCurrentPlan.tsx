import deepequal from 'fast-deep-equal';
import React from 'react';

import StatusTag from '@atoms/Tag/StatusTag';
import Card from '@containers/Card/Card';
import Row from '@containers/Row/Row';
import { IMemberType } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';
import MembershipCurrentPlanActions from './MembershipCurrentPlanActions';

const MembershipCurrentPlanHeader: React.FC = () => {
  const isDuesActive = useStoreState(({ db }) => db.member?.isDuesActive);

  return (
    <Row justify="sb" spacing="xs">
      <h3>Current Plan</h3>

      <StatusTag positive={isDuesActive}>
        {isDuesActive ? 'Active' : 'Inactive'}
      </StatusTag>
    </Row>
  );
};

const MembershipCurrentPlanDescription: React.FC = () => {
  const currentType: IMemberType = useStoreState(({ db }) => {
    return db.byTypeId[db.member.type];
  }, deepequal);

  if (!currentType) return null;

  const { amount, name, recurrence } = currentType;

  // Formats the amount with FREE if the amount is 0.
  const amountString = amount ? `$${amount}` : 'FREE';

  // Construct string "Per" timespan based on the recurrence.
  const recurrenceString = takeFirst([
    [recurrence === 'YEARLY', 'Per Year'],
    [recurrence === 'MONTHLY', 'Per Month'],
    [recurrence === 'LIFETIME', 'Lifetime']
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

const MembershipCurrentPlan: React.FC = () => (
  <Card className="s-membership-card s-membership-card--plan">
    <MembershipCurrentPlanHeader />
    <MembershipCurrentPlanDescription />
    <MembershipCurrentPlanActions />
  </Card>
);

export default MembershipCurrentPlan;
