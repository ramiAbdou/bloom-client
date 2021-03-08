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
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType, SocialBrand } from '@util/constants';
import { cx } from '@util/util';
import ProfileCardHeader from './ProfileCardHeader';
import useInitProfileSocial from './useInitProfileSocial';

const ProfileSocialOnboardingContainer: React.FC = () => {
  const isSocialLinked: boolean = useStoreState(({ db }) => {
    const { clubhouseUrl, facebookUrl, instagramUrl, linkedInUrl, twitterUrl } =
      db.socials ?? {};

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
  brand: SocialBrand;
  url: string;
}

const ProfileSocialMediaValue: React.FC<ProfileSocialMediaValueProps> = ({
  brand,
  url
}) => {
  if (!url) return null;

  const isClubhouse = brand === SocialBrand.CLUBHOUSE;
  const isFacebook = brand === SocialBrand.FACEBOOK;
  const isInstagram = brand === SocialBrand.INSTAGRAM;
  const isLinkedIn = brand === SocialBrand.LINKED_IN;
  const isTwitter = brand === SocialBrand.TWITTER;

  const css = cx('s-profile-card--social-logo', {
    's-profile-card--social-logo--clubhouse': isClubhouse,
    's-profile-card--social-logo--facebook': isFacebook,
    's-profile-card--social-logo--linkedin': isLinkedIn,
    's-profile-card--social-logo--twitter': isTwitter
  });

  return (
    <Row className={css} spacing="xs">
      {isLinkedIn && <IoLogoLinkedin />}
      {isTwitter && <IoLogoTwitter />}
      {isFacebook && <IoLogoFacebook />}
      {isInstagram && <IoLogoInstagram />}
      <p>{url}</p>
    </Row>
  );
};

const ProfileSocialCard: React.FC = React.memo(() => {
  const clubhouseUrl = useStoreState(({ db }) => db.socials?.clubhouseUrl);
  const facebookUrl = useStoreState(({ db }) => db.socials?.facebookUrl);
  const instagramUrl = useStoreState(({ db }) => db.socials?.instagramUrl);
  const linkedInUrl = useStoreState(({ db }) => db.socials?.linkedInUrl);
  const twitterUrl = useStoreState(({ db }) => db.socials?.twitterUrl);

  const { loading } = useInitProfileSocial();

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
        <ProfileSocialMediaValue
          brand={SocialBrand.LINKED_IN}
          url={linkedInUrl}
        />

        <ProfileSocialMediaValue brand={SocialBrand.TWITTER} url={twitterUrl} />

        <ProfileSocialMediaValue
          brand={SocialBrand.FACEBOOK}
          url={facebookUrl}
        />

        <ProfileSocialMediaValue
          brand={SocialBrand.CLUBHOUSE}
          url={clubhouseUrl}
        />

        <ProfileSocialMediaValue
          brand={SocialBrand.INSTAGRAM}
          url={instagramUrl}
        />
      </div>

      <ProfileSocialOnboardingContainer />
    </Card>
  );
});

export default ProfileSocialCard;
