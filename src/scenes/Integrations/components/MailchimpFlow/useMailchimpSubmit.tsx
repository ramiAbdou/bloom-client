import { useMutation } from 'graphql-hooks';
import { useCallback, useEffect } from 'react';

import Form from '@components/Form/Form.store';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { getGraphQLError } from '@util/util';
import { UPDATE_MAILCHIMP_LIST_ID } from '../../Integrations.gql';

export default (): VoidFunction => {
  const options = useStoreState(
    ({ db }) => db.integrations?.mailchimpLists ?? []
  );

  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);

  const selectedMailchimpList: string = Form.useStoreState(
    ({ items }) => items[items?.length - 1]?.value
  );

  const setIsLoading = Form.useStoreActions((store) => store.setIsLoading);

  const [updateMailchimpListId, { loading }] = useMutation(
    UPDATE_MAILCHIMP_LIST_ID
  );

  // When the Mailchimp list name changes (meaning the user selected a list),
  // we need to update the function to contain that updated list name value.
  const result = useCallback(async () => {
    const { id: mailchimpListId } =
      options.find(({ name }) => name === selectedMailchimpList) || {};

    if (!mailchimpListId) return;

    const { data, error } = await updateMailchimpListId({
      variables: { mailchimpListId }
    });

    if (error) {
      // If error message, show a toast error message.
      const errorMessage = getGraphQLError(error);

      if (errorMessage) {
        showToast({
          message: 'Failed to submit. Please try again soon.',
          type: 'ERROR'
        });
      }

      return;
    }

    // If the function is successful, update the entities with the new
    // Mailchimp information and close the modal.
    mergeEntities({
      data: { ...data.updateMailchimpListId },
      schema: Schema.INTEGRATIONS
    });

    closeModal();
  }, [selectedMailchimpList, options]);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  return result;
};
