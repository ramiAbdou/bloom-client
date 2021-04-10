import React from 'react';

import { IMemberType, RecurrenceType } from '@core/db/db.entities';
import useFindOneFull from '@gql/hooks/useFindOneFull';
import { IdProps } from '@util/constants';
import { take } from '@util/util';

const ApplicationChooseTypeCard: React.FC<IdProps> = ({ id: memberTypeId }) => {
  const { data: memberType, loading } = useFindOneFull(IMemberType, {
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
