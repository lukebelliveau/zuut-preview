import { PlaceableItemRecord } from '../../../src/airtable/Record';

const airtableClimateItems: PlaceableItemRecord[] = [
  {
    name: 'Floor Dehumidifier',
    width: 9,
    length: 12,
    height: 14,
    description:
      'Cannabis does not like humidity higher than 60%. Lowers humidity, raises temperature (slightly)',
    amazonProducts: ['recKhI53kiReGvsdZ'],
    recordId: 'rec3NJ0FAFm7HCVn6',
    linkedASINs: [],
    itemType: 'DehumidifierItemType',
  },
  {
    name: 'Floor Humidifier',
    width: 9,
    length: 12,
    height: 14,
    description:
      'Cannabis does not like humidity lower than 40%. Raises humidity, raises temperature (slightly)',
    amazonProducts: ['recHAdwYe9tZVrQe6'],
    recordId: 'rec5bpbZMXW0E7PEg',
    linkedASINs: [],
    itemType: 'HumidifierItemType',
  },
  {
    name: 'Floor Heat Unit',
    width: 15,
    length: 21,
    height: 33,
    description:
      'Cannabis does not like temperatures below 50 degrees. Raises temperature, lowers humidity',
    amazonProducts: ['recCj6WQgEYggHD2l'],
    recordId: 'rec7h5PFvnUp16qTF',
    linkedASINs: [],
    itemType: 'HeatItemType',
  },
  {
    name: 'Carbon Filter',
    width: 9,
    length: 21,
    height: 8,
    description:
      'Connecting a carbon filter to an exhaust fan filters the smells out of the air before it leaves the grow space.',
    amazonProducts: ['recCxH7Re20g5htK5'],
    recordId: 'recD7URrmc4apfTwh',
    linkedASINs: [],
    itemType: 'CarbonFilterItemType',
  },
  {
    name: 'Exhaust Fan',
    width: 9,
    length: 12,
    height: 8,
    description:
      'A steady supply of fresh air helps cannabis grow faster, produce more buds, controls the humidity and temperature, and protects plants from certain pests and molds.',
    amazonProducts: ['recJrLDa3t21KAVgg'],
    recordId: 'recIHn3Z4sX1MrTrp',
    linkedASINs: ['B07J9PTYRN'],
    itemType: 'ExhaustFanItemType',
  },
  {
    name: 'Ducting',
    width: 9,
    length: 12,
    height: 8,
    description:
      'An exhaust system often uses ducting to move hot and humid air out of the grow space.',
    amazonProducts: ['recNeBlapjfAExPWH'],
    recordId: 'recJ6pYcj1TprNVXF',
    linkedASINs: [],
    itemType: 'DuctItem',
  },
  {
    name: 'Floor Air Purifier',
    width: 9,
    length: 12,
    height: 19,
    description:
      'Air purifiers destroy and prevent organic air pollutants while leaving behind CO2 and water vapor.',
    amazonProducts: ['recGna6nQEYJ0Tqfr'],
    recordId: 'recQru8K8Iro60NJO',
    linkedASINs: [],
    itemType: 'PurifierItemType',
  },
  {
    name: 'Floor AC Unit',
    width: 15,
    length: 21,
    height: 33,
    description:
      'Cannabis does not like temperatures above 85 degrees. Lowers temperature, lowers humidity',
    amazonProducts: ['recQ0eoABlNVtryAL'],
    recordId: 'recSbidW8JDoBOV3Z',
    linkedASINs: [],
    itemType: 'FloorACItemType',
  },
  {
    name: 'Clip Fan',
    width: 9,
    length: 6,
    height: 12,
    description:
      'In nature, cannabis plants thrive in a gentle breeze. Air movement protects plants from certain pests and molds.',
    amazonProducts: ['recUPXec4mFstzl6g'],
    recordId: 'recw6i6a2tOLUVmdE',
    linkedASINs: [],
    itemType: 'OscillatingFanItemType',
  },
];
