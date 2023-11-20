import { Button } from '@primer-io/checkout-react';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

type Story = StoryObj<Meta<typeof Button>>;

export const Basic: Story = {
  args: {
    children: 'Button',
  },
};
