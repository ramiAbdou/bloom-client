import deepequal from 'fast-deep-equal';
import React from 'react';

import Show from '@containers/Show';
import { IMemberPlan, RecurrenceType } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { IdProps } from '@util/constants';
import { take } from '@util/util';

const ApplicationChooseTypeCard: React.FC<IdProps> = ({ id: planId }) => {
  const { amount, recurrence }: IMemberPlan = useStoreState(({ db }) => {
    return db.byMemberPlanId[planId];
  }, deepequal);

  // Formats the amount with FREE if the amount is 0.
  const amountString = amount ? `$${amount}` : 'FREE';

  // Construct string "Per" timespan based on the recurrence.
  const recurrenceString = take([
    [recurrence === RecurrenceType.YEARLY, 'Per Year'],
    [recurrence === RecurrenceType.MONTHLY, 'Per Month'],
    [recurrence === RecurrenceType.LIFETIME, 'Lifetime']
  ]);

  return (
    <Show show={amount !== undefined && recurrence !== undefined}>
      <p className="s-application-type-string">
        <span>{amountString}</span>
        <span>{recurrenceString}</span>
      </p>
    </Show>
  );
};

export default ApplicationChooseTypeCard;
