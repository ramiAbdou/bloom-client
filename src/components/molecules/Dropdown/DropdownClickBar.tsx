import React, { useEffect, useRef } from 'react';
import { IoCaretDown } from 'react-icons/io5';

import Row from '@components/containers/Row/Row';
import { ValueProps } from '@util/constants';
import { cx } from '@util/util';
import { useDropdown } from './Dropdown.state';

const DropdownClickBarValue: React.FC<ValueProps> = ({ value }) => {
  const [
    { onSelect, open, options, selectedValues },
    dropdownDispatch
  ] = useDropdown();

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    if (!open) dropdownDispatch({ open: true, type: 'SET_OPEN' });
    if (!options.multiple) return;

    onSelect(
      options.multiple
        ? selectedValues.filter((option) => option !== value)
        : selectedValues[0]
    );
  };

  if (!options.attribute) return <p className="overflow-ellipses">{value}</p>;

  const css: string = cx('c-tag-attr m-dropdown-value o-visible', {
    'm-dropdown-value--cancel': options.multiple
  });

  return (
    <button className={css} type="button" onClick={onClick}>
      {value}
    </button>
  );
};

const DropdownClickBarValues: React.FC = () => {
  const [{ selectedValues }] = useDropdown();

  if (!selectedValues.length) return null;

  return (
    <Row className="m-dropdown-value-ctr o-scroll">
      {selectedValues.map((element: string) => (
        <DropdownClickBarValue key={element} value={element} />
      ))}
    </Row>
  );
};

const DropdownClickBar: React.FC = () => {
  const [{ open }, dropdownDispatch] = useDropdown();

  const ref: React.MutableRefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    const width: number = ref?.current?.offsetWidth;
    if (width) dropdownDispatch({ type: 'SET_WIDTH', width });
  }, [ref]);

  const onClick = (): void => {
    dropdownDispatch({ open: !open, type: 'SET_OPEN' });
  };

  const css: string = cx('m-dropdown-bar', {
    'm-dropdown-bar--open': open
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
