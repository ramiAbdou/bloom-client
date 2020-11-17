/**
 * @fileoverview Scene: Integrations
 * @author Rami Abdou
 */

import './Integrations.scss';

import React from 'react';

import IntegrationCard from './components/IntegrationCard/IntegrationCard';

export default () => {
  return (
    <div className="s-integrations">
      <div className="s-home-header">
        <h1 className="s-home-header-title">Integrations</h1>
      </div>

      <div className="s-integrations-card-ctr">
        <IntegrationCard
          description="Quickly add every new member of the community to your Mailchimp
        listserv."
          href="https://mailchimp.com/"
          name="Mailchimp"
        />
        <IntegrationCard
          description="Collect monthly or yearly dues payments from your members."
          href="https://stripe.com/"
          name="Stripe"
        />
        <IntegrationCard
          description="Host Zoom events with your account in 1-click."
          href="https://zoom.com/"
          name="Zoom"
        />
        <IntegrationCard
          description="For just about any other integration you want."
          href="https://zapier.com/"
          name="Zapier"
        />
      </div>
    </div>
  );
};
