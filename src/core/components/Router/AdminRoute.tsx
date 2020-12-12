import React from 'react';
import { Redirect, Route, RouteProps, useParams } from 'react-router-dom';

import { EncodedUrlNameParams } from '@constants';
import useBreakpoint from '@hooks/useBreakpoint';
import { useStoreState } from '@store/Store';

/**
 * For an authenticated route, we first try to retrieve the user (by using the
 * token stored in the httpOnly cookies), and if the user exists, we update
 * the global state with the user.
 */
export default ({ component, ...rest }: RouteProps) => {
  const { encodedUrlName } = useParams() as EncodedUrlNameParams;
  const isDesktop = useBreakpoint() === 'D';

  const isAdmin: boolean = useStoreState(({ db }) => {
    const { byId: byCommunity } = db.entities.communities;
    const { byId: byMember } = db.entities.members;
    return Object.values(byMember).some(
      ({ community, role }) =>
        !!role && encodedUrlName === byCommunity[community]?.encodedUrlName
    );
  });

  if (!isDesktop || !isAdmin) return <Redirect to={`/${encodedUrlName}`} />;
  return <Route exact {...rest} component={component} />;
};
