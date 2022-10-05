import { useEffect, useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Button } from '@mui/material';
//
import FullscreenIcon from '@mui/icons-material/Fullscreen';

// ----------------------------------------------------------------------

export default function SettingFullscreen() {
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if (document.fullscreenElement) {
      setFullscreen(true);
    }
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  return (
    <Button
      fullWidth
      size="small"
      variant="text"
      color={fullscreen ? 'primary' : 'inherit'}
      startIcon={<FullscreenIcon />}
      onClick={toggleFullScreen}
      sx={{
        fontSize: 12,
        ...(fullscreen && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        }),
        margin: '3px 3px 3px 3px',
      }}
    >
      {fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
    </Button>
  );
}
