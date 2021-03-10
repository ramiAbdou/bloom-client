import React, { useEffect, useRef } from 'react';
import { IoCaretDown } from 'react-icons/io5';

import Row from '@containers/Row/Row';
import { ValueProps } from '@util/constants';
import { cx } from '@util/util';
import Dropdown from './Dropdown.store';

const DropdownClickBarValue: React.FC<ValueProps> = ({ value }) => {
  const isOpen = Dropdown.useStoreState((state) => state.isOpen);
  const attribute = Dropdown.useStoreState((state) => state.options.attribute);
  const multiple = Dropdown.useStoreState((state) => state.options.multiple);
  const storedValue = Dropdown.useStoreState((state) => state.value);
  const onSelect = Dropdown.useStoreState((state) => state.onSelect);
  const setIsOpen = Dropdown.useStoreActions((store) => store.setIsOpen);

  const deleteValue = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    if (!isOpen) setIsOpen(true);
    if (!multiple) return;

    onSelect(
      multiple
        ? (storedValue as string[]).filter((option) => option !== value)
        : (storedValue as string)
    );
  };

  if (!attribute) return <p className="overflow-ellipses">{value}</p>;

  const css: string = cx('c-tag-attr m-dropdown-value o-visible', {
    'm-dropdown-value--cancel': multiple
  });

  return (
    <button className={css} type="button" onClick={deleteValue}>
      {value}
    </button>
  );
};

const DropdownClickBarValues: React.FC = () => {
  const value = Dropdown.useStoreState((state) => state.value);

  let values: string[] = [];

  if (Array.isArray(value)) values = value;
  else if (value) values = [value];

  return (
    <Row className="m-dropdown-value-ctr" show={!!values?.length}>
      {values.map((element: string) => (
        <DropdownClickBarValue key={element} value={element} />
      ))}
    </Row>
  );
};

const DropdownClickBar: React.FC = () => {
  const isOpen = Dropdown.useStoreState((state) => state.isOpen);
  const setIsOpen = Dropdown.useStoreActions((store) => store.setIsOpen);
  const setWidth = Dropdown.useStoreActions((store) => store.setWidth);

  const ref: React.MutableRefObject<HTMLDivElement> = useRef(null);
  const width = ref?.current?.offsetWidth;

  useEffect(() => {
    if (width) setWidth(width);
  }, [width]);

  const onClick = () => setIsOpen(!isOpen);

  const css: string = cx('m-dropdown-bar', {
    'm-dropdown-bar--open': isOpen
  });

  return (
    <div ref={ref} className={css} onClick={onClick}>
      <div>
        <DropdownClickBarValues />
      </div>

      <IoCaretDown />
    </div>
  );
};

export default DropdownClickBar;
