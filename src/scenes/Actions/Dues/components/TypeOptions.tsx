import deepequal from 'fast-deep-equal';
import { motion } from 'framer-motion';
import React from 'react';

import Button from '@components/Button/Button';
import Radio from '@components/Element/Radio';
import { IMemberType } from '@store/entities';
import { useStoreState } from '@store/Store';
import Dues from '../Dues.store';

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

  if (!currentType) return null;

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
        <Button underline onClick={onClick}>
          Change Membership
        </Button>
      </div>
    </div>
  );
};
