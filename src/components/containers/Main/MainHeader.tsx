import React from 'react';
import { IoArrowBack, IoMenuOutline } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

import Button from '@atoms/Button/Button';
import Spinner from '@atoms/Spinner/Spinner';
import HeaderTag from '@atoms/Tag/HeaderTag';
import { ClassNameProps, LoadingProps, ShowProps } from '@constants';
import Row from '@containers/Row/Row';
import useBreakpoint from '@hooks/useBreakpoint';
import { useStoreActions } from '@store/Store';
import { cx } from '@util/util';
import MainNavigation, { NavigationProps } from './MainNavigation';

export interface MainHeaderProps
  extends ClassNameProps,
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

const MainHeaderHamburger: React.FC = () => {
  const setIsOpen = useStoreActions(({ nav }) => nav.setIsOpen);
  const onClick = () => setIsOpen(true);

  return (
    <div className="t-main-hamburger">
      <Button onClick={onClick}>
        <IoMenuOutline />
      </Button>
    </div>
  );
};

const MainHeaderContent: React.FC<MainHeaderProps> = ({
  backButton,
  children,
  loading,
  headerTag,
  options,
  title
}) => {
  const isDesktop = useBreakpoint() >= 3;
  return (
    <Row justify="sb">
      <div>
        <MainHeaderBackButton show={!!backButton} />
        <h1>{title}</h1>
        <HeaderTag show={!loading && !!headerTag}>{headerTag}</HeaderTag>
        <Spinner dark show={loading} />
      </div>

      {!loading && <MainNavigation options={options} />}
      <div>{!loading && isDesktop && children}</div>
    </Row>
  );
};

const MainHeader: React.FC<MainHeaderProps> = ({ className, ...props }) => {
  const css = cx('t-main-header', { [className]: className });

  return (
    <header className={css}>
      <MainHeaderHamburger />
      <MainHeaderContent {...props} />
    </header>
  );
};

export default MainHeader;
