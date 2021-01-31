import useMutation from '@hooks/useMutation';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import {
  UPDATE_MAILCHIMP_LIST_ID,
  UpdateMailchimpListIdArgs
} from './Integrations.gql';

const useMailchimpSubmit = (): OnFormSubmit => {
  const options = useStoreState(({ db }) => db.integrations?.mailchimpLists);
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);

  const [updateMailchimpListId] = useMutation<any, UpdateMailchimpListIdArgs>({
    name: 'updateMailchimpListId',
    query: UPDATE_MAILCHIMP_LIST_ID
  });

  const onSubmit = async ({ items, setErrorMessage }: OnFormSubmitArgs) => {
    const selectedMailchimpList = items.MAILCHIMP_LIST_ID?.value;

    const { id: mailchimpListId } = options.find(
      ({ name }) => name === selectedMailchimpList
    );

    const { data: integrations, error } = await updateMailchimpListId({
      mailchimpListId
    });

    if (error) {
      setErrorMessage(error);
      return;
    }

    // If the function is successful, update the entities with the new
    // Mailchimp information and close the modal.
    mergeEntities({ data: integrations, schema: Schema.INTEGRATIONS });
    closeModal();
  };

  return onSubmit;
};

export default useMailchimpSubmit;
