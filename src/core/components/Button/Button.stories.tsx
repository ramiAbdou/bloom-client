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

// ## OUTLINE BUTTON

const OutlineButtonTemplate = (args) => (
  <Button outline {...args}>
    Outline
  </Button>
);

export const OutlineButton = OutlineButtonTemplate.bind({});

OutlineButton.args = {
  disabled: false,
  fill: false,
  loading: false,
  loadingText: 'Loading...'
};

// ## UNDERLINE BUTTON

const UnderlineButtonTemplate = (args) => (
  <Button underline {...args}>
    Underline
  </Button>
);

export const UnderlineButton = UnderlineButtonTemplate.bind({});

// ## GREEN BUTTON

const GreenButtonTemplate = (args) => (
  <Button green {...args}>
    Green
  </Button>
);

export const GreenButton = GreenButtonTemplate.bind({});

export default {
  component: Button,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Description>This is the description!</Description>
          <Stories includePrimary title={null} />
        </>
      )
    }
  },
  title: 'Button'
};
