import {
  commonVariables,
  SingaporeBank,
  MalaysiaBank,
  PaymentOptions,
  PaymentMethods,
  company,
  dialCode,
  entity,
  GA_TRACKING_ID,
} from './common-env-variables';

const { has_phone_verification, ...otherCommonVariables } = commonVariables;

export const environment = {
  checkLanguage: false,
  checkOffice: true,
  production: true,
  hmr: false,
  baseUrl: 'https://dev-api.omed.vn',

  storageUrl:
    'https://s3-ap-southeast-1.amazonaws.com/stag2a-retail-public-bucket.doxa-holdings.com/',

  bankList: SingaporeBank,

  has_phone_verification: false,

  ...otherCommonVariables,

  paymentOptionList: [PaymentOptions.Full, PaymentOptions.OnLineEPP],
  paymentMethodList: [
    PaymentMethods.Office,
    PaymentMethods.TT,
    PaymentMethods.WireCardOTP,
    PaymentMethods.Sg2c2p,
  ],
  companyInfo: company.SG,
  dialcode: dialCode.SG,
  entity: entity.SG,
  GA_TRACKING_ID: GA_TRACKING_ID.test,

  pubnubSubKey: 'sub-c-0f1a39c2-dc07-11eb-8c90-a639cde32e15',
};
