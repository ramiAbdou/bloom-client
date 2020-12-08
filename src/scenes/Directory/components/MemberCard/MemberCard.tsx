import deepequal from 'fast-deep-equal';
import { RenderComponentProps } from 'masonic';
import React from 'react';

import Button from '@components/Button/Button';
import { ModalType } from '@constants';
import { useStoreActions } from '@store/Store';
import { makeClass } from '@util/util';
import ExpandedMemberCard from '../ExpandedMemberCard/ExpandedMemberCard';
import MemberCard, { MemberCardData } from './MemberCard.store';

const ProfilePicture = () => {
  const { pictureUrl, firstName, lastName } = MemberCard.useStoreState(
    (store) => store.member,
    deepequal
  );

  pictureUrl =
    'https://pbs.twimg.com/profile_images/1303060784289730560/femQ8Zek_400x400.jpg';

  const initials = firstName[0] + lastName[0];

  return (
    <div>
      {!pictureUrl && <h1>{initials}</h1>}
      {pictureUrl && <img src={pictureUrl} />}
    </div>
  );
};

const MemberCardContent = () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const {
    highlightedValue,
    firstName,
    id,
    lastName
  } = MemberCard.useStoreState((store) => store.member, deepequal);

  const onClick = () => showModal(`${ModalType.DIRECTORY_CARD}-${id}`);

  const css = makeClass([
    's-directory-card',
    [!highlightedValue, 's-directory-card--empty']
  ]);

  return (
    <>
      <Button className={css} onClick={onClick}>
        <ProfilePicture />

        <div className="s-directory-card-content">
          <p>
            {`${firstName} ${lastName}`} <span>{highlightedValue ?? ''}</span>
          </p>
        </div>
      </Button>

      <ExpandedMemberCard id={`${ModalType.DIRECTORY_CARD}-${id}`} />
    </>
  );
};

export default ({ data }: RenderComponentProps<MemberCardData>) => (
  <MemberCard.Provider runtimeModel={{ member: data }}>
    <MemberCardContent />
  </MemberCard.Provider>
);
