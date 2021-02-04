import React from 'react';

import { ModalType } from '@constants';
import Card from '@containers/Card/Card';
import MemberProfileModal from '@modals/MemberProfile/MemberProfile';
import ProfilePicture from '@molecules/ProfilePicture/ProfilePicture';
import { IMember, IMemberData, IQuestion, IUser } from '@store/Db/entities';
import IdStore from '@store/Id.store';
import { useStoreActions, useStoreState } from '@store/Store';

const DirectoryCardInformation: React.FC = () => {
  const memberId: string = IdStore.useStoreState(({ id }) => id);

  const fullName: string = useStoreState(({ db }) => {
    const { byId: byMemberId } = db.entities.members;
    const { byId: byUserId } = db.entities.users;

    const member: IMember = byMemberId[memberId];
    const user: IUser = byUserId[member?.user];

    return `${user?.firstName} ${user?.lastName}`;
  });

  const highlightedValue = useStoreState(({ db }) => {
    const { byId: byDataId } = db.entities.data;
    const { byId: byMemberId } = db.entities.members;
    const { byId: byQuestionId } = db.entities.questions;

    const member: IMember = byMemberId[memberId];

    return member.data
      ?.map((dataId: string) => byDataId[dataId])
      ?.find((data: IMemberData) => {
        const question: IQuestion = byQuestionId[data?.question];
        return !!question?.inDirectoryCard;
      })?.value;
  });

  return (
    <div className="s-directory-card-content">
      <p>
        {fullName} <span>{highlightedValue ?? ''}</span>
      </p>
    </div>
  );
};

const DirectoryCardPicture: React.FC = () => {
  const memberId: string = IdStore.useStoreState(({ id }) => id);

  const user: IUser = useStoreState(({ db }) => {
    const { byId: byMemberId } = db.entities.members;
    const { byId: byUserId } = db.entities.users;
    const member: IMember = byMemberId[memberId];
    return byUserId[member?.user];
  });

  return (
    <ProfilePicture
      firstName={user?.firstName}
      fontSize={60}
      href={user?.pictureUrl}
      lastName={user?.lastName}
    />
  );
};

const DirectoryCardContent: React.FC = () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const memberId: string = IdStore.useStoreState(({ id }) => id);
  const onClick = () => showModal(`${ModalType.MEMBER_PROFILE}-${memberId}`);

  return (
    <Card noPadding className="s-directory-card" onClick={onClick}>
      <DirectoryCardPicture />
      <DirectoryCardInformation />
    </Card>
  );
};

const DirectoryCard: React.FC<any> = ({ data }) => {
  return (
    <IdStore.Provider runtimeModel={{ id: data?.memberId }}>
      <DirectoryCardContent />
      <MemberProfileModal memberId={data?.memberId} />
    </IdStore.Provider>
  );
};

export default DirectoryCard;
