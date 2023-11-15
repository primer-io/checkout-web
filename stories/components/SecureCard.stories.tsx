import { SecureCard } from '@primer-io/checkout-react';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: SecureCard,
  tags: ['autodocs'],
} satisfies Meta<typeof SecureCard>;

type Story = StoryObj<Meta<typeof SecureCard>>;

export const Basic: Story = {};
