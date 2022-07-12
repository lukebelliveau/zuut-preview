import Airtable from 'airtable';

const AIRTABLE_API_KEY = 'keyt0j1xLFEQQzEjw';
const AIRTABLE_OBJECTS_LIBRARY = 'appdhbmd9U7X7Ax3C';

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: AIRTABLE_API_KEY,
});
const base = Airtable.base(AIRTABLE_OBJECTS_LIBRARY);

const tables = {
  tents: 'Tents',
  pots: 'Pots',
};

export const selectPots = async () => {
  const pots: any = [];
  try {
    const tentRecords = await base(tables.pots)
      .select({
        fields: ['name', 'width', 'length', 'height', 'description', 'ASIN'],
      })
      .all();

    tentRecords.forEach((record) => {
      pots.push({
        name: record.get('name'),
        width: record.get('width'),
        length: record.get('length'),
        height: record.get('height'),
        description: record.get('description'),
        ASIN: record.get('ASIN'),
      });
    });

    return pots;
  } catch (e) {
    console.error('Error fetching Tent data:');
    console.error(e);
  }
};

const airtableApi = {
  selectPots,
};

export default airtableApi;
