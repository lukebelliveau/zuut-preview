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
  misc: {
    id: 'tbll6Oi3Hfvh07amT',
  },
  water: {
    id: 'tbloPr7FlevJquXKe',
  },
  climate: {
    id: 'tblNHtTZxPyJTS6hO',
  },
  amazonProducts: {
    id: 'tblO3b5pFgR1PtnIc',
  },
};

export const itemFields = {
  name: 'name',
  width: 'width',
  length: 'length',
  height: 'height',
  description: 'description',
  amazonProducts: 'amazonProducts',
  recordId: 'recordId',
  linkedASINs: 'linkedASINs',

  itemType: 'itemType',
};

export const defaultItemFields = [
  itemFields.name,
  itemFields.width,
  itemFields.length,
  itemFields.height,
  itemFields.description,
  itemFields.amazonProducts,
  itemFields.recordId,
  itemFields.linkedASINs,
  itemFields.itemType,
];

interface AmazonProductField {
  name: string;
  fieldId: string;
}

export const amazonProductFields: { [key: string]: AmazonProductField } = {
  ASIN: {
    name: 'ASIN',
    fieldId: 'fldARd6UByZLzWf07',
  },
  recordId: {
    name: 'recordId',
    fieldId: 'fldSlaUspbEdX758v',
  },
  productName: {
    name: 'productName',
    fieldId: 'fld2PD38Q14VyC8DQ',
  },

  shape: {
    name: 'shape',
    fieldId: 'fldPdKKjFcHBAIA3Y',
  },
  material: {
    name: 'material',
    fieldId: 'flduGS4gJeW1FW1jh',
  },
  handles: {
    name: 'handles',
    fieldId: 'fldqOD7nQBT6DcufY',
  },

  dimensions: {
    name: 'dimensions',
    fieldId: 'fldWixq28v9Ijrg8D',
  },
  squareFootage: {
    name: 'squareFootage',
    fieldId: 'fldQjLz2TchKI49Zz',
  },
  cubicFootage: {
    name: 'cubicFootage',
    fieldId: 'fldWioAwsaCAizo5E',
  },
  height: {
    name: 'height',
    fieldId: 'fldwr8IxJwIdPLIOV',
  },

  spectrum: {
    name: 'spectrum',
    fieldId: 'fldSqmBj1RRY4tMPf',
  },
  dimming: {
    name: 'dimming',
    fieldId: 'fldyCUaL2v1mzlA93',
  },
  wattage: {
    name: 'wattage',
    fieldId: 'fldn8sNAgXP5FFBJT',
  },
  daisyChain: {
    name: 'daisyChain',
    fieldId: 'fldNbiL7vAnH2TC12',
  },

  airFlowRating: {
    name: 'airFlowRating',
    fieldId: 'fldJdh2fkhsxW4sfI',
  },
  width: {
    name: 'width',
    fieldId: 'fldQpknMGDBNtgdO3',
  },
  speedAdjustable: {
    name: 'speedAdjustable',
    fieldId: 'fldOkWtF79XEZe79P',
  },
  btu: {
    name: 'btu',
    fieldId: 'fldzMNAjrpXMmNe4r',
  },
  thermostat: {
    name: 'thermostat',
    fieldId: 'fldIM0OqrEpBrlPsz',
  },
  control: {
    name: 'control',
    fieldId: 'fldRUauJSLcS3t8QZ',
  },
  dehumidifier: {
    name: 'dehumidifier',
    fieldId: 'fld20qCAKAWh7ILXh',
  },
  noiseLevel: {
    name: 'noiseLevel',
    fieldId: 'fldvABwQBvFqkWA8d',
  },
  exhaust: {
    name: 'exhaust',
    fieldId: 'fldGMxnIMZRvuRiSb',
  },
  coverage: {
    name: 'coverage',
    fieldId: 'flddQqXFeO72oda5O',
  },
  capacity: {
    name: 'capacity',
    fieldId: 'fldVKQESb3fYw61Cb',
  },
  humiditySensor: {
    name: 'humiditySensor',
    fieldId: 'fldBCfQJsjAGD09DH',
  },
  timer: {
    name: 'timer',
    fieldId: 'fldAFFTnsQjKNuEAI',
  },
  unitCount: {
    name: 'unitCount',
    fieldId: 'fldPDjzfEnMCOZxuH',
  },
  rating: {
    name: 'rating',
    fieldId: 'fldqvnx9YdZsSZZZR',
  },
  price: {
    name: 'price',
    fieldId: 'fldZTwFcsVubAZIgk',
  },
};
