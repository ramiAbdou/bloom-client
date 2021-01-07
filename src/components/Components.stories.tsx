import React, { useState } from 'react';

import { Description, Stories, Title } from '@storybook/addon-docs/blocks';
import CBox from './atoms/Checkbox/Checkbox';
import IPut from './atoms/Input/Input';
import Attr from './atoms/Tags/Attribute';
import NTag from './atoms/Tags/NumberTag';
import DDown from './molecules/Dropdown/Dropdown';
import QVal from './molecules/QuestionValueList';
import RDio from './molecules/Radio/Radio';
import SBar from './molecules/SearchBar/SearchBar';

// ## CHECKBOX

const CheckboxTemplate = (args) => {
  const [selected, setSelected] = useState(args.selected);
  const onClick = () => setSelected(!selected);
  return <CBox selected={selected} onClick={onClick} {...args} />;
};

export const Checkbox = CheckboxTemplate.bind({});

// ## DROPDOWN

const DropdownTemplate = (args) => {
  const [activeId, setActiveId] = useState('1');
  const onChange = ({ id }) => setActiveId(id);

  return (
    <DDown
      activeId={activeId}
      options={[
        { id: '1', title: 'Option #1' },
        { id: '2', title: 'Option #2' },
        { id: '3', title: 'Option #3' }
      ]}
      onChange={onChange}
      {...args}
    />
  );
};

export const Dropdown = DropdownTemplate.bind({});

// ## NUMBER TAG

const NumberTagTemplate = (args) => {
  return <NTag {...args}>999 Members</NTag>;
};

export const NumberTag = NumberTagTemplate.bind({});

// ## INPUT

const InputTemplate = (args) => {
  const [value, setValue] = useState('');
  const onChange = ({ target }) => setValue(target.value);
  return <IPut value={value} onChange={onChange} {...args} />;
};

export const Input = InputTemplate.bind({});
Input.args = { dark: false, error: false, placeholder: 'Placeholder' };

// ## QUESTION VALUE

const QuestionValueTemplate = (args) => (
  <>
    <QVal
      title="Multiple Choice Question"
      type="MULTIPLE_CHOICE"
      value="Cornell University"
      {...args}
    />

    <QVal
      title="Multiple Select Question"
      type="MULTIPLE_SELECT"
      value="NSBE,SHPE,CODE2040"
      {...args}
    />
  </>
);

export const QuestionValue = QuestionValueTemplate.bind({});

// ## RADIO

const RadioTemplate = (args) => {
  return (
    <RDio
      defaultChecked="Option #1"
      name="Radio"
      options={[
        { label: 'Option #1', name: 'Radio', value: 'Option #1' },
        { label: 'Option #2', name: 'Radio', value: 'Option #2' },
        { label: 'Option #3', name: 'Radio', value: 'Option #3' }
      ]}
      {...args}
    />
  );
};

export const Radio = RadioTemplate.bind({});

// ## SEARCH BAR

const SearchBarTemplate = (args) => {
  const [value, setValue] = useState('');
  return <SBar value={value} onChange={setValue} {...args} />;
};

export const SearchBar = SearchBarTemplate.bind({});
SearchBar.args = { placeholder: 'Search...' };

// ## TAG

const TagTemplate = (args) => <Attr {...args} />;

export const Tag = TagTemplate.bind({});
Tag.args = { value: 'Cornell University' };

export default {
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description>
            Includes the common elements of HTML, as well as elements that are
            built on top of the basic elements of HTML.
          </Description>
          <Stories includePrimary title={null} />
        </>
      )
    }
  },
  title: 'Elements'
};