import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  disabledLink?: boolean;
}

export default function Logo({ disabledLink = false, sx }: Props) {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR
  // -------------------------------------------------------
  const logo = (
    <Box
      component="img"
      src="/assets/zuut-logo.svg"
      sx={{ width: 40, height: 40, cursor: 'pointer', marginRight: '45px', ...sx }}
      alt="ZUUT logo"
    />
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <RouterLink to="/" aria-label="Return to ZUUT Home">
      {logo}
    </RouterLink>
  );
}
