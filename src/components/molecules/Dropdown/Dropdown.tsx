import React, { useEffect, useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import { ValueProps } from '@constants';
import ClickBar from './ClickBar';
import DropdownStore, { DropdownModel, dropdownModel } from './Dropdown.store';
import OptionContainer from './OptionContainer';

const DropdownContent = ({ value }: ValueProps) => {
  const isOpen = DropdownStore.useStoreState((store) => store.isOpen);
  const setIsOpen = DropdownStore.useStoreActions((store) => store.setIsOpen);
  const setValue = DropdownStore.useStoreActions((store) => store.setValue);

  useEffect(() => {
    if (value) setValue(value);
  }, [value]);

  const ref: React.MutableRefObject<HTMLDivElement> = useRef(null);
  useOnClickOutside(ref, () => isOpen && setIsOpen(false));

  return (
    <div ref={ref}>
      <ClickBar />
      {isOpen && <OptionContainer />}
    </div>
  );
};

const Dropdown: React.FC<
  Pick<DropdownModel, 'multiple' | 'options' | 'onUpdate' | 'value'>
> = ({ options, value, ...rest }) => {
  return (
    <DropdownStore.Provider
      runtimeModel={{
        ...dropdownModel,
        ...rest,
        filteredOptions: options,
        options
      }}
    >
      <DropdownContent value={value} />
    </DropdownStore.Provider>
  );
};

export default Dropdown;
