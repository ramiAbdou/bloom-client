import React from 'react';
import { useHistory } from 'react-router-dom';

import { IdProps } from '@constants';
import useMutation from '@hooks/useMutation';
import { ICommunity, IMember } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { cx, sortObjects } from '@util/util';
import useLoader from '../Loader/useLoader';

const SideBarCommunityIcon: React.FC<IdProps> = ({ id: memberId }) => {
  const communityId = useStoreState(({ db }) => db.community.id);

  const { id, logoUrl, urlName } = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];
    return db.byCommunityId[member.community] ?? {};
  }) as ICommunity;

  const [switchMember, { loading }] = useMutation<boolean>({
    operation: 'switchMember',
    types: { memberId: { required: true } },
    variables: { memberId }
  });

  const { push } = useHistory();

  const isActive: boolean = id === communityId;

  const onClick = async () => {
    if (!isActive) {
      await switchMember();
      push(`/${urlName}`);
    }
  };

  useLoader(loading);

  const css = cx('o-nav-community', {
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
    return db.user.members
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
