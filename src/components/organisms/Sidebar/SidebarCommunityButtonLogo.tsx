import React from 'react';

import { gql } from '@apollo/client';
import { ICommunity } from '@util/db.entities';
import { ComponentWithFragments } from '@util/constants';

const SidebarCommunityButtonLogo: ComponentWithFragments<ICommunity> = ({
  data: community
}) => (
  <img
    alt="Community Logo"
    className="br-xxs h-100 w-100"
    src={community.logoUrl}
  />
);

SidebarCommunityButtonLogo.fragments = {
  data: gql`
    fragment SidebarCommunityButtonLogoFragment on communities {
      logoUrl
    }
  `
};

export default SidebarCommunityButtonLogo;
