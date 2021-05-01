/* eslint-disable camelcase */
import { communityIdVar, showToast } from 'src/App.reactive';

import { DocumentNode, gql, useMutation } from '@apollo/client';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form';
import { FormItemData } from '@components/organisms/Form/Form.types';
import { closeModal } from '@components/organisms/Modal/Modal.state';
import { QuestionCategory } from '@util/constants';
import {
  IMember,
  IUser,
  MemberRole,
  MemberStatus
} from '@util/constants.entities';
import { getGraphQLError } from '@util/util';

interface UsersRelationalInput {
  data: IUser;
  on_conflict: { constraint: string; update_columns: string[] };
}

interface MembersInput {
  communityId: string;
  email: string;
  firstName: string;
  lastName: string;
  memberTypeId: string;
  role: MemberRole;
  user: UsersRelationalInput;
}

interface InviteMembersArgs {
  members: MembersInput[];
}

interface InviteMembersResult {
  createMembers: { returning: IMember[] };
}

const INVITE_MEMBERS: DocumentNode = gql`
  mutation InviteMembers($members: [members_insert_input!]!) {
    createMembers(objects: $members) {
      returning {
        id
        firstName
        lastName
        email
        role
      }
    }
  }
`;

const useInviteMembers = (): OnFormSubmitFunction => {
  const [inviteMembers] = useMutation<InviteMembersResult, InviteMembersArgs>(
    INVITE_MEMBERS
  );

  const onSubmit = async ({ items, formDispatch }: OnFormSubmitArgs) => {
    const memberValues: FormItemData[] = Object.values(items);

    // In the first pass, format all the values by looking at the item's
    // category and id.
    const memberData: Record<string, MembersInput> = memberValues.reduce(
      (acc: Record<string, MembersInput>, data: FormItemData) => {
        const { category, metadata: inputId, value } = data;

        switch (category) {
          case QuestionCategory.EMAIL:
            return {
              ...acc,
              [inputId]: {
                ...acc[inputId],
                communityId: communityIdVar(),
                email: value,
                status: MemberStatus.INVITED,
                user: {
                  data: { email: value },
                  on_conflict: {
                    constraint: 'users_email_unique',
                    update_columns: ['updatedAt']
                  }
                }
              }
            };

          case QuestionCategory.FIRST_NAME:
            return { ...acc, [inputId]: { ...acc[inputId], firstName: value } };

          case QuestionCategory.LAST_NAME:
            return { ...acc, [inputId]: { ...acc[inputId], lastName: value } };

          default:
            return {
              ...acc,
              [inputId]: {
                ...acc[inputId],
                role: (value as string[]).length ? 'Admin' : null
              }
            };
        }
      },
      {}
    );

    const members: MembersInput[] = Object.values(memberData);

    try {
      await inviteMembers({ variables: { members } });
      showToast({ message: `${members.length} members(s) invited.` });
      closeModal();
    } catch (e) {
      formDispatch({ error: getGraphQLError(e), type: 'SET_ERROR' });
    }
  };

  return onSubmit;
};

export default useInviteMembers;
