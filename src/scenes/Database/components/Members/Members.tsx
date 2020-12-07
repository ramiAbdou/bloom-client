import { useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';

import Table, { tableModel } from '@components/Table/Table.store';
import { IMembershipQuestion } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { GET_DATABASE } from '../../Database.gql';
import Database from '../../Database.store';
import ActionRow from './ActionRow';
import MemberTable from './MemberTable';

export default () => {
  const questions: IMembershipQuestion[] = useStoreState(
    ({ community, entities }) => {
      const { byId } = entities.membershipQuestions;
      return community.membershipQuestions?.map((id: string) => byId[id]);
    }
  );

  const updateEntities = useStoreActions((actions) => actions.updateEntities);
  const currentLoading = Database.useStoreState((store) => store.loading);
  const setLoading = Database.useStoreActions((actions) => actions.setLoading);

  const { data, loading } = useQuery(GET_DATABASE);

  useEffect(() => {
    if (!data?.getDatabase) return;

    // After fetching the member database, we update both the members AND
    // the membership questions.
    updateEntities({
      data: {
        ...data.getDatabase,
        members: data.getDatabase.memberships,
        membershipQuestions: data.getDatabase.questions
      },
      schema: Schema.COMMUNITY
    });
  }, [data]);

  useEffect(() => {
    // Since we need to use the loading state in the header, we set the
    // update the context state accordingly.
    if (loading !== currentLoading) setLoading(loading);
  }, [loading]);

  if (loading || !questions?.length) return null;

  return (
    <Table.Provider runtimeModel={{ ...tableModel, columns: questions }}>
      <ActionRow />
      <MemberTable />
    </Table.Provider>
  );
};
