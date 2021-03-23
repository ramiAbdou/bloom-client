import { useStoreState } from '@store/Store';

interface IntegrationsDetails {
  label: string;
  value: string;
}

const useIntegrationsDetails = (name: string): IntegrationsDetails[] => {
  const listName: string = useStoreState(({ db }) => {
    return db.communityIntegrations.mailchimpListName;
  });

  const listId: string = useStoreState(({ db }) => {
    return db.communityIntegrations.mailchimpListId;
  });

  const value: string = useStoreState(({ db }) => {
    return db.communityIntegrations.stripeAccountId;
  });

  if (name === 'Mailchimp') {
    return [
      { label: 'Audience/List Name', value: listName },
      { label: 'Audience/List ID', value: listId }
    ];
  }

  if (name === 'Stripe') return [{ label: 'Account ID', value }];
  return [];
};

export default useIntegrationsDetails;
