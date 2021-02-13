import useMutation from '@hooks/useMutation';
import { OnFormSubmitArgs } from '@organisms/Form/Form.types';
import TableStore from '@organisms/Table/Table.store';
import { ToastOptions } from '@organisms/Toast/Toast.types';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { MemberIdsArgs } from '../Database.types';

const useDeleteMembers = () => {
  const memberIds: string[] = TableStore.useStoreState(
    ({ selectedRowIds }) => selectedRowIds
  );

  const [deleteMembers] = useMutation<IMember[], MemberIdsArgs>({
    fields: ['deletedAt', 'id'],
    operation: 'deleteMembers',
    schema: [Schema.MEMBER],
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

    const options: ToastOptions<IMember, MemberIdsArgs> = {
      message: `${memberIds?.length} member(s) removed from the community.`,
      mutationArgsOnUndo: {
        fields: ['deletedAt', 'id'],
        operation: 'restoreMembers',
        schema: [Schema.MEMBER],
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
