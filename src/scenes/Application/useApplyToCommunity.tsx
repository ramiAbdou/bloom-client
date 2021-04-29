import { nanoid } from 'nanoid';
import { communityIdVar } from 'src/App.reactive';

import { DocumentNode, gql, useMutation } from '@apollo/client';
import {
  FormItemData,
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form.types';
// import { parseValue } from '@components/organisms/Form/Form.util';
import { QuestionCategory } from '@util/constants';
import { IUser, MemberStatus } from '@util/constants.entities';
import { UniqueConstraint } from '@util/constants.errors';
import { now } from '@util/util';

interface CreateApplicantsMemberValueInput {
  id: string;
  questionId: string;
  value: string;
}

interface CreateApplicantsMemberInput {
  bio: string;
  communityId: string;
  createdAt: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  memberTypeId: string;
  memberValues: { data: CreateApplicantsMemberValueInput[] };
  status: string;
  updatedAt: string;
}

interface CreateApplicantArgs {
  createdAt: string;
  email: string;
  id: string;
  members: { data: CreateApplicantsMemberInput[] };
  updatedAt: string;
}

const CREATE_APPLICANT: DocumentNode = gql`
  mutation CreateApplicant(
    $createdAt: String!
    $email: String!
    $id: String!
    $members: members_arr_rel_insert_input
    $updatedAt: String!
  ) {
    createUser(
      on_conflict: {
        constraint: users_email_unique
        update_columns: [updatedAt]
      }
      object: {
        createdAt: $createdAt
        email: $email
        id: $id
        members: $members
        updatedAt: $updatedAt
      }
    ) {
      createdAt
      email
      id
      updatedAt

      members {
        bio
        createdAt
        email
        firstName
        id
        lastName
        status

        community {
          id
        }

        memberSocials {
          id
        }

        memberType {
          id
        }

        memberValues {
          id
          value
        }
      }
    }
  }
`;

const useApplyToCommunity = (): OnFormSubmitFunction => {
  const [applyToCommunity] = useMutation<IUser, CreateApplicantArgs>(
    CREATE_APPLICANT
  );

  const onSubmit = async ({
    // gql,
    goForward,
    formDispatch,
    storyItems
  }: OnFormSubmitArgs) => {
    const storyValues: FormItemData[] = Object.values(storyItems);
    // const { memberTypes } = await gql.findOne(ICommunity, {
    //   fields: ['memberTypes.id', 'memberTypes.name'],
    //   where: { id: '' }
    // });

    const bio: string = storyValues.find(
      (value: FormItemData) => value.category === QuestionCategory.BIO
    )?.value as string;

    const email: string = storyValues.find(
      (value: FormItemData) => value.category === QuestionCategory.EMAIL
    )?.value as string;

    const firstName: string = storyValues.find(
      (value: FormItemData) => value.category === QuestionCategory.FIRST_NAME
    )?.value as string;

    const lastName: string = storyValues.find(
      (value: FormItemData) => value.category === QuestionCategory.LAST_NAME
    )?.value as string;

    const memberTypeName: string = storyItems.MEMBER_TYPE?.value as string;

    // const memberTypeId = memberTypes.find(
    //   (memberType: IMemberType) => memberType.name === memberTypeName
    // )?.id;

    // const data = Object.values(storyItems)
    //   .filter(({ questionId }) => !!questionId)
    //   .map(({ category, id, value }) => {
    //     return {
    //       category,
    //       questionId: id,
    //       value: parseValue(value as string[])
    //     };
    //   });

    const membersInput: CreateApplicantsMemberInput = {
      bio,
      communityId: communityIdVar(),
      createdAt: now(),
      email,
      firstName,
      id: nanoid(),
      lastName,
      memberTypeId: memberTypeName,
      memberValues: { data: [] },
      status: MemberStatus.PENDING,
      updatedAt: now()
    };

    try {
      await applyToCommunity({
        variables: {
          createdAt: now(),
          email,
          id: nanoid(),
          members: { data: [membersInput] },
          updatedAt: now()
        }
      });

      goForward();
    } catch (e) {
      if (
        e.graphQLErrors[0].message.includes(
          UniqueConstraint.MEMBERS_COMMUNITY_ID_EMAIL_UNIQUE
        )
      ) {
        formDispatch({
          error: `This email (${email}) is already a member in this community.`,
          type: 'SET_ERROR'
        });
      }
    }
  };

  return onSubmit;
};

export default useApplyToCommunity;
