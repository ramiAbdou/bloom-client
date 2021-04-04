import React from 'react';
import { useHistory } from 'react-router-dom';

import { ICommunity, IMember } from '@db/db.entities';
import { useStoreState } from '@store/Store';
import { IdProps } from '@util/constants';
import { cx } from '@util/util';

const SidebarCommunityButton: React.FC<IdProps> = ({ id: memberId }) => {
  const communityId: string = useStoreState(({ db }) => db.community.id);

  const { id, logoUrl, urlName }: ICommunity = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];
    return db.byCommunityId[member.community] ?? {};
  }) as ICommunity;

  const { push } = useHistory();

  const onClick = () => {
    if (id !== communityId) push(`/${urlName}`);
  };

  const css: string = cx('br-xs h-xl mb-sm p-2 w-xl o-nav-community', {
    'o-nav-community--active': id === communityId
  });

  return (
    <button className={css} type="button" onClick={onClick}>
      <img alt="Community Logo" className="br-xxs h-100 w-100" src={logoUrl} />
    </button>
  );
};

export default SidebarCommunityButton;
