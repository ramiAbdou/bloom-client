import React from 'react';

import Button from '@atoms/Button/Button';
import Card from '@containers/Card/Card';
import Show from '@containers/Show';
import { IMemberSocials } from '@db/db.entities';
import useFindOne from '@gql/hooks/useFindOne';
import useFindOneFull from '@gql/hooks/useFindOneFull';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType, SocialBrand } from '@util/constants';
import ProfileCardHeader from './ProfileCardHeader';
import ProfileSocialValue from './ProfileSocialValue';

const ProfileSocialOnboardingContainer: React.FC = () => {
  const memberId: string = useStoreState(({ db }) => db.memberId);

  const { facebookUrl, instagramUrl, linkedInUrl, twitterUrl } = useFindOne(
    IMemberSocials,
    {
      fields: ['facebookUrl', 'instagramUrl', 'linkedInUrl', 'twitterUrl'],
      where: { memberId }
    }
  );

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
  const memberId: string = useStoreState(({ db }) => db.memberId);

  const { facebookUrl, instagramUrl, linkedInUrl, twitterUrl } = useFindOne(
    IMemberSocials,
    {
      fields: ['facebookUrl', 'instagramUrl', 'linkedInUrl', 'twitterUrl'],
      where: { memberId }
    }
  );

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
  const memberId: string = useStoreState(({ db }) => db.memberId);

  const { facebookUrl } = useFindOne(IMemberSocials, {
    fields: ['facebookUrl'],
    where: { memberId }
  });

  return <ProfileSocialValue brand={SocialBrand.FACEBOOK} url={facebookUrl} />;
};

const ProfileSocialInstagram: React.FC = () => {
  const memberId: string = useStoreState(({ db }) => db.memberId);

  const { instagramUrl } = useFindOne(IMemberSocials, {
    fields: ['instagramUrl'],
    where: { memberId }
  });

  return (
    <ProfileSocialValue brand={SocialBrand.INSTAGRAM} url={instagramUrl} />
  );
};

const ProfileSocialLinkedIn: React.FC = () => {
  const memberId: string = useStoreState(({ db }) => db.memberId);

  const { linkedInUrl } = useFindOne(IMemberSocials, {
    fields: ['linkedInUrl'],
    where: { memberId }
  });

  return <ProfileSocialValue brand={SocialBrand.LINKED_IN} url={linkedInUrl} />;
};

const ProfileSocialTwitter: React.FC = () => {
  const memberId: string = useStoreState(({ db }) => db.memberId);

  const { twitterUrl } = useFindOne(IMemberSocials, {
    fields: ['twitterUrl'],
    where: { memberId }
  });

  return <ProfileSocialValue brand={SocialBrand.TWITTER} url={twitterUrl} />;
};

const ProfileSocialCard: React.FC = () => {
  const memberId: string = useStoreState(({ db }) => db.memberId);

  const { loading } = useFindOneFull(IMemberSocials, {
    fields: ['facebookUrl', 'instagramUrl', 'linkedInUrl', 'twitterUrl'],
    where: { memberId }
  });

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
