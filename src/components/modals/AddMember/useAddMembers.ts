import useMutation from '@hooks/useMutation';
import {
  FormItemData,
  OnFormSubmit,
  OnFormSubmitArgs
} from '@organisms/Form/Form.types';
import { useStoreActions } from '@store/Store';
import { takeFirst } from '@util/util';
import { ADD_MEMBERS, AddMemberArgs, AddMembersArgs } from './AddMember.gql';
import AddMemberStore from './AddMember.store';

const useAddMembers = (): OnFormSubmit => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const admin = AddMemberStore.useStoreState((store) => store.admin);

  const [addMembers] = useMutation<any, AddMembersArgs>({
    name: 'addMembers',
    query: ADD_MEMBERS
  });

  const onSubmit = async ({ items, setError }: OnFormSubmitArgs) => {
    // In the first pass, format all the values by looking at the item's
    // category and id.
    const members: Record<string, AddMemberArgs> = Object.values(items).reduce(
      (acc: Record<string, AddMemberArgs>, data: FormItemData) => {
        const { category, metadata: inputId, type, value } = data;

        const formattedValue = takeFirst([
          [category === 'FIRST_NAME', { firstName: value }],
          [category === 'LAST_NAME', { lastName: value }],
          [category === 'EMAIL', { email: value }],
          [type === 'MULTIPLE_SELECT', { isAdmin: admin || !!value.length }]
        ]);

        return { ...acc, [inputId]: { ...acc[inputId], ...formattedValue } };
      },
      {}
    );

    console.log(members);

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
