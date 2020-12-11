import deepequal from 'fast-deep-equal';
import { useMutation } from 'graphql-hooks';
import React, { useCallback, useEffect } from 'react';

import TableContent from '@components/Table/Table';
import Table, { Column, Row } from '@components/Table/Table.store';
import { IMember } from '@store/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { getGraphQLError } from '@util/util';
import { RENAME_QUESTION } from '../../Database.gql';

export default () => {
  // Massage the member data into valid row data by mapping the question ID
  // to the value for each member.
  const rows: Row[] = useStoreState(({ db }) => {
    const { community } = db;
    const { byId } = db.entities.members;

    return community.members?.reduce((acc: Row[], id: string) => {
      const result: Row = { id };
      const { allData, status }: IMember = byId[id];

      if (['REJECTED', 'PENDING'].includes(status) || !allData) return acc;

      allData.forEach(({ questionId, value }) => {
        result[questionId] = value;
      });

      return [...acc, result];
    }, []);
  }, deepequal);

  const showToast = useStoreActions(({ toast }) => toast.showToast);
  const updateColumn = Table.useStoreActions((store) => store.updateColumn);
  const updateData = Table.useStoreActions((store) => store.updateData);

  const [renameQuestion] = useMutation(RENAME_QUESTION);

  // Used primarily for the removal of members. This will not update the
  // data if the number of members doesn't change.
  useEffect(() => {
    if (rows) updateData(rows);
  }, [rows?.length]);

  // Needs to be memoized since we are storing it in the Table store.
  const onRenameColumn = useCallback(async ({ title, id, version }: Column) => {
    // We pass in the version to check for race conditions.
    const { error } = await renameQuestion({
      variables: { id, title, version }
    });

    if (error) showToast({ message: getGraphQLError(error), type: 'ERROR' });
    else updateColumn({ id, title, version: ++version });
  }, []);

  return <TableContent onRenameColumn={onRenameColumn} />;
};
