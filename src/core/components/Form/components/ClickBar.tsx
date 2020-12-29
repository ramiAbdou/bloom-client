import { ActionCreator } from 'easy-peasy';
import React, { memo, useEffect, useRef } from 'react';
import { IoCaretDown } from 'react-icons/io5';

import { OnClickProps, ValueProps } from '@constants';
import { makeClass } from '@util/util';
import Form from '../Form.store';

type ClickBarProps = {
  closeOptions: ActionCreator<void>;
  isOpen: boolean;
  multiple?: boolean; // True if the element is MultipleSelect.
  title: string;
  openOptions: ActionCreator<void>;
  setWidth: ActionCreator<number>;
};

interface ClickBarValueProps
  extends OnClickProps,
    ValueProps,
    Pick<ClickBarProps, 'multiple'> {}

const Value = ({ multiple, onClick, value }: ClickBarValueProps) => {
  const css = makeClass([
    'c-tag-attr',
    'c-form-dd-value',
    [multiple, 'c-form-dd-value--cancel']
  ]);

  return (
    <button className={css} onClick={onClick}>
      {value}
    </button>
  );
};

const ValueContainer = ({
  isOpen,
  multiple,
  openOptions,
  title
}: ClickBarProps) => {
  const values = Form.useStoreState(({ getItem }) => {
    const result = getItem({ title }).value;
    if (!result) return null;
    return Array.isArray(result) ? result : [result];
  });

  const updateItem = Form.useStoreActions((store) => store.updateItem);

  const deleteValue = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: string
  ) => {
    if (!isOpen) openOptions();
    if (!Array.isArray(values)) return;
    e.stopPropagation();
    const updatedValues = values.filter((option: string) => option !== value);
    updateItem({ title, value: updatedValues });
  };

  if (!values?.length) return null;

  return (
    <div className="c-form-dd-value-ctr">
      {values.map((value: string) => (
        <Value
          key={value}
          multiple={multiple}
          value={value}
          onClick={(e) => deleteValue(e, value)}
        />
      ))}
    </div>
  );
};

export default memo((props: ClickBarProps) => {
  const { closeOptions, isOpen, openOptions, setWidth } = props;

  const ref: React.MutableRefObject<HTMLDivElement> = useRef(null);
  const width = ref?.current?.offsetWidth;

  useEffect(() => {
    if (width) setWidth(width);
  }, [width]);

  const onClick = () => {
    if (isOpen) closeOptions();
    else openOptions();
  };

  const css = makeClass(['c-form-dd-bar', [isOpen, 'c-form-dd-bar--open']]);

  return (
    <div ref={ref} className={css} onClick={onClick}>
      <div>
        <ValueContainer {...props} />
      </div>

      <IoCaretDown />
    </div>
  );
});
