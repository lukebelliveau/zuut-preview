// @mui
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Container } from '@mui/material';

// components
import Logo from '../../../components/Logo';
import { NavSectionHorizontal } from 'src/components/toolbar';
import baseHeaderStyle from '../../baseHeaderStyle';

// ----------------------------------------------------------------------

const RootStyle = styled(AppBar)(({ theme }) => ({
  ...baseHeaderStyle(theme),
}));

// ----------------------------------------------------------------------

type Props = {
  onOpenSidebar: VoidFunction;
  isCollapse?: boolean;
  verticalLayout?: boolean;
};

const ItemsHeader = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        '&.MuiContainer-root': {
          pr: 0,
        },
      }}
    >
      <NavSectionHorizontal />
    </Container>
  );
};

export default function PlaygroundHeader({
  onOpenSidebar,
  isCollapse = false,
  verticalLayout = false,
}: Props) {
  return (
    <RootStyle>
      <Toolbar
        sx={{
          backgroundColor: 'background.neutral',
        }}
      >
        <Logo />
        <ItemsHeader />
      </Toolbar>
    </RootStyle>
  );
}
