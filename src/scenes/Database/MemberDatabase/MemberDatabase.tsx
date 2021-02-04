import deepequal from 'fast-deep-equal';
import React from 'react';

import { ModalType } from '@constants';
import useMutation from '@hooks/useMutation';
import MemberProfileModal from '@modals/MemberProfile/MemberProfile';
import Table from '@organisms/Table/Table';
import {
  OnRenameColumn,
  TableColumn,
  TableOptions,
  TableRow
} from '@organisms/Table/Table.types';
import TableContent from '@organisms/Table/TableContent';
import {
  IIntegrations,
  IMember,
  IMemberData,
  IMemberType,
  IQuestion,
  IUser
} from '@store/Db/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { sortObjects } from '@util/util';
import { RENAME_QUESTION, RenameQuestionArgs } from '../Database.gql';
import ActionRow from './MemberDatabaseActions';
import MemberDatabaseDeleteModal from './MemberDatabaseDeleteModal';
import MemberDatabasePromoteModal from './MemberDatabasePromoteModal';

const MemberDatabaseModals: React.FC = () => (
  <>
    <MemberDatabaseDeleteModal />
    <MemberDatabasePromoteModal />
  </>
);

const MemberDatabase: React.FC = () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  // Massage the member data into valid row data by mapping the question ID
  // to the value for each member.
  const rows: TableRow[] = useStoreState(({ db }) => {
    const { byId: byDataId } = db.entities.data;
    const { byId: byMemberId } = db.entities.members;
    const { byId: byQuestionId } = db.entities.questions;
    const { byId: byTypeId } = db.entities.types;
    const { byId: byUserId } = db.entities.users;

    const joinedAtQuestionId = db.community?.questions?.find(
      (questionId: string) => {
        return byQuestionId[questionId]?.category === 'JOINED_AT';
      }
    );

    if (!db.community.types?.length) return [];

    return db.community.members
      ?.filter((memberId: string) => {
        const member: IMember = byMemberId[memberId];
        return !!member?.user && member?.status === 'ACCEPTED';
      })
      ?.reduce((acc: TableRow[], memberId: string) => {
        const member: IMember = byMemberId[memberId];
        const user: IUser = byUserId[member.user];

        const { isDuesActive, joinedAt, id } = member;
        const { email, firstName, gender, lastName } = user;

        const row: TableRow = db.community?.questions?.reduce(
          (result: TableRow, questionId: string) => {
            const { category }: IQuestion = byQuestionId[questionId];

            if (category === 'EMAIL') result[questionId] = email;
            else if (category === 'FIRST_NAME') result[questionId] = firstName;
            else if (category === 'GENDER') result[questionId] = gender;
            else if (category === 'JOINED_AT') result[questionId] = joinedAt;
            else if (category === 'LAST_NAME') result[questionId] = lastName;
            else if (category === 'MEMBERSHIP_TYPE') {
              const type: IMemberType = byTypeId[member.type];
              if (type) result[questionId] = type.name;
            } else if (category === 'DUES_STATUS') {
              result[questionId] = isDuesActive ? 'Active' : 'Inactive';
            } else {
              const d = member.data.find((dataId: string) => {
                const data: IMemberData = byDataId[dataId];
                const question: IQuestion = byQuestionId[data.question];
                return question.id === questionId;
              });

              result[questionId] = byDataId[d]?.value;
            }
            return result;
          },
          { id }
        );

        return [...acc, row];
      }, [])
      ?.sort((a, b) => sortObjects(a, b, joinedAtQuestionId, 'DESC'));
  }, deepequal);

  const columns: TableColumn[] = useStoreState(({ db }) => {
    const { byId: byIntegrationsId } = db.entities.integrations;
    const { byId: byQuestionId } = db.entities.questions;

    const integrations: IIntegrations =
      byIntegrationsId[db.community?.integrations];

    return db.community.questions
      ?.map((id: string) => byQuestionId[id])
      ?.filter((question: IQuestion) => {
        if (
          question.category === 'DUES_STATUS' &&
          !integrations.stripeAccountId
        ) {
          return false;
        }

        return true;
      });
  });

  const [renameQuestion] = useMutation<IQuestion, RenameQuestionArgs>({
    name: 'renameQuestion',
    query: RENAME_QUESTION
  });

  const onRenameColumn: OnRenameColumn = async ({ column, updateColumn }) => {
    const { title, id, version } = column;

    // We pass in the version to check for race conditions.
    const { error } = await renameQuestion({ id, title, version });
    if (!error) updateColumn({ id, title, version: version + 1 });
  };

  const options: TableOptions = {
    hasCheckbox: true,
    isClickable: true,
    onRowClick: ({ id: memberId }: TableRow) => {
      showModal(`${ModalType.MEMBER_PROFILE}-${memberId}`);
    }
  };

  return (
    <Table
      columns={columns}
      options={options}
      rows={rows}
      show={!!columns?.length}
    >
      <ActionRow />
      <TableContent onRenameColumn={onRenameColumn} />
      <MemberDatabaseModals />

      {rows.map((row: TableRow) => {
        return <MemberProfileModal memberId={row?.id} />;
      })}
    </Table>
  );
};

export default MemberDatabase;
