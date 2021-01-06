import deepequal from 'fast-deep-equal';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import Button from '@atoms/Button';
import Card from '@containers/Card/Card';
import { IMemberType } from '@store/entities';
import { useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';

const CurrentPlanContent = () => {
  const currentType: IMemberType = useStoreState(({ db }) => {
    return db.entities.types.byId[db.member.type];
  }, deepequal);

  if (!currentType) return null;

  const { amount, name, recurrence } = currentType;

  // Formats the amount with FREE if the amount is 0.
  const amountString = amount ? `$${amount / 100}` : 'FREE';

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

const ChangePlanButton = () => {
  const { url } = useRouteMatch();

  return (
    <Link to={`${url}/change-plan`}>
      <Button fill secondary>
        Change Membership Plan
      </Button>
    </Link>
  );
};

const CurrentPlanCard: React.FC = () => {
  return (
    <Card className="s-membership-card--plan">
      <div>
        <h4>Current Plan</h4>
      </div>

      <CurrentPlanContent />
      <ChangePlanButton />
    </Card>
  );
};

export default CurrentPlanCard;
