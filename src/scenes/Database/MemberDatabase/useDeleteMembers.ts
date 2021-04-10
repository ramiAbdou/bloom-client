import { IMember } from '@core/db/db.entities';
import useBloomMutation from '@gql/hooks/useBloomMutation';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form.types';
import TableStore from '@components/organisms/Table/Table.store';
import { ToastOptions } from '@components/organisms/Toast/Toast.types';
import { MutationEvent } from '@util/constants.events';
import { MemberIdsArgs } from '../Database.types';

const useDeleteMembers = (): OnFormSubmitFunction => {
  const memberIds: string[] = TableStore.useStoreState(
    ({ selectedRowIds }) => selectedRowIds
  );

  const [deleteMembers] = useBloomMutation<IMember[], MemberIdsArgs>({
    fields: ['deletedAt', 'id'],
    operation: MutationEvent.DELETE_MEMBERS,
    types: { memberIds: { required: true, type: '[String!]' } }
  });

  const onSubmit = async ({
    closeModal,
    setError,
    showToast
  }: OnFormSubmitArgs) => {
    const { error } = await deleteMembers({ memberIds });

    if (error) {
      setError(error);
      return;
    }

    const options: ToastOptions<MemberIdsArgs> = {
      message: `${memberIds?.length} member(s) removed from the community.`,
      mutationArgsOnUndo: {
        fields: ['deletedAt', 'id'],
        operation: MutationEvent.RESTORE_MEMBERS,
        types: { memberIds: { required: true, type: '[String!]' } },
        variables: { memberIds }
      }
    };

    closeModal();
    showToast(options);
  };

  return onSubmit;
};

export default useDeleteMembers;
