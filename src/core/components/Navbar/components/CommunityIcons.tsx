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
  const { activeId, allIds, byId } = useStoreState(
    (store) => store.communities
  );

  return (
    <div className="c-nav-community-ctr">
      {allIds?.map((communityId: string) => (
        <CommunityIcon
          key={communityId}
          isActive={activeId === communityId}
          logoUrl={byId[communityId]?.logoUrl}
        />
      ))}
    </div>
  );
};
