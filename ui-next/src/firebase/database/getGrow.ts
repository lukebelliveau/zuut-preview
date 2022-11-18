import { useQuery } from '@tanstack/react-query';
import { child, get, ref } from 'firebase/database';
import queryKeys from 'src/lib/queryKeys';
import { firebaseDb } from 'src/redux/firebaseInit';

export const getGrow = async (growId: string | string[] | null | undefined) => {
  if (growId === null || growId === undefined) {
    return null;
    throw Error(`Tried to get grow with null or undefined growId: ${growId}`);
  }
  if (Array.isArray(growId)) {
    throw Error(`Tried to get grow with array of growIds: ${growId}`);
  }

  const grow = await get(child(ref(firebaseDb), `grows/${growId}`));

  return JSON.parse(grow.val());
};

export const useGetGrow = (growId: string | string[] | null | undefined) => {
  return useQuery([queryKeys.firebaseGrow, growId], async () => {
    return await getGrow(growId);
  });
};
