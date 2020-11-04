/**
 * @fileoverview Scene: MemberDatabase
 * @author Rami Abdou
 */

import './MemberDatabase.scss';

import { useQuery } from 'graphql-hooks';
import React, { useEffect, useMemo } from 'react';

import Spinner from '@components/Loader/Spinner';
import TableContent from '@components/Table/Table';
import Table from '@components/Table/Table.store';
import { Row } from '@components/Table/Table.types';
import { Community, IApplicationQuestion, IMember } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { GET_MEMBER_DATABASE } from '../../Home.gql';
import TableActions from './TableActions';

const Database = () => {
  const questions: IApplicationQuestion[] = useStoreState(
    ({ applicationQuestions, community }) =>
      community.applicationQuestions?.map(
        (questionId: string) => applicationQuestions.byId[questionId]
      )
  );

  const allMembers: IMember[] = useStoreState(({ members, community }) =>
    community.members?.map((memberId: string) => members.byId[memberId])
  );

  const data = useMemo(
    () =>
      !allMembers
        ? []
        : allMembers.reduce((acc: Row[], { id, allData }: IMember) => {
            const result = { id };
            allData.forEach(({ questionId, value }) => {
              result[questionId] = value;
            });

            return [...acc, result];
          }, []),
    [allMembers?.length]
  );

  const columns = useMemo(
    () =>
      !questions
        ? []
        : questions.map(({ type, id, title }) => ({
            id,
            title,
            type
          })),
    [questions?.length]
  );

  if (!questions?.length) return null;
  if (!data.length) return <p>You don't have any members! 🥴</p>;

  return (
    <Table.Provider initialData={{ columns, data }}>
      <TableActions />
      <TableContent />
    </Table.Provider>
  );
};

export default () => {
  const updateEntities = useStoreActions((store) => store.updateEntities);
  const numMembers = useStoreState(
    ({ community }) => community.members?.length
  );

  const result = useQuery(GET_MEMBER_DATABASE);
  const { data } = result;

  useEffect(() => {
    if (!data?.getMemberDatabase) return;

    updateEntities({
      data: {
        ...data.getMemberDatabase,
        applicationQuestions: data.getMemberDatabase.application.questions,
        members: data.getMemberDatabase.memberships
      },
      schema: Community
    });
  }, [data]);

  const loading = result.loading && !data && !numMembers;

  return (
    <div className="s-home-database">
      <div className="s-home-header">
        <h3>Member Database</h3>
        {loading && <Spinner dark />}
      </div>

      {!loading && data && <Database />}
    </div>
  );
};
