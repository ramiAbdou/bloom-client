import { State } from 'easy-peasy';

import {
  IMember,
  IMemberSocials,
  IMemberType,
  IMemberValue,
  IQuestion,
  MemberStatus
} from '@db/db.entities';
import { DbModel } from '@db/db.types';
import { TableRow } from '@organisms/Table/Table.types';
import { QuestionCategory } from '@util/constants';
import { sortObjects } from '@util/util';

interface GetMemberTableRowArgs {
  db: State<DbModel>;
}

interface GetMemberValueArgs {
  db: State<DbModel>;
  member: IMember;
  questionId: string;
}

/**
 * Returns the appropriate value based on the IMember data as well as the
 * IUser attached.
 */
const getMemberValue = ({ db, member, questionId }: GetMemberValueArgs) => {
  const memberSocials: IMemberSocials =
    db.byMemberSocialsId[member.memberSocials];

  const { category }: IQuestion = db.byQuestionId[questionId];

  if (category === QuestionCategory.BIO) return member.bio;
  if (category === QuestionCategory.DUES_STATUS) return member.isDuesActive;
  if (category === QuestionCategory.EMAIL) return member.email;
  if (category === QuestionCategory.FACEBOOK_URL) {
    return memberSocials?.facebookUrl;
  }
  if (category === QuestionCategory.FIRST_NAME) return member.firstName;
  if (category === QuestionCategory.INSTAGRAM_URL) {
    return memberSocials?.instagramUrl;
  }
  if (category === QuestionCategory.JOINED_AT) return member.joinedAt;
  if (category === QuestionCategory.LAST_NAME) return member.lastName;
  if (category === QuestionCategory.LINKED_IN_URL) {
    return memberSocials?.linkedInUrl;
  }
  if (category === QuestionCategory.PROFILE_PICTURE) return member.pictureUrl;
  if (category === QuestionCategory.TWITTER_URL) {
    return memberSocials?.twitterUrl;
  }

  if (category === QuestionCategory.MEMBER_TYPE) {
    const memberType: IMemberType = db.byMemberTypeId[member.memberType];
    return memberType?.name;
  }

  if (category === QuestionCategory.EVENTS_ATTENDED) {
    return member.eventAttendees?.length ?? 0;
  }

  const value = member.memberValues
    ?.map((memberValueId: string) => db.byMemberValuesId[memberValueId])
    ?.find((entity: IMemberValue) => {
      const question: IQuestion = db.byQuestionId[entity.question];
      return question.id === questionId;
    })?.value;

  return value;
};

export const getMemberTableRow = (args: GetMemberTableRowArgs): TableRow[] => {
  const { db } = args;

  if (!db.community.memberTypes?.length || !db.community.questions?.length) {
    return [];
  }

  const sortQuestionId: string = db.community?.questions?.find(
    (questionId: string) => {
      const question: IQuestion = db.byQuestionId[questionId];
      return question?.category === QuestionCategory.JOINED_AT;
    }
  );

  const filteredMembers: IMember[] = db.community.members
    ?.map((memberId: string) => db.byMemberId[memberId])
    ?.filter((member: IMember) => member?.status === MemberStatus.ACCEPTED)
    ?.filter((member: IMember) => !member.deletedAt);

  const rows: TableRow[] = filteredMembers?.map((member: IMember) =>
    db.community?.questions.reduce(
      (result: TableRow, questionId: string) => {
        const value = getMemberValue({ db, member, questionId });
        return { ...result, [questionId]: value };
      },
      { id: member?.id }
    )
  );

  return rows?.sort((a, b) => sortObjects(a, b, sortQuestionId));
};

export default getMemberTableRow;
