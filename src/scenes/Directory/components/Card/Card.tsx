import deepequal from 'fast-deep-equal';
import { RenderComponentProps } from 'masonic';
import React from 'react';

import Button from '@components/Button/Button';
import ProfilePicture from '@components/Misc/ProfilePicture';
import { ModalType } from '@constants';
import { useStoreActions } from '@store/Store';
import { makeClass } from '@util/util';
import MemberModal from '../Modal/Modal';
import MemberCard, { MemberCardData } from './Card.store';

const MemberCardContent = () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const {
    highlightedValue,
    firstName,
    id,
    lastName,
    pictureUrl
  } = MemberCard.useStoreState((store) => store.member, deepequal);

  const onClick = () => showModal(`${ModalType.DIRECTORY_CARD}-${id}`);

  const css = makeClass([
    's-directory-card',
    [!highlightedValue, 's-directory-card--empty']
  ]);

  return (
    <>
      <Button className={css} onClick={onClick}>
        <ProfilePicture
          firstName={firstName}
          fontSize={60}
          lastName={lastName}
          pictureUrl={pictureUrl}
        />

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
