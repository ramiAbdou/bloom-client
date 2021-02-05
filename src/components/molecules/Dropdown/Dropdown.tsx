import React, { useEffect, useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import { ValueProps } from '@constants';
import { cx } from '@util/util';
import ClickBar from './ClickBar';
import DropdownStore, { DropdownModel, dropdownModel } from './Dropdown.store';
import OptionContainer from './OptionContainer';

interface DropdownContentProps extends ValueProps {
  fit?: boolean;
}

const DropdownContent: React.FC<DropdownContentProps> = ({ fit, value }) => {
  const isOpen = DropdownStore.useStoreState((store) => store.isOpen);
  const setIsOpen = DropdownStore.useStoreActions((store) => store.setIsOpen);
  const setValue = DropdownStore.useStoreActions((store) => store.setValue);

  useEffect(() => {
    if (value) setValue(value);
  }, [value]);

  const ref: React.MutableRefObject<HTMLDivElement> = useRef(null);
  useOnClickOutside(ref, () => isOpen && setIsOpen(false));

  const css = cx('', { 'o-dropdown--fit': fit });

  return (
    <div ref={ref} className={css}>
      <ClickBar />
      {isOpen && <OptionContainer />}
    </div>
  );
};

interface DropdownProps
  extends Pick<DropdownModel, 'multiple' | 'options' | 'onUpdate' | 'value'> {
  fit?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
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
      <DropdownContent fit={fit} value={value} />
    </DropdownStore.Provider>
  );
};

export default Dropdown;
