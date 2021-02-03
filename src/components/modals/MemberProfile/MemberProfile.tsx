import React from 'react';

import { ModalType } from '@constants';
import Modal from '@organisms/Modal/Modal';
import { useStoreState } from '@store/Store';
import MemberProfileStore, { MemberProfileModel } from './MemberProfile.store';
import MemberProfileData from './MemberProfileData';
import MemberProfilePersonal from './MemberProfilePersonal';

const MemberProfile: React.FC<MemberProfileModel> = ({ memberId, userId }) => {
  const doesMemberExist: boolean = useStoreState(({ db }) => {
    const { byId: byMemberId } = db.entities.members;
    const { byId: byUserId } = db.entities.users;

    return !!byMemberId[memberId] && !!byUserId[userId];
  });

  if (!doesMemberExist) return null;

  return (
    <Modal
      className="mo-member-profile"
      id={`${ModalType.MEMBER_PROFILE}-${memberId}`}
    >
      <MemberProfileStore.Provider runtimeModel={{ memberId, userId }}>
        <MemberProfilePersonal />
        <MemberProfileData />
      </MemberProfileStore.Provider>
    </Modal>
  );
};

export default MemberProfile;
