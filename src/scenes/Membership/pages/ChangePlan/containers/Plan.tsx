import React from 'react';

import Button from '@components/Button/Button';
import Card from '@components/Elements/Card/Card';

const PlanContainer = () => {
  return (
    <div className="s-membership-plans-card-ctr">
      <Card className="s-membership-plans-card">
        <h4>Undergraduate Member</h4>

        <p>
          <span>FREE</span>
          <span>Per Year</span>
        </p>

        <Button fit primary>
          Change Plan
        </Button>
      </Card>

      <Card className="s-membership-plans-card">
        <h4>Undergraduate Member</h4>

        <p>
          <span>$125</span>
          <span>Per Year</span>
        </p>

        <Button fit primary>
          Change Plan
        </Button>
      </Card>

      <Card className="s-membership-plans-card">
        <h4>Undergraduate Member</h4>

        <p>
          <span>$250</span>
          <span>Per Year</span>
        </p>

        <Button fit primary>
          Change Plan
        </Button>
      </Card>

      <Card className="s-membership-plans-card">
        <h4>Undergraduate Member</h4>

        <p>
          <span>$500</span>
          <span>Lifetime</span>
        </p>

        <Button fit primary>
          Change Plan
        </Button>
      </Card>
    </div>
  );
};

export default PlanContainer;
