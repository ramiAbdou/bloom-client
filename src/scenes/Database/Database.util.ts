import { State } from 'easy-peasy';

import { TableRow } from '@organisms/Table/Table.types';
import { DbModel } from '@store/Db/Db.types';
import {
  IMember,
  IMemberPlan,
  IMemberSocials,
  IMemberValue,
  IQuestion,
  MemberStatus
} from '@store/Db/entities';
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
  const socials: IMemberSocials = db.bySocialsId[member.socials];
  const { category }: IQuestion = db.byQuestionId[questionId];

  if (category === QuestionCategory.BIO) return member.bio;
  if (category === QuestionCategory.CLUBHOUSE_URL) return socials?.clubhouseUrl;
  if (category === QuestionCategory.DUES_STATUS) return member.isDuesActive;
  if (category === QuestionCategory.EMAIL) return member.email;
  if (category === QuestionCategory.FACEBOOK_URL) return socials?.facebookUrl;
  if (category === QuestionCategory.FIRST_NAME) return member.firstName;
  if (category === QuestionCategory.INSTAGRAM_URL) return socials?.instagramUrl;
  if (category === QuestionCategory.JOINED_AT) return member.joinedAt;
  if (category === QuestionCategory.LAST_NAME) return member.lastName;
  if (category === QuestionCategory.LINKED_IN_URL) return socials?.linkedInUrl;
  if (category === QuestionCategory.PROFILE_PICTURE) return member.pictureUrl;
  if (category === QuestionCategory.TWITTER_URL) return socials?.twitterUrl;

  if (category === QuestionCategory.MEMBER_PLAN) {
    const plan: IMemberPlan = db.byMemberPlanId[member.plan];
    return plan?.name;
  }

  if (category === QuestionCategory.EVENTS_ATTENDED) {
    return member.attendees?.length ?? 0;
  }

  const value = member.values
    ?.map((valueId: string) => {
      return db.byValuesId[valueId];
    })
    ?.find((entity: IMemberValue) => {
      const question: IQuestion = db.byQuestionId[entity.question];
      return question.id === questionId;
    })?.value;

  return value;
};

export const getMemberTableRow = (args: GetMemberTableRowArgs): TableRow[] => {
  const { db } = args;

  if (!db.community.plans?.length || !db.community.questions?.length) return [];

  const sortQuestionId: string = db.community?.questions?.find(
    (questionId: string) => {
      const question: IQuestion = db.byQuestionId[questionId];
      return question?.category === QuestionCategory.JOINED_AT;
    }
  );

  const filteredMembers: IMember[] = db.community.members
    ?.map((memberId: string) => {
      return db.byMemberId[memberId];
    })
    ?.filter((member: IMember) => {
      return member?.status === MemberStatus.ACCEPTED;
    })
    ?.filter((member: IMember) => {
      return !member.deletedAt;
    });

  const rows: TableRow[] = filteredMembers?.map((member: IMember) => {
    return db.community?.questions.reduce(
      (result: TableRow, questionId: string) => {
        const value = getMemberValue({ db, member, questionId });
        return { ...result, [questionId]: value };
      },
      { id: member?.id }
    );
  });

  return rows?.sort((a, b) => {
    return sortObjects(a, b, sortQuestionId);
  });
};

export default getMemberTableRow;
