import { post } from '../utils/post';
import { primerHeaders, primerSdkApiUrl } from './const';

export function createPayment(accessToken: string, paymentMethodToken: string) {
  return post<Payment>(
    `${primerSdkApiUrl}/payments`,
    { paymentMethodToken },
    {
      ...primerHeaders,
      'primer-client-token': accessToken,
    },
  );
}

type Payment = {
  amount: number;
  currencyCode: string;
  customerId: string;
  date: string;
  dateUpdated: string;
  id: string;
  order: Record<string, unknown>;
  paymentMethod: PaymentMethod;
  processor: Processor;
  orderId: string;
  status: string;
  statusReason: StatusReason;
  transactions: Transaction[];
};

type PaymentMethod = {
  analyticsId: string;
  authorizationType: string;
  isVaulted: boolean;
  isVerified: boolean;
  paymentMethodData: {
    binData: BinData[];
    cardholderName: string;
    expirationMonth: string;
    expirationYear: string;
    first6Digits: string;
    isNetworkTokenized: boolean;
    last4Digits: string;
    network: string;
  };
  paymentMethodToken: string;
  paymentMethodType: string;
  threeDSecureAuthentication: {
    responseCode: string;
  };
};

type BinData = {
  accountFundingType: string;
  accountNumberType: string;
  issuerCountryCode: string;
  network: string;
  prepaidReloadableIndicator: string;
  productCode: string;
  productName: string;
  productUsageType: string;
  regionalRestriction: string;
};

type Processor = {
  amountCaptured: number;
  amountRefunded: number;
  name: string;
  processorMerchantId: string;
};

type StatusReason = {
  code: string;
  declineType: string;
  message: string;
  type: string;
};

type Transaction = {
  amount: number;
  currencyCode: string;
  date: string;
  processorMerchantId: string;
  processorName: string;
  processorStatus: string;
  processorStatusReason: StatusReason[];
  processorTransactionId: string;
  transactionType: string;
};
