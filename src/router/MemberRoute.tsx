import { ActionCreator } from 'easy-peasy';
import React, { useEffect } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { IMember } from '@db/db.entities';
import { updateDocumentColors } from '@db/db.util';
import useFindOneFull from '@gql/hooks/useFindOneFull';
import { useStoreActions, useStoreState } from '@store/Store';
import { UrlNameProps } from '@util/constants';
import { SetActiveEntitesArgs } from '../core/db/db.types';

interface MemberRouteProps extends RouteProps {
  admin?: boolean;
}

const MemberRoute: React.FC<MemberRouteProps> = ({
  admin,
  component,
  ...rest
}) => {
  const setActiveEntities: ActionCreator<SetActiveEntitesArgs> = useStoreActions(
    ({ db }) => db.setActiveEntities
  );

  const storedCommunityId: string = useStoreState(({ db }) => db.communityId);
  const storedMemberId: string = useStoreState(({ db }) => db.memberId);
  const userId: string = useStoreState(({ db }) => db.userId);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore b/c we know that computed match exists.
  const { urlName }: UrlNameProps = rest?.computedMatch?.params;

  const { data: member, loading } = useFindOneFull(IMember, {
    fields: ['community.id', 'community.primaryColor', 'role'],
    where: { community: { urlName }, userId }
  });

  useEffect(() => {
    // In order to set the active entities, we need to make sure the query
    // actually returned those ID's.
    if (!member.id || !member.community?.id) return;

    if (
      member.id !== storedMemberId ||
      member.community.id !== storedCommunityId
    ) {
      setActiveEntities({
        communityId: member.community.id,
        memberId: member.id
      });

      updateDocumentColors(member.community.primaryColor);
    }
  }, [member, storedCommunityId, storedMemberId]);

  // If role is undefined, means it hasn't been loaded yet.
  if (loading) return null;
  if (!loading && !member) return <Redirect to="/login" />;
  if (admin && member.role === null) return <Redirect to={`/${urlName}`} />;

  return <Route component={component} {...rest} />;
};

export default MemberRoute;
