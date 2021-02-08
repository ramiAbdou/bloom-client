import React from 'react';

import { ModalType } from '@constants';
import Show from '@containers/Show';
import useQuery from '@hooks/useQuery';
import Modal from '@organisms/Modal/Modal';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { GET_MEMBER_PROFILE, GetMemberProfileArgs } from './MemberProfile.gql';
import MemberProfileStore, { MemberProfileModel } from './MemberProfile.store';
import MemberProfileData from './MemberProfileData';
import MemberProfileHistory from './MemberProfileHistory';
import MemberProfilePersonal from './MemberProfilePersonal';

const MemberProfileContent: React.FC<Pick<MemberProfileModel, 'memberId'>> = ({
  memberId
}) => {
  const { data, error, loading } = useQuery<IMember, GetMemberProfileArgs>({
    name: 'getMemberProfile',
    query: GET_MEMBER_PROFILE,
    schema: Schema.MEMBER,
    variables: { memberId }
  });

  return (
    <Show show={!loading && !error}>
      <MemberProfileStore.Provider
        // @ts-ignore b/c user is populated.
        runtimeModel={{ memberId, userId: data?.user?.id }}
      >
        <MemberProfilePersonal />
        <MemberProfileData />
        <MemberProfileHistory />
      </MemberProfileStore.Provider>
    </Show>
  );
};

const MemberProfile: React.FC<Pick<MemberProfileModel, 'memberId'>> = ({
  memberId
}) => {
  return (
    <Modal
      className="mo-member-profile"
      id={`${ModalType.MEMBER_PROFILE}-${memberId}`}
      show={!!memberId}
    >
      <MemberProfileContent memberId={memberId} />
    </Modal>
  );
};

export default MemberProfile;
