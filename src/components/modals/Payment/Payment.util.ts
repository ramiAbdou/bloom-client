import { IMemberType, RecurrenceType } from '@store/Db/entities';
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
  const amountString = amount ? `$${amount}` : 'FREE';

  // Construct string "Per" timespan based on the recurrence.
  const recurrenceString = takeFirst([
    [recurrence === RecurrenceType.YEARLY, 'Per Year'],
    [recurrence === RecurrenceType.MONTHLY, 'Per Month'],
    [recurrence === RecurrenceType.LIFETIME, 'Lifetime']
  ]);

  return `${amountString} ${recurrenceString}`;
};
