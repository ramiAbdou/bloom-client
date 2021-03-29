import { IMemberPlan, RecurrenceType } from '@store/Db/entities';
import { take } from '@util/util';

/**
 * Returns the type description based on the amount, recurrence and such.
 *
 * @example getPlanDescription(args) => FREE Per Month
 * @example getPlanDescription(args) => $20 Per Year
 */
export const getPlanDescription = (
  type: Pick<IMemberPlan, 'amount' | 'recurrence'>
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
