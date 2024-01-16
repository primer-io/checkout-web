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
    console.error(error);
    handler?.showErrorMessage();
    cardForm.querySelector('button')!.disabled = false;
    const errorElement = document.getElementById('error')!;
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
      const img = createNetworkImage(network);
      supportedCardNetworksElement.append(img);
    });
  },
});

primer.start();

////////////////////////////////////////////

async function configureCard() {
  const cardNetworkElement = document.getElementById('card-network')!;

  // TODO: remove types and infer from Primer
  type CardNetworks = {
    items: CardNetwork[];
    preferred: CardNetwork;
  };
  type CardNetwork = {
    allowed: boolean;
    displayName: string;
    network: string;
  };

  // @ts-expect-error TODO: remove this comment when package has correct type
  const cardManager = await primer.createPaymentMethodManager('PAYMENT_CARD', {
    // this is the most important event for co-badged cards
    async onCardNetworksChange({
      detectedCardNetworks,
      selectableCardNetworks, // TODO: remove type and infer from Primer
    }: {
      detectedCardNetworks: CardNetworks;
      selectableCardNetworks: CardNetworks;
    }) {
      // reset element state
      cardNetworkElement.innerHTML = '';

      // co-badged, create options for customer to select network
      if (selectableCardNetworks)
        return selectableCardNetworks.items.forEach(
          async ({ displayName, network }) => {
            const label = document.createElement('label');

            const input = document.createElement('input');
            input.ariaLabel = displayName;
            input.checked =
              selectableCardNetworks.preferred?.network === network;
            input.name = 'cardNetwork';
            input.type = 'radio';
            input.value = network;

            const img = await createNetworkImage(network);

            label.append(input, img);
            cardNetworkElement.append(label);
          },
        );

      // not co-badged, display the most likely network in a single-badge card
      const mostLikelyNetwork =
        detectedCardNetworks.preferred ?? detectedCardNetworks.items[0];
      if (!mostLikelyNetwork) return;
      const img = await createNetworkImage(mostLikelyNetwork.network);
      cardNetworkElement.append(img);
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
      cardNetwork?: RadioNodeList;
    };
    const cardNetwork = form.cardNetwork?.value;
    cardManager?.submit({ cardNetwork });
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

async function createNetworkImage(network: string) {
  const asset = await assets.getCardNetworkAsset(network);

  const img = document.createElement('img');
  img.alt = asset.displayName;
  img.src = asset.cardUrl;
  img.title = asset.displayName;

  return img;
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
