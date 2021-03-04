import React from 'react';
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter
} from 'react-icons/io5';

import Button from '@atoms/Button/Button';
import Card from '@containers/Card/Card';
import Row from '@containers/Row/Row';
import Show from '@containers/Show';
import useQuery from '@hooks/useQuery';
import { IUser } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType } from '@util/constants';
import { cx } from '@util/util';
import ProfileCardHeader from './ProfileCardHeader';

const ProfileSocialOnboardingContainer: React.FC = () => {
  const isSocialLinked: boolean = useStoreState(({ db }) => {
    const {
      clubhouseUrl,
      facebookUrl,
      instagramUrl,
      linkedInUrl,
      twitterUrl
    } = db.socials;

    return (
      !!clubhouseUrl ||
      !!facebookUrl ||
      !!instagramUrl ||
      !!linkedInUrl ||
      !!twitterUrl
    );
  });

  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const onClick = () => showModal({ id: ModalType.EDIT_SOCIAL_MEDIA });

  return (
    <Show show={!isSocialLinked}>
      <p className="mb-sm">
        Strengthen your relationships with other community members by adding
        your social profiles!
      </p>

      <Button primary onClick={onClick}>
        + Link Social Media
      </Button>
    </Show>
  );
};

interface ProfileSocialMediaValueProps {
  brand: 'CLUBHOUSE' | 'FACEBOOK' | 'INSTAGRAM' | 'LINKED_IN' | 'TWITTER';
  url: string;
}

const ProfileSocialMediaValue: React.FC<ProfileSocialMediaValueProps> = ({
  brand,
  url
}) => {
  if (!url) return null;

  const isClubhouse = brand === 'CLUBHOUSE';
  const isFacebook = brand === 'FACEBOOK';
  const isInstagram = brand === 'INSTAGRAM';
  const isLinkedIn = brand === 'LINKED_IN';
  const isTwitter = brand === 'TWITTER';

  const css = cx('s-profile-card--social-logo', {
    's-profile-card--social-logo--clubhouse': isClubhouse,
    's-profile-card--social-logo--facebook': isFacebook,
    's-profile-card--social-logo--linkedin': isLinkedIn,
    's-profile-card--social-logo--twitter': isTwitter
  });

  return (
    <Row className={css} spacing="xs">
      {isFacebook && <IoLogoFacebook />}
      {isInstagram && <IoLogoInstagram />}
      {isLinkedIn && <IoLogoLinkedin />}
      {isTwitter && <IoLogoTwitter />}
      <p>{url}</p>
    </Row>
  );
};

const ProfileSocialCard: React.FC = () => {
  const clubhouseUrl = useStoreState(({ db }) => db.socials.clubhouseUrl);
  const facebookUrl = useStoreState(({ db }) => db.socials.facebookUrl);
  const instagramUrl = useStoreState(({ db }) => db.socials.instagramUrl);
  const linkedInUrl = useStoreState(({ db }) => db.socials.linkedInUrl);
  const twitterUrl = useStoreState(({ db }) => db.socials.twitterUrl);

  const { loading } = useQuery<IUser>({
    fields: [
      'clubhouseUrl',
      'facebookUrl',
      'instagramUrl',
      'id',
      'linkedInUrl',
      'twitterUrl'
    ],
    operation: 'getUser',
    schema: Schema.USER
  });

  const isSocialLinked: boolean =
    !!clubhouseUrl ||
    !!facebookUrl ||
    !!instagramUrl ||
    !!linkedInUrl ||
    !!twitterUrl;

  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const onClick = () => showModal({ id: ModalType.EDIT_SOCIAL_MEDIA });

  return (
    <Card className="s-profile-card--social" loading={loading}>
      <ProfileCardHeader
        canEdit={isSocialLinked}
        title="Social Media"
        onEditClick={onClick}
      />

      <div>
        <ProfileSocialMediaValue brand="CLUBHOUSE" url={clubhouseUrl} />
        <ProfileSocialMediaValue brand="TWITTER" url={twitterUrl} />
        <ProfileSocialMediaValue brand="LINKED_IN" url={linkedInUrl} />
        <ProfileSocialMediaValue brand="FACEBOOK" url={facebookUrl} />
        <ProfileSocialMediaValue brand="INSTAGRAM" url={instagramUrl} />
      </div>

      <ProfileSocialOnboardingContainer />
    </Card>
  );
};

export default ProfileSocialCard;
