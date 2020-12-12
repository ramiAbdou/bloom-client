import React from 'react';

import { makeClass } from '@util/util';
import Form from '../../Form.store';
import { FormItemData } from '../../Form.types';

type ChoiceProps = { title: string; option: string };

const Choice = ({ option, title }: ChoiceProps) => {
  const value = Form.useStoreState(
    ({ items }) => items.find((item) => item.title === title)?.value
  );

  const updateItem = Form.useStoreActions((store) => store.updateItem);

  const onClick = () => updateItem({ title, value: option });

  const css = makeClass([
    'c-form-mc-choice',
    [option === value, 'c-form-mc-choice--active']
  ]);

  return (
    <button className={css} onClick={onClick}>
      <div>
        <div />
      </div>
      <p className="c-misc-tag">{option}</p>
    </button>
  );
};

// We use local state to see which option is selected.
export default ({ options, title }: FormItemData) => (
  <>
    {options.map((option: string) => {
      return <Choice key={option} option={option} title={title} />;
    })}
  </>
);
