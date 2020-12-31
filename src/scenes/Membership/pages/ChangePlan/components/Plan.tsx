import React from 'react';

import Button from '@components/Button/Button';
import Card from '@components/Elements/Card/Card';

type PlanCardProps = { isCurrent?: boolean };

const PlanCard = ({ isCurrent }: PlanCardProps) => {
  return (
    <Card className="s-membership-plans-card">
      <h4>Undergraduate Member</h4>

      <p>
        <span>FREE</span>
        <span>Per Year</span>
      </p>

      <Button fit disabled={isCurrent} outline={!isCurrent} primary={isCurrent}>
        {isCurrent ? 'Current Plan' : 'Change Plan'}
      </Button>
    </Card>
  );
};

export default PlanCard;
