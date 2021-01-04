import React from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';

import Card from '@components/Elements/Card/Card';
import IntegrationCardButton from './Button';

export type IntegrationCardProps = {
  completed?: boolean;
  description: string;
  logo: string;
  name: string;
  href: string;
};

export default ({
  completed,
  logo,
  name,
  description,
  href
}: IntegrationCardProps) => (
  <Card className="s-integrations-card">
    <div>
      <div className="s-integrations-card-header">
        <img alt="Company Logo" className="s-integrations-icon" src={logo} />

        {completed && (
          <div className="s-integrations-connected">
            <IoCheckmarkCircle />
            <p>Connected</p>
          </div>
        )}
      </div>

      <h3>{name}</h3>
      <p>{description}</p>
    </div>

    <div>
      <IntegrationCardButton completed={completed} href={href} name={name} />
    </div>
  </Card>
);
