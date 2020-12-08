import deepequal from 'fast-deep-equal';
import { useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';

import TableContent from '@components/Table/Table';
import Table, { Column, Row, tableModel } from '@components/Table/Table.store';
import { IAdmin } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { GET_ADMINS } from '../../Database.gql';
import Database from '../../Database.store';
import AddAdminStore from '../AddAdmin/AddAdmin.store';
import AddAdminModal from '../AddAdmin/AddAdminModal';
import ActionRow from './ActionRow';

const AdminTable = () => {
  const admins: IAdmin[] = useStoreState(({ entities, community }) => {
    const { byId } = entities.admins;
    return community.admins?.map((adminId: string) => byId[adminId]);
  }, deepequal);

  console.log(admins);

  const rows: Row[] = admins.reduce(
    (acc: Row[], { firstName, lastName, email, id }: IAdmin) => {
      return [
        ...acc,
        { Email: email, 'First Name': firstName, 'Last Name': lastName, id }
      ];
    },
    []
  );

  const updateData = Table.useStoreActions((actions) => actions.updateData);

  // Used primarily for the removal of members. This will not update the
  // data if the number of members doesn't change.
  useEffect(() => {
    updateData(rows);
  }, [rows?.length]);

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
      data: {
        ...result,
        admins: result.memberships.map(({ id, user }) => {
          const { id: _, ...rest } = user;
          return { id, ...rest };
        })
      },
      schema: Schema.COMMUNITY
    });
  }, [data]);

  useEffect(() => {
    if (loading !== currentLoading) setLoading(loading);
  }, [loading]);

  // We typically fetch the question ID from the backend, but here, we are
  // only displaying a limited number of columns so we hard-code them.
  const columns: Column[] = [
    { id: 'First Name', title: 'First Name', type: 'SHORT_TEXT' },
    { id: 'Last Name', title: 'Last Name', type: 'SHORT_TEXT' },
    { id: 'Email', title: 'Email', type: 'SHORT_TEXT' }
  ];

  if (loading || !isAdminsLoaded) return null;

  return (
    <>
      <Table.Provider
        runtimeModel={{ ...tableModel, columns, select: isOwner }}
      >
        <ActionRow />
        <AdminTable />
      </Table.Provider>

      <AddAdminStore.Provider>
        <AddAdminModal />
      </AddAdminStore.Provider>
    </>
  );
};
