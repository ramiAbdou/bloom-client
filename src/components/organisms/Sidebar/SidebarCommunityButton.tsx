import React from 'react';
import { useHistory } from 'react-router-dom';

import { ICommunity } from '@core/db/db.entities';
import { useStoreState } from '@core/store/Store';
import useFindOneFull from '@gql/hooks/useFindOneFull';
import { IdProps } from '@util/constants';
import { cx } from '@util/util';

const SidebarCommunityButton: React.FC<IdProps> = ({ id: communityId }) => {
  const authenticatedCommunityId: string = useStoreState(
    ({ db }) => db.communityId
  );

  const { push } = useHistory();

  const { data: community, loading } = useFindOneFull(ICommunity, {
    fields: ['logoUrl', 'urlName'],
    where: { id: communityId }
  });

  if (loading) return null;

  const onClick = () => {
    if (communityId !== authenticatedCommunityId) {
      push(`/${community.urlName}`);
    }
  };

  const css: string = cx('br-xs h-xl mb-sm p-2 w-xl o-nav-community', {
    'o-nav-community--active': communityId === authenticatedCommunityId
  });

  return (
    <button className={css} type="button" onClick={onClick}>
      <img
        alt="Community Logo"
        className="br-xxs h-100 w-100"
        src={community.logoUrl}
      />
    </button>
  );
};

export default SidebarCommunityButton;
