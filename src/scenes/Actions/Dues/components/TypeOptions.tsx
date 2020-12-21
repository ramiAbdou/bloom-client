import deepequal from 'fast-deep-equal';
import { motion } from 'framer-motion';
import { useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';

import UnderlineButton from '@components/Button/UnderlineButton';
import Radio from '@components/Element/Radio';
import { IMemberType } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { GET_MEMBER_TYPES } from '../Dues.gql';
import Dues from '../Dues.store';

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

const TypeOptionList = () => {
  const allTypes: IMemberType[] = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return db.community.types?.map((id: string) => byId[id]);
  }, deepequal);

  const currentTypeId = Dues.useStoreState((store) => store.memberTypeId);
  const isTypeListOpen = Dues.useStoreState((store) => store.isTypeListOpen);

  const setMemberTypeId = Dues.useStoreActions(
    (store) => store.setMemberTypeId
  );

  const setIsTypeListOpen = Dues.useStoreActions(
    (store) => store.setIsTypeListOpen
  );

  const onSelect = (typeId: any) => {
    setMemberTypeId(typeId);
    setIsTypeListOpen(false);
  };

  if (!isTypeListOpen) return null;

  return (
    <motion.div animate={{ scaleY: 1 }} initial={{ scaleY: 0 }}>
      <Radio
        defaultChecked={currentTypeId}
        name="s-actions-dues"
        options={allTypes.map(({ amount, id, name, recurrence }) => {
          amount /= 100;

          const value = `${name}, $${amount}/${recurrence}`
            .replace('LIFETIME', 'life')
            .replace('MONTLY', 'mo')
            .replace('YEARLY', 'yr');

          return { label: value, value: id };
        })}
        onSelect={onSelect}
      />
    </motion.div>
  );
};

export default () => {
  const memberTypeId = Dues.useStoreState((store) => store.memberTypeId);

  const currentType: IMemberType = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return byId[memberTypeId];
  }, deepequal);

  const isTypeListOpen = Dues.useStoreState((store) => store.isTypeListOpen);

  const toggleIsTypeListOpen = Dues.useStoreActions(
    (store) => store.toggleIsTypeListOpen
  );

  const loading = useFetchMemberTypes();
  if (loading || !currentType) return null;

  const onClick = () => toggleIsTypeListOpen();

  const { name, recurrence } = currentType;
  const amount = currentType.amount / 100;

  const currentTypeString = `${name}, $${amount}/${recurrence}`
    .replace('LIFETIME', 'life')
    .replace('MONTHLY', 'mo')
    .replace('YEARLY', 'yr');

  return (
    <div className="s-actions-dues-item">
      <p>Membership Type</p>
      <div>
        <TypeOptionList />
        {!isTypeListOpen && <p>{currentTypeString}</p>}
        <UnderlineButton onClick={onClick}>Change Membership</UnderlineButton>
      </div>
    </div>
  );
};
