import React from 'react';
import { useHistory } from 'react-router-dom';

import { ICommunity, IMember } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { IdProps } from '@util/constants';
import { cx, sortObjects } from '@util/util';

const SideBarCommunityIcon: React.FC<IdProps> = ({ id: memberId }) => {
  const communityId = useStoreState(({ db }) => db.community.id);

  const { id, logoUrl, urlName } = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];
    return db.byCommunityId[member.community] ?? {};
  }) as ICommunity;

  const { push } = useHistory();

  const isActive: boolean = id === communityId;

  const onClick = () => {
    if (!isActive) push(`/${urlName}`);
  };

  const css: string = cx('o-nav-community', {
    'o-nav-community--active': isActive
  });

  return (
    <button className={css} type="button" onClick={onClick}>
      <img src={logoUrl} />
    </button>
  );
};

const SideBarCommunityList: React.FC = () => {
  const memberIds: string[] = useStoreState(({ db }) => {
    return db.user?.members
      ?.map((memberId: string) => db.byMemberId[memberId])
      ?.sort((a, b) => sortObjects(a, b, 'joinedAt', 'ASC'))
      ?.map((member: IMember) => member.id);
  });

  return (
    <div className="o-nav-community-ctr">
      {memberIds?.map((id: string) => (
        <SideBarCommunityIcon key={id} id={id} />
      ))}
    </div>
  );
};

export default SideBarCommunityList;
