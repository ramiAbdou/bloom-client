/**
 * @fileoverview Scene: Admins
 * @author Rami Abdou
 */

import { useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';

import TableContent from '@components/Table/Table';
import Table from '@components/Table/Table.store';
import { Column, Row } from '@components/Table/Table.types';
import { IAdmin } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { GET_ADMINS } from '../../Database.gql';
import Database from '../../Database.store';
import ActionRow from './ActionRow';

const AdminTable = () => {
  const admins: IAdmin[] = useStoreState(({ entities, community }) => {
    const { byId } = entities.admins;
    return community.admins?.map((adminId: string) => byId[adminId]);
  });

  const clearSelectedRows = Table.useStoreActions(
    (actions) => actions.clearSelectedRows
  );
  const updateData = Table.useStoreActions((actions) => actions.updateData);

  // Used primarily for the removal of members. This will not update the
  // data if the number of members doesn't change.
  useEffect(() => {
    const data = admins.reduce(
      (acc: Row[], { firstName, lastName, email, id }: IAdmin) => {
        return [
          ...acc,
          { Email: email, 'First Name': firstName, 'Last Name': lastName, id }
        ];
      },
      []
    );

    updateData(data);
    clearSelectedRows();
  }, [admins?.length]);

  return <TableContent />;
};

export default () => {
  const updateEntities = useStoreActions((actions) => actions.updateEntities);
  const currentLoading = Database.useStoreState((store) => store.loading);
  const setLoading = Database.useStoreActions((actions) => actions.setLoading);
  const isOwner = useStoreState((store) => store.isOwner);
  const isAdminsLoaded = useStoreState(
    ({ community }) => !!community.admins?.length
  );

  const { data, loading } = useQuery(GET_ADMINS);

  useEffect(() => {
    const { getAdmins: result } = data || {};
    if (!result) return;

    updateEntities({
      data: { ...result, admins: result.memberships.map(({ user }) => user) },
      schema: Schema.COMMUNITY
    });
  }, [data]);

  useEffect(() => {
    if (loading !== currentLoading) setLoading(loading);
  }, [loading]);

  // We typically fetch the question ID from the backend, but here, we are
  // only displaying a limited number of columns so we hard-code them.
  const columns: Partial<Column>[] = [
    { id: 'First Name', title: 'First Name', type: 'SHORT_TEXT' },
    { id: 'Last Name', title: 'Last Name', type: 'SHORT_TEXT' },
    { id: 'Email', title: 'Email', type: 'SHORT_TEXT' }
  ];

  if (loading || !isAdminsLoaded) return null;

  return (
    <Table.Provider initialData={{ columns, select: isOwner }}>
      <ActionRow />
      <AdminTable />
    </Table.Provider>
  );
};
