import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATH_APP } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname == PATH_APP.root) {
      router.push(PATH_APP.home);
    }
  });

  return null;
}
