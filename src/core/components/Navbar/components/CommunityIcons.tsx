/**
 * @fileoverview Component: CommunityIcons
 * @author Rami Abdou
 */

import React from 'react';

import { useStoreState } from '@store/Store';
import CSSModifier from '@util/CSSModifier';

type CommunityIconProps = { isActive: boolean; communityId: string };

const CommunityIcon = ({ isActive, communityId }: CommunityIconProps) => {
  const logoUrl = useStoreState(
    ({ communities }) => communities.byId[communityId].logoUrl
  );

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
  const activeId = useStoreState(({ communities }) => communities.activeId);
  const communityIds = useStoreState(({ communities }) => communities.allIds);

  return (
    <div className="c-nav-community-ctr">
      {communityIds.map((communityId: string) => (
        <CommunityIcon
          key={communityId}
          communityId={communityId}
          isActive={activeId === communityId}
        />
      ))}
    </div>
  );
};
