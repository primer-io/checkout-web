// import { Primer, type CheckoutStyle } from '@primer-io/checkout-web';
import { type CheckoutStyle } from '@primer-io/checkout-web';
import { type ClientSession } from '../api/createClientSession';
import { post } from '../utils/post';

// TODO: remove preview and import released version
await import('https://sdk.dev.primer.io/web/preview-1579/Primer.min.js');
const { Primer } = window as unknown as {
  Primer: (typeof import('@primer-io/checkout-web'))['Primer'];
};

const { clientToken } = await post<ClientSession>('/api/client-session');

const primer = await Primer.createHeadless(clientToken || '');
const assets = primer.getAssetsManager();
const cardForm = document.getElementById('card') as HTMLFormElement;
const supportedCardNetworksElement = document.getElementById(
  'supported-card-networks',
)!;

primer.configure({
  async onAvailablePaymentMethodsLoad(paymentMethods) {
    for (const paymentMethod of paymentMethods)
      switch (paymentMethod.managerType) {
        case 'CARD':
          configureCard();
          break;

        case 'NATIVE':
        case 'REDIRECT':
          // ignoring these types for simplicity in this example.
          // make sure you implement them in case you're using such payment types.
          break;

        default:
          throw new Error(
            `Type of payment method manager not supported: ${paymentMethod.managerType}`,
          );
      }
  },
  onCheckoutFail(error, _data, handler) {
    console.log(error);
    handler?.showErrorMessage();
    cardForm.querySelector('button')!.disabled = false;
    const errorElement = document.getElementById('error')!;
    errorElement.style.display = '';
    errorElement.innerText = error.message;
  },
  onCheckoutComplete(data) {
    cardForm.innerHTML = `
      <p>Payment successful.</p>
      <p>Payment ID: <code>${data.payment.id}</code></p>
      <p>Order ID: <code>${data.payment.orderId}</code></p>
    `;
  },
  // initialize list of all supported card networks
  onClientSessionUpdate({ paymentMethod: { orderedAllowedCardNetworks } }) {
    orderedAllowedCardNetworks.forEach(async (network) => {
      const asset = await assets.getCardNetworkAsset(network);

      const img = document.createElement('img');
      img.alt = asset.alt;
      img.src = asset.src;
      img.title = asset.alt;

      supportedCardNetworksElement.append(img);
    });
  },
});

primer.start();

////////////////////////////////////////////

async function configureCard() {
  const cardNetworkElement = document.getElementById('card-network')!;

  // @ts-expect-error TODO: remove this comment when package has correct type
  const cardManager = await primer.createPaymentMethodManager('PAYMENT_CARD', {
    // this is the most important event for co-badged cards
    onCardNetworksChange({
      allowedCardNetworks,
      canSelectCardNetwork,
      source,
    }: // TODO: remove type and infer from Primer
    {
      allowedCardNetworks: { value: string }[];
      canSelectCardNetwork: boolean;
      source: 'LOCAL' | 'LOCAL_FALLBACK' | 'REMOTE';
    }) {
      // reset element state
      cardNetworkElement.innerHTML = '';

      // only trust 'REMOTE' or 'LOCAL-FALLBACK' sources for co-badged
      if (source === 'LOCAL') return;

      // either display the only network in a single-badge card,
      // or create options for customer to select network in co-badged card
      allowedCardNetworks.forEach(async ({ value }, index) => {
        const asset = await assets.getCardNetworkAsset(value);

        const label = document.createElement('label');

        const img = document.createElement('img');
        img.alt = asset.alt;
        img.src = asset.src;
        img.title = asset.alt;

        label.append(img);
        cardNetworkElement.append(label);

        // if not co-badged, only image is enough
        if (!canSelectCardNetwork) return;

        // otherwise create a selectable radio input
        const input = document.createElement('input');
        input.ariaLabel = asset.alt;
        input.checked = !index;
        input.name = 'preferredNetwork';
        input.type = 'radio';
        input.value = value;

        img.before(input);
      });
    },
    onCardNetworksLoading() {
      cardNetworkElement.innerHTML = 'Loading...';
    },
  });

  // call `PrimerCardManager.submit()` when form is submitted
  cardForm.addEventListener('submit', (event) => {
    event.preventDefault();
    cardForm.querySelector('button')!.disabled = true;
    const form = cardForm.elements as unknown as {
      preferredNetwork?: RadioNodeList;
    };
    const preferredNetwork = form.preferredNetwork?.value;
    cardManager?.submit({ preferredNetwork });
  });

  // create card's secure, Primer hosted inputs
  const { cardNumberInput, cvvInput, expiryInput } =
    cardManager?.createHostedInputs() ?? {};

  // then render each of them into an HTML element
  const cardNumberId = 'card-number';
  document.getElementById(cardNumberId!)!.innerHTML = '';
  cardNumberInput
    ?.render(cardNumberId, {
      ariaLabel: 'Card number',
      placeholder: '4321 1234 9876 6789',
      style,
    })
    .then(() => cardNumberInput.focus());

  const cardSecurityCodeId = 'card-security-code';
  document.getElementById(cardSecurityCodeId!)!.innerHTML = '';
  cvvInput?.render(cardSecurityCodeId, {
    ariaLabel: 'Security code',
    style,
  });

  const cardExpiryId = 'card-expiry';
  document.getElementById(cardExpiryId!)!.innerHTML = '';
  expiryInput?.render(cardExpiryId, {
    ariaLabel: 'Expiry date',
    placeholder: '01/25',
    style,
  });

  const cardholderName = document.querySelector(
    '[name="card-name"]',
  ) as HTMLInputElement;
  cardholderName.addEventListener('input', () => {
    cardManager?.setCardholderName(cardholderName.value);
  });
}

// style for all Primer hosted inputs
const style: CheckoutStyle = {
  input: {
    base: {
      borderColor: 'gray',
      borderRadius: '2px',
      borderStyle: 'solid',
      borderWidth: '1px',
      height: '40px',
      paddingHorizontal: 8,
    },
    error: {
      borderColor: 'red',
      borderStyle: 'solid',
      color: 'red',
      placeholder: { color: 'lightpink' },
    },
  },
};
