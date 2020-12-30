import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

import { ChildrenProps, EncodedUrlNameParams } from '@constants';
import { useStoreState } from '@store/Store';

export default function AuthenticatedCommunityWrapper({
  children
}: ChildrenProps) {
  const { encodedUrlName } = useParams() as EncodedUrlNameParams;

  const activeEncodedUrlName = useStoreState(
    ({ db }) => db.community?.encodedUrlName
  );

  const isMember: boolean = useStoreState(({ db }) => {
    const { byId: byCommunityId } = db.entities.communities;
    const { byId: byMemberId } = db.entities.members;

    return Object.values(byMemberId).some(
      ({ community }) =>
        encodedUrlName === byCommunityId[community]?.encodedUrlName
    );
  });

  // If the activeEncodedUrlName hasn't been set yet, that means the community
  // hasn't been loaded in the global state yet, so just wait...
  if (!activeEncodedUrlName) return null;

  // If the user isn't a member of the community who's URL we are currently
  // sitting at, then we redirect them to the first community that they are
  // a member of.
  if (!isMember) return <Redirect to={`/${activeEncodedUrlName}`} />;

  // If they are a member, just return the requested content.
  return <>{children}</>;
}
