import React from 'react';

import { Description, Stories, Title } from '@storybook/addon-docs/blocks';
import Button from './Button';

// ## PRIMARY BUTTON

const PrimaryButtonTemplate = (args) => (
  <Button primary {...args}>
    Primary
  </Button>
);

export const PrimaryButton = PrimaryButtonTemplate.bind({});

PrimaryButton.args = {
  disabled: false,
  fill: false,
  large: false,
  loading: false,
  loadingText: 'Loading...'
};

// ## SECONDARY BUTTON

const SecondaryButtonTemplate = (args) => (
  <Button secondary {...args}>
    Secondary
  </Button>
);

export const SecondaryButton = SecondaryButtonTemplate.bind({});

SecondaryButton.args = {
  disabled: false,
  fill: false,
  loading: false,
  loadingText: 'Loading...'
};

// ## TERTIARY BUTTON

const TertiaryButtonTemplate = (args) => (
  <Button tertiary {...args}>
    Tertiary
  </Button>
);

export const TertiaryButton = TertiaryButtonTemplate.bind({});

export default {
  component: Button,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description>
            This is the description! Primary button is used when x, y, z...
          </Description>
          <Stories includePrimary title={null} />
        </>
      )
    }
  },
  title: 'Button'
};
