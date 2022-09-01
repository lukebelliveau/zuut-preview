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
};
