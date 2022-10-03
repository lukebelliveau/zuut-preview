// @mui
import { alpha, styled, useTheme } from '@mui/material/styles';
import { Button } from '@mui/material';
// utils
import cssStyles from '../../../utils/cssStyles';
import { AnimatePresence, m } from 'framer-motion';
import { isPlaceableItem } from 'src/lib/item/placeableItem';
import { IItem } from 'src/lib/item';
import { NAVBAR } from 'src/config';

// ----------------------------------------------------------------------

const RootStyle = styled(m.span)(({ theme }) => ({
  ...cssStyles(theme).bgBlur({ opacity: 0.64 }),
  right: 10,
  bottom: 20,
  width: NAVBAR.BASE_WIDTH,
  position: 'fixed',
  marginTop: theme.spacing(-3),
  padding: theme.spacing(0.5),
  zIndex: theme.zIndex.drawer + 4,
  borderRadius: '10%',
  boxShadow: `-12px 12px 32px -4px ${alpha(
    theme.palette.mode === 'light' ? theme.palette.grey[600] : theme.palette.common.black,
    0.2
  )}`,
}));

const DotStyle = styled('span')(({ theme }) => ({
  top: 8,
  width: 8,
  height: 8,
  right: 10,
  borderRadius: '50%',
  position: 'absolute',
  backgroundColor: theme.palette.error.main,
}));

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  notDefault: boolean;
  onToggle: VoidFunction;
  item: IItem | undefined;
};

const ToggleButton = ({
  notDefault,
  open,
  onToggle,
  item,
}: {
  open: boolean;
  notDefault: boolean;
  onToggle: VoidFunction;
  item: IItem;
}) => {
  const theme = useTheme();
  if (!isPlaceableItem(item)) {
    return null;
  }

  const hoverColor = open ? theme.palette.secondary.main : theme.palette.primary.main;

  return (
    <RootStyle
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0 }}
    >
      {notDefault && !open && <DotStyle />}

      <Button onClick={onToggle}>Open {item.name} Properties</Button>
    </RootStyle>
  );
};

// const ToggleButton = ({
//   notDefault,
//   open,
//   onToggle,
//   item,
// }: {
//   open: boolean;
//   notDefault: boolean;
//   onToggle: VoidFunction;
//   item: IItem;
// }) => {
//   const theme = useTheme();
//   if (!isPlaceableItem(item)) {
//     return null;
//   }

//   const hoverColor = open ? theme.palette.secondary.main : theme.palette.primary.main;

//   return (
//     <RootStyle
//       initial={{ opacity: 0, scale: 0.5 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.3 }}
//       exit={{ opacity: 0 }}
//     >
//       {notDefault && !open && <DotStyle />}

//       <Tooltip
//         // title={open ? `Close ${item.name} Properties` : `Open ${item.name} Properties`}
//         title={`Open ${item.name} Properties`}
//         placement="left"
//       >
//         <IconButtonAnimate
//           color="inherit"
//           onClick={onToggle}
//           sx={{
//             padding: 0,
//             p: 1.25,
//             transition: (theme) => theme.transitions.create('all'),
//             color: hoverColor,
//             '&:hover': {
//               color: hoverColor,
//               bgcolor: (theme) => alpha(hoverColor, theme.palette.action.hoverOpacity),
//             },
//             '& .MuiButtonBase-root': {
//               padding: 0,
//               '&.MuiIconButton-root': {
//                 padding: 50,
//               },
//             },
//           }}
//         >
//           <div
//             style={{
//               maxWidth: 30,
//               maxHeight: 30,
//               width: 40,
//               height: 40,
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//             }}
//           >
//             <Image src={item.image} maxWidth={40} maxHeight={40} width={40} height={40} />
//           </div>
//         </IconButtonAnimate>
//       </Tooltip>
//     </RootStyle>
//   );
// };

export default function AnimatedToggleButton({ notDefault, open, onToggle, item }: Props) {
  return (
    <AnimatePresence>
      {item && <ToggleButton notDefault={notDefault} open={open} onToggle={onToggle} item={item} />}
    </AnimatePresence>
  );
}
