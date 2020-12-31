import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

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
  const { url } = useRouteMatch();

  return (
    <Card className="s-membership-manage-card--plan">
      <h4>Current Plan</h4>
      <CurrentPlanContent />

      <Link to={`${url}/change-plan`}>
        <Button fit outline>
          Change Membership Plan
        </Button>
      </Link>
    </Card>
  );
};

export default CurrentPlanCard;
