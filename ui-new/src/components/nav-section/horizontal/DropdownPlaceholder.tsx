import { ListItemIcon, ListItemText } from '@mui/material';
import { ReactElement, JSXElementConstructor } from 'react';
import Iconify from 'src/components/Iconify';
import { ICON } from 'src/config';
import { ListItemButtonStyle } from './style';

const DropdownPlaceholder = ({
  label,
  icon,
}: {
  label: string;
  icon: ReactElement<any, string | JSXElementConstructor<any>>;
}) => {
  return (
    <ListItemButtonStyle open={false} active={false} depth={1}>
      {icon && (
        <ListItemIcon
          sx={{
            mr: 1,
            flexShrink: 0,
            width: ICON.NAVBAR_ITEM_HORIZONTAL,
            height: ICON.NAVBAR_ITEM_HORIZONTAL,
          }}
        >
          {icon}
        </ListItemIcon>
      )}

      <ListItemText
        primary={label}
        primaryTypographyProps={{
          noWrap: true,
          variant: 'body2',
        }}
      />

      <Iconify
        icon={'eva:chevron-down-fill'}
        sx={{
          ml: 0.5,
          flexShrink: 0,
          width: ICON.NAVBAR_ITEM_HORIZONTAL,
          height: ICON.NAVBAR_ITEM_HORIZONTAL,
        }}
      />
    </ListItemButtonStyle>
  );
};

export default DropdownPlaceholder;
