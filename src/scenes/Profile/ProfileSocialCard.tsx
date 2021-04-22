import React from 'react';
import { memberIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Button from '@components/atoms/Button/Button';
import Card from '@components/containers/Card/Card';
import Show from '@components/containers/Show';
import { useStoreActions } from '@core/store/Store';
import useFindOne from '@gql/hooks/useFindOne';
import { ModalType, SocialBrand } from '@util/constants';
import { IMemberSocials } from '@util/constants.entities';
import ProfileCardHeader from './ProfileCardHeader';
import ProfileSocialValue from './ProfileSocialValue';

const ProfileSocialOnboardingContainer: React.FC = () => {
  const memberId: string = useReactiveVar(memberIdVar);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const { data: memberSocials, loading } = useFindOne(IMemberSocials, {
    fields: ['facebookUrl', 'instagramUrl', 'linkedInUrl', 'twitterUrl'],
    where: { memberId }
  });

  if (loading) return null;

  const isSocialLinked: boolean =
    !!memberSocials.facebookUrl ||
    !!memberSocials.instagramUrl ||
    !!memberSocials.linkedInUrl ||
    !!memberSocials.twitterUrl;

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
  const memberId: string = useReactiveVar(memberIdVar);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const { data: memberSocials, loading } = useFindOne(IMemberSocials, {
    fields: ['facebookUrl', 'instagramUrl', 'linkedInUrl', 'twitterUrl'],
    where: { memberId }
  });

  if (loading) return null;

  const isSocialLinked: boolean =
    !!memberSocials.facebookUrl ||
    !!memberSocials.instagramUrl ||
    !!memberSocials.linkedInUrl ||
    !!memberSocials.twitterUrl;

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
  const memberId: string = useReactiveVar(memberIdVar);

  const { data: memberSocials, loading } = useFindOne(IMemberSocials, {
    fields: ['facebookUrl'],
    where: { memberId }
  });

  if (loading) return null;

  return (
    <ProfileSocialValue
      brand={SocialBrand.FACEBOOK}
      url={memberSocials.facebookUrl}
    />
  );
};

const ProfileSocialInstagram: React.FC = () => {
  const memberId: string = useReactiveVar(memberIdVar);

  const { data: memberSocials, loading } = useFindOne(IMemberSocials, {
    fields: ['instagramUrl'],
    where: { memberId }
  });

  if (loading) return null;

  return (
    <ProfileSocialValue
      brand={SocialBrand.INSTAGRAM}
      url={memberSocials.instagramUrl}
    />
  );
};

const ProfileSocialLinkedIn: React.FC = () => {
  const memberId: string = useReactiveVar(memberIdVar);

  const { data: memberSocials, loading } = useFindOne(IMemberSocials, {
    fields: ['linkedInUrl'],
    where: { memberId }
  });

  if (loading) return null;

  return (
    <ProfileSocialValue
      brand={SocialBrand.LINKED_IN}
      url={memberSocials.linkedInUrl}
    />
  );
};

const ProfileSocialTwitter: React.FC = () => {
  const memberId: string = useReactiveVar(memberIdVar);

  const { data: memberSocials, loading } = useFindOne(IMemberSocials, {
    fields: ['twitterUrl'],
    where: { memberId }
  });

  if (loading) return null;

  return (
    <ProfileSocialValue
      brand={SocialBrand.TWITTER}
      url={memberSocials.twitterUrl}
    />
  );
};

const ProfileSocialCard: React.FC = () => {
  const memberId: string = useReactiveVar(memberIdVar);

  const { loading } = useFindOne(IMemberSocials, {
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
