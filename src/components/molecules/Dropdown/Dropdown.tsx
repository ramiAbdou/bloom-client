import React, { useEffect, useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import { BaseProps, ValueProps } from '@constants';
import { cx } from '@util/util';
import DropdownStore, { dropdownModel, initialOptions } from './Dropdown.store';
import { DropdownModel } from './Dropdown.types';
import DropdownClickBar from './DropdownClickBar';
import DropdownOptions from './DropdownOptions';

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

  const css = cx('', {
    [className]: className,
    'm-dropdown--fit': fit
  });

  return (
    <div ref={ref} className={css}>
      <DropdownClickBar />
      <DropdownOptions />
    </div>
  );
};

interface DropdownProps extends BaseProps, Partial<DropdownModel> {
  fit?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  className,
  fit,
  onSelect,
  options,
  show,
  value,
  values,
  ...rest
}) => {
  if (show === false) return null;

  return (
    <DropdownStore.Provider
      runtimeModel={{
        ...dropdownModel,
        ...rest,
        filteredValues: values,
        onSelect,
        options: { ...initialOptions, ...options },
        values
      }}
    >
      <DropdownContent className={className} fit={fit} value={value} />
    </DropdownStore.Provider>
  );
};

export default Dropdown;
