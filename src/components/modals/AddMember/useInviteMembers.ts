import useMutation from '@hooks/useMutation';
import {
  FormItemData,
  OnFormSubmit,
  OnFormSubmitArgs
} from '@organisms/Form/Form.types';
import { QuestionCategory, QuestionType } from '@util/constants';
import { takeFirst } from '@util/util';
import AddMemberStore from './AddMember.store';
import { AddMemberInput, AddMembersArgs } from './AddMember.types';

const useInviteMembers = (): OnFormSubmit => {
  const admin = AddMemberStore.useStoreState((store) => store.admin);

  const [inviteMembers] = useMutation<any, AddMembersArgs>({
    fields: ['id'],
    operation: 'inviteMembers',
    types: { members: { required: true, type: '[InviteMemberInput!]' } }
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
        [category === QuestionCategory.FIRST_NAME, { firstName: value }],
        [category === QuestionCategory.LAST_NAME, { lastName: value }],
        [category === QuestionCategory.EMAIL, { email: value }],
        [
          type === QuestionType.MULTIPLE_SELECT,
          { isAdmin: admin || !!value.length }
        ]
      ]);

      return { ...acc, [inputId]: { ...acc[inputId], ...formattedValue } };
    }, {});

    const members: AddMemberInput[] = Object.values(memberData);
    const { error } = await inviteMembers({ members: Object.values(members) });

    if (error) {
      setError(error);
      return;
    }

    showToast({ message: `${members.length} members(s) invited.` });
    closeModal();
  };

  return onSubmit;
};

export default useInviteMembers;
