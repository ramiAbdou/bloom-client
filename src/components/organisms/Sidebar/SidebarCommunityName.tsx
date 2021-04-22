import React from 'react';

import { gql } from '@apollo/client';
import Separator from '@components/atoms/Separator';
import { ComponentWithFragments } from '@util/constants';
import { ICommunity } from '@util/constants.entities';

const SidebarCommunityName: ComponentWithFragments<ICommunity> = ({
  data: community
}) => (
  <>
    <h3 className="c-primary mx-sm my-md">{community?.name}</h3>
    <Separator noMargin />
  </>
);

SidebarCommunityName.fragment = gql`
  fragment SidebarCommunityNameFragment on communities {
    id
    name
  }
`;

export default SidebarCommunityName;
