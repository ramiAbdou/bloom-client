import React from 'react';

import HeaderTag from '@atoms/Tag/HeaderTag';
import Card from '@containers/Card/Card';
import ProfilePicture from '@molecules/ProfilePicture/ProfilePicture';
import {
  IMember,
  IMemberPlan,
  IMemberValue,
  IQuestion
} from '@store/Db/entities';
import IdStore from '@store/Id.store';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType, QuestionCategory } from '@util/constants';

const DirectoryCardInformation: React.FC = () => {
  const memberId: string = IdStore.useStoreState(({ id }) => {
    return id;
  });

  const fullName: string = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];
    return `${member?.firstName} ${member?.lastName}`;
  });

  const highlightedValue = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];

    const highlightedQuestion: IQuestion =
      db.byQuestionId[db.community?.highlightedQuestion];

    if (highlightedQuestion.category === QuestionCategory.MEMBER_PLAN) {
      const memberPlan: IMemberPlan = db.byMemberPlanId[member.plan];
      return memberPlan.name;
    }

    return member.values
      ?.map((valueId: string) => {
        return db.byValuesId[valueId];
      })
      ?.find((data: IMemberValue) => {
        return data?.question === db.community?.highlightedQuestion;
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
  const memberId: string = IdStore.useStoreState(({ id }) => {
    return id;
  });

  return <ProfilePicture circle={false} fontSize={60} memberId={memberId} />;
};

const DirectoryCardContent: React.FC = () => {
  const showModal = useStoreActions(({ modal }) => {
    return modal.showModal;
  });

  const memberId: string = IdStore.useStoreState(({ id }) => {
    return id;
  });

  const role = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];
    return member?.role;
  });

  const onClick = () => {
    showModal({ id: ModalType.PROFILE, metadata: memberId });
  };

  return (
    <Card noPadding className="s-directory-card" onClick={onClick}>
      <HeaderTag show={!!role}>{role}</HeaderTag>
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
