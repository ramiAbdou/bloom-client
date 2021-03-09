import { useStoreState } from '@store/Store';

const useIntegrationsDetails = (name: string) => {
  const listName = useStoreState(
    ({ db }) => db.communityIntegrations.mailchimpListName
  );

  const listId = useStoreState(
    ({ db }) => db.communityIntegrations.mailchimpListId
  );

  const value = useStoreState(
    ({ db }) => db.communityIntegrations.stripeAccountId
  );

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
