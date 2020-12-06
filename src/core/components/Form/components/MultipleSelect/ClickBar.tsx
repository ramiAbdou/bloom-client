import React, { useEffect, useRef } from 'react';
import { IoCaretDown } from 'react-icons/io5';

import { OnClickProps, ValueProps } from '@constants';
import Form from '../../Form.store';
import MultipleSelect from './MultipleSelect.store';

interface ClickBarValueProps extends OnClickProps, ValueProps {}

const Value = ({ onClick, value }: ClickBarValueProps) => (
  <button className="c-misc-tag c-form-dd-value" onClick={onClick}>
    {value}
  </button>
);

const ValueContainer = () => {
  const isOpen = MultipleSelect.useStoreState((store) => store.isOpen);
  const title = MultipleSelect.useStoreState((store) => store.title);
  const values = Form.useStoreState(({ getItem }) => getItem({ title }).value);
  const updateItem = Form.useStoreActions((store) => store.updateItem);

  const openOptions = MultipleSelect.useStoreActions(
    (store) => store.openOptions
  );

  const deleteValue = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: string
  ) => {
    e.stopPropagation();
    const updatedValues = values.filter((option: string) => option !== value);
    updateItem({ title, value: updatedValues });
    if (!isOpen) openOptions();
  };

  return (
    <div>
      {!!values.length && (
        <div className="c-form-dd-value-ctr">
          {values.map((value: string) => (
            <Value
              key={value}
              value={value}
              onClick={(e) => deleteValue(e, value)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default () => {
  const isOpen = MultipleSelect.useStoreState((store) => store.isOpen);
  const setWidth = MultipleSelect.useStoreActions((store) => store.setWidth);

  const closeOptions = MultipleSelect.useStoreActions(
    (store) => store.closeOptions
  );

  const openOptions = MultipleSelect.useStoreActions(
    (store) => store.openOptions
  );

  const ref: React.MutableRefObject<HTMLDivElement> = useRef(null);
  const width = ref?.current?.offsetWidth;

  useEffect(() => {
    if (width) setWidth(width);
  }, [width]);

  const onClick = () => {
    if (isOpen) closeOptions();
    else openOptions();
  };

  return (
    <div ref={ref} className="c-misc-input c-form-dd-bar" onClick={onClick}>
      <ValueContainer />
      <IoCaretDown />
    </div>
  );
};
