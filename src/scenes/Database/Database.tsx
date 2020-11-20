/**
 * @fileoverview Scene: Database
 * @author Rami Abdou
 */

import './Database.scss';

import { useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';

import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import Header from './components/Header';
import { GET_DATABASE } from './Database.gql';

export default () => {
  const updateEntities = useStoreActions((actions) => actions.updateEntities);
  const { data, loading } = useQuery(GET_DATABASE);

  useEffect(() => {
    if (data?.getDatabase)
      updateEntities({
        data: { ...data.getDatabase },
        schema: Schema.COMMUNITY
      });
  }, [data]);

  return (
    <>
      <Header loading={loading} />
    </>
  );
};
