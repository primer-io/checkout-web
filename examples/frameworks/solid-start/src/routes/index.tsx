import { SecureInput } from '@primer-io/checkout-solid';
import './index.css';

export default function Home() {
  return (
    <main>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
        }}
      >
        <label>
          Card number
          <SecureInput
            autofocus
            inputMode="numeric"
            minLength={13}
            maxLength={19}
            name="cardNumber"
            pattern="[0-9 ]{13,19}"
            placeholder="4242 4242 4242 4242"
            type="tel"
          />
        </label>
        <label>
          Expiry date
          <SecureInput
            inputMode="numeric"
            minLength={5}
            maxLength={5}
            name="expiryDate"
            pattern="[0-9]{2}/[0-9]{2}"
            placeholder="MM/YY"
            type="tel"
          />
        </label>
        <label>
          Card security code
          <SecureInput
            inputMode="numeric"
            minLength={3}
            maxLength={4}
            name="securityCode"
            pattern="[0-9]{3,4}"
            placeholder="123"
            type="tel"
          />
        </label>
        <label>
          Name on card
          <SecureInput
            minLength={2}
            maxLength={32}
            name="name"
            pattern="[A-z ]{2,32}"
            placeholder="John Doe"
          />
        </label>
        <button>Submit</button>
      </form>
    </main>
  );
}
