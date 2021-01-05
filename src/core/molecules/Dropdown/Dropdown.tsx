import React, { useEffect, useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import { ValueProps } from '@constants';
import ClickBar from './components/ClickBar';
import OptionContainer from './containers/Option';
import DropdownStore, { DropdownModel, dropdownModel } from './Dropdown.store';

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

const Dropdown = ({
  options,
  value,
  ...rest
}: Pick<DropdownModel, 'multiple' | 'options' | 'onUpdate' | 'value'>) => {
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
