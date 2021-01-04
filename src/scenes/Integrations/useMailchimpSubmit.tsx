import { OnFormSubmit, OnFormSubmitArgs } from '@components/Form/Form.types';
import useMutation from '@hooks/useMutation';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import {
  UPDATE_MAILCHIMP_LIST_ID,
  UpdateMailchimpListIdArgs
} from './Integrations.gql';

export default (): OnFormSubmit => {
  const options = useStoreState(({ db }) => db.integrations?.mailchimpLists);
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);

  const [updateMailchimpListId] = useMutation<any, UpdateMailchimpListIdArgs>({
    name: 'updateMailchimpListId',
    query: UPDATE_MAILCHIMP_LIST_ID
  });

  return async ({ items, setErrorMessage, setIsLoading }: OnFormSubmitArgs) => {
    const selectedMailchimpList = items[items?.length - 1]?.value;

    const { id: mailchimpListId } = options.find(
      ({ name }) => name === selectedMailchimpList
    );

    setIsLoading(true);

    const { data: integrations, error } = await updateMailchimpListId({
      mailchimpListId
    });

    setIsLoading(false);

    if (error) {
      setErrorMessage(error);
      return;
    }

    // If the function is successful, update the entities with the new
    // Mailchimp information and close the modal.
    mergeEntities({ data: integrations, schema: Schema.INTEGRATIONS });
    closeModal();
  };
};
