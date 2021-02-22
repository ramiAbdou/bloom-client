import useMutation from '@hooks/useMutation';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { IIntegrations } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';

const useMailchimpSubmit = (): OnFormSubmit => {
  const options = useStoreState(({ db }) => db.integrations?.mailchimpLists);

  const [updateMailchimpListId] = useMutation<IIntegrations>({
    fields: ['id', 'mailchimpListId', 'mailchimpListName'],
    operation: 'updateMailchimpListId',
    schema: Schema.COMMUNITY_INTEGRATIONS,
    types: { mailchimpListId: { required: true } }
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
