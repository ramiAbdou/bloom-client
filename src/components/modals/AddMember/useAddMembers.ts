import useMutation from '@hooks/useMutation';
import {
  FormItemData,
  OnFormSubmit,
  OnFormSubmitArgs
} from '@organisms/Form/Form.types';
import { Schema } from '@store/Db/schema';
import { useStoreActions } from '@store/Store';
import { takeFirst } from '@util/util';
import { ADD_MEMBERS, AddMembersArgs } from './AddMember.gql';
import AddMemberStore from './AddMember.store';

type MembersAddedRecord = Record<
  string,
  { email: string; isAdmin: boolean; firstName: string; lastName: string }
>;

const useCreateMembers = (): OnFormSubmit => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const admin = AddMemberStore.useStoreState((store) => store.admin);

  const [addMembers] = useMutation<any, AddMembersArgs>({
    name: 'addMembers',
    query: ADD_MEMBERS
  });

  const onSubmit = async ({ items, setErrorMessage }: OnFormSubmitArgs) => {
    // In the first pass, format all the values by looking at the item's
    // category and id.
    const membersFirstPass: MembersAddedRecord = items.reduce(
      (acc: MembersAddedRecord, { id, value }: FormItemData) => {
        const formattedId = id.slice(0, id.indexOf('='));
        const category = id.slice(id.indexOf('=') + 1);

        const formattedValue = takeFirst([
          [category === 'FIRST_NAME', { firstName: value }],
          [category === 'LAST_NAME', { lastName: value }],
          [category === 'EMAIL', { email: value }],
          { isAdmin: !!value.length }
        ]);

        return {
          ...acc,
          [formattedId]: { ...acc[formattedId], ...formattedValue }
        };
      },
      {}
    );

    // In the second pass, set isAdmin to true if the modal is "Add Admin".
    const members = Object.values(membersFirstPass).map((data) => {
      if (admin) data.isAdmin = true;
      else if (data.isAdmin === undefined) data.isAdmin = false;
      return data;
    });

    const { error, data: updatedMembers } = await addMembers({
      members
    });

    if (error) {
      setErrorMessage(error);
      return;
    }

    mergeEntities({
      communityReferenceColumn: 'members',
      data: { members: updatedMembers },
      schema: { members: [Schema.MEMBER] }
    });

    showToast({
      message: `${Object.keys(members).length} members(s) invited.`
    });

    setTimeout(closeModal, 0);
  };

  return onSubmit;
};

export default useCreateMembers;
