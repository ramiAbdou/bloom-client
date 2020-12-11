import React from 'react';

import Button from '@components/Button/Button';
import { useStoreState } from '@store/Store';

export default () => {
  const logoUrl = useStoreState(({ db }) => db.community.logoUrl);

  return (
    <Button className="s-home-bb-link--community">
      <img src={logoUrl} />
    </Button>
  );
};
