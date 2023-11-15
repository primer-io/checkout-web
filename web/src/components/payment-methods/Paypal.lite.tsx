import { useStyle } from '@builder.io/mitosis';
import Button from '../Button.lite';
import { assetsSource } from './env';

export default function Paypal() {
  return (
    <Button>
      <img src={`${assetsSource}/brand/logo/paypal/default.svg`} />
    </Button>
  );
}

// eslint-disable-next-line @builder.io/mitosis/only-default-function-and-imports
useStyle(`
  background-color: rgb(255 196 58);
`);
