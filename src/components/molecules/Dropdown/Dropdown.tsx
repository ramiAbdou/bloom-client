import deepequal from 'fast-deep-equal';
import React, { useEffect, useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import { BaseProps } from '@util/constants';
import { cx } from '@util/util';
import DropdownStore, { dropdownModel } from './Dropdown.store';
import { defaultOptions, DropdownModel } from './Dropdown.types';
import DropdownClickBar from './DropdownClickBar';
import DropdownOptionContainer from './DropdownOptionContainer';

type DropdownContentProps = Partial<DropdownProps>;

const DropdownContent: React.FC<DropdownContentProps> = ({
  className,
  fit,
  value,
  values
}) => {
  const isOpen = DropdownStore.useStoreState((state) => state.isOpen);
  const storedValue = DropdownStore.useStoreState((state) => state.value);
  const storedValues = DropdownStore.useStoreState((state) => state.values);
  const setIsOpen = DropdownStore.useStoreActions((store) => store.setIsOpen);
  const setValue = DropdownStore.useStoreActions((store) => store.setValue);
  const setValues = DropdownStore.useStoreActions((store) => store.setValues);

  useEffect(() => {
    if (!deepequal(storedValue, value)) setValue(value);
  }, [value]);

  useEffect(() => {
    if (!deepequal(storedValues, values)) setValues(values ?? []);
  }, [values]);

  const ref: React.MutableRefObject<HTMLDivElement> = useRef(null);
  useOnClickOutside(ref, () => isOpen && setIsOpen(false));

  const css: string = cx('', { 'm-dropdown--fit': fit }, className);

  return (
    <div ref={ref} className={css}>
      <DropdownClickBar />
      <DropdownOptionContainer />
    </div>
  );
};

interface DropdownProps extends BaseProps, Partial<DropdownModel> {
  fit?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  onSelect,
  options,
  show,
  ...props
}) => {
  if (show === false) return null;

  return (
    <DropdownStore.Provider
      runtimeModel={{
        ...dropdownModel,
        onSelect,
        options: { ...defaultOptions, ...options }
      }}
    >
      <DropdownContent {...props} />
    </DropdownStore.Provider>
  );
};

export default Dropdown;
