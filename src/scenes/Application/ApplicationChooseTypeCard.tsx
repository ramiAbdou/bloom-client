import React from 'react';

import useFindOne from '@gql/hooks/useFindOne';
import { IdProps } from '@util/constants';
import { IMemberType, RecurrenceType } from '@util/db.entities';
import { take } from '@util/util';

const ApplicationChooseTypeCard: React.FC<IdProps> = ({ id: memberTypeId }) => {
  const { data: memberType, loading } = useFindOne(IMemberType, {
    fields: ['amount', 'recurrence'],
    where: { id: memberTypeId }
  });

  if (loading) return null;

  // Formats the amount with FREE if the amount is 0.
  const amountString: string = memberType.amount
    ? `$${memberType.amount}`
    : 'FREE';

  // Construct string "Per" timespan based on the recurrence.
  const recurrenceString: string = take([
    [memberType.recurrence === RecurrenceType.YEARLY, 'Per Year'],
    [memberType.recurrence === RecurrenceType.MONTHLY, 'Per Month']
  ]);

  return (
    <p className="s-application-type-string">
      <span>{amountString}</span>
      <span>{recurrenceString}</span>
    </p>
  );
};

export default ApplicationChooseTypeCard;
