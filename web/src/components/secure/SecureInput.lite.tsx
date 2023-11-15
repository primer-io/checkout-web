import { useStyle } from '@builder.io/mitosis';
import { JSX } from '@builder.io/mitosis/jsx-runtime';
import { src } from './env';

type Props = Omit<JSX.IntrinsicElements['iframe'], 'src'> &
  Partial<Pick<JSX.IntrinsicElements['input'], (typeof inputProps)[number]>>;

export default function SecureInput(props: Props) {
  return (
    <iframe
      {...props}
      src={[`${src}/input`, searchParams(props)].filter(Boolean).join('?')}
    />
  );
}

// eslint-disable-next-line @builder.io/mitosis/only-default-function-and-imports
useStyle(`
  border: 0;
  display: block;
  height: 48px;
`);

// eslint-disable-next-line @builder.io/mitosis/only-default-function-and-imports
const searchParams = (props: Props) =>
  inputProps
    .map((key) => [key, props[key]])
    .filter(([, value]) => value != null)
    .map((kv) => kv.join('='))
    .join('&');

// eslint-disable-next-line @builder.io/mitosis/only-default-function-and-imports
const inputProps = [
  'inputmode',
  'inputMode',
  'max',
  'maxlength',
  'maxLength',
  'min',
  'minlength',
  'minLength',
  'name',
  'pattern',
  'placeholder',
  'required',
  'value',
] as const;
