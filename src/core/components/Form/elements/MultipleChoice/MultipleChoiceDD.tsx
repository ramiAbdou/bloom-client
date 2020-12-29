import React, { useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import ClickBar from '../../components/ClickBar';
import { FormItemData } from '../../Form.types';
import MultipleChoice, { multipleChoiceModel } from './MultipleChoiceDD.store';
import OptionContainer from './OptionContainer';

const MultipleChoiceDDContent = () => {
  const isOpen = MultipleChoice.useStoreState((store) => store.isOpen);
  const title = MultipleChoice.useStoreState((store) => store.title);

  const closeOptions = MultipleChoice.useStoreActions(
    (store) => store.closeOptions
  );

  const openOptions = MultipleChoice.useStoreActions(
    (store) => store.openOptions
  );

  const setWidth = MultipleChoice.useStoreActions((store) => store.setWidth);

  const ref: React.MutableRefObject<HTMLDivElement> = useRef(null);
  useOnClickOutside(ref, () => isOpen && closeOptions());

  return (
    <div ref={ref}>
      <ClickBar
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
  <MultipleChoice.Provider
    runtimeModel={{
      ...multipleChoiceModel,
      filteredOptions: options,
      options,
      title
    }}
  >
    <MultipleChoiceDDContent />
  </MultipleChoice.Provider>
);
