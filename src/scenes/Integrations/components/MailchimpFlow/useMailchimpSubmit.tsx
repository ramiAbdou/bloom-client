import { useMutation } from 'graphql-hooks';

import { OnFormSubmit, OnFormSubmitArgs } from '@components/Form/Form.types';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { getGraphQLError } from '@util/util';
import { UPDATE_MAILCHIMP_LIST_ID } from '../../Integrations.gql';

export default (): OnFormSubmit => {
  const options = useStoreState(({ db }) => db.integrations?.mailchimpLists);
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);

  const [updateMailchimpListId] = useMutation(UPDATE_MAILCHIMP_LIST_ID);

  return async ({ items, setErrorMessage, setIsLoading }: OnFormSubmitArgs) => {
    const selectedMailchimpList = items[items?.length - 1]?.value;

    const { id: mailchimpListId } = options.find(
      ({ name }) => name === selectedMailchimpList
    );

    setIsLoading(true);

    const { data, error } = await updateMailchimpListId({
      variables: { mailchimpListId }
    });

    setIsLoading(false);

    if (error) {
      // If error message, show a toast error message.
      const errorMessage = getGraphQLError(error);
      setErrorMessage(errorMessage);
      return;
    }

    // If the function is successful, update the entities with the new
    // Mailchimp information and close the modal.
    mergeEntities({
      data: { ...data.updateMailchimpListId },
      schema: Schema.INTEGRATIONS
    });

    closeModal();
  };
};
