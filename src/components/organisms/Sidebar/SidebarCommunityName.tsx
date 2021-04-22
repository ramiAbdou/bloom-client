import React from 'react';

import { gql } from '@apollo/client';
import Separator from '@components/atoms/Separator';
import { ICommunity } from '@util/db.entities';
import { ComponentWithFragments } from '@util/constants';

const SidebarCommunityName: ComponentWithFragments<ICommunity> = ({
  data: community
}) => (
  <>
    <h3 className="c-primary mx-sm my-md">{community?.name}</h3>
    <Separator noMargin />
  </>
);

SidebarCommunityName.fragments = {
  data: gql`
    fragment SidebarCommunityNameFragment on communities {
      id
      name
    }
  `
};

export default SidebarCommunityName;
