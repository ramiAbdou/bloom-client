import React, { memo } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

import Button from '@atoms/Button';
import { NumberTag } from '@atoms/Tags';
import Spinner from '@components/Loader/Spinner';
import { ChildrenProps, ClassNameProps } from '@constants';
import Loading from '@store/Loading.store';
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

const MainHeader = ({
  backButton,
  children,
  className,
  numberTag,
  options,
  title
}: MainHeaderProps) => {
  const loading = Loading.useStoreState((store) => store.loading);

  const css = makeClass(['t-main-header', className]);

  return (
    <div className={css}>
      <div>
        {backButton && <MainHeaderBackButton />}
        <h1>{title}</h1>
        {!loading && numberTag && <NumberTag>{numberTag}</NumberTag>}
        <Spinner dark loading={loading} />
      </div>

      <Navigation options={options} />
      {!loading && children}
    </div>
  );
};

export default memo(MainHeader);
