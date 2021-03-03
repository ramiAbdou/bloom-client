import { State } from 'easy-peasy';

import { TableRow } from '@organisms/Table/Table.types';
import { DbModel } from '@store/Db/Db.types';
import {
  IMember,
  IMemberData,
  IQuestion,
  IUser,
  MemberStatus
} from '@store/Db/entities';
import { QuestionCategory } from '@util/constants';
import { sortObjects } from '@util/util';

interface GetMemberTableRowArgs {
  db: State<DbModel>;
}

interface GetMemberValueArgs
  extends Pick<IMember, 'data' | 'isDuesActive' | 'joinedAt' | 'type'>,
    Pick<IUser, 'email' | 'firstName' | 'lastName' | 'pictureUrl'> {
  db: State<DbModel>;
  questionId: string;
}

/**
 * Returns the appropriate value based on the IMember data as well as the
 * IUser attached.
 */
const getMemberValue = (args: GetMemberValueArgs) => {
  const {
    data,
    db,
    email,
    firstName,
    isDuesActive,
    joinedAt,
    lastName,
    pictureUrl,
    questionId,
    type
  } = args;

  const { category }: IQuestion = db.byQuestionId[questionId];

  if (category === QuestionCategory.EMAIL) return email;
  if (category === QuestionCategory.FIRST_NAME) return firstName;
  if (category === QuestionCategory.JOINED_AT) return joinedAt;
  if (category === QuestionCategory.LAST_NAME) return lastName;
  if (category === QuestionCategory.PROFILE_PICTURE) return pictureUrl;

  if (category === QuestionCategory.MEMBERSHIP_TYPE) {
    return db.byTypeId[type]?.name;
  }

  if (category === QuestionCategory.DUES_STATUS) {
    return isDuesActive ? 'Active' : 'Inactive';
  }

  const value = data
    ?.map((dataId: string) => db.byDataId[dataId])
    ?.find((entity: IMemberData) => {
      const question: IQuestion = db.byQuestionId[entity.question];
      return question.id === questionId;
    })?.value;

  return value;
};

export const getMemberTableRow = ({ db }: GetMemberTableRowArgs) => {
  if (!db.community.types?.length || !db.community.questions?.length) return [];

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

  const rows: TableRow[] = filteredMembers?.map((member: IMember) => {
    const user: IUser = db.byUserId[member.user];

    return [...db.community?.questions].reduce(
      (result: TableRow, questionId: string) => {
        const value = getMemberValue({ ...user, ...member, db, questionId });
        return { ...result, [questionId]: value };
      },
      { id: member?.id, userId: user?.id }
    );
  });

  return rows?.sort((a, b) => sortObjects(a, b, sortQuestionId));
};

export default getMemberTableRow;
