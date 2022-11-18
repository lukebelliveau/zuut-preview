import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

type ReturnType = {
  active: boolean;
  isExternalLink: boolean;
};

export default function useActiveLink(
  currentPath: string,
  deep = true
): ReturnType {
  const { pathname, asPath } = useRouter();

  const checkPath = currentPath.startsWith('#');

  const normalActive =
    (!checkPath && pathname === currentPath) ||
    (!checkPath && asPath === currentPath);

  const deepActive =
    (!checkPath && pathname.includes(currentPath)) ||
    (!checkPath && asPath.includes(currentPath));

  return {
    active: deep ? deepActive : normalActive,
    isExternalLink: currentPath.includes('http'),
  };
}
