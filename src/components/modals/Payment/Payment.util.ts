import { IMemberType } from '@store/Db/entities';
import { takeFirst } from '@util/util';

/**
 * Returns the type description based on the amount, recurrence and such.
 *
 * @example getTypeDescription(args) => FREE Per Month
 * @example getTypeDescription(args) => $20 Per Year
 * @example getTypeDescription(args) => $325 Lifetime
 */
export const getTypeDescription = (
  type: Pick<IMemberType, 'amount' | 'recurrence'>
) => {
  const { amount, recurrence } = type;

  // Formats the amount with FREE if the amount is 0.
  const amountString = amount ? `$${amount / 100}` : 'FREE';

  // Construct string "Per" timespan based on the recurrence.
  const recurrenceString = takeFirst([
    [recurrence === 'YEARLY', 'Per Year'],
    [recurrence === 'MONTHLY', 'Per Month'],
    [recurrence === 'LIFETIME', 'Lifetime']
  ]);

  return `${amountString} ${recurrenceString}`;
};
