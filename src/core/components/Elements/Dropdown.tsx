import { motion } from 'framer-motion';
import React, { MutableRefObject, useEffect, useRef } from 'react';
import { IoCaretDown } from 'react-icons/io5';
import useOnClickOutside from 'use-onclickoutside';

import { Function, ValueProps } from '@constants';
import Dropdown, { dropdownModel } from './Dropdown.store';

type DropdownProps = { onChange: Function; options: string[]; value: string };
interface DropdownOptionProps
  extends Pick<DropdownProps, 'onChange'>,
    ValueProps {}

const DropdownOption = ({ onChange, value }: DropdownOptionProps) => {
  const setIsOpen = Dropdown.useStoreActions((store) => store.setIsOpen);

  const onClick = () => {
    onChange(value);
    setIsOpen(false);
  };

  return <div onClick={onClick}>{value}</div>;
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
      style={{ width: width ?? 0 }}
    >
      {options.map((value: string) => (
        <DropdownOption key={value} value={value} onChange={onChange} />
      ))}
    </motion.div>
  );
};

const DropdownContent = ({
  value,
  ...dropdownProps
}: Pick<DropdownProps, 'onChange' | 'value'>) => {
  const isOpen = Dropdown.useStoreState((store) => store.isOpen);
  const setIsOpen = Dropdown.useStoreActions((store) => store.setIsOpen);
  const setWidth = Dropdown.useStoreActions((store) => store.setWidth);

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
        <p>{value}</p>
        <IoCaretDown />
      </div>

      {isOpen && <DropdownOptionContainer {...dropdownProps} />}
    </div>
  );
};

export default ({ options, ...props }: DropdownProps) => (
  <Dropdown.Provider runtimeModel={{ ...dropdownModel, options }}>
    <DropdownContent {...props} />
  </Dropdown.Provider>
);
