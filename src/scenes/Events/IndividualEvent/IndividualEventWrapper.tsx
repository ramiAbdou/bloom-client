import React from 'react';

import { ChildrenProps } from '@constants';
import useQuery from '@hooks/useQuery';
import Loader from '@molecules/Loader/Loader';
import { IS_LOGGED_IN } from '../../../core/routing/Router.gql';

const IndividualEventWrapper: React.FC<ChildrenProps> = ({ children }) => {
  const { data, loading } = useQuery<boolean>({
    name: 'isUserLoggedIn',
    query: IS_LOGGED_IN
  });

  if (loading) return <Loader />;

  console.log(data);

  return <>{children}</>;
};

export default IndividualEventWrapper;
