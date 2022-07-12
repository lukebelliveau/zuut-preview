import { useMemo } from 'react';
import { useLocation } from 'react-router';

function useQueryParams() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

export default useQueryParams;
