import React from 'react';

import MainHeader from '@components/containers/Main/MainHeader';
import { LoadingProps } from '@util/constants';
import DatabaseHeaderAddMemberButton from './DatabaseHeaderAddMemberButton';

const DatabaseHeader: React.FC<LoadingProps> = ({ loading }) => (
  <MainHeader loading={loading} title="Member Database">
    <DatabaseHeaderAddMemberButton />
  </MainHeader>
);

export default DatabaseHeader;
