import { communityIdVar } from 'src/App.reactive';

import { DocumentNode, gql, useMutation } from '@apollo/client';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@components/organisms/Form/Form';
import { FormItemData } from '@components/organisms/Form/Form.types';
import { QuestionCategory } from '@util/constants';
import { IUser, MemberStatus } from '@util/constants.entities';
import { getGraphQLError } from '@util/util';

interface CreateApplicantsMemberValueInput {
  questionId: string;
  value: string;
}

interface CreateApplicantsMemberInput {
  bio: string;
  communityId: string;
  email: string;
  firstName: string;
  lastName: string;
  memberTypeId: string;
  memberValues: { data: CreateApplicantsMemberValueInput[] };
  status: string;
}

interface CreateApplicantArgs {
  email: string;
  members: { data: CreateApplicantsMemberInput[] };
}

const CREATE_APPLICANT: DocumentNode = gql`
  mutation CreateApplicant(
    $email: String!
    $members: members_arr_rel_insert_input
  ) {
    createUser(
      on_conflict: {
        constraint: users_email_unique
        update_columns: [updatedAt]
      }
      object: { email: $email, members: $members }
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
    formDispatch,
    storyDispatch,
    storyState
  }: OnFormSubmitArgs) => {
    const { items } = storyState;
    const storyValues: FormItemData[] = Object.values(items);

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

    const memberTypeName: string = items.MEMBER_TYPE?.value as string;

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
      email,
      firstName,
      lastName,
      memberTypeId: memberTypeName,
      memberValues: { data: [] },
      status: MemberStatus.PENDING
    };

    try {
      await applyToCommunity({
        variables: {
          email,
          members: { data: [membersInput] }
        }
      });

      storyDispatch({ type: 'GO_FORWARD' });
    } catch (error) {
      formDispatch({
        error: getGraphQLError(error, { email }),
        type: 'SET_ERROR'
      });
    }
  };

  return onSubmit;
};

export default useApplyToCommunity;
