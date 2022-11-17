import { useQuery } from '@tanstack/react-query';
import { child, get, ref } from 'firebase/database';
import queryKeys from 'src/lib/queryKeys';
import { firebaseDb } from 'src/redux/firebaseInit';

export const getGrow = async (growId: string | null) => {
  if (growId === null) return null;
  const grow = await get(child(ref(firebaseDb), `grows/${growId}`));

  return JSON.parse(grow.val());
};

export const useGetGrow = (growId: string | null) => {
  return useQuery([queryKeys.firebaseGrow, growId], async () => await getGrow(growId));
};
