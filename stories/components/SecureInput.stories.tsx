import { SecureInput } from '@primer-io/checkout-react';
import type { Meta, StoryObj } from '@storybook/react';

export default {
  component: SecureInput,
  tags: ['autodocs'],
  argTypes: {
    onInput: { action: 'onInput' },
  },
} satisfies Meta<typeof SecureInput>;

type Story = StoryObj<Meta<typeof SecureInput>>;

/**
 * An input that cannot have its value inspected by any malicious attacker,
 * unless they have direct access to the machine running the browser.
 */
export const Basic: Story = {
  args: {
    name: 'basic',
  },
};
