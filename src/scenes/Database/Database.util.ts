import { State } from 'easy-peasy';

import { TableRow } from '@organisms/Table/Table.types';
import { DbModel } from '@store/Db/Db.types';
import { IMember, IMemberData, IQuestion, IUser } from '@store/Db/entities';
import { sortObjects } from '@util/util';

interface GetMemberTableRowArgs {
  db: State<DbModel>;
}

interface GetMemberValueArgs
  extends Pick<IMember, 'data' | 'isDuesActive' | 'joinedAt' | 'type'>,
    Pick<IUser, 'email' | 'firstName' | 'gender' | 'lastName'> {
  db: State<DbModel>;
  questionId: string;
}

const getMemberValue = ({
  data,
  db,
  email,
  firstName,
  gender,
  isDuesActive,
  joinedAt,
  lastName,
  questionId,
  type
}: GetMemberValueArgs) => {
  const { category }: IQuestion = db.byQuestionId[questionId];

  if (category === 'EMAIL') return email;
  if (category === 'FIRST_NAME') return firstName;
  if (category === 'GENDER') return gender;
  if (category === 'JOINED_AT') return joinedAt;
  if (category === 'LAST_NAME') return lastName;
  if (category === 'MEMBERSHIP_TYPE') return db.byTypeId[type]?.name;
  if (category === 'DUES_STATUS') {
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
  if (!db.community.types?.length) return [];

  const sortQuestionId: string = db.community?.questions?.find(
    (questionId: string) => {
      const question: IQuestion = db.byQuestionId[questionId];
      return question?.category === 'JOINED_AT';
    }
  );

  const filteredMembers: IMember[] = db.community.members
    ?.map((memberId: string) => db.byMemberId[memberId])
    ?.filter((member: IMember) => {
      return !!member?.user && member?.status === 'ACCEPTED';
    });

  const rows: TableRow[] = filteredMembers?.map((member: IMember) => {
    const user: IUser = db.byUserId[member.user];

    return db.community?.questions?.reduce(
      (result: TableRow, questionId: string) => {
        const value = getMemberValue({ ...user, ...member, db, questionId });
        return { ...result, [questionId]: value };
      },
      { id: member?.id }
    );
  });

  return rows?.sort((a, b) => sortObjects(a, b, sortQuestionId));
};

export default getMemberTableRow;
