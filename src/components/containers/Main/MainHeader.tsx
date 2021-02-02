import React from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

import Button from '@atoms/Button/Button';
import Spinner from '@atoms/Spinner/Spinner';
import HeaderTag from '@atoms/Tag/HeaderTag';
import { ChildrenProps, ClassNameProps, LoadingProps } from '@constants';
import { cx } from '@util/util';
import MainNavigation, { NavigationProps } from './MainNavigation';

export interface MainHeaderProps
  extends ClassNameProps,
    ChildrenProps,
    LoadingProps,
    NavigationProps {
  backButton?: boolean;
  headerTag?: string;
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
  loading,
  headerTag,
  options,
  title
}) => {
  const css = cx('t-main-header', { [className]: className });

  return (
    <header className={css}>
      <div>
        {backButton && <MainHeaderBackButton />}
        <h1>{title}</h1>
        {!loading && headerTag && <HeaderTag>{headerTag}</HeaderTag>}
        <Spinner dark loading={loading} />
      </div>

      <MainNavigation options={options} />
      {!loading && children}
    </header>
  );
};

export default MainHeader;
