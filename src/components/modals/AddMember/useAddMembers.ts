import useMutation from '@hooks/useMutation';
import {
  FormItemData,
  OnFormSubmit,
  OnFormSubmitArgs
} from '@organisms/Form/Form.types';
import { takeFirst } from '@util/util';
import AddMemberStore from './AddMember.store';
import { AddMemberInput, AddMembersArgs } from './AddMember.types';

const useAddMembers = (): OnFormSubmit => {
  const admin = AddMemberStore.useStoreState((store) => store.admin);

  const [addMembers] = useMutation<any, AddMembersArgs>({
    fields: ['id'],
    operation: 'addMembers',
    types: { members: { required: true, type: '[AddMemberInput!]' } }
  });

  const onSubmit = async ({
    closeModal,
    items,
    setError,
    showToast
  }: OnFormSubmitArgs) => {
    // In the first pass, format all the values by looking at the item's
    // category and id.
    const memberData: Record<string, AddMemberInput> = Object.values(
      items
    ).reduce((acc: Record<string, AddMemberInput>, data: FormItemData) => {
      const { category, metadata: inputId, type, value } = data;

      const formattedValue = takeFirst([
        [category === 'FIRST_NAME', { firstName: value }],
        [category === 'LAST_NAME', { lastName: value }],
        [category === 'EMAIL', { email: value }],
        [type === 'MULTIPLE_SELECT', { isAdmin: admin || !!value.length }]
      ]);

      return { ...acc, [inputId]: { ...acc[inputId], ...formattedValue } };
    }, {});

    const members: AddMemberInput[] = Object.values(memberData);
    const { error } = await addMembers({ members: Object.values(members) });

    if (error) {
      setError(error);
      return;
    }

    showToast({ message: `${members.length} members(s) invited.` });
    closeModal();
  };

  return onSubmit;
};

export default useAddMembers;
