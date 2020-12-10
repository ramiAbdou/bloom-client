import { UseClientRequestResult, useMutation } from 'graphql-hooks';
import { useEffect } from 'react';

import Form from '@components/Form/Form.store';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { UPDATE_MAILCHIMP_LIST_ID } from '../../Integrations.gql';

export default (): UseClientRequestResult<any, object> => {
  const items = Form.useStoreState((store) => store.items);
  const setSubmitForm = Form.useStoreActions((store) => store.setSubmitForm);

  const options = useStoreState(
    ({ integrations }) => integrations?.mailchimpLists ?? []
  );

  const mergeEntities = useStoreActions((store) => store.mergeEntities);
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);

  const mailchimpListName = items.find(
    (item) => item.title === 'Step 2: Select Audience/List ID'
  )?.value;

  const [updateMailchimpListId, result] = useMutation(UPDATE_MAILCHIMP_LIST_ID);

  // When the Mailchimp list name changes (meaning the user selected a list),
  // we need to update the submitForm function to contain that updated list
  // name value.
  useEffect(() => {
    const { id: mailchimpListId } =
      options.find(({ name }) => name === mailchimpListName) || {};

    if (!mailchimpListId) return;

    const onSubmit = async () => {
      const { data, error: runtimeError } = await updateMailchimpListId({
        variables: { mailchimpListId }
      });

      if (runtimeError) return;

      // If the function is successful, update the entities with the new
      // Mailchimp information and close the modal.
      mergeEntities({
        data: { ...data.updateMailchimpListId },
        schema: Schema.INTEGRATIONS
      });

      closeModal();
    };

    setSubmitForm(onSubmit);
  }, [mailchimpListName]);

  return result;
};
