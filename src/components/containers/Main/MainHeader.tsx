import React from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

import Button from '@atoms/Button/Button';
import Spinner from '@atoms/Spinner/Spinner';
import HeaderTag from '@atoms/Tag/HeaderTag';
import {
  ChildrenProps,
  ClassNameProps,
  LoadingProps,
  ShowProps
} from '@constants';
import Row from '@containers/Row/Row';
import useBreakpoint from '@hooks/useBreakpoint';
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

const MainHeaderBackButton: React.FC<ShowProps> = ({ show }) => {
  const { goBack } = useHistory();

  return (
    <Button show={show} onClick={goBack}>
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
  const isDesktop = useBreakpoint() >= 3;
  const css = cx('t-main-header', { [className]: className });

  return (
    <Row spaceBetween className={css}>
      <div>
        <MainHeaderBackButton show={!!backButton} />
        <h1>{title}</h1>
        <HeaderTag show={!loading && !!headerTag}>{headerTag}</HeaderTag>
        <Spinner dark loading={loading} />
      </div>

      {!loading && <MainNavigation options={options} />}
      <div>{!loading && isDesktop && children}</div>
    </Row>
  );
};

export default MainHeader;
