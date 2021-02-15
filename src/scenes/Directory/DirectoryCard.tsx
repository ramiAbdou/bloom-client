import React from 'react';

import HeaderTag from '@atoms/Tag/HeaderTag';
import { ModalType } from '@constants';
import Card from '@containers/Card/Card';
import ProfilePicture from '@molecules/ProfilePicture/ProfilePicture';
import {
  IMember,
  IMemberData,
  IMemberType,
  IQuestion,
  IUser
} from '@store/Db/entities';
import IdStore from '@store/Id.store';
import { useStoreActions, useStoreState } from '@store/Store';

const DirectoryCardInformation: React.FC = () => {
  const memberId: string = IdStore.useStoreState(({ id }) => id);

  const fullName: string = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];
    const user: IUser = db.byUserId[member?.user];

    return `${user?.firstName} ${user?.lastName}`;
  });

  const highlightedValue = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];

    return member.data
      ?.map((dataId: string) => db.byDataId[dataId])
      ?.find((data: IMemberData) => {
        const question: IQuestion = db.byQuestionId[data?.question];
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

  const userId: string = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];
    return member?.user;
  });

  return <ProfilePicture circle={false} fontSize={60} userId={userId} />;
};

const DirectoryCardContent: React.FC = () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const memberId: string = IdStore.useStoreState(({ id }) => id);

  const role = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];
    return member?.role;
  });

  const isLifetime: boolean = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];
    const type: IMemberType = db.byTypeId[member?.type];
    return type?.recurrence === 'LIFETIME';
  });

  const onClick = () => {
    showModal({ id: ModalType.MEMBER_PROFILE, metadata: memberId });
  };

  return (
    <Card noPadding className="s-directory-card" onClick={onClick}>
      {role && <HeaderTag>{role}</HeaderTag>}
      {!role && isLifetime && <HeaderTag>Lifetime</HeaderTag>}
      <DirectoryCardPicture />
      <DirectoryCardInformation />
    </Card>
  );
};

const DirectoryCard: React.FC<any> = ({ data }) => {
  return (
    <IdStore.Provider runtimeModel={{ id: data?.memberId }}>
      <DirectoryCardContent />
    </IdStore.Provider>
  );
};

export default DirectoryCard;
