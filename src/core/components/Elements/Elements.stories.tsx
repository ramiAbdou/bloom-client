import React, { useState } from 'react';

import { Description, Stories, Title } from '@storybook/addon-docs/blocks';
import CBox from './Checkbox';
import DDown from './Dropdown';
import HTag from './HeaderTag';
import IPut from './Input';
import QVal from './QuestionValue';
import RDio from './Radio';
import SBar from './SearchBar';
import Tg from './Tag';

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

// ## HEADER TAG

const HeaderTagTemplate = (args) => {
  return <HTag {...args} />;
};

export const HeaderTag = HeaderTagTemplate.bind({});
HeaderTag.args = { value: '999 Members' };

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

// QuestionValue.args = {
//   title: 'School',
//   type: 'MULTIPLE_CHOICE',
//   value: 'Cornell University'
// };
// QuestionValue.argTypes = { type: { type:  } };

// QuestionValue.parameters = {
//   type: {
//     values: ['LONG_TEXT', 'MULTIPLE_CHOICE', 'MULTIPLE_SELECT', 'SHORT_TEXT']
//   }
// };

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

const TagTemplate = (args) => <Tg {...args} />;

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
