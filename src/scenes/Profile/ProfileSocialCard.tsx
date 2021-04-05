import React, { useEffect } from 'react';

// import { gql, useApolloClient } from '@apollo/client';
import Button from '@atoms/Button/Button';
import Card from '@containers/Card/Card';
import Show from '@containers/Show';
import { IMemberSocials } from '@db/db.entities';
import useGQL from '@gql/useGql';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType, SocialBrand } from '@util/constants';
import ProfileCardHeader from './ProfileCardHeader';
import ProfileSocialValue from './ProfileSocialValue';
import useInitProfileSocial from './useInitProfileSocial';

const ProfileSocialOnboardingContainer: React.FC = () => {
  const isSocialLinked: boolean = useStoreState(({ db }) => {
    const { facebookUrl, instagramUrl, linkedInUrl, twitterUrl } =
      db.memberSocials ?? {};

    return !!facebookUrl || !!instagramUrl || !!linkedInUrl || !!twitterUrl;
  });

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
  const facebookUrl = useStoreState(({ db }) => db.memberSocials?.facebookUrl);

  const instagramUrl = useStoreState(
    ({ db }) => db.memberSocials?.instagramUrl
  );

  const linkedInUrl = useStoreState(({ db }) => db.memberSocials?.linkedInUrl);
  const twitterUrl = useStoreState(({ db }) => db.memberSocials?.twitterUrl);
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
    ({ db }) => db.memberSocials?.id
  );

  const gql = useGQL();

  useEffect(() => {
    (async () => {
      const a = await gql.hello.findOne({
        fields: ['id', 'email'],
        where: { email: 'rami@onbloom.co' }
      });

      console.log(a);
    })();
  }, [gql]);

  // console.log(gql.hello.name);

  const { facebookUrl }: IMemberSocials = gql.memberSocials.byId(
    memberSocialsId
  );

  return <ProfileSocialValue brand={SocialBrand.FACEBOOK} url={facebookUrl} />;
};

const ProfileSocialInstagram: React.FC = () => {
  const instagramUrl = useStoreState(
    ({ db }) => db.memberSocials?.instagramUrl
  );

  return (
    <ProfileSocialValue brand={SocialBrand.INSTAGRAM} url={instagramUrl} />
  );
};

const ProfileSocialLinkedIn: React.FC = () => {
  const linkedInUrl = useStoreState(({ db }) => db.memberSocials?.linkedInUrl);
  return <ProfileSocialValue brand={SocialBrand.LINKED_IN} url={linkedInUrl} />;
};

const ProfileSocialTwitter: React.FC = () => {
  const twitterUrl = useStoreState(({ db }) => db.memberSocials?.twitterUrl);
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
