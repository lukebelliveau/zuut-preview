import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';

export function selectJwt(state: RootState): string {
  const jwt = state.user.jwt;
  if (!jwt) throw new Error('No JWT set');
  return jwt;
}

export const useJwt = () => useAppSelector((state) => state.user.jwt);
