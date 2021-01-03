import React from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

import Button from '@components/Button/Button';
import Spinner from '@components/Loader/Spinner';
import NumberTag from '@components/Tags/NumberTag';
import { ChildrenProps, ClassNameProps, LoadingProps } from '@constants';
import { makeClass } from '@util/util';

interface MainHeaderProps extends ClassNameProps, ChildrenProps, LoadingProps {
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
  loading,
  numberTag,
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

      {children}
    </div>
  );
};

export default MainHeader;
