import React from 'react';

import { gql } from '@apollo/client';
import { ComponentWithFragments } from '@util/constants';
import { ICommunity } from '@util/constants.entities';

const SidebarCommunityButtonLogo: ComponentWithFragments<ICommunity> = ({
  data: community
}) => (
  <img
    alt="Community Logo"
    className="br-xxs h-100 w-100"
    src={community.logoUrl}
  />
);

SidebarCommunityButtonLogo.fragment = gql`
  fragment SidebarCommunityButtonLogoFragment on communities {
    logoUrl
  }
`;

export default SidebarCommunityButtonLogo;
