import {
  TableRow,
  TableSortDirection
} from '@components/organisms/Table/Table.types';
import { QuestionCategory } from '@util/constants';
import { IMember, IMemberValue, IQuestion } from '@util/constants.entities';
import { sortObjects } from '@util/util';

interface GetMemberValueArgs {
  member: IMember;
  question: IQuestion;
}

/**
 * Returns the appropriate value based on the IMember data as well as the
 * IUser attached.
 */
const getMemberValue = ({ member, question }: GetMemberValueArgs) => {
  const { bio, email, firstName, joinedAt, lastName, pictureUrl } = member;

  const { facebookUrl, instagramUrl, linkedInUrl, twitterUrl } =
    member.memberSocials ?? {};

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
    return member.eventAttendeesAggregate.aggregate.count;
  }

  return member.memberValues.find(
    (memberValue: IMemberValue) => memberValue.questionId === question.id
  )?.value;
};

interface UseMemberDatabaseRowsArgs {
  members: IMember[];
  questions: IQuestion[];
  sortColumnId: string;
  sortColumnCategory: QuestionCategory;
  sortDirection: TableSortDirection;
}

export const useMemberDatabaseRows = ({
  members,
  questions,
  sortColumnId,
  sortColumnCategory,
  sortDirection
}: UseMemberDatabaseRowsArgs): TableRow[] => {
  if (!members || !questions) return [];

  const rows: TableRow[] = members?.map((member: IMember) =>
    questions.reduce(
      (row, question: IQuestion) => {
        return {
          ...row,
          [question.id]: getMemberValue({ member, question })
        };
      },
      { id: member.id }
    )
  );

  return sortColumnId && !sortColumnCategory
    ? rows.sort((a: TableRow, b: TableRow) =>
        sortObjects(a, b, sortColumnId, sortDirection)
      )
    : rows;
};
