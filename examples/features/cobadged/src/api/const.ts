export const primerHeaders = {
  accept: 'application/json',
  'content-type': 'application/json',
  'X-API-KEY': import.meta.env.API_KEY,
  'X-API-VERSION': '2.2',
  "Legacy-Workflows": false
};

export const primerApiUrl = 'https://api.staging.primer.io';
