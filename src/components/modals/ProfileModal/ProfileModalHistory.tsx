import React from 'react';
import { memberIdVar } from 'src/App.reactive';

import { gql, useReactiveVar } from '@apollo/client';
import Separator from '@components/atoms/Separator';
import LoadingHeader from '@components/containers/LoadingHeader/LoadingHeader';
import { modalVar } from '@core/state/Modal.reactive';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';
import ProfileModalHistoryEventList from './ProfileModalHistoryEventList';

const ProfileModalHistory: ComponentWithFragments<IMember> = ({
  data: member
}) => {
  const memberId: string = useReactiveVar(modalVar)?.metadata as string;
  const authenticatedMemberId: string = useReactiveVar(memberIdVar);
  const isMyProfile: boolean = memberId === authenticatedMemberId;

  if (!isMyProfile && !member.role) return null;

  return (
    <>
      <Separator margin={0} />

      <div className="my-md">
        <LoadingHeader h2 className="mb-sm--nlc" title="History" />
        <ProfileModalHistoryEventList data={member} />
      </div>
    </>
  );
};

ProfileModalHistory.fragment = gql`
  fragment ProfileModalHistoryFragment on members {
    ...ProfileModalHistoryEventListFragment
  }
  ${ProfileModalHistoryEventList.fragment}
`;

export default ProfileModalHistory;
