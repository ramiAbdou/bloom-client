import useMutation from '@hooks/useMutation';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import {
  UPDATE_MAILCHIMP_LIST_ID,
  UpdateMailchimpListIdArgs
} from './Integrations.gql';

const useMailchimpSubmit = (): OnFormSubmit => {
  const options = useStoreState(({ db }) => db.integrations?.mailchimpLists);

  const [updateMailchimpListId] = useMutation<any, UpdateMailchimpListIdArgs>({
    operation: 'updateMailchimpListId',
    query: UPDATE_MAILCHIMP_LIST_ID,
    schema: Schema.COMMUNITY_INTEGRATIONS
  });

  const onSubmit = async ({
    closeModal,
    items,
    setError
  }: OnFormSubmitArgs) => {
    const selectedMailchimpList = items.MAILCHIMP_LIST_ID?.value;

    const { id: mailchimpListId } = options.find(
      ({ name }) => name === selectedMailchimpList
    );

    const { error } = await updateMailchimpListId({ mailchimpListId });

    if (error) {
      setError(error);
      return;
    }

    closeModal();
  };

  return onSubmit;
};

export default useMailchimpSubmit;
