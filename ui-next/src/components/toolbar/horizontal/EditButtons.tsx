import {
  undoItemAction,
  redoItemAction,
} from '../../../redux/features/items/itemsSlice';
// import './Toolbar.css';
import {
  useSelectRedoStack,
  useSelectUndoStack,
} from '../../../redux/features/items/itemsSelectors';
// import UndoIcon from './UndoIcon';
// import RedoIcon from './RedoIcon';
import { Layer } from '../../../lib/layer';
import { useSelectShowLayer } from '../../../redux/features/interactions/interactionsSelectors';
import { toggleLayer } from '../../../redux/features/interactions/interactionsSlice';
// import ResetPlaygroundModal from './ResetPlaygroundModal';
import { hackyRecenterPlayground } from '../../../redux/features/playgrounds/playgroundSlice';
import useAppDispatch from 'src/hooks/useAppDispatch';
// import UndoIcon from 'src/components/playground/Toolbar/UndoIcon';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import {
  alpha,
  Box,
  Button,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
  Stack,
  styled,
} from '@mui/material';
import { ICON, NAVBAR } from 'src/config';
import { OtherHousesSharp } from '@mui/icons-material';

export interface ToolbarButtonStyleProps extends ListItemButtonProps {
  active?: boolean;
}

const ToolbarButtonStyles = styled(ListItemButton)<ToolbarButtonStyleProps>(
  ({ theme, active = false }) => {
    const hoverStyle = {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.action.hover,
      boxShadow: `inset 0 0 1px 1px ${theme.palette.divider}`,
    };

    return {
      textTransform: 'capitalize',
      margin: theme.spacing(0, 0.5),
      padding: theme.spacing(0, 1),
      color: theme.palette.text.secondary,
      borderRadius: theme.shape.borderRadius,
      height: NAVBAR.DASHBOARD_ITEM_HORIZONTAL_HEIGHT,
      '&:hover': hoverStyle,

      // Active item
      ...(active && {
        color: theme.palette.primary.main,
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      }),
    };
  }
);

const stackRow = {
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    display: 'none',
  },

  margin: '2px 0px',
} as const;

export interface ToolbarButtonProps extends ToolbarButtonStyleProps {
  active?: boolean;
  label: string;
  Icon: JSX.Element;
}

const ToolbarButton = ({
  onClick,
  onKeyDown,
  label,
  Icon,
  ...other
}: ToolbarButtonProps) => {
  return (
    <ToolbarButtonStyles
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-label={label}
      {...OtherHousesSharp}
      {...other}
    >
      <ListItemIcon
        sx={{
          mr: 1,
          flexShrink: 0,
          width: ICON.NAV_ITEM_HORIZONTAL,
          height: ICON.NAV_ITEM_HORIZONTAL,
        }}
      >
        {Icon}
      </ListItemIcon>

      <ListItemText
        primary={label}
        primaryTypographyProps={{
          noWrap: true,
          variant: 'body2',
        }}
      />
    </ToolbarButtonStyles>
  );
};

function Toolbar({ openResetModal }: { openResetModal: () => void }) {
  const dispatch = useAppDispatch();
  const showLayer = useSelectShowLayer();

  const undo = () => {
    dispatch(undoItemAction());
  };

  const redo = () => {
    dispatch(redoItemAction());
  };

  function toggleSelectedLayer(layer: Layer) {
    dispatch(toggleLayer(layer));
  }

  const doIfEnter = (
    e: React.KeyboardEvent<HTMLElement>,
    callbackIfEnter: () => void
  ) => {
    if (e.key === 'Return' || e.key === 'Enter') {
      callbackIfEnter();
    }
  };

  const recenterPlayground = () => {
    dispatch(hackyRecenterPlayground());
  };

  const undoStack = useSelectUndoStack();
  const redoStack = useSelectRedoStack();

  return (
    <Stack>
      <Stack direction="row">
        <Stack sx={{ ...stackRow, py: 1 }} flexShrink={0}>
          <ToolbarButton
            tabIndex={0}
            onClick={undo}
            onKeyDown={(e) => doIfEnter(e, undo)}
            label="undo"
            disabled={undoStack.length === 0}
            Icon={<UndoIcon />}
          />
          <ToolbarButton
            className={showLayer[Layer.FLOOR] ? 'primary' : 'secondary'}
            active={showLayer[Layer.FLOOR] ? true : false}
            tabIndex={0}
            onClick={() => toggleSelectedLayer(Layer.FLOOR)}
            onKeyDown={(e) =>
              doIfEnter(e, () => toggleSelectedLayer(Layer.FLOOR))
            }
            label="Floor plane"
            Icon={<ArrowDownwardIcon />}
          />
        </Stack>
        <Stack sx={{ ...stackRow, py: 1 }} flexShrink={0}>
          <ToolbarButton
            tabIndex={0}
            onClick={redo}
            onKeyDown={(e) => doIfEnter(e, redo)}
            label="redo"
            disabled={redoStack.length === 0}
            Icon={<RedoIcon />}
          />
          <ToolbarButton
            active={showLayer[Layer.CEILING] ? true : false}
            tabIndex={0}
            onClick={() => toggleSelectedLayer(Layer.CEILING)}
            onKeyDown={(e) =>
              doIfEnter(e, () => toggleSelectedLayer(Layer.CEILING))
            }
            label="Ceiling plane"
            Icon={<ArrowUpwardIcon />}
          />
        </Stack>
      </Stack>
      <Box>
        <Button
          fullWidth
          onClick={openResetModal}
          startIcon={<RestartAltIcon />}
          variant="outlined"
          color="error"
          // onKeyDown={(e) => doIfEnter(e, openResetModal)}
          // label="Reset Playground"
        >
          Reset Playground
        </Button>
      </Box>
    </Stack>
  );
}

export default Toolbar;
