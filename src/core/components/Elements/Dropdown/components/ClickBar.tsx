import React, { useEffect, useRef } from 'react';
import { IoCaretDown } from 'react-icons/io5';

import { makeClass } from '@util/util';
import Dropdown from '../Dropdown.store';

type ValueProps = { value: string };

const Value = ({ value }: ValueProps) => {
  const isOpen = Dropdown.useStoreState((store) => store.isOpen);
  const multiple = Dropdown.useStoreState((store) => store.multiple);
  const storedValue = Dropdown.useStoreState((store) => store.value);
  const onUpdate = Dropdown.useStoreState((store) => store.onUpdate);
  const setIsOpen = Dropdown.useStoreActions((store) => store.setIsOpen);

  const deleteValue = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (!isOpen) setIsOpen(true);
    if (!multiple) return;

    const updatedValues = storedValue.filter((option) => option !== value);
    onUpdate(updatedValues);
  };

  const css = makeClass([
    'c-tag-attr',
    'c-misc-dropdown-value',
    [multiple, 'c-misc-dropdown-value--cancel']
  ]);

  return (
    <button className={css} type="button" onClick={deleteValue}>
      {value}
    </button>
  );
};

const ValueList = () => {
  const values = Dropdown.useStoreState((store) => store.value);
  if (!values?.length) return null;

  return (
    <div className="c-misc-dropdown-value-ctr">
      {values.map((value: string) => (
        <Value key={value} value={value} />
      ))}
    </div>
  );
};

export default () => {
  const isOpen = Dropdown.useStoreState((store) => store.isOpen);
  const setIsOpen = Dropdown.useStoreActions((store) => store.setIsOpen);
  const setWidth = Dropdown.useStoreActions((store) => store.setWidth);

  const ref: React.MutableRefObject<HTMLDivElement> = useRef(null);
  const width = ref?.current?.offsetWidth;

  useEffect(() => {
    if (width) setWidth(width);
  }, [width]);

  const onClick = () => setIsOpen(!isOpen);

  const css = makeClass([
    'c-misc-dropdown-bar',
    [isOpen, 'c-misc-dropdown-bar--open']
  ]);

  return (
    <div ref={ref} className={css} onClick={onClick}>
      <div>
        <ValueList />
      </div>

      <IoCaretDown />
    </div>
  );
};
