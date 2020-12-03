/**
 * @fileoverview Component: Stripe Details

 */

import React from 'react';

import { useStoreState } from '@store/Store';
import stripe from '../../images/stripe.png';
import ExpandedDetails, { ExpandedDetailProps } from './ExpandedDetails';

export default () => {
  const value = useStoreState(
    ({ integrations }) => integrations.stripeAccountId
  );

  const details: ExpandedDetailProps[] = [{ label: 'Account ID', value }];
  return <ExpandedDetails details={details} logo={stripe} name="Stripe" />;
};
