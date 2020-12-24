import deepequal from 'fast-deep-equal';
import { motion } from 'framer-motion';
import React from 'react';

import Button from '@components/Button/Button';
import Radio from '@components/Elements/Radio';
import { IMemberType } from '@store/entities';
import { useStoreState } from '@store/Store';
import Dues from '../Dues.store';

const TypeOptionList = () => {
  const allTypes: IMemberType[] = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return db.community.types?.map((id: string) => byId[id]);
  }, deepequal);

  const selectedTypeId = Dues.useStoreState((store) => store.selectedTypeId);
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
        defaultChecked={selectedTypeId}
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
  const selectedTypeId = Dues.useStoreState((store) => store.selectedTypeId);

  const currentType: IMemberType = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return byId[selectedTypeId];
  }, deepequal);

  const isTypeListOpen = Dues.useStoreState((store) => store.isTypeListOpen);

  const toggleIsTypeListOpen = Dues.useStoreActions(
    (store) => store.toggleIsTypeListOpen
  );

  // Recurrence will be null if all of the Membership types have yet to be
  // loaded from the GQL call.
  if (!currentType?.recurrence) return null;

  const onClick = () => toggleIsTypeListOpen();

  const { name, recurrence } = currentType;
  const amount = currentType.amount / 100;

  const currentTypeString = `${name}, $${amount}/${recurrence}`
    .replace('LIFETIME', 'life')
    .replace('MONTHLY', 'mo')
    .replace('YEARLY', 'yr');

  return (
    <div className="s-actions-dues-item s-actions-dues-item--type">
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
