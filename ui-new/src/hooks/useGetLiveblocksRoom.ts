import useQueryParams, { paramKeys } from 'src/lib/url';
import { liveblocksClient } from 'src/redux/store';

const useGetLiveblocksRoom = () => {
  const query = useQueryParams();
  let builderId = query.get(paramKeys.builderId);
  if (builderId === null) return null;
  const room = liveblocksClient.getRoom(builderId);
  if (room === null) return null;

  return room;
};

export default useGetLiveblocksRoom;
