import { DocumentNode, gql } from '@apollo/client';
import { TableRow } from '@components/organisms/Table/Table.types';
import { QuestionCategory } from '@util/constants';
import { IMember, IMemberValue, IQuestion } from '@util/constants.entities';

interface GetMemberValueArgs {
  member: IMember;
  question: IQuestion;
  value: string;
}

/**
 * Returns the appropriate value based on the IMember data as well as the
 * IUser attached.
 */
const getMemberValue = ({ member, question, value }: GetMemberValueArgs) => {
  const { bio, email, firstName, joinedAt, lastName, pictureUrl } = member;

  const {
    facebookUrl,
    instagramUrl,
    linkedInUrl,
    twitterUrl
  } = member.memberSocials;

  const { category } = question;

  if (category === QuestionCategory.BIO) return bio;
  if (category === QuestionCategory.DUES_STATUS) return true;
  if (category === QuestionCategory.EMAIL) return email;
  if (category === QuestionCategory.FACEBOOK_URL) return facebookUrl;
  if (category === QuestionCategory.FIRST_NAME) return firstName;
  if (category === QuestionCategory.INSTAGRAM_URL) return instagramUrl;
  if (category === QuestionCategory.JOINED_AT) return joinedAt;
  if (category === QuestionCategory.LAST_NAME) return lastName;
  if (category === QuestionCategory.LINKED_IN_URL) return linkedInUrl;
  if (category === QuestionCategory.PROFILE_PICTURE) return pictureUrl;
  if (category === QuestionCategory.TWITTER_URL) return twitterUrl;

  if (category === QuestionCategory.MEMBER_TYPE) {
    return member.memberType?.name;
  }

  if (category === QuestionCategory.EVENTS_ATTENDED) {
    return member.eventAttendees?.length ?? 0;
  }

  return value;
};

interface UseMemberDatabaseRowsArgs {
  data: IMember[];
}

type UseMemberDatabaseRowsFunction = { fragment: DocumentNode } & ((
  args: UseMemberDatabaseRowsArgs
) => TableRow[]);

export const useMemberDatabaseRows: UseMemberDatabaseRowsFunction = ({
  data: members
}: UseMemberDatabaseRowsArgs): TableRow[] => {
  const rows: TableRow[] = members?.map((member: IMember) =>
    member.memberValues.reduce(
      (row: TableRow, memberValue: IMemberValue) => {
        return {
          ...row,
          [memberValue.question.id]: getMemberValue({
            member,
            question: memberValue.question,
            value: memberValue.value
          })
        };
      },
      { id: member.id }
    )
  );

  return rows;
};

useMemberDatabaseRows.fragment = gql`
  fragment UseMemberDatabaseRowsFragment on members {
    id
  }
`;
