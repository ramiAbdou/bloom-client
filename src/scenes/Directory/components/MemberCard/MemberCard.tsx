import deepequal from 'fast-deep-equal';
import React from 'react';

import Button from '@components/Button/Button';
import { ModalType } from '@constants';
import { useStoreActions } from '@store/Store';
import { makeClass } from '@util/util';
import ExpandedMemberCard from '../ExpandedMemberCard/ExpandedMemberCard';
import MemberCard from './MemberCard.store';

const ProfilePicture = () => {
  const { pictureUrl, firstName, lastName } = MemberCard.useStoreState(
    (store) => store.member,
    deepequal
  );

  const initials = firstName[0] + lastName[0];

  return (
    <div>
      {!pictureUrl && <h1>{initials}</h1>}
      {pictureUrl && <img src={pictureUrl} />}
    </div>
  );
};

export default () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const {
    highlightedField,
    firstName,
    id,
    lastName
  } = MemberCard.useStoreState((store) => store.member, deepequal);

  const onClick = () => showModal(`${ModalType.DIRECTORY_CARD}-${id}`);

  const css = makeClass([
    's-directory-card',
    [!highlightedField, 's-directory-card--empty']
  ]);

  return (
    <>
      <Button className={css} onClick={onClick}>
        <ProfilePicture />

        <div className="s-directory-card-content">
          <p>
            {`${firstName} ${lastName}`} <span>{highlightedField ?? ''}</span>
          </p>
        </div>
      </Button>

      <ExpandedMemberCard id={`${ModalType.DIRECTORY_CARD}-${id}`} />
    </>
  );
};
