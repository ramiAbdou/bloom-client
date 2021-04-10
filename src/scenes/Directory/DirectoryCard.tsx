import React from 'react';

import HeaderTag from '@components/atoms/Tag/HeaderTag';
import Card from '@components/containers/Card/Card';
import { IMember } from '@db/db.entities';
import useFindOne from '@gql/hooks/useFindOne';
import ProfilePicture from '@components/molecules/ProfilePicture/ProfilePicture';
import IdStore from '@store/Id.store';
import { useStoreActions } from '@store/Store';
import { ModalType } from '@util/constants';

const DirectoryCardInformationFullName: React.FC = () => {
  const memberId: string = IdStore.useStoreState(({ id }) => id);

  const { firstName, lastName }: IMember = useFindOne(IMember, {
    fields: ['firstName', 'lastName'],
    where: { id: memberId }
  });

  const fullName: string =
    firstName && lastName ? `${firstName} ${lastName}` : '';

  return (
    <span className="body--bold d-block mb-xxs ta-center">{fullName}</span>
  );
};

const DirectoryCardInformationPosition: React.FC = () => {
  const memberId: string = IdStore.useStoreState(({ id }) => id);

  const { position }: IMember = useFindOne(IMember, {
    fields: ['position'],
    where: { id: memberId }
  });

  if (!position) return null;

  return (
    <span className="body--bold c-primary d-block fs-13 mb-xxs ta-center">
      {position}
    </span>
  );
};

// const DirectoryCardInformationHighlightedValue: React.FC = () => {
//   const memberId: string = IdStore.useStoreState(({ id }) => id);

// const highlightedValue = useStoreState(({ db }) => {
//   const member: IMember = db.byMemberId[memberId];

//   const highlightedQuestion: IQuestion =
//     db.byQuestionId[db.community?.highlightedQuestion];

//   if (highlightedQuestion.category === QuestionCategory.MEMBER_TYPE) {
//     const memberType: IMemberType = db.byMemberTypeId[member.memberType];
//     return memberType.name;
//   }

//   return member.memberValues
//     ?.map((memberValueId: string) => db.byMemberValuesId[memberValueId])
//     ?.find(
//       (data: IMemberValue) =>
//         data?.question === db.community?.highlightedQuestion
//     )?.value;
// });

// return (
//   <span className="c-gray-2 d-block meta ta-center">
//     {highlightedValue ?? ''}
//   </span>
// );
// };

const DirectoryCardInformation: React.FC = () => (
  <div className="s-directory-card-content">
    <p>
      <DirectoryCardInformationFullName />
      <DirectoryCardInformationPosition />
      {/* <DirectoryCardInformationHighlightedValue /> */}
    </p>
  </div>
);

const DirectoryCardPicture: React.FC = () => {
  const memberId: string = IdStore.useStoreState(({ id }) => id);
  return <ProfilePicture circle={false} fontSize={60} memberId={memberId} />;
};

const DirectoryCardRole: React.FC = () => {
  const memberId: string = IdStore.useStoreState(({ id }) => id);

  const { role }: IMember = useFindOne(IMember, {
    fields: ['role'],
    where: { id: memberId }
  });

  return <HeaderTag show={!!role}>{role}</HeaderTag>;
};

const DirectoryCardContent: React.FC = () => {
  const memberId: string = IdStore.useStoreState(({ id }) => id);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const onClick = (): void => {
    showModal({ id: ModalType.PROFILE, metadata: memberId });
  };

  return (
    <Card noPadding className="s-directory-card" onClick={onClick}>
      <DirectoryCardRole />
      <DirectoryCardPicture />
      <DirectoryCardInformation />
    </Card>
  );
};

const DirectoryCard: React.FC<any> = ({ data }) => (
  <IdStore.Provider runtimeModel={{ id: data.id }}>
    <DirectoryCardContent />
  </IdStore.Provider>
);

export default DirectoryCard;
