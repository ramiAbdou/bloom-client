import React from 'react';
import { useHistory } from 'react-router-dom';

import { ICommunity } from '@db/db.entities';
import useFindOne from '@gql/hooks/useFindOne';
import { useStoreState } from '@store/Store';
import { IdProps } from '@util/constants';
import { cx } from '@util/util';

const SidebarCommunityButton: React.FC<IdProps> = ({ id: communityId }) => {
  const authenticatedCommunityId: string = useStoreState(
    ({ db }) => db.communityId
  );

  const { logoUrl, urlName } = useFindOne(ICommunity, {
    fields: ['logoUrl', 'urlName'],
    where: { id: communityId }
  });

  const { push } = useHistory();

  const onClick = () => {
    if (communityId !== authenticatedCommunityId) {
      push(`/${urlName}`);
    }
  };

  const css: string = cx('br-xs h-xl mb-sm p-2 w-xl o-nav-community', {
    'o-nav-community--active': communityId === authenticatedCommunityId
  });

  return (
    <button className={css} type="button" onClick={onClick}>
      <img alt="Community Logo" className="br-xxs h-100 w-100" src={logoUrl} />
    </button>
  );
};

export default SidebarCommunityButton;
