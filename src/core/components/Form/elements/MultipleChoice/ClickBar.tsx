import React, { useEffect, useRef } from 'react';
import { IoCaretDown } from 'react-icons/io5';

import { makeClass } from '@util/util';
import Form from '../../Form.store';
import MultipleChoice from './MultipleChoiceDD.store';

const Value = () => {
  const isOpen = MultipleChoice.useStoreState((store) => store.isOpen);
  const title = MultipleChoice.useStoreState((store) => store.title);
  const value = Form.useStoreState(({ getItem }) => getItem({ title })?.value);
  const updateItem = Form.useStoreActions((store) => store.updateItem);

  const openOptions = MultipleChoice.useStoreActions(
    (store) => store.openOptions
  );

  const onClick = () => {
    updateItem({ title, value: null });
    if (!isOpen) openOptions();
  };

  if (!value) return null;

  return (
    <button className="c-tag-attr c-form-dd-value" onClick={onClick}>
      {value}
    </button>
  );
};

export default () => {
  const isOpen = MultipleChoice.useStoreState((store) => store.isOpen);
  const setWidth = MultipleChoice.useStoreActions((store) => store.setWidth);

  const closeOptions = MultipleChoice.useStoreActions(
    (store) => store.closeOptions
  );

  const openOptions = MultipleChoice.useStoreActions(
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

  const css = makeClass(['c-form-dd-bar', [isOpen, 'c-form-dd-bar--open']]);

  return (
    <div ref={ref} className={css} onClick={onClick}>
      <div>
        <Value />
      </div>

      <IoCaretDown />
    </div>
  );
};
