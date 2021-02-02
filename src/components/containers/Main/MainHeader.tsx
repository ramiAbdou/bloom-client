import React from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

import Button from '@atoms/Button/Button';
import Spinner from '@atoms/Spinner/Spinner';
import HeaderTag from '@atoms/Tag/HeaderTag';
import { ChildrenProps, ClassNameProps, LoadingProps } from '@constants';
import Row from '@containers/Row/Row';
import Show from '@containers/Show';
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

const MainHeaderBackButton = () => {
  const { goBack } = useHistory();

  return (
    <Button onClick={goBack}>
      <IoArrowBack />
    </Button>
  );
};

const MainHiddenButton: React.FC<
  Pick<MainHeaderProps, 'children' | 'options'>
> = ({ children, options }) => {
  const isDesktop = useBreakpoint() >= 3;

  return (
    <Show show={!children && isDesktop && !!options?.length}>
      <div className="t-main-header-element--hidden" />
    </Show>
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
        {backButton && <MainHeaderBackButton />}
        <h1>{title}</h1>
        {!loading && headerTag && <HeaderTag>{headerTag}</HeaderTag>}
        <Spinner dark loading={loading} />
      </div>

      {!loading && <MainNavigation options={options} />}
      {!loading && isDesktop && children}
      <MainHiddenButton options={options}>{children}</MainHiddenButton>
    </Row>
  );
};

export default MainHeader;
