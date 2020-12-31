import React from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

import Button from '@components/Button/Button';

const ChangePlanHeader = () => {
  const { goBack } = useHistory();

  return (
    <div className="s-home-header s-membership-plans-header">
      <div>
        <Button onClick={goBack}>
          <IoArrowBack />
        </Button>

        <h1 className="s-home-header-title">Change Membership Plan</h1>
      </div>
    </div>
  );
};

export default ChangePlanHeader;
