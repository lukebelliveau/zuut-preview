import Airtable from 'airtable';

const AIRTABLE_API_KEY = 'keyt0j1xLFEQQzEjw';
const AIRTABLE_OBJECTS_LIBRARY = 'appdhbmd9U7X7Ax3C';

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: AIRTABLE_API_KEY,
});

export const airtableBase = Airtable.base(AIRTABLE_OBJECTS_LIBRARY);

interface AirtableTable {
  id: string;
}

export const airtableTables: { [key: string]: AirtableTable } = {
  tents: {
    id: 'tblB29LfvCS1sCwba',
  },
  pots: {
    id: 'tblxv8s5syk4uuthK',
  },
  lights: {
    id: 'tblCgDy8e4HkBUqaS',
  },
  amazonProducts: {
    id: 'tblO3b5pFgR1PtnIc',
  },
};

export const defaultItemFields = [
  'name',
  'width',
  'length',
  'height',
  'description',
  'amazonProducts',
  'recordId',
  'linkedASINs',
];
