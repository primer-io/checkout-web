import { useStyle } from '@builder.io/mitosis';
import { JSX } from '@builder.io/mitosis/jsx-runtime';

type Props = JSX.IntrinsicElements['button'];

export default function Button(props: Props) {
  return <button {...props} />;
}

// eslint-disable-next-line @builder.io/mitosis/only-default-function-and-imports
useStyle(`
  border: 0;
  border-radius: 4px;
  display: flex;
  height: 48px;
  padding: 8px;
  place-content: center;
  place-items: center;
`);
