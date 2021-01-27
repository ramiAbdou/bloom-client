import deepequal from 'fast-deep-equal';
import React from 'react';

import useMutation from '@hooks/useMutation';
import Table from '@organisms/Table/Table';
import { Column, OnRenameColumn, Row } from '@organisms/Table/Table.types';
import TableContent from '@organisms/Table/TableContent';
import {
  IIntegrations,
  IMember,
  IMemberData,
  IMemberType,
  IQuestion,
  IUser
} from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { RENAME_QUESTION, RenameQuestionArgs } from '../Database.gql';
import ActionRow from './ActionRow';

export default () => {
  // Massage the member data into valid row data by mapping the question ID
  // to the value for each member.
  const rows: Row[] = useStoreState(({ db }) => {
    const { byId: byDataId } = db.entities.data;
    const { byId: byMemberId } = db.entities.members;
    const { byId: byQuestionId } = db.entities.questions;
    const { byId: byTypeId } = db.entities.types;
    const { byId: byUserId } = db.entities.users;

    return db.community.members?.reduce((acc: Row[], memberId: string) => {
      const member: IMember = byMemberId[memberId];
      if (!member) return acc;

      const { duesStatus, joinedAt, id } = member;

      const user: IUser = byUserId[member.user];
      const { email, firstName, gender, lastName } = user;

      if (member.status !== 'ACCEPTED') return acc;

      const row: Row = db.community?.questions.reduce(
        (result: Row, questionId: string) => {
          const { category }: IQuestion = byQuestionId[questionId];

          if (category === 'EMAIL') result[questionId] = email;
          else if (category === 'FIRST_NAME') result[questionId] = firstName;
          else if (category === 'GENDER') result[questionId] = gender;
          else if (category === 'JOINED_AT') result[questionId] = joinedAt;
          else if (category === 'LAST_NAME') result[questionId] = lastName;
          else if (category === 'MEMBERSHIP_TYPE') {
            const type: IMemberType = byTypeId[member.type];
            result[questionId] = type.name;
          } else if (category === 'DUES_STATUS') {
            const duesStatusString =
              duesStatus?.charAt(0).toUpperCase() +
              duesStatus?.slice(1).toLowerCase();

            result[questionId] = duesStatusString;
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
    }, []);
  }, deepequal);

  const columns: Column[] = useStoreState(({ db }) => {
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

  if (!columns?.length) return null;

  const onRenameColumn: OnRenameColumn = async ({ column, updateColumn }) => {
    const { title, id, version } = column;

    // We pass in the version to check for race conditions.
    const { error } = await renameQuestion({ id, title, version });
    if (!error) updateColumn({ id, title, version: version + 1 });
  };

  return (
    <Table
      columns={columns}
      options={{ hasCheckbox: true, isClickable: true }}
      rows={rows}
    >
      <ActionRow />
      <TableContent onRenameColumn={onRenameColumn} />
    </Table>
  );
};
