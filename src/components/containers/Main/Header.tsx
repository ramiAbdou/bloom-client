import React, { memo } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

import Button from '@atoms/Button';
import Spinner from '@atoms/Spinner';
import { NumberTag } from '@atoms/Tags';
import { ChildrenProps, ClassNameProps } from '@constants';
import LoadingStore from '@store/Loading.store';
import { makeClass } from '@util/util';
import Navigation, { NavigationProps } from './Navigation';

interface MainHeaderProps
  extends ClassNameProps,
    ChildrenProps,
    NavigationProps {
  backButton?: boolean;
  numberTag?: string;
  title: string;
}

const MainHeaderBackButton = () => {
  const { goBack } = useHistory();

  return (
    <Button onClick={goBack}>
      <IoArrowBack />
    </Button>
  );
};

const MainHeader: React.FC<MainHeaderProps> = ({
  backButton,
  children,
  className,
  numberTag,
  options,
  title
}) => {
  const loading = LoadingStore.useStoreState((store) => store.loading);

  const css = makeClass(['t-main-header', className]);

  return (
    <div className={css}>
      <div>
        {backButton && <MainHeaderBackButton />}
        <h1>{title}</h1>
        {loading === false && numberTag && <NumberTag>{numberTag}</NumberTag>}
        <Spinner dark loading={loading} />
      </div>

      <Navigation options={options} />
      {loading === false && children}
    </div>
  );
};

export default memo(MainHeader);
