import React from 'react';

import Show from '@containers/Show';
import { IMemberType, RecurrenceType } from '@db/db.entities';
import useFindOne from '@gql/useFindOne';
import { IdProps } from '@util/constants';
import { take } from '@util/util';

const ApplicationChooseTypeCard: React.FC<IdProps> = ({ id: memberTypeId }) => {
  const { amount, recurrence } = useFindOne(IMemberType, {
    fields: ['amount', 'recurrence'],
    where: { id: memberTypeId }
  });

  // Formats the amount with FREE if the amount is 0.
  const amountString: string = amount ? `$${amount}` : 'FREE';

  // Construct string "Per" timespan based on the recurrence.
  const recurrenceString: string = take([
    [recurrence === RecurrenceType.YEARLY, 'Per Year'],
    [recurrence === RecurrenceType.MONTHLY, 'Per Month']
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
