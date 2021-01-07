import useMutation from '@hooks/useMutation';
import {
  FormItemData,
  OnFormSubmit,
  OnFormSubmitArgs
} from '@organisms/Form/Form.types';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import { takeFirst } from '@util/util';
import { CREATE_MEMBERS, CreateMembersArgs } from './AddMember.gql';
import AddMemberStore from './AddMember.store';
import { MembersAddedRecord } from './AddMember.types';

const useCreateMembers = (): OnFormSubmit => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);
  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const admin = AddMemberStore.useStoreState((store) => store.admin);

  const [createMembers] = useMutation<any, CreateMembersArgs>({
    name: 'createMembers',
    query: CREATE_MEMBERS
  });

  const onSubmit = async ({
    items,
    setErrorMessage,
    setIsLoading
  }: OnFormSubmitArgs) => {
    setIsLoading(true);

    // In the first pass, format all the values by looking at the item's
    // category and id.
    const membersFirstPass: MembersAddedRecord = items.reduce(
      (acc: MembersAddedRecord, { category, id, value }: FormItemData) => {
        const formattedId = id.slice(0, id.indexOf('='));

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
      if (!admin) return data;
      return { ...data, isAdmin: true };
    });

    const { error, data: updatedMembers } = await createMembers({
      members
    });

    setIsLoading(false);

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