import { IMemberType, RecurrenceType } from '@store/db/Db.entities';
import { take } from '@util/util';

/**
 * Returns the type description based on the amount, recurrence and such.
 *
 * @example getMemberTypeDescription(args) => "FREE Per Month"
 * @example getMemberTypeDescription(args) => "$20 Per Year"
 */
export const getMemberTypeDescription = (
  type: Pick<IMemberType, 'amount' | 'recurrence'>
): string => {
  const { amount, recurrence } = type;
  // Formats the amount with FREE if the amount is 0.
  const amountString = amount ? `$${amount}` : 'FREE';

  // Construct string "Per" timespan based on the recurrence.
  const recurrenceString = take([
    [recurrence === RecurrenceType.YEARLY, 'Per Year'],
    [recurrence === RecurrenceType.MONTHLY, 'Per Month']
  ]);

  return `${amountString} ${recurrenceString}`;
};
