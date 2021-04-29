import React, { useEffect, useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import { cx } from '@util/util';
import { DropdownProvider, useDropdown } from './Dropdown.state';
import { DropdownInitialState, DropdownOptions } from './Dropdown.types';
import DropdownClickBar from './DropdownClickBar';
import DropdownOptionContainer from './DropdownOptionContainer';

interface DropdownProps extends DropdownInitialState {
  className?: string;
  fit?: boolean;
  options?: DropdownOptions;
}

const DropdownContent: React.FC<DropdownProps> = ({
  className,
  fit,
  selectedValues,
  values
}) => {
  const [{ open }, dropdownDispatch] = useDropdown();

  useEffect(() => {
    dropdownDispatch({
      selectedValues: selectedValues ?? [],
      type: 'SET_SELECTED_VALUES'
    });
  }, [selectedValues]);

  useEffect(() => {
    dropdownDispatch({ type: 'SET_VALUES', values: values ?? [] });
  }, [values]);

  const ref: React.MutableRefObject<HTMLDivElement> = useRef(null);

  useOnClickOutside(ref, () => {
    if (open) dropdownDispatch({ open: false, type: 'SET_OPEN' });
  });

  const css: string = cx('', { 'm-dropdown--fit': fit }, className);

  return (
    <div ref={ref} className={css}>
      <DropdownClickBar />
      <DropdownOptionContainer />
    </div>
  );
};

const Dropdown: React.FC<DropdownProps> = ({
  onSelect,
  options,
  fit,
  className,
  selectedValues,
  values
}) => (
  <DropdownProvider
    options={options}
    selectedValues={selectedValues}
    values={values}
    onSelect={onSelect}
  >
    <DropdownContent
      className={className}
      fit={fit}
      selectedValues={selectedValues}
      values={values}
    />
  </DropdownProvider>
);

export default Dropdown;
