import React from 'react';

import Spinner from '@components/Loader/Spinner';
import NumberTag from '@components/Tags/NumberTag';
import { ChildrenProps, ClassNameProps, LoadingProps } from '@constants';
import { makeClass } from '@util/util';

interface MainHeaderProps extends ClassNameProps, ChildrenProps, LoadingProps {
  numberTag?: string;
  title: string;
}

const MainHeader = ({
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
        <h1>{title}</h1>
        {!loading && numberTag && <NumberTag value={numberTag} />}
        <Spinner dark loading={loading} />
      </div>

      {children}
    </div>
  );
};

export default MainHeader;
