import React, { useEffect } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { IMember } from '@core/db/db.entities';
import { useStoreActions, useStoreState } from '@core/store/Store';
import useFindOneFull from '@gql/hooks/useFindOneFull';
import { UrlNameProps } from '@util/constants';
import { updateDocumentColors } from '@util/util';

interface MemberRouteProps extends RouteProps {
  admin?: boolean;
}

const MemberRoute: React.FC<MemberRouteProps> = ({
  admin,
  component,
  ...rest
}) => {
  const storedCommunityId: string = useStoreState(({ db }) => db.communityId);
  const storedMemberId: string = useStoreState(({ db }) => db.memberId);
  const storedUserId: string = useStoreState(({ db }) => db.userId);
  const setActiveEntities = useStoreActions(({ db }) => db.setActiveEntities);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore b/c we know that computed match exists and we need to use
  // this because the useParams() hook isn't loaded by this point so the urlName
  // still would not be known to us.
  const { urlName }: UrlNameProps = rest?.computedMatch?.params;

  console.log('urlName', urlName);
  console.log('rest', rest);

  // Find the community with the urlName that we are currently at.
  const { data: member, loading } = useFindOneFull(IMember, {
    fields: ['community.id', 'community.primaryColor', 'role'],
    where: { community: { urlName }, userId: storedUserId }
  });

  useEffect(() => {
    // In order to set the active entities, we need to make sure the query
    // actually returned those ID's.
    if (!member.id || !member.community?.id) return;

    if (
      member.id !== storedMemberId ||
      member.community.id !== storedCommunityId
    ) {
      console.log('HEREEEEE', urlName);
      console.log('HEREEEEE2', member);

      setActiveEntities({
        communityId: member.community.id,
        memberId: member.id
      });

      // As we set the active entities, we must also update the document
      // colors with the community's primary color.
      updateDocumentColors(member.community.primaryColor);
    }
  }, [member, storedCommunityId, storedMemberId, urlName]);

  // Just wait if the query is still loading.
  if (loading) return null;

  // If it is no longer loading and there is no member at all, that means the
  // user isn't authorized to view this community so let's redirect them to
  // the catch all route, maybe they are apart of another community.
  if (!loading && !member) return <Redirect to="/" />;

  // If it is an admin route and the member is not an admin/owner, redirect
  // them to the community's directory page.
  if (admin && !member.role) return <Redirect to={`/${urlName}/directory`} />;

  return <Route component={component} {...rest} />;
};

export default MemberRoute;
