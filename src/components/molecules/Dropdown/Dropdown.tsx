import React, { useEffect, useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import { BaseProps, ValueProps } from '@constants';
import { cx } from '@util/util';
import DropdownStore, { DropdownModel, dropdownModel } from './Dropdown.store';
import DropdownClickBar from './DropdownClickBar';
import DropdownOptionContainer from './DropdownOptionContainer';

interface DropdownContentProps extends BaseProps, ValueProps {
  fit?: boolean;
}

const DropdownContent: React.FC<DropdownContentProps> = ({
  className,
  fit,
  value
}) => {
  const isOpen = DropdownStore.useStoreState((store) => store.isOpen);
  const setIsOpen = DropdownStore.useStoreActions((store) => store.setIsOpen);
  const setValue = DropdownStore.useStoreActions((store) => store.setValue);

  useEffect(() => {
    if (value) setValue(value);
  }, [value]);

  const ref: React.MutableRefObject<HTMLDivElement> = useRef(null);
  useOnClickOutside(ref, () => isOpen && setIsOpen(false));

  const css = cx('', { [className]: className, 'o-dropdown--fit': fit });

  return (
    <div ref={ref} className={css}>
      <DropdownClickBar />
      {isOpen && <DropdownOptionContainer />}
    </div>
  );
};

interface DropdownProps
  extends BaseProps,
    Pick<DropdownModel, 'multiple' | 'options' | 'onUpdate' | 'value'> {
  fit?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  className,
  fit,
  options,
  value,
  ...rest
}) => {
  return (
    <DropdownStore.Provider
      runtimeModel={{
        ...dropdownModel,
        ...rest,
        filteredOptions: options,
        options
      }}
    >
      <DropdownContent className={className} fit={fit} value={value} />
    </DropdownStore.Provider>
  );
};

export default Dropdown;
