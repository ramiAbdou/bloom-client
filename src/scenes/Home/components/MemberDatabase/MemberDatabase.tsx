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
import { SerializedMembershipData } from '@store/Membership.store';
import { useStoreActions, useStoreState } from '@store/Store';
import { GET_MEMBER_DATABASE } from '../../Home.gql';
import TableActions from './TableActions';

const Database = () => {
  const databaseQuestions = useStoreState(
    ({ membership }) =>
      membership.activeMembership?.community?.databaseQuestions
  );

  const members = useStoreState(
    ({ membership }) => membership.activeMembership?.community?.members
  );

  const data = useMemo(
    () =>
      !members
        ? []
        : members.reduce(
            (
              acc: Row[],
              { membershipId, data: applicationData }: SerializedMembershipData
            ) => {
              const result = { id: membershipId };
              applicationData.forEach(({ questionId, value }) => {
                result[questionId] = value;
              });

              return [...acc, result];
            },
            []
          ),
    [members?.length]
  );

  const columns = useMemo(
    () =>
      !databaseQuestions
        ? []
        : databaseQuestions.map(({ type, id, title }) => ({
            id,
            title,
            type
          })),
    [databaseQuestions?.length]
  );

  if (!columns.length || !data.length)
    return <p>You don't have any members! 🥴</p>;

  return (
    <Table.Provider initialData={{ columns, data }}>
      <TableActions />
      <TableContent />
    </Table.Provider>
  );
};

export default () => {
  const numMembers = useStoreState(
    ({ membership }) => membership.activeMembership?.community?.members?.length
  );
  const setMemberDatabase = useStoreActions(
    ({ membership }) => membership.setMemberDatabase
  );

  const result = useQuery(GET_MEMBER_DATABASE, { useCache: true });
  const { data } = result;

  useEffect(() => {
    if (data)
      setMemberDatabase({
        members: data?.getCommunity?.memberships?.map(({ allData }) => allData),
        questions: data?.getCommunity?.application?.questions
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
