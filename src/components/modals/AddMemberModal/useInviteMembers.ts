import { showToast } from 'src/App.reactive';

import {
  FormItemData,
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form.types';
import { modalVar } from '@core/state/Modal.state';
import useBloomMutation from '@gql/hooks/useBloomMutation';
import { QuestionCategory } from '@util/constants';
import { MutationEvent } from '@util/constants.events';
import { take } from '@util/util';
import { AddMemberInput } from './AddMember.types';

interface AddMembersArgs {
  members: AddMemberInput[];
}

const useInviteMembers = (): OnFormSubmitFunction => {
  const [inviteMembers] = useBloomMutation<any, AddMembersArgs>({
    fields: ['id'],
    operation: MutationEvent.INVITE_MEMBERS,
    types: { members: { required: true, type: '[InviteMemberInput!]' } }
  });

  const onSubmit = async ({ items, formDispatch }: OnFormSubmitArgs) => {
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
        [true, { isAdmin: !!(value as string[]).length }]
      ]);

      return { ...acc, [inputId]: { ...acc[inputId], ...formattedValue } };
    }, {});

    const members: AddMemberInput[] = Object.values(memberData);
    const { error } = await inviteMembers({ members: Object.values(members) });

    if (error) {
      formDispatch({ error, type: 'SET_ERROR' });
      return;
    }

    showToast({ message: `${members.length} members(s) invited.` });
    modalVar(null);
  };

  return onSubmit;
};

export default useInviteMembers;
