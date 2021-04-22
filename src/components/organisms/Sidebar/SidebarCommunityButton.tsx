import React from 'react';
import { useHistory } from 'react-router-dom';
import { communityIdVar } from 'src/App.reactive';

import { gql, useReactiveVar } from '@apollo/client';
import { ICommunity } from '@core/db/db.entities';
import { ComponentWithFragments } from '@util/constants';
import { cx } from '@util/util';
import SidebarCommunityButtonLogo from './SidebarCommunityButtonLogo';

const SidebarCommunityButton: ComponentWithFragments<ICommunity> = ({
  data: community
}) => {
  const communityId: string = useReactiveVar(communityIdVar);

  const { push } = useHistory();

  const onClick = (): void => {
    if (community.id !== communityId) {
      push(`/${community.urlName}`);
    }
  };

  const css: string = cx('br-xs h-xl mb-sm p-2 w-xl o-nav-community', {
    'o-nav-community--active': community.id === communityId
  });

  return (
    <button className={css} type="button" onClick={onClick}>
      <SidebarCommunityButtonLogo data={community} />
    </button>
  );
};

SidebarCommunityButton.fragments = {
  data: gql`
    fragment SidebarCommunityButtonFragment on communities {
      id
      urlName
      ...SidebarCommunityButtonLogoFragment
    }
    ${SidebarCommunityButtonLogo.fragments.data}
  `
};

export default SidebarCommunityButton;
