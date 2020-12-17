import deepequal from 'fast-deep-equal';
import { useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';

import UnderlineButton from '@components/Button/UnderlineButton';
import { IMemberType } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { GET_MEMBER_TYPES } from '../Dues.gql';

const useFetchMemberTypes = () => {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);
  const { data, loading } = useQuery(GET_MEMBER_TYPES);

  useEffect(() => {
    const result = data?.getMemberTypes;
    if (!result) return;

    mergeEntities({
      communityReferenceColumn: 'types',
      data: result,
      schema: [Schema.MEMBER_TYPE]
    });
  }, [data]);

  return loading;
};

export default () => {
  const allTypes: IMemberType[] = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return db.community.types?.map((id: string) => byId[id]);
  }, deepequal);

  const currentType: IMemberType = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return byId[db.member.type];
  }, deepequal);

  const loading = useFetchMemberTypes();
  if (loading || !currentType) return null;

  const { amount, name, recurrence } = currentType;

  const currentTypeString = `${name}, $${amount}/${recurrence}`
    .replace('MONTLY', 'mo')
    .replace('YEARLY', 'yr');

  return (
    <div className="s-actions-dues-item">
      <p>Membership Type</p>
      <div>
        <p>{currentTypeString}</p>
        <UnderlineButton title="Change Membership" />
      </div>
    </div>
  );
};
