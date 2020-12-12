import React, { useState } from 'react';

import Dropdown from '@components/Elements/Dropdown';

const PlaygroundHeader = () => {
  const options = ['Option 1', 'Option 2'];
  const [value, setValue] = useState(options[0]);

  return (
    <div>
      <h3>Data Playground</h3>
      <p>Choose any piece of data that you'd like to explore.</p>
      <Dropdown
        options={options}
        value={value}
        onChange={(option: string) => setValue(option)}
      />
    </div>
  );
};

export default () => {
  return (
    <div className="s-analytics-members-playground">
      <PlaygroundHeader />
    </div>
  );
};
