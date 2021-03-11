import React from 'react';

import Button from '@atoms/Button/Button';
import Card from '@containers/Card/Card';
import Show from '@containers/Show';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType, SocialBrand } from '@util/constants';
import ProfileCardHeader from './ProfileCardHeader';
import ProfileSocialValue from './ProfileSocialValue';
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
      <p className="mb-sm--nlc">
        Strengthen your relationships with other community members by adding
        your social profiles!
      </p>

      <Button primary onClick={onClick}>
        + Link Social Media
      </Button>
    </Show>
  );
};

const ProfileSocialHeader: React.FC = () => {
  const clubhouseUrl = useStoreState(({ db }) => db.socials?.clubhouseUrl);
  const facebookUrl = useStoreState(({ db }) => db.socials?.facebookUrl);
  const instagramUrl = useStoreState(({ db }) => db.socials?.instagramUrl);
  const linkedInUrl = useStoreState(({ db }) => db.socials?.linkedInUrl);
  const twitterUrl = useStoreState(({ db }) => db.socials?.twitterUrl);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const isSocialLinked: boolean =
    !!clubhouseUrl ||
    !!facebookUrl ||
    !!instagramUrl ||
    !!linkedInUrl ||
    !!twitterUrl;

  const onClick = () => showModal({ id: ModalType.EDIT_SOCIAL_MEDIA });

  return (
    <ProfileCardHeader
      canEdit={isSocialLinked}
      title="Social Media"
      onEditClick={onClick}
    />
  );
};

const ProfileSocialClubhouse: React.FC = () => {
  const clubhouseUrl = useStoreState(({ db }) => db.socials?.clubhouseUrl);

  return (
    <ProfileSocialValue brand={SocialBrand.CLUBHOUSE} url={clubhouseUrl} />
  );
};

const ProfileSocialFacebook: React.FC = () => {
  const facebookUrl = useStoreState(({ db }) => db.socials?.facebookUrl);
  return <ProfileSocialValue brand={SocialBrand.FACEBOOK} url={facebookUrl} />;
};

const ProfileSocialInstagram: React.FC = () => {
  const instagramUrl = useStoreState(({ db }) => db.socials?.instagramUrl);

  return (
    <ProfileSocialValue brand={SocialBrand.INSTAGRAM} url={instagramUrl} />
  );
};

const ProfileSocialLinkedIn: React.FC = () => {
  const linkedInUrl = useStoreState(({ db }) => db.socials?.linkedInUrl);
  return <ProfileSocialValue brand={SocialBrand.LINKED_IN} url={linkedInUrl} />;
};

const ProfileSocialTwitter: React.FC = () => {
  const twitterUrl = useStoreState(({ db }) => db.socials?.twitterUrl);
  return <ProfileSocialValue brand={SocialBrand.TWITTER} url={twitterUrl} />;
};

const ProfileSocialCard: React.FC = () => {
  const { loading } = useInitProfileSocial();

  return (
    <Card className="s-profile-card--social" loading={loading}>
      <ProfileSocialHeader />

      <div>
        <ProfileSocialLinkedIn />
        <ProfileSocialTwitter />
        <ProfileSocialFacebook />
        <ProfileSocialClubhouse />
        <ProfileSocialInstagram />
      </div>

      <ProfileSocialOnboardingContainer />
    </Card>
  );
};

export default ProfileSocialCard;
