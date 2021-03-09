import React from 'react';
import { useHistory } from 'react-router-dom';

import Show from '@containers/Show';
import { BaseProps } from '@util/constants';
import MainNavigationButton, {
  MainNavigationOptionProps
} from './MainNavigationButton';

export interface MainNavigationProps extends BaseProps {
  options?: MainNavigationOptionProps[];
}

const MainNavigation: React.FC<MainNavigationProps> = (props) => {
  const { options, show } = props;

  const { location } = useHistory();
  const { pathname } = location;

  // Only show if options are present.
  if (!options?.length) return null;

  const page = pathname.substring(pathname.lastIndexOf('/') + 1);
  const activeIndex = options.findIndex((option) => option.pathname === page);

  if (activeIndex < 0 || !options?.length) return null;

  const activeOption: MainNavigationOptionProps = options[activeIndex];

  return (
    <Show show={show}>
      <nav className="f-ac">
        {options.map((optionProps: MainNavigationOptionProps) => {
          return (
            <MainNavigationButton
              key={optionProps.title}
              activeTitle={activeOption.title}
              {...optionProps}
            />
          );
        })}
      </nav>
    </Show>
  );
};

export default MainNavigation;
