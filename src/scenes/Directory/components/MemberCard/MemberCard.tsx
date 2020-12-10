import deepequal from 'fast-deep-equal';
import { RenderComponentProps } from 'masonic';
import React from 'react';

import Button from '@components/Button/Button';
import { ModalType } from '@constants';
import { useStoreActions } from '@store/Store';
import { makeClass } from '@util/util';
import MemberModal from '../MemberModal/MemberModal';
import MemberCard, { MemberCardData } from './MemberCard.store';

const ProfilePicture = () => {
  const { pictureUrl, firstName, lastName } = MemberCard.useStoreState(
    (store) => store.member,
    deepequal
  );

  const initials = firstName && lastName ? `${firstName[0]}${lastName[0]}` : '';

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

      <MemberModal id={`${ModalType.DIRECTORY_CARD}-${id}`} />
    </>
  );
};

export default ({ data }: RenderComponentProps<MemberCardData>) => (
  <MemberCard.Provider runtimeModel={{ member: data }}>
    <MemberCardContent />
  </MemberCard.Provider>
);
