import { alpha, Theme } from '@mui/material';
import { HEADER } from 'src/config';

const baseHeaderStyle = (theme: Theme) => {
  return {
    color: theme.palette.background.neutral,
    backgroundColor: theme.palette.background.neutral,
    zIndex: theme.zIndex.appBar + 1,
    transition: theme.transitions.create(['width', 'height'], {
      duration: theme.transitions.duration.shorter,
    }),

    width: '100%',
    height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,

    boxShadow: `-24px 12px 32px -4px ${alpha(
      theme.palette.mode === 'light' ? theme.palette.grey[500] : theme.palette.common.black,
      0.16
    )}`,
  };
};

export default baseHeaderStyle;
