import { useDispatch } from 'react-redux';
import { undoItemAction, redoItemAction } from '../../../redux/features/items/itemsSlice';
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
import { useState } from 'react';
import Modal from 'react-modal';
import { hackyRecenterPlayground } from '../../../redux/features/playgrounds/playgroundSlice';
import useAppDispatch from 'src/hooks/useAppDispatch';
// import UndoIcon from 'src/components/playground/Toolbar/UndoIcon';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ResetPlaygroundModal from 'src/components/playground/Toolbar/ResetPlaygroundModal';
import FilterCenterFocusIcon from '@mui/icons-material/FilterCenterFocus';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import {
  alpha,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
  Stack,
  styled,
} from '@mui/material';
import { ICON, NAVBAR } from 'src/config';

export interface ListItemStyleProps extends ListItemButtonProps {
  active?: boolean;
}

const ToolbarButton = styled(ListItemButton)<ListItemStyleProps>(({ theme, active = false }) => {
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
      backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    }),
  };
});

function Toolbar() {
  const dispatch = useAppDispatch();
  const showLayer = useSelectShowLayer();
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    Modal.setAppElement('#root');
    setIsOpen(false);
  }

  const undo = () => {
    dispatch(undoItemAction());
  };

  const redo = () => {
    dispatch(redoItemAction());
  };

  function toggleSelectedLayer(layer: Layer) {
    dispatch(toggleLayer(layer));
  }

  const doIfEnter = (e: React.KeyboardEvent<HTMLElement>, callbackIfEnter: () => void) => {
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
    <Stack direction="row" flexShrink={0}>
      <ToolbarButton
        tabIndex={0}
        onClick={undo}
        onKeyDown={(e) => doIfEnter(e, undo)}
        aria-label="undo"
        disabled={undoStack.length === 0}
      >
        <ListItemIcon
          sx={{
            mr: 1,
            flexShrink: 0,
            width: ICON.NAVBAR_ITEM_HORIZONTAL,
            height: ICON.NAVBAR_ITEM_HORIZONTAL,
          }}
        >
          <UndoIcon />
        </ListItemIcon>

        <ListItemText
          primary={'Undo'}
          primaryTypographyProps={{
            noWrap: true,
            variant: 'body2',
          }}
        />
      </ToolbarButton>

      <ToolbarButton
        tabIndex={0}
        onClick={redo}
        onKeyDown={(e) => doIfEnter(e, redo)}
        aria-label="redo"
        disabled={redoStack.length === 0}
      >
        <ListItemIcon
          sx={{
            mr: 1,
            flexShrink: 0,
            width: ICON.NAVBAR_ITEM_HORIZONTAL,
            height: ICON.NAVBAR_ITEM_HORIZONTAL,
          }}
        >
          <RedoIcon />
        </ListItemIcon>

        <ListItemText
          primary={'Redo'}
          primaryTypographyProps={{
            noWrap: true,
            variant: 'body2',
          }}
        />
      </ToolbarButton>

      <ToolbarButton
        className={showLayer[Layer.FLOOR] ? 'primary' : 'secondary'}
        active={showLayer[Layer.FLOOR] ? true : false}
        tabIndex={0}
        onClick={() => toggleSelectedLayer(Layer.FLOOR)}
        onKeyDown={(e) => doIfEnter(e, () => toggleSelectedLayer(Layer.FLOOR))}
        aria-label="Floor plane"
      >
        <ListItemIcon
          sx={{
            mr: 1,
            flexShrink: 0,
            width: ICON.NAVBAR_ITEM_HORIZONTAL,
            height: ICON.NAVBAR_ITEM_HORIZONTAL,
          }}
        >
          <ArrowDownwardIcon />
        </ListItemIcon>

        <ListItemText
          primary={'Floor plane'}
          primaryTypographyProps={{
            noWrap: true,
            variant: 'body2',
          }}
        />
      </ToolbarButton>

      <ToolbarButton
        className={showLayer[Layer.CEILING] ? 'primary' : 'secondary'}
        active={showLayer[Layer.CEILING] ? true : false}
        tabIndex={0}
        onClick={() => toggleSelectedLayer(Layer.CEILING)}
        onKeyDown={(e) => doIfEnter(e, () => toggleSelectedLayer(Layer.CEILING))}
        aria-label="Ceiling plane"
      >
        <ListItemIcon
          sx={{
            mr: 1,
            flexShrink: 0,
            width: ICON.NAVBAR_ITEM_HORIZONTAL,
            height: ICON.NAVBAR_ITEM_HORIZONTAL,
          }}
        >
          <ArrowUpwardIcon />
        </ListItemIcon>

        <ListItemText
          primary={'Ceiling plane'}
          primaryTypographyProps={{
            noWrap: true,
            variant: 'body2',
          }}
        />
      </ToolbarButton>

      <ToolbarButton
        onClick={recenterPlayground}
        onKeyDown={(e) => doIfEnter(e, recenterPlayground)}
        aria-label="Recenter Playground"
      >
        <ListItemIcon
          sx={{
            mr: 1,
            flexShrink: 0,
            width: ICON.NAVBAR_ITEM_HORIZONTAL,
            height: ICON.NAVBAR_ITEM_HORIZONTAL,
          }}
        >
          <FilterCenterFocusIcon />
        </ListItemIcon>

        <ListItemText
          primary={'Recenter Playground'}
          primaryTypographyProps={{
            noWrap: true,
            variant: 'body2',
          }}
        />
      </ToolbarButton>

      <ToolbarButton
        onClick={openModal}
        onKeyDown={(e) => doIfEnter(e, openModal)}
        aria-label="Reset Playground"
      >
        <ListItemIcon
          sx={{
            mr: 1,
            flexShrink: 0,
            width: ICON.NAVBAR_ITEM_HORIZONTAL,
            height: ICON.NAVBAR_ITEM_HORIZONTAL,
          }}
        >
          <RestartAltIcon />
        </ListItemIcon>

        <ListItemText
          primary={'Reset Playground'}
          primaryTypographyProps={{
            noWrap: true,
            variant: 'body2',
          }}
        />
      </ToolbarButton>

      <ResetPlaygroundModal open={modalIsOpen} closeModal={closeModal} />
    </Stack>
  );
}

export default Toolbar;
