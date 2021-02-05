import deepequal from 'fast-deep-equal';
import React from 'react';

import { IdProps } from '@constants';
import Show from '@containers/Show';
import { IMemberType } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';

const ApplicationChooseTypeCard: React.FC<IdProps> = ({ id: typeId }) => {
  const { amount, recurrence }: IMemberType = useStoreState(({ db }) => {
    return db.byTypeId[typeId];
  }, deepequal);

  // Formats the amount with FREE if the amount is 0.
  const amountString = amount ? `$${amount / 100}` : 'FREE';

  // Construct string "Per" timespan based on the recurrence.
  const recurrenceString = takeFirst([
    [recurrence === 'YEARLY', 'Per Year'],
    [recurrence === 'MONTHLY', 'Per Month'],
    [recurrence === 'LIFETIME', 'Lifetime']
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
