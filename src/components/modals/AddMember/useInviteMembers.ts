import useMutation from '@hooks/useMutation';
import {
  FormItemData,
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@organisms/Form/Form.types';
import { QuestionCategory } from '@util/constants';
import { MutationEvent } from '@util/constants.events';
import { take } from '@util/util';
import AddMemberStore from './AddMember.store';
import { AddMemberInput, AddMembersArgs } from './AddMember.types';

const useInviteMembers = (): OnFormSubmitFunction => {
  const admin: boolean = AddMemberStore.useStoreState((state) => {
    return state.admin;
  });

  const [inviteMembers] = useMutation<any, AddMembersArgs>({
    fields: ['id'],
    operation: MutationEvent.INVITE_MEMBERS,
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
      const { category, metadata: inputId, value } = data;

      const formattedValue = take([
        [category === QuestionCategory.FIRST_NAME, { firstName: value }],
        [category === QuestionCategory.LAST_NAME, { lastName: value }],
        [category === QuestionCategory.EMAIL, { email: value }],
        [true, { isAdmin: admin || !!value.length }]
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
