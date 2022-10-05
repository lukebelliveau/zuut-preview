import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Button } from '@mui/material';

import { hackyRecenterPlayground } from 'src/redux/features/playgrounds/playgroundSlice';
import { useDispatch } from 'src/redux/store';
import FilterCenterFocusIcon from '@mui/icons-material/FilterCenterFocus';

// ----------------------------------------------------------------------

export default function SettingFullscreen() {
  const [fullscreen, setFullscreen] = useState(false);
  const dispatch = useDispatch();

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  const recenterPlayground = () => {
    dispatch(hackyRecenterPlayground());
  };

  return (
    <Button
      fullWidth
      size="small"
      variant="text"
      color={'inherit'}
      startIcon={<FilterCenterFocusIcon />}
      onClick={recenterPlayground}
      sx={{
        fontSize: 12,
        ...(fullscreen && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        }),
        margin: '3px 3px 3px 3px',
      }}
    >
      Recenter
    </Button>
  );
}
