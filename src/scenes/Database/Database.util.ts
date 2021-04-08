import day from 'dayjs';

import {
  IMember,
  IMemberValue,
  IQuestion,
  MemberStatus
} from '@db/db.entities';
import useFind from '@gql/useFind';
import useFindOne from '@gql/useFindOne';
import { TableColumn, TableRow } from '@organisms/Table/Table.types';
import { useStoreState } from '@store/Store';
import { QuestionCategory } from '@util/constants';
import { sortObjects } from '@util/util';

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

export const useMemberDatabaseRows = (): TableRow[] => {
  const communityId: string = useStoreState(({ db }) => db.community.id);

  const members: IMember[] = useFind(IMember, {
    fields: [
      'deletedAt',
      'email',
      'eventAttendees.id',
      'joinedAt',
      'memberSocials.facebookUrl',
      'memberSocials.instagramUrl',
      'memberSocials.linkedInUrl',
      'memberSocials.twitterUrl',
      'memberSocials.id',
      'memberType.id',
      'memberType.name',
      'memberValues.id',
      'memberValues.question.id',
      'memberValues.value',
      'pictureUrl',
      'status'
    ],
    where: { communityId, status: MemberStatus.ACCEPTED }
  });

  const { id: sortQuestionId } = useFindOne(IQuestion, {
    where: { category: QuestionCategory.JOINED_AT, communityId }
  });

  const rows: TableRow[] = members
    ?.filter((member: IMember) => !member.deletedAt)
    ?.map((member: IMember) =>
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
    )
    ?.sort((a: TableRow, b: TableRow) => sortObjects(a, b, sortQuestionId));

  return rows;
};

export const useMemberDatabaseColumns = (): TableColumn[] => {
  const communityId: string = useStoreState(({ db }) => db.community.id);

  const questions: IQuestion[] = useFind(IQuestion, {
    fields: ['category', 'rank', 'title', 'type'],
    where: { communityId }
  });

  const columns: TableColumn[] = questions
    ?.sort((a: IQuestion, b: IQuestion) => sortObjects(a, b, 'rank', 'ASC'))
    ?.filter(
      (question: IQuestion) =>
        question.category !== QuestionCategory.DUES_STATUS
    )
    .map((question: IQuestion) => {
      if (question.category === QuestionCategory.DUES_STATUS) {
        return {
          ...question,
          format: (value: boolean) => (value ? 'Paid' : 'Not Paid')
        };
      }

      if (question.category === QuestionCategory.JOINED_AT) {
        return {
          ...question,
          format: (value: string) => day(value).format('MMMM, D, YYYY')
        };
      }

      return question;
    });

  return columns;
};
