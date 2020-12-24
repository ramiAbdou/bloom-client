import React from 'react';

import Input from '@components/Elements/Input';
import Dues from '../Dues.store';

export default () => {
  const nameOnCard = Dues.useStoreState((store) => store.nameOnCard);
  const setNameOnCard = Dues.useStoreActions((store) => store.setNameOnCard);

  const onChange = (value: string) => setNameOnCard(value);

  return (
    <div className="s-actions-dues-item">
      <p>Name on Card</p>

      <Input
        placeholder="Name on Card"
        value={nameOnCard}
        onChange={onChange}
      />
    </div>
  );
};
