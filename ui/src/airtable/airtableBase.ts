import Airtable from 'airtable';

const AIRTABLE_API_KEY = 'keyt0j1xLFEQQzEjw';
const AIRTABLE_OBJECTS_LIBRARY = 'appdhbmd9U7X7Ax3C';

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: AIRTABLE_API_KEY,
});

export const airtableBase = Airtable.base(AIRTABLE_OBJECTS_LIBRARY);

export const airtableTables = {
  tents: 'Tents',
  pots: 'Pots',
  amazonProducts: 'amazonProducts',
};
