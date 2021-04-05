import React from 'react';

import Button from '@atoms/Button/Button';
import Card from '@containers/Card/Card';
import Show from '@containers/Show';
import useGQL from '@gql/useGQL';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType, SocialBrand } from '@util/constants';
import ProfileCardHeader from './ProfileCardHeader';
import ProfileSocialValue from './ProfileSocialValue';
import useInitProfileSocial from './useInitProfileSocial';

const ProfileSocialOnboardingContainer: React.FC = () => {
  const memberSocialsId: string = useStoreState(
    ({ db }) => db.member?.memberSocials
  );

  const gql = useGQL();

  const {
    facebookUrl,
    instagramUrl,
    linkedInUrl,
    twitterUrl
  } = gql.memberSocials.fromCache({
    fields: ['facebookUrl', 'instagramUrl', 'linkedInUrl', 'twitterUrl'],
    id: memberSocialsId
  });

  const isSocialLinked: boolean =
    !!facebookUrl || !!instagramUrl || !!linkedInUrl || !!twitterUrl;

  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const onClick = (): void => {
    showModal({ id: ModalType.EDIT_SOCIAL_MEDIA });
  };

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
  const memberSocialsId: string = useStoreState(
    ({ db }) => db.member?.memberSocials
  );

  const gql = useGQL();

  const {
    facebookUrl,
    instagramUrl,
    linkedInUrl,
    twitterUrl
  } = gql.memberSocials.fromCache({
    fields: ['facebookUrl', 'instagramUrl', 'linkedInUrl', 'twitterUrl'],
    id: memberSocialsId
  });

  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const isSocialLinked: boolean =
    !!facebookUrl || !!instagramUrl || !!linkedInUrl || !!twitterUrl;

  const onClick = () => showModal({ id: ModalType.EDIT_SOCIAL_MEDIA });
  return (
    <ProfileCardHeader
      canEdit={isSocialLinked}
      title="Social Media"
      onEditClick={onClick}
    />
  );
};

const ProfileSocialFacebook: React.FC = () => {
  const memberSocialsId: string = useStoreState(
    ({ db }) => db.member?.memberSocials
  );

  const gql = useGQL();

  const { facebookUrl } = gql.memberSocials.fromCache({
    fields: ['facebookUrl'],
    id: memberSocialsId
  });

  return <ProfileSocialValue brand={SocialBrand.FACEBOOK} url={facebookUrl} />;
};

const ProfileSocialInstagram: React.FC = () => {
  const memberSocialsId: string = useStoreState(
    ({ db }) => db.member?.memberSocials
  );

  const gql = useGQL();

  const { instagramUrl } = gql.memberSocials.fromCache({
    fields: ['instagramUrl'],
    id: memberSocialsId
  });

  return (
    <ProfileSocialValue brand={SocialBrand.INSTAGRAM} url={instagramUrl} />
  );
};

const ProfileSocialLinkedIn: React.FC = () => {
  const memberSocialsId: string = useStoreState(
    ({ db }) => db.member?.memberSocials
  );

  const gql = useGQL();

  const { linkedInUrl } = gql.memberSocials.fromCache({
    fields: ['linkedInUrl'],
    id: memberSocialsId
  });

  return <ProfileSocialValue brand={SocialBrand.LINKED_IN} url={linkedInUrl} />;
};

const ProfileSocialTwitter: React.FC = () => {
  const memberSocialsId: string = useStoreState(
    ({ db }) => db.member?.memberSocials
  );

  const gql = useGQL();

  const { twitterUrl } = gql.memberSocials.fromCache({
    fields: ['twitterUrl'],
    id: memberSocialsId
  });

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
        <ProfileSocialInstagram />
      </div>

      <ProfileSocialOnboardingContainer />
    </Card>
  );
};

export default ProfileSocialCard;
