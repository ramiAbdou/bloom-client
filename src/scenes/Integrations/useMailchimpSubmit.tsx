import useBloomMutation from '@gql/useBloomMutation';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@organisms/Form/Form.types';
import { ICommunityIntegrations } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { MutationEvent } from '@util/constants.events';

const useMailchimpSubmit = (): OnFormSubmitFunction => {
  const options = useStoreState(
    ({ db }) => db.communityIntegrations?.mailchimpLists
  );

  const [updateMailchimpListId] = useBloomMutation<ICommunityIntegrations>({
    fields: ['id', 'mailchimpListId', 'mailchimpListName'],
    operation: MutationEvent.UPDATE_MAILCHIMP_LIST_ID,
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
