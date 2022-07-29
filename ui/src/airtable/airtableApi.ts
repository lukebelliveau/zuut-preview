import { selectAllLights } from './lights';
import { selectAllPots, selectPotsByRecordId } from './pots';

const airtableApi = {
  selectAllPots,
  selectPotsByRecordId,
  selectAllLights,
};

export default airtableApi;
