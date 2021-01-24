import React from 'react';

import { ModalType } from '@constants';
import Modal from '@organisms/Modal/Modal';
import MemberProfileStore, { MemberProfileModel } from './MemberProfile.store';
import MemberProfileData from './MemberProfileData';
import MemberProfilePersonal from './MemberProfilePersonal';

const MemberProfile: React.FC<MemberProfileModel> = ({ memberId, userId }) => (
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

export default MemberProfile;
