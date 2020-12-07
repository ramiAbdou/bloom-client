import deepequal from 'fast-deep-equal';
import React from 'react';

import Button from '@components/Button/Button';
import { ModalType } from '@constants';
import { useStoreActions } from '@store/Store';
import { makeClass } from '@util/util';
import ExpandedCard from './ExpandedCard';
import MemberCard from './MemberCard.store';

const ProfilePicture = () => {
  const { pictureUrl, firstName, lastName } = MemberCard.useStoreState(
    (store) => store.member,
    deepequal
  );

  const initials = firstName[0] + lastName[0];

  if (!pictureUrl)
    return (
      <div>
        <h1>{initials}</h1>
      </div>
    );
  return <img src={pictureUrl} />;
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
          <h3>{`${firstName} ${lastName}`}</h3>
          <p>{highlightedField ?? ''}</p>
        </div>
      </Button>

      <ExpandedCard id={`${ModalType.DIRECTORY_CARD}-${id}`} />
    </>
  );
};
