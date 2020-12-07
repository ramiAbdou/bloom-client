import React, { useRef } from 'react';
import useOnClickOutside from 'use-onclickoutside';

import { FormItemData } from '../../Form.types';
import ClickBar from './ClickBar';
import MultipleChoice, { multipleChoiceModel } from './MultipleChoiceDD.store';
import OptionContainer from './OptionContainer';

const MultipleChoiceDDContent = () => {
  const isOpen = MultipleChoice.useStoreState((store) => store.isOpen);

  const closeOptions = MultipleChoice.useStoreActions(
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
