import React, { useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import ClickBar from '../../components/ClickBar';
import { FormItemData } from '../../Form.types';
import MultipleSelect, { multipleSelectModel } from './MultipleSelect.store';
import OptionContainer from './OptionContainer';

const MultipleSelectContent = () => {
  const isOpen = MultipleSelect.useStoreState((store) => store.isOpen);
  const title = MultipleSelect.useStoreState((store) => store.title);

  const closeOptions = MultipleSelect.useStoreActions(
    (store) => store.closeOptions
  );

  const openOptions = MultipleSelect.useStoreActions(
    (store) => store.openOptions
  );

  const setWidth = MultipleSelect.useStoreActions((store) => store.setWidth);

  const ref: React.MutableRefObject<HTMLDivElement> = useRef(null);
  useOnClickOutside(ref, () => isOpen && closeOptions());

  return (
    <div ref={ref}>
      <ClickBar
        multiple
        closeOptions={closeOptions}
        isOpen={isOpen}
        openOptions={openOptions}
        setWidth={setWidth}
        title={title}
      />

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
