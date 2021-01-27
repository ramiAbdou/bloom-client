import deline from 'deline';

import { FormNavigationPageProps } from '@organisms/Form/Form.types';
import { IMemberType } from '@store/Db/entities';
import { takeFirst } from '@util/util';

export type PaymentModalType =
  | 'CHANGE_MEMBERSHIP'
  | 'PAY_DUES'
  | 'UPDATE_PAYMENT_METHOD';

interface GetPaymentScreensArgs {
  isCardOnFile?: boolean;
  isFree?: boolean;
  type: PaymentModalType;
}

// ## CARD FORM SCREENS

const addCardScreen: FormNavigationPageProps[] = [
  {
    description: deline`
      We don’t have your payment information yet. Please enter your
      information to continue to the next step.
    `,
    id: 'CARD_FORM',
    title: 'Update Payment Method'
  }
];

const updateCardScreen: FormNavigationPageProps[] = [
  {
    description: deline`
      An update to your current subscription will be reflected on your
      next billing date.  
    `,
    id: 'CARD_FORM',
    title: 'Update Payment Method'
  }
];

const updateCardConfirmationScreen: FormNavigationPageProps[] = [
  {
    description: deline`
      Your card on file has been updated, and you may now use this card to pay
      dues. We sent you a confirmation email!
    `,
    id: 'CONFIRMATION',
    title: 'Payment Method Updated'
  }
];

// ## FINISH SCREENS

const changeMembershipScreen: FormNavigationPageProps[] = [
  {
    description: deline`
      Please review this information to make sure we got everything right.
    `,
    disableValidation: true,
    id: 'FINISH',
    title: 'Change Membership Plan'
  }
];

const changeToFreeMembershipScreen: FormNavigationPageProps[] = [
  {
    description: `Are you sure you want to downgrade your membership?`,
    disableValidation: true,
    id: 'FINISH',
    title: 'Change Membership Plan'
  }
];

const changeMembershipConfirmationScreen: FormNavigationPageProps[] = [
  {
    description: deline`
      Your membership has successfully been changed. Please check your email
      for a confirmation.
    `,
    disableValidation: true,
    id: 'CONFIRMATION',
    title: 'Membership Plan Changed'
  }
];

const finishDuesScreen: FormNavigationPageProps[] = [
  {
    description: deline`
      Please review this information to make sure we got everything right.
    `,
    disableValidation: true,
    id: 'FINISH',
    title: 'Pay Dues'
  }
];

const payDuesConfirmationScreen: FormNavigationPageProps[] = [
  {
    description: deline`
      Your dues have been paid successfully! Please check your email
      for a receipt.
    `,
    disableValidation: true,
    id: 'CONFIRMATION',
    title: 'Dues Payment Successful'
  }
];

/**
 * Returns an array of the payment screens that should be shown to the user
 * based on the current status of the modal (ie: whether or not the user
 * already has a card on file, etc).
 *
 * @example getPaymentPages(args) => [
 *  { id: 'CARD_FORM', title: 'Update Payment Method' },
 *  { id: 'PAY_DUES', title: 'Pay Dues' },
 *  { id: 'CONFIRMATION', title: 'Confirmation' },
 * ]
 */
export const getPaymentPages = ({
  isCardOnFile,
  isFree,
  type
}: GetPaymentScreensArgs) => {
  if (type === 'UPDATE_PAYMENT_METHOD') {
    return [
      ...(isCardOnFile ? updateCardScreen : addCardScreen),
      ...updateCardConfirmationScreen
    ];
  }

  if (type === 'PAY_DUES') {
    return [
      ...(!isCardOnFile ? addCardScreen : []),
      ...finishDuesScreen,
      ...payDuesConfirmationScreen
    ];
  }

  if (type === 'CHANGE_MEMBERSHIP') {
    return [
      ...(!isCardOnFile ? addCardScreen : []),
      ...(isFree ? changeToFreeMembershipScreen : changeMembershipScreen),
      ...changeMembershipConfirmationScreen
    ];
  }

  return [];
};

/**
 * Returns the type description based on the amount, recurrence and such.
 *
 * @example getTypeDescription(args) => FREE Per Month
 * @example getTypeDescription(args) => $20 Per Year
 * @example getTypeDescription(args) => $325 Lifetime
 */
export const getTypeDescription = (type: IMemberType) => {
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
