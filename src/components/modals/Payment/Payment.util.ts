import deline from 'deline';

import { FormNavigationPageProps } from '@organisms/Form/Form.types';

export type PaymentModalType =
  | 'CHANGE_MEMBERSHIP'
  | 'PAY_DUES'
  | 'UPDATE_PAYMENT_METHOD';

interface GetPaymentScreensArgs {
  isCardOnFile?: boolean;
  isFree?: boolean;
  type: PaymentModalType;
}

const addCardScreen: FormNavigationPageProps[] = [
  {
    description: deline`
      We don’t have your payment information yet. Please enter your
      information to continue to the next step.
    `,
    id: 'CARD_FORM',
    title: 'Update Payment Method'
  },
  { id: 'CONFIRMATION' }
];

const changeMembershipScreen: FormNavigationPageProps[] = [
  {
    id: 'FINISH',
    title: 'Change Membership Plan'
  }
];

const finishDuesScreen: FormNavigationPageProps[] = [
  {
    id: 'FINISH',
    title: 'Pay Dues'
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
  },
  { id: 'CONFIRMATION' }
];

const confirmationScreen: FormNavigationPageProps[] = [{ id: 'CONFIRMATION' }];

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
      ...confirmationScreen
    ];
  }

  if (type === 'PAY_DUES') {
    return [
      ...(!isCardOnFile ? addCardScreen : []),
      ...finishDuesScreen,
      ...confirmationScreen
    ];
  }

  if (type === 'CHANGE_MEMBERSHIP') {
    return [
      ...(!isCardOnFile ? addCardScreen : []),
      ...changeMembershipScreen,
      ...confirmationScreen
    ];
  }

  return [];
};
