/**
 * @fileoverview Component: CommunityIcons
 * @author Rami Abdou
 */

import React from 'react';

import { useStoreState } from '@store/Store';
import CSSModifier from '@util/CSSModifier';

type CommunityIconProps = { isActive: boolean; logoUrl: string };

const CommunityIcon = ({ isActive, logoUrl }: CommunityIconProps) => {
  const { css } = new CSSModifier()
    .class('c-nav-community')
    .addClass(isActive, 'c-nav-community--active');

  return (
    <button className={css}>
      <img src={logoUrl} />
    </button>
  );
};

export default () => {
  const communities = useStoreState(({ membership }) =>
    membership.memberships?.map(({ community, isActive }) => ({
      isActive,
      logoUrl: community.logoUrl
    }))
  );

  return (
    <div className="c-nav-community-ctr">
      {communities.map((data) => (
        <CommunityIcon {...data} key={data.logoUrl} />
      ))}
    </div>
  );
};
