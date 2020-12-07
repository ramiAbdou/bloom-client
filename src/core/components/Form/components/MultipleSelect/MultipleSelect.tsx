import React, { useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import { FormItemData } from '../../Form.types';
import ClickBar from './ClickBar';
import MultipleSelect, { multipleSelectModel } from './MultipleSelect.store';
import OptionContainer from './OptionContainer';

const MultipleSelectContent = () => {
  const isOpen = MultipleSelect.useStoreState((store) => store.isOpen);

  const closeOptions = MultipleSelect.useStoreActions(
    (store) => store.closeOptions
  );

  const ref: React.MutableRefObject<HTMLDivElement> = useRef(null);
  useOnClickOutside(ref, () => isOpen && closeOptions());

  return (
    <div ref={ref}>
      <ClickBar />
      {isOpen && <OptionContainer />}
    </div>
  );
};

export default ({ options, title }: FormItemData) => (
  <MultipleSelect.Provider
    runtimeModel={{
      ...multipleSelectModel,
      filteredOptions: options,
      options,
      title
    }}
  >
    <MultipleSelectContent />
  </MultipleSelect.Provider>
);
