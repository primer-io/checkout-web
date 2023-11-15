import { useStyle } from '@builder.io/mitosis';
import { JSX } from '@builder.io/mitosis/jsx-runtime';
import { src } from './env';

type Props = Omit<JSX.IntrinsicElements['iframe'], 'src'>;

export default function SecureCard(props: Props) {
  return <iframe {...props} src={`${src}/card`} />;
}

// eslint-disable-next-line @builder.io/mitosis/only-default-function-and-imports
useStyle(`
  border: 0;
  display: block;
  height: 396px;
`);
