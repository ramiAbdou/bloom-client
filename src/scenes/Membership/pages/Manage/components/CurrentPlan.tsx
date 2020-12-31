import React from 'react';

import Button from '@components/Button/Button';
import Card from '@components/Elements/Card/Card';

const CurrentPlanContent = () => {
  return (
    <>
      <p>
        <span>$250</span>
        <span>Per Year</span>
      </p>

      <p>Family Member</p>
    </>
  );
};

const CurrentPlanCard = () => {
  return (
    <Card className="s-membership-manage-card--plan">
      <h4>Current Plan</h4>
      <CurrentPlanContent />
      <Button fit outline>
        Change Membership Plan
      </Button>
    </Card>
  );
};

export default CurrentPlanCard;
