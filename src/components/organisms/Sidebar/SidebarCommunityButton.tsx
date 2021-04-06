import React from 'react';
import { useHistory } from 'react-router-dom';

import { IMember } from '@db/db.entities';
import useFindOne from '@gql/useFindOne';
import { useStoreState } from '@store/Store';
import { IdProps } from '@util/constants';
import { cx } from '@util/util';

const SidebarCommunityButton: React.FC<IdProps> = ({ id: memberId }) => {
  const communityId: string = useStoreState(({ db }) => db.community.id);

  const { community } = useFindOne(IMember, {
    fields: ['community.id', 'community.logoUrl', 'community.urlName'],
    where: { id: memberId }
  });

  const { push } = useHistory();

  const onClick = () => {
    if (community.id !== communityId) push(`/${community.urlName}`);
  };

  const css: string = cx('br-xs h-xl mb-sm p-2 w-xl o-nav-community', {
    'o-nav-community--active': community.id === communityId
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
