import React, { memo } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

import Button from '@atoms/Button';
import NumberTag from '@atoms/Tags/NumberTag';
import Spinner from '@components/Loader/Spinner';
import { ChildrenProps, ClassNameProps, LoadingProps } from '@constants';
import { makeClass } from '@util/util';
import Navigation, { NavigationProps } from './Navigation';

interface MainHeaderProps
  extends ClassNameProps,
    ChildrenProps,
    LoadingProps,
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
  activeIndex,
  backButton,
  children,
  className,
  loading,
  numberTag,
  options,
  title
}: MainHeaderProps) => {
  const css = makeClass(['c-main-header', className]);

  return (
    <div className={css}>
      <div>
        {backButton && <MainHeaderBackButton />}
        <h1>{title}</h1>
        {!loading && numberTag && <NumberTag value={numberTag} />}
        <Spinner dark loading={loading} />
      </div>

      <Navigation activeIndex={activeIndex} options={options} />
      {children}
    </div>
  );
};

export default memo(MainHeader);
