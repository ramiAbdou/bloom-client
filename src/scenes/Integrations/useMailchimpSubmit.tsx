import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form.types';
import { modalVar } from '@core/state/Modal.reactive';
import useBloomMutation from '@gql/hooks/useBloomMutation';
import { ICommunityIntegrations } from '@util/constants.entities';
import { MutationEvent } from '@util/constants.events';

const useMailchimpSubmit = (): OnFormSubmitFunction => {
  // const options = useStoreState(
  //   ({ db }) => db.communityIntegrations?.mailchimpLists
  // );

  const options = [];

  const [updateMailchimpListId] = useBloomMutation<ICommunityIntegrations>({
    fields: ['id', 'mailchimpListId', 'mailchimpListName'],
    operation: MutationEvent.UPDATE_MAILCHIMP_LIST_ID,
    types: { mailchimpListId: { required: true } }
  });

  const onSubmit = async ({ items, setError }: OnFormSubmitArgs) => {
    const selectedMailchimpList = items.MAILCHIMP_LIST_ID?.value;

    const { id: mailchimpListId } = options.find(
      ({ name }) => name === selectedMailchimpList
    );

    const { error } = await updateMailchimpListId({ mailchimpListId });

    if (error) {
      setError(error);
      return;
    }

    modalVar(null);
  };

  return onSubmit;
};

export default useMailchimpSubmit;
