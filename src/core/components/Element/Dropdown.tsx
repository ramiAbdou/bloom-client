import { motion } from 'framer-motion';
import React, { memo, MutableRefObject, useEffect, useRef } from 'react';
import { IoCaretDown } from 'react-icons/io5';
import useOnClickOutside from 'use-onclickoutside';

import { Function } from '@constants';
import Dropdown, { dropdownModel, IDropdownOption } from './Dropdown.store';

type DropdownProps = {
  activeId: string;
  onChange: Function;
  options: IDropdownOption[];
};

interface DropdownOptionProps extends Pick<DropdownProps, 'onChange'> {
  value: IDropdownOption;
}

const DropdownOption = ({ onChange, value }: DropdownOptionProps) => {
  const setIsOpen = Dropdown.useStoreActions((store) => store.setIsOpen);

  const onClick = () => {
    onChange(value);
    setIsOpen(false);
  };

  return <div onClick={onClick}>{value?.title}</div>;
};

const DropdownOptionContainer = ({
  onChange
}: Pick<DropdownProps, 'onChange'>) => {
  const width = Dropdown.useStoreState((store) => store.width);
  const options = Dropdown.useStoreState((store) => store.options);

  return (
    <motion.div
      animate={{ y: 0 }}
      className="c-misc-dropdown-option-ctr"
      initial={{ y: -5 }}
      style={{ minWidth: width ?? 0 }}
    >
      {options.map((value: IDropdownOption) => (
        <DropdownOption key={value?.id} value={value} onChange={onChange} />
      ))}
    </motion.div>
  );
};

const DropdownContent = ({
  activeId,
  ...dropdownProps
}: Pick<DropdownProps, 'onChange' | 'activeId'>) => {
  const isOpen = Dropdown.useStoreState((store) => store.isOpen);
  const options = Dropdown.useStoreState((store) => store.options);
  const setIsOpen = Dropdown.useStoreActions((store) => store.setIsOpen);
  const setWidth = Dropdown.useStoreActions((store) => store.setWidth);

  const title = options.find(({ id }) => id === activeId)?.title;

  const ref: MutableRefObject<HTMLDivElement> = useRef(null);
  const width = ref?.current?.offsetWidth;

  useEffect(() => {
    if (width) setWidth(width);
  }, [width]);

  useOnClickOutside(ref, () => isOpen && setIsOpen(false));

  const onClick = () => !isOpen && setIsOpen(true);

  return (
    <div ref={ref} className="c-misc-dropdown" onClick={onClick}>
      <div>
        <p>{title}</p>
        <IoCaretDown />
      </div>

      {isOpen && <DropdownOptionContainer {...dropdownProps} />}
    </div>
  );
};

export default memo(({ options, ...props }: DropdownProps) => (
  <Dropdown.Provider runtimeModel={{ ...dropdownModel, options }}>
    <DropdownContent {...props} />
  </Dropdown.Provider>
));
