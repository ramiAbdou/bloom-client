import React, { useEffect } from 'react';

import IntegrationsStore, {
  IntegrationsModalType
} from '@scenes/Integrations/Integrations.store';
import { useStoreState } from '@store/Store';
import mailchimp from './images/mailchimp.png';
import stripe from './images/stripe.png';
import IntegrationsDetailsModal, {
  ExpandedDetailProps
} from './IntegrationsDetailsModal';
import IntegrationsMailchimpForm from './IntegrationsMailchimpModal';

const IntegrationsMailchimpDetails: React.FC = () => {
  const listName = useStoreState(({ db }) => db.integrations.mailchimpListName);
  const listId = useStoreState(({ db }) => db.integrations.mailchimpListId);
  const flow = IntegrationsStore.useStoreState((store) => store.flow);

  if (flow !== 'MAILCHIMP_DETAILS') return null;

  const details: ExpandedDetailProps[] = [
    { label: 'Audience/List Name', value: listName },
    { label: 'Audience/List ID', value: listId }
  ];

  return (
    <IntegrationsDetailsModal
      details={details}
      logo={mailchimp}
      name="Mailchimp"
    />
  );
};

const IntegrationsStripeDetails: React.FC = () => {
  const value = useStoreState(({ db }) => db.integrations.stripeAccountId);
  const flow = IntegrationsStore.useStoreState((store) => store.flow);

  if (flow !== 'STRIPE_DETAILS') return null;

  const details: ExpandedDetailProps[] = [{ label: 'Account ID', value }];
  return (
    <IntegrationsDetailsModal details={details} logo={stripe} name="Stripe" />
  );
};

const IntegrationsModal: React.FC = () => {
  const searchParam = new URLSearchParams(window.location.search).get('flow');
  const flow = IntegrationsStore.useStoreState((store) => store.flow);
  const setFlow = IntegrationsStore.useStoreActions((store) => store.setFlow);

  useEffect(() => {
    if (searchParam && searchParam !== flow) {
      setFlow(`${searchParam.toUpperCase()}_FORM` as IntegrationsModalType);
    }
  }, []);

  return (
    <>
      <IntegrationsMailchimpDetails />
      <IntegrationsStripeDetails />
      <IntegrationsMailchimpForm />
    </>
  );
};

export default IntegrationsModal;
