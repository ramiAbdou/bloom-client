import React from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

import Button from '@atoms/Button/Button';
import Spinner from '@atoms/Spinner/Spinner';
import HeaderTag from '@atoms/Tag/HeaderTag';
import Row from '@containers/Row/Row';
import useBreakpoint from '@hooks/useBreakpoint';
import SidebarHamburgerButton from '@organisms/Sidebar/SidebarHamburgerButton';
import { ClassNameProps, LoadingProps, ShowProps } from '@util/constants';
import { cx } from '@util/util';
import MainNavigation, { MainNavigationProps } from './MainNavigation';

export interface MainHeaderProps
  extends ClassNameProps,
    LoadingProps,
    MainNavigationProps {
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

const MainHeaderContent: React.FC<MainHeaderProps> = (props) => {
  const { backButton, children, loading, headerTag, options, title } = props;
  const isDesktop = useBreakpoint() >= 3;

  return (
    <Row className="d-block--m" justify="sb" spacing="sm">
      <Row className="mb-sm--m">
        <MainHeaderBackButton show={!!backButton} />
        <h1 className="mr-sm--nlc">{title}</h1>
        <HeaderTag show={!loading && !!headerTag}>{headerTag}</HeaderTag>
        <Spinner dark show={loading} />
      </Row>

      <MainNavigation options={options} show={!loading} />
      {!loading && isDesktop && <div>{children}</div>}
    </Row>
  );
};

const MainHeader: React.FC<MainHeaderProps> = (props) => {
  const { className } = props;
  const css: string = cx('t-main-header', {}, className);

  return (
    <header className={css}>
      <SidebarHamburgerButton />
      <MainHeaderContent {...props} />
    </header>
  );
};

export default MainHeader;
